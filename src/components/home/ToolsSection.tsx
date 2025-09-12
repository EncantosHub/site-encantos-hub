import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  MessageSquare, 
  Code, 
  ArrowRight, 
  Clock,
  Wrench
} from "lucide-react";

const ToolsSection = () => {
  const navigate = useNavigate();
  
  const featuredTools = [
    {
      icon: BarChart3,
      title: "Diagnóstico GMN",
      description: "Análise completa do seu Google Meu Negócio com relatório detalhado de otimizações.",
      status: "Disponível",
      comingSoon: false,
      path: "/ferramentas/diagnostico-gmn"
    },
    {
      icon: MessageSquare,
      title: "Gerador de Mensagens",
      description: "Crie mensagens personalizadas para solicitar avaliações dos seus clientes.",
      status: "Disponível",
      comingSoon: false,
      path: "/ferramentas/gerador-mensagens-avaliacoes"
    },
    {
      icon: Code,
      title: "Validador de SEO",
      description: "Valide o SEO técnico do seu site com análise completa de estrutura HTML.",
      status: "Em Breve",
      comingSoon: true
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-brand-gold/10 text-brand-gold px-4 py-2 rounded-full mb-6 border border-brand-gold/20">
              <Wrench size={16} />
              <span className="text-sm font-medium">Ferramentas Gratuitas</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-brand-black mb-6">
              Nossas <span className="text-brand-gold">Ferramentas</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Acesse ferramentas profissionais desenvolvidas pela nossa equipe 
              para otimizar sua presença digital e acelerar seus resultados
            </p>
          </div>

          {/* Tools List */}
          <div className="space-y-6 mb-12">
            {featuredTools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-elegant transition-all duration-300 border-border hover:border-brand-gold/30"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      {/* Icon */}
                      <div className="bg-brand-gold/10 w-16 h-16 rounded-lg flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors flex-shrink-0">
                        <IconComponent className="w-8 h-8 text-brand-gold" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold text-brand-black group-hover:text-brand-gold transition-colors">
                            {tool.title}
                          </h3>
                          <Badge 
                            variant={tool.comingSoon ? "secondary" : "default"}
                            className={tool.comingSoon ? "bg-orange-100 text-orange-700" : "bg-brand-gold text-brand-black"}
                          >
                            <Clock size={12} className="mr-1" />
                            {tool.status}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {tool.description}
                        </p>
                        
                        {/* CTA */}
                        <Button 
                          variant="outline"
                          size="sm"
                          disabled={tool.comingSoon}
                          onClick={() => {
                            if (!tool.comingSoon && tool.path) {
                              navigate(tool.path);
                            }
                          }}
                          className={`${
                            tool.comingSoon 
                              ? "opacity-50 cursor-not-allowed" 
                              : "group-hover:bg-brand-gold group-hover:text-brand-black group-hover:border-brand-gold"
                          } transition-all`}
                        >
                          {tool.comingSoon ? "Em Breve" : "Usar Agora"}
                          {!tool.comingSoon && <ArrowRight size={16} className="ml-2" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA to All Tools */}
          <div className="text-center">
            <Button
              onClick={() => navigate('/ferramentas')}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-semibold px-8 py-3 text-lg"
            >
              Ver Todas as Ferramentas
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;