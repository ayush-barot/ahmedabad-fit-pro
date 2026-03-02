import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const areas = [
  "Satellite", "Prahladnagar", "Bodakdev", "Thaltej", "Navrangpura",
  "Vastrapur", "Maninagar", "Chandkheda", "Gota", "Nikol", "Other (Ahmedabad only)",
];

const planOptions = [
  "Basic Personal Training (₹8,000–₹10,000/mo)",
  "Premium Transformation (₹15,000/mo)",
  "Couple Plan (₹20,000/mo)",
];

const BookingSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    full_name: "",
    mobile: "",
    gender: "",
    area: "",
    preferred_date: "",
    preferred_time: "",
    plan: "",
    is_free_trial: false,
    notes: "",
  });

  const updateField = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.mobile || !form.gender || !form.area || !form.plan) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("bookings").insert({
        full_name: form.full_name.trim(),
        mobile: form.mobile.trim(),
        gender: form.gender,
        area: form.area,
        preferred_date: form.preferred_date || null,
        preferred_time: form.preferred_time || null,
        plan: form.plan,
        is_free_trial: form.is_free_trial,
        notes: form.notes.trim() || null,
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      toast({ title: "Booking failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="booking" className="py-20 md:py-28">
        <div className="container px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto text-center">
            <Card className="glass neon-border">
              <CardContent className="p-10">
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="font-display text-3xl font-bold mb-3">Booking Confirmed! 🎉</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you, <strong className="text-foreground">{form.full_name}</strong>! We'll contact you shortly to confirm your session.
                </p>
                <Button onClick={() => { setSubmitted(false); setForm({ full_name: "", mobile: "", gender: "", area: "", preferred_date: "", preferred_time: "", plan: "", is_free_trial: false, notes: "" }); }}>
                  Book Another Session
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 md:py-28">
      <div className="container px-4">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 border-primary/40 text-primary">Book Now</Badge>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Start Your <span className="text-primary">Transformation</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Fill in the form below and we'll get back to you within 30 minutes
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto">
          <Card className="glass neon-border">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <AlertTriangle className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-xs text-muted-foreground">Currently available only in <strong className="text-foreground">Ahmedabad</strong></p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input id="full_name" placeholder="Your full name" value={form.full_name} onChange={(e) => updateField("full_name", e.target.value)} className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number *</Label>
                    <Input id="mobile" placeholder="+91 98765 43210" value={form.mobile} onChange={(e) => updateField("mobile", e.target.value)} className="bg-background/50" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Gender *</Label>
                    <Select value={form.gender} onValueChange={(v) => updateField("gender", v)}>
                      <SelectTrigger className="bg-background/50"><SelectValue placeholder="Select gender" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Area in Ahmedabad *</Label>
                    <Select value={form.area} onValueChange={(v) => updateField("area", v)}>
                      <SelectTrigger className="bg-background/50"><SelectValue placeholder="Select area" /></SelectTrigger>
                      <SelectContent>
                        {areas.map((a) => (
                          <SelectItem key={a} value={a}>{a}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input id="date" type="date" value={form.preferred_date} onChange={(e) => updateField("preferred_date", e.target.value)} className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time</Label>
                    <Input id="time" type="time" value={form.preferred_time} onChange={(e) => updateField("preferred_time", e.target.value)} className="bg-background/50" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Select Plan *</Label>
                  <Select value={form.plan} onValueChange={(v) => updateField("plan", v)}>
                    <SelectTrigger className="bg-background/50"><SelectValue placeholder="Choose a plan" /></SelectTrigger>
                    <SelectContent>
                      {planOptions.map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="free_trial"
                    checked={form.is_free_trial}
                    onCheckedChange={(checked) => updateField("is_free_trial", !!checked)}
                  />
                  <Label htmlFor="free_trial" className="text-sm text-muted-foreground cursor-pointer">
                    🎁 I am eligible for Free Trial (Ladies / Husband-Wife Couples only)
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" placeholder="Any specific goals, medical conditions, or preferences..." value={form.notes} onChange={(e) => updateField("notes", e.target.value)} className="bg-background/50" rows={3} />
                </div>

                <Button type="submit" size="lg" className="w-full neon-glow text-lg font-semibold" disabled={loading}>
                  <CalendarDays className="w-5 h-5 mr-2" />
                  {loading ? "Booking..." : "Book My Session"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
