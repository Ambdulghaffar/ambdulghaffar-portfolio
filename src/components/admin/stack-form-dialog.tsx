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
import { Button } from "@/components/ui/button";
import type { StackCategory } from "@/types";

export function StackFormDialog({ category }: { category?: StackCategory }) {
  const isEdit = Boolean(category);

  return (
    <Dialog>
      <DialogTrigger
        render={isEdit ? <Button variant="outline" size="sm" /> : <Button size="sm" />}
      >
        {isEdit ? <Pencil /> : <Plus data-icon="inline-start" />}
        {isEdit ? "Modifier" : "Ajouter une catégorie"}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Modifier la catégorie" : "Ajouter une catégorie"}
          </DialogTitle>
          <DialogDescription>
            Renseignez la catégorie et ses technologies associées.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="category-fr">Catégorie (FR)</Label>
              <Input id="category-fr" defaultValue={category?.category.fr} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="category-en">Catégorie (EN)</Label>
              <Input id="category-en" defaultValue={category?.category.en} />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="items">Technologies (séparées par des virgules)</Label>
            <Input id="items" defaultValue={category?.items.join(", ")} />
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
