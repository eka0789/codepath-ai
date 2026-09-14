"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: { label: string; href: string };
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        {icon && <div className="mb-4 text-gray-400 dark:text-gray-500">{icon}</div>}
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-md">{description}</p>
        {action && (
          <Link
            href={action.href}
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
          >
            {action.label}
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
