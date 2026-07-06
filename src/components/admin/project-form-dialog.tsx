"use client";

import * as React from "react";
import { Plus, Pencil, Trash2, ImagePlus } from "lucide-react";

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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { Project, ProjectLink, ProjectLinkType } from "@/types";

const LINK_TYPE_LABELS: Record<ProjectLinkType, string> = {
  "github-backend": "GitHub — Backend",
  "github-frontend": "GitHub — Frontend",
  "github-mobile": "GitHub — Mobile",
  github: "GitHub",
  live: "Démo en ligne",
};

function emptyLink(): ProjectLink {
  return { type: "github", label: { fr: "", en: "" }, url: "" };
}

export function ProjectFormDialog({ project }: { project?: Project }) {
  const isEdit = Boolean(project);
  const [links, setLinks] = React.useState<ProjectLink[]>(
    () => project?.links ?? []
  );

  function updateLink(index: number, patch: Partial<ProjectLink>) {
    setLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, ...patch } : link))
    );
  }

  function updateLinkLabel(index: number, locale: "fr" | "en", value: string) {
    setLinks((prev) =>
      prev.map((link, i) =>
        i === index ? { ...link, label: { ...link.label, [locale]: value } } : link
      )
    );
  }

  function removeLink(index: number) {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  }

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

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="image-file">Image du projet</Label>
            <div className="flex items-center gap-2">
              <Input id="image-file" type="file" accept="image/*" className="flex-1" />
              <ImagePlus className="size-4 shrink-0 text-muted-foreground" />
            </div>
            <Input
              id="image-url"
              placeholder="/images/projects/mon-projet.png"
              defaultValue={project?.image}
              aria-label="Chemin ou URL de l'image"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label>Liens</Label>
              <Button
                type="button"
                variant="outline"
                size="xs"
                onClick={() => setLinks((prev) => [...prev, emptyLink()])}
              >
                <Plus data-icon="inline-start" />
                Ajouter un lien
              </Button>
            </div>
            {links.length === 0 && (
              <p className="text-xs text-muted-foreground">Aucun lien pour le moment.</p>
            )}
            <div className="flex flex-col gap-3">
              {links.map((link, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 rounded-lg border border-border p-3"
                >
                  <div className="flex items-center gap-2">
                    <Select
                      value={link.type}
                      onValueChange={(value) =>
                        updateLink(index, { type: value as ProjectLinkType })
                      }
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(Object.keys(LINK_TYPE_LABELS) as ProjectLinkType[]).map((type) => (
                          <SelectItem key={type} value={type}>
                            {LINK_TYPE_LABELS[type]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Supprimer ce lien"
                      onClick={() => removeLink(index)}
                    >
                      <Trash2 className="text-destructive" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Libellé (FR)"
                      value={link.label.fr}
                      onChange={(e) => updateLinkLabel(index, "fr", e.target.value)}
                    />
                    <Input
                      placeholder="Libellé (EN)"
                      value={link.label.en}
                      onChange={(e) => updateLinkLabel(index, "en", e.target.value)}
                    />
                  </div>
                  <Input
                    placeholder="https://..."
                    value={link.url}
                    onChange={(e) => updateLink(index, { url: e.target.value })}
                  />
                </div>
              ))}
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
