import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "CodePath AI — AI Developer Growth Operating System",
  description:
    "Temukan arah codingmu. Bangun skillmu. Siap untuk masa depan. Platform AI untuk skill assessment, rekomendasi karir, dan learning roadmap personalisasi.",
  keywords: ["developer", "coding", "AI", "career", "learning", "roadmap", "skill assessment"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "CodePath AI",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
