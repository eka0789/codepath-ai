"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Clock, Cpu, BookOpen, Code2, Zap } from "lucide-react";

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

interface RoadmapPhaseProps {
  phase: RoadmapNode;
  completedNodeIds?: string[];
}

const nodeTypeIcons: Record<string, typeof BookOpen> = {
  TOPIC: BookOpen,
  SKILL: Code2,
  PROJECT: Cpu,
  MILESTONE: Zap,
};

function getNodeStatus(node: RoadmapNode, completedNodeIds: string[]): boolean {
  return completedNodeIds.includes(node.id) || node.status === "COMPLETED";
}

export function RoadmapPhase({ phase, completedNodeIds = [] }: RoadmapPhaseProps) {
  const children = phase.children || [];
  const completedCount = children.filter((c) => getNodeStatus(c, completedNodeIds)).length;
  const progressPercent =
    children.length > 0 ? Math.round((completedCount / children.length) * 100) : 0;

  const Icon = nodeTypeIcons[phase.type || "TOPIC"] || BookOpen;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-bold">
              {phase.order}
            </div>
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                {phase.title}
              </CardTitle>
              {phase.description && (
                <p className="text-xs text-muted-foreground mt-0.5">{phase.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {phase.difficulty && (
              <Badge variant="outline" className="text-xs">
                {phase.difficulty}
              </Badge>
            )}
            <Badge variant={progressPercent === 100 ? "default" : "outline"}>
              {completedCount}/{children.length}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {children.length > 0 && <Progress value={progressPercent} className="h-2" />}
        <div className="space-y-2">
          {children.map((child) => {
            const isCompleted = getNodeStatus(child, completedNodeIds);
            const ChildIcon = nodeTypeIcons[child.type || "TOPIC"] || BookOpen;
            return (
              <div
                key={child.id}
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                ) : (
                  <Circle className="h-4 w-4 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                )}
                <ChildIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      isCompleted
                        ? "text-gray-400 dark:text-gray-500 line-through"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {child.title}
                  </p>
                  {child.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {child.description}
                    </p>
                  )}
                </div>
                {child.estimatedHours && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{child.estimatedHours}h</span>
                  </div>
                )}
              </div>
            );
          })}
          {children.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              Belum ada modul di phase ini
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
