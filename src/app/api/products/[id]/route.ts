import { supabase } from '@/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

// ✅ PUT - Update product by ID
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
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
    .eq("id", Number(id));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Product updated successfully." });
}

// ✅ DELETE
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const { error } = await supabase
    .from("product")
    .delete()
    .eq("id", Number(id));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Product deleted successfully" }); // ✅ Siempre JSON
}