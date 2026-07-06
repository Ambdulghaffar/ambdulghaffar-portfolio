import { getTranslations } from "next-intl/server";

import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import profile from "@/data/profile.json";
import type { Locale, Profile } from "@/types";

const data = profile as Profile;

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Footer" });
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
        <p>
          © {year} {data.name}. {t("rights")}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={data.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-foreground"
          >
            <LinkedInIcon className="size-4" />
          </a>
          <a
            href={data.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-foreground"
          >
            <GitHubIcon className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
