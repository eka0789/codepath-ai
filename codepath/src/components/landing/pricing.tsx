"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Untuk mulai belajar",
    price: "0",
    period: "forever",
    badge: null,
    features: [
      "Coding DNA Analysis",
      "Basic Skill Assessment",
      "Career Recommendation",
      "3 Learning Roadmaps",
      "Community Access",
    ],
    cta: "Get Started",
    ctaVariant: "outline" as const,
  },
  {
    name: "Pro",
    description: "Untuk developers serius",
    price: "99K",
    period: "/month",
    badge: "Most Popular",
    features: [
      "Everything in Free",
      "Unlimited Learning Roadmaps",
      "AI Mentor (Unlimited)",
      "Project Recommendations",
      "Code Review AI",
      "Priority Support",
    ],
    cta: "Start Pro Trial",
    ctaVariant: "gradient" as const,
  },
  {
    name: "Career",
    description: "Untuk career switcher",
    price: "199K",
    period: "/month",
    badge: "Best Value",
    features: [
      "Everything in Pro",
      "Career Coaching AI",
      "Interview Preparation",
      "Portfolio Review",
      "Job Matching",
      "1-on-1 Mentoring Sessions",
    ],
    cta: "Start Career Plan",
    ctaVariant: "outline" as const,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Harga yang Sesuai
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Pilih plan yang sesuai dengan kebutuhan kamu. Mulai gratis dan
            upgrade kapan saja.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${
                plan.badge === "Most Popular"
                  ? "border-primary shadow-lg scale-105"
                  : ""
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant={plan.badge === "Most Popular" ? "default" : "secondary"}>
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">Rp {plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-success shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  variant={plan.ctaVariant}
                  className="w-full"
                  asChild
                >
                  <Link href="/register">{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
