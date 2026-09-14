import Link from "next/link";
import { Code2, Github, Twitter, Linkedin, Sparkles } from "lucide-react";

const footerLinks = {
  produk: [
    { label: "Coding DNA Analysis", href: "/#dna-showcase" },
    { label: "Career Pathfinder", href: "/#features" },
    { label: "Dynamic Roadmap", href: "/#roadmap-preview" },
    { label: "Paket & Harga", href: "/pricing" },
  ],
  fitur: [
    { label: "Skill Assessment", href: "/#features" },
    { label: "AI Mentor 24/7", href: "/#features" },
    { label: "Portofolio Projects", href: "/#features" },
    { label: "Cara Kerja", href: "/#how-it-works" },
  ],
  panduan: [
    { label: "Pertanyaan Umum (FAQ)", href: "/#faq" },
    { label: "Masuk ke Dashboard", href: "/login" },
    { label: "Registrasi Akun Baru", href: "/register" },
  ],
  legal: [
    { label: "Kebijakan Privasi", href: "/privacy" },
    { label: "Syarat & Ketentuan", href: "/terms" },
    { label: "Keamanan Data", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg inline-flex"
              aria-label="CodePath AI"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-background/90 backdrop-blur-sm">
                  <Code2 className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight leading-tight">
                  <span className="gradient-text">CodePath</span>
                  <span className="text-foreground"> AI</span>
                </span>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest leading-none">
                  Developer OS
                </span>
              </div>
            </Link>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              AI Developer Growth Operating System. Mengukur Coding DNA, memetakan
              skill gap, dan merancang roadmap karir engineering presisi.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Didesain untuk Developer Indonesia</span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://github.com/codepath-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CodePath AI di GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/codepath-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CodePath AI di Twitter / X"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/company/codepath-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CodePath AI di LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} CodePath AI. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Sistem Beroperasi Normal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

