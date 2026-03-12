import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CyberButton } from "@/components/ui/CyberButton";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, Shield, User, LogOut } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Store", path: "/store" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-border"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <Shield className="h-7 w-7 text-primary transition-all group-hover:drop-shadow-[0_0_8px_hsl(170_100%_50%/0.6)]" />
          <span className="font-display text-xl font-700 text-foreground tracking-wider">
            CYBER<span className="text-primary">HAWK</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="font-mono text-xs text-muted-foreground hover:text-primary px-3 py-2 tracking-wider uppercase transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-2 ml-4">
              {isAdmin && (
                <Link to="/admin">
                  <CyberButton size="sm" variant="danger">Admin</CyberButton>
                </Link>
              )}
              <Link to="/dashboard">
                <CyberButton size="sm" variant="outline">
                  <User className="h-3 w-3 mr-1" /> Portal
                </CyberButton>
              </Link>
              <button onClick={signOut} className="text-muted-foreground hover:text-destructive transition-colors">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-4">
              <Link to="/login">
                <CyberButton size="sm" variant="outline">Sign In</CyberButton>
              </Link>
              <Link to="/contact">
                <CyberButton size="sm">Get Protected</CyberButton>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-b border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="font-mono text-sm text-muted-foreground hover:text-primary py-2 tracking-wider uppercase transition-colors">
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="font-mono text-sm text-primary py-2 tracking-wider uppercase">Portal</Link>
                {isAdmin && <Link to="/admin" onClick={() => setIsOpen(false)} className="font-mono text-sm text-destructive py-2 tracking-wider uppercase">Admin</Link>}
                <button onClick={() => { signOut(); setIsOpen(false); }} className="font-mono text-sm text-muted-foreground hover:text-destructive py-2 tracking-wider uppercase text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="mt-2"><CyberButton size="sm" variant="outline" className="w-full">Sign In</CyberButton></Link>
                <Link to="/contact" onClick={() => setIsOpen(false)}><CyberButton size="sm" className="w-full">Get Protected</CyberButton></Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
