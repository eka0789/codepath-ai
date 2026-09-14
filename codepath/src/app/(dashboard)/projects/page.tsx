"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard, ProjectCard, EmptyState, LoadingSkeleton } from "@/components/domain";
import { useApi } from "@/hooks/use-api";
import { Plus, Sparkles, FolderOpen, CheckCircle2, Code } from "lucide-react";

interface ProjectTemplate {
  id: string;
  title: string;
  description?: string | null;
  complexity?: string | null;
  estimatedHours?: number | null;
  techStack?: string | null;
  category?: string | null;
}

interface UserProject {
  id: string;
  projectId: string;
  status: string;
  startedAt?: string | null;
  completedAt?: string | null;
  project?: ProjectTemplate;
}

interface ProjectData {
  userProjects: UserProject[];
  suggestions: ProjectTemplate[];
}

export default function ProjectsPage() {
  const { data: projectData, loading, error, refetch } = useApi<ProjectData>({ url: "/api/projects" });

  const userProjects = projectData?.userProjects || [];
  const suggestions = projectData?.suggestions || [];
  const completedCount = userProjects.filter((p) => p.status === "completed").length;
  const inProgressCount = userProjects.filter((p) => p.status === "active").length;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Bangun project untuk memperkuat skill kamu.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Sparkles className="mr-2 h-4 w-4" />
            Rekomendasikan Project
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Project Baru
          </Button>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton count={3} variant="stat" />
      ) : error ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-red-500 mb-2">Gagal memuat projects</p>
            <Button variant="outline" size="sm" onClick={refetch}>
              Coba Lagi
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <StatCard
              title="Total Project"
              value={userProjects.length}
              icon={<FolderOpen className="h-4 w-4" />}
            />
            <StatCard
              title="Selesai"
              value={completedCount}
              icon={<CheckCircle2 className="h-4 w-4" />}
            />
            <StatCard
              title="Sedang Dikerjakan"
              value={inProgressCount}
              icon={<Code className="h-4 w-4" />}
            />
          </div>

          {/* My Projects */}
          <h2 className="text-lg font-semibold mb-4">Project Saya</h2>
          {userProjects.length === 0 ? (
            <EmptyState
              title="Belum ada project"
              description="Mulai project baru atau pilih dari rekomendasi kami."
              action={{ label: "Lihat Rekomendasi", href: "#suggestions" }}
              icon={<FolderOpen className="h-12 w-12" />}
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 mb-8">
              {userProjects.map((up) => (
                <ProjectCard key={up.id} project={up} isUserProject />
              ))}
            </div>
          )}

          {/* Suggested Projects */}
          <div id="suggestions">
            <h2 className="text-lg font-semibold mb-4">Rekomendasi Project</h2>
            {suggestions.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    Semua project sudah dikerjakan. Check back nanti!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {suggestions.map((s) => (
                  <ProjectCard key={s.id} project={s} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
