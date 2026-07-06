import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { localize } from "@/lib/i18n-data";
import type { Education, Locale } from "@/types";

interface EducationCardProps {
  education: Education;
  locale: Locale;
}

export function EducationCard({ education, locale }: EducationCardProps) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="text-base">{education.degree[locale]}</CardTitle>
        <CardDescription>
          {education.institution} — {education.detail[locale]}
        </CardDescription>
        <p className="text-sm text-muted-foreground">
          {localize(education.period, locale)}
        </p>
      </CardHeader>
    </Card>
  );
}
