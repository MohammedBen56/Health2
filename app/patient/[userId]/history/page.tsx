import Image from "next/image";
import Link from "next/link";
import { StatCard } from "@/components/StatCard";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/columns";
import { getDoctorbyId, getPatient, getRecentAppointmentList, getUser } from "@/lib/actions";
import { StatusIcon } from "@/constansts";


//import { columns } from "@/components/table/columns";
//import { DataTable } from "@/components/table/DataTable";
//import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

    

const history = async ({ params: { userId } }: SearchParamProps) => {
  const appointments = await getRecentAppointmentList(userId);
  const appointmentsWithDoctors = await Promise.all(
    (appointments as any).map(async (appointment : any) => ({
      ...appointment,
      doctor: await getDoctorbyId(appointment.doctor_id),
    }))
  );
  const attendedAppointmentsCount = (appointments as any).filter(
    (appointment : any) => appointment.status === 'attended'
  ).length;
  const createdAppointmentsCount = (appointments as any).filter(
    (appointment : any) => appointment.status === 'created'
  ).length;
  const cancelledAppointmentsCount = (appointments as any).filter(
    (appointment : any) => appointment.status === 'cancelled'
).length;

  //console.log(`Number of attended appointments: ${attendedAppointmentsCount}`);
  //console.log("Appointments: FINALL", appointmentsWithDoctors);
  const user = await getUser(userId);
  //console.log("User:", user);
  
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href={`/patient/${userId}/home`} className="cursor-pointer">
          <Image
            src="/assets/images/logo.png"
            height={100}
            width={100}
            alt="logo"
            className="h-13 w-fit"
            
          />
        </Link>

        <p className="text-16-semibold">{user.name}'s Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="under"
            count={String(attendedAppointmentsCount)}
            label="Attended appointments"
            icon={StatusIcon["attended"]}
          />
          <StatCard
            type="under"
            count={String(createdAppointmentsCount)}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="under"
            count={String(cancelledAppointmentsCount)}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <DataTable columns={columns} data={appointmentsWithDoctors} />
      </main>
    </div>
  );
};

export default history;

