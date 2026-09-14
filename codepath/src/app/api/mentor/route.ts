import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Placeholder response - integrate with Vercel AI SDK later
    const reply = `Halo! Saya AI Mentor CodePath AI. 

Kamu bertanya: "${message}"

Saat ini saya masih dalam tahap pengembangan. Fitur AI Mentor akan segera tersedia dengan kemampuan:
- Rekomendasi career path
- Penjelasan konsep coding
- Code review
- Study plan personalisasi

Nantikan update selanjutnya! 🚀`;

    return NextResponse.json({ success: true, data: { reply } });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
