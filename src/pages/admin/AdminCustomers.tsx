import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { CyberButton } from "@/components/ui/CyberButton";
import { Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCustomers = async () => {
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    setCustomers(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchCustomers(); }, []);

  const toggleBan = async (id: string, isBanned: boolean) => {
    await supabase.from("profiles").update({ is_banned: !isBanned, ban_reason: !isBanned ? "Banned by admin" : null }).eq("id", id);
    toast({ title: isBanned ? "User Unbanned" : "User Banned" });
    fetchCustomers();
  };

  return (
    <div>
      <SectionLabel>// USER MANAGEMENT</SectionLabel>
      <h1 className="font-display text-3xl font-700 mt-2 mb-8">
        <GlowText>CUSTOMERS</GlowText>
      </h1>

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : customers.length === 0 ? (
        <div className="bg-card border border-border p-8 text-center">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground font-mono text-sm">No customers yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {customers.map((c) => (
            <div key={c.id} className="bg-card border border-border p-4 flex items-center justify-between">
              <div>
                <h3 className="font-display font-600">{c.name || "Unnamed"}</h3>
                <p className="font-mono text-xs text-muted-foreground">{c.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-mono text-[10px] px-2 py-0.5 border uppercase tracking-widest ${c.is_banned ? "text-destructive border-destructive/30 bg-destructive/10" : "text-primary border-primary/30 bg-primary/10"}`}>
                  {c.is_banned ? "BANNED" : "ACTIVE"}
                </span>
                <CyberButton size="sm" variant={c.is_banned ? "outline" : "danger"} onClick={() => toggleBan(c.id, c.is_banned)}>
                  {c.is_banned ? "Unban" : "Ban"}
                </CyberButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
