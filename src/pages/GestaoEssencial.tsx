import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Calendar, DollarSign } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const GestaoEssencial = () => {
  useSEO({
    title: "Gestão Essencial de SEO | Encantos Hub",
    description: "SEO acessível para pequenas e médias empresas. Evolução contínua com contrato anual.",
    canonical: "https://www.encantoshub.com.br/servicos/gestao-essencial"
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <article className="max-w-4xl mx-auto">
              <header className="text-center mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-brand-black mb-6">
                  Gestão Essencial
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Evolução consistente com investimento acessível.
                </p>
              </header>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-brand-black mb-6 text-center">Para quem é</h2>
                <p className="text-lg text-muted-foreground text-center mb-8">
                  Ideal para <strong>pequenas e médias empresas</strong> e <strong>autônomos</strong> que querem crescer de forma consistente 
                  com um investimento acessível. Se você já tem um negócio consolidado e quer acelerar ainda mais, 
                  conheça nossa <a href="/servicos/gestao-completa" className="text-brand-gold hover:underline font-semibold">Gestão Completa</a>. 
                  Para empresas com foco local, veja nossa <a href="/servicos/gestao-local" className="text-brand-gold hover:underline font-semibold">Gestão Local</a>.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-brand-black mb-6 text-center">Contrato e Valor</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              </section>

              <section className="mb-12">
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-3xl font-bold text-brand-black mb-8 text-center">
                      Escopo anual
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4 p-4 rounded-lg bg-brand-gold/5 border border-brand-gold/10">
                        <div className="bg-brand-gold/20 rounded-full p-2 flex-shrink-0">
                          <span className="text-brand-gold font-bold text-sm">1</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-brand-black mb-1">Mês 1 – Configuração web analítica</h3>
                          <p className="text-muted-foreground">Configuração web analítica e rastreamento</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 p-4 rounded-lg bg-brand-gold/5 border border-brand-gold/10">
                        <div className="bg-brand-gold/20 rounded-full p-2 flex-shrink-0">
                          <span className="text-brand-gold font-bold text-sm">2</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-brand-black mb-1">Meses 2–3 – Impressões e cliques</h3>
                          <p className="text-muted-foreground">Impressões e cliques</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 p-4 rounded-lg bg-brand-gold/5 border border-brand-gold/10">
                        <div className="bg-brand-gold/20 rounded-full p-2 flex-shrink-0">
                          <span className="text-brand-gold font-bold text-sm">3</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-brand-black mb-1">Meses 4–6 – CTR e posição média</h3>
                          <p className="text-muted-foreground">CTR e posição média</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 p-4 rounded-lg bg-brand-gold/5 border border-brand-gold/10">
                        <div className="bg-brand-gold/20 rounded-full p-2 flex-shrink-0">
                          <span className="text-brand-gold font-bold text-sm">4</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-brand-black mb-1">Meses 7–12 – Consolidação de performance</h3>
                          <p className="text-muted-foreground">Consolidação de performance (cliques e posições)</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section className="text-center">
                <h2 className="text-3xl font-bold text-brand-black mb-6">Próximos passos</h2>
                <p className="text-muted-foreground mb-8">
                  Ideal para pequenas e médias empresas que querem crescer de forma consistente. 
                  Solicite uma proposta personalizada ou descubra se este é o serviço ideal para sua empresa.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Button 
                    onClick={() => window.open("https://wa.me/5511964721143?text=Gostaria de solicitar um orçamento para a Gestão Essencial de SEO&utm_source=gestao_essencial&utm_medium=cta&utm_campaign=orcamento", "_blank")}
                    size="lg"
                    className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-semibold flex-1"
                  >
                    Solicitar Orçamento
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => window.location.href = "/descubra-seu-plano"}
                    size="lg"
                    className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black font-semibold flex-1"
                  >
                    Ainda em dúvida? Descubra seu Serviço Ideal
                  </Button>
                </div>
              </section>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GestaoEssencial;