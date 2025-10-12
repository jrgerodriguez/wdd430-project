import { supabase } from '@/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

// ✅ DELETE - Delete product by ID
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: 'Error deleting the product.' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Product deleted successfully!' }, { status: 200 });
}

// ✅ PUT - Update product by ID
export async function PUT(
  req: NextRequest,
   {params}: { params: { id: number } }
) {
  const { id } = params;
  const body = await req.json();

  const { name, description, category, price } = body;

  const { error } = await supabase
    .from("product")
    .update({
      name,
      description,
      category,
      price,
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Product updated successfully." });
}

// ✅ GET - Fetch product by ID
export async function GET(
  req: NextRequest,
   context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message || "Product not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
