"use client";

import { useChat } from "ai/react";
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Bot, User, Sparkles } from "lucide-react";

function formatMessage(content: string): string {
  return content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.*?)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-muted p-3 rounded-lg overflow-x-auto my-2 text-sm font-mono"><code>$2</code></pre>')
    .replace(/\n/g, "<br />");
}

const suggestedQuestions = [
  "Apa career path yang cocok untuk saya?",
  "Bagaimana cara meningkatkan skill coding?",
  "Beri tips untuk technical interview",
  "Rekomendasi project untuk portfolio",
];

export default function MentorPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/mentor",
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSuggestionClick = (question: string) => {
    handleInputChange({ target: { value: question } } as React.ChangeEvent<HTMLTextAreaElement>);
    setTimeout(() => {
      handleSubmit();
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">AI Mentor</h1>
            <p className="text-sm text-muted-foreground">
              Tanya apa saja tentang coding, karir, dan skill development
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Halo! 👋</h2>
              <p className="text-muted-foreground max-w-md">
                Aku adalah AI Mentor kamu. Aku bisa bantu dengan rekomendasi karir,
                belajar skill baru, code review, dan persiapan interview.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
              {suggestedQuestions.map((q) => (
                <Button
                  key={q}
                  variant="outline"
                  className="h-auto py-3 px-4 text-left text-sm justify-start"
                  onClick={() => handleSuggestionClick(q)}
                >
                  {q}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "assistant" ? "" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0 ${
                    message.role === "assistant"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`rounded-xl px-4 py-3 max-w-[85%] text-sm leading-relaxed ${
                    message.role === "assistant"
                      ? "bg-muted"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(message.content),
                    }}
                  />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-xl px-4 py-3 bg-muted">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.3s]" />
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:-0.15s]" />
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t bg-background px-6 py-4">
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 max-w-3xl mx-auto"
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Tanya sesuatu... (Enter untuk kirim, Shift+Enter untuk baris baru)"
            rows={1}
            className="flex-1 resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[48px] max-h-[120px]"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="h-12 w-12 rounded-xl flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
