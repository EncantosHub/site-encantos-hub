import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative bg-brand-black py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("/lovable-uploads/f080db56-f2da-46b1-8475-f9e86ca135b9.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }} />
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-brand-black/60"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold text-brand-white mb-6 leading-tight">
            <span className="text-brand-gold">Encantos</span>Hub
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Onde estratégia, presença digital e impacto se encontram.
          </p>
          
          {/* Divider */}
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button onClick={() => window.open("https://wa.me/5511964721143?text=Vim do site e gostaria de algumas informações.", "_blank")} className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-semibold px-12 py-4 rounded-full text-lg shadow-gold transition-smooth">
              Fale com especialistas
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;