"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sparkles, Zap, Shield, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Coding DNA Analysis",
    description: "AI menganalisis pattern coding kamu dan memberikan insight mendalam tentang strength dan growth area.",
  },
  {
    icon: TrendingUp,
    title: "Career Recommendation",
    description: "Rekomendasi karir berbasis data yang sesuai dengan skill, minat, dan goal kamu.",
  },
  {
    icon: Zap,
    title: "Personalized Roadmap",
    description: "Learning roadmap yang dibuat khusus berdasarkan skill gap dan target karir kamu.",
  },
  {
    icon: Shield,
    title: "Skill Verification",
    description: "Verifikasi skill melalui project dan challenge untuk membangun portofolio yang credible.",
  },
];

const stats = [
  { value: "10,000+", label: "Developers" },
  { value: "500+", label: "Learning Paths" },
  { value: "95%", label: "Success Rate" },
  { value: "50+", label: "Career Paths" },
];

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Full-Stack Developer",
    content: "CodePath AI membantu saya menemukan passion di backend development. Sekarang saya bekerja di startup impian!",
    avatar: "BS",
  },
  {
    name: "Rina Wijaya",
    role: "Data Scientist",
    content: "Rekomendasi karirnya sangat akurat. Saya tidak pernah menyangka akan suka data science sampai mencoba assessment ini.",
    avatar: "RW",
  },
  {
    name: "Andi Pratama",
    role: "Mobile Developer",
    content: "Learning roadmap-nya terstruktur banget. Dari nol sampai bisa bikin app sendiri dalam 3 bulan.",
    avatar: "AP",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 [display:none] sm:[display:block]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>AI-Powered Developer Growth</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Temukan Arah{" "}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Codingmu
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Bangun skillmu. Siap untuk masa depan. Platform AI untuk skill assessment,
              rekomendasi karir, dan learning roadmap personalisasi.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/register">
                  Mulai Sekarang
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/#features">Lihat Fitur</Link>
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>Gratis untuk memulai</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>Tanpa kartu kredit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>Bergabung dengan 10,000+ developers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Kenapa CodePath AI?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Fitur lengkap untuk membantu kamu mengembangkan karir development
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-muted/30 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Cara Kerja
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              4 langkah sederhana untuk memulai perjalanan karir development kamu
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Daftar", desc: "Buat akun gratis dalam 30 detik" },
              { step: "02", title: "Assessment", desc: "Selesaikan coding assessment untuk analisis skill" },
              { step: "03", title: "Rekomendasi", desc: "Dapatkan rekomendasi karir dari AI" },
              { step: "04", title: "Mulai Belajar", desc: "Ikuti learning roadmap personalisasi" },
            ].map((item, i) => (
              <div key={item.step} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                  {item.step}
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
                <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
              Dipercaya Developer Indonesia
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Ribuan developer telah memulai perjalanan karir mereka bersama CodePath AI
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-xl border bg-card p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl">
            Siap Memulai Perjalananmu?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Bergabung dengan 10,000+ developers Indonesia yang telah meningkatkan karir mereka
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2"
              asChild
            >
              <Link href="/register">
                Mulai Gratis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
