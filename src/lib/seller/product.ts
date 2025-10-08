import { supabase } from "@/lib/supabaseClient";
import { Product } from "@/types/product";

export async function getProductsBySellerId(seller_id: number): Promise<Product[]> {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .eq("seller_id", seller_id)

  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(message);
  }

  return data as Product[];
}