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
import type { Project } from "@/types";

export function ProjectFormDialog({ project }: { project?: Project }) {
  const isEdit = Boolean(project);

  return (
    <Dialog>
      <DialogTrigger
        render={
          isEdit ? (
            <Button variant="outline" size="sm" />
          ) : (
            <Button size="sm" />
          )
        }
      >
        {isEdit ? <Pencil /> : <Plus data-icon="inline-start" />}
        {isEdit ? "Modifier" : "Ajouter un projet"}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Modifier le projet" : "Ajouter un projet"}</DialogTitle>
          <DialogDescription>
            Renseignez les informations du projet dans les deux langues.
          </DialogDescription>
        </DialogHeader>
        <form className="grid max-h-[70vh] gap-4 overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="title-fr">Titre (FR)</Label>
              <Input id="title-fr" defaultValue={project?.title.fr} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="title-en">Titre (EN)</Label>
              <Input id="title-en" defaultValue={project?.title.en} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="description-fr">Description (FR)</Label>
              <Textarea id="description-fr" rows={3} defaultValue={project?.description.fr} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="description-en">Description (EN)</Label>
              <Textarea id="description-en" rows={3} defaultValue={project?.description.en} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="status-fr">Statut (FR)</Label>
              <Input id="status-fr" defaultValue={project?.status.fr} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="status-en">Statut (EN)</Label>
              <Input id="status-en" defaultValue={project?.status.en} />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="stack">Stack (séparée par des virgules)</Label>
            <Input id="stack" defaultValue={project?.stack.join(", ")} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="github-url">Lien GitHub</Label>
              <Input id="github-url" defaultValue={project?.githubUrl} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="live-url">Lien démo</Label>
              <Input id="live-url" defaultValue={project?.liveUrl} />
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
