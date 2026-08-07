import { Home, SearchX } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  const c = await getTranslations("Common");

  return (
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
  );
}
