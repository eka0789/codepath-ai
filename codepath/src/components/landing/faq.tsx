"use client";

import * as React from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqList = [
  {
    q: "Apakah CodePath AI cocok untuk pemula yang belum pernah ngoding?",
    a: "Sangat cocok. Saat membuat akun, kamu dapat memilih status pemula. Assessment awal akan dikalibrasi untuk mengukur daya nalar logika dasar, dan roadmap belajarmu akan dimulai dari fondasi fundamental tanpa istilah yang membingungkan.",
  },
  {
    q: "Bagaimana cara kerja analisis Coding DNA?",
    a: "Coding DNA menguji 8 dimensi kognitif dan teknis: Problem Solving, System Design, Debugging, Code Quality, Algoritma, Kreativitas, Kolaborasi, dan Kemampuan Belajar. Bukan sekadar benar/salah, melainkan pola bagaimana kamu mendekati sebuah persoalan arsitektur dan kode.",
  },
  {
    q: "Apakah saya harus membayar atau memasukkan kartu kredit untuk mencoba?",
    a: "Sama sekali tidak. Paket Free tersedia secara gratis selamanya tanpa perlu memasukkan informasi kartu kredit. Kamu bisa langsung menyelesaikan evaluasi Coding DNA, melihat hasil radar, dan mendapatkan rekomendasi karir awal.",
  },
  {
    q: "Apa perbedaan roadmap CodePath AI dengan kurikulum tutorial YouTube/bootcamp?",
    a: "Tutorial umum menerapkan satu kurikulum seragam untuk semua orang. Di CodePath AI, roadmap bersifat dinamis dan personal: jika kamu sudah menguasai fundamental database, modul tersebut otomatis terverifikasi dan kamu langsung dialihkan ke materi lanjutan seperti caching dan distributed messaging.",
  },
  {
    q: "Bagaimana AI Mentor membantu proses belajar sehari-hari?",
    a: "AI Mentor bertindak layaknya Senior Software Engineer pribadi yang siap 24/7. Kamu bisa berkonsultasi mengenai arsitektur sistem, meminta review kode, memahami pesan error kompleks, hingga mendapatkan simulasi pertanyaan interview teknis.",
  },
  {
    q: "Apakah proyek portofolio yang dihasilkan relevan untuk melamar kerja?",
    a: "Ya. Kami berfokus pada proyek berbasis PRD (Product Requirement Document) dan Tech Spec nyata. Kamu tidak diajarkan membuat aplikasi to-do list generic, melainkan sistem produksi dengan pertimbangan arsitektur, concurrency, dan data integrity yang sangat dicari oleh Tech Recruiter.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 lg:py-32 relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/50 px-3.5 py-1 text-xs font-medium text-muted-foreground mb-4">
            <HelpCircle className="h-3.5 w-3.5 text-primary" />
            <span>Tanya Jawab</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Pertanyaan yang <span className="gradient-text">Sering Diajukan</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">
            Semua hal yang perlu kamu ketahui tentang cara kerja platform dan akselerasi karirmu.
          </p>
        </div>

        <div className="space-y-4">
          {faqList.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.q}
                className="rounded-xl border border-border/70 bg-card/70 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-foreground hover:bg-muted/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="pr-4">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed animate-fadeIn"
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
