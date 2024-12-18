import PatientForm from '@/components/forms/PatientForm';
import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  return (
    <div className = "flex h-screen max-h-screen">
      {/*   OTP verif */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
        <Image
            src="/assets/images/logo.png"
            height={100}
            width={100}
            alt="logo"
            className="h-13 w-fit"
            
          />
          <PatientForm />


          <div className= "text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl: text-left">
              © 2024 HealthCare
            </p>

            <Link href ="/?admin=true " className="text-green-500">
              Admin
            </Link>
          </div>


        </div>

      </section>

      <Image
      src= "/assets/images/onboarding-img.png"
      height={1000}
      width={1000}
      alt="patient"
      className="side-img max-w-[50%]" />
      
    </div>
  );
}









