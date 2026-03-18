import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScarcityBadge from "@/components/ScarcityBadge";
import CountdownTimer from "@/components/CountdownTimer";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TransformationGallery from "@/components/TransformationGallery";
import BMICalculator from "@/components/BMICalculator";
import BlogTipsSection from "@/components/BlogTipsSection";
import FAQSection from "@/components/FAQSection";
import ReferralSection from "@/components/ReferralSection";
import ContactSection from "@/components/ContactSection";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import WhatsAppButton from "@/components/WhatsAppButton";

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
      <TransformationGallery />
      <BMICalculator />
      <BlogTipsSection />
      <FAQSection />
      <ReferralSection />
      <ContactSection />
      <BookingSection />
      <Footer />
      <StickyCTA />
      <WhatsAppButton />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
