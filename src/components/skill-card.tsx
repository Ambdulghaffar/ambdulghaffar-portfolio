"use client";

import { motion } from "motion/react";

import { TechIcon } from "@/components/tech-icon";
import { Card } from "@/components/ui/card";
import { SKILL_LEVEL_STYLES } from "@/lib/skill-level";
import { cn } from "@/lib/utils";
import type { StackItem } from "@/types";

interface SkillCardProps {
  item: StackItem;
  levelLabel: string;
}

export function SkillCard({ item, levelLabel }: SkillCardProps) {
  const styles = SKILL_LEVEL_STYLES[item.level];

  return (
    <Card className="gap-4 p-5 hover:border hover:border-primary">
      <div className="flex items-center gap-3">
        <TechIcon name={item.name} className="size-6 shrink-0 text-foreground" />
        <div className="flex flex-col">
          <span className="font-semibold text-foreground">{item.name}</span>
          <span className={cn("flex items-center gap-1.5 text-xs font-medium", styles.text)}>
            <span className={cn("size-1.5 rounded-full", styles.bg)} />
            {levelLabel}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <motion.div
            className={cn("h-full rounded-full", styles.bg)}
            initial={{ width: 0 }}
            whileInView={{ width: `${item.percentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <span className="text-xs font-medium text-muted-foreground tabular-nums">
          {item.percentage}%
        </span>
      </div>
    </Card>
  );
}
