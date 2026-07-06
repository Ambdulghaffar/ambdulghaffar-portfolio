import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/section-heading";
import profile from "@/data/profile.json";
import projects from "@/data/projects.json";
import experience from "@/data/experience.json";
import stack from "@/data/stack.json";
import type { Locale, Profile } from "@/types";

const data = profile as Profile;

export async function AboutSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "About" });

  const stats = [
    { label: t("projectsCount"), value: projects.length },
    { label: t("experienceCount"), value: experience.length },
    { label: t("stackCount"), value: stack.length },
  ];

  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:items-start">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
          <p className="text-muted-foreground sm:text-lg">{data.bio[locale]}</p>
        </div>
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-1">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-card p-4 text-center ring-1 ring-foreground/10 lg:text-left">
              <p className="font-heading text-2xl font-semibold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
