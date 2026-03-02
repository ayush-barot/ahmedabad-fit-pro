import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Users, Target } from "lucide-react";

const stats = [
  { icon: Shield, label: "ACE Certified", value: "Internationally" },
  { icon: Award, label: "Experience", value: "8+ Years" },
  { icon: Users, label: "Clients Trained", value: "500+" },
  { icon: Target, label: "Success Rate", value: "95%" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-secondary to-muted neon-border flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <Dumbbell className="w-20 h-20 text-primary mx-auto mb-4 opacity-40" />
                <p className="text-muted-foreground text-sm">Trainer Photo</p>
              </div>
            </div>
            <Badge className="absolute -bottom-3 -right-3 px-4 py-2 text-sm neon-glow">
              <Shield className="w-4 h-4 mr-1" /> Certified Trainer
            </Badge>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 border-primary/40 text-primary">About Your Trainer</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Your Fitness Journey Starts with the <span className="text-primary">Right Trainer</span>
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              With over 8 years of professional experience and internationally recognized certifications, 
              I specialize in personalized home training programs designed for your unique body type and goals.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Whether you're looking for weight loss, muscle building, or overall fitness improvement, 
              my science-backed approach ensures real, lasting results. Based in Ahmedabad, I bring 
              the gym experience to your doorstep.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-4 text-center">
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="font-display font-bold text-lg">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Need Dumbbell import for the placeholder
import { Dumbbell } from "lucide-react";

export default AboutSection;
