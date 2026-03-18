import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ArrowRight, Dumbbell, Apple, Moon, Heart } from "lucide-react";

const articles = [
  {
    icon: Dumbbell,
    title: "Best Home Exercises for Weight Loss in Ahmedabad's Heat",
    summary: "Effective indoor workout routines that don't require AC or heavy equipment. Perfect for Ahmedabad summers.",
    readTime: "5 min",
    tag: "Weight Loss",
  },
  {
    icon: Apple,
    title: "Gujarati Diet Plan for Muscle Building",
    summary: "How to build muscle with dal-rice, rotla, and local Gujarati foods. No expensive supplements needed.",
    readTime: "4 min",
    tag: "Nutrition",
  },
  {
    icon: Moon,
    title: "Why Sleep is Your Secret Weapon for Fat Loss",
    summary: "How 7-8 hours of quality sleep can accelerate your weight loss journey more than extra workouts.",
    readTime: "3 min",
    tag: "Recovery",
  },
  {
    icon: Heart,
    title: "Couple Workout Ideas for Busy Professionals",
    summary: "15-minute partner exercises that strengthen your body and your relationship. No gym needed.",
    readTime: "4 min",
    tag: "Couple Fitness",
  },
];

const BlogTipsSection = () => {
  return (
    <section id="tips" className="py-20 md:py-28">
      <div className="container px-4">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 border-primary/40 text-primary">
            <BookOpen className="w-3 h-3 mr-1" /> Fitness Tips
          </Badge>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Expert <span className="text-primary">Fitness Tips</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Science-backed fitness advice tailored for Ahmedabad lifestyle
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {articles.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="glass border-border/50 h-full group hover:border-primary/30 transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <article.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      <Badge variant="secondary" className="text-xs">{article.tag}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {article.readTime}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-base mb-2 group-hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {article.summary}
                  </p>

                  <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
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
          <Button variant="outline" className="border-primary/30 hover:bg-primary/10" asChild>
            <a href="#booking">
              <Dumbbell className="w-4 h-4 mr-2" />
              Get Personalized Advice — Book Free Trial
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogTipsSection;
