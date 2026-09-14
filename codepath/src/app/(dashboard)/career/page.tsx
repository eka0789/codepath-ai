"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CareerCard, EmptyState, LoadingSkeleton } from "@/components/domain";
import { useApi } from "@/hooks/use-api";
import { TrendingUp, Sparkles, Target } from "lucide-react";
import Link from "next/link";

interface CareerPath {
  id: string;
  title: string;
  description?: string | null;
  averageSalary?: string | null;
  jobGrowth?: string | null;
  difficulty?: string | null;
  popularity?: number | null;
}

interface CareerRecommendation {
  id: string;
  careerPathId: string;
  score: number;
  reasoning?: string | null;
  careerPath?: CareerPath | null;
}

interface CareerData {
  recommendations: CareerRecommendation[];
  paths: CareerPath[];
}

export default function CareerPage() {
  const { data: careerData, loading, error, refetch } = useApi<CareerData>({ url: "/api/career" });

  const recommendations = careerData?.recommendations || [];
  const paths = careerData?.paths || [];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Career Paths</h1>
          <p className="text-muted-foreground">
            Rekomendasi karir berdasarkan skill dan minat kamu.
          </p>
        </div>
        <Button>
          <Sparkles className="mr-2 h-4 w-4" />
          Refresh Rekomendasi
        </Button>
      </div>

      {loading ? (
        <LoadingSkeleton count={3} variant="card" />
      ) : error ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-red-500 mb-2">Gagal memuat career paths</p>
            <Button variant="outline" size="sm" onClick={refetch}>
              Coba Lagi
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Top Recommendation */}
          {recommendations.length > 0 && recommendations[0].careerPath && (
            <Card className="mb-8 border-primary/30 bg-primary/5">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Rekomendasi #1: {recommendations[0].careerPath.title}
                    </CardTitle>
                    <CardDescription>
                      Cocok {Math.round(recommendations[0].score * 100)}% dengan skill kamu saat ini
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {recommendations[0].reasoning && (
                  <p className="text-sm text-muted-foreground mb-4">
                    {recommendations[0].reasoning}
                  </p>
                )}
                <Link href="/roadmap">
                  <Button>
                    Lihat Learning Roadmap
                    <span className="ml-2">→</span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* User Recommendations */}
          {recommendations.length > 0 && (
            <>
              <h2 className="text-lg font-semibold mb-4">Rekomendasi Kamu</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                {recommendations.map((rec) => (
                  <CareerCard key={rec.id} recommendation={rec} />
                ))}
              </div>
            </>
          )}

          {/* All Career Paths */}
          {paths.length > 0 && (
            <>
              <h2 className="text-lg font-semibold mb-4">Semua Career Paths</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {paths.map((path) => (
                  <Card key={path.id} className="hover:border-primary/50 transition-colors">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{path.title}</CardTitle>
                      {path.description && (
                        <CardDescription className="text-sm line-clamp-2">
                          {path.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        {path.averageSalary && <span>{path.averageSalary}</span>}
                        {path.jobGrowth && <span>{path.jobGrowth}</span>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Empty State */}
          {recommendations.length === 0 && paths.length === 0 && (
            <EmptyState
              title="Belum ada rekomendasi karir"
              description="Selesaikan coding assessment terlebih dahulu untuk mendapatkan rekomendasi karir yang personal."
              action={{ label: "Mulai Assessment", href: "/assessment" }}
              icon={<Target className="h-12 w-12" />}
            />
          )}
        </>
      )}
    </div>
  );
}
