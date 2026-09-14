import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/sidebar";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Dashboard | CodePath AI",
  description: "Dashboard CodePath AI kamu.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-muted/30">
          {children}
        </main>
      </div>
    </Providers>
  );
}
