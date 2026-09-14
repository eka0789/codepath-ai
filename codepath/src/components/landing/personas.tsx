"use client";

import { GraduationCap, Briefcase, RefreshCw, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const personas = [
  {
    icon: GraduationCap,
    title: "Mahasiswa & Pemula",
    badge: "Mulai dari Nol",
    subtitle: "Bangun pondasi kokoh tanpa tersesat",
    points: [
      "Kurikulum terstruktur agar terbebas dari tutorial hell.",
      "Latihan praktis dengan feedback instan dari AI Mentor.",
      "Rekomendasi proyek portofolio pertama yang kredibel.",
    ],
    accent: "border-indigo-500/30 bg-indigo-950/5",
  },
  {
    icon: Briefcase,
    title: "Junior & Mid Engineer",
    badge: "Naik Level ke Senior",
    subtitle: "Kuasai arsitektur dan system design",
    points: [
      "Deteksi skill gap yang menghambat promosi karir.",
      "Fokus pada distributed systems, scalability, & clean architecture.",
      "Persiapan interview teknis dengan studi kasus nyata.",
    ],
    accent: "border-purple-500/30 bg-purple-950/5",
  },
  {
    icon: RefreshCw,
    title: "Career Switcher",
    badge: "Akselerasi Terarah",
    subtitle: "Transisi efektif dari background non-IT",
    points: [
      "Roadmap akselerasi efisien tanpa materi teoritis yang mubazir.",
      "Identifikasi transferable skill yang relevan dengan dunia coding.",
      "Portofolio Tech Spec & PRD yang siap diajukan ke recruiter.",
    ],
    accent: "border-emerald-500/30 bg-emerald-950/5",
  },
];

export function PersonasSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Dirancang untuk Setiap Fase{" "}
            <span className="gradient-text">Perjalanan Codingmu</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">
            Apapun titik awalmu, CodePath AI mengkalibrasi kurikulum dan bimbingan
            agar sesuai dengan target serta kecepatan belajarmu.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {personas.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`rounded-2xl border ${item.accent} p-6 sm:p-8 backdrop-blur-sm flex flex-col justify-between glow-card`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background/80 border border-border/60 text-primary shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.badge}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-6 font-medium">
                    {item.subtitle}
                  </p>

                  <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
