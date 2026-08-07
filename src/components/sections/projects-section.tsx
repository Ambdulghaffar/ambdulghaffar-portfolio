import { getTranslations } from "next-intl/server";

import { ProjectsGrid } from "@/components/projects-grid";
import projectsData from "@/data/projects.json";
import type { Locale, Project } from "@/types";

const projects = projectsData as Project[];

export async function ProjectsSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Projects" });

  const labels = {
    viewDetails: t("viewDetails"),
    watchDemo: t("watchDemo"),
    close: t("close"),
    techStack: t("techStack"),
    showMore: t("showMore"),
    showLess: t("showLess"),
  };

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 border-y border-border/60">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          {t("title")}
        </h2>
        <p className="max-w-2xl font-semibold text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="mt-12">
        <ProjectsGrid projects={projects} locale={locale} labels={labels} />
      </div>
    </section>
  );
}
