import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  { q: "Do you provide training at home?", a: "Yes! All training sessions are conducted at your home in Ahmedabad. I bring all necessary equipment for a complete workout experience." },
  { q: "Which areas in Ahmedabad do you cover?", a: "I cover Satellite, Prahladnagar, Bodakdev, Thaltej, Navrangpura, Vastrapur, Maninagar, Chandkheda, Gota, Nikol, and other areas within Ahmedabad city." },
  { q: "Who is eligible for the free trial?", a: "The first-day free trial is exclusively available for Ladies and Husband-Wife Couples. No prior commitment required!" },
  { q: "What certifications do you hold?", a: "I am an ACE (American Council on Exercise) certified personal trainer with additional certifications in nutrition and sports science." },
  { q: "Can I change my plan later?", a: "Absolutely! You can upgrade or change your plan at any time. We'll adjust your training schedule accordingly." },
  { q: "What if I need to reschedule a session?", a: "You can reschedule any session with at least 4 hours advance notice through WhatsApp. Flexibility is key to maintaining consistency!" },
  { q: "Do you provide diet plans?", a: "Diet guidance is included in Premium and Couple plans. Basic plan clients can add diet consultation for an additional fee." },
  { q: "How quickly will I see results?", a: "Most clients see noticeable changes within 4-6 weeks with consistent training and proper nutrition. Individual results vary based on commitment." },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="container px-4">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4 border-primary/40 text-primary">FAQ</Badge>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="glass rounded-xl border-border/50 px-5">
                <AccordionTrigger className="text-left font-display font-semibold text-sm md:text-base hover:no-underline hover:text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
