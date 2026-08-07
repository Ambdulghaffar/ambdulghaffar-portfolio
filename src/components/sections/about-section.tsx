import { getTranslations } from "next-intl/server";
import {
  CheckCircle2,
  Container,
  Layout,
  Rocket,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { TerminalIntro, type TerminalLine } from "@/components/terminal-intro";
import profile from "@/data/profile.json";
import type { Locale, Profile } from "@/types";

const data = profile as Profile;

const APPROACH_ICONS: Record<string, LucideIcon> = {
  layout: Layout,
  checkCircle: CheckCircle2,
  smartphone: Smartphone,
  container: Container,
  rocket: Rocket,
};

interface ApproachItem {
  icon: string;
  title: string;
  description: string;
}

export async function AboutSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "About" });
  const terminalLines = t.raw("terminalLines") as TerminalLine[];
  const approach = t.raw("approach") as ApproachItem[];

  return (
    <section id="about" className="mx-auto border-t border-border/60 max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          {t("title")}
        </h2>
        <p className="max-w-2xl font-semibold text-muted-foreground">{data.bio[locale]}</p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <TerminalIntro lines={terminalLines} />
      </div>

      <h3 className="mt-24 text-center font-heading text-2xl font-extrabold text-primary sm:text-3xl">
        {t("approachTitle")}
      </h3>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {approach.map((item) => {
          const Icon = APPROACH_ICONS[item.icon] ?? Layout;
          return (
            <Card key={item.title} className="gap-3 p-6">
              <Icon className="size-7 text-primary" aria-hidden="true" />
              <p className="font-heading text-lg font-bold text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
