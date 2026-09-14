import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dna = await prisma.codingDNA.findUnique({
      where: { userId: session.user.id },
    });

    if (!dna) {
      return NextResponse.json(
        { success: true, data: null, message: "No Coding DNA found. Complete an assessment first." },
        { status: 200 }
      );
    }

    // Calculate composite metrics
    const dimensions = [
      { name: "Problem Solving", value: dna.problemSolving, icon: "puzzle" },
      { name: "Algorithmic Thinking", value: dna.algorithmicThinking, icon: "brain" },
      { name: "System Design", value: dna.systemDesign, icon: "network" },
      { name: "Code Quality", value: dna.codeQuality, icon: "code" },
      { name: "Debugging", value: dna.debugging, icon: "bug" },
      { name: "Creativity", value: dna.creativity, icon: "lightbulb" },
      { name: "Collaboration", value: dna.collaboration, icon: "users" },
      { name: "Learning Ability", value: dna.learningAbility, icon: "graduation" },
    ];

    const avgScore = Math.round(
      dimensions.reduce((acc, d) => acc + d.value, 0) / dimensions.length
    );

    const strongest = [...dimensions].sort((a, b) => b.value - a.value).slice(0, 3);
    const weakest = [...dimensions].sort((a, b) => a.value - b.value).slice(0, 3);

    return NextResponse.json({
      success: true,
      data: {
        ...dna,
        dimensions,
        avgScore,
        strongest,
        weakest,
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}