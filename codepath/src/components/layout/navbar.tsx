"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Code2, Sparkles, ArrowRight } from "lucide-react";

const navItems = [
  {
    label: "Fitur",
    href: "/#features",
  },
  {
    label: "Coding DNA",
    href: "/#dna-showcase",
  },
  {
    label: "Cara Kerja",
    href: "/#how-it-works",
  },
  {
    label: "Harga",
    href: "/pricing",
  },
  {
    label: "FAQ",
    href: "/#faq",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu if pathname changes during navigation
  const [prevPath, setPrevPath] = React.useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMobileMenuOpen(false);
  }

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/70 shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav
        aria-label="Main Navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          aria-label="CodePath AI Homepage"
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 rounded-full border border-border/60 bg-background/50 backdrop-blur-sm px-4 py-1.5 shadow-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-1 text-sm font-medium transition-colors rounded-full hover:text-foreground hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                pathname === item.href
                  ? "text-foreground bg-muted font-semibold"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Masuk</Link>
          </Button>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm group"
            asChild
          >
            <Link href="/register">
              <Sparkles className="mr-1.5 h-3.5 w-3.5 text-indigo-200" />
              <span>Mulai Gratis</span>
              <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          className="md:hidden p-2.5 rounded-lg border border-border/60 bg-background/70 text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Drawer / Overlay */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-background/95 backdrop-blur-xl border-t border-border/80 z-40 overflow-y-auto animate-fadeIn flex flex-col justify-between p-6"
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
              Navigasi
            </p>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3 py-3 rounded-lg text-base font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  pathname === item.href
                    ? "text-primary bg-primary/10 font-semibold"
                    : "text-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{item.label}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>

          <div className="pt-6 border-t border-border/70 space-y-3 pb-8">
            <Button
              variant="outline"
              size="lg"
              className="w-full justify-center text-base"
              asChild
            >
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                Masuk ke Akun
              </Link>
            </Button>
            <Button
              size="lg"
              className="w-full justify-center text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
              asChild
            >
              <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                <Sparkles className="mr-2 h-4 w-4" />
                Mulai Gratis Sekarang
              </Link>
            </Button>
            <p className="text-center text-xs text-muted-foreground pt-2">
              Gratis untuk memulai • Tanpa perlu kartu kredit
            </p>
          </div>
        </div>
      )}
    </header>
  );
}

