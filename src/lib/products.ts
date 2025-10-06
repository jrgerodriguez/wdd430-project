import { supabase } from "@/lib/supabaseClient";
import { Product } from "@/types/product";

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

export async function getProductById(id: number): Promise<Product> {
  const { data, error } = await supabase
    .from("product")
    .select("*")
    .eq("id", id)
    .single() as { data: Product | null; error: unknown };

  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(message);
  }

  return data!;
}

export async function AddProduct (product: Omit<Product, 'id'>): Promise<Product> {
  const { data, error } = await supabase
    .from('product')
    .insert([product])
    .select()
    .single() as { data: Product | null; error: unknown };
    
  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(message);
  }
  return data!;
}

export async function UpdateProduct (id: number, product: Omit<Product, 'id'>): Promise<Product> {
  const { data, error } = await supabase
    .from('product')
    .update(product)
    .eq('id', id)
    .select()
    .single() as { data: Product | null; error: unknown };
    
  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(message);
  }
  return data!;
}

export async function DeleteProduct (id: number): Promise<void> {
  const { error } = await supabase
    .from('product')
    .delete()
    .eq('id', id);
    
  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(message);
  }
}