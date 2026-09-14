import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const skills = await prisma.userSkill.findMany({
      where: { userId: session.user.id },
      include: { skill: true },
      orderBy: { level: "desc" },
    });

    return NextResponse.json({ success: true, data: skills });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { skillId, level } = body;

    if (!skillId) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const upserted = await prisma.userSkill.upsert({
      where: {
        userId_skillId: { userId: session.user.id, skillId },
      },
      update: { score: level ?? 0 },
      create: {
        userId: session.user.id,
        skillId,
        level: "BEGINNER",
        score: level ?? 0,
      },
    });

    return NextResponse.json({ success: true, data: upserted });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
