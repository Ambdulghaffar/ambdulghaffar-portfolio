import { getTranslations } from "next-intl/server";
import { Mail, Phone, MessageCircle, MapPin, FlaskConical } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/contact-form";
import { GitHubIcon, LinkedInIcon, InstagramIcon, FacebookIcon } from "@/components/icons";
import profile from "@/data/profile.json";
import type { Locale, Profile } from "@/types";

const data = profile as Profile;

export async function ContactSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Contact" });

  const socialLinks = [
    { key: "github", url: data.socials.github, label: "GitHub", Icon: GitHubIcon },
    { key: "linkedin", url: data.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { key: "instagram", url: data.socials.instagram, label: "Instagram", Icon: InstagramIcon },
    { key: "facebook", url: data.socials.facebook, label: "Facebook", Icon: FacebookIcon },
  ].filter((social) => social.url.trim() !== "");

  return (
    <section id="contact" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-5">
          <h3 className="font-heading text-lg font-semibold">{t("infoTitle")}</h3>

          <a
            href={`mailto:${data.email}`}
            className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="size-4 shrink-0" />
            {data.email}
          </a>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <a
              href={`tel:${data.phone}`}
              className="flex items-center gap-3 transition-colors hover:text-foreground"
            >
              <Phone className="size-4 shrink-0" />
              {data.phone}
            </a>
            {data.socials.whatsapp.trim() !== "" && (
              <a
                href={data.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="transition-colors hover:text-foreground"
              >
                <MessageCircle className="size-4" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0" />
            {data.location[locale]}
          </div>

          <div className="h-px w-full bg-border" />

          <div className="flex flex-wrap items-center gap-4">
            {socialLinks.map(({ key, url, label, Icon }) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="size-5" />
              </a>
            ))}
            {data.socials.kaggle.trim() !== "" && (
              <a
                href={data.socials.kaggle}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <FlaskConical className="size-5" />
                <span className="text-sm">Kaggle</span>
              </a>
            )}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
