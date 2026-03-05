import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CallbackRequest {
  id: string;
  name: string;
  phone: string;
  status: string;
  created_at: string;
}

const STATUS_OPTIONS = ["pending", "contacted", "completed", "cancelled"];

const Callbacks = () => {
  const [callbacks, setCallbacks] = useState<CallbackRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCallbacks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("callback_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    setCallbacks(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchCallbacks(); }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from("callback_requests").update({ status: newStatus }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    setCallbacks((prev) => prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
    toast({ title: "Status updated" });
  };

  const statusColor = (s: string) => {
    switch (s) {
      case "pending": return "bg-yellow-500/20 text-yellow-400 border-0";
      case "contacted": return "bg-blue-500/20 text-blue-400 border-0";
      case "completed": return "bg-primary/20 text-primary border-0";
      case "cancelled": return "bg-destructive/20 text-destructive border-0";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl md:text-3xl font-bold">Callback Requests</h1>
        <Button variant="outline" size="sm" onClick={fetchCallbacks} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} /> Refresh
        </Button>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-display text-lg flex items-center gap-2">
            All Requests <Badge variant="outline">{callbacks.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          ) : callbacks.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">No callback requests yet</p>
          ) : (
            <div className="space-y-3">
              {callbacks.map((c) => (
                <div key={c.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border/30">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{c.name}</p>
                    <a href={`tel:${c.phone}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {c.phone}
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(c.created_at).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs ${statusColor(c.status)}`}>
                      {c.status}
                    </Badge>
                    <Select value={c.status} onValueChange={(v) => updateStatus(c.id, v)}>
                      <SelectTrigger className="h-8 text-xs w-32 bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((s) => (
                          <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Callbacks;
