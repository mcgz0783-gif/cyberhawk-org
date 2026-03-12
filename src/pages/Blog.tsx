import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const threatLevelColors: Record<string, string> = {
  CRITICAL: "bg-destructive/20 text-destructive border-destructive/30",
  HIGH: "bg-warning/20 text-warning border-warning/30",
  MEDIUM: "bg-primary/20 text-primary border-primary/30",
  LOW: "bg-muted text-muted-foreground border-border",
};

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .then(({ data }) => {
        setPosts(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 bg-grid scanlines relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <SectionLabel>// THREAT INTEL FEED</SectionLabel>
            <h1 className="text-4xl md:text-5xl font-700 mt-4 mb-4">
              <GlowText>THREAT</GlowText> INTELLIGENCE
            </h1>
            <p className="max-w-xl mx-auto text-muted-foreground">
              Stay ahead of emerging threats with insights from our security operations team.
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
            <div className="space-y-6">
              {posts.map((post) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border p-6 hover:border-t-primary transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="font-mono text-xs text-primary tracking-wider">{post.category}</span>
                    {post.threat_level && (
                      <span className={cn("font-mono text-[10px] px-2 py-0.5 border uppercase tracking-widest", threatLevelColors[post.threat_level] || "")}>
                        {post.threat_level}
                      </span>
                    )}
                    <span className="font-mono text-xs text-muted-foreground">{post.read_time}</span>
                  </div>
                  <Link to={`/blog/${post.slug}`}>
                    <h2 className="font-display text-xl font-600 text-foreground hover:text-primary transition-colors mb-2">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString() : ""}
                    </span>
                    <Link to={`/blog/${post.slug}`} className="font-mono text-xs text-primary hover:underline">
                      Read Analysis →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
