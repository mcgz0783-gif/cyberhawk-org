import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { CyberButton } from "@/components/ui/CyberButton";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { BookOpen, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function Store() {
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("ebooks")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setEbooks(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 bg-grid scanlines relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <SectionLabel>// CYBERHAWK STORE</SectionLabel>
            <h1 className="text-4xl md:text-5xl font-700 mt-4 mb-4">
              SECURITY <GlowText>RESOURCES</GlowText>
            </h1>
            <p className="max-w-xl mx-auto text-muted-foreground">
              Expert-authored ebooks and reports to level up your security posture.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ebooks.map((ebook) => (
                <motion.div
                  key={ebook.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border flex flex-col hover:-translate-y-0.5 hover:border-t-primary transition-all duration-300"
                >
                  <div className="h-48 bg-secondary/30 flex items-center justify-center border-b border-border">
                    {ebook.cover_url ? (
                      <img src={ebook.cover_url} alt={ebook.title} className="w-full h-full object-cover" />
                    ) : (
                      <BookOpen className="h-12 w-12 text-muted-foreground/30" />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="font-mono text-xs text-primary mb-2">{ebook.category}</span>
                    <h3 className="font-display text-lg font-600 text-foreground mb-2">{ebook.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{ebook.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-display text-xl font-700 text-primary">{formatPrice(ebook.price)}</span>
                      <Link to={`/store/${ebook.slug}`}>
                        <CyberButton size="sm">
                          <ShieldCheck className="h-4 w-4 mr-1" />
                          View
                        </CyberButton>
                      </Link>
                    </div>
                  </div>
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
