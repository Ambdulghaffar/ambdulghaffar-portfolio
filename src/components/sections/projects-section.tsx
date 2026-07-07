import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/section-heading";
import { ProjectsGrid } from "@/components/projects-grid";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import projectsData from "@/data/projects.json";
import type { Locale, Project } from "@/types";

const projects = projectsData as Project[];

export async function ProjectsSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Projects" });

  return (
    <section id="projects" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      <div className="mt-8">
        <ProjectsGrid
          projects={projects.slice(0, 6)}
          locale={locale}
          watchDemoLabel={t("watchDemo")}
        />
      </div>
      <div className="mt-8 flex justify-center">
        <Button variant="outline" nativeButton={false} render={<Link href="/projects" />}>
          {t("seeMore")}
        </Button>
      </div>
    </section>
  );
}
