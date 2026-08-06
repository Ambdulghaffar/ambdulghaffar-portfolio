import { getTranslations } from "next-intl/server";

import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import projectsData from "@/data/projects.json";
import type { Locale, Project } from "@/types";

const projects = projectsData as Project[];

export async function ProjectsSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Projects" });

  const featuredProjects = projects.filter((project) => project.featured);
  const labels = {
    viewDetails: t("viewDetails"),
    watchDemo: t("watchDemo"),
    close: t("close"),
  };

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          {t("title")}
        </h2>
        <p className="max-w-2xl font-semibold text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} locale={locale} labels={labels} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button variant="outline" size="lg" nativeButton={false} render={<Link href="/projects" />}>
          {t("seeMore")}
        </Button>
      </div>
    </section>
  );
}
