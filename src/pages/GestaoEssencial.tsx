import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Calendar, DollarSign } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const GestaoEssencial = () => {
  useSEO({
    title: "Gestão Essencial de SEO | Encantos Hub",
    description: "SEO contínuo para pequenas e médias empresas. Contrato anual.",
    canonical: "https://www.encantoshub.com.br/servicos/gestao-essencial"
  });

  const escopo = [
    { periodo: "Mês 1", atividade: "Configuração web analítica e rastreamento" },
    { periodo: "Meses 2–3", atividade: "Impressões e cliques" },
    { periodo: "Meses 4–6", atividade: "CTR e posição média" },
    { periodo: "Meses 7–12", atividade: "Consolidação de performance (cliques e posições)" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-brand-black mb-6">
                  Gestão Essencial
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Evolução consistente com investimento acessível.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <Card className="border-brand-gold/20">
                    <CardContent className="p-6 text-center">
                      <DollarSign className="w-8 h-8 text-brand-gold mx-auto mb-3" />
                      <h3 className="font-semibold text-brand-black mb-2">Investimento</h3>
                      <p className="text-2xl font-bold text-brand-gold">R$ 1.500/mês</p>
                      <p className="text-sm text-muted-foreground">a partir de</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-brand-gold/20">
                    <CardContent className="p-6 text-center">
                      <Calendar className="w-8 h-8 text-brand-gold mx-auto mb-3" />
                      <h3 className="font-semibold text-brand-black mb-2">Contrato</h3>
                      <p className="text-2xl font-bold text-brand-black">12 meses</p>
                      <p className="text-sm text-muted-foreground">Crescimento consistente</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-brand-gold/20">
                    <CardContent className="p-6 text-center">
                      <CheckCircle className="w-8 h-8 text-brand-gold mx-auto mb-3" />
                      <h3 className="font-semibold text-brand-black mb-2">Modalidade</h3>
                      <p className="text-2xl font-bold text-brand-black">Essencial</p>
                      <p className="text-sm text-muted-foreground">PME's e autônomos</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Card className="mb-12">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-brand-black mb-8 text-center">
                    Escopo do Projeto
                  </h2>
                  
                  <div className="space-y-6">
                    {escopo.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-brand-gold/5 border border-brand-gold/10">
                        <div className="bg-brand-gold/20 rounded-full p-2 flex-shrink-0">
                          <span className="text-brand-gold font-bold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-brand-black mb-1">{item.periodo}</h3>
                          <p className="text-muted-foreground">{item.atividade}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <p className="text-muted-foreground mb-6">
                  Ideal para pequenas e médias empresas que querem crescer de forma consistente.
                </p>
                <Button 
                  onClick={() => window.open("https://wa.me/5511964721143?text=Gostaria de saber mais sobre a Gestão Essencial de SEO", "_blank")}
                  size="lg"
                  className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black"
                >
                  Solicitar Proposta
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GestaoEssencial;