"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Clock } from "lucide-react";

interface RoadmapModule {
  id: string;
  title: string;
  description?: string | null;
  type?: string | null;
  estimatedHours?: number | null;
  order: number;
}

interface RoadmapPhaseProps {
  phase: {
    id: string;
    title: string;
    description?: string | null;
    order: number;
    modules: RoadmapModule[];
  };
  completedModuleIds?: string[];
}

export function RoadmapPhase({ phase, completedModuleIds = [] }: RoadmapPhaseProps) {
  const completedCount = phase.modules.filter((m) => completedModuleIds.includes(m.id)).length;
  const progressPercent =
    phase.modules.length > 0 ? Math.round((completedCount / phase.modules.length) * 100) : 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-bold">
              {phase.order}
            </div>
            <div>
              <CardTitle className="text-base font-semibold">{phase.title}</CardTitle>
              {phase.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{phase.description}</p>
              )}
            </div>
          </div>
          <Badge variant={progressPercent === 100 ? "default" : "outline"}>
            {completedCount}/{phase.modules.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Progress value={progressPercent} className="h-2" />
        <div className="space-y-2">
          {phase.modules.map((mod) => {
            const isCompleted = completedModuleIds.includes(mod.id);
            return (
              <div
                key={mod.id}
                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                ) : (
                  <Circle className="h-4 w-4 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${
                      isCompleted
                        ? "text-gray-400 dark:text-gray-500 line-through"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {mod.title}
                  </p>
                  {mod.estimatedHours && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-400">{mod.estimatedHours}h</span>
                    </div>
                  )}
                </div>
                {mod.type && (
                  <Badge variant="outline" className="text-xs">
                    {mod.type}
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
