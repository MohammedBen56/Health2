"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../ui/CustomFormField";
import SubmitButton from "../ui/SubmitButton";
import { useState } from "react"; 
import { PatientFormValidation, UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { getAllPatientUserIds, getPatientData, RegisterPatient, UpdatePatient } from "@/lib/actions";
import Register from "@/app/patient/[userId]/register/page";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constansts";
import Image from 'next/image';
import FileUploader from "../FileUploader";

//const patientData = async({ user }: { user: User }) => { return await getPatientData(user._id); }

const RegisterForm =  ({user, data} : {user: User , data: any}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  //const [patientData, setPatientData] = useState(null);
  

  console.log("patient data is ", data);
  console.log("user data is ", Object.keys(data).length);
  const defaultValues = Object.keys(data).length === 0 ? {
    ...PatientFormDefaultValues,
    name: user.name,
    email: user.email,
    phone: user.phone,
  } : {
    name: user.name,
    email: user.email,
    phone: user.phone,
  birthDate: data.birthDate,
  gender: data.gender,
  address: data.address,
  occupation: data.occupation,
  emergencyContactName:  data.emergencyContactName,
  emergencyContactNumber: data.emergencyContactNumber,
  primaryPhysician: data.primaryPhysician,
  insuranceProvider: data.insuranceProvider,
  insurancePolicyNumber: data.insurancePolicyNumber,
  allergies: data.allergies,
  currentMedication: data.currentMedication,
  familyMedicalHistory: data.familyMedicalHistory,
  pastMedicalHistory: data.pastMedicalHistory,
  identificationType: data.identificationType,
  identificationNumber: data.identificationNumber,
  identificationDocument: data.identificationDocument,
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
  };
  //if (patientData._id === user._id) { }
  //console.log("patient data is ", patientData[PromiseResult]);
  
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: defaultValues,
  });

  

  const onSubmit = async(values: z.infer<typeof PatientFormValidation>) => {
    // Submission logic here
    

    try {
       
      setIsLoading(true);
      const patient = {
        //@ts-ignore
        _id: user._id,
        ...values
      }
      let response; 

      if (Object.keys(data).length == 0) {
        
        response = await RegisterPatient(patient);
      } else {
        response = await UpdatePatient(patient);
      }

       // console.log("Registering patient... ", response);
        if (response?.error) {
          console.log("Registration error:", response.error);
          setIsLoading(false);
          // Replace with your error logic
          return;
        }
        //console.log("here's response", response);
        //const response= await getAllPatientUserIds(); // Call your register function
        
        
        router.push(`/patient/${response}/home`);

        return;
      // Navigate to a success page
  } catch (error) {
    console.log('Registration error:', error);
    setIsLoading(false);
  }
    
  };

  return (
    <Form {...form}>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
            <h1 className="header"> Welcome 👋</h1>
            <p className="text-dark-700">Let us know more about yourself</p>
        </section>
         
        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header"> Personal Information</h2>
            </div>
        </section>
 
        <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name" 
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        
        <div className= "flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="Johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField 
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="0612345678"
          iconSrc="/assets/icons/user.svg"
          iconAlt="Phone"
        />

        </div>
        
        <div className="flex flex-col gap-8 xl:flex-row">
        <CustomFormField 
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="birthDate"
          label="Date of Birth"
          placeholder="Johndoe@gmail.com"
        />

        <CustomFormField 
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="gender"
          label="Gender"
          renderSkeleton={(field) => (
              <FormControl>
                  <RadioGroup className="flex h-11 gap-4 xl:justify-between"
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      {GenderOptions.map((option) => (
                          <div key={option} className="radio-group">
                          <RadioGroupItem value={option} id={option} />
                          <label htmlFor={option} className="cursor-pointer">{option}</label>
                              

                          </div>

                      ))}


                  </RadioGroup>

              </FormControl>
                          
                          
          )}
          placeholder="0612345678"
          iconSrc="/assets/icons/user.svg"
          iconAlt="Phone"
        />
        </div>

        
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Adress"
            placeholder="Your adresss"
            
          />

          <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="occupation"
          label="Occupation"
          placeholder="Scientist"
          />
        </div>
        
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="emergencyContactName"
          label="Emerncy Contact Name"
          placeholder="Guardain's Name"
          />

          <CustomFormField 
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="emergencyContactNumber"
          label="Emergency Contact Number"
          placeholder="0612345678"
           
        />

        </div>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header"> Medical Information</h2>
            </div>
        </section>
        
        <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary care physician"
            placeholder="Select a doctor"
          >
            {Doctors.map((doctor) => (
              <SelectItem key={doctor.name} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
        
        
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="Wafa Assurance"
            
          />

          <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="insurancePolicyNumber"
          label="insurance Policy Number"
          placeholder="XXXXXX55555"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Allergies"
            placeholder="pollen, penicillin..."          
          />

          <CustomFormField 
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="currentMedication"
          label="Current Medication"
          placeholder="Aspirin, Paracetamol..."
          />
        </div>

              
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="Family Medical History"
            placeholder="Mother had, Father had..." 
          />

          <CustomFormField 
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="pastMedicalHistory"
          label="Past Medical History"
          placeholder="Surgery, Illness..."
          />
        
        </div>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header"> Identification and Verification</h2>
            </div>
        </section>

        <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select a type"
          >
            {IdentificationTypes.map((type) => (
              <SelectItem key={type} value={type} className= "cursor-pointer">
                {type}
              </SelectItem>
            ))}
        </CustomFormField>
        
        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification Number"
            placeholder="ABCD123456"
        />
        
        <CustomFormField 
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Identification Document"
          renderSkeleton={(field) => (
              <FormControl>
                  <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
                         
          )}
          
        />

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header"> Conscent and Privacy</h2>
            </div>
        </section>

        <CustomFormField 
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I conscent to treatment" />
        
        <CustomFormField 
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I conscent to discolse info" />
        
        <CustomFormField 
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I conscent to privacy info" />

      
          <SubmitButton isLoading={isLoading}>{Object.keys(data).length === 0 ? "Register" : "Update" }</SubmitButton>
        
      </form>
    </Form>
  );
};

export default RegisterForm;
