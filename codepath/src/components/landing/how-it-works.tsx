"use client";

import { Card, CardContent } from "@/components/ui/card";
import { UserCheck, Code, Sparkles, TrendingUp } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserCheck,
    title: "Daftar & Setup Profile",
    description:
      "Buat akun dan setup profil developer kamu. Ceritakan pengalaman dan goal karir kamu.",
  },
  {
    step: "02",
    icon: Code,
    title: "Coding Assessment",
    description:
      "Selesaikan coding assessment yang menganalisis pattern, gaya coding, dan kemampuan kamu.",
  },
  {
    step: "03",
    icon: Sparkles,
    title: "Dapatkan Rekomendasi AI",
    description:
      "AI menganalisis hasil kamu dan memberikan rekomendasi karir, skill gap, dan learning path.",
  },
  {
    step: "04",
    icon: TrendingUp,
    title: "Mulai Perjalanan",
    description:
      "Ikuti learning roadmap, kerjakan projects, dan track progress kamu menuju karir impian.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-20 lg:py-32 bg-muted/30"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Cara Kerja
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            4 langkah sederhana untuk memulai perjalanan karir development
            kamu.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}

              <Card className="relative">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {step.step}
                    </div>
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
