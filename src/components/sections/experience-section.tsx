import { getTranslations } from "next-intl/server";

import { TimelineItem, type TimelineEntry } from "@/components/timeline-item";
import { localize } from "@/lib/i18n-data";
import experienceData from "@/data/experience.json";
import educationData from "@/data/education.json";
import type { Education, Experience, Locale } from "@/types";

const experiences = experienceData as Experience[];
const education = educationData as Education[];

export async function ExperienceSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Experience" });

  const entries: TimelineEntry[] = [
    ...experiences.map((experience) => ({
      id: experience.id,
      type: "experience" as const,
      period: localize(experience.period, locale),
      title: experience.role[locale],
      subtitle: `${experience.company} · ${experience.location[locale]}`,
      content: experience.bullets[locale],
    })),
    ...education.map((entry) => ({
      id: entry.id,
      type: "education" as const,
      period: localize(entry.period, locale),
      title: entry.degree[locale],
      subtitle: entry.institution,
      content: entry.detail[locale],
    })),
  ];

  return (
    <section id="experience" className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          {t("title")}
        </h2>
      </div>

      <div className="relative mt-16">
        <div className="absolute inset-y-0 left-4 w-px bg-border lg:left-1/2 lg:-translate-x-1/2" />
        <div className="flex flex-col gap-10 lg:gap-6">
          {entries.map((entry, index) => (
            <TimelineItem key={entry.id} item={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
