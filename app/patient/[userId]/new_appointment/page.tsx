import Image from "next/image";
import AppointmentForm from "@/components/forms/AppointmentForm";
import Link from "next/link";
//import { getPatient } from "@/lib/actions/patient.actions";

const Appointment = async ({params: {userId}}: SearchParamProps) => {
  //const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
        <Link href={`/patient/${userId}/home`} className="cursor-pointer">
          <Image
            src="/assets/images/logo.png"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
            />
        </Link>

            <AppointmentForm
              userId={userId}  
              type="created"
            />

          <p className="copyright mt-10 py-12">© 2024 HealthCare</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[300px] max-h-[700px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;