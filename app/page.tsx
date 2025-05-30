import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features";
import FAQsSection from "@/components/home/faqs";
import FooterSection from "@/components/home/footer";
import CallToAction from "@/components/home/call-to-action";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <FAQsSection />
      <CallToAction />
      <FooterSection />
    </>
  );
}
