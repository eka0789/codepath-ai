"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

interface CareerRecommendation {
  id: string;
  careerPathId: string;
  score: number;
  reasoning?: string | null;
  careerPath?: {
    id: string;
    title: string;
    description?: string | null;
    averageSalary?: string | null;
    jobGrowth?: string | null;
    difficulty?: string | null;
  } | null;
}

interface CareerCardProps {
  recommendation: CareerRecommendation;
}

export function CareerCard({ recommendation }: CareerCardProps) {
  const { careerPath, score, reasoning } = recommendation;
  const scorePercent = Math.round(score * 100);

  const difficultyColor: Record<string, string> = {
    beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    intermediate: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    advanced: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">
              {careerPath?.title || "Unknown Path"}
            </CardTitle>
            {careerPath?.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {careerPath.description}
              </p>
            )}
          </div>
          {careerPath?.difficulty && (
            <Badge className={difficultyColor[careerPath.difficulty] || difficultyColor.intermediate}>
              {careerPath.difficulty}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-500 dark:text-gray-400">Match Score</span>
            <span className="font-semibold">{scorePercent}%</span>
          </div>
          <Progress value={scorePercent} className="h-2" />
        </div>

        {reasoning && (
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{reasoning}</p>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          {careerPath?.averageSalary && (
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Salary:</span>{" "}
              {careerPath.averageSalary}
            </div>
          )}
          {careerPath?.jobGrowth && (
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Growth:</span>{" "}
              {careerPath.jobGrowth}
            </div>
          )}
        </div>

        <Link
          href={`/career/${careerPath?.id || ""}`}
          className="block text-center text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          View Details →
        </Link>
      </CardContent>
    </Card>
  );
}
