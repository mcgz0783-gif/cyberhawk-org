import { Link } from "react-router-dom";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-display text-lg font-700 text-foreground tracking-wider">
                CYBER<span className="text-primary">HAWK</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Defending East Africa in Cyberspace. Uganda's premier cybersecurity operations firm.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-600 text-foreground mb-4 tracking-wider">NAVIGATION</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", path: "/" },
                { label: "About", path: "/about" },
                { label: "Store", path: "/store" },
                { label: "Blog", path: "/blog" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors tracking-wider uppercase"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-sm font-600 text-foreground mb-4 tracking-wider">LEGAL</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Terms of Service", path: "/legal/terms" },
                { label: "Privacy Policy", path: "/legal/privacy" },
                { label: "Refund Policy", path: "/legal/refund" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors tracking-wider uppercase"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-600 text-foreground mb-4 tracking-wider">CONTACT</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:mcgz0783@gmail.com" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                <span className="font-mono">mcgz0783@gmail.com</span>
              </a>
              <a href="tel:+256783699626" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                <span className="font-mono">+256 783 699 626</span>
              </a>
              <a href="https://wa.me/256788213106" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                <span className="font-mono">WhatsApp</span>
              </a>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="font-mono">Kampala, Uganda</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} CyberHawk-UG. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
