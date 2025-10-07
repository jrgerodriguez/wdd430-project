import { NextRequest, NextResponse } from "next/server";
import { createNewUser } from "@/lib/users";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@/types/user";
import { hashPassword } from "@/lib/auth";
import { findUserByEmail } from "@/lib/users";
import { sign } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

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

    //Generate JWT
    const token = sign({ id: createdUser.id, email: createdUser.email }, JWT_SECRET, { expiresIn: "1h" });

    // Create Answer and set cookie
    const response = NextResponse.json({ message: "User created successfully" }, { status: 201 });
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return response;

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}