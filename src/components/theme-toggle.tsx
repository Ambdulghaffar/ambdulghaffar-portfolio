"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <span className="relative flex size-4 items-center justify-center">
        <Sun className="absolute size-4 scale-100 dark:scale-0" />
        <Moon className="absolute size-4 scale-0 dark:scale-100" />
      </span>
    </Button>
  );
}
