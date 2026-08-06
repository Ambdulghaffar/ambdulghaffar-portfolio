import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { StatItem } from "@/components/stat-item";
import { SocialLinks } from "@/components/social-links";
import { RoleTypewriter } from "@/components/role-typewriter";
import { Link } from "@/i18n/navigation";
import profile from "@/data/profile.json";
import type { Locale, Profile } from "@/types";

const data = profile as Profile;

/** Placeholder figures — adjust once real numbers are confirmed. */
const HERO_STATS = [
  { value: "2+", key: "experience" },
  { value: "8+", key: "projects" },
  { value: "5+", key: "frameworks" },
] as const;

export async function HeroSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Hero" });
  const roles = t.raw("roles") as string[];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 ">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <p className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {t("eyebrow")}
          </p>

          <div className="flex flex-col gap-2">
            <p className="font-heading text-2xl font-bold text-primary sm:text-3xl">
              {data.name}
            </p>
            <h1 className="font-heading text-2xl leading-tight font-extrabold text-foreground sm:text-3xl lg:text-5xl">
              <RoleTypewriter roles={roles} />
            </h1>
          </div>

          <p className="max-w-xl text-muted-foreground font-semibold">
            {data.heroSummary[locale]}
          </p>

          <div className="flex flex-wrap gap-8">
            {HERO_STATS.map((stat) => (
              <StatItem
                key={stat.key}
                value={stat.value}
                label={t(`stats.${stat.key}`)}
              />
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="font-bold text-md"
              nativeButton={false}
              render={<Link href={{ pathname: "/", hash: "projects" }} />}
            >
              {t("viewProjects")}
            </Button>
            {/* TODO(plan-refonte): wire to the Contact Dialog once it's built, see docs/plan-refonte.md */}
            <Button variant="outline" size="lg" className="font-bold text-md">
              {t("getInTouch")}
            </Button>
          </div>

          <SocialLinks socials={data.socials} />
        </div>

        <div className="hidden lg:flex lg:justify-center lg:items-center">
          <div className="relative aspect-4/3 w-full max-w-md overflow-hidden rounded-2xl bg-muted transition-transform duration-300 ease-out hover:scale-105 hover:rotate-2">
            {data.photoUrl ? (
              <Image
                src={data.photoUrl}
                alt={data.name}
                fill
                priority
                sizes="(min-width: 1024px) 28rem, 0px"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <span className="font-heading text-6xl font-bold text-primary">
                  {data.initials}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
