import { supabase } from "@/lib/supabaseClient";
import { User } from "@/types/user";

export async function createNewUser(newUser: Omit<User, "id">): Promise<User> {
  const { data, error } = await supabase
    .from("user")               
    .insert([newUser] as any)   
    .select()                     
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as User;          
}
