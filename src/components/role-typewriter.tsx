"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const TYPING_SPEED_MS = 70;
const DELETING_SPEED_MS = 40;
const PAUSE_AFTER_TYPED_MS = 1800;

interface RoleTypewriterProps {
  roles: string[];
  className?: string;
}

export function RoleTypewriter({ roles, className }: RoleTypewriterProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const currentRole = roles[roleIndex];

    if (phase === "typing") {
      if (text.length < currentRole.length) {
        const timeout = setTimeout(
          () => setText(currentRole.slice(0, text.length + 1)),
          TYPING_SPEED_MS
        );
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => setPhase("pausing"), PAUSE_AFTER_TYPED_MS);
      return () => clearTimeout(timeout);
    }

    if (phase === "pausing") {
      const timeout = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPED_MS);
      return () => clearTimeout(timeout);
    }

    // phase === "deleting"
    if (text.length > 0) {
      const timeout = setTimeout(
        () => setText(currentRole.slice(0, text.length - 1)),
        DELETING_SPEED_MS
      );
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => {
      setRoleIndex((index) => (index + 1) % roles.length);
      setPhase("typing");
    }, DELETING_SPEED_MS);
    return () => clearTimeout(timeout);
  }, [text, phase, roleIndex, roles]);

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span aria-hidden="true" className="inline-flex items-baseline">
        {text}
        <motion.span
          className="ml-3 inline-block w-0.75 bg-primary"
          style={{ height: "0.85em" }}
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        />
      </span>
      <span className="sr-only">{roles[roleIndex]}</span>
    </span>
  );
}
