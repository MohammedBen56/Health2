import Image from "next/image";
import Link from "next/link";
import { StatCard } from "@/components/StatCard";
//import { columns } from "@/components/table/columns";
//import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList, getUser } from "@/lib/actions";
import { formatDate, getClosestNextAppointment } from "@/lib/utils";

const Home = async ({params: {userId}}: SearchParamProps) => {
    const appointments = await getRecentAppointmentList(userId);
    ///console.log(appointments.length!);
    const user = await getUser(userId);

    const closestAppointment = getClosestNextAppointment(appointments);
    
    const formattedDate = closestAppointment?.schedule ? formatDate(closestAppointment.schedule) : "";
    //console.log(formattedDate);
  
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
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
          <h1 className="header">Welcome Back👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        <section className="admin-stat ">
          <StatCard
            type="under"
            count= {String((appointments as any).length!)}
            label="Total appointments"
            icon={"/assets/icons/appointments.svg"}
                      
          />
          <StatCard
            type="under"
            count={closestAppointment ? formattedDate : "No future appointments"}
            label={closestAppointment ? "Next Appointment: " : ""}
            icon={"/assets/icons/pending.svg"}
          />
          
              </section>
              
              <section className="admin-stat" style={{ marginTop: "100px" }}>
              <StatCard
                type="button"
                count="Create New Appointment"
                path={`/patient/${userId}/new_appointment`}
                icon={"/assets/icons/add.svg"}
                label=""
              />
              <StatCard
              type="button"
              count="Previous Appointments"
              path={`/patient/${userId}/history`}
              label=""
              icon={"/assets/icons/history.svg"}
            
              />
              <StatCard
            type="button"
                      count="Update Profile"
                      path={`/patient/${userId}/register`}
            label=""
            icon={"/assets/icons/user.svg"}
          />    
              </section>
        

        {/*<DataTable columns={columns} data={appointments.documents} />*/}
      </main>
    </div>
  );
};

export default Home;