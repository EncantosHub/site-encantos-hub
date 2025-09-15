import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import SolutionsSection from "@/components/home/SolutionsSection";
import ToolsSection from "@/components/home/ToolsSection";
import TeamSection from "@/components/home/TeamSection";
import DifferentialsSection from "@/components/home/DifferentialsSection";
import CompaniesSection from "@/components/home/CompaniesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogPreviewSection from "@/components/home/BlogPreviewSection";
import ContactSection from "@/components/home/ContactSection";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Consultoria de Marketing Digital e SEO | Encantos Hub",
    description: "Descubra como nossa consultoria de marketing digital pode impulsionar sua presença online. Serviços especializados em SEO, conteúdo e mais.",
    canonical: "https://www.encantoshub.com.br/",
    ogImage: "https://www.encantoshub.com.br/lovable-uploads/50eafc97-7976-48cf-86d3-511cd2eb5e68.png"
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <SolutionsSection />
        <ToolsSection />
        <TeamSection />
        <DifferentialsSection />
        <CompaniesSection />
        <TestimonialsSection />
        <BlogPreviewSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
