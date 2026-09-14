"use client";

import { UserPlus, Code2, Cpu, Rocket } from "lucide-react";

const workflowSteps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Buat Profil Developer",
    desc: "Daftar dalam 30 detik. Ceritakan background, bahasa pemrograman yang kamu ketahui, dan target karirmu.",
    highlight: "Cepat & Gratis",
  },
  {
    step: "02",
    icon: Code2,
    title: "Coding DNA Assessment",
    desc: "Selesaikan evaluasi interaktif yang menguji pola pemecahan masalah, penanganan edge-case, dan gaya arsitekturmu.",
    highlight: "Berbasis Praktik",
  },
  {
    step: "03",
    icon: Cpu,
    title: "Analisis & Roadmap AI",
    desc: "AI membedah 8 dimensi kekuatan teknis, menghitung kecocokan karir tech, dan menyusun roadmap adaptif.",
    highlight: "Presisi Karir",
  },
  {
    step: "04",
    icon: Rocket,
    title: "Bangun Portofolio & Naik Kelas",
    desc: "Selesaikan milestone terarah, bangun proyek berstandar Tech Spec nyata, dan raih kesiapan industri.",
    highlight: "Siap Kerja",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 lg:py-32 bg-muted/30 border-t border-border/70 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
            <span>Alur Sistem Terintegrasi</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            4 Langkah Menuju <span className="gradient-text">Level Berikutnya</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">
            Perjalanan terstruktur dari asesmen awal hingga kesiapan portofolio profesional.
          </p>
        </div>

        {/* 4 Steps Grid with connecting lines on desktop */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative">
          {workflowSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="relative group">
                {/* Horizontal line connector for desktop */}
                {idx < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-9 left-[55%] w-[90%] h-[2px] bg-gradient-to-r from-border via-primary/30 to-border -z-0 pointer-events-none" />
                )}

                <div className="relative rounded-2xl border border-border/80 bg-card p-6 h-full flex flex-col justify-between group-hover:border-primary/50 transition-all glow-card">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-mono font-bold text-base shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
                        {item.step}
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                        <Icon className="h-5 w-5 text-indigo-400" />
                      </div>
                    </div>

                    <div className="mb-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                        {item.highlight}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-foreground mt-0.5">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
