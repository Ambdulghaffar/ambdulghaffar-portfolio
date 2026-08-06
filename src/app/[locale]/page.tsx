import { Header } from "@/components/header";
import { ParticleBackground } from "@/components/particle-background";
import { ScrollToHash } from "@/components/scroll-to-hash";
import { AboutSection } from "@/components/sections/about-section";
import { HeroSection } from "@/components/sections/hero-section";
import { StackSection } from "@/components/sections/stack-section";
import type { Locale } from "@/types";

// TODO(plan-refonte): remaining sections still to rebuild, see docs/plan-refonte.md.
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };

  return (
    <div className="flex flex-1 flex-col">
      <ScrollToHash />
      <Header locale={locale} />
      <main className="flex-1">
        <HeroSection locale={locale} />
        <div className="relative">
          <ParticleBackground />
          <AboutSection locale={locale} />
          <StackSection locale={locale} />
        </div>
      </main>
    </div>
  );
}
