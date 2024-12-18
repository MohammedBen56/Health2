import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
//import { Doctors } from "@/constants";
import { getAppointment, getDoctorbyId } from "@/lib/actions";
import { formatDateTime } from "@/lib/utils";

const RequestSuccess = async ({
  searchParams,
  params: { userId, appointmentId },
}: SearchParamProps) => {
  const appointment = await getAppointment(appointmentId);

  //console.log("appointment is ", appointment);
  //console.log("id is ", appointment[0]?.doctor_id);

  const doctor = await getDoctorbyId((appointment as any)[0]?.doctor_id);

  //console.log(appointment);
  //console.log(doctor);
  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
        <Image
            src="/assets/images/logo.png"
            height={1000}
            width={1000}
            alt="logo"
            className="h-max w-fit"
            
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <p className="whitespace-nowrap">Dr. {(doctor as any)![0].name} --{(doctor as any)[0]?.specialization}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime((appointment as any)[0].schedule).dateTime}</p>
          </div>
        </section>


        <section className= "request-details">
        
          <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patient/${userId}/new_appointment`}>
            New Appointment
          </Link>
          </Button>

          <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patient/${userId}/home`}>
            Home
          </Link>
          </Button>
          
        </section>

        <p className="copyright">© 2024 HealthCare</p>
      </div>
    </div>
  );
};

export default RequestSuccess;