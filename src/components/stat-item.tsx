import { cn } from "@/lib/utils";

interface StatItemProps {
  value: string;
  label: string;
  className?: string;
}

export function StatItem({ value, label, className }: StatItemProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <span className="font-heading text-2xl font-bold text-primary sm:text-3xl">{value}</span>
      <span className="text-xs text-muted-foreground sm:text-sm">{label}</span>
    </div>
  );
}
