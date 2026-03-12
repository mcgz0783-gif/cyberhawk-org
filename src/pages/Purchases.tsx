import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function Purchases() {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("purchases")
      .select("*, ebooks(title, slug, cover_url)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setPurchases(data || []);
        setLoading(false);
      });
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <SectionLabel>// MY PURCHASES</SectionLabel>
          <h1 className="font-display text-3xl font-700 mt-2 mb-8">
            PURCHASE <GlowText>HISTORY</GlowText>
          </h1>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : purchases.length === 0 ? (
            <div className="bg-card border border-border p-8 text-center">
              <ShieldCheck className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-mono text-sm">No purchases yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {purchases.map((p) => (
                <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-border p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-600">{(p as any).ebooks?.title}</h3>
                    <p className="font-mono text-xs text-muted-foreground">
                      Status: <span className={p.status === "completed" ? "text-primary" : "text-warning"}>{p.status.toUpperCase()}</span>
                      {" · "}Downloads: {p.download_count}/10
                    </p>
                  </div>
                  <span className="font-display text-lg font-700 text-primary">${(p.amount_paid / 100).toFixed(2)}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
