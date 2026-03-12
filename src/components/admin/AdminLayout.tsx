import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { CyberButton } from "@/components/ui/CyberButton";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  ShoppingCart,
  Users,
  LogOut,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Ebooks", path: "/admin/ebooks", icon: BookOpen },
  { label: "Blog Posts", path: "/admin/blog", icon: FileText },
  { label: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { label: "Customers", path: "/admin/customers", icon: Users },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { signOut, profile } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={cn("border-r border-border bg-sidebar-background flex flex-col transition-all duration-300", collapsed ? "w-16" : "w-60")}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!collapsed && (
            <Link to="/admin" className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-display text-sm font-700 tracking-wider">
                CYBER<span className="text-primary">HAWK</span>
              </span>
            </Link>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="text-muted-foreground hover:text-foreground transition-colors">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors",
                  active ? "text-primary bg-primary/10 border-l-2 border-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          {!collapsed && (
            <p className="font-mono text-[10px] text-muted-foreground mb-2 truncate">{profile?.email}</p>
          )}
          <button onClick={signOut} className="flex items-center gap-2 text-muted-foreground hover:text-destructive font-mono text-xs transition-colors w-full">
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
