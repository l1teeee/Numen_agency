import { Navbar } from "@/components/blocks/navbar";
import { HeroSection } from "@/components/blocks/hero-section";
import { StickyStack } from "@/components/blocks/sticky-stack";
import {
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
      <StickyStack />
      <TestimonialsSection />
      <TechStackSection />
      <ProcessSection />
      <ContactFormSection />
      <ChatBubble />
    </div>
  );
}
