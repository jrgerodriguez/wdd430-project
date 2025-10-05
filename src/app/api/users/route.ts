import { NextRequest, NextResponse } from "next/server";
import { createNewUser } from "@/lib/users";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@/types/user";
import { hashPassword } from "@/lib/auth";
import { findUserByEmail } from "@/lib/users";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // 1. Check if email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password)

    const newUser = {
    email: email,
    password: hashedPassword,
    };

    const createdUser = await createNewUser(newUser);

    return NextResponse.json(createdUser, { status: 201 });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}