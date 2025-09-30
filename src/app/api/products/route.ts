import { NextRequest, NextResponse } from "next/server";
import { getAllProducts } from "@/lib/products";

export async function GET(request: NextRequest) {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}