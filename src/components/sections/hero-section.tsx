import { getTranslations } from "next-intl/server";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import profile from "@/data/profile.json";
import type { Locale, Profile } from "@/types";

const data = profile as Profile;

export async function HeroSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Hero" });

  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 sm:py-28">
      <p className="text-sm font-medium text-primary">{data.tagline[locale]}</p>
      <h1 className="max-w-2xl font-heading text-3xl font-semibold tracking-tight sm:text-5xl">
        {data.title[locale]}
      </h1>
      <p className="max-w-xl text-muted-foreground sm:text-lg">{data.bio[locale]}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" render={<a href="#projects" />}>
          {t("viewProjects")}
        </Button>
        <Button
          size="lg"
          variant="outline"
          render={<a href={data.cvUrl} download />}
        >
          <Download data-icon="inline-start" />
          {t("downloadCv")}
        </Button>
      </div>
    </section>
  );
}
