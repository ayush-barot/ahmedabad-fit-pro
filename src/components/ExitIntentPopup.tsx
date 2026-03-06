import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Gift, Phone, User } from "lucide-react";

const STORAGE_KEY = "fitguru_exit_popup_shown";

const ExitIntentPopup = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && !sessionStorage.getItem(STORAGE_KEY)) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

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
    const { error } = await supabase.from("callback_requests").insert({
      name: name.trim(),
      phone: phone.trim(),
    });
    setLoading(false);

    if (error) {
      toast.error("Something went wrong. Please try again.");
    } else {
      toast.success("We'll call you back soon! 🎉");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="glass border-primary/30 sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
            <Gift className="w-7 h-7 text-primary" />
          </div>
          <DialogTitle className="font-display text-2xl text-glow">
            Wait! Free Consultation 🎁
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Get a FREE body assessment & personalized fitness plan. No commitment needed!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="exit-name">Your Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="exit-name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 bg-secondary/50 border-border"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="exit-phone">Mobile Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="exit-phone"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10 bg-secondary/50 border-border"
                maxLength={10}
              />
            </div>
          </div>
          <Button type="submit" className="w-full neon-glow text-lg font-semibold" size="lg" disabled={loading}>
            {loading ? "Submitting..." : "Get Free Consultation"}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            100% free. No spam. We respect your privacy.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
