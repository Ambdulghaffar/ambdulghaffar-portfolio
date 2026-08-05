import { getTranslations } from "next-intl/server";

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
        <Link href="/" className="font-heading text-sm font-semibold tracking-tight">
          {data.name}
        </Link>

        <NavLinks navItems={navItems} />

        <div className="flex items-center gap-1">
          <ThemeToggle label={c("toggleTheme")} />
          <LanguageToggle locale={locale} label={c("toggleLanguage")} />
          <MobileNav navItems={navItems} menuLabel={c("menu")} siteName={data.name} />
        </div>
      </div>
    </header>
  );
}
