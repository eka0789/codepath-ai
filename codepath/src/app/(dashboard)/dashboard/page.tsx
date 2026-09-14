"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/domain";
import { LoadingSkeleton } from "@/components/domain";
import { useApi } from "@/hooks/use-api";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Code,
  GraduationCap,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  FolderOpen,
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  onboarded: boolean;
  profile: {
    experienceLevel: string | null;
    preferredCategories: string | null;
  } | null;
}

interface SkillData {
  id: string;
  skillId: string;
  level: string;
  score: number;
  skill: { name: string; category: string };
}

interface CareerData {
  recommendations: { id: string; score: number; reasoning: string | null }[];
}

interface RoadmapData {
  title: string;
  progress: number;
  nodes: { id: string; status: string }[];
  careerPath: { name: string } | null;
}

interface ProjectData {
  userProjects: { id: string; status: string }[];
  suggestions: { id: string }[];
}

interface AssessmentData {
  id: string;
  score: number | null;
  startedAt: string;
}[]

export default function DashboardPage() {
  const { data: session, status: sessionStatus } = useSession();
  const { data: profile, loading: profileLoading } = useApi<UserProfile>({ url: "/api/user/profile" });
  const { data: skills, loading: skillsLoading } = useApi<SkillData[]>({ url: "/api/skills" });
  const { data: career, loading: careerLoading } = useApi<CareerData>({ url: "/api/career" });
  const { data: roadmap, loading: roadmapLoading } = useApi<RoadmapData>({ url: "/api/roadmap" });
  const { data: projects, loading: projectLoading } = useApi<ProjectData>({ url: "/api/projects" });
  const { data: assessments, loading: assessmentLoading } = useApi<AssessmentData[]>({ url: "/api/assessment" });

  const isLoading = profileLoading || skillsLoading || careerLoading || roadmapLoading || projectLoading || assessmentLoading;

  const userName = profile?.name?.split(" ")[0] || session?.user?.name?.split(" ")[0] || "Developer";
  const skillCount = skills?.length || 0;
  const avgLevel = skills?.length
    ? Math.round(skills.reduce((acc, s) => acc + s.score, 0) / skills.length)
    : 0;
  const assessmentCount = assessments?.length || 0;
  const latestScore = assessments?.length ? assessments[0].score : 0;
  const topSkill = skills?.length
    ? [...skills].sort((a, b) => b.score - a.score)[0]
    : null;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Selamat datang kembali, {userName}! Ini adalah ringkasan progress kamu.
        </p>
      </div>

      {isLoading ? (
        <LoadingSkeleton count={4} variant="stat" />
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard
              title="Skill Level"
              value={avgLevel > 0 ? `Level ${avgLevel}` : "Belum ada data"}
              description={`${skillCount} skill tertrack`}
              icon={<Target className="h-4 w-4" />}
            />
            <StatCard
              title="Assessment"
              value={latestScore && latestScore > 0 ? `${latestScore}%` : "Belum ada"}
              description={`${assessmentCount} assessment dikerjakan`}
              icon={<BarChart3 className="h-4 w-4" />}
            />
            <StatCard
              title="Top Skill"
              value={topSkill?.skill?.name || "Belum ada"}
              description={topSkill ? `Level ${topSkill.level}` : "Selesaikan assessment terlebih dahulu"}
              icon={<Code className="h-4 w-4" />}
            />
            <StatCard
              title="Roadmap Aktif"
              value={roadmap?.title ? roadmap.title : "Tidak ada"}
              description={roadmap?.progress != null ? `${Math.round(roadmap.progress)}% selesai` : "Mulai roadmap baru"}
              icon={<GraduationCap className="h-4 w-4" />}
            />
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <Link href="/assessment">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Coding Assessment</CardTitle>
                      <CardDescription>Analisis skill coding kamu</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Link>
            </Card>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <Link href="/career">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Career Paths</CardTitle>
                      <CardDescription>Rekomendasi karir dari AI</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Link>
            </Card>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer">
              <Link href="/roadmap">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Learning Roadmap</CardTitle>
                      <CardDescription>Belajar sesuai roadmap</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Link>
            </Card>
          </div>

          {/* Progress Section */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Top Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Top Skills</CardTitle>
                <CardDescription>Skill dengan level tertinggi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills && skills.length > 0 ? (
                  [...skills]
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 5)
                    .map((s) => (
                      <div key={s.id} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{s.skill?.name || "Unknown"}</span>
                          <span className="text-muted-foreground">Level {s.level}</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${s.score}%` }}
                          />
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-sm text-muted-foreground py-4 text-center">
                    Belum ada skill. Mulai assessment untuk melihat skill kamu.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Active Projects */}
            <Card>
              <CardHeader>
                <CardTitle>Project Aktif</CardTitle>
                <CardDescription>Project yang sedang kamu kerjakan</CardDescription>
              </CardHeader>
              <CardContent>
                {projects?.userProjects && projects.userProjects.length > 0 ? (
                  <div className="space-y-3">
                    {projects.userProjects.slice(0, 5).map((p) => (
                      <div key={p.id} className="flex items-center gap-3 rounded-lg border p-3">
                        <FolderOpen className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm font-medium flex-1 truncate">Project {p.id.slice(0, 8)}</span>
                        <Badge variant={p.status === "completed" ? "default" : "secondary"}>
                          {p.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground py-4 text-center">
                    Belum ada project. Mulai project baru dari halaman Projects.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
