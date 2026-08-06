"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { SkillCard } from "@/components/skill-card";
import type { SkillLevel, StackItem } from "@/types";

interface LocalizedCategory {
  id: string;
  label: string;
  items: StackItem[];
}

interface FilterOption {
  id: string;
  label: string;
}

interface StackFiltersProps {
  categories: LocalizedCategory[];
  filters: FilterOption[];
  levelLabels: Record<SkillLevel, string>;
}

export function StackFilters({ categories, filters, levelLabels }: StackFiltersProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleCategories = useMemo(
    () =>
      activeFilter === "all"
        ? categories
        : categories.filter((category) => category.id === activeFilter),
    [categories, activeFilter]
  );

  return (
    <div className="mt-10">
      <div className="flex flex-wrap justify-center gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            size="sm"
            className="rounded-full font-semibold"
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-14">
        {visibleCategories.map((category) => (
          <div key={category.id}>
            <h3 className="text-xs font-bold tracking-[0.15em] text-muted-foreground uppercase sm:text-sm">
              {category.label}
            </h3>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => (
                <SkillCard key={item.name} item={item} levelLabel={levelLabels[item.level]} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
