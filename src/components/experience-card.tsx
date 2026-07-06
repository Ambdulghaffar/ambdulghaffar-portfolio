import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { localize } from "@/lib/i18n-data";
import type { Experience, Locale } from "@/types";

interface ExperienceCardProps {
  experience: Experience;
  locale: Locale;
}

export function ExperienceCard({ experience, locale }: ExperienceCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base">{experience.role[locale]}</CardTitle>
            <CardDescription>{experience.company}</CardDescription>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {experience.contractType[locale]}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {localize(experience.period, locale)} · {experience.location[locale]}
        </p>
      </CardHeader>
      <CardContent>
        <ul className="list-disc space-y-1.5 pl-4 text-sm text-foreground/90">
          {experience.bullets[locale].map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
