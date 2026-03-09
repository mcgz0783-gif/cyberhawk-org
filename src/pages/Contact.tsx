import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { CyberButton } from "@/components/ui/CyberButton";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate send
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 bg-grid scanlines relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <SectionLabel>// GET IN TOUCH</SectionLabel>
            <h1 className="text-4xl md:text-5xl font-700 mt-4 mb-4">
              <GlowText>CONTACT</GlowText> US
            </h1>
            <p className="max-w-xl mx-auto text-muted-foreground">
              Ready to strengthen your security posture? Our team is standing by.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-card border border-border p-8">
              <h2 className="font-display text-xl font-600 text-foreground mb-6">SEND A MESSAGE</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: "name", label: "Full Name", type: "text" },
                  { key: "email", label: "Email", type: "email" },
                  { key: "subject", label: "Subject", type: "text" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="font-mono text-xs text-muted-foreground mb-1 block uppercase tracking-wider">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full bg-background border border-border text-foreground text-sm px-4 py-2.5 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="font-mono text-xs text-muted-foreground mb-1 block uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-background border border-border text-foreground text-sm px-4 py-2.5 focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
                <CyberButton type="submit" size="lg" className="w-full" disabled={sending}>
                  <Send className="h-4 w-4 mr-2" />
                  {sending ? "Sending..." : "Send Message"}
                </CyberButton>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <SectionLabel>// DIRECT CONTACT</SectionLabel>
                <h2 className="font-display text-xl font-600 text-foreground mt-3 mb-6">REACH OUR TEAM</h2>
              </div>

              <div className="space-y-6">
                <a href="mailto:mcgz0783@gmail.com" className="flex items-start gap-4 group">
                  <div className="bg-card border border-border p-3 group-hover:border-primary transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-display text-sm font-600 text-foreground">EMAIL</div>
                    <div className="font-mono text-sm text-muted-foreground">mcgz0783@gmail.com</div>
                  </div>
                </a>

                <a href="tel:+256783699626" className="flex items-start gap-4 group">
                  <div className="bg-card border border-border p-3 group-hover:border-primary transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-display text-sm font-600 text-foreground">PHONE</div>
                    <div className="font-mono text-sm text-muted-foreground">+256 783 699 626</div>
                  </div>
                </a>

                <a href="https://wa.me/256788213106" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                  <div className="bg-card border border-border p-3 group-hover:border-primary transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-display text-sm font-600 text-foreground">WHATSAPP</div>
                    <div className="font-mono text-sm text-muted-foreground">+256 788 213 106</div>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="bg-card border border-border p-3">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-display text-sm font-600 text-foreground">LOCATION</div>
                    <div className="font-mono text-sm text-muted-foreground">Kampala, Uganda</div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border p-6 mt-8">
                <h3 className="font-display text-sm font-600 text-foreground mb-2">RESPONSE TIME</h3>
                <p className="text-sm text-muted-foreground">
                  We respond to all inquiries within 24 hours. For urgent security incidents, call our direct line or WhatsApp us immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
