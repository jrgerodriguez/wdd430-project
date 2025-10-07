import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { findUserByEmail } from "@/lib/users";
import { comparePassword } from "@/lib/auth";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function POST(req: NextRequest) {
    try {
        const {email, password} = await req.json()
        
        const user = await findUserByEmail(email);
        if(!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isValid = await comparePassword(password, user.password)
        if (!isValid) {
            return NextResponse.json({error: "Invalid Password"}, {status: 401}) 
        } 

        const token = sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
        });

        const response = NextResponse.json({ message: "Login successful" });
        response.cookies.set("token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60, 
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        });

        return response;

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}