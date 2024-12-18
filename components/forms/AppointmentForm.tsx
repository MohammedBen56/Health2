"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../ui/CustomFormField";
import SubmitButton from "../ui/SubmitButton";
import { useState } from "react"; 
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { getDoctors, createAppointment } from "@/lib/actions";
import { FormFieldType } from "./PatientForm";
//import { Doctors } from "@/constansts";
import { SelectItem } from "@/components/ui/select";
import Image from 'next/image';
import { CreateAppointmentSchema } from "@/lib/validation";
import { get } from "http";



const availabilityArray = [
    "12/08/2024 10:00 AM",
    "12/08/2024 11:00 AM",
    "12/08/2024 02:00 PM",
    "12/09/2024 09:00 AM",
    "12/09/2024 01:00 PM",
    "12/09/2024 03:00 PM"
];

const Doctors = await getDoctors().then(result => {
  if (Array.isArray(result) && result.every(item => 'id' in item && 'name' in item && 'specialization' in item)) {
    return result as { id: number; name: string; specialization: string }[];
  }
  return [];
});



const AppointmentForm = ({
  userId, type, 
}: {
    userId: string;
    type: "created" | "update" | "cancel";
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);

  const form = useForm<z.infer<typeof CreateAppointmentSchema>>({
    resolver: zodResolver(CreateAppointmentSchema),
    defaultValues: {
      //primaryPhysician:  ,
      reason: "",
      note: ""
    },
  });

  

  async function onSubmit(values: z.infer<typeof CreateAppointmentSchema>) {
    // Submission logic here
    setIsLoading(true);

    try {
      //console.log(values);
      
      const appointment = {
        userId,
        doctorId: Number(values.primaryPhysician),
        schedule: new Date(values.schedule),
        reason: values.reason!,
        notes: values.note!,
        status: "created",
      };

      //console.log(appointment);
      const appointmentId = await createAppointment(appointment);

    // If no error is thrown, execution reaches here
      console.log("THIS IS THE IDDD", appointmentId);
      
      const val = String(appointmentId).includes("Error: Duplicate appointment: A doctor cannot have more than one appointment at the same schedule.");
      console.log("VAL", val);
      if (val) {
        alert("THE DOCTOR IS BUSY AT THAT DATE/TIME.");
        setIsLoading(false);
        return;
      }
      else {
        router.push(`/patient/${userId}/new_appointment/success/${appointmentId}`);
      }


    //router.push(`/patient/${userId}/new_appointment/success/${appointmentId}`);
} catch (error) {
    // Catch the error and stop execution
    console.error("Registration error:", error);
    setIsLoading(false);
    return; // Prevent further execution
}

  }
  const disabledDateTime = new Date(2024, 12, 12, 18, 0, 0); // 12th Dec 2024, 18:00:00

  // Function to filter out the specific date-time
  const isDateTimeDisabled = (date: any) => {
    return date.getFullYear() === disabledDateTime.getFullYear() &&
           date.getMonth() === disabledDateTime.getMonth() &&
           date.getDate() === disabledDateTime.getDate() &&
           date.getHours() === disabledDateTime.getHours() &&
           date.getMinutes() === disabledDateTime.getMinutes();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment</h1>
            <p className="text-dark-700">Schedule an appointment in 10s</p>
        </section>
        
        {type === "created" && 
          (
          <>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Doctor"
            placeholder="Select a doctor"
            >
              {/* eslint-disable-next-line */}
              {Doctors?.map((doctor) => (
              <SelectItem key={doctor.id} value={String(doctor.id)}>
                <div className="flex cursor-pointer items-center gap-2">
                  
                  <p>{doctor.name}--{doctor.specialization}</p>
                </div>
              </SelectItem>
            ))}
            </CustomFormField>
            
        
            <div className="flex flex-col gap-8 xl:flex-row">
              
          <CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="reason"
            label="Reason for appointment"
            placeholder="Enter a reason for this appointment"          
              />

            <CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="notes"
            label="Notes"
            placeholder="Enter notes"          
          />
            </div>
            
            <CustomFormField 
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="schedule"
            includeTimes={availabilityArray?.map(time => new Date(time))}
            filter={(date:any) => !isDateTimeDisabled(date)}
            label="Expected Appointment Date"
            showTimeSelect  
            dateFormat="MM/dd/yyyy h:mm aa"
        />
          </>
          
          
        )}
        
        <SubmitButton isLoading={isLoading}>Register</SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
