import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SectionLabel, GlowText } from "@/components/ui/CyberText";
import { ShoppingCart } from "lucide-react";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("purchases")
      .select("*, ebooks(title), profiles:user_id(email, name)")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setOrders(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <SectionLabel>// TRANSACTIONS</SectionLabel>
      <h1 className="font-display text-3xl font-700 mt-2 mb-8">
        <GlowText>ORDERS</GlowText>
      </h1>

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : orders.length === 0 ? (
        <div className="bg-card border border-border p-8 text-center">
          <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground font-mono text-sm">No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="bg-card border border-border p-4 flex items-center justify-between">
              <div>
                <h3 className="font-display font-600">{(o as any).ebooks?.title}</h3>
                <p className="font-mono text-xs text-muted-foreground">
                  {(o as any).profiles?.email} · {o.status.toUpperCase()} · {new Date(o.created_at).toLocaleDateString()}
                </p>
              </div>
              <span className="font-display text-lg font-700 text-primary">${(o.amount_paid / 100).toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
