"use client";
import { ThemeToggle } from "@/components/theme-toggle";
import { Package, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <div className="relative animate-bounce">
              <Package className="h-10 w-10 text-blue-500" />
              <Sparkles className="absolute -right-3 -top-3 h-5 w-5 text-yellow-600" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl pl-2">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                What's in This Box?
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8"></main>
    </div>
  );
}