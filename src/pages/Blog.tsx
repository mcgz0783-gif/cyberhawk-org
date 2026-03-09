import { motion } from "framer-motion";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const threatLevelColors: Record<string, string> = {
  CRITICAL: "bg-destructive/20 text-destructive border-destructive/30",
  HIGH: "bg-warning/20 text-warning border-warning/30",
  MEDIUM: "bg-primary/20 text-primary border-primary/30",
  LOW: "bg-muted text-muted-foreground border-border",
};

const samplePosts = [
  {
    id: "1",
    title: "Critical Vulnerability in East African Banking Platforms",
    slug: "critical-vuln-ea-banking",
    excerpt: "Our threat intel team has identified a critical SQL injection vulnerability affecting multiple banking platforms across East Africa.",
    category: "ZERO-DAY",
    threatLevel: "CRITICAL",
    author: "CyberHawk-UG Threat Intel Team",
    readTime: "5 min read",
    publishedAt: "2024-12-15",
  },
  {
    id: "2",
    title: "Ransomware Campaign Targeting Ugandan Government Agencies",
    slug: "ransomware-campaign-ug-gov",
    excerpt: "A new ransomware strain has been observed targeting government agencies in Uganda. Here's what you need to know.",
    category: "RANSOMWARE",
    threatLevel: "HIGH",
    author: "CyberHawk-UG Threat Intel Team",
    readTime: "8 min read",
    publishedAt: "2024-12-10",
  },
  {
    id: "3",
    title: "AI-Powered Phishing Attacks on the Rise in Africa",
    slug: "ai-phishing-attacks-africa",
    excerpt: "Threat actors are leveraging AI to craft more convincing phishing emails targeting African businesses.",
    category: "AI THREATS",
    threatLevel: "HIGH",
    author: "CyberHawk-UG Threat Intel Team",
    readTime: "6 min read",
    publishedAt: "2024-12-05",
  },
  {
    id: "4",
    title: "Best Practices for Securing Mobile Money Platforms",
    slug: "securing-mobile-money-platforms",
    excerpt: "Mobile money is the backbone of East African finance. Here's how to protect these critical platforms.",
    category: "ADVISORY",
    threatLevel: "MEDIUM",
    author: "CyberHawk-UG Threat Intel Team",
    readTime: "10 min read",
    publishedAt: "2024-11-28",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 bg-grid scanlines relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <SectionLabel>// THREAT INTEL FEED</SectionLabel>
            <h1 className="text-4xl md:text-5xl font-700 mt-4 mb-4">
              <GlowText>THREAT</GlowText> INTELLIGENCE
            </h1>
            <p className="max-w-xl mx-auto text-muted-foreground">
              Stay ahead of emerging threats with insights from our security operations team.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {samplePosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border p-6 hover:border-t-primary transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-primary tracking-wider">{post.category}</span>
                  {post.threatLevel && (
                    <span className={cn("font-mono text-[10px] px-2 py-0.5 border uppercase tracking-widest", threatLevelColors[post.threatLevel])}>
                      {post.threatLevel}
                    </span>
                  )}
                  <span className="font-mono text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <Link to={`/blog/${post.slug}`}>
                  <h2 className="font-display text-xl font-600 text-foreground hover:text-primary transition-colors mb-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-sm text-muted-foreground mb-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{post.publishedAt}</span>
                  <Link to={`/blog/${post.slug}`} className="font-mono text-xs text-primary hover:underline">
                    Read Analysis →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
