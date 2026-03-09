import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span className={cn("font-mono text-xs text-primary tracking-widest uppercase", className)}>
      {children}
    </span>
  );
}

interface GlowTextProps {
  children: React.ReactNode;
  color?: "cyan" | "red" | "yellow";
  className?: string;
  as?: "span" | "h1" | "h2" | "h3";
}

export function GlowText({ children, color = "cyan", className, as: Tag = "span" }: GlowTextProps) {
  const glowMap = {
    cyan: "text-primary [text-shadow:var(--text-glow-cyan)]",
    red: "text-destructive [text-shadow:var(--text-glow-red)]",
    yellow: "text-warning",
  };

  return <Tag className={cn(glowMap[color], className)}>{children}</Tag>;
}
