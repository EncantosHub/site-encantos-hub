import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import SolutionsSection from "@/components/home/SolutionsSection";
import TeamSection from "@/components/home/TeamSection";
import DifferentialsSection from "@/components/home/DifferentialsSection";
import CompaniesSection from "@/components/home/CompaniesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogPreviewSection from "@/components/home/BlogPreviewSection";
import ContactSection from "@/components/home/ContactSection";

const Index = () => {
  useEffect(() => {
    document.title = "Consultoria de Marketing Digital e SEO | Encantos Hub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Descubra como nossa consultoria de marketing digital pode impulsionar sua presença online. Serviços especializados em SEO, conteúdo e mais.');
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <SolutionsSection />
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
