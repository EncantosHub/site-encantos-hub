import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Building2, GraduationCap, Users, Wrench, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const SolutionsSection = () => {
  const navigate = useNavigate();
  const solutions = [{
    icon: Search,
    title: "Gestão Completa",
    description: "Crescimento sólido, estratégico e sustentável para empresas e franquias.",
    valor: "a partir de R$ 3.000/mês",
    contrato: "12 meses",
    cta: "detalhes",
    link: "/servicos/gestao-completa"
  }, {
    icon: Building2,
    title: "Gestão Essencial",
    description: "Evolução consistente com investimento acessível para PME's.",
    valor: "a partir de R$ 1.500/mês",
    contrato: "12 meses",
    cta: "detalhes",
    link: "/servicos/gestao-essencial"
  }, {
    icon: MapPin,
    title: "Gestão Local",
    description: "Destaque nas buscas locais e Google Meu Negócio.",
    valor: "Setup R$ 600 + R$ 300/mês",
    contrato: "12 meses",
    cta: "detalhes",
    link: "/servicos/gestao-local"
  }, {
    icon: Users,
    title: "Consultoria Estratégica",
    description: "Direcionamento rápido e personalizado para seu negócio.",
    valor: "R$ 300/sessão",
    contrato: "Sessão avulsa (1h30)",
    cta: "detalhes",
    link: "/servicos/consultoria"
  }, {
    icon: Wrench,
    title: "Ferramentas Gratuitas",
    description: "Acesse nossa coleção de ferramentas profissionais desenvolvidas para otimizar sua presença digital. Faça diagnósticos, gere conteúdo e acelere seus resultados online.",
    details: [
      { text: "Diagnóstico GMN", link: "/ferramentas/diagnostico-gmn" },
      { text: "Gerador de Mensagens", link: "/ferramentas/gerador-mensagens-avaliacoes" },
      { text: "Validador de SEO", link: null, comingSoon: true }
    ],
    cta: "ferramentas"
  }];
  const handleCTA = (type: string, link?: string) => {
    if (type === "whatsapp") {
      window.open("https://wa.me/5511964721143?text=Vim do site e gostaria de algumas informações.", "_blank");
    } else if (type === "ferramentas") {
      window.location.href = "/ferramentas";
    } else if (type === "detalhes" && link) {
      navigate(link);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    }
  };
  return <section id="solucoes" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-black mb-4">
            Soluções para acelerar sua <span className="text-brand-gold">visibilidade digital</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Oferecemos soluções de marketing digital para crescimento orgânico, leve e sustentável. Personalizados para cada tipo de negócio.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
          const IconComponent = solution.icon;
          return <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-border hover:border-brand-gold/30">
                <CardContent className="p-6">
                  <div className="bg-brand-gold/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-gold/20 transition-colors">
                    <IconComponent className="w-8 h-8 text-brand-gold" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-brand-black mb-3 group-hover:text-brand-gold transition-colors">
                    {solution.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {solution.description}
                  </p>
                  
                  {solution.cta !== "ferramentas" ? (
                    <div className="mb-6 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Valor:</span>
                        <span className="font-semibold text-brand-gold">{solution.valor}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Contrato:</span>
                        <span className="font-semibold text-brand-black">{solution.contrato}</span>
                      </div>
                    </div>
                  ) : (
                    <ul className="text-sm text-muted-foreground mb-6 space-y-2">
                      {solution.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <span className="text-brand-gold mr-2">•</span>
                          {typeof detail === 'string' ? (
                            detail
                          ) : detail.link ? (
                            <button 
                              onClick={() => {
                                navigate(detail.link);
                                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                              }}
                              className="text-left hover:text-brand-gold transition-colors underline"
                            >
                              {detail.text}
                            </button>
                          ) : (
                            <span className={detail.comingSoon ? "opacity-60" : ""}>
                              {detail.text} {detail.comingSoon && "(Em breve)"}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <Button onClick={() => handleCTA(solution.cta, solution.link)} variant="outline" className="w-full group-hover:bg-brand-gold group-hover:text-brand-black group-hover:border-brand-gold transition-all">
                    {solution.cta === "detalhes" ? "Ver mais detalhes" : solution.title === "Ferramentas Gratuitas" ? "Ver todas as ferramentas" : "Saiba Mais"}
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>;
        })}
        </div>
      </div>
    </section>;
};
export default SolutionsSection;