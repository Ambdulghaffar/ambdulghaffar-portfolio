import { Header } from "@/components/header";
import { ScrollToHash } from "@/components/scroll-to-hash";
import type { Locale } from "@/types";

// TODO(plan-refonte): sections removed during redesign cleanup, see docs/plan-refonte.md.
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
      <main className="flex-1" />
    </div>
  );
}
