import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { CyberButton } from "@/components/ui/CyberButton";
import { FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const threatColors: Record<string, string> = {
  CRITICAL: "text-destructive border-destructive/30 bg-destructive/10",
  HIGH: "text-warning border-warning/30 bg-warning/10",
  MEDIUM: "text-primary border-primary/30 bg-primary/10",
  LOW: "text-muted-foreground border-border bg-muted/20",
};

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const togglePublish = async (id: string, current: boolean) => {
    const update: any = { is_published: !current };
    if (!current) update.published_at = new Date().toISOString();
    await supabase.from("blog_posts").update(update).eq("id", id);
    toast({ title: current ? "Unpublished" : "Published" });
    fetchPosts();
  };

  return (
    <div>
      <SectionLabel>// THREAT INTEL</SectionLabel>
      <h1 className="font-display text-3xl font-700 mt-2 mb-8">
        BLOG <GlowText>POSTS</GlowText>
      </h1>

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : posts.length === 0 ? (
        <div className="bg-card border border-border p-8 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground font-mono text-sm">No blog posts yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="bg-card border border-border p-4 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-lg font-600">{p.title}</h3>
                  {p.threat_level && (
                    <span className={cn("font-mono text-[10px] px-2 py-0.5 border uppercase tracking-widest", threatColors[p.threat_level] || "")}>
                      {p.threat_level}
                    </span>
                  )}
                  <span className={`font-mono text-[10px] px-2 py-0.5 border uppercase tracking-widest ${p.is_published ? "text-primary border-primary/30 bg-primary/10" : "text-muted-foreground border-border bg-muted/20"}`}>
                    {p.is_published ? "LIVE" : "DRAFT"}
                  </span>
                </div>
                <p className="font-mono text-xs text-muted-foreground mt-1">{p.category}</p>
              </div>
              <CyberButton size="sm" variant="outline" onClick={() => togglePublish(p.id, p.is_published)}>
                {p.is_published ? "Unpublish" : "Publish"}
              </CyberButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
