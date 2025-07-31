import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";

const TeamSection = () => {
  const team = [
    {
      name: "ISABELLA",
      role: "Especialista em SEO",
      description: "Expert em estratégias de otimização para motores de busca com foco em resultados mensuráveis e crescimento orgânico sustentável.",
      linkedin: "https://linkedin.com/in/isabella-brilha",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5cc?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "PALOMA",
      role: "Estrategista Digital",
      description: "Especialista em marketing digital com expertise em presença online e estratégias personalizadas para diferentes segmentos de mercado.",
      linkedin: "https://linkedin.com/in/paloma-nogueira",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "BRUNO",
      role: "Consultor Técnico",
      description: "Especialista técnico em SEO e análise de performance, focado em implementações avançadas e otimizações que geram impacto real.",
      linkedin: "https://linkedin.com/in/bruno-brilha",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    }
  ];

  return (
    <section id="equipe" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-black mb-4">
            Nossa <span className="text-brand-gold">Equipe</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Somos um grupo de especialistas em marketing digital e SEO. 
            Nossa missão é potencializar a presença online com soluções personalizadas, 
            técnicas e sustentáveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-border hover:border-brand-gold/30"
            >
              <CardContent className="p-6 text-center">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-gold transition-shadow"
                  />
                  <div className="absolute inset-0 w-24 h-24 rounded-full mx-auto border-2 border-brand-gold/20 group-hover:border-brand-gold/50 transition-colors"></div>
                </div>
                
                <h3 className="text-xl font-bold text-brand-black mb-2 group-hover:text-brand-gold transition-colors">
                  {member.name}
                </h3>
                
                <p className="text-brand-gold font-medium mb-4">
                  {member.role}
                </p>
                
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                  {member.description}
                </p>
                
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(member.linkedin, "_blank")}
                  className="group-hover:bg-brand-gold group-hover:text-brand-black group-hover:border-brand-gold transition-all"
                >
                  <Linkedin size={16} className="mr-2" />
                  LinkedIn
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;