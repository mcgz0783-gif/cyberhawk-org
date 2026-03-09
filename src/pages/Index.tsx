import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Crosshair, Radar, Search, GraduationCap, MonitorDot } from "lucide-react";
import { CyberButton } from "@/components/ui/CyberButton";
import { GlowText, SectionLabel } from "@/components/ui/CyberText";
import { ServiceCard } from "@/components/ServiceCard";
import { StatsBar } from "@/components/StatsBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const typingPhrases = [
  "Cyber Threat Intelligence",
  "Penetration Testing",
  "Incident Response",
  "Security Audits",
];

function TypingEffect() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = typingPhrases[phraseIdx];
    const timeout = deleting ? 40 : 80;

    if (!deleting && charIdx === phrase.length) {
      setTimeout(() => setDeleting(true), 1500);
      return;
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % typingPhrases.length);
      return;
    }

    const timer = setTimeout(() => {
      setCharIdx((prev) => prev + (deleting ? -1 : 1));
    }, timeout);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, phraseIdx]);

  return (
    <span className="font-mono text-primary border-r-2 border-primary pr-1 animate-[typing-cursor_0.8s_step-end_infinite]">
      {typingPhrases[phraseIdx].slice(0, charIdx)}
    </span>
  );
}

const services = [
  { icon: <Crosshair />, title: "Penetration Testing", description: "Web, network, mobile, and social engineering assessments to find vulnerabilities before attackers do." },
  { icon: <Shield />, title: "Incident Response", description: "24/7 breach containment, digital forensics, and recovery operations." },
  { icon: <Radar />, title: "Threat Intelligence", description: "Real-time threat feeds and dark web monitoring for proactive defense." },
  { icon: <Search />, title: "Security Audits", description: "Comprehensive compliance and vulnerability auditing for your infrastructure." },
  { icon: <GraduationCap />, title: "Security Training", description: "Staff awareness programs and technical upskilling for your team." },
  { icon: <MonitorDot />, title: "SOC as a Service", description: "Continuous monitoring, detection, and response around the clock." },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-grid scanlines overflow-hidden">
        {/* Hex decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.04] animate-hex-rotate pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="100,10 180,55 180,145 100,190 20,145 20,55" stroke="hsl(170 100% 50%)" strokeWidth="0.5"/>
            <polygon points="100,30 160,65 160,135 100,170 40,135 40,65" stroke="hsl(170 100% 50%)" strokeWidth="0.3"/>
          </svg>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SectionLabel className="mb-6 block">// CYBERHAWK-UG</SectionLabel>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-700 leading-tight mb-6 animate-flicker">
              DEFENDING{" "}
              <GlowText color="cyan">EAST AFRICA</GlowText>
              <br />
              IN CYBERSPACE
            </h1>
            <div className="h-8 mb-6">
              <TypingEffect />
            </div>
            <p className="max-w-2xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed mb-10">
              CyberHawk-UG is Uganda's premier cybersecurity firm — protecting businesses, governments, and individuals from evolving digital threats with elite offensive and defensive security capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <CyberButton size="lg">🛡 Start Assessment</CyberButton>
              </Link>
              <Link to="/about">
                <CyberButton variant="outline" size="lg">Our Capabilities →</CyberButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <StatsBar />

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <SectionLabel>// OUR CAPABILITIES</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-700 text-foreground mt-3">
              ELITE SECURITY <GlowText>SERVICES</GlowText>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-y border-border bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-700 mb-4">
              Is Your Organization{" "}
              <GlowText color="red">VULNERABLE</GlowText>?
            </h2>
            <p className="max-w-xl mx-auto text-muted-foreground text-sm mb-8 leading-relaxed">
              The average cost of a data breach in Africa is rising. Let CyberHawk-UG assess your attack surface before threat actors do.
            </p>
            <Link to="/contact">
              <CyberButton size="lg">Request Free Consultation</CyberButton>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
