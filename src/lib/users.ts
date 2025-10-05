import { supabase } from "@/lib/supabaseClient";
import { User } from "@/types/user";

export async function createNewUser(newUser: Omit<User, "id">): Promise<User> {
  const { data, error } = await supabase
    .from("user")               
    .insert([newUser])   
    .select("id, email, password")                     
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as User;          
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabase
    .from("user")
    .select("id, email, password")
    .eq("email", email)
    .single();  

  if (error && error.code !== "PGRST116") { 
    throw new Error(error.message);
  }

  return data as User | null;
}