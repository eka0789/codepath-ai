import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const roadmap = await prisma.learningRoadmap.findFirst({
      where: { userId: session.user.id },
      include: {
        nodes: {
          orderBy: { order: "asc" },
        },
        careerPath: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: roadmap });
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
    const { roadmapId } = body;

    if (!roadmapId) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const roadmap = await prisma.learningRoadmap.findUnique({
      where: { id: roadmapId },
    });

    if (!roadmap) {
      return NextResponse.json({ error: "Roadmap not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: roadmap });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
