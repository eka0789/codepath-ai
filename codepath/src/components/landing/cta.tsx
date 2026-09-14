"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 p-8 sm:p-12 lg:p-16">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-black/10 rounded-full blur-3xl" />

          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm text-white mb-6">
              <Rocket className="h-4 w-4" />
              <span>Siap untuk Memulai?</span>
            </div>

            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl mb-4">
              Bangun Karir Development
              <br />
              Kamu Sekarang
            </h2>

            <p className="mx-auto max-w-2xl text-lg text-white/80 mb-8">
              Bergabung dengan ribuan developers Indonesia yang sudah memulai
              perjalanan karir mereka dengan CodePath AI.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="xl"
                className="bg-white text-indigo-600 hover:bg-white/90"
                asChild
              >
                <Link href="/register">
                  Mulai Gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-white/30 text-white hover:bg-white/10"
                asChild
              >
                <Link href="/docs">Pelajari Lebih Lanjut</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
