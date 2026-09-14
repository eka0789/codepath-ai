"use client";

import {
  Brain,
  Target,
  Route,
  FolderKanban,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "Coding DNA Analysis",
    description:
      "AI menganalisis pattern coding kamu untuk memahami strengths, weaknesses, dan preferensi development kamu.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Target,
    title: "Skill Assessment",
    description:
      "Assessment komprehensif yang mengukur kemampuan coding kamu di berbagai area teknis dan soft skills.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Route,
    title: "Career Roadmap",
    description:
      "Learning roadmap personalisasi yang dibuat AI berdasarkan goal karir dan level kamu saat ini.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: FolderKanban,
    title: "Project Recommendations",
    description:
      "Rekomendasi project yang tepat untuk membangun portfolio dan memperkuat skill kamu.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: MessageSquare,
    title: "AI Mentor",
    description:
      "AI Mentor yang siap membantu kamu 24/7 dengan coding guidance, career advice, dan code review.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Dashboard analytics untuk tracking progress belajar dan milestone karir kamu.",
    gradient: "from-violet-500 to-indigo-500",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Fitur Unggulan
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Semua yang kamu butuhkan untuk mengembangkan karir development
            kamu, didukung oleh AI canggih.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
