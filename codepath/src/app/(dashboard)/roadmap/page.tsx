"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard, RoadmapPhase, EmptyState, LoadingSkeleton } from "@/components/domain";
import { useApi } from "@/hooks/use-api";
import { Sparkles, BookOpen, CheckCircle2, Code, Target } from "lucide-react";

interface RoadmapNode {
  id: string;
  title: string;
  description?: string | null;
  type?: string | null;
  difficulty?: string | null;
  estimatedHours?: number | null;
  order: number;
  status?: string | null;
  children?: RoadmapNode[];
}

interface LearningRoadmap {
  id: string;
  title: string;
  description?: string | null;
  estimatedHours?: number | null;
  estimatedWeeks?: number | null;
  status?: string | null;
  progress?: number | null;
  nodes: RoadmapNode[];
  careerPath?: {
    id: string;
    name: string;
    description?: string | null;
  } | null;
}

export default function RoadmapPage() {
  const {
    data: roadmap,
    loading,
    error,
    refetch,
  } = useApi<LearningRoadmap>({ url: "/api/roadmap" });

  const totalNodes = roadmap?.nodes?.reduce(
    (acc, n) => acc + 1 + (n.children?.length || 0),
    0
  ) || 0;
  const completedNodes = roadmap?.nodes?.reduce((acc, n) => {
    let count = n.status === "COMPLETED" ? 1 : 0;
    count += n.children?.filter((c) => c.status === "COMPLETED").length || 0;
    return acc + count;
  }, 0) || 0;

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
      ) : !roadmap ? (
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
              title="Progress"
              value={`${roadmap.progress ?? 0}%`}
              icon={<CheckCircle2 className="h-4 w-4" />}
            />
            <StatCard
              title="Total Nodes"
              value={totalNodes}
              icon={<BookOpen className="h-4 w-4" />}
            />
            <StatCard
              title="Selesai"
              value={`${completedNodes}/${totalNodes}`}
              icon={<Code className="h-4 w-4" />}
            />
          </div>

          {/* Roadmap header */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold">{roadmap.title}</h2>
            {roadmap.description && (
              <p className="text-sm text-muted-foreground mt-1">{roadmap.description}</p>
            )}
            {roadmap.careerPath && (
              <p className="text-xs text-muted-foreground mt-2">
                Career Path: <span className="font-medium text-foreground">{roadmap.careerPath.name}</span>
              </p>
            )}
            {(roadmap.estimatedHours || roadmap.estimatedWeeks) && (
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                {roadmap.estimatedHours && <span>{roadmap.estimatedHours} jam total</span>}
                {roadmap.estimatedWeeks && <span>{roadmap.estimatedWeeks} minggu</span>}
              </div>
            )}
          </div>

          {/* Phases (top-level nodes) */}
          <div className="space-y-4">
            {roadmap.nodes.map((node) => (
              <RoadmapPhase key={node.id} phase={node} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
