import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Building2, GraduationCap, Users, BarChart3, ArrowRight } from "lucide-react";
const SolutionsSection = () => {
  const solutions = [{
    icon: Search,
    title: "Gestão de SEO para Sites",
    description: "Estratégias completas de otimização para motores de busca, aumentando sua visibilidade orgânica e atraindo mais clientes qualificados.",
    cta: "whatsapp"
  }, {
    icon: MapPin,
    title: "Gestão Local para Franquias",
    description: "Soluções especializadas para franquias com foco em SEO local, garantindo destaque em buscas regionais e GMB otimizado.",
    cta: "whatsapp"
  }, {
    icon: Building2,
    title: "Presença Digital para PME's",
    description: "Pacotes personalizados para pequenas e médias empresas, com estratégias acessíveis e eficazes para crescimento digital.",
    cta: "whatsapp"
  }, {
    icon: GraduationCap,
    title: "Mentoria de SEO para Autônomos",
    description: "Capacitação individual para profissionais autônomos dominarem SEO e aplicarem em seus próprios negócios.",
    cta: "whatsapp"
  }, {
    icon: Users,
    title: "Consultoria de SEO",
    description: "Consultoria estratégica personalizada com análise profunda, diagnóstico completo e plano de ação detalhado.",
    cta: "whatsapp"
  }, {
    icon: BarChart3,
    title: "Diagnóstico do GMN",
    description: "Análise completa do seu Google Meu Negócio com relatório detalhado de otimizações e oportunidades de melhoria.",
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
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {solution.description}
                  </p>
                  
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