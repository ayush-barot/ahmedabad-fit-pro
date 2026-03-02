import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Gift, Star } from "lucide-react";

const plans = [
  {
    name: "Basic Personal Training",
    price: "₹8,000 – ₹10,000",
    period: "/month",
    features: ["12 sessions per month", "Home training", "Customized workout plan", "Progress tracking", "WhatsApp support"],
    popular: false,
    freeTrial: false,
  },
  {
    name: "Premium Transformation",
    price: "₹15,000",
    period: "/month",
    features: ["20 sessions per month", "Home training", "Diet guidance included", "Body composition analysis", "24/7 WhatsApp support", "Monthly progress report"],
    popular: true,
    freeTrial: false,
  },
  {
    name: "Couple Plan",
    price: "₹20,000",
    period: "/month",
    features: ["24 sessions per month", "Husband & Wife together", "Dual customized plans", "Diet guidance for both", "Partner motivation system", "Priority scheduling"],
    popular: false,
    freeTrial: true,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container px-4">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 border-primary/40 text-primary">Pricing</Badge>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Invest in Your <span className="text-primary">Health</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Transparent pricing. No hidden fees. Real results guaranteed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="neon-glow px-4 py-1">
                    <Star className="w-3 h-3 mr-1" /> Most Popular
                  </Badge>
                </div>
              )}
              {plan.freeTrial && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Gift className="w-3 h-3 mr-1" /> Free Trial Available
                  </Badge>
                </div>
              )}
              <Card className={`glass h-full ${plan.popular ? "neon-border border-primary/40" : "border-border/50"}`}>
                <CardHeader className="text-center pt-8">
                  <CardTitle className="font-display text-lg font-semibold text-muted-foreground">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="font-display text-3xl md:text-4xl font-black text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 pb-8">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular ? "neon-glow" : ""}`} variant={plan.popular ? "default" : "outline"} asChild>
                    <a href="#booking">Get Started</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Free trial banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="glass rounded-2xl p-6 md:p-8 text-center neon-border">
            <Gift className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold mb-2">
              🎁 First Day <span className="text-primary">FREE Trial</span>
            </h3>
            <p className="text-muted-foreground mb-4">
              Available exclusively for <strong className="text-foreground">Ladies</strong> and <strong className="text-foreground">Husband-Wife Couples</strong>. 
              No commitments, just results.
            </p>
            <Button size="lg" className="neon-glow" asChild>
              <a href="#booking">Claim Your Free Trial</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
