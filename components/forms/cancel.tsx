
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../ui/CustomFormField";
import SubmitButton from "../ui/SubmitButton";
import { useState } from "react"; 
import { LoginFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { getPatient, getRecentAppointmentList, login } from "@/lib/actions";
import { Button } from "@/components/ui/button";

import { cancelappt } from "@/lib/actions";

const Cancel = ({ appointmentId, user }: { appointmentId: Number, user: string }) => {
  
  
  const onSubmit = async () => {
      console.log("Appointments: working on it....", appointmentId);
      await cancelappt(appointmentId);
      const app = await getRecentAppointmentList(user);
    console.log("Appointments: FINALLLLL", app);
      window.location.reload();

        // Submission logic here
    }
  return (
    
              
    <Button onClick={onSubmit} className="hover:bg-red-500">Cancel</Button>

    
      
  );
};

export default Cancel;
