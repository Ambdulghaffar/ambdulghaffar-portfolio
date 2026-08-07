import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { Home, SearchX } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Handles every URL that doesn't match a route (the common "typo'd link" 404
 * case) — required because the root layout lives under `[locale]`, a
 * top-level dynamic segment, which Next.js can't compose a normal
 * `not-found.tsx` from (see next.config.ts). This file owns its own
 * `<html>/<body>` and bypasses the app's normal layout rendering entirely.
 */
export default async function GlobalNotFound() {
  const locale = await getLocale();
  const t = await getTranslations("NotFound");
  const c = await getTranslations("Common");

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative flex min-h-full flex-col">
        <div
          className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-160 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,var(--color-primary),transparent)] opacity-[0.06]"
          aria-hidden="true"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
            <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
              <SearchX className="size-10" />
            </div>
            <p className="mt-6 font-heading text-7xl font-extrabold text-primary sm:text-8xl">
              404
            </p>
            <h1 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">
              {t("title")}
            </h1>
            <p className="mt-3 max-w-md text-muted-foreground">{t("message")}</p>
            <Button
              size="lg"
              className="mt-8 font-bold"
              nativeButton={false}
              render={<Link href="/" />}
            >
              <Home data-icon="inline-start" />
              {c("backToHome")}
            </Button>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
