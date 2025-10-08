'use client'

import { useRouter } from "next/navigation";
import RegisterForm from "../components/register/RegisterForm";
import toast from "react-hot-toast";

export default function RegisterUser() {
  const router = useRouter();

  const handleRegister = async (formData: { first_name: string; last_name: string; email: string; password: string }) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create user");
      }

      toast.success("User created successfully 🎉");
      window.location.href = "/home";
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center px-4 sm:px-6 lg:px-16">
      <div className="bg-white/10 backdrop-blur-[15px] p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.25)] w-full max-w-md mx-auto">
        
        <div className="text-center mb-6 font-sans">
          <h1 className="text-2xl sm:text-2xl md:text-2xl font-semibold text-white">
            Sign up to get started
          </h1>
        </div>

        <RegisterForm onSubmit={handleRegister} />
      </div>
    </div>
  );
}
