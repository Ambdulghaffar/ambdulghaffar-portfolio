import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/section-heading";
import { TechBadge } from "@/components/tech-badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import stack from "@/data/stack.json";
import type { Locale, StackCategory } from "@/types";

const categories = stack as StackCategory[];

export async function StackSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Stack" });

  return (
    <section id="stack" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className="text-base">{category.category[locale]}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">
              {category.items.map((item) => (
                <TechBadge key={item} label={item} />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
