import { Navbar } from "@/components/blocks/navbar";
import { HeroSection } from "@/components/blocks/hero-section";
import {
  ServicesSection,
  ProjectsSection,
  AboutSection,
  TestimonialsSection,
  TechStackSection,
  ProcessSection,
  ContactFormSection,
} from "@/components/blocks/sections";
import { ChatBubble } from "@/components/ui/chat-bubble";

export default function Home() {
  return (
    <div className="bg-black">
      <Navbar />
      <HeroSection />

      {/* Sticky stack — wrapper height = n sections × 100vh so they can un-stick */}
      <div style={{ height: "300vh" }}>
        <ServicesSection />
        <ProjectsSection />
        <AboutSection />
      </div>

      <TestimonialsSection />
      <TechStackSection />
      <ProcessSection />
      <ContactFormSection />
      <ChatBubble />
    </div>
  );
}
