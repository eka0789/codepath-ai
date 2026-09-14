import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing | CodePath AI",
  description: "Pilih paket yang sesuai dengan kebutuhanmu. Mulai gratis atau upgrade untuk fitur premium.",
};

const plans = [
  {
    name: "Free",
    price: "Rp 0",
    period: "/bulan",
    description: "Cocok untuk pemula yang ingin mulai belajar",
    badge: null,
    features: [
      "Coding DNA Analysis",
      "2 Career Recommendations",
      "Basic Learning Roadmap",
      "Community Access",
      "5 Learning Resources/bulan",
    ],
    cta: "Mulai Gratis",
    ctaVariant: "outline" as const,
  },
  {
    name: "Pro",
    price: "Rp 99.000",
    period: "/bulan",
    description: "Untuk developer yang serius ingin berkembang",
    badge: "Populer",
    features: [
      "Semua fitur Free",
      "Unlimited Career Recommendations",
      "Advanced Learning Roadmap",
      "Skill Verification",
      "Unlimited Learning Resources",
      "AI Mentor (10 sesi/bulan)",
      "Priority Support",
    ],
    cta: "Upgrade ke Pro",
    ctaVariant: "default" as const,
  },
  {
    name: "Career",
    price: "Rp 199.000",
    period: "/bulan",
    description: "Untuk developer yang siap pindah karir",
    badge: null,
    features: [
      "Semua fitur Pro",
      "Career Comparison",
      "Project Recommendations",
      "PRD Generator",
      "Tech Spec Generator",
      "Task Breakdown",
      "AI Mentor Unlimited",
      "1-on-1 Career Coaching",
      "Resume Review",
    ],
    cta: "Mulai Karir Baru",
    ctaVariant: "outline" as const,
  },
];

export default function PricingPage() {
  return (
    <div className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">Harga yang Transparan</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhanmu. Mulai gratis atau upgrade untuk fitur premium.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.badge ? "border-primary shadow-lg shadow-primary/10" : ""
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-emerald-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.ctaVariant}
                  asChild
                >
                  <Link href="/register">{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Butuh solusi untuk tim?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Hubungi kami
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
