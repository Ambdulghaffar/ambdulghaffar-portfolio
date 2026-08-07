"use client";

import { motion } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  id: string;
  type: "experience" | "education";
  period: string;
  title: string;
  subtitle: string;
  content: string[] | string;
}

interface TimelineItemProps {
  item: TimelineEntry;
  index: number;
}

export function TimelineItem({ item, index }: TimelineItemProps) {
  const isEven = index % 2 === 0;
  const Icon = item.type === "experience" ? Briefcase : GraduationCap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative grid grid-cols-1 gap-2 pl-12 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8 lg:pl-0"
    >
      <div
        className={cn(
          "text-sm font-bold text-primary",
          isEven ? "lg:order-1 lg:text-right" : "lg:order-3 lg:text-left"
        )}
      >
        {item.period}
      </div>

      <div className="absolute top-1 left-4 z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground ring-4 ring-background lg:static lg:order-2 lg:translate-x-0 lg:justify-self-center">
        <Icon className="size-4" aria-hidden="true" />
      </div>

      <div className={isEven ? "lg:order-3" : "lg:order-1"}>
        <Card className="gap-2 p-5">
          <p className="font-heading text-base font-bold text-foreground">{item.title}</p>
          <p className="text-sm font-semibold text-primary">{item.subtitle}</p>
          {Array.isArray(item.content) ? (
            <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
              {item.content.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">{item.content}</p>
          )}
        </Card>
      </div>
    </motion.div>
  );
}
