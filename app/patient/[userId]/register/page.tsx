import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import RegisterForm from '@/components/forms/RegisterForm';
import { getPatientData, getUser } from '@/lib/actions';

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const Patientdata = await getPatientData(userId);
  let data=[]; // Declare the variable in the outer scope

  if (Patientdata === null) {
      data = []; // Assign an empty array if Patientdata is null
  } else {
      data = Patientdata; // Assign Patientdata if it's not null
  }

  console.log("user is" ,user);
  console.log(Object.keys(data).length);
    

  return (
    <div className = "flex h-screen max-h-screen">
     
      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          {Object.keys(data).length === 0 ? (
            <Image
            src="/assets/images/logo.png"
            height={100}
            width={100}
            alt="logo"
            className="h-13 w-fit"
            
          />) : (
              <Link href={`/patient/${userId}/home`}>
              <Image
              src="/assets/images/logo.png"
              height={1000}
              width={1000}
              className="mb-12 h-12 w-fit"
              alt="patient"
            /></Link>
            )}
          <RegisterForm user={user} data={data} />


          
            <p className="copyright py-12">
              © 2024 HealthCare
            </p>
         


        </div>

      </section>

      <Image
      src= "/assets/images/register-img.png"
      height={1000}
      width={1000}
      alt="patient"
      className="side-img max-w-[40%]" />
      
    </div>
  );
}

export default Register