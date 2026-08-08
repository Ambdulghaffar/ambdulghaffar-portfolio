import { getTranslations } from "next-intl/server";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/social-links";
import { Link } from "@/i18n/navigation";
import profile from "@/data/profile.json";
import type { Locale, Profile } from "@/types";

const data = profile as Profile;

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Footer" });
  const nav = await getTranslations({ locale, namespace: "Nav" });
  const h = await getTranslations({ locale, namespace: "Hero" });
  const cvUrl = data.cvUrl[locale];
  const year = new Date().getFullYear();

  const navItems = [
    { href: "/" as const, label: nav("home") },
    { href: { pathname: "/", hash: "about" } as const, label: nav("about") },
    { href: { pathname: "/", hash: "stack" } as const, label: nav("stack") },
    { href: { pathname: "/", hash: "projects" } as const, label: nav("projects") },
    { href: { pathname: "/", hash: "experience" } as const, label: nav("experience") },
    { href: { pathname: "/", hash: "contact" } as const, label: nav("contact") },
  ];

  return (
    <footer className="border-t border-border/60 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div className="flex flex-col items-start gap-4">
            <span className="font-heading text-lg font-semibold tracking-tight">
              {data.name}
            </span>
            <p className="max-w-xs text-sm text-muted-foreground">{t("tagline")}</p>
            <Button
              variant="outline"
              size="default"
              nativeButton={false}
              className="border-primary bg-transparent text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground dark:border-primary dark:bg-transparent dark:hover:border-primary dark:hover:bg-primary dark:hover:text-primary-foreground"
              render={<a href={cvUrl} download />}
            >
              <Download data-icon="inline-start" />
              {h("downloadCv")}
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              {t("navigate")}
            </span>
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="w-fit rounded-md text-sm font-medium text-foreground outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              {t("connect")}
            </span>
            <SocialLinks socials={data.socials} />
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <span>{data.email}</span>
              <span>{data.location[locale]}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{t("copyright", { year, name: data.name })}</p>
          <p>{t("credit")}</p>
        </div>
      </div>
    </footer>
  );
}
