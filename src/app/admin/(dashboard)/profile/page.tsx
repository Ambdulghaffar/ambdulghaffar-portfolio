import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import profile from "@/data/profile.json";
import type { Profile } from "@/types";

const data = profile as Profile;

export default function AdminProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-xl font-semibold">Profil</h1>
        <p className="text-sm text-muted-foreground">
          Informations générales affichées sur le portfolio
        </p>
      </div>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
          <CardDescription>Nom, titre et bio dans les deux langues</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" defaultValue={data.name} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="initials">Initiales</Label>
                <Input id="initials" defaultValue={data.initials} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="title-fr">Titre (FR)</Label>
                <Input id="title-fr" defaultValue={data.title.fr} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="title-en">Titre (EN)</Label>
                <Input id="title-en" defaultValue={data.title.en} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="tagline-fr">Tagline (FR)</Label>
                <Input id="tagline-fr" defaultValue={data.tagline.fr} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="tagline-en">Tagline (EN)</Label>
                <Input id="tagline-en" defaultValue={data.tagline.en} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="bio-fr">Bio (FR)</Label>
                <Textarea id="bio-fr" rows={5} defaultValue={data.bio.fr} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="bio-en">Bio (EN)</Label>
                <Textarea id="bio-en" rows={5} defaultValue={data.bio.en} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="location-fr">Localisation (FR)</Label>
                <Input id="location-fr" defaultValue={data.location.fr} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="location-en">Localisation (EN)</Label>
                <Input id="location-en" defaultValue={data.location.en} />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Contact & réseaux</CardTitle>
          <CardDescription>Coordonnées et liens sociaux</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={data.email} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" defaultValue={data.phone} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input id="linkedin" defaultValue={data.socials.linkedin} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="github">GitHub</Label>
                <Input id="github" defaultValue={data.socials.github} />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cv-url">Lien du CV (PDF)</Label>
              <Input id="cv-url" defaultValue={data.cvUrl} />
            </div>
          </form>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline">Annuler</Button>
          <Button>Enregistrer les modifications</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
