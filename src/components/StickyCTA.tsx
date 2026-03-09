import { Button } from "@/components/ui/button";
import { Phone, CalendarDays } from "lucide-react";

const StickyCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t border-primary/20 p-3">
      <div className="flex gap-3">
        <Button size="sm" variant="outline" className="flex-1 border-primary/30" asChild>
          <a href="tel:+919725173135">
            <Phone className="w-4 h-4 mr-1" /> Call
          </a>
        </Button>
        <Button size="sm" className="flex-1 neon-glow" asChild>
          <a href="#booking">
            <CalendarDays className="w-4 h-4 mr-1" /> Book Now
          </a>
        </Button>
      </div>
    </div>
  );
};

export default StickyCTA;
