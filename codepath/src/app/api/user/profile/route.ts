import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      onboarded: user.onboarded,
      profile: user.profile,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, image, onboarded, experienceLevel, interests, goals } = body;

    // Update User fields
    const userUpdate: Record<string, unknown> = {};
    if (name) userUpdate.name = name;
    if (image) userUpdate.image = image;
    if (typeof onboarded === "boolean") userUpdate.onboarded = onboarded;

    if (Object.keys(userUpdate).length > 0) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: userUpdate,
      });
    }

    // Update or create Profile with onboarding data
    const profileUpdate: Record<string, unknown> = {};
    if (experienceLevel) profileUpdate.experienceLevel = experienceLevel;
    if (Array.isArray(interests)) profileUpdate.preferredCategories = interests;
    if (Array.isArray(goals)) profileUpdate.goals = goals;

    if (Object.keys(profileUpdate).length > 0) {
      await prisma.profile.upsert({
        where: { userId: session.user.id },
        create: { userId: session.user.id, ...profileUpdate },
        update: profileUpdate,
      });
    }

    // Return updated user with profile
    const updated = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { profile: true },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
