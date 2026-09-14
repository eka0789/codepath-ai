import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  const cookieNames = ["authjs.session-token", "__Secure-authjs.session-token", "next-auth.session-token", "__Secure-next-auth.session-token"];

  return NextResponse.json({
    session: session ? { user: session.user } : null,
    note: session ? "AUTH WORKS - cookie is valid" : "NO SESSION - cookie missing or invalid",
  });
}
