"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  Bot,
  Dna,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/assessment", label: "Assessment", icon: Sparkles },
  { href: "/dna", label: "Coding DNA", icon: Dna },
  { href: "/career", label: "Career Paths", icon: TrendingUp },
  { href: "/roadmap", label: "Learning Roadmap", icon: Zap },
  { href: "/projects", label: "Projects", icon: BookOpen },
  { href: "/skills", label: "Skills", icon: Target },
  { href: "/mentor", label: "AI Mentor", icon: MessageCircle },
];

const bottomItems = [
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/logout", label: "Logout", icon: LogOut },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
          C
        </div>
        <span className="font-semibold">CodePath AI</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t p-4 space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
