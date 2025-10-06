import { supabase } from "@/lib/supabaseClient";
import { User } from "@/types/user";

export async function createNewUser(newUser: Omit<User, "id">): Promise<User> {
  const { data, error } = await supabase
    .from("user")               
    .insert([newUser])   
    .select("id, email, password, name, role")                     
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as User;          
}

export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from("user")
    .select("*") as { data: User[] | null; error: unknown };

  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(message);
  }

  return data || [];
}

export async function getUserById(id: number): Promise<User> {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("id", id)
    .single() as { data: User | null; error: unknown };

  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(message);
  }

  return data!;
}

export async function updateUserStory(id: number, story: string): Promise<User> {
  const { data, error } = await supabase
    .from("user")
    .update({ story })
    .eq("id", id)
    .select("*")
    .single() as { data: User | null; error: unknown };

  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(message);
  }
  return data!;
}

// New function to become a seller
export async function updateUserRole(id: number, role: 'admin' | 'user' | 'seller'): Promise<User> {
  const { data, error } = await supabase
    .from("user")
    .update({ role })
    .eq("id", id)
    .select("*")
    .single() as { data: User | null; error: unknown };

  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(message);
  }
  return data!;
}
  