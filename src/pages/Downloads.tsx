import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { Download as DownloadIcon } from "lucide-react";

export default function Downloads() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <SectionLabel>// FILE ACCESS</SectionLabel>
          <h1 className="font-display text-3xl font-700 mt-2 mb-8">
            <GlowText>DOWNLOADS</GlowText>
          </h1>
          <div className="bg-card border border-border p-8 text-center">
            <DownloadIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground font-mono text-sm">
              Your purchased files will appear here. Purchase ebooks from the store to get started.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
