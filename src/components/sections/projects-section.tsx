import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import projectsData from "@/data/projects.json";
import type { Locale, Project } from "@/types";

const projects = projectsData as Project[];

export async function ProjectsSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Projects" });

  return (
    <section id="projects" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            locale={locale}
            watchDemoLabel={t("watchDemo")}
          />
        ))}
      </div>
    </section>
  );
}
