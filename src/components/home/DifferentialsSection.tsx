import { Card, CardContent } from "@/components/ui/card";
import { 
  Target, 
  TrendingUp, 
  Zap, 
  Feather, 
  Leaf, 
  Award 
} from "lucide-react";

const DifferentialsSection = () => {
  const differentials = [
    {
      icon: Target,
      title: "Estratégia sob medida",
      description: "Cada negócio é único. Desenvolvemos estratégias personalizadas que se alinham perfeitamente aos seus objetivos e mercado."
    },
    {
      icon: TrendingUp,
      title: "Crescimento orgânico e duradouro",
      description: "Focamos em resultados sustentáveis que se mantêm ao longo do tempo, construindo uma base sólida para seu sucesso digital."
    },
    {
      icon: Zap,
      title: "Experiência e ferramentas eficientes",
      description: "Utilizamos as melhores práticas do mercado e ferramentas profissionais para maximizar seus resultados."
    },
    {
      icon: Feather,
      title: "Leveza e clareza",
      description: "Processos simples e comunicação transparente. Você sempre saberá o que está sendo feito e por quê."
    },
    {
      icon: Leaf,
      title: "Compromisso com impacto social e ambiental",
      description: "Acreditamos em negócios que fazem a diferença. Nossos projetos consideram o impacto positivo na sociedade."
    },
    {
      icon: Award,
      title: "Expertise especializada",
      description: "Anos de experiência em SEO e marketing digital, com casos de sucesso comprovados em diversos segmentos."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-black mb-4">
            Nossos <span className="text-brand-gold">Diferenciais</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            O que nos torna únicos no mercado de marketing digital e SEO
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((differential, index) => {
            const IconComponent = differential.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border hover:border-brand-gold/30"
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-brand-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-gold/20 transition-colors">
                    <IconComponent className="w-8 h-8 text-brand-gold" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-brand-black mb-3 group-hover:text-brand-gold transition-colors">
                    {differential.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {differential.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;