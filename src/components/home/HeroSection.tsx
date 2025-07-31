import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  const scrollToSolutions = () => {
    const element = document.getElementById("solucoes");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-hero py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-brand-gold/10 text-brand-gold px-4 py-2 rounded-full mb-8 border border-brand-gold/20">
            <Sparkles size={16} />
            <span className="text-sm font-medium">Consultoria Especializada</span>
          </div>

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
            <Button 
              onClick={scrollToSolutions}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-semibold px-8 py-3 rounded-lg shadow-gold transition-smooth group"
            >
              Conheça Nossas Soluções
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open("https://wa.me/5511964721143?text=Vim do site e gostaria de algumas informações.", "_blank")}
              className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-smooth px-8 py-3"
            >
              Falar com Especialista
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm mb-4">Empresas que confiam em nosso trabalho</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['Casas Bahia', 'Banco PAN', 'Net Claro', 'Insper', 'Eucatex'].map((company) => (
                <span key={company} className="text-gray-300 text-sm font-medium">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;