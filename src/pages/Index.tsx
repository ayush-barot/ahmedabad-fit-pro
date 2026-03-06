import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScarcityBadge from "@/components/ScarcityBadge";
import CountdownTimer from "@/components/CountdownTimer";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import ExitIntentPopup from "@/components/ExitIntentPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ScarcityBadge />
      <CountdownTimer />
      <AboutSection />
      <ServicesSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <BookingSection />
      <Footer />
      <StickyCTA />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
