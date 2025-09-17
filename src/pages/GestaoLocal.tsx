import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Calendar, DollarSign, MapPin } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const GestaoLocal = () => {
  useSEO({
    title: "Gestão Local – Google Meu Negócio | Encantos Hub",
    description: "Gestão local completa com foco em GMN, reputação e site one-page opcional.",
    canonical: "https://www.encantoshub.com.br/servicos/gestao-local"
  });

  const escopo = [
    { periodo: "Mês 1", atividade: "Otimização completa do GMN" },
    { periodo: "Meses 2–3", atividade: "Aumento de avaliações e reputação digital" },
    { periodo: "Meses 4–6", atividade: "Criação/otimização de site one-page" },
    { periodo: "Meses 7–12", atividade: "Manutenção e reforço de reputação" }
  ];

  const planos = [
    {
      nome: "Apenas GMN",
      setup: "R$ 600",
      mensal: "R$ 300/mês",
      descricao: "Gestão completa do Google Meu Negócio"
    },
    {
      nome: "GMN + Site One-page",
      setup: "R$ 1.600",
      mensal: "R$ 300/mês",
      descricao: "GMN + criação de site otimizado"
    },
    {
      nome: "Franquias",
      setup: "—",
      mensal: "R$ 150/mês/unidade",
      descricao: "Ideal para múltiplas unidades"
    }
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
                  <MapPin className="w-8 h-8 text-brand-gold" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-brand-black mb-6">
                  Gestão Local
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Destaque seu negócio nas buscas locais e no Google Meu Negócio.
                </p>
              </header>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-brand-black mb-6 text-center">Para quem é</h2>
                <p className="text-lg text-muted-foreground text-center mb-8">
                  Ideal para <strong>negócios locais</strong>, <strong>estabelecimentos físicos</strong> e <strong>prestadores de serviços regionais</strong> 
                  que querem dominar as buscas locais. Se você quer expandir além do local, 
                  conheça nossa <a href="/servicos/gestao-essencial" className="text-brand-gold hover:underline font-semibold">Gestão Essencial</a>.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-brand-black mb-6 text-center">Contrato e Valor</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {planos.map((plano, index) => (
                    <Card key={index} className="border-brand-gold/20 hover:border-brand-gold/40 transition-colors">
                      <CardContent className="p-6 text-center">
                        <h3 className="font-bold text-brand-black text-lg mb-3">{plano.nome}</h3>
                        <div className="mb-4">
                          {plano.setup !== "—" && (
                            <p className="text-sm text-muted-foreground">Setup: <span className="font-semibold text-brand-gold">{plano.setup}</span></p>
                          )}
                          <p className="text-xl font-bold text-brand-gold">{plano.mensal}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{plano.descricao}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="border-brand-gold/20 mb-8">
                  <CardContent className="p-6 text-center">
                    <Calendar className="w-8 h-8 text-brand-gold mx-auto mb-3" />
                    <h3 className="font-semibold text-brand-black mb-2">Contrato</h3>
                    <p className="text-2xl font-bold text-brand-black">12 meses</p>
                    <p className="text-sm text-muted-foreground">Presença local consolidada</p>
                  </CardContent>
                </Card>
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
                          <h3 className="font-semibold text-brand-black mb-1">Mês 1 – Otimização completa do GMN</h3>
                          <p className="text-muted-foreground">Otimização completa do GMN</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 p-4 rounded-lg bg-brand-gold/5 border border-brand-gold/10">
                        <div className="bg-brand-gold/20 rounded-full p-2 flex-shrink-0">
                          <span className="text-brand-gold font-bold text-sm">2</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-brand-black mb-1">Meses 2–3 – Avaliações e reputação</h3>
                          <p className="text-muted-foreground">Aumento de avaliações e reputação digital</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 p-4 rounded-lg bg-brand-gold/5 border border-brand-gold/10">
                        <div className="bg-brand-gold/20 rounded-full p-2 flex-shrink-0">
                          <span className="text-brand-gold font-bold text-sm">3</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-brand-black mb-1">Meses 4–6 – Criação/otimização de site one-page</h3>
                          <p className="text-muted-foreground">Criação/otimização de site one-page</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 p-4 rounded-lg bg-brand-gold/5 border border-brand-gold/10">
                        <div className="bg-brand-gold/20 rounded-full p-2 flex-shrink-0">
                          <span className="text-brand-gold font-bold text-sm">4</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-brand-black mb-1">Meses 7–12 – Manutenção e reforço de reputação</h3>
                          <p className="text-muted-foreground">Manutenção e reforço de reputação</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section className="text-center">
                <h2 className="text-3xl font-bold text-brand-black mb-6">Próximos passos</h2>
                <p className="text-muted-foreground mb-6">
                  Apareça primeiro nas buscas locais da sua região. 
                  <a href="/descubra-seu-plano" className="text-brand-gold hover:underline font-semibold">Descubra qual serviço é ideal</a> para sua empresa 
                  ou solicite uma proposta personalizada.
                </p>
                <Button 
                  onClick={() => window.open("https://wa.me/5511964721143?text=Gostaria de saber mais sobre a Gestão Local", "_blank")}
                  size="lg"
                  className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black"
                >
                  Solicitar Proposta
                </Button>
              </section>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GestaoLocal;