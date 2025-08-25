import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Camera, 
  Package, 
  MessageSquare, 
  BarChart3,
  ChevronRight,
  ChevronLeft,
  CheckCircle
} from "lucide-react";
import { FormData } from "@/pages/DiagnosticoGMN";
import { FormSection } from "./FormSection";

interface DiagnosticFormProps {
  onComplete: (data: FormData) => void;
}

const sections = [
  {
    id: 'identity',
    title: 'Identidade e Informações Básicas',
    icon: User,
    description: 'Nome, categoria, endereço e horário de funcionamento',
    questions: [
      { 
        id: 'business_name', 
        question: 'O nome do seu negócio está correto e completo?', 
        category: 'identity',
        explanation: 'Use o nome oficial da empresa conforme registrado. Evite abreviações ou caracteres especiais desnecessários. O nome deve ser claro e fácil de encontrar.'
      },
      { 
        id: 'category', 
        question: 'A categoria principal do seu negócio está adequada?', 
        category: 'identity',
        explanation: 'Escolha a categoria mais específica possível. Isso ajuda o Google a entender seu negócio e mostrar para as pessoas certas. Você pode adicionar categorias secundárias também.'
      },
      { 
        id: 'address', 
        question: 'O endereço está correto e detalhado?', 
        category: 'identity',
        explanation: 'Inclua número, complemento e referências quando necessário. O endereço deve ser exatamente como aparecem nos Correios e corresponder à sua localização real.'
      },
      { 
        id: 'phone', 
        question: 'O telefone está atualizado e funcional?', 
        category: 'identity',
        explanation: 'Use um número que seja atendido durante o horário comercial. Prefira números locais e evite números temporários ou redirecionamentos.'
      },
      { 
        id: 'website', 
        question: 'O site está vinculado corretamente?', 
        category: 'identity',
        explanation: 'Adicione a URL completa do seu site principal. Certifique-se de que o link funciona e que o site está atualizado com suas informações atuais.'
      },
      { 
        id: 'hours', 
        question: 'Os horários de funcionamento estão atualizados?', 
        category: 'identity',
        explanation: 'Mantenha os horários sempre atualizados. Clientes frustrados por encontrar estabelecimento fechado tendem a deixar avaliações negativas.'
      },
      { 
        id: 'holiday_hours', 
        question: 'Os horários especiais e feriados estão configurados?', 
        category: 'identity',
        explanation: 'Configure horários especiais para feriados, férias coletivas e eventos sazonais. Isso evita confusão e melhora a experiência do cliente.'
      }
    ]
  },
  {
    id: 'media',
    title: 'Mídia e Conteúdo Visual',
    icon: Camera,
    description: 'Fotos de perfil, capa, internas e posts',
    questions: [
      { 
        id: 'profile_photo', 
        question: 'Possui foto de perfil de alta qualidade?', 
        category: 'media',
        explanation: 'Use sua logo ou uma foto que represente bem o negócio. A imagem deve ter boa resolução (mínimo 720x720px) e ser reconhecível mesmo em tamanho pequeno.'
      },
      { 
        id: 'cover_photo', 
        question: 'A foto de capa representa bem o negócio?', 
        category: 'media',
        explanation: 'A foto de capa é a primeira impressão. Mostre seu estabelecimento, produtos ou serviços de forma atrativa. Use imagens com boa iluminação e resolução mínima de 1024x575px.'
      },
      { 
        id: 'interior_photos', 
        question: 'Tem fotos internas do estabelecimento?', 
        category: 'media',
        explanation: 'Mostre o ambiente interno para que clientes saibam o que esperar. Include diferentes ângulos e ambientes do seu estabelecimento.'
      },
      { 
        id: 'exterior_photos', 
        question: 'Tem fotos externas do estabelecimento?', 
        category: 'media',
        explanation: 'Facilite para os clientes te encontrarem com fotos da fachada, placas e pontos de referência próximos. Inclua fotos diurnas e noturnas se necessário.'
      },
      { 
        id: 'product_photos', 
        question: 'Possui fotos dos produtos/serviços?', 
        category: 'media',
        explanation: 'Mostre seus produtos ou serviços em ação. Use fotos profissionais com boa iluminação. Para serviços, mostre o antes/depois ou o processo.'
      },
      { 
        id: 'team_photos', 
        question: 'Tem fotos da equipe trabalhando?', 
        category: 'media',
        explanation: 'Humanize seu negócio mostrando sua equipe. Isso gera confiança e proximidade com os clientes. Certifique-se de ter autorização da equipe.'
      },
      { 
        id: 'recent_photos', 
        question: 'As fotos são recentes (menos de 6 meses)?', 
        category: 'media',
        explanation: 'Mantenha as fotos atualizadas para refletir a realidade atual do seu negócio. Remova fotos antigas que não representam mais sua empresa.'
      },
      { 
        id: 'posts_frequency', 
        question: 'Publica posts regularmente (pelo menos 1x por semana)?', 
        category: 'media',
        explanation: 'Posts frequentes mantêm seu perfil ativo e relevante. Compartilhe novidades, promoções, dicas e conteúdo que interesse seus clientes.'
      }
    ]
  },
  {
    id: 'services',
    title: 'Serviços e Produtos',
    icon: Package,
    description: 'Descrições, atributos e informações sobre ofertas',
    questions: [
      { 
        id: 'description', 
        question: 'A descrição do negócio é completa e atrativa?', 
        category: 'services',
        explanation: 'Escreva uma descrição clara do que faz, seus diferenciais e para quem atende. Use palavras-chave que seus clientes usariam para te encontrar. Limite: 750 caracteres.'
      },
      { 
        id: 'services_list', 
        question: 'Todos os serviços principais estão listados?', 
        category: 'services',
        explanation: 'Liste todos os serviços que oferece de forma clara e específica. Isso ajuda na descoberta por pesquisas relacionadas e informa melhor os clientes.'
      },
      { 
        id: 'attributes', 
        question: 'Os atributos relevantes estão configurados?', 
        category: 'services',
        explanation: 'Configure atributos como Wi-Fi, estacionamento, acessibilidade, formas de pagamento aceitas, etc. Isso aparece nas pesquisas e influencia a decisão de compra.'
      },
      { 
        id: 'products', 
        question: 'Os produtos estão cadastrados com fotos e preços?', 
        category: 'services',
        explanation: 'Cadastre seus principais produtos com fotos atrativas e preços quando apropriado. Isso facilita a decisão de compra dos clientes.'
      },
      { 
        id: 'menu', 
        question: 'O cardápio/catálogo está atualizado?', 
        category: 'services',
        explanation: 'Mantenha cardápios e catálogos sempre atualizados com preços e disponibilidade corretos. Informações desatualizadas geram frustração no cliente.'
      },
      { 
        id: 'special_offers', 
        question: 'Ofertas especiais estão destacadas?', 
        category: 'services',
        explanation: 'Use a função de ofertas para destacar promoções, descontos ou serviços especiais. Isso chama atenção e pode aumentar conversões.'
      }
    ]
  },
  {
    id: 'relationship',
    title: 'Relacionamento com Clientes',
    icon: MessageSquare,
    description: 'Avaliações, mensagens e interação',
    questions: [
      { 
        id: 'reviews_quantity', 
        question: 'Possui mais de 10 avaliações?', 
        category: 'relationship',
        explanation: 'Avaliações são fundamentais para credibilidade. Incentive clientes satisfeitos a avaliar. Você pode pedir pessoalmente, por WhatsApp ou criar QR codes para facilitar.'
      },
      { 
        id: 'recent_reviews', 
        question: 'Recebeu avaliações nos últimos 30 dias?', 
        category: 'relationship',
        explanation: 'Avaliações recentes mostram que o negócio está ativo e atendendo clientes. Se não tem recebido, crie estratégias para incentivar mais avaliações.'
      },
      { 
        id: 'review_responses', 
        question: 'Responde às avaliações regularmente?', 
        category: 'relationship',
        explanation: 'Responda sempre às avaliações - positivas para agradecer, negativas para mostrar que se importa com o feedback. Isso demonstra profissionalismo.'
      },
      { 
        id: 'messaging', 
        question: 'A função de mensagens está ativada?', 
        category: 'relationship',
        explanation: 'Ative mensagens para que clientes possam te contatar diretamente pelo Google. Configure para receber no WhatsApp ou outro canal que monitore regularmente.'
      },
      { 
        id: 'response_time', 
        question: 'Responde mensagens em até 24 horas?', 
        category: 'relationship',
        explanation: 'Resposta rápida é crucial para conversão. Configure notificações para não perder mensagens. Respostas demoradas podem fazer o cliente desistir.'
      },
      { 
        id: 'q_and_a', 
        question: 'Monitora e responde perguntas dos usuários?', 
        category: 'relationship',
        explanation: 'Usuários fazem perguntas públicas no seu perfil. Monitore e responda para ajudar outros clientes com dúvidas similares e mostrar que está presente.'
      }
    ]
  },
  {
    id: 'results',
    title: 'Resultados e Monitoramento',
    icon: BarChart3,
    description: 'Insights, métricas e análises',
    questions: [
      { 
        id: 'insights_monitoring', 
        question: 'Monitora os insights semanalmente?', 
        category: 'results',
        explanation: 'Acompanhe métricas como visualizações, pesquisas e ações semanalmente. Isso ajuda a entender o que funciona e identificar oportunidades de melhoria.'
      },
      { 
        id: 'photo_views', 
        question: 'As fotos têm bom engajamento (visualizações)?', 
        category: 'results',
        explanation: 'Fotos com muitas visualizações indicam interesse dos clientes. Se alguma foto tem poucas views, considere substituí-la por uma mais atrativa.'
      },
      { 
        id: 'discovery_searches', 
        question: 'Aparece em pesquisas de descoberta?', 
        category: 'results',
        explanation: 'Pesquisas de descoberta mostram que aparecem quando pessoas procuram por sua categoria/localização. Se está baixo, revise palavras-chave e categoria.'
      },
      { 
        id: 'direct_searches', 
        question: 'Recebe pesquisas diretas pelo nome?', 
        category: 'results',
        explanation: 'Pesquisas diretas indicam reconhecimento da marca. Se está baixo, trabalhe o marketing offline e a lembrança da marca.'
      },
      { 
        id: 'actions_tracking', 
        question: 'Acompanha ações dos usuários (chamadas, direções)?', 
        category: 'results',
        explanation: 'Monitore quantas pessoas ligam, pedem direções ou visitam seu site através do perfil. Essas são métricas de conversão importantes.'
      },
      { 
        id: 'competitor_comparison', 
        question: 'Compara performance com concorrentes?', 
        category: 'results',
        explanation: 'Use ferramentas como Google Business Intelligence para comparar sua performance com concorrentes locais e identificar gaps.'
      }
    ]
  }
];

export const DiagnosticForm = ({ onComplete }: DiagnosticFormProps) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Record<string, string>>>({
    identity: {},
    media: {},
    services: {},
    relationship: {},
    results: {}
  });
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const currentSection = sections[currentSectionIndex];
  const progress = ((currentSectionIndex + 1) / sections.length) * 100;

  const handleSectionComplete = (sectionData: Record<string, string>) => {
    const newAnswers = {
      ...answers,
      [currentSection.id]: sectionData
    };
    setAnswers(newAnswers);

    if (!completedSections.includes(currentSection.id)) {
      setCompletedSections([...completedSections, currentSection.id]);
    }

    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else {
      onComplete({
        identity: newAnswers.identity || {},
        media: newAnswers.media || {},
        services: newAnswers.services || {},
        relationship: newAnswers.relationship || {},
        results: newAnswers.results || {}
      });
    }
  };

  const goToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const goToSection = (index: number) => {
    setCurrentSectionIndex(index);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <CardTitle className="text-2xl text-brand-black">
              Diagnóstico GMN - Avaliação Completa
            </CardTitle>
            <Badge className="bg-brand-gold text-brand-black">
              {currentSectionIndex + 1} de {sections.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-muted-foreground mt-2">
            {Math.round(progress)}% concluído
          </p>
        </CardHeader>
      </Card>

      {/* Section Navigation */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              const isCompleted = completedSections.includes(section.id);
              const isCurrent = index === currentSectionIndex;
              const isAccessible = index <= currentSectionIndex;
              
              return (
                <button
                  key={section.id}
                  onClick={() => isAccessible && goToSection(index)}
                  disabled={!isAccessible}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    isCurrent 
                      ? 'border-brand-gold bg-brand-gold/5' 
                      : isCompleted
                      ? 'border-green-500 bg-green-50'
                      : isAccessible
                      ? 'border-border hover:border-brand-gold/50'
                      : 'border-border opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent 
                      size={20} 
                      className={
                        isCurrent 
                          ? 'text-brand-gold' 
                          : isCompleted 
                          ? 'text-green-500'
                          : 'text-muted-foreground'
                      } 
                    />
                    {isCompleted && <CheckCircle size={16} className="text-green-500" />}
                  </div>
                  <h3 className={`text-sm font-medium ${
                    isCurrent ? 'text-brand-gold' : isCompleted ? 'text-green-700' : 'text-foreground'
                  }`}>
                    {section.title}
                  </h3>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Current Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="bg-brand-gold/10 p-3 rounded-lg">
              <currentSection.icon className="w-6 h-6 text-brand-gold" />
            </div>
            <div>
              <CardTitle className="text-xl text-brand-black">
                {currentSection.title}
              </CardTitle>
              <p className="text-muted-foreground">
                {currentSection.description}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <FormSection
            questions={currentSection.questions}
            initialData={answers[currentSection.id] || {}}
            onComplete={handleSectionComplete}
          />
          
          <div className="flex justify-start mt-8">
            <Button
              variant="outline"
              onClick={goToPreviousSection}
              disabled={currentSectionIndex === 0}
            >
              <ChevronLeft size={20} className="mr-2" />
              Seção Anterior
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};