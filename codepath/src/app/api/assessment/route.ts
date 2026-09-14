import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const assessments = await prisma.assessment.findMany({
      where: { userId: session.user.id },
      orderBy: { startedAt: "desc" },
    });

    return NextResponse.json({ success: true, data: assessments });
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
    const { score, answers } = body;

    if (typeof score !== "number") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const assessment = await prisma.assessment.create({
      data: {
        userId: session.user.id,
        type: "COMPREHENSIVE",
        score,
        status: "COMPLETED",
        completedAt: new Date(),
        duration: 0,
      },
    });

    // Create assessment answers if provided
    if (Array.isArray(answers)) {
      await prisma.assessmentAnswer.createMany({
        data: answers.map((a: { questionId: string; answer: string; isCorrect?: boolean }) => ({
          assessmentId: assessment.id,
          questionId: a.questionId,
          answer: a.answer,
          isCorrect: a.isCorrect ?? false,
        })),
      });
    }

    // Upsert CodingDNA based on score
    const dnaFields = {
      problemSolving: Math.min(100, Math.max(0, score)),
      algorithmicThinking: Math.min(100, Math.max(0, score - 5)),
      systemDesign: Math.min(100, Math.max(0, score - 10)),
      codeQuality: Math.min(100, Math.max(0, score + 5)),
      debugging: Math.min(100, Math.max(0, score - 3)),
      creativity: Math.min(100, Math.max(0, score - 8)),
      collaboration: Math.min(100, Math.max(0, score + 2)),
      learningAbility: Math.min(100, Math.max(0, score + 1)),
    };

    await prisma.codingDNA.upsert({
      where: { userId: session.user.id },
      update: {
        ...dnaFields,
        analyzedAt: new Date(),
        version: { increment: 1 },
      },
      create: {
        userId: session.user.id,
        ...dnaFields,
      },
    });

    return NextResponse.json({ success: true, data: assessment });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
