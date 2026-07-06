"use client";

import { Plus, Pencil } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { localize } from "@/lib/i18n-data";
import type { Experience } from "@/types";

export function ExperienceFormDialog({ experience }: { experience?: Experience }) {
  const isEdit = Boolean(experience);

  return (
    <Dialog>
      <DialogTrigger
        render={isEdit ? <Button variant="outline" size="sm" /> : <Button size="sm" />}
      >
        {isEdit ? <Pencil /> : <Plus data-icon="inline-start" />}
        {isEdit ? "Modifier" : "Ajouter une expérience"}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Modifier l'expérience" : "Ajouter une expérience"}
          </DialogTitle>
          <DialogDescription>
            Renseignez les informations de l&apos;expérience dans les deux langues.
          </DialogDescription>
        </DialogHeader>
        <form className="grid max-h-[70vh] gap-4 overflow-y-auto pr-1">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="company">Entreprise / Organisation</Label>
            <Input id="company" defaultValue={experience?.company} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="role-fr">Rôle (FR)</Label>
              <Input id="role-fr" defaultValue={experience?.role.fr} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="role-en">Rôle (EN)</Label>
              <Input id="role-en" defaultValue={experience?.role.en} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contract-fr">Type de contrat (FR)</Label>
              <Input id="contract-fr" defaultValue={experience?.contractType.fr} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contract-en">Type de contrat (EN)</Label>
              <Input id="contract-en" defaultValue={experience?.contractType.en} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="location-fr">Lieu (FR)</Label>
              <Input id="location-fr" defaultValue={experience?.location.fr} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="location-en">Lieu (EN)</Label>
              <Input id="location-en" defaultValue={experience?.location.en} />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="period">Période</Label>
            <Input
              id="period"
              defaultValue={experience ? localize(experience.period, "fr") : ""}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="bullets-fr">Points clés (FR, un par ligne)</Label>
              <Textarea
                id="bullets-fr"
                rows={4}
                defaultValue={experience?.bullets.fr.join("\n")}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="bullets-en">Points clés (EN, un par ligne)</Label>
              <Textarea
                id="bullets-en"
                rows={4}
                defaultValue={experience?.bullets.en.join("\n")}
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Annuler</DialogClose>
          <DialogClose render={<Button />}>Enregistrer</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
