import { Dumbbell, Phone, MessageCircle, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container px-4">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <a href="#" className="font-display text-xl font-bold text-primary">
              FIT<span className="text-foreground">GURU</span>
            </a>
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
              Certified personal trainer in Ahmedabad. Transform your body with expert home training.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold mb-3">Quick Links</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="#about" className="block hover:text-primary transition-colors">About</a>
              <a href="#services" className="block hover:text-primary transition-colors">Services</a>
              <a href="#pricing" className="block hover:text-primary transition-colors">Pricing</a>
              <a href="#booking" className="block hover:text-primary transition-colors">Book Now</a>
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold mb-3">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +91 98765 43210</div>
              <div className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-primary" /> WhatsApp Available</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Ahmedabad, Gujarat</div>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} FitGuru. All rights reserved. | Personal Trainer in Ahmedabad
        </div>
      </div>
    </footer>
  );
};

export default Footer;
