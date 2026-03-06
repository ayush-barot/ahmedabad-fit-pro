import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const getTimeUntilMidnight = () => {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(23, 59, 59, 999);
  const diff = midnight.getTime() - now.getTime();
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
};

const TimeBox = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-secondary/80 border border-primary/30 neon-border flex items-center justify-center">
      <span className="font-display text-2xl sm:text-3xl font-black text-primary text-glow">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="text-xs text-muted-foreground mt-1.5 uppercase tracking-wider">{label}</span>
  </div>
);

const CountdownTimer = () => {
  const [time, setTime] = useState(getTimeUntilMidnight);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeUntilMidnight()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-8 text-center"
    >
      <div className="inline-flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <Clock className="w-4 h-4 text-primary animate-pulse" />
        <span className="font-display font-semibold uppercase tracking-wider">
          Today's Slots Closing In
        </span>
      </div>
      <div className="flex justify-center gap-3 sm:gap-4">
        <TimeBox value={time.hours} label="Hours" />
        <div className="flex items-center text-2xl font-bold text-primary text-glow pb-5">:</div>
        <TimeBox value={time.minutes} label="Minutes" />
        <div className="flex items-center text-2xl font-bold text-primary text-glow pb-5">:</div>
        <TimeBox value={time.seconds} label="Seconds" />
      </div>
    </motion.div>
  );
};

export default CountdownTimer;
