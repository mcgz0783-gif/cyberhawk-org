import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { CyberButton } from "@/components/ui/CyberButton";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [params] = useSearchParams();
  const banned = params.get("error") === "banned";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      toast({ title: "Login Failed", description: error, variant: "destructive" });
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-4"
        >
          <div className="bg-card border border-border p-8">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-6 w-6 text-primary" />
              <SectionLabel>// CLIENT LOGIN</SectionLabel>
            </div>
            <h1 className="font-display text-2xl font-700 mb-6">
              SIGN <GlowText>IN</GlowText>
            </h1>

            {banned && (
              <div className="bg-destructive/10 border border-destructive/30 p-3 mb-4 font-mono text-xs text-destructive">
                Your account has been suspended. Contact support.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 px-3 bg-secondary border border-border text-foreground font-mono text-sm focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-10 px-3 pr-10 bg-secondary border border-border text-foreground font-mono text-sm focus:border-primary focus:outline-none transition-colors"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <CyberButton type="submit" disabled={submitting} className="w-full">
                {submitting ? "Authenticating..." : "Sign In"}
              </CyberButton>
            </form>

            <div className="mt-6 flex flex-col gap-2 text-center">
              <Link to="/forgot-password" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
                Forgot password?
              </Link>
              <p className="font-mono text-xs text-muted-foreground">
                No account?{" "}
                <Link to="/signup" className="text-primary hover:underline">Register</Link>
              </p>
            </div>
          </div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}
