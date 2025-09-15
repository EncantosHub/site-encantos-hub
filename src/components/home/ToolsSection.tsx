import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wrench, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ToolsSection = () => {
  const navigate = useNavigate();
  
  const tools = [
    { text: "Diagnóstico GMN", link: "/ferramentas/diagnostico-gmn", description: "Analise completa do seu Google Meu Negócio" },
    { text: "Gerador de Mensagens", link: "/ferramentas/gerador-mensagens-avaliacoes", description: "Crie mensagens personalizadas para solicitar avaliações" },
    { text: "Validador de SEO", link: null, comingSoon: true, description: "Verifique a otimização do seu site (Em breve)" }
  ];

  const handleToolClick = (tool: any) => {
    if (tool.link) {
      navigate(tool.link);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    }
  };

  const handleViewAll = () => {
    navigate("/ferramentas");
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="bg-brand-gold/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Wrench className="w-8 h-8 text-brand-gold" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-black mb-4">
            Ferramentas <span className="text-brand-gold">Gratuitas</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Acesse nossa coleção de ferramentas profissionais desenvolvidas para otimizar sua presença digital. 
            Faça diagnósticos, gere conteúdo e acelere seus resultados online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {tools.map((tool, index) => (
            <Card 
              key={index} 
              className={`group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-border hover:border-brand-gold/30 ${
                tool.link ? 'cursor-pointer' : 'opacity-60'
              }`}
              onClick={() => handleToolClick(tool)}
            >
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-brand-black mb-2 group-hover:text-brand-gold transition-colors">
                  {tool.text}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {tool.description}
                </p>
                {tool.comingSoon && (
                  <span className="inline-block mt-2 text-xs bg-brand-gold/10 text-brand-gold px-2 py-1 rounded-full">
                    Em breve
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={handleViewAll}
            size="lg"
            className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black"
          >
            Ver todas as ferramentas
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;