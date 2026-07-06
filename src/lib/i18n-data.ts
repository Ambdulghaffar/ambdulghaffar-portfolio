import type { Locale, MaybeLocalizedText } from "@/types";

export function localize(value: MaybeLocalizedText, locale: Locale): string {
  return typeof value === "string" ? value : value[locale];
}
