import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
const HeroSection = () => {
  const scrollToSolutions = () => {
    const element = document.getElementById("solucoes");
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section className="relative bg-gradient-hero py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("/lovable-uploads/94c865d9-9342-4c56-a587-6b5e7ab8b170.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} />
      </div>
      
      {/* Additional overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black/80 via-brand-black/70 to-brand-black/60"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          

          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold text-brand-white mb-6 leading-tight">
            Soluções para acelerar sua{" "}
            <span className="text-brand-gold">visibilidade digital</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Oferecemos soluções de marketing digital para crescimento orgânico, 
            leve e sustentável. Personalizados para cada tipo de negócio.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={scrollToSolutions} className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-semibold px-8 py-3 rounded-lg shadow-gold transition-smooth group">
              Conheça Nossas Soluções
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" onClick={() => window.open("https://wa.me/5511964721143?text=Vim do site e gostaria de algumas informações.", "_blank")} className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-smooth px-8 py-3">
              Falar com Especialista
            </Button>
          </div>

          {/* Trust Indicators */}
          
        </div>
      </div>
    </section>;
};
export default HeroSection;