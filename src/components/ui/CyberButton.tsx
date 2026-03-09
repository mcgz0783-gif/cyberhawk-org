import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cyberButtonVariants = cva(
  "inline-flex items-center justify-center font-display font-600 uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:shadow-[var(--glow-cyan)] [clip-path:var(--clip-button)]",
        outline:
          "border border-primary text-primary hover:bg-primary/10 hover:shadow-[var(--glow-cyan)] [clip-path:var(--clip-button)]",
        danger:
          "bg-destructive text-destructive-foreground hover:shadow-[var(--glow-red)] [clip-path:var(--clip-button)]",
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-secondary",
        link:
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-4 text-xs",
        md: "h-10 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface CyberButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof cyberButtonVariants> {
  asChild?: boolean;
}

const CyberButton = React.forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(cyberButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
CyberButton.displayName = "CyberButton";

export { CyberButton, cyberButtonVariants };
