import { getTranslations } from "next-intl/server";

import { StackFilters } from "@/components/stack-filters";
import { SKILL_LEVEL_ORDER, SKILL_LEVEL_STYLES } from "@/lib/skill-level";
import { cn } from "@/lib/utils";
import stack from "@/data/stack.json";
import type { Locale, SkillLevel, StackCategory } from "@/types";

const categories = stack as StackCategory[];

export async function StackSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Stack" });

  const levelLabels = SKILL_LEVEL_ORDER.reduce(
    (acc, level) => {
      acc[level] = t(`levels.${level}`);
      return acc;
    },
    {} as Record<SkillLevel, string>
  );

  const localizedCategories = categories.map((category) => ({
    id: category.id,
    label: category.category[locale],
    items: category.items,
  }));

  const filters = [
    { id: "all", label: t("filters.all") },
    ...categories.map((category) => ({
      id: category.id,
      label: t(`filters.${category.id}`),
    })),
  ];

  return (
    <section id="stack" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          {t("title")}
        </h2>
        <p className="max-w-2xl font-semibold text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {SKILL_LEVEL_ORDER.map((level) => (
          <div key={level} className="flex items-center gap-2 text-sm font-medium">
            <span className={cn("size-2.5 rounded-full", SKILL_LEVEL_STYLES[level].bg)} />
            <span className={SKILL_LEVEL_STYLES[level].text}>{levelLabels[level]}</span>
          </div>
        ))}
      </div>

      <StackFilters categories={localizedCategories} filters={filters} levelLabels={levelLabels} />
    </section>
  );
}
