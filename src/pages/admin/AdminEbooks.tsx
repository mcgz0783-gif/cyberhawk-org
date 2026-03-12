import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { CyberButton } from "@/components/ui/CyberButton";
import { BookOpen, Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminEbooks() {
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchEbooks = async () => {
    const { data } = await supabase.from("ebooks").select("*").order("created_at", { ascending: false });
    setEbooks(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchEbooks(); }, []);

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from("ebooks").update({ is_published: !current }).eq("id", id);
    toast({ title: current ? "Unpublished" : "Published" });
    fetchEbooks();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <SectionLabel>// CONTENT MANAGEMENT</SectionLabel>
          <h1 className="font-display text-3xl font-700 mt-2">
            <GlowText>EBOOKS</GlowText>
          </h1>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : ebooks.length === 0 ? (
        <div className="bg-card border border-border p-8 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground font-mono text-sm">No ebooks yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {ebooks.map((eb) => (
            <div key={eb.id} className="bg-card border border-border p-4 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg font-600">{eb.title}</h3>
                  <span className={`font-mono text-[10px] px-2 py-0.5 border uppercase tracking-widest ${eb.is_published ? "text-primary border-primary/30 bg-primary/10" : "text-muted-foreground border-border bg-muted/20"}`}>
                    {eb.is_published ? "LIVE" : "DRAFT"}
                  </span>
                </div>
                <p className="font-mono text-xs text-muted-foreground mt-1">
                  ${(eb.price / 100).toFixed(2)} · {eb.category || "Uncategorized"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CyberButton size="sm" variant="outline" onClick={() => togglePublish(eb.id, eb.is_published)}>
                  {eb.is_published ? "Unpublish" : "Publish"}
                </CyberButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
