import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Building2, GraduationCap, Users, BarChart3, ArrowRight } from "lucide-react";
const SolutionsSection = () => {
  const solutions = [{
    icon: Search,
    title: "Gestão de SEO para sites",
    description: "Serviço personalizado para grandes empresas que desejam aumentar sua visibilidade orgânica no site e mídias sociais. Incluindo diagnóstico completo, plano estratégico semestral e gestão de conteúdo.",
    details: ["Diagnóstico completo", "Plano de ação semestral", "Gestão de conteúdo, técnica e de backlinks", "Relatórios e alinhamentos"],
    cta: "whatsapp"
  }, {
    icon: MapPin,
    title: "Gestão Local para Franquias",
    description: "Projeto dedicado a aumentar visibilidade, performance e autoridade local de franquias com 10+ unidades. Estratégias para Site, Google Meu Negócio e YouTube com produção de conteúdo semanal.",
    details: ["Plano estratégico semestral", "Produção semanal de conteúdo local", "Gestão de canais, avaliações e menções locais", "Gestão estratégica do site e youtube da Franqueadora"],
    cta: "whatsapp"
  }, {
    icon: Building2,
    title: "Presença Digital para PME's",
    description: "Implementamos estratégias digitais completas para pequenas e médias empresas, criando canais de vendas eficientes. Análise, otimização do GMN, criação de site e campanhas publicitárias.",
    details: ["Análise de presença digital", "Criação e otimização do Google Meu Negócio", "Criação de site", "Gerenciamento de campanhas e anúncios patrocinados"],
    cta: "whatsapp"
  }, {
    icon: GraduationCap,
    title: "Mentoria de SEO para autônomos",
    description: "Aprenda na prática como gerir um projeto de SEO completo em sessões flexíveis. Conteúdo personalizado de acordo com suas demandas e clientes atuais, com materiais de apoio inclusos.",
    details: ["4 a 8 sessões online", "50 minutos de duração cada sessão", "Materiais de apoio"],
    cta: "whatsapp"
  }, {
    icon: Users,
    title: "Consultoria de SEO",
    description: "Montamos um diagnóstico estratégico para seu negócio com plano detalhado personalizado. Reunião pontual de até 2h com apresentação completa de oportunidades e estratégias recomendadas.",
    details: ["Diagnóstico completo do seu site", "Estratégias personalizadas de SEO", "Relatório detalhado com plano de ação"],
    cta: "whatsapp"
  }, {
    icon: BarChart3,
    title: "Diagnóstico do GMN",
    description: "Análise técnica completa do seu Google Meu Negócio com plano de otimização detalhado. Relatório em PDF com insights práticos para maximizar sua visibilidade local e atrair mais clientes.",
    details: ["Análise completa do perfil GMN", "Relatório detalhado em PDF", "Plano de otimização personalizado"],
    cta: "ferramentas"
  }];
  const handleCTA = (type: string) => {
    if (type === "whatsapp") {
      window.open("https://wa.me/5511964721143?text=Vim do site e gostaria de algumas informações.", "_blank");
    } else if (type === "ferramentas") {
      window.location.href = "/ferramentas";
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
                  
                  <ul className="text-sm text-muted-foreground mb-6 space-y-2">
                    {solution.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <span className="text-brand-gold mr-2">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                  
                  <Button onClick={() => handleCTA(solution.cta)} variant="outline" className="w-full group-hover:bg-brand-gold group-hover:text-brand-black group-hover:border-brand-gold transition-all">
                    {solution.cta === "whatsapp" ? "Solicitar Orçamento" : "Saiba Mais"}
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