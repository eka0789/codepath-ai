"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard, EmptyState, LoadingSkeleton } from "@/components/domain";
import { useApi } from "@/hooks/use-api";
import Link from "next/link";
import {
  BarChart3,
  Target,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

interface Assessment {
  id: string;
  score: number;
  strengths?: string[];
  weaknesses?: string[];
  recommendedLevel?: string;
  createdAt: string;
}

export default function AssessmentPage() {
  const { data: assessments, loading, error, refetch } = useApi<Assessment[]>({ url: "/api/assessment" });

  const allAssessments = assessments || [];
  const latestScore = allAssessments.length > 0 ? allAssessments[0].score : 0;
  const avgScore = allAssessments.length
    ? Math.round(allAssessments.reduce((a, b) => a + b.score, 0) / allAssessments.length)
    : 0;

  const scoreColor = latestScore >= 70 ? "text-emerald-500" : latestScore >= 40 ? "text-amber-500" : "text-red-500";
  const scoreLabel = latestScore >= 70 ? "Lanjut" : latestScore >= 40 ? "Perlu Perbaikan" : "Mulai dari Dasar";

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Coding Assessment</h1>
          <p className="text-muted-foreground">
            Uji skill coding kamu dengan assessment interaktif.
          </p>
        </div>
        <Link href="/assessment/quiz">
          <Button>
            Mulai Assessment Baru
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {loading ? (
        <LoadingSkeleton count={4} variant="stat" />
      ) : error ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-red-500 mb-2">Gagal memuat data assessment</p>
            <Button variant="outline" size="sm" onClick={refetch}>
              Coba Lagi
            </Button>
          </CardContent>
        </Card>
      ) : allAssessments.length === 0 ? (
        <EmptyState
          title="Belum ada assessment"
          description="Mulai coding assessment untuk mengetahui level skill kamu saat ini."
          action={{ label: "Mulai Assessment", href: "/assessment/quiz" }}
          icon={<Target className="h-12 w-12" />}
        />
      ) : (
        <>
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <StatCard
              title="Score Terakhir"
              value={`${latestScore}%`}
              description={scoreLabel}
              icon={<BarChart3 className="h-4 w-4" />}
            />
            <StatCard
              title="Rata-rata Score"
              value={`${avgScore}%`}
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <StatCard
              title="Total Assessment"
              value={allAssessments.length}
              icon={<CheckCircle2 className="h-4 w-4" />}
            />
            <StatCard
              title="Level Recommended"
              value={allAssessments[0]?.recommendedLevel || "N/A"}
              icon={<Target className="h-4 w-4" />}
            />
          </div>

          {/* Latest Assessment */}
          <h2 className="text-lg font-semibold mb-4">Assessment Terakhir</h2>
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Hasil Assessment</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3" />
                    {new Date(allAssessments[0].createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </CardDescription>
                </div>
                <div className={`text-3xl font-bold ${scoreColor}`}>
                  {allAssessments[0].score}%
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Strengths */}
              {allAssessments[0].strengths && allAssessments[0].strengths!.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-emerald-500 mb-2 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Kekuatan
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allAssessments[0].strengths!.map((s, i) => (
                      <Badge key={i} variant="default" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Weaknesses */}
              {allAssessments[0].weaknesses && allAssessments[0].weaknesses!.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-amber-500 mb-2 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Perlu Diperkuat
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allAssessments[0].weaknesses!.map((w, i) => (
                      <Badge key={i} variant="outline" className="border-amber-500/30 text-amber-500">
                        {w}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* History */}
          {allAssessments.length > 1 && (
            <>
              <h2 className="text-lg font-semibold mb-4">Riwayat Assessment</h2>
              <div className="space-y-3">
                {allAssessments.slice(1).map((a) => {
                  const aColor = a.score >= 70 ? "text-emerald-500" : a.score >= 40 ? "text-amber-500" : "text-red-500";
                  return (
                    <Card key={a.id}>
                      <CardContent className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-4">
                          <div className={`text-2xl font-bold ${aColor}`}>
                            {a.score}%
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {a.recommendedLevel || "Assessment"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(a.createdAt).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {a.strengths?.slice(0, 3).map((s, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
