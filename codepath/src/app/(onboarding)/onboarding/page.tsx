"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, User, Code, Target, Rocket, CheckCircle2 } from "lucide-react";

const steps = [
  { id: 1, title: "Profil Dasar", icon: User },
  { id: 2, title: "Coding Experience", icon: Code },
  { id: 3, title: "Minat & Goal", icon: Target },
  { id: 4, title: "Siap!", icon: Rocket },
];

const experienceLevels = [
  { id: "beginner", label: "Pemula", desc: "Baru mulai belajar coding" },
  { id: "intermediate", label: "Menengah", desc: "Sudah bisa bikin project sendiri" },
  { id: "advanced", label: "Lanjutan", desc: "Berpengalaman, mau deepen skill" },
  { id: "expert", label: "Expert", desc: "Ingin leadership atau arsitektur" },
];

const interests = [
  { id: "frontend", label: "Frontend", desc: "UI/UX, React, Vue, CSS" },
  { id: "backend", label: "Backend", desc: "API, Database, Server" },
  { id: "fullstack", label: "Fullstack", desc: "Frontend + Backend" },
  { id: "mobile", label: "Mobile", desc: "React Native, Flutter, iOS" },
  { id: "devops", label: "DevOps", desc: "CI/CD, Docker, Cloud" },
  { id: "data", label: "Data/ML", desc: "Python, ML, Analytics" },
  { id: "ai", label: "AI/LLM", desc: "LLM, AI Agents, RAG" },
];

const goals = [
  { id: "first_job", label: "Dapat kerja pertama" },
  { id: "switch_career", label: "Pindah karir ke tech" },
  { id: "upgrade", label: "Upgrade skill & role" },
  { id: "freelance", label: "Mulai freelance" },
  { id: "build_startup", label: "Bangun startup sendiri" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          onboarded: true,
          experienceLevel: experience,
          interests: selectedInterests,
          goals: selectedGoals,
        }),
      });
      router.push("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((s) => (
              <div key={s.id} className="flex items-center gap-1">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    step >= s.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s.id ? <CheckCircle2 className="h-4 w-4" /> : s.id}
                </div>
                <span className="text-xs text-muted-foreground hidden sm:inline">
                  {s.title}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${(step / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Profile */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profil Dasar
              </CardTitle>
              <CardDescription>Ceritakan tentang dirimu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <Input
                  id="name"
                  placeholder="Nama kamu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={!name}
                className="w-full"
              >
                Lanjut <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Experience */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Pengalaman Coding
              </CardTitle>
              <CardDescription>Seberapa pengalaman kamu dalam coding?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {experienceLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setExperience(level.id)}
                    className={`rounded-lg border p-4 text-left transition-colors ${
                      experience === level.id
                        ? "border-primary bg-primary/5"
                        : "hover:border-muted-foreground/30"
                    }`}
                  >
                    <p className="font-medium text-sm">{level.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {level.desc}
                    </p>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!experience}
                  className="flex-1"
                >
                  Lanjut <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Interests & Goals */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Minat & Goal
              </CardTitle>
              <CardDescription>Apa yang mau kamu fokusin?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Interests */}
              <div>
                <p className="text-sm font-medium mb-3">Pilih minat kamu</p>
                <div className="grid grid-cols-2 gap-2">
                  {interests.map((interest) => (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`rounded-lg border p-3 text-left transition-colors ${
                        selectedInterests.includes(interest.id)
                          ? "border-primary bg-primary/5"
                          : "hover:border-muted-foreground/30"
                      }`}
                    >
                      <p className="font-medium text-xs">{interest.label}</p>
                      <p className="text-xs text-muted-foreground">{interest.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Goals */}
              <div>
                <p className="text-sm font-medium mb-3">Apa goal kamu?</p>
                <div className="flex flex-wrap gap-2">
                  {goals.map((goal) => (
                    <Badge
                      key={goal.id}
                      variant={selectedGoals.includes(goal.id) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleGoal(goal.id)}
                    >
                      {goal.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                </Button>
                <Button
                  onClick={() => setStep(4)}
                  disabled={selectedInterests.length === 0}
                  className="flex-1"
                >
                  Lanjut <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Ready */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-primary" />
                Siap Mulai! 🎉
              </CardTitle>
              <CardDescription>
                Semua sudah siap. Mulai perjalanan coding kamu!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 space-y-2">
                <p className="font-medium">{name}</p>
                <p className="text-sm text-muted-foreground">
                  {experienceLevels.find((e) => e.id === experience)?.label}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedInterests.map((id) => (
                    <Badge key={id} variant="secondary">
                      {interests.find((i) => i.id === id)?.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(3)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                </Button>
                <Button
                  onClick={handleFinish}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  <Rocket className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Memproses..." : "Mulai Coding!"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
