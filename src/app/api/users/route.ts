import { NextRequest, NextResponse } from "next/server";
import { createNewUser } from "@/lib/users";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@/types/user";
import { hashPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 1. Check if email already exists
    const { data: existingUser, error: findError } = await supabase
      .from("user")
      .select("id")
      .eq("email", body.email)
      .single();

    if (findError && findError.code !== "PGRST116") {
      throw new Error(findError.message);
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(body.password)

    const newUser = {
    email: body.email,
    password: hashedPassword,
    };

    const createdUser = await createNewUser(newUser);

    return NextResponse.json(createdUser, { status: 201 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}