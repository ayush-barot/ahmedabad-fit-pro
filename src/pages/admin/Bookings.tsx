import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  full_name: string;
  mobile: string;
  gender: string;
  area: string;
  preferred_date: string | null;
  preferred_time: string | null;
  plan: string;
  is_free_trial: boolean;
  notes: string | null;
  status: string;
  created_at: string;
}

const STATUS_OPTIONS = ["all", "pending", "confirmed", "completed", "cancelled"];

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const { toast } = useToast();

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
    setBookings(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchBookings(); }, []);

  const areas = useMemo(() => {
    const set = new Set(bookings.map((b) => b.area));
    return ["all", ...Array.from(set).sort()];
  }, [bookings]);

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchSearch = !search || b.full_name.toLowerCase().includes(search.toLowerCase()) || b.mobile.includes(search);
      const matchStatus = statusFilter === "all" || b.status === statusFilter;
      const matchArea = areaFilter === "all" || b.area === areaFilter;
      return matchSearch && matchStatus && matchArea;
    });
  }, [bookings, search, statusFilter, areaFilter]);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from("bookings").update({ status: newStatus }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
    toast({ title: "Status updated" });
  };

  const exportCSV = () => {
    if (filtered.length === 0) return;
    const headers = ["Name", "Mobile", "Gender", "Area", "Plan", "Date", "Time", "Free Trial", "Status", "Notes", "Booked On"];
    const rows = filtered.map((b) => [
      b.full_name, b.mobile, b.gender, b.area, b.plan,
      b.preferred_date || "", b.preferred_time || "",
      b.is_free_trial ? "Yes" : "No", b.status, b.notes || "",
      new Date(b.created_at).toLocaleString("en-IN"),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="font-display text-2xl md:text-3xl font-bold">Bookings</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchBookings} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Button size="sm" onClick={exportCSV} disabled={filtered.length === 0}>
            <Download className="w-4 h-4 mr-1" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="glass">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or mobile..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-background/50"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40 bg-background/50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>{s === "all" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={areaFilter} onValueChange={setAreaFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-background/50">
                <SelectValue placeholder="Area" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((a) => (
                  <SelectItem key={a} value={a}>{a === "all" ? "All Areas" : a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-display text-lg flex items-center gap-2">
            Results <Badge variant="outline">{filtered.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">No bookings found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground text-xs uppercase">
                    <th className="text-left py-3 px-2">Name</th>
                    <th className="text-left py-3 px-2">Mobile</th>
                    <th className="text-left py-3 px-2">Area</th>
                    <th className="text-left py-3 px-2">Plan</th>
                    <th className="text-left py-3 px-2">Date/Time</th>
                    <th className="text-left py-3 px-2">Trial</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-left py-3 px-2">Notes</th>
                    <th className="text-left py-3 px-2">Booked</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => (
                    <tr key={b.id} className="border-b border-border/30 hover:bg-muted/20">
                      <td className="py-3 px-2 font-medium whitespace-nowrap">{b.full_name}</td>
                      <td className="py-3 px-2 whitespace-nowrap">
                        <a href={`tel:${b.mobile}`} className="text-primary hover:underline">{b.mobile}</a>
                      </td>
                      <td className="py-3 px-2 whitespace-nowrap">{b.area}</td>
                      <td className="py-3 px-2 text-xs max-w-[150px] truncate">{b.plan.split("(")[0].trim()}</td>
                      <td className="py-3 px-2 whitespace-nowrap text-xs">
                        {b.preferred_date || "—"} {b.preferred_time || ""}
                      </td>
                      <td className="py-3 px-2">
                        {b.is_free_trial && <Badge className="text-xs bg-primary/20 text-primary border-0">Free</Badge>}
                      </td>
                      <td className="py-3 px-2">
                        <Select value={b.status} onValueChange={(v) => updateStatus(b.id, v)}>
                          <SelectTrigger className="h-7 text-xs w-28 bg-background/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.filter((s) => s !== "all").map((s) => (
                              <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-3 px-2 text-xs text-muted-foreground max-w-[150px] truncate" title={b.notes || ""}>
                        {b.notes || "—"}
                      </td>
                      <td className="py-3 px-2 text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(b.created_at).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Bookings;
