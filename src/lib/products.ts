import { supabase } from "@/lib/supabaseClient";
import { Product } from "@/types/product";
import { PostgrestError } from "@supabase/supabase-js";

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("product")
    .select("*") as { data: Product[] | null; error: unknown };

  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(message);
  }

  return data || [];
}

export async function getProductById(id: number): Promise<Product | null> {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .eq("id", id)
    .maybeSingle() as { data: Product | null; error: PostgrestError | null };

  if (error) {
    const message = error.message || JSON.stringify(error);
    throw new Error(message);
  }

  return data;
}