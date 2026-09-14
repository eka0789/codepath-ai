import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [recommendations, paths] = await Promise.all([
      prisma.careerRecommendation.findMany({
        where: { userId: session.user.id },
        orderBy: { matchScore: "desc" },
      }),
      prisma.careerPath.findMany({
        orderBy: { name: "asc" },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: { recommendations, paths },
    });
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
    const { careerPathId, matchScore, reasoning } = body;

    if (!careerPathId || typeof matchScore !== "number") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const created = await prisma.careerRecommendation.create({
      data: {
        userId: session.user.id,
        careerPathId,
        matchScore,
        reasoning,
      },
    });

    return NextResponse.json({ success: true, data: created });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
