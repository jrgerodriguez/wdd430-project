import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("POST body received:", body);

  const { comment, productId, rating } = body;

  if (!comment || rating == null || !productId) {
    console.log("Missing fields", { comment, productId, rating });
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  
  const { data, error } = await supabase
    .from("comment")
    .insert([{ comment, product_id: Number(productId), rating }])
    .select();

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log("Inserted data:", data);
  return NextResponse.json(data[0]);
}


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  const { data, error } = await supabase
    .from("comment")
    .select("*")
    .eq("product_id", productId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
