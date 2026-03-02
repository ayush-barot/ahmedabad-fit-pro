import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma", area: "Satellite", quote: "Lost 12 kgs in 3 months! The home training convenience made it so easy to stay consistent. Best decision I ever made.", rating: 5 },
  { name: "Rahul & Meena Patel", area: "Prahladnagar", quote: "As a couple, working out together has been amazing. Our trainer is professional, punctual, and really knows his craft.", rating: 5 },
  { name: "Anjali Desai", area: "Bodakdev", quote: "As a working woman, I was hesitant about gym training. Home personal training gave me the privacy and comfort I needed.", rating: 5 },
  { name: "Karan Mehta", area: "Thaltej", quote: "Gained 8 kgs of lean muscle in 4 months. The diet plan combined with training was a game changer.", rating: 5 },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-secondary/20">
      <div className="container px-4">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 border-primary/40 text-primary">Testimonials</Badge>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Real <span className="text-primary">Transformations</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Hear from clients across Ahmedabad who transformed their lives
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="glass border-border/50 h-full">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-primary/30 mb-3" />
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">"{t.quote}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.area}, Ahmedabad</div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
