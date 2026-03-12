import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { CyberButton } from "@/components/ui/CyberButton";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { Shield, Eye, EyeOff, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      toast({ title: "Access Denied", description: error, variant: "destructive" });
    } else {
      // Role check happens via ProtectedRoute on /admin
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-background bg-grid scanlines relative flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm mx-4 relative z-10">
        <div className="bg-card border border-border p-8">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="h-5 w-5 text-destructive" />
            <SectionLabel>// RESTRICTED ACCESS</SectionLabel>
          </div>
          <h1 className="font-display text-2xl font-700 mb-1">
            ADMIN <GlowText>PORTAL</GlowText>
          </h1>
          <p className="font-mono text-[10px] text-muted-foreground mb-6">AUTHORIZED PERSONNEL ONLY</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-10 px-3 bg-secondary border border-border text-foreground font-mono text-sm focus:border-primary focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1">Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-10 px-3 pr-10 bg-secondary border border-border text-foreground font-mono text-sm focus:border-primary focus:outline-none transition-colors" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <CyberButton type="submit" disabled={submitting} variant="danger" className="w-full">
              {submitting ? "Authenticating..." : "Access Admin Panel"}
            </CyberButton>
          </form>

          <div className="mt-6 pt-4 border-t border-border text-center">
            <Shield className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
            <p className="font-mono text-[10px] text-muted-foreground">CyberHawk-UG Security Operations</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
