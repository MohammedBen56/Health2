"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../ui/CustomFormField";
import SubmitButton from "../ui/SubmitButton";
import { useState } from "react"; 
import { LoginFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { getPatient, login } from "@/lib/actions";

export enum FormFieldType {
  INPUT = 'input',
  PASS = 'password',
  TEXTAREA= 'textarea',
  PHONE_INPUT= 'phoneInput',
  CHECKBOX= 'checkbox',
  DATE_PICKER= 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
}

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);

  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      password: "",
      email: "",
    },
  });



  const onSubmit = async(values: z.infer<typeof LoginFormValidation>) => {
    // Submission logic here
    setIsLoading(true); 

      try {
        const response = await login(values); // Call your register function
        if (response?.error) {
          console.log("Registration error:", response.error);
          setIsLoading(false);
          // Replace with your error logic
          return;
        }
          //console.log(response)
          //console.log("Registration successful!"); // Replace with your success logic
          const patient = await getPatient(response.userId);
          if (patient) router.push(`/patient/${response.userId}/home`);
          else router.push(`/patient/${response.userId}/register`);
    
        // Successful registration:
          // Navigate to a success page
       // setIsLoading(false);

    // Successful registration:
      // Navigate to a success page
    setIsLoading(false);
  } catch (error) {
    console.log('Registration error:', error);
    setIsLoading(false);
  }
    
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">Login to your account</p>
        </section>

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
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="password"
          label="Password"
          placeholder="**********"
          iconSrc="/assets/icons/pass.svg"
          iconAlt="eye"
          type={passwordHidden ? "password" : "text"}
        />


        <SubmitButton isLoading={isLoading}>Login</SubmitButton>
      </form>
    </Form>
  );
};

export default LoginForm;
