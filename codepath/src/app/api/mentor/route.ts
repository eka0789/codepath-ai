import { streamText, type LanguageModelV1 } from "ai";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getAIProvider } from "@/lib/ai";

const systemPrompt = `Kamu adalah AI Mentor CodePath AI — mentor coding pribadi yang membantu developer Indonesia berkembang.

Gaya bicaramu:
- Gunakan bahasa Indonesia yang ramah dan memotivasi
- Berikan jawaban yang praktis dan langsung bisa diterapkan
- Sertakan contoh kode jika relevan
- Dorong user untuk terus belajar dan mencoba hal baru
- Singkat, padat, dan to the point — hindari penjelasan yang terlalu panjang
- Gunakan markdown untuk formatting (bold, code blocks, list)

Kamu bisa membantu dengan:
1. Rekomendasi career path berdasarkan skill user
2. Penjelasan konsep coding dengan bahasa sederhana
3. Code review dan saran perbaikan
4. Study plan personalisasi
5. Tips dan trik productivity
6. Persiapan technical interview`;

function buildUserContext(
  profile: { experienceLevel?: string | null; preferredCategories?: string[] | null; goals?: string[] | null } | null,
  skills: { skill: { name: string; category: string }; score: number; level: string }[],
  assessments: { score: number | null; type: string }[],
  career: { matchScore: number; careerPath?: { name?: string | null; description?: string | null } | null } | null
): string {
  const parts: string[] = [];

  if (profile) {
    parts.push(`Level pengalaman: ${profile.experienceLevel || "tidak diketahui"}`);
    if (profile.preferredCategories?.length) parts.push(`Kategori favorit: ${profile.preferredCategories.join(", ")}`);
    if (profile.goals?.length) parts.push(`Goals: ${profile.goals.join(", ")}`);
  }

  if (skills.length > 0) {
    const skillList = skills.slice(0, 8).map(s => `${s.skill.name} (${s.skill.category}, level ${s.level}, skor ${s.score})`).join(", ");
    parts.push(`Skill: ${skillList}`);
  }

  if (assessments.length > 0) {
    const latest = assessments[0];
    parts.push(`Skor assessment terakhir: ${latest.score ?? "tidak ada"} (tipe: ${latest.type})`);
  }

  if (career?.careerPath) {
    parts.push(`Career path: ${career.careerPath.name} (match ${career.matchScore}%)`);
    if (career.careerPath.description) parts.push(`Deskripsi career: ${career.careerPath.description}`);
  }

  return parts.length > 0 ? `\n\nKonteks user:\n${parts.join("\n")}` : "";
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response("Messages required", { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage?.content || typeof lastMessage.content !== "string") {
      return new Response("Invalid message", { status: 400 });
    }

    const userId = session.user.id;

    const [profile, userSkills, assessments, career] = await Promise.all([
      prisma.profile.findUnique({
        where: { userId },
        select: {
          experienceLevel: true,
          preferredCategories: true,
          goals: true,
        },
      }),
      prisma.userSkill.findMany({
        where: { userId },
        include: { skill: { select: { name: true, category: true } } },
        orderBy: { score: "desc" },
        take: 10,
      }),
      prisma.assessment.findMany({
        where: { userId },
        orderBy: { completedAt: "desc" },
        take: 3,
        select: { score: true, type: true },
      }),
      prisma.careerRecommendation.findFirst({
        where: { userId },
        orderBy: { matchScore: "desc" },
        select: {
          matchScore: true,
          careerPath: { select: { name: true, description: true } },
        },
      }),
    ]);

    const userContext = buildUserContext(profile, userSkills, assessments, career);
    const fullSystemPrompt = systemPrompt + userContext;

    const { provider, model } = getAIProvider();

    const result = streamText({
      model: provider(model) as unknown as LanguageModelV1,
      system: fullSystemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
      })),
      maxTokens: 1024,
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Mentor error:", error);

    // If AI provider fails (no API key, rate limit, etc.), fall back to contextual reply
    if (error instanceof Error && (
      error.message.includes("API key") ||
      error.message.includes("api_key") ||
      error.message.includes("Unauthorized")
    )) {
      return new Response(
        JSON.stringify({
          error: "AI provider not configured. Please add ANTHROPIC_API_KEY to your .env file."
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response("Internal server error", { status: 500 });
  }
}
