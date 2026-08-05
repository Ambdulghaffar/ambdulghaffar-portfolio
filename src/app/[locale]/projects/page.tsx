import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import projectsData from "@/data/projects.json";
import type { Locale, Project } from "@/types";

const projects = projectsData as Project[];

// TODO(plan-refonte): projects grid/card removed during redesign cleanup, see docs/plan-refonte.md.
export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "Projects" });
  const c = await getTranslations({ locale, namespace: "Common" });

  return (
    <div className="flex flex-1 flex-col">
      <Header locale={locale} />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            className="mb-4"
            render={<Link href="/" />}
          >
            <ArrowLeft data-icon="inline-start" />
            {c("backToHome")}
          </Button>
          <h1 className="text-2xl font-bold">{t("allTitle")}</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {projects.length} projects — grid UI to be rebuilt, see docs/plan-refonte.md.
          </p>
        </section>
      </main>
    </div>
  );
}
