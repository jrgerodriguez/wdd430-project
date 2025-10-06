import LoginForm from "./components/login/LoginForm";
import Image from "next/image"; 

export default function LandingPage() {
  return (
    <div className="h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 bg-black">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white/10 backdrop-blur-[15px] shadow-[0_8px_32px_rgba(0,0,0,0.25)] overflow-hidden">

        <div className="hidden md:block md:w-1/2 relative">
          <Image
            src="/images/pottery.jpg" 
            alt="Login Image"
            fill
            className="object-cover brightness-40"
          />
          <div className="absolute inset-0"></div>
        </div>

        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center font-sans">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-2xl md:text-2xl font-semibold text-white">
              Hancrafted Haven
            </h1>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
