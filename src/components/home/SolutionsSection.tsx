import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Building2, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const SolutionsSection = () => {
  const navigate = useNavigate();
  const solutions = [{
    icon: Search,
    title: "Gestão Completa",
    description: "Gestão de SEO para sites e grandes marcas. Serviço personalizado para empresas que buscam aumentar sua visibilidade orgânica no Google e fortalecer presença digital de longo prazo.",
    bullets: [
      "Diagnóstico completo",
      "Plano estratégico semestral", 
      "Gestão de conteúdo, técnica e backlinks",
      "Relatórios e reuniões de alinhamento"
    ],
    cta: "detalhes",
    link: "/servicos/gestao-completa"
  }, {
    icon: Building2,
    title: "Gestão Essencial",
    description: "SEO acessível para pequenas e médias empresas. Ideal para negócios que desejam evoluir sua presença online de forma consistente, com foco em performance e análise de dados.",
    bullets: [
      "Configuração de ferramentas web analíticas",
      "Otimização de páginas e conteúdos",
      "Monitoramento de impressões, cliques e CTR", 
      "Relatórios simplificados de evolução"
    ],
    cta: "detalhes",
    link: "/servicos/gestao-essencial"
  }, {
    icon: MapPin,
    title: "Gestão Local",
    description: "Presença digital estratégica para negócios regionais. Voltado para pequenas empresas que desejam ser encontradas por clientes próximos. Avaliamos o perfil e momento do seu negócio para indicar a melhor estratégia local: Google Meu Negócio, criação de site, parcerias com sites regionais e gestão de reputação.",
    bullets: [
      "Diagnóstico do cenário local",
      "Definição de canais prioritários (GMN, site, parceiros)",
      "Estratégia de avaliações e reputação digital",
      "Acompanhamento e otimização contínua"
    ],
    cta: "detalhes",
    link: "/servicos/gestao-local"
  }, {
    icon: Users,
    title: "Consultoria Estratégica",
    description: "Sessões avulsas de SEO e marketing digital. Para empreendedores que buscam orientação prática antes de contratar um plano de gestão contínua.",
    bullets: [
      "Sessão online de 1h30",
      "Auditoria inicial do site",
      "Sugestão de plano estratégico personalizado",
      "Direcionamento de próximos passos"
    ],
    cta: "detalhes",
    link: "/servicos/consultoria"
  }];
  const handleCTA = (type: string, link?: string) => {
    if ((type === "detalhes" || type === "discover") && link) {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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
                  
                  <ul className="mb-6 space-y-2">
                    {solution.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-brand-gold rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button onClick={() => handleCTA(solution.cta, solution.link)} variant="outline" className="w-full group-hover:bg-brand-gold group-hover:text-brand-black group-hover:border-brand-gold transition-all">
                    Ver mais detalhes
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>;
        })}
        </div>
        
        {/* CTAs Globais */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl font-bold text-brand-black mb-6">
              Pronto para começar sua jornada digital?
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.open('https://wa.me/5511964721143?text=Olá! Gostaria de solicitar um orçamento personalizado para minha empresa&utm_source=home&utm_medium=cta&utm_campaign=orcamento', '_blank')}
                size="lg"
                className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 font-semibold px-8 py-3"
              >
                Solicitar Orçamento
              </Button>
              
              <Button 
                onClick={() => handleCTA('discover', '/descubra-seu-plano')}
                variant="outline"
                size="lg"
                className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black font-semibold px-8 py-3"
              >
                Descubra seu Serviço Ideal
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Conheça nossos planos ou solicite uma proposta personalizada
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default SolutionsSection;