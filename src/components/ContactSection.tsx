import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const [callbackName, setCallbackName] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName.trim() || !callbackPhone.trim()) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("callback_requests").insert({
        name: callbackName.trim(),
        phone: callbackPhone.trim(),
      });
      if (error) throw error;
      toast({ title: "Callback Requested!", description: "We'll call you back within 30 minutes." });
      setCallbackName("");
      setCallbackPhone("");
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-secondary/20">
      <div className="container px-4">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 border-primary/40 text-primary">Contact</Badge>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Not Sure Yet? <span className="text-primary">Talk to Me First</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            No pressure. Just a friendly conversation about your fitness goals.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="glass border-border/50 hover:neon-border transition-all text-center h-full">
              <CardContent className="p-6">
                <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-display font-bold mb-2">Call Now</h3>
                <p className="text-muted-foreground text-xs mb-4">Speak directly with the trainer</p>
                <Button size="sm" variant="outline" className="border-primary/30" asChild>
                  <a href="tel:+919725173135">Call Now</a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Card className="glass border-border/50 hover:neon-border transition-all text-center h-full">
              <CardContent className="p-6">
                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-display font-bold mb-2">WhatsApp</h3>
                <p className="text-muted-foreground text-xs mb-4">Chat on WhatsApp anytime</p>
                <Button size="sm" variant="outline" className="border-primary/30" asChild>
                  <a href="https://wa.me/919876543210?text=Hi%2C%20I%27m%20interested%20in%20personal%20training" target="_blank" rel="noopener noreferrer">Chat Now</a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Card className="glass border-border/50 hover:neon-border transition-all text-center h-full">
              <CardContent className="p-6">
                <PhoneCall className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-display font-bold mb-2">Request Callback</h3>
                <p className="text-muted-foreground text-xs mb-4">We'll call you back</p>
                <form onSubmit={handleCallback} className="space-y-2">
                  <Input
                    placeholder="Your Name"
                    value={callbackName}
                    onChange={(e) => setCallbackName(e.target.value)}
                    className="h-8 text-xs bg-background/50"
                  />
                  <Input
                    placeholder="Phone Number"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    className="h-8 text-xs bg-background/50"
                  />
                  <Button size="sm" type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Card className="glass border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 text-center">
                <h3 className="font-display font-bold text-lg mb-1">📍 Service Areas in Ahmedabad</h3>
                <p className="text-muted-foreground text-xs">We cover Satellite, Prahladnagar, Bodakdev, Thaltej, Vastrapur & more</p>
              </div>
              <iframe
                title="Ahmedabad Service Areas"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117176.05657095498!2d72.50669818476089!3d23.02049635498498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
