import { motion } from "framer-motion";
import { Shield, Target, Users, Award, Eye, Lock } from "lucide-react";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { CyberButton } from "@/components/ui/CyberButton";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";

const values = [
  { icon: <Shield className="h-8 w-8" />, title: "Defense First", desc: "Every decision is made through the lens of protecting our clients." },
  { icon: <Target className="h-8 w-8" />, title: "Offensive Mindset", desc: "We think like attackers to build better defenses." },
  { icon: <Eye className="h-8 w-8" />, title: "Transparency", desc: "Clear reporting, honest assessments, no hidden agendas." },
  { icon: <Lock className="h-8 w-8" />, title: "Confidentiality", desc: "Your data and findings are sacred. Always." },
  { icon: <Users className="h-8 w-8" />, title: "Community", desc: "Building East Africa's cybersecurity ecosystem together." },
  { icon: <Award className="h-8 w-8" />, title: "Excellence", desc: "World-class standards adapted for the African context." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-grid scanlines relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <SectionLabel>// WHO WE ARE</SectionLabel>
            <h1 className="text-4xl md:text-5xl font-700 mt-4 mb-4">
              ABOUT <GlowText>CYBERHAWK-UG</GlowText>
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
              Uganda's frontline cybersecurity operations firm — built to defend Africa's digital future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <SectionLabel>// OUR MISSION</SectionLabel>
              <h2 className="text-2xl font-700 mt-3 mb-6 text-foreground">WHY WE EXIST</h2>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  CyberHawk-UG was founded with a singular purpose: to bring world-class offensive and defensive security capabilities to East Africa. We believe every organization — regardless of size — deserves the same level of protection as Fortune 500 companies.
                </p>
                <p>
                  Since 2018, we have been operating from Kampala, Uganda, serving clients across the region — from financial institutions and government agencies to startups and NGOs. Our team combines deep technical expertise with an intimate understanding of the African threat landscape.
                </p>
                <p>
                  We don't just respond to threats. We hunt them. We anticipate them. We eliminate them before they strike.
                </p>
              </div>
            </div>
            <div className="bg-card border border-border p-8">
              <SectionLabel>// BY THE NUMBERS</SectionLabel>
              <h3 className="text-xl font-700 mt-3 mb-6 text-foreground">OUR TRACK RECORD</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { val: "500+", label: "Threats Neutralized" },
                  { val: "200+", label: "Clients Protected" },
                  { val: "8+", label: "Years Operating" },
                  { val: "24/7", label: "SOC Coverage" },
                  { val: "50+", label: "Pen Tests / Year" },
                  { val: "99.9%", label: "Uptime Record" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-2xl font-700 text-primary">{s.val}</div>
                    <div className="font-mono text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 border-y border-border bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <SectionLabel>// CORE VALUES</SectionLabel>
            <h2 className="text-3xl font-700 mt-3 text-foreground">WHAT DRIVES US</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border p-6 hover:-translate-y-0.5 hover:border-t-primary transition-all duration-300"
              >
                <div className="text-primary mb-3">{v.icon}</div>
                <h3 className="font-display text-lg font-600 text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-700 mb-4 text-foreground">
            Ready to <GlowText>Secure</GlowText> Your Future?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm">
            Let our team assess your security posture and build a tailored defense strategy.
          </p>
          <Link to="/contact">
            <CyberButton size="lg">Start Your Assessment</CyberButton>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
