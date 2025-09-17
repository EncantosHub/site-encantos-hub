import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Calendar, DollarSign } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const GestaoCompleta = () => {
  useSEO({
    title: "Gestão Completa de SEO | Encantos Hub",
    description: "SEO completo para empresas e franquias. Diagnóstico, rastreamento, link building e resultados sólidos em 12 meses.",
    canonical: "https://www.encantoshub.com.br/servicos/gestao-completa"
  });

  const escopo = [
    { periodo: "Mês 1", titulo: "Diagnóstico e plano de ação", atividade: "Diagnóstico completo + plano de ação estratégico personalizado" },
    { periodo: "Meses 2–3", titulo: "Rastreamento e indexação", atividade: "Rastreamento e indexação (foco em impressões)" },
    { periodo: "Meses 4–6", titulo: "Cliques e CTR", atividade: "Otimização de cliques e CTR" },
    { periodo: "Meses 7–9", titulo: "Link building e autoridade", atividade: "Link building e construção de autoridade" },
    { periodo: "Meses 10–12", titulo: "Consolidação de métricas", atividade: "Projetos avançados e consolidação de métricas" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <article className="max-w-4xl mx-auto">
              <header className="text-center mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-brand-black mb-6">
                  Gestão Completa e Personalizada
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Crescimento sólido, estratégico e sustentável para empresas e franquias.
                </p>
              </header>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-brand-black mb-6 text-center">Para quem é</h2>
                <p className="text-lg text-muted-foreground text-center mb-8">
                  Ideal para <strong>empresas de médio e grande porte</strong> e <strong>franquias</strong> que precisam de 
                  uma gestão de SEO estratégica e personalizada. Se você já tem presença digital estabelecida e quer 
                  resultados sólidos, este é o serviço ideal. Para empresas que estão começando, recomendamos nossa 
                  <a href="/servicos/gestao-essencial" className="text-brand-gold hover:underline font-semibold"> Gestão Essencial</a>.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <Card className="border-brand-gold/20">
                    <CardContent className="p-6 text-center">
                      <DollarSign className="w-8 h-8 text-brand-gold mx-auto mb-3" />
                      <h3 className="font-semibold text-brand-black mb-2">Investimento</h3>
                      <p className="text-2xl font-bold text-brand-gold">R$ 3.000/mês</p>
                      <p className="text-sm text-muted-foreground">a partir de</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-brand-gold/20">
                    <CardContent className="p-6 text-center">
                      <Calendar className="w-8 h-8 text-brand-gold mx-auto mb-3" />
                      <h3 className="font-semibold text-brand-black mb-2">Contrato</h3>
                      <p className="text-2xl font-bold text-brand-black">12 meses</p>
                      <p className="text-sm text-muted-foreground">Resultados sólidos</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-brand-gold/20">
                    <CardContent className="p-6 text-center">
                      <CheckCircle className="w-8 h-8 text-brand-gold mx-auto mb-3" />
                      <h3 className="font-semibold text-brand-black mb-2">Modalidade</h3>
                      <p className="text-2xl font-bold text-brand-black">Completa</p>
                      <p className="text-sm text-muted-foreground">Gestão personalizada</p>
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
                      {escopo.map((item, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-brand-gold/5 border border-brand-gold/10">
                          <div className="bg-brand-gold/20 rounded-full p-2 flex-shrink-0">
                            <span className="text-brand-gold font-bold text-sm">{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-brand-black mb-1">{item.periodo} – {item.titulo}</h3>
                            <p className="text-muted-foreground">{item.atividade}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-brand-black mb-6 text-center">Contrato e Valor</h2>

                <div className="text-center mb-8">
                  <p className="text-lg text-muted-foreground mb-4">
                    <strong>Contrato:</strong> 12 meses para resultados sólidos e sustentáveis
                  </p>
                  <p className="text-lg text-muted-foreground">
                    <strong>Investimento:</strong> A partir de R$ 3.000/mês
                  </p>
                </div>
              </section>

              <section className="text-center">
                <h2 className="text-3xl font-bold text-brand-black mb-6">Próximos passos</h2>
                <p className="text-muted-foreground mb-8">
                  Pronto para dar o próximo passo no seu crescimento digital? 
                  Solicite uma proposta personalizada ou descubra se este é o serviço ideal para sua empresa.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Button 
                    onClick={() => window.open("https://wa.me/5511964721143?text=Gostaria de solicitar um orçamento para a Gestão Completa de SEO&utm_source=gestao_completa&utm_medium=cta&utm_campaign=orcamento", "_blank")}
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

export default GestaoCompleta;