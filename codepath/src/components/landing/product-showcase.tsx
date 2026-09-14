"use client";

import * as React from "react";
import {
  Brain,
  Route,
  Target,
  Bot,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sparkles,
  Code2,
  Layers,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const dnaDimensions = [
  { name: "Code Quality", value: 92, status: "Expert" },
  { name: "Problem Solving", value: 88, status: "Advanced" },
  { name: "Debugging", value: 85, status: "Advanced" },
  { name: "System Design", value: 78, status: "Proficient" },
  { name: "Algorithms", value: 80, status: "Advanced" },
  { name: "Learning Ability", value: 94, status: "Master" },
];

export function ProductShowcase() {
  const [activeTab, setActiveTab] = React.useState<"dna" | "career" | "roadmap" | "mentor">("dna");

  return (
    <section id="product-preview" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
            <Layers className="h-3.5 w-3.5 text-primary" />
            <span>Interactive Platform Simulation</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Intip Cara Kerja <span className="gradient-text">Engine CodePath</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">
            Bukan sekadar kuis teoritis. Eksplorasi langsung bagaimana sistem menganalisis
            DNA teknismu dan menghasilkan rencana pertumbuhan engineering yang presisi.
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-card border border-border/70 shadow-sm overflow-x-auto max-w-full">
            {[
              { id: "dna", label: "Coding DNA", icon: Brain },
              { id: "career", label: "Career Match", icon: Target },
              { id: "roadmap", label: "Dynamic Roadmap", icon: Route },
              { id: "mentor", label: "AI Mentor", icon: Bot },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Realistic Dashboard Frame Preview */}
        <div className="relative mx-auto max-w-5xl rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Mockup Window Controls */}
          <div className="flex items-center justify-between border-b border-border/70 bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-[11px] text-muted-foreground/80 hidden sm:inline">
                codepath.ai/dashboard/preview
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-[10px] bg-background/50 border-border/70">
                Live Interactive Mode
              </Badge>
            </div>
          </div>

          {/* Interactive Screen Content */}
          <div className="p-4 sm:p-8 min-h-[460px] flex flex-col justify-center">
            {/* TAB 1: CODING DNA */}
            {activeTab === "dna" && (
              <div className="animate-fadeIn grid gap-6 lg:grid-cols-12 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-md bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-400">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Archetype Hasil Analisis</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">Systems Architect & Clean Coder</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Pola coding kamu menunjukkan kecenderungan kuat pada arsitektur modular,
                    defensive programming, dan penanganan edge case menyeluruh.
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Kekuatan Teratas:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs py-1">
                        High Code Maintainability
                      </Badge>
                      <Badge variant="secondary" className="text-xs py-1">
                        System Boundary Isolation
                      </Badge>
                      <Badge variant="secondary" className="text-xs py-1">
                        Root-Cause Debugging
                      </Badge>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button size="sm" asChild className="gap-1.5">
                      <Link href="/register">
                        <span>Cek Coding DNA Milikmu</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-background/50 border border-border/60 rounded-xl p-4 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-border/50 pb-3">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">
                      6 Metrik Dimensi DNA
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-medium">
                      Overall Score: 86.2 / 100
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {dnaDimensions.map((dim) => (
                      <div
                        key={dim.name}
                        className="p-3 rounded-lg border border-border/40 bg-card/80 hover:border-primary/40 transition-colors"
                      >
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-medium text-foreground">{dim.name}</span>
                          <span className="font-mono text-indigo-400 font-bold">{dim.value}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            style={{ width: `${dim.value}%` }}
                          />
                        </div>
                        <div className="mt-1 flex justify-between items-center text-[10px] text-muted-foreground">
                          <span>Level: {dim.status}</span>
                          <span className="text-emerald-400">Top 15% Developer</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CAREER MATCH */}
            {activeTab === "career" && (
              <div className="animate-fadeIn grid gap-6 lg:grid-cols-12 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>Kecocokan Karir Berbasis Data</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">Cloud & Distributed Systems Engineer</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Kombinasi kekuatan arsitektur dan algoritma kamu 94% selaras dengan kebutuhan
                    industri untuk posisi backend skala tinggi.
                  </p>
                  <div className="p-3 rounded-lg border border-border/50 bg-background/50 space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Kecocokan Profil</span>
                      <span className="text-emerald-400 font-mono">94% Match</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Estimasi gap dapat dituntaskan dalam 8-12 pekan belajar terarah.
                    </p>
                  </div>
                  <Button size="sm" asChild className="gap-1.5">
                    <Link href="/register">
                      <span>Dapatkan Rekomendasi Karir</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="lg:col-span-7 space-y-3">
                  <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-400">
                        Skill Yang Sudah Kamu Kuasai
                      </span>
                      <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 text-[10px]">
                        Terverifikasi
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Golang / Node.js", "PostgreSQL & Indexes", "REST & gRPC", "Redis Caching", "Docker Container"].map(
                        (s) => (
                          <span
                            key={s}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-card text-xs font-medium border border-border/50"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                            {s}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-950/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-indigo-300">
                        Target Skill Gap Yang Perlu Dipelajari
                      </span>
                      <Badge variant="outline" className="text-indigo-400 border-indigo-500/30 text-[10px]">
                        Roadmap Focus
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Kafka Event Streaming",
                        "Kubernetes Cluster Mgmt",
                        "Distributed Tracing (OpenTelemetry)",
                        "Database Sharding Pattern",
                      ].map((s) => (
                        <span
                          key={s}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-card text-xs font-medium border border-indigo-500/20 text-muted-foreground"
                        >
                          <Target className="h-3.5 w-3.5 text-indigo-400" />
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: DYNAMIC ROADMAP */}
            {activeTab === "roadmap" && (
              <div className="animate-fadeIn space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-4">
                  <div>
                    <h3 className="text-lg font-bold">Roadmap: Backend Scale & Architecture</h3>
                    <p className="text-xs text-muted-foreground">
                      Disesuaikan secara otomatis berdasarkan hasil assessment kamu
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Progress Keseluruhan:</span>
                    <Badge variant="default" className="bg-primary text-xs">
                      3 dari 5 Selesai (60%)
                    </Badge>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="success" className="text-[10px]">
                        Selesai
                      </Badge>
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                    <h4 className="font-semibold text-sm">Modul 1: Concurrency & Threads</h4>
                    <p className="text-xs text-muted-foreground">
                      Race condition prevention, mutex locks, and channels pattern.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-indigo-500 bg-indigo-950/20 shadow-md shadow-indigo-500/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="default" className="text-[10px] bg-primary">
                        Sedang Berjalan
                      </Badge>
                      <Clock className="h-4 w-4 text-indigo-400 animate-pulse" />
                    </div>
                    <h4 className="font-semibold text-sm">Modul 2: Distributed Message Queue</h4>
                    <p className="text-xs text-muted-foreground">
                      Apache Kafka partition strategies, consumer lag, and exactly-once semantics.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-border/70 bg-card/60 opacity-85 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-[10px]">
                        Selanjutnya
                      </Badge>
                      <Target className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <h4 className="font-semibold text-sm">Modul 3: Resiliency & Circuit Breakers</h4>
                    <p className="text-xs text-muted-foreground">
                      Rate limiting, distributed caching, and zero-downtime deployment.
                    </p>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <Button size="sm" asChild>
                    <Link href="/register">Buat Roadmap Personal Milikmu</Link>
                  </Button>
                </div>
              </div>
            )}

            {/* TAB 4: AI MENTOR */}
            {activeTab === "mentor" && (
              <div className="animate-fadeIn max-w-3xl mx-auto space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0 mt-1">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <div className="rounded-2xl rounded-tl-none border border-border/70 bg-muted/60 px-4 py-3 text-xs sm:text-sm text-foreground">
                    <p className="font-medium text-muted-foreground text-[11px] mb-1">Pertanyaan Developer:</p>
                    Bagaimana strategi mitigasi jika read-traffic database melonjak 10x saat event flash sale?
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0 mt-1 shadow-md shadow-primary/20">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-2xl rounded-tl-none border border-indigo-500/40 bg-indigo-950/20 px-4 py-3 text-xs sm:text-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-indigo-300 text-xs">CodePath AI Mentor</span>
                      <span className="text-[10px] text-muted-foreground font-mono">Response Time: 0.8s</span>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Berdasarkan arsitektur yang kamu susun di Modul 2, langkah prioritasnya adalah:
                    </p>
                    <ol className="list-decimal pl-4 space-y-1 text-xs text-muted-foreground">
                      <li>
                        <strong className="text-foreground">Cache-Aside Pattern dengan Redis:</strong> Simpan produk terpopuler dengan TTL dinamis + Jitter untuk mencegah Cache Stampede.
                      </li>
                      <li>
                        <strong className="text-foreground">Read Replicas Pool:</strong> Pisahkan jalur write ke Primary dan alihkan query query read-heavy ke Replica Cluster.
                      </li>
                      <li>
                        <strong className="text-foreground">Rate Limiting Token Bucket:</strong> Lindungi endpoint checkout dari bot berlebih.
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <Button size="sm" asChild>
                    <Link href="/register">Mulai Tanya AI Mentor Sekarang</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
