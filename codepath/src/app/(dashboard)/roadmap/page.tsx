"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatCard, RoadmapPhase, EmptyState, LoadingSkeleton } from "@/components/domain";
import { useApi } from "@/hooks/use-api";
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  Code,
  Target,
  Rocket,
} from "lucide-react";

interface RoadmapModule {
  id: string;
  title: string;
  description?: string | null;
  type?: string | null;
  estimatedHours?: number | null;
  order: number;
}

interface RoadmapPhaseData {
  id: string;
  title: string;
  description?: string | null;
  order: number;
  modules: RoadmapModule[];
}

interface Roadmap {
  id: string;
  title: string;
  description?: string | null;
  phases: RoadmapPhaseData[];
}

interface UserRoadmap {
  id: string;
  roadmapId: string;
  enrolledAt: string;
  roadmap: Roadmap;
}

export default function RoadmapPage() {
  const { data: userRoadmaps, loading, error, refetch } = useApi<UserRoadmap[]>({ url: "/api/roadmap" });

  const activeRoadmaps = userRoadmaps || [];
  const totalPhases = activeRoadmaps.reduce((acc, r) => acc + r.roadmap.phases.length, 0);
  const totalModules = activeRoadmaps.reduce(
    (acc, r) => acc + r.roadmap.phases.reduce((a, p) => a + p.modules.length, 0),
    0
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Learning Roadmap</h1>
          <p className="text-muted-foreground">
            Roadmap belajar personal berdasarkan goal kamu.
          </p>
        </div>
        <Button>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Roadmap Baru
        </Button>
      </div>

      {loading ? (
        <LoadingSkeleton count={3} variant="card" />
      ) : error ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-red-500 mb-2">Gagal memuat roadmap</p>
            <Button variant="outline" size="sm" onClick={refetch}>
              Coba Lagi
            </Button>
          </CardContent>
        </Card>
      ) : activeRoadmaps.length === 0 ? (
        <EmptyState
          title="Belum ada roadmap"
          description="Mulai learning roadmap yang dipersonalisasi untuk goal kamu."
          action={{ label: "Generate Roadmap", href: "/assessment" }}
          icon={<Target className="h-12 w-12" />}
        />
      ) : (
        <>
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <StatCard
              title="Roadmap Aktif"
              value={activeRoadmaps.length}
              icon={<BookOpen className="h-4 w-4" />}
            />
            <StatCard
              title="Total Phase"
              value={totalPhases}
              icon={<CheckCircle2 className="h-4 w-4" />}
            />
            <StatCard
              title="Total Modul"
              value={totalModules}
              icon={<Code className="h-4 w-4" />}
            />
          </div>

          {/* Roadmaps */}
          {activeRoadmaps.map((userRoadmap) => {
            const roadmap = userRoadmap.roadmap;
            return (
              <div key={userRoadmap.id} className="mb-8">
                <h2 className="text-lg font-semibold mb-4">{roadmap.title}</h2>
                <div className="space-y-4">
                  {roadmap.phases.map((phase) => (
                    <RoadmapPhase key={phase.id} phase={phase} />
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
