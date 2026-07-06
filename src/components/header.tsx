import NextLink from "next/link";
import { getTranslations } from "next-intl/server";
import { LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { Link } from "@/i18n/navigation";
import profile from "@/data/profile.json";
import type { Locale, Profile } from "@/types";

const data = profile as Profile;

export async function Header({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Nav" });
  const c = await getTranslations({ locale, namespace: "Common" });

  const navItems = [
    { href: "#about", label: t("about") },
    { href: "#stack", label: t("stack") },
    { href: "#projects", label: t("projects") },
    { href: "#experience", label: t("experience") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-heading text-sm font-semibold tracking-tight">
          {data.name}
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle label={c("toggleTheme")} />
          <LanguageToggle locale={locale} label={c("toggleLanguage")} />
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            aria-label={t("login")}
            render={<NextLink href="/admin/login" aria-label={t("login")} />}
          >
            <LogIn className="size-4" />
          </Button>
          <MobileNav
            navItems={navItems}
            loginLabel={t("login")}
            loginHref="/admin/login"
            menuLabel={c("menu")}
            siteName={data.name}
          />
        </div>
      </div>
    </header>
  );
}
