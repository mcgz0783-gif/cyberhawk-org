import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function ServiceCard({ icon, title, description, className }: ServiceCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-card border border-border p-6 transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-t-primary hover:shadow-[0_-2px_20px_hsl(170_100%_50%/0.15)]",
        className
      )}
    >
      <div className="text-primary mb-4 text-3xl">{icon}</div>
      <h3 className="font-display text-lg font-600 text-foreground mb-2">{title}</h3>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
