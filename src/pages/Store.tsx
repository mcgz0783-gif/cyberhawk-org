import { motion } from "framer-motion";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { CyberButton } from "@/components/ui/CyberButton";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { BookOpen, ShieldCheck } from "lucide-react";

const sampleEbooks = [
  {
    id: "1",
    title: "The East African Threat Landscape 2024",
    slug: "east-african-threat-landscape-2024",
    description: "A comprehensive analysis of cyber threats targeting East African businesses and governments.",
    price: 1999,
    category: "Threat Intelligence",
    tags: ["threat-intel", "africa", "2024"],
  },
  {
    id: "2",
    title: "Penetration Testing Playbook",
    slug: "penetration-testing-playbook",
    description: "Step-by-step guide to conducting professional penetration tests for web and network infrastructure.",
    price: 2499,
    category: "Offensive Security",
    tags: ["pentest", "methodology", "tools"],
  },
  {
    id: "3",
    title: "Incident Response for African Enterprises",
    slug: "incident-response-african-enterprises",
    description: "Build and execute incident response plans tailored for the African business environment.",
    price: 1499,
    category: "Blue Team",
    tags: ["IR", "playbook", "enterprise"],
  },
  {
    id: "4",
    title: "Ransomware Defense Strategies",
    slug: "ransomware-defense-strategies",
    description: "Protect your organization from the rising tide of ransomware attacks with proven defense frameworks.",
    price: 999,
    category: "Defense",
    tags: ["ransomware", "defense", "backup"],
  },
];

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function Store() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 bg-grid scanlines relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <SectionLabel>// CYBERHAWK STORE</SectionLabel>
            <h1 className="text-4xl md:text-5xl font-700 mt-4 mb-4">
              SECURITY <GlowText>RESOURCES</GlowText>
            </h1>
            <p className="max-w-xl mx-auto text-muted-foreground">
              Expert-authored ebooks and reports to level up your security posture.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleEbooks.map((ebook) => (
              <motion.div
                key={ebook.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border flex flex-col hover:-translate-y-0.5 hover:border-t-primary transition-all duration-300"
              >
                {/* Cover placeholder */}
                <div className="h-48 bg-secondary/30 flex items-center justify-center border-b border-border">
                  <BookOpen className="h-12 w-12 text-muted-foreground/30" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="font-mono text-xs text-primary mb-2">{ebook.category}</span>
                  <h3 className="font-display text-lg font-600 text-foreground mb-2">{ebook.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{ebook.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-display text-xl font-700 text-primary">{formatPrice(ebook.price)}</span>
                    <Link to={`/store/${ebook.slug}`}>
                      <CyberButton size="sm">
                        <ShieldCheck className="h-4 w-4 mr-1" />
                        View
                      </CyberButton>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
