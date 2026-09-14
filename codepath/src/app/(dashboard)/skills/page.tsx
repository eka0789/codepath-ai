"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard, SkillCard, EmptyState, LoadingSkeleton } from "@/components/domain";
import { useApi } from "@/hooks/use-api";
import {
  Sparkles,
  Target,
  TrendingUp,
  Code,
  Server,
  Database,
  Layers,
  Plus,
  Search,
} from "lucide-react";

interface Skill {
  id: string;
  skillId: string;
  level: number;
  skill: { name: string; category: string };
}

export default function SkillsPage() {
  const { data: skills, loading, error, refetch } = useApi<Skill[]>({ url: "/api/skills" });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const allSkills = skills || [];
  const filteredSkills = allSkills.filter((s) => {
    const matchesSearch =
      !searchQuery || s.skill?.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || s.skill?.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(allSkills.map((s) => s.skill?.category).filter(Boolean))];
  const avgLevel = allSkills.length
    ? Math.round(allSkills.reduce((acc, s) => acc + s.level, 0) / allSkills.length)
    : 0;

  const categoryIcons: Record<string, typeof Code> = {
    Frontend: Code,
    Backend: Server,
    Database: Database,
    DevOps: Layers,
  };

  const categoryColors: Record<string, { text: string; bg: string }> = {
    Frontend: { text: "text-blue-500", bg: "bg-blue-500/10" },
    Backend: { text: "text-emerald-500", bg: "bg-emerald-500/10" },
    Database: { text: "text-violet-500", bg: "bg-violet-500/10" },
    DevOps: { text: "text-amber-500", bg: "bg-amber-500/10" },
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Skills</h1>
          <p className="text-muted-foreground">
            Tracking dan manage semua skill coding kamu.
          </p>
        </div>
        <Button>
          <Sparkles className="mr-2 h-4 w-4" />
          Tambah Skill
        </Button>
      </div>

      {loading ? (
        <LoadingSkeleton count={4} variant="stat" />
      ) : error ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-red-500 mb-2">Gagal memuat skills</p>
            <Button variant="outline" size="sm" onClick={refetch}>
              Coba Lagi
            </Button>
          </CardContent>
        </Card>
      ) : allSkills.length === 0 ? (
        <EmptyState
          title="Belum ada skill"
          description="Mulai coding assessment untuk menemukan skill kamu atau tambahkan skill secara manual."
          action={{ label: "Mulai Assessment", href: "/assessment" }}
          icon={<Target className="h-12 w-12" />}
        />
      ) : (
        <>
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <StatCard
              title="Total Skills"
              value={allSkills.length}
              icon={<Target className="h-4 w-4" />}
            />
            <StatCard
              title="Rata-rata Level"
              value={avgLevel}
              description="dari 10"
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <StatCard
              title="Kategori"
              value={categories.length}
              icon={<Layers className="h-4 w-4" />}
            />
            <StatCard
              title="Top Skill"
              value={[...allSkills].sort((a, b) => b.level - a.level)[0]?.skill?.name || "N/A"}
              icon={<Code className="h-4 w-4" />}
            />
          </div>

          {/* Search & Filter */}
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border bg-background pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex gap-1">
              <Button
                variant={filterCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCategory("all")}
              >
                Semua
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={filterCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategory(cat || "all")}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Skill Groups */}
          {filterCategory === "all" ? (
            <div className="space-y-6">
              {categories.map((category) => {
                const catSkills = filteredSkills.filter((s) => s.skill?.category === category);
                if (catSkills.length === 0) return null;
                const Icon = categoryIcons[category || ""] || Code;
                const colors = categoryColors[category || ""] || { text: "text-gray-500", bg: "bg-gray-500/10" };
                return (
                  <Card key={category}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} ${colors.text}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{category}</CardTitle>
                          <CardDescription>{catSkills.length} skills</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {catSkills.map((skill) => (
                          <SkillCard key={skill.id} skill={skill} showCategory={false} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
