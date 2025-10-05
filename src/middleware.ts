import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "supersecret");

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {

    const { payload } = await jwtVerify(token, JWT_SECRET);
    console.log("✅ Token válido:", payload);

    return NextResponse.next();
  } catch (err) {
    console.error("❌ Token inválido:", err);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/home",
    "/home/:path*",
    "/marketplace",
    "/marketplace/:path*",
    "/about",
    "/about/:path*",
    "/contact",
    "/contact/:path*",
  ],
};
