import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Flame, Dumbbell, Heart, Zap, Users, Sparkles } from "lucide-react";

const services = [
  { icon: Flame, title: "Weight Loss", desc: "Customized fat-burning programs with diet guidance to help you shed those extra kilos effectively." },
  { icon: Dumbbell, title: "Muscle Gain", desc: "Progressive strength training to build lean muscle mass and sculpt your ideal physique." },
  { icon: Zap, title: "Fat Loss", desc: "High-intensity training combined with nutritional strategies for maximum fat loss." },
  { icon: Heart, title: "Strength Training", desc: "Build functional strength and improve daily performance with expert-guided resistance training." },
  { icon: Users, title: "Couple Fitness", desc: "Train together, grow together. Special programs designed for husband-wife couples." },
  { icon: Sparkles, title: "Ladies Special", desc: "Comfortable, private home training designed specifically for women's fitness goals." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-secondary/20">
      <div className="container px-4">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 border-primary/40 text-primary">Our Services</Badge>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Training Programs <span className="text-primary">For Everyone</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Customized fitness solutions delivered at your home in Ahmedabad
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="glass border-border/50 hover:neon-border transition-all duration-300 group h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <svc.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{svc.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{svc.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
