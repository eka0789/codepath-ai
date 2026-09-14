import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://codepath.ai"),
  title: {
    default: "CodePath AI — AI Developer Growth Operating System",
    template: "%s | CodePath AI",
  },
  description:
    "Temukan arah codingmu dengan presisi AI. Coding DNA analysis, skill assessment, rekomendasi karir software engineering, dan learning roadmap personalisasi.",
  keywords: [
    "AI",
    "developer",
    "coding DNA",
    "software engineer",
    "career roadmap",
    "skill assessment",
    "programming",
    "tech career",
    "Indonesia",
  ],
  authors: [{ name: "CodePath AI" }],
  creator: "CodePath AI",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.svg",
    apple: "/icons/icon-192.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CodePath AI",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://codepath.ai",
    title: "CodePath AI — AI Developer Growth Operating System",
    description:
      "Temukan arah codingmu dengan presisi AI. Coding DNA analysis, career pathways, dan personalized roadmap.",
    siteName: "CodePath AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodePath AI — AI Developer Growth Operating System",
    description:
      "Temukan arah codingmu dengan presisi AI. Coding DNA analysis, career pathways, dan personalized roadmap.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CodePath AI",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "All",
  url: "https://codepath.ai",
  description:
    "AI-powered developer growth operating system featuring Coding DNA assessment, personalized roadmaps, and career matching for software engineers.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground selection:bg-primary/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}

