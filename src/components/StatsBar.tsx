import { cn } from "@/lib/utils";

interface StatItemProps {
  value: string;
  label: string;
}

export function StatsBar() {
  const stats: StatItemProps[] = [
    { value: "500+", label: "Threats Neutralized" },
    { value: "8 YRS", label: "In Operation" },
    { value: "200+", label: "Clients Protected" },
    { value: "24/7", label: "SOC Monitoring" },
  ];

  return (
    <div className="border-y border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl md:text-3xl font-700 text-primary">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-muted-foreground tracking-wider uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
