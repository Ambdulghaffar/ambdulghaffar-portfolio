import { getTranslations } from "next-intl/server";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProfileAvatar } from "@/components/profile-avatar";
import profile from "@/data/profile.json";
import type { Locale, Profile } from "@/types";

const data = profile as Profile;

export async function HeroSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Hero" });

  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-20 sm:px-6 sm:py-28 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
      <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
        <p className="text-sm font-medium text-primary">{data.tagline[locale]}</p>
        <h1 className="max-w-2xl font-heading text-3xl font-semibold tracking-tight sm:text-5xl">
          {data.title[locale]}
        </h1>
        <p className="max-w-xl text-muted-foreground sm:text-lg">
          {data.heroSummary[locale]}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            nativeButton={false}
            render={<a href="#projects" aria-label={t("viewProjects")} />}
          >
            {t("viewProjects")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<a href={data.cvUrl} download aria-label={t("downloadCv")} />}
          >
            <Download data-icon="inline-start" />
            {t("downloadCv")}
          </Button>
        </div>
      </div>
      <ProfileAvatar
        src={data.photoUrl}
        alt={data.name}
        initials={data.initials}
        className="size-40 sm:size-52 lg:size-64"
      />
    </section>
  );
}
