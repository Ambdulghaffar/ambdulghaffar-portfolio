import { getTranslations } from "next-intl/server";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionHeading } from "@/components/section-heading";
import { ProjectsGrid } from "@/components/projects-grid";
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

  return (
    <div className="flex flex-1 flex-col">
      <Header locale={locale} />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <SectionHeading title={t("allTitle")} />
          <div className="mt-8">
            <ProjectsGrid projects={projects} locale={locale} watchDemoLabel={t("watchDemo")} />
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
