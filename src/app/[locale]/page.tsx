import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { StackSection } from "@/components/sections/stack-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ContactSection } from "@/components/sections/contact-section";
import type { Locale } from "@/types";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };

  return (
    <div className="flex flex-1 flex-col">
      <Header locale={locale} />
      <main className="flex-1">
        <HeroSection locale={locale} />
        <StackSection locale={locale} />
        <AboutSection locale={locale} />
        <ProjectsSection locale={locale} />
        <ExperienceSection locale={locale} />
        <ContactSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
