"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Skill {
  id: string;
  skill?: { name: string; category: string };
  skillId: string;
  level: number;
}

interface SkillCardProps {
  skill: Skill;
  showCategory?: boolean;
}

const levelLabels: Record<number, string> = {
  1: "Beginner",
  2: "Elementary",
  3: "Intermediate",
  4: "Upper-Intermediate",
  5: "Advanced",
  6: "Expert",
  7: "Master",
  8: "Grandmaster",
  9: "Challenger",
  10: "Legend",
};

const levelColors: Record<number, string> = {
  1: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  2: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  3: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  4: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  5: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  6: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  7: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  8: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  9: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  10: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
};

export function SkillCard({ skill, showCategory = true }: SkillCardProps) {
  const level = Math.min(10, Math.max(1, skill.level));
  const progressPercent = (level / 10) * 100;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            {skill.skill?.name || "Unknown Skill"}
          </CardTitle>
          {showCategory && skill.skill?.category && (
            <Badge variant="outline" className="text-xs">
              {skill.skill.category}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Level {level}</span>
          <Badge className={levelColors[level] || levelColors[1]}>{levelLabels[level]}</Badge>
        </div>
        <Progress value={progressPercent} className="h-2" />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {progressPercent}% to next level
        </p>
      </CardContent>
    </Card>
  );
}
