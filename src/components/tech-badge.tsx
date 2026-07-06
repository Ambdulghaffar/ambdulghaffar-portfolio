import { Badge } from "@/components/ui/badge";

export function TechBadge({ label }: { label: string }) {
  return (
    <Badge variant="outline" className="font-mono">
      {label}
    </Badge>
  );
}
