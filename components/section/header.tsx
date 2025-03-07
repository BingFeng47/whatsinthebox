import { Book, BookOpen, Package, Sparkles } from "lucide-react";
import React from "react";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";

function HeaderSection() {
  return (
    <header className="container mx-auto pt-4 px-2">
      <div className="flex flex-col items-center justify-between gap-4 rounded-xl from-primary/10 via-primary/5 to-primary/10 p-6 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <div className="relative animate-bounce">
            <Package className="h-10 w-10 text-primary" />
            <Sparkles className="absolute -right-3 -top-3 h-5 w-5 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl pl-2">
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              What&apos;s in The Box?
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group border-none">
            <Button variant="outline" size="icon" className="border-primary">
              <Book className="h-6 w-6 text-primary" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderSection;
