import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userProjects = await prisma.project.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    const suggestions = await prisma.project.findMany({
      where: { userId: session.user.id, status: "IDEA" },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: { userProjects, suggestions },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
