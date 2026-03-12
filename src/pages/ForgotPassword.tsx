import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { CyberButton } from "@/components/ui/CyberButton";
import { SectionLabel } from "@/components/ui/CyberText";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-4">
          <div className="bg-card border border-border p-8">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-6 w-6 text-primary" />
              <SectionLabel>// PASSWORD RESET</SectionLabel>
            </div>
            {sent ? (
              <div className="text-center">
                <h2 className="font-display text-xl font-700 mb-2">EMAIL SENT</h2>
                <p className="text-sm text-muted-foreground mb-4">Check your inbox for a password reset link.</p>
                <Link to="/login"><CyberButton variant="outline" className="w-full">Back to Login</CyberButton></Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-sm text-muted-foreground mb-2">Enter your email and we'll send a reset link.</p>
                <div>
                  <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1">Email</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-10 px-3 bg-secondary border border-border text-foreground font-mono text-sm focus:border-primary focus:outline-none transition-colors" />
                </div>
                <CyberButton type="submit" disabled={submitting} className="w-full">
                  {submitting ? "Sending..." : "Send Reset Link"}
                </CyberButton>
                <Link to="/login" className="block text-center font-mono text-xs text-muted-foreground hover:text-primary">Back to Login</Link>
              </form>
            )}
          </div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}
