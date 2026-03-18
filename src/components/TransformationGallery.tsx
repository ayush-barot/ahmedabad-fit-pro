import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingDown, TrendingUp, Dumbbell } from "lucide-react";

const transformations = [
  {
    name: "Priya S.",
    area: "Satellite",
    duration: "3 Months",
    type: "Weight Loss",
    beforeWeight: "82 kg",
    afterWeight: "70 kg",
    icon: TrendingDown,
    color: "text-green-400",
    quote: "Never thought home training could change my life this much!",
  },
  {
    name: "Rahul M.",
    area: "Prahladnagar",
    duration: "4 Months",
    type: "Muscle Gain",
    beforeWeight: "58 kg",
    afterWeight: "72 kg",
    icon: TrendingUp,
    color: "text-blue-400",
    quote: "From skinny to strong — all from the comfort of my home.",
  },
  {
    name: "Anjali D.",
    area: "Bodakdev",
    duration: "2 Months",
    type: "Fat Loss",
    beforeWeight: "75 kg",
    afterWeight: "66 kg",
    icon: TrendingDown,
    color: "text-primary",
    quote: "As a working mom, home training was a game changer for me.",
  },
  {
    name: "Karan & Neha P.",
    area: "Thaltej",
    duration: "5 Months",
    type: "Couple Fitness",
    beforeWeight: "Combined 170 kg",
    afterWeight: "Combined 145 kg",
    icon: Dumbbell,
    color: "text-yellow-400",
    quote: "Training together made us fitter and closer as a couple.",
  },
];

const TransformationGallery = () => {
  return (
    <section id="transformations" className="py-20 md:py-28 bg-secondary/20">
      <div className="container px-4">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 border-primary/40 text-primary">
            Results
          </Badge>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Real Client <span className="text-primary">Transformations</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Verified results from clients across Ahmedabad — your transformation could be next
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {transformations.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="glass border-border/50 h-full overflow-hidden group hover:border-primary/30 transition-colors">
                <CardContent className="p-0">
                  {/* Before / After comparison */}
                  <div className="grid grid-cols-2">
                    <div className="bg-muted/50 p-6 text-center border-r border-border/30">
                      <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Before</span>
                      <div className="mt-3 w-16 h-16 mx-auto rounded-full bg-destructive/20 flex items-center justify-center">
                        <span className="text-destructive font-display font-bold text-sm">{t.beforeWeight}</span>
                      </div>
                    </div>
                    <div className="bg-primary/5 p-6 text-center">
                      <span className="text-xs uppercase tracking-wider text-primary font-medium">After</span>
                      <div className="mt-3 w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-display font-bold text-sm">{t.afterWeight}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <t.icon className={`w-4 h-4 ${t.color}`} />
                      <Badge variant="secondary" className="text-xs">{t.type}</Badge>
                      <span className="text-xs text-muted-foreground ml-auto">{t.duration}</span>
                    </div>

                    <p className="text-muted-foreground text-sm italic mb-3">"{t.quote}"</p>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-display font-semibold text-sm">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.area}, Ahmedabad</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="#booking"
            className="inline-flex items-center gap-2 text-primary hover:underline font-display font-semibold"
          >
            Start Your Transformation <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TransformationGallery;
