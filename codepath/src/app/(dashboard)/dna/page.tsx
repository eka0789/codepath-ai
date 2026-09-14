"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState, LoadingSkeleton } from "@/components/domain";
import { DnaRadar } from "@/components/domain/dna-radar";
import { useApi } from "@/hooks/use-api";
import { Target, TrendingUp, TrendingDown, Zap } from "lucide-react";
import Link from "next/link";

interface DnaDimension {
  name: string;
  value: number;
  icon: string;
}

interface DnaData {
  id: string;
  problemSolving: number;
  algorithmicThinking: number;
  systemDesign: number;
  codeQuality: number;
  debugging: number;
  creativity: number;
  collaboration: number;
  learningAbility: number;
  primaryStyle: string | null;
  secondaryStyle: string | null;
  strengths: string[];
  growthAreas: string[];
  recommendedFocus: string | null;
  analyzedAt: string;
  version: number;
  dimensions: DnaDimension[];
  avgScore: number;
  strongest: DnaDimension[];
  weakest: DnaDimension[];
}

export default function DnaPage() {
  const { data: dna, loading, error } = useApi<DnaData>({ url: "/api/dna" });

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Coding DNA</h1>
          <p className="text-muted-foreground">Analisis mendalam tentang profil coding kamu.</p>
        </div>
        <LoadingSkeleton count={4} variant="stat" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Coding DNA</h1>
          <p className="text-muted-foreground">Analisis mendalam tentang profil coding kamu.</p>
        </div>
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-red-500 mb-2">Gagal memuat data Coding DNA</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!dna) {
    return (
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Coding DNA</h1>
          <p className="text-muted-foreground">Analisis mendalam tentang profil coding kamu.</p>
        </div>
        <EmptyState
          title="Belum ada Coding DNA"
          description="Selesaikan coding assessment untuk mengetahui profil coding kamu."
          action={{ label: "Mulai Assessment", href: "/assessment/quiz" }}
          icon={<Target className="h-12 w-12" />}
        />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Coding DNA</h1>
        <p className="text-muted-foreground">
          Analisis mendalam tentang profil coding kamu. Diperbarui pada{" "}
          {new Date(dna.analyzedAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          {" "}(v{dna.version})
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dna.avgScore}%</p>
                <p className="text-xs text-muted-foreground">Overall Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dna.strongest[0]?.value}%</p>
                <p className="text-xs text-muted-foreground">Top: {dna.strongest[0]?.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <TrendingDown className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dna.weakest[0]?.value}%</p>
                <p className="text-xs text-muted-foreground">Bottom: {dna.weakest[0]?.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{dna.primaryStyle || "N/A"}</p>
                <p className="text-xs text-muted-foreground">Primary Style</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Radar Chart + Details */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Radar Chart</CardTitle>
            <CardDescription>Visualisasi profil coding kamu</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-4">
            <DnaRadar dimensions={dna.dimensions} size={320} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dimension Breakdown</CardTitle>
            <CardDescription>Skor setiap dimensi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dna.dimensions.map((dim) => (
              <div key={dim.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{dim.name}</span>
                  <span className="text-muted-foreground">{dim.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${dim.value}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Strengths + Growth Areas */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Kekuatan Utama
            </CardTitle>
            <CardDescription>Dimensi dengan skor tertinggi</CardDescription>
          </CardHeader>
          <CardContent>
            {dna.strongest.length > 0 ? (
              <div className="space-y-3">
                {dna.strongest.map((dim) => (
                  <div key={dim.name} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="default" className="bg-emerald-500/10 text-emerald-500">
                        {dim.value}%
                      </Badge>
                      <span className="font-medium">{dim.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Belum ada data</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-amber-500" />
              Area Pertumbuhan
            </CardTitle>
            <CardDescription>Dimensi yang perlu diperkuat</CardDescription>
          </CardHeader>
          <CardContent>
            {dna.weakest.length > 0 ? (
              <div className="space-y-3">
                {dna.weakest.map((dim) => (
                  <div key={dim.name} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-amber-500/30 text-amber-500">
                        {dim.value}%
                      </Badge>
                      <span className="font-medium">{dim.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Belum ada data</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recommended Focus */}
      {dna.recommendedFocus && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Rekomendasi Fokus</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{dna.recommendedFocus}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}