import { getTranslations } from "next-intl/server";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { NavLinks } from "@/components/nav-links";
import { Link } from "@/i18n/navigation";
import profile from "@/data/profile.json";
import type { Locale, Profile } from "@/types";

const data = profile as Profile;

export async function Header({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Nav" });
  const c = await getTranslations({ locale, namespace: "Common" });
  const h = await getTranslations({ locale, namespace: "Hero" });
  const cvUrl = data.cvUrl[locale];

  const navItems = [
    { hash: "about", label: t("about") },
    { hash: "stack", label: t("stack") },
    { hash: "projects", label: t("projects") },
    { hash: "experience", label: t("experience") },
    { hash: "contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="min-w-0 truncate rounded-md font-heading text-base font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {data.name}
        </Link>

        <NavLinks navItems={navItems} />

        <div className="flex items-center gap-1">
          <ThemeToggle label={c("toggleTheme")} />
          <LanguageToggle locale={locale} label={c("toggleLanguage")} />
          <Button
            variant="outline"
            size="default"
            nativeButton={false}
            className="hidden border-primary bg-transparent text-primary text-base font-semibold  transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground dark:border-primary dark:bg-transparent dark:hover:border-primary dark:hover:bg-primary dark:hover:text-primary-foreground sm:inline-flex"
            render={<a href={cvUrl} download />}
          >
            <Download data-icon="inline-start" />
            {h("downloadCv")}
          </Button>
          <MobileNav
            navItems={navItems}
            menuLabel={c("menu")}
            siteName={data.name}
            cvUrl={cvUrl}
            downloadCvLabel={h("downloadCv")}
          />
        </div>
      </div>
    </header>
  );
}
