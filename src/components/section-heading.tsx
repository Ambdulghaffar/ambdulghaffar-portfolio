interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col gap-2 text-center sm:text-left ${className ?? ""}`}>
      <h2 className="text-2xl font-heading font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {subtitle && <p className="text-muted-foreground sm:text-lg">{subtitle}</p>}
    </div>
  );
}
