import type { SkillLevel } from "@/types";

export const SKILL_LEVEL_ORDER: SkillLevel[] = [
  "expert",
  "advanced",
  "intermediate",
  "beginner",
];

export const SKILL_LEVEL_STYLES: Record<SkillLevel, { bg: string; text: string }> = {
  expert: { bg: "bg-primary", text: "text-primary" },
  advanced: { bg: "bg-blue-500", text: "text-blue-700 dark:text-blue-400" },
  intermediate: { bg: "bg-green-500", text: "text-green-700 dark:text-green-400" },
  beginner: { bg: "bg-muted-foreground", text: "text-muted-foreground" },
};
