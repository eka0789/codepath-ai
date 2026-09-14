"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Compass, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28">
      {/* Background radial glow and subtle grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] lg:w-[900px] h-[350px] sm:h-[600px] lg:h-[900px] bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-indigo-300 mb-6 sm:mb-8 backdrop-blur-sm glow-primary">
            <Sparkles className="h-4 w-4 text-indigo-400 shrink-0" />
            <span>AI Developer Growth Operating System</span>
            <span className="hidden sm:inline-block text-indigo-400/60">•</span>
            <span className="hidden sm:inline-block text-indigo-200">Presisi Karir Engineering</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.15] sm:leading-[1.12]">
            Temukan Arah Codingmu dengan{" "}
            <span className="gradient-text block sm:inline">Presisi AI</span>
          </h1>

          {/* Value Proposition Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
            Hentikan siklus tutorial hell tanpa arah. CodePath AI membedah{" "}
            <strong className="text-foreground font-semibold">Coding DNA</strong> kamu,
            memetakan skill gap nyata, mencocokkan jalur karir ideal, dan menyusun roadmap
            belajar adaptif menuju level senior.
          </p>

          {/* CTA Group */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <Button
              size="xl"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-indigo-500/20 group"
              asChild
            >
              <Link href="/register">
                <span>Mulai Gratis Sekarang</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="xl"
              className="w-full sm:w-auto border-border/80 bg-background/60 hover:bg-muted/80 backdrop-blur-sm"
              asChild
            >
              <Link href="#product-preview">
                <Compass className="mr-2 h-4 w-4 text-indigo-400" />
                <span>Lihat Simulasi Sistem</span>
              </Link>
            </Button>
          </div>

          {/* Trust Highlights */}
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-y-3 gap-x-6 sm:gap-x-8 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>100% Gratis untuk Memulai</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Tanpa Perlu Kartu Kredit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-indigo-400 shrink-0" />
              <span>Hasil Analisis dalam 5 Menit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
