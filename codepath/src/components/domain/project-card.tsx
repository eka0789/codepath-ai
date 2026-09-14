"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, ExternalLink } from "lucide-react";

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

interface ProjectCardProps {
  project: ProjectTemplate | UserProject;
  isUserProject?: boolean;
}

const complexityColor: Record<string, string> = {
  easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  hard: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  advanced: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
};

const statusColor: Record<string, string> = {
  active: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  paused: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

export function ProjectCard({ project, isUserProject = false }: ProjectCardProps) {
  if (isUserProject) {
    const userProject = project as UserProject;
    const template = userProject.project;
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-base font-semibold">
              {template?.title || "Unknown Project"}
            </CardTitle>
            <Badge className={statusColor[userProject.status] || statusColor.active}>
              {userProject.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {template?.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {template.description}
            </p>
          )}
          {template?.techStack && (
            <div className="flex flex-wrap gap-1">
              {template.techStack.split(",").map((tech) => (
                <Badge key={tech.trim()} variant="outline" className="text-xs">
                  {tech.trim()}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            {template?.estimatedHours && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{template.estimatedHours}h</span>
              </div>
            )}
            {userProject.startedAt && (
              <span>Started {new Date(userProject.startedAt).toLocaleDateString()}</span>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const template = project as ProjectTemplate;
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-semibold">{template.title}</CardTitle>
          {template.complexity && (
            <Badge className={complexityColor[template.complexity] || complexityColor.easy}>
              {template.complexity}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {template.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {template.description}
          </p>
        )}
        {template.techStack && (
          <div className="flex flex-wrap gap-1">
            {template.techStack.split(",").map((tech) => (
              <Badge key={tech.trim()} variant="outline" className="text-xs">
                {tech.trim()}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            {template.estimatedHours && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{template.estimatedHours}h</span>
              </div>
            )}
            {template.category && <Badge variant="outline" className="text-xs">{template.category}</Badge>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
