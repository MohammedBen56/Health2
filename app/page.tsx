import LoginForm from '@/components/forms/CreateForm';
import Image from 'next/image'
import Link from 'next/link';

export default function create() {
  return (
    <div className = "flex h-screen max-h-screen">
      {/*   OTP verif */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image 
           src= "/assets/images/logo.png"
           height={100}
           width={100}
           className="mb-12 h-fit w-fit"
           alt= "patient"
          />
          <LoginForm />


          <div className= "text-14-regular mt-10 flex justify-between">
            <p className="justify-items-end text-dark-600 xl: text-left">
              © 2024 HealthCare
            </p>

            <p className="justify-items-end text-dark-600 xl: text-right">Don't have an account?  <Link href ="/create " className="text-green-500 xl: text-left">
                Sign up
            </Link></p>
           
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






