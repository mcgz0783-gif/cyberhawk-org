import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { CyberButton } from "@/components/ui/CyberButton";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PW_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();

  const pwValid = PW_REGEX.test(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwValid) {
      toast({ title: "Weak Password", description: "Min 8 chars, 1 uppercase, 1 number", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const { error } = await signUp(email, password, name);
    setSubmitting(false);
    if (error) {
      toast({ title: "Registration Failed", description: error, variant: "destructive" });
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-20 min-h-screen flex items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md mx-4 text-center">
            <div className="bg-card border border-border p-8">
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="font-display text-2xl font-700 mb-2">CHECK YOUR EMAIL</h2>
              <p className="text-sm text-muted-foreground mb-6">
                We've sent a verification link to <span className="text-primary font-mono">{email}</span>. Click it to activate your account.
              </p>
              <Link to="/login">
                <CyberButton variant="outline" className="w-full">Back to Login</CyberButton>
              </Link>
            </div>
          </motion.div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-4">
          <div className="bg-card border border-border p-8">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-6 w-6 text-primary" />
              <SectionLabel>// CREATE ACCOUNT</SectionLabel>
            </div>
            <h1 className="font-display text-2xl font-700 mb-6">
              <GlowText>REGISTER</GlowText>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-10 px-3 bg-secondary border border-border text-foreground font-mono text-sm focus:border-primary focus:outline-none transition-colors" />
              </div>
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
                <div className="mt-1 font-mono text-[10px] space-y-0.5">
                  <p className={password.length >= 8 ? "text-primary" : "text-muted-foreground"}>✓ Min 8 characters</p>
                  <p className={/[A-Z]/.test(password) ? "text-primary" : "text-muted-foreground"}>✓ 1 uppercase letter</p>
                  <p className={/\d/.test(password) ? "text-primary" : "text-muted-foreground"}>✓ 1 number</p>
                </div>
              </div>
              <CyberButton type="submit" disabled={submitting} className="w-full">
                {submitting ? "Creating Account..." : "Register"}
              </CyberButton>
            </form>

            <p className="mt-6 text-center font-mono text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}
