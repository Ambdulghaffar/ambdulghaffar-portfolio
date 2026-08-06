import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";

import { Header } from "@/components/header";
import { ParticleBackground } from "@/components/particle-background";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import projectsData from "@/data/projects.json";
import type { Locale, Project } from "@/types";

const projects = projectsData as Project[];

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "Projects" });
  const c = await getTranslations({ locale, namespace: "Common" });

  const labels = {
    viewDetails: t("viewDetails"),
    watchDemo: t("watchDemo"),
    close: t("close"),
  };

  return (
    <div className="flex flex-1 flex-col">
      <Header locale={locale} />
      <main className="relative flex-1">
        <ParticleBackground />
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            className="mb-6"
            render={<Link href="/" />}
          >
            <ArrowLeft data-icon="inline-start" />
            {c("backToHome")}
          </Button>

          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
              {t("allTitle")}
            </h1>
            <p className="max-w-2xl font-semibold text-muted-foreground">{t("subtitle")}</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} locale={locale} labels={labels} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
