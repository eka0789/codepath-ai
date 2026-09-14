"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, CheckCircle2, Timer, Code, Database, Globe, Server } from "lucide-react";

interface Question {
  id: string;
  category: string;
  question: string;
  options: { id: string; text: string; score: number }[];
}

const questions: Question[] = [
  {
    id: "q1",
    category: "Frontend",
    question: "CSS layout responsif terbaik adalah?",
    options: [
      { id: "a", text: "display: block", score: 1 },
      { id: "b", text: "float", score: 2 },
      { id: "c", text: "Flexbox", score: 4 },
      { id: "d", text: "CSS Grid", score: 5 },
    ],
  },
  {
    id: "q2",
    category: "Frontend",
    question: "React state management modern?",
    options: [
      { id: "a", text: "this.state", score: 2 },
      { id: "b", text: "useState", score: 4 },
      { id: "c", text: "useReducer + Context", score: 5 },
      { id: "d", text: "Global var", score: 1 },
    ],
  },
  {
    id: "q3",
    category: "Backend",
    question: "Password hashing terbaik?",
    options: [
      { id: "a", text: "MD5", score: 1 },
      { id: "b", text: "SHA-256", score: 2 },
      { id: "c", text: "bcrypt", score: 5 },
      { id: "d", text: "Plain text", score: 0 },
    ],
  },
  {
    id: "q4",
    category: "Backend",
    question: "HTTP status untuk Created adalah?",
    options: [
      { id: "a", text: "200", score: 3 },
      { id: "b", text: "201", score: 5 },
      { id: "c", text: "204", score: 4 },
      { id: "d", text: "301", score: 1 },
    ],
  },
  {
    id: "q5",
    category: "Database",
    question: "Index yang tepat untuk search by email?",
    options: [
      { id: "a", text: "Primary key", score: 2 },
      { id: "b", text: "Unique index", score: 5 },
      { id: "c", text: "Full-text index", score: 3 },
      { id: "d", text: "Tidak perlu index", score: 0 },
    ],
  },
  {
    id: "q6",
    category: "Database",
    question: "Normalization mengurangi?",
    options: [
      { id: "a", text: "Query speed", score: 2 },
      { id: "b", text: "Data redundancy", score: 5 },
      { id: "c", text: "Storage", score: 3 },
      { id: "d", text: "Security", score: 1 },
    ],
  },
  {
    id: "q7",
    category: "DevOps",
    question: "Docker image layer caching berguna untuk?",
    options: [
      { id: "a", text: "Security", score: 2 },
      { id: "b", text: "Build speed", score: 5 },
      { id: "c", text: "Runtime speed", score: 3 },
      { id: "d", text: "Monitoring", score: 1 },
    ],
  },
  {
    id: "q8",
    category: "DevOps",
    question: "CI/CD pipeline yang baik harus?",
    options: [
      { id: "a", text: "Manual testing", score: 1 },
      { id: "b", text: "Auto test + deploy", score: 5 },
      { id: "c", text: "Skip testing", score: 0 },
      { id: "d", text: "Deploy manual", score: 2 },
    ],
  },
  {
    id: "q9",
    category: "AI",
    question: "RAG (Retrieval Augmented Generation) adalah?",
    options: [
      { id: "a", text: "Model training method", score: 2 },
      { id: "b", text: "Retrieving context for LLM", score: 5 },
      { id: "c", text: "Image generation", score: 1 },
      { id: "d", text: "Database backup", score: 0 },
    ],
  },
  {
    id: "q10",
    category: "Frontend",
    question: "Virtual DOM bekerja dengan cara?",
    options: [
      { id: "a", text: "Direct DOM manipulation", score: 1 },
      { id: "b", text: "Diffing + batch update", score: 5 },
      { id: "c", text: "Server-side rendering", score: 3 },
      { id: "d", text: "CSS animation", score: 0 },
    ],
  },
];

const iconMap: Record<string, React.ElementType> = {
  Frontend: Globe,
  Backend: Server,
  Database: Database,
  DevOps: Code,
  AI: Code,
};

export default function AssessmentQuizPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);
  const router = useRouter();

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  const handleAnswer = (optionId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [q.id]: optionId }));
    setScores((prev) => ({ ...prev, [q.id]: score }));
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setFinished(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const calculateResults = () => {
    const categories: Record<string, { total: number; max: number }> = {};
    questions.forEach((q) => {
      if (!categories[q.category]) categories[q.category] = { total: 0, max: 0 };
      categories[q.category].max += 5;
      categories[q.category].total += scores[q.id] || 0;
    });
    return categories;
  };

  const handleSubmit = async () => {
    const results = calculateResults();
    const skillBreakdown: Record<string, number> = {};
    Object.entries(results).forEach(([cat, data]) => {
      skillBreakdown[cat.toLowerCase()] = Math.round((data.total / data.max) * 100);
    });
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const maxScore = questions.length * 5;

    try {
      await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          score: Math.round((totalScore / maxScore) * 100),
          skillBreakdown,
        }),
      });
      router.push("/dashboard");
    } catch {
      router.push("/dashboard");
    }
  };

  if (finished) {
    const results = calculateResults();
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const maxScore = questions.length * 5;
    const percentage = Math.round((totalScore / maxScore) * 100);

    return (
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Hasil Assessment</h1>
          <p className="text-muted-foreground">Hasil coding assessment kamu</p>
        </div>

        <div className="grid gap-6 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                Overall Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-5xl font-bold text-primary">{percentage}%</p>
                <p className="text-muted-foreground mt-2">
                  {percentage >= 80 ? "Luar biasa!" : percentage >= 60 ? "Bagus!" : "Terus belajar!"}
                </p>
              </div>
              <Progress value={percentage} className="mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Breakdown per Kategori</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(results).map(([cat, data]) => {
                const pct = Math.round((data.total / data.max) * 100);
                const Icon = iconMap[cat] || Code;
                return (
                  <div key={cat} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{cat}</span>
                      </div>
                      <Badge variant={pct >= 70 ? "default" : "secondary"}>
                        {pct}%
                      </Badge>
                    </div>
                    <Progress value={pct} />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            Simpan & Lihat Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Coding Assessment</h1>
        <p className="text-muted-foreground">
          Jawab {questions.length} pertanyaan untuk mengetahui level coding kamu.
        </p>
      </div>

      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline">
            {current + 1} / {questions.length}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Timer className="h-4 w-4" />
            ~{questions.length - current} menit tersisa
          </div>
        </div>

        <Progress value={progress} className="mb-6" />

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{q.category}</Badge>
            </div>
            <CardTitle className="text-lg">{q.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {q.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleAnswer(opt.id, opt.score)}
                className={`w-full rounded-lg border p-4 text-left transition-all ${
                  answers[q.id] === opt.id
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "hover:border-muted-foreground/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium ${
                      answers[q.id] === opt.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : ""
                    }`}
                  >
                    {opt.id.toUpperCase()}
                  </div>
                  <span className="text-sm">{opt.text}</span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={handlePrev} disabled={current === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Sebelumnya
          </Button>
          <Button
            onClick={handleNext}
            disabled={!answers[q.id]}
            className="flex-1"
          >
            {current === questions.length - 1 ? "Lihat Hasil" : "Selanjutnya"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
