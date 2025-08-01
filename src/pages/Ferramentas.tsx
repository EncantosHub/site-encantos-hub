import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
  Sparkles
} from "lucide-react";

const Ferramentas = () => {
  const navigate = useNavigate();
  
  const tools = [
    {
      icon: BarChart3,
      title: "Diagnóstico GMN",
      description: "Análise completa do seu Google Meu Negócio com relatório detalhado de otimizações e oportunidades de melhoria para aumentar sua visibilidade local.",
      features: [
        "Análise de perfil completo",
        "Auditoria de fotos e posts",
        "Verificação de avaliações",
        "Relatório personalizado"
      ],
      status: "Disponível",
      comingSoon: false,
      path: "/ferramentas/diagnostico-gmn"
    },
    {
      icon: MessageSquare,
      title: "Gerador de Mensagens para Avaliação",
      description: "Ferramenta inteligente que cria mensagens personalizadas para solicitar avaliações dos seus clientes no Google Meu Negócio.",
      features: [
        "Templates personalizáveis",
        "Integração com WhatsApp",
        "Diferentes tipos de negócio",
        "Disparos automáticos"
      ],
      status: "Em Breve",
      comingSoon: true
    },
    {
      icon: Code,
      title: "Validador de SEO para HTML",
      description: "Valide o SEO técnico do seu site com nossa ferramenta que analisa estrutura HTML, meta tags, performance e mais.",
      features: [
        "Análise de meta tags",
        "Validação de estrutura",
        "Verificação de performance",
        "Sugestões de melhoria"
      ],
      status: "Planejado",
      comingSoon: true
    }
  ];

  useEffect(() => {
    document.title = "Ferramentas de SEO e Marketing Digital | Encantos Hub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Acesse ferramentas profissionais de SEO e marketing digital. Diagnóstico GMN, gerador de mensagens e validador de SEO.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center space-x-2 bg-brand-gold/10 text-brand-gold px-4 py-2 rounded-full mb-8 border border-brand-gold/20">
              <Sparkles size={16} />
              <span className="text-sm font-medium">Ferramentas Profissionais</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-white mb-4">
              Ferramentas de <span className="text-brand-gold">SEO</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Acesse ferramentas profissionais desenvolvidas pela nossa equipe 
              para otimizar sua presença digital e acelerar seus resultados
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool, index) => {
                const IconComponent = tool.icon;
                return (
                  <Card 
                    key={index} 
                    className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-border hover:border-brand-gold/30 relative overflow-hidden"
                  >
                    <CardContent className="p-6">
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge 
                          variant={tool.comingSoon ? "secondary" : "default"}
                          className={tool.comingSoon ? "bg-orange-100 text-orange-700" : "bg-brand-gold text-brand-black"}
                        >
                          <Clock size={12} className="mr-1" />
                          {tool.status}
                        </Badge>
                      </div>

                      {/* Icon */}
                      <div className="bg-brand-gold/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-gold/20 transition-colors">
                        <IconComponent className="w-8 h-8 text-brand-gold" />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-semibold text-brand-black mb-3 group-hover:text-brand-gold transition-colors">
                        {tool.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {tool.description}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-medium text-brand-black mb-3">Funcionalidades:</h4>
                        <ul className="space-y-2">
                          {tool.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-brand-gold rounded-full mr-2 flex-shrink-0"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* CTA */}
                      <Button 
                        variant="outline"
                        disabled={tool.comingSoon}
                        onClick={() => {
                          if (!tool.comingSoon && tool.path) {
                            navigate(tool.path);
                          }
                        }}
                        className={`w-full ${
                          tool.comingSoon 
                            ? "opacity-50 cursor-not-allowed" 
                            : "group-hover:bg-brand-gold group-hover:text-brand-black group-hover:border-brand-gold"
                        } transition-all`}
                      >
                        {tool.comingSoon ? "Em Breve" : "Acessar Ferramenta"}
                        {!tool.comingSoon && <ArrowRight size={16} className="ml-2" />}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-brand-black mb-4">
              Quer sugerir uma <span className="text-brand-gold">nova ferramenta?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Estamos sempre desenvolvendo novas soluções. 
              Entre em contato e nos conte qual ferramenta seria útil para seu negócio.
            </p>
            <Button 
              onClick={() => window.open("https://wa.me/5511964721143?text=Gostaria de sugerir uma nova ferramenta para o EncantosHub.", "_blank")}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-semibold px-8 py-3"
            >
              Enviar Sugestão
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Ferramentas;