"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-indigo-500/30 bg-gradient-to-br from-indigo-950/80 via-purple-950/40 to-background p-8 sm:p-14 lg:p-20 shadow-2xl">
          {/* Subtle Ambient Background Glows */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-80 sm:w-96 h-80 sm:h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-80 sm:w-96 h-80 sm:h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-medium text-indigo-300 mb-6 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>Akselerasi Dimulai dari Evaluasi Terukur</span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
              Ketahui Titik Awalmu.{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Raih Karir Tech Impianmu.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed">
              Bergabunglah bersama komunitas developer yang tidak lagi menebak-nebak arah karir mereka.
              Dapatkan Coding DNA radar dan roadmap personal dalam hitungan menit.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              <Button
                size="xl"
                className="w-full sm:w-auto bg-white hover:bg-slate-100 text-indigo-950 font-bold shadow-lg shadow-white/10 group"
                asChild
              >
                <Link href="/register">
                  <span>Mulai Analisis Coding DNA Gratis</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="xl"
                className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                asChild
              >
                <Link href="/login">Sudah Punya Akun? Masuk</Link>
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>100% Gratis • Tanpa Perlu Kartu Kredit • Akses Instan</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
