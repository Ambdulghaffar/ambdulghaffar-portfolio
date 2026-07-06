import { Trash2 } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StackFormDialog } from "@/components/admin/stack-form-dialog";
import stackData from "@/data/stack.json";
import type { StackCategory } from "@/types";

const categories = stackData as StackCategory[];

export default function AdminStackPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl font-semibold">Stack</h1>
          <p className="text-sm text-muted-foreground">
            {categories.length} catégorie{categories.length > 1 ? "s" : ""}
          </p>
        </div>
        <StackFormDialog />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="flex-row items-start justify-between gap-4">
              <CardTitle className="text-base">{category.category.fr}</CardTitle>
              <div className="flex gap-2">
                <StackFormDialog category={category} />
                <Button variant="ghost" size="icon-sm" aria-label="Supprimer">
                  <Trash2 className="text-destructive" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">
              {category.items.map((item) => (
                <Badge key={item} variant="outline" className="font-mono">
                  {item}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
