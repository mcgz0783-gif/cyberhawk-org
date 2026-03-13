import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { CyberButton } from "@/components/ui/CyberButton";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookOpen, ArrowLeft, ShieldCheck, FileText, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function EbookDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [ebook, setEbook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("ebooks")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()
      .then(({ data }) => {
        setEbook(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center py-40">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!ebook) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-40 text-center">
          <h1 className="font-display text-3xl font-700 mb-4">NOT FOUND</h1>
          <p className="text-muted-foreground mb-6">This ebook doesn't exist or has been removed.</p>
          <Link to="/store"><CyberButton variant="outline"><ArrowLeft className="h-4 w-4 mr-2" /> Back to Store</CyberButton></Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <Link to="/store" className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:underline mb-8">
            <ArrowLeft className="h-3 w-3" /> BACK TO STORE
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Cover */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="bg-secondary/30 border border-border aspect-[3/4] flex items-center justify-center overflow-hidden">
                {ebook.cover_url ? (
                  <img src={ebook.cover_url} alt={ebook.title} className="w-full h-full object-cover" />
                ) : (
                  <BookOpen className="h-24 w-24 text-muted-foreground/20" />
                )}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
              <SectionLabel>// {ebook.category || "EBOOK"}</SectionLabel>
              <h1 className="font-display text-3xl md:text-4xl font-700 mt-3 mb-4">
                <GlowText>{ebook.title}</GlowText>
              </h1>

              <p className="text-muted-foreground leading-relaxed mb-8">{ebook.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {ebook.author && (
                  <div className="bg-card border border-border p-4">
                    <User className="h-4 w-4 text-primary mb-1" />
                    <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Author</p>
                    <p className="font-display font-600 text-sm mt-1">{ebook.author}</p>
                  </div>
                )}
                {ebook.page_count && (
                  <div className="bg-card border border-border p-4">
                    <FileText className="h-4 w-4 text-primary mb-1" />
                    <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Pages</p>
                    <p className="font-display font-600 text-sm mt-1">{ebook.page_count}</p>
                  </div>
                )}
              </div>

              {ebook.tags && ebook.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {ebook.tags.map((tag: string) => (
                    <span key={tag} className="font-mono text-[10px] px-2 py-1 border border-border text-muted-foreground uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-auto pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-700 text-primary">{formatPrice(ebook.price)}</span>
                  <CyberButton size="lg">
                    <ShieldCheck className="h-5 w-5 mr-2" /> Purchase
                  </CyberButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
