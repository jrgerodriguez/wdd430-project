import { supabase } from "@/lib/supabaseClient";
import { User } from "@/types/user";

export async function createNewUser(newUser: Omit<User, "id">): Promise<User> {
  const { data, error } = await supabase
    .from("user")               
    .insert([newUser])   
    .select("*")                     
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

// Function to update user story
export async function updateUserStory(id: number, story: string): Promise<User> {
  // Validate story length
  if (story.length > 500) {
    throw new Error("Story cannot exceed 500 characters.");
  }
  // Update story in the database
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

// Function to become a seller
export async function updateUserRole(id: number, role: 'admin' | 'user' | 'seller'): Promise<User> {
  // Update role in the database
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
  