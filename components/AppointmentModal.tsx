
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
//import { Appointment } from "@/types/appwrite.types";

import AppointmentForm  from "./forms/AppointmentForm";

import "react-datepicker/dist/react-datepicker.css";
import  Cancel from "@/components/forms/cancel";

export const AppointmentModal = ({
  status,
  userId,
  appointment,
  type,
}: {
  status: string;
  userId: string;
  appointment: Number;
  type: "update" | "cancel";
  title: string;
  description: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-red-500"
          disabled={status === "cancelled" || status === "attended"}
        >
          Cancel
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle >Are you sure?</DialogTitle>
        </DialogHeader>

        <Cancel
          appointmentId={appointment}
          user= {userId}
        />
      </DialogContent>
    </Dialog>
  );
};



