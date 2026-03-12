import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { CyberButton } from "@/components/ui/CyberButton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Download, Settings, BookOpen } from "lucide-react";

export default function Dashboard() {
  const { profile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <SectionLabel>// CLIENT PORTAL</SectionLabel>
            <h1 className="font-display text-3xl font-700 mt-2 mb-6">
              WELCOME, <GlowText>{profile?.name || profile?.email || "OPERATOR"}</GlowText>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { icon: BookOpen, label: "My Purchases", desc: "View purchased ebooks & reports", to: "/purchases" },
              { icon: Download, label: "Downloads", desc: "Access your downloaded files", to: "/downloads" },
              { icon: Settings, label: "Settings", desc: "Manage your account", to: "/settings" },
            ].map((item) => (
              <Link key={item.to} to={item.to}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border p-6 hover:border-t-primary transition-all duration-300 hover:-translate-y-0.5"
                >
                  <item.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-display text-lg font-600 mb-1">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex gap-4">
            <Link to="/store"><CyberButton variant="outline">Browse Store</CyberButton></Link>
            <CyberButton variant="ghost" onClick={signOut}>Sign Out</CyberButton>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
