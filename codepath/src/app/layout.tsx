import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CodePath AI - AI Developer Growth Operating System",
    template: "%s | CodePath AI",
  },
  description:
    "Temukan arah codingmu. Bangun skillmu. Siap untuk masa depan. AI-powered skill assessment, career recommendation, and personalized learning roadmaps for programmers.",
  keywords: [
    "AI",
    "developer",
    "coding",
    "career",
    "learning",
    "roadmap",
    "assessment",
    "programming",
    "skill",
    "Indonesia",
  ],
  authors: [{ name: "CodePath AI" }],
  creator: "CodePath AI",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://codepath.ai",
    title: "CodePath AI - AI Developer Growth Operating System",
    description:
      "Temukan arah codingmu. Bangun skillmu. Siap untuk masa depan.",
    siteName: "CodePath AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodePath AI - AI Developer Growth Operating System",
    description:
      "Temukan arah codingmu. Bangun skillmu. Siap untuk masa depan.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
