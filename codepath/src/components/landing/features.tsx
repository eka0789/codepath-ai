"use client";

import {
  Brain,
  Compass,
  Route,
  FolderGit2,
  Bot,
  Award,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const coreFeatures = [
  {
    icon: Brain,
    title: "Coding DNA Analysis",
    badge: "Fondasi Utama",
    what: "Menganalisis 8 dimensi engineering (Problem Solving, System Design, Debugging, Code Quality, dll).",
    why: "Menghilangkan imposter syndrome dengan tolok ukur obyektif berbasis data.",
    gain: "Kamu tahu persis kelebihan alaimu dan fokus prioritas perbaikan.",
    color: "from-indigo-500/20 to-purple-500/10",
    iconColor: "text-indigo-400",
  },
  {
    icon: Compass,
    title: "AI Career Matchmaker",
    badge: "Navigasi Karir",
    what: "Mencocokkan profil ke 40+ spesialisasi tech dengan kalkulasi persentase kecocokan & gap.",
    why: "Mencegah kesalahan investasi waktu bertahun-tahun di bidang yang tidak selaras.",
    gain: "Kepastian jalur karir spesialis (Backend, Cloud, AI, dll) yang paling bernilai tinggi.",
    color: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
  },
  {
    icon: Route,
    title: "Dynamic Learning Roadmap",
    badge: "Kurikulum Adaptif",
    what: "Kurikulum personal yang otomatis melewati materi yang sudah kamu kuasai.",
    why: "Kurikulum konvensional 'one-size-fits-all' membosankan dan tidak efisien.",
    gain: "Belajar 2-3x lebih cepat karena hanya fokus pada skill gap yang sebenarnya.",
    color: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: FolderGit2,
    title: "Production Project Generator",
    badge: "Portofolio Bernilai",
    what: "Rekomendasi PRD & Tech Spec terstruktur untuk portofolio nyata.",
    why: "Tech Lead mengabaikan proyek kloning generic to-do list.",
    gain: "Portofolio berstandar industri yang membuktikan pemahaman problem-solving.",
    color: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-purple-400",
  },
  {
    icon: Bot,
    title: "24/7 AI Engineering Mentor",
    badge: "Bimbingan Instan",
    what: "Konsultasi arsitektur, debugging mendalam, dan review kode kapan pun kamu butuh.",
    why: "Tersangkut error berhari-hari sering kali membuat developer menyerah.",
    gain: "Progress coding tidak terhenti, dengan feedback teknis layaknya punya Senior Dev pribadi.",
    color: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-400",
  },
  {
    icon: Award,
    title: "Verified Skill Matrix",
    badge: "Validasi Nyata",
    what: "Pengujian terstandar yang memverifikasi kecakapan teknis secara objektif.",
    why: "Resume tanpa pembuktian sulit meyakinkan recruiter papan atas.",
    gain: "Kredibilitas skill nyata yang siap diuji di technical interview mana pun.",
    color: "from-rose-500/20 to-red-500/10",
    iconColor: "text-rose-400",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-24 lg:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/50 px-3.5 py-1 text-xs font-medium text-muted-foreground mb-4">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Benefit-Oriented Architecture</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Bukan Sekadar Fitur, Ini{" "}
            <span className="gradient-text">Akselerasi Karirmu</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Setiap modul dirancang untuk menjawab tiga pertanyaan krusial: Apa yang dilakukan
            sistem, mengapa itu penting, dan apa keuntungan nyata bagi karirmu.
          </p>
        </div>

        {/* 6 Core Feature Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coreFeatures.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-7 backdrop-blur-sm glow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} border border-border/50 group-hover:scale-105 transition-transform`}
                    >
                      <Icon className={`h-6 w-6 ${item.iconColor}`} />
                    </div>
                    <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/60">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>

                  <div className="space-y-2.5 text-xs sm:text-sm text-muted-foreground mb-6">
                    <div>
                      <span className="font-semibold text-foreground/90">Kemampuan: </span>
                      <span>{item.what}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-foreground/90">Mengapa penting: </span>
                      <span>{item.why}</span>
                    </div>
                  </div>
                </div>

                {/* What user gains */}
                <div className="pt-4 border-t border-border/50 bg-muted/20 -mx-6 -mb-6 p-4 rounded-b-2xl">
                  <div className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-1">
                    Manfaat Yang Kamu Dapatkan:
                  </div>
                  <p className="text-xs font-medium text-foreground leading-snug">
                    {item.gain}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA prompt */}
        <div className="mt-12 text-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
          >
            <span>Mulai jelajahi semua kapabilitas secara gratis</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
