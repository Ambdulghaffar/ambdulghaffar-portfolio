import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/section-heading";
import { ExperienceCard } from "@/components/experience-card";
import { EducationCard } from "@/components/education-card";
import experienceData from "@/data/experience.json";
import educationData from "@/data/education.json";
import type { Education, Experience, Locale } from "@/types";

const experiences = experienceData as Experience[];
const education = educationData as Education[];

export async function ExperienceSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Experience" });

  return (
    <section id="experience" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      <div className="mt-8 flex flex-col gap-4">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} locale={locale} />
        ))}
      </div>

      <div className="mt-14">
        <SectionHeading title={t("education")} subtitle={t("educationSubtitle")} />
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {education.map((item) => (
            <EducationCard key={item.id} education={item} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
