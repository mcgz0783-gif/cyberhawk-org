import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { motion } from "framer-motion";
import { BookOpen, FileText, ShoppingCart, Users } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ ebooks: 0, posts: 0, orders: 0, customers: 0 });

  useEffect(() => {
    Promise.all([
      supabase.from("ebooks").select("id", { count: "exact", head: true }),
      supabase.from("blog_posts").select("id", { count: "exact", head: true }),
      supabase.from("purchases").select("id", { count: "exact", head: true }),
      supabase.from("profiles").select("id", { count: "exact", head: true }),
    ]).then(([eb, bp, pu, pr]) => {
      setStats({
        ebooks: eb.count || 0,
        posts: bp.count || 0,
        orders: pu.count || 0,
        customers: pr.count || 0,
      });
    });
  }, []);

  const cards = [
    { label: "Ebooks", value: stats.ebooks, icon: BookOpen, color: "text-primary" },
    { label: "Blog Posts", value: stats.posts, icon: FileText, color: "text-primary" },
    { label: "Orders", value: stats.orders, icon: ShoppingCart, color: "text-warning" },
    { label: "Customers", value: stats.customers, icon: Users, color: "text-primary" },
  ];

  return (
    <div>
      <SectionLabel>// COMMAND CENTER</SectionLabel>
      <h1 className="font-display text-3xl font-700 mt-2 mb-8">
        ADMIN <GlowText>DASHBOARD</GlowText>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border p-6">
            <c.icon className={`h-8 w-8 ${c.color} mb-3`} />
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">{c.label}</p>
            <p className="font-display text-3xl font-700 mt-1">{c.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
