import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { CyberButton } from "@/components/ui/CyberButton";
import { useToast } from "@/hooks/use-toast";

export default function CustomerSettings() {
  const { profile, refreshProfile } = useAuth();
  const [name, setName] = useState(profile?.name || "");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({ name }).eq("id", profile.id);
    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      await refreshProfile();
      toast({ title: "Saved", description: "Profile updated." });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-lg">
          <SectionLabel>// ACCOUNT</SectionLabel>
          <h1 className="font-display text-3xl font-700 mt-2 mb-8">
            <GlowText>SETTINGS</GlowText>
          </h1>
          <div className="bg-card border border-border p-6 space-y-4">
            <div>
              <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1">Email</label>
              <input type="text" readOnly value={profile?.email || ""} className="w-full h-10 px-3 bg-secondary/50 border border-border text-muted-foreground font-mono text-sm cursor-not-allowed" />
            </div>
            <div>
              <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-10 px-3 bg-secondary border border-border text-foreground font-mono text-sm focus:border-primary focus:outline-none transition-colors" />
            </div>
            <CyberButton onClick={handleSave} disabled={saving} className="w-full">
              {saving ? "Saving..." : "Update Profile"}
            </CyberButton>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
