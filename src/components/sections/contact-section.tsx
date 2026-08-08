import { getTranslations } from "next-intl/server";
import { Clock, Mail, MapPin } from "lucide-react";

import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { CopyEmailButton } from "@/components/copy-email-button";
import { SocialLinks } from "@/components/social-links";
import { Reveal } from "@/components/reveal";
import profile from "@/data/profile.json";
import type { Locale, Profile } from "@/types";

const data = profile as Profile;

export async function ContactSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Contact" });

  const infoRows = [
    { icon: Mail, text: data.availability[locale] },
    { icon: Clock, text: t("responseTime") },
    { icon: MapPin, text: data.location[locale] },
  ] as const;

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 border-t border-border/60">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
          {t("title")}
        </h2>
        <p className="max-w-xl font-semibold text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal>
          <Card className="p-6">
            <ContactForm />
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="gap-5 p-6">
            <p className="font-heading text-xl font-bold text-foreground">{t("infoTitle")}</p>
            <p className="text-sm text-muted-foreground">{t("description")}</p>

            <ul className="flex flex-col gap-3">
              {infoRows.map(({ icon: Icon, text }, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-medium text-foreground"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            <div className="h-px w-full bg-border" />

            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 flex-col">
                <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {t("email")}
                </span>
                <span className="truncate text-sm font-medium text-foreground">{data.email}</span>
              </div>
              <CopyEmailButton
                email={data.email}
                copyLabel={t("copy")}
                copiedLabel={t("copied")}
              />
            </div>

            <div className="h-px w-full bg-border" />

            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-foreground">{t("findMeOn")}</span>
              <SocialLinks socials={data.socials} />
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
