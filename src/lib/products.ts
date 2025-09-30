import { supabase } from "@/lib/supabaseClient";
import { Product } from "@/types/product";

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("product") 
    .select("*") as { data: Product[] | null; error: any }; 

  if (error) throw new Error(error.message);
  return data || [];
}

export async function getProductById(id: number): Promise<Product> {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .eq("id", id)
    .single() as { data: Product | null; error: any };

  if (error) throw new Error(error.message);
  return data!;
}
