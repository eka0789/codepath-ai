"use client";

import { XCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ProblemSolutionSection() {
  return (
    <section className="py-16 sm:py-24 bg-muted/20 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
            Mengapa Sebagian Besar Developer Terjebak Stagnan?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">
            Bukan karena kurangnya tutorial di internet, melainkan ketiadaan arah
            yang terukur dan personal untuk mencapai standar industri.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
          {/* Card 1: The Problem */}
          <div className="rounded-2xl border border-red-500/20 bg-red-950/5 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                <XCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Cara Lama Tanpa Panduan Terukur</h3>
                <p className="text-xs text-muted-foreground">Frustrasi, membuang waktu & energi</p>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500/80 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Siklus Tutorial Hell:</strong> Menonton ratusan jam video tapi tetap bingung saat harus membuat aplikasi dari nol.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500/80 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Dilema Jalur Karir:</strong> Ragu memilih antara Backend, Frontend, DevOps, atau AI tanpa mengetahui kecocokan bakat alami.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500/80 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Portofolio Kloning:</strong> Proyek to-do list generic yang langsung dilewati oleh Tech Recruiter dan Hiring Manager.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500/80 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Feedback Loop Buntu:</strong> Tidak ada senior yang mengoreksi pola arsitektur atau kualitas kode secara konsisten.
                </span>
              </li>
            </ul>
          </div>

          {/* Card 2: The Solution */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-6 sm:p-8 space-y-6 shadow-lg shadow-emerald-500/5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Akselerasi dengan CodePath AI</h3>
                <p className="text-xs text-emerald-400 font-medium">Jelas, terarah, & adaptif terhadap levelmu</p>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Coding DNA Assessment:</strong> AI membedah gaya kognitif, kebiasaan arsitektur, dan ketahanan debugging dalam kode nyata.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Pencocokan Karir Presisi:</strong> Rekomendasi posisi tech berdasarkan kekuatan dominan kamu disertai gap analysis.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Roadmap Terpersonalisasi:</strong> Lewati hal yang sudah kamu kuasai; fokus hanya pada materi esensial menuju level berikutnya.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">AI Mentor 24/7:</strong> Dapatkan review konsep teknis, tech spec generator, dan bimbingan arsitektur kapan saja.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" className="gap-2" asChild>
            <Link href="/register">
              <span>Mulai Evaluasi Coding DNA Milikmu</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
