import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/section-heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/types";

export async function ContactSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Contact" });

  return (
    <section id="contact" className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      <form className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">{t("name")}</Label>
          <Input id="name" name="name" placeholder={t("namePlaceholder")} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" name="email" type="email" placeholder={t("emailPlaceholder")} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="message">{t("message")}</Label>
          <Textarea id="message" name="message" placeholder={t("messagePlaceholder")} rows={5} />
        </div>
        <Button type="submit" className="mt-2 self-start">
          {t("send")}
        </Button>
      </form>
    </section>
  );
}
