import { NextRequest, NextResponse } from "next/server";
import { createNewUser } from "@/lib/users";
import { User } from "@/types/user";
import { hashPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

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