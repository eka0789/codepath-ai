"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Cocok untuk pemula yang ingin mengukur potensi coding",
    price: "Rp 0",
    period: "/bulan",
    badge: null,
    features: [
      "Coding DNA Analysis Lengkap",
      "2 Rekomendasi Karir AI",
      "Basic Learning Roadmap",
      "Akses Komunitas Developer",
      "5 Sumber Belajar Pilihan / bulan",
    ],
    cta: "Mulai Gratis Sekarang",
    ctaVariant: "outline" as const,
  },
  {
    name: "Pro",
    description: "Untuk engineer yang aktif mengejar akselerasi skill",
    price: "Rp 99.000",
    period: "/bulan",
    badge: "Paling Populer",
    features: [
      "Semua fitur paket Free",
      "Unlimited Career Recommendations",
      "Advanced Dynamic Learning Roadmap",
      "Skill Matrix & Verification",
      "Akses Sumber Belajar Tanpa Batas",
      "AI Mentor (10 sesi teknis/bulan)",
      "Priority Email & Chat Support",
    ],
    cta: "Pilih Paket Pro",
    ctaVariant: "default" as const,
  },
  {
    name: "Career",
    description: "Untuk persiapan transisi karir & job hunting intensif",
    price: "Rp 199.000",
    period: "/bulan",
    badge: "Nilai Terbaik",
    features: [
      "Semua fitur paket Pro",
      "Career Comparison Matrix",
      "Production Project Recommendations",
      "PRD & Tech Spec Generator Otomatis",
      "AI Engineering Mentor Unlimited",
      "1-on-1 Coaching Sesi Bulanan",
      "Review Resume & Portofolio",
    ],
    cta: "Mulai Paket Career",
    ctaVariant: "outline" as const,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 sm:py-24 lg:py-32 bg-muted/20 border-t border-border/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Investasi Karir Transparan</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Pilihan Paket yang <span className="gradient-text">Fleksibel</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">
            Mulai gratis tanpa komitmen finansial. Upgrade kapan saja saat kamu siap
            meningkatkan intensitas belajar.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto items-stretch">
          {plans.map((plan) => {
            const isPopular = plan.badge === "Paling Populer";
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all bg-card/80 backdrop-blur-sm ${
                  isPopular
                    ? "border-primary shadow-xl shadow-primary/10 lg:-translate-y-2 ring-1 ring-primary/50"
                    : "border-border/80"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground text-xs px-3 py-0.5 shadow-sm">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground min-h-[40px]">
                      {plan.description}
                    </p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-border/60">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Fitur Termasuk:
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-border/50">
                  <Button
                    variant={plan.ctaVariant}
                    size="lg"
                    className={`w-full justify-center ${
                      isPopular ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
                    }`}
                    asChild
                  >
                    <Link href="/register">
                      <span>{plan.cta}</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center text-xs text-muted-foreground">
          Semua harga sudah termasuk pajak. Garansi kepuasan atau pembatalan kapan pun tanpa penalti.
        </div>
      </div>
    </section>
  );
}
