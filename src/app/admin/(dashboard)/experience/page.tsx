import { Trash2 } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExperienceFormDialog } from "@/components/admin/experience-form-dialog";
import experienceData from "@/data/experience.json";
import type { Experience } from "@/types";

const experiences = experienceData as Experience[];

export default function AdminExperiencePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl font-semibold">Expérience</h1>
          <p className="text-sm text-muted-foreground">
            {experiences.length} entrée{experiences.length > 1 ? "s" : ""}
          </p>
        </div>
        <ExperienceFormDialog />
      </div>

      <div className="flex flex-col gap-3">
        {experiences.map((experience) => (
          <Card key={experience.id}>
            <CardHeader className="flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="text-base">{experience.role.fr}</CardTitle>
                <CardDescription>
                  {experience.company} · {experience.contractType.fr}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <ExperienceFormDialog experience={experience} />
                <Button variant="ghost" size="icon-sm" aria-label="Supprimer">
                  <Trash2 className="text-destructive" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {experience.bullets.fr.length} point{experience.bullets.fr.length > 1 ? "s" : ""} clé
              {experience.bullets.fr.length > 1 ? "s" : ""}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
