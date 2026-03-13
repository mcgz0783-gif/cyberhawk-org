import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const threatLevelColors: Record<string, string> = {
  CRITICAL: "bg-destructive/20 text-destructive border-destructive/30",
  HIGH: "bg-warning/20 text-warning border-warning/30",
  MEDIUM: "bg-primary/20 text-primary border-primary/30",
  LOW: "bg-muted text-muted-foreground border-border",
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single()
      .then(({ data }) => {
        setPost(data);
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

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-40 text-center">
          <h1 className="font-display text-3xl font-700 mb-4">NOT FOUND</h1>
          <p className="text-muted-foreground mb-6">This post doesn't exist or has been removed.</p>
          <Link to="/blog" className="font-mono text-xs text-primary hover:underline">
            <ArrowLeft className="h-3 w-3 inline mr-1" /> Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-grid scanlines relative">
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:underline mb-8">
            <ArrowLeft className="h-3 w-3" /> BACK TO THREAT INTEL
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <SectionLabel>// {post.category}</SectionLabel>
              {post.threat_level && (
                <span className={cn("font-mono text-[10px] px-2 py-0.5 border uppercase tracking-widest", threatLevelColors[post.threat_level] || "")}>
                  {post.threat_level}
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-700 mb-6 max-w-3xl">
              <GlowText>{post.title}</GlowText>
            </h1>

            <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {post.published_at ? new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "Unpublished"}
              </span>
              {post.read_time && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {post.read_time}
                </span>
              )}
              <span>By {post.author}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover Image */}
      {post.cover_url && (
        <div className="container mx-auto px-4">
          <div className="border border-border overflow-hidden -mt-2">
            <img src={post.cover_url} alt={post.title} className="w-full h-64 md:h-96 object-cover" />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-invert prose-sm max-w-none font-body text-foreground/90 leading-relaxed space-y-4 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-700 [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-600 [&_h3]:text-foreground [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_code]:font-mono [&_code]:text-primary [&_code]:bg-secondary/50 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground">
              {post.content.split("\n").map((paragraph: string, i: number) => {
                if (!paragraph.trim()) return null;
                if (paragraph.startsWith("## ")) return <h2 key={i}>{paragraph.replace("## ", "")}</h2>;
                if (paragraph.startsWith("### ")) return <h3 key={i}>{paragraph.replace("### ", "")}</h3>;
                if (paragraph.startsWith("> ")) return <blockquote key={i}><p>{paragraph.replace("> ", "")}</p></blockquote>;
                if (paragraph.startsWith("- ")) return <ul key={i}><li>{paragraph.replace("- ", "")}</li></ul>;
                return <p key={i}>{paragraph}</p>;
              })}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="font-mono text-[10px] px-2 py-1 border border-border text-muted-foreground uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
