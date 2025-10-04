'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import RegisterForm from "../components/register/RegisterForm";
import toast from "react-hot-toast";


export default function RegisterUser() {
  const router = useRouter();

  const handleRegister = async (formData: { email: string; password: string }) => {

  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body:JSON.stringify(formData)
    })

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create user");
    }

    toast.success("User created successfully 🎉");
    router.push("/home");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong")
      }
    }
  };

  return(
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white/10 backdrop-blur-[15px] border border-white/30 rounded-[12px] p-4 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.25)] w-full max-w-[400px] mx-4 sm:mx-0">
        
        <div className="text-xl font-bold z-10 text-center">
            <p className="py-3">Create a new user</p> 

            <RegisterForm onSubmit={handleRegister} />
        </div>
      </div>
    </div>
  )
}
