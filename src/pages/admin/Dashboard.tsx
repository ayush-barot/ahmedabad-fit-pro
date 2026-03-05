import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { CalendarDays, PhoneCall, IndianRupee, TrendingUp } from "lucide-react";

interface Booking {
  id: string;
  full_name: string;
  area: string;
  plan: string;
  status: string;
  created_at: string;
  is_free_trial: boolean;
}

const PLAN_REVENUE: Record<string, number> = {
  "Basic Personal Training (₹8,000–₹10,000/mo)": 9000,
  "Premium Transformation (₹15,000/mo)": 15000,
  "Couple Plan (₹20,000/mo)": 20000,
};

const COLORS = [
  "hsl(82, 85%, 55%)",
  "hsl(82, 70%, 40%)",
  "hsl(200, 70%, 50%)",
  "hsl(40, 80%, 55%)",
  "hsl(0, 70%, 55%)",
  "hsl(280, 60%, 55%)",
  "hsl(160, 60%, 45%)",
  "hsl(320, 60%, 55%)",
];

const Dashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [callbackCount, setCallbackCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: bk }, { count }] = await Promise.all([
        supabase.from("bookings").select("*").order("created_at", { ascending: false }),
        supabase.from("callback_requests").select("*", { count: "exact", head: true }),
      ]);
      setBookings(bk || []);
      setCallbackCount(count || 0);
      setLoading(false);
    };
    fetchData();
  }, []);

  const totalBookings = bookings.length;
  const thisMonth = bookings.filter((b) => {
    const d = new Date(b.created_at);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const revenue = bookings
    .filter((b) => !b.is_free_trial)
    .reduce((sum, b) => sum + (PLAN_REVENUE[b.plan] || 0), 0);

  // Area-wise data
  const areaMap: Record<string, number> = {};
  bookings.forEach((b) => {
    areaMap[b.area] = (areaMap[b.area] || 0) + 1;
  });
  const areaData = Object.entries(areaMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Plan-wise data
  const planMap: Record<string, number> = {};
  bookings.forEach((b) => {
    const label = b.plan.split("(")[0].trim();
    planMap[label] = (planMap[label] || 0) + 1;
  });
  const planData = Object.entries(planMap).map(([name, value]) => ({ name, value }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl md:text-3xl font-bold">Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalBookings}</p>
                <p className="text-xs text-muted-foreground">Total Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{thisMonth}</p>
                <p className="text-xs text-muted-foreground">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{revenue.toLocaleString("en-IN")}</p>
                <p className="text-xs text-muted-foreground">Est. Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <PhoneCall className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{callbackCount}</p>
                <p className="text-xs text-muted-foreground">Callback Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="font-display text-lg">Bookings by Area</CardTitle>
          </CardHeader>
          <CardContent>
            {areaData.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">No bookings yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={areaData}>
                  <XAxis dataKey="name" tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 11 }} angle={-30} textAnchor="end" height={80} />
                  <YAxis tick={{ fill: "hsl(220, 10%, 55%)", fontSize: 12 }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "hsl(220, 18%, 8%)", border: "1px solid hsl(220, 15%, 16%)", borderRadius: "8px", color: "#fff" }}
                  />
                  <Bar dataKey="count" fill="hsl(82, 85%, 55%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="font-display text-lg">Plan Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {planData.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">No bookings yet</p>
            ) : (
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={planData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                      {planData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(220, 18%, 8%)", border: "1px solid hsl(220, 15%, 16%)", borderRadius: "8px", color: "#fff" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent bookings */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-display text-lg">Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">No bookings yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left py-3 px-2">Name</th>
                    <th className="text-left py-3 px-2">Area</th>
                    <th className="text-left py-3 px-2">Plan</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-left py-3 px-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.slice(0, 10).map((b) => (
                    <tr key={b.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-3 px-2 font-medium">{b.full_name}</td>
                      <td className="py-3 px-2">{b.area}</td>
                      <td className="py-3 px-2 text-xs">{b.plan.split("(")[0].trim()}</td>
                      <td className="py-3 px-2">
                        <Badge variant={b.status === "confirmed" ? "default" : "outline"} className="text-xs">
                          {b.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground">{new Date(b.created_at).toLocaleDateString("en-IN")}</td>
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

export default Dashboard;
