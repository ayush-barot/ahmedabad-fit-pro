import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator, TrendingUp, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type BMICategory = "underweight" | "normal" | "overweight" | "obese";

const categoryConfig: Record<BMICategory, { label: string; color: string; advice: string }> = {
  underweight: {
    label: "Underweight",
    color: "text-blue-400",
    advice: "You need a muscle-building diet + strength training program. A personal trainer can help you gain healthy weight with proper nutrition guidance.",
  },
  normal: {
    label: "Normal Weight",
    color: "text-green-400",
    advice: "Great shape! Maintain it with consistent workouts. A personal trainer can help you build muscle definition and improve athletic performance.",
  },
  overweight: {
    label: "Overweight",
    color: "text-yellow-400",
    advice: "A structured fat-loss program with cardio + strength training will transform your body. Personal training ensures you follow the right plan safely.",
  },
  obese: {
    label: "Obese",
    color: "text-red-400",
    advice: "Your health is the priority. A certified trainer will create a safe, gradual weight-loss plan with diet guidance to help you achieve lasting results.",
  },
};

const getCategory = (bmi: number): BMICategory => {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
};

const BMICalculator = () => {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{ bmi: number; category: BMICategory } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h || w <= 0 || h <= 0) return;

    let bmi: number;
    if (unit === "metric") {
      const hm = h / 100;
      bmi = w / (hm * hm);
    } else {
      bmi = (w / (h * h)) * 703;
    }
    bmi = Math.round(bmi * 10) / 10;
    setResult({ bmi, category: getCategory(bmi) });
  };

  const reset = () => {
    setWeight("");
    setHeight("");
    setResult(null);
  };

  const config = result ? categoryConfig[result.category] : null;

  return (
    <section id="bmi" className="py-20 bg-background">
      <div className="container px-4 max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" /> Free Tool
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            BMI <span className="text-primary">Calculator</span>
          </h2>
          <p className="text-muted-foreground mt-2">Check your Body Mass Index & get a personalized fitness recommendation</p>
        </div>

        <Card className="border-primary/20 bg-card/80 backdrop-blur">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Enter Your Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={unit}
              onValueChange={(v) => { setUnit(v as "metric" | "imperial"); reset(); }}
              className="flex gap-6"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="metric" id="metric" />
                <Label htmlFor="metric">Metric (kg / cm)</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="imperial" id="imperial" />
                <Label htmlFor="imperial">Imperial (lbs / in)</Label>
              </div>
            </RadioGroup>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Weight ({unit === "metric" ? "kg" : "lbs"})</Label>
                <Input
                  type="number"
                  placeholder={unit === "metric" ? "e.g. 70" : "e.g. 154"}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  min="1"
                  max="500"
                />
              </div>
              <div className="space-y-2">
                <Label>Height ({unit === "metric" ? "cm" : "inches"})</Label>
                <Input
                  type="number"
                  placeholder={unit === "metric" ? "e.g. 170" : "e.g. 67"}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  min="1"
                  max="300"
                />
              </div>
            </div>

            <Button onClick={calculate} className="w-full" size="lg">
              Calculate BMI
            </Button>

            <AnimatePresence mode="wait">
              {result && config && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-xl border border-primary/20 bg-background/60 p-6 space-y-4"
                >
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm">Your BMI</p>
                    <p className="text-5xl font-display font-bold text-primary">{result.bmi}</p>
                    <p className={`text-lg font-semibold mt-1 ${config.color}`}>{config.label}</p>
                  </div>

                  <div className="relative h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className="absolute h-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-500 rounded-full"
                      style={{ width: "100%" }}
                    />
                    <motion.div
                      initial={{ left: "0%" }}
                      animate={{ left: `${Math.min(Math.max(((result.bmi - 10) / 35) * 100, 2), 98)}%` }}
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-primary shadow-lg"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">{config.advice}</p>

                  <Button asChild className="w-full gap-2" size="lg">
                    <a href="#booking">
                      Book Free Consultation <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BMICalculator;
