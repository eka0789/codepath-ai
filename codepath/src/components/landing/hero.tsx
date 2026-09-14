"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-2 text-sm text-indigo-400 mb-8 animate-fadeIn">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Developer Growth Platform</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl animate-fadeIn">
            Temukan Arah
            <br />
            <span className="gradient-text">Codingmu</span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl animate-fadeIn">
            Bangun skillmu dengan AI yang memahami kode kamu. Dapatkan
            rekomendasi karir, learning roadmap, dan project yang tepat untuk
            level kamu.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeIn">
            <Button variant="gradient" size="xl" asChild>
              <Link href="/register">
                Mulai Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link href="#how-it-works">
                <Play className="mr-2 h-5 w-5" />
                Lihat Demo
              </Link>
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-16 animate-fadeIn">
            <p className="text-sm text-muted-foreground mb-4">
              Dipercaya oleh 10,000+ developers Indonesia
            </p>
            <div className="flex justify-center gap-8 opacity-50">
              <div className="text-lg font-semibold">Tokopedia</div>
              <div className="text-lg font-semibold">Gojek</div>
              <div className="text-lg font-semibold">Traveloka</div>
              <div className="text-lg font-semibold">Bukalapak</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
