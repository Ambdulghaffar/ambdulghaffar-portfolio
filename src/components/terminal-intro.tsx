"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const TYPING_SPEED_MS = 25;
const PAUSE_BETWEEN_LINES_MS = 250;

export interface TerminalLine {
  type: "prompt" | "output";
  text: string;
}

interface TerminalIntroProps {
  lines: TerminalLine[];
  className?: string;
}

export function TerminalIntro({ lines, className }: TerminalIntroProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const done = lineIndex >= lines.length;

  useEffect(() => {
    if (done) return;
    const currentLine = lines[lineIndex];

    if (charIndex < currentLine.text.length) {
      const timeout = setTimeout(() => setCharIndex((c) => c + 1), TYPING_SPEED_MS);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setLineIndex((i) => i + 1);
      setCharIndex(0);
    }, PAUSE_BETWEEN_LINES_MS);
    return () => clearTimeout(timeout);
  }, [charIndex, lineIndex, lines, done]);

  const visibleLines = done
    ? lines
    : [
        ...lines.slice(0, lineIndex),
        { ...lines[lineIndex], text: lines[lineIndex].text.slice(0, charIndex) },
      ];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-lg",
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-border/60 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-red-500" />
        <span className="size-2.5 rounded-full bg-yellow-500" />
        <span className="size-2.5 rounded-full bg-green-500" />
        <p className="text-sm text-muted-foreground ps-4">bash — ambdulghaffar@portfolio</p>
      </div>

      <div
        aria-hidden="true"
        className="flex flex-col gap-1.5 overflow-x-auto px-4 py-4 font-mono text-xs sm:text-sm leading-relaxed"
      >
        {visibleLines.map((line, index) => (
          <div key={index} className="flex items-baseline gap-x-2 whitespace-pre-wrap wrap-break-word">
            <span className={line.type === "prompt" ? "text-primary" : "text-foreground/85"}>
              {line.text}
            </span>
            {index === visibleLines.length - 1 && (
              <motion.span
                className="inline-block h-[1em] w-1.75 shrink-0 bg-primary"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
              />
            )}
          </div>
        ))}
      </div>

      <span className="sr-only">{lines.map((line) => line.text).join(". ")}</span>
    </div>
  );
}
