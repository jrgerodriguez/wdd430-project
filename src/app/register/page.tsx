import RegisterForm from "../components/register/RegisterForm"

export default function RegisterUser() {
  return(
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white/10 backdrop-blur-[15px] border border-white/30 rounded-[12px] p-4 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.25)] w-full max-w-[400px] mx-4 sm:mx-0">
        
        <div className="text-xl font-bold z-10 text-center">
            <p className="py-3">Create a new user</p> 

            <RegisterForm />
        </div>
      </div>
    </div>
  )
}
