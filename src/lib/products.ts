import { supabase } from "@/lib/supabaseClient";
import { Product } from "@/types/product";

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from<Product, Product>("product")
    .select("*");

  if (error) throw new Error(error.message);
  return data || [];
}

export async function getProductById(id: number): Promise<Product> {
  const { data, error } = await supabase
    .from<Product, Product>("product")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data!;
}
