import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Gift, User, Phone, Copy, Check, Share2 } from "lucide-react";

const generateCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "FIT-";
  for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
};

const ReferralSection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\s/g, ""))) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    const code = generateCode();
    const { error } = await supabase.from("referrals" as any).insert({
      referrer_name: name.trim(),
      referrer_phone: phone.trim(),
      referral_code: code,
    } as any);
    setLoading(false);

    if (error) {
      toast.error("Something went wrong. Please try again.");
    } else {
      setReferralCode(code);
      toast.success("Referral code generated! Share it with friends 🎉");
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast.success("Code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareCode = () => {
    const text = `🏋️ Get a FREE personal training session in Ahmedabad! Use my referral code: ${referralCode}\n\nBook here: ${window.location.origin}#booking`;
    if (navigator.share) {
      navigator.share({ title: "Free Fitness Session", text });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  return (
    <section id="referral" className="py-20 md:py-28">
      <div className="container px-4">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 border-primary/40 text-primary">
            <Gift className="w-3 h-3 mr-1" /> Referral Program
          </Badge>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Refer a Friend, Get <span className="text-primary">1 Free Session</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Share your unique code with friends. When they book, you both get a free session!
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <Card className="glass border-border/50">
            <CardContent className="p-6">
              {!referralCode ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ref-name">Your Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="ref-name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 bg-secondary/50 border-border"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ref-phone">Mobile Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="ref-phone"
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 bg-secondary/50 border-border"
                        maxLength={10}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full neon-glow font-semibold" size="lg" disabled={loading}>
                    {loading ? "Generating..." : "Get My Referral Code"}
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <Gift className="w-12 h-12 text-primary mx-auto" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Your Referral Code</p>
                    <div className="bg-secondary/50 rounded-xl p-4 font-display text-2xl font-bold tracking-wider text-primary">
                      {referralCode}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={copyCode} variant="outline" className="flex-1 border-primary/30">
                      {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                    <Button onClick={shareCode} className="flex-1 neon-glow">
                      <Share2 className="w-4 h-4 mr-2" /> Share
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Share this code with friends. When they book using your code, you both get a free session!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ReferralSection;
