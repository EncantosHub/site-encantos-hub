import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, DollarSign, Video } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const ConsultoriaEstrategica = () => {
  useSEO({
    title: "Consultoria em SEO Estratégico | Encantos Hub",
    description: "Sessões avulsas online de 1h30 para diagnóstico e plano de ação imediato.",
    canonical: "https://www.encantoshub.com.br/servicos/consultoria"
  });

  const inclusos = [
    "1h30 online via Google Meet",
    "Diagnóstico pontual do seu site",
    "Resolução de dúvidas técnicas",
    "Plano de ação imediato",
    "Gravação da sessão disponibilizada",
    "Material de apoio por e-mail"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <article className="max-w-4xl mx-auto">
              <header className="text-center mb-12">
                <div className="bg-brand-gold/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Video className="w-8 h-8 text-brand-gold" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-brand-black mb-6">
                  Consultoria Estratégica
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Direcionamento rápido e personalizado para seu negócio.
                </p>
              </header>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-brand-black mb-6 text-center">Para quem é</h2>
                <p className="text-lg text-muted-foreground text-center mb-8">
                  Ideal para <strong>empreendedores</strong> e <strong>gestores</strong> que precisam de orientação rápida e estratégica 
                  para resolver dúvidas pontuais sobre SEO. Se após a sessão você quiser um plano de longo prazo, 
                  conheça nossa <a href="/servicos/gestao-essencial" className="text-brand-gold hover:underline font-semibold">Gestão Essencial</a>.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-brand-black mb-6 text-center">Como funciona a sessão</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="border-brand-gold/20">
                    <CardContent className="p-6 text-center">
                      <DollarSign className="w-8 h-8 text-brand-gold mx-auto mb-3" />
                      <h3 className="font-semibold text-brand-black mb-2">Investimento</h3>
                      <p className="text-2xl font-bold text-brand-gold">R$ 300</p>
                      <p className="text-sm text-muted-foreground">por sessão</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-brand-gold/20">
                    <CardContent className="p-6 text-center">
                      <Clock className="w-8 h-8 text-brand-gold mx-auto mb-3" />
                      <h3 className="font-semibold text-brand-black mb-2">Duração</h3>
                      <p className="text-2xl font-bold text-brand-black">1h30</p>
                      <p className="text-sm text-muted-foreground">sessão online</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-brand-gold/20">
                    <CardContent className="p-6 text-center">
                      <CheckCircle className="w-8 h-8 text-brand-gold mx-auto mb-3" />
                      <h3 className="font-semibold text-brand-black mb-2">Modalidade</h3>
                      <p className="text-2xl font-bold text-brand-black">Avulsa</p>
                      <p className="text-sm text-muted-foreground">sem compromisso</p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="mb-12">
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-3xl font-bold text-brand-black mb-8 text-center">
                      O que entregamos
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {inclusos.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-brand-gold/5 border border-brand-gold/10">
                          <CheckCircle className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-brand-black mb-6 text-center">Contrato e Valor</h2>

                <Card className="bg-brand-gold/5 border-brand-gold/20">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold text-brand-black mb-4">
                      Detalhe Importante
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Se após a primeira sessão o cliente desejar, pode ser contratado um 
                      <span className="font-semibold text-brand-gold"> plano estratégico anual</span>, 
                      mas isso só é definido depois da sessão inicial.
                    </p>
                  </CardContent>
                </Card>
              </section>

              <section className="text-center">
                <h2 className="text-3xl font-bold text-brand-black mb-6">Próximos passos</h2>
                <p className="text-muted-foreground mb-8">
                  Pronto para esclarecer suas dúvidas e definir os próximos passos? 
                  Agende sua consultoria estratégica ou descubra se este é o serviço ideal para você.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-4">
                  <Button 
                    onClick={() => window.open("https://wa.me/5511964721143?text=Gostaria de agendar uma Consultoria Estratégica&utm_source=consultoria&utm_medium=cta&utm_campaign=agendamento", "_blank")}
                    size="lg"
                    className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-semibold flex-1"
                  >
                    Agendar Consultoria
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
                
                <p className="text-xs text-muted-foreground max-w-lg mx-auto">
                  Todos os planos são contratos anuais, mas este serviço pode ser a porta de entrada para evoluir ao longo do tempo.
                </p>
              </section>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ConsultoriaEstrategica;