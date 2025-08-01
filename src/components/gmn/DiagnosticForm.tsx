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
      { id: 'business_name', question: 'O nome do seu negócio está correto e completo?', category: 'identity' },
      { id: 'category', question: 'A categoria principal do seu negócio está adequada?', category: 'identity' },
      { id: 'address', question: 'O endereço está correto e detalhado?', category: 'identity' },
      { id: 'phone', question: 'O telefone está atualizado e funcional?', category: 'identity' },
      { id: 'website', question: 'O site está vinculado corretamente?', category: 'identity' },
      { id: 'hours', question: 'Os horários de funcionamento estão atualizados?', category: 'identity' },
      { id: 'holiday_hours', question: 'Os horários especiais e feriados estão configurados?', category: 'identity' }
    ]
  },
  {
    id: 'media',
    title: 'Mídia e Conteúdo Visual',
    icon: Camera,
    description: 'Fotos de perfil, capa, internas e posts',
    questions: [
      { id: 'profile_photo', question: 'Possui foto de perfil de alta qualidade?', category: 'media' },
      { id: 'cover_photo', question: 'A foto de capa representa bem o negócio?', category: 'media' },
      { id: 'interior_photos', question: 'Tem fotos internas do estabelecimento?', category: 'media' },
      { id: 'exterior_photos', question: 'Tem fotos externas do estabelecimento?', category: 'media' },
      { id: 'product_photos', question: 'Possui fotos dos produtos/serviços?', category: 'media' },
      { id: 'team_photos', question: 'Tem fotos da equipe trabalhando?', category: 'media' },
      { id: 'recent_photos', question: 'As fotos são recentes (menos de 6 meses)?', category: 'media' },
      { id: 'posts_frequency', question: 'Publica posts regularmente (pelo menos 1x por semana)?', category: 'media' }
    ]
  },
  {
    id: 'services',
    title: 'Serviços e Produtos',
    icon: Package,
    description: 'Descrições, atributos e informações sobre ofertas',
    questions: [
      { id: 'description', question: 'A descrição do negócio é completa e atrativa?', category: 'services' },
      { id: 'services_list', question: 'Todos os serviços principais estão listados?', category: 'services' },
      { id: 'attributes', question: 'Os atributos relevantes estão configurados?', category: 'services' },
      { id: 'products', question: 'Os produtos estão cadastrados com fotos e preços?', category: 'services' },
      { id: 'menu', question: 'O cardápio/catálogo está atualizado?', category: 'services' },
      { id: 'special_offers', question: 'Ofertas especiais estão destacadas?', category: 'services' }
    ]
  },
  {
    id: 'relationship',
    title: 'Relacionamento com Clientes',
    icon: MessageSquare,
    description: 'Avaliações, mensagens e interação',
    questions: [
      { id: 'reviews_quantity', question: 'Possui mais de 10 avaliações?', category: 'relationship' },
      { id: 'recent_reviews', question: 'Recebeu avaliações nos últimos 30 dias?', category: 'relationship' },
      { id: 'review_responses', question: 'Responde às avaliações regularmente?', category: 'relationship' },
      { id: 'messaging', question: 'A função de mensagens está ativada?', category: 'relationship' },
      { id: 'response_time', question: 'Responde mensagens em até 24 horas?', category: 'relationship' },
      { id: 'q_and_a', question: 'Monitora e responde perguntas dos usuários?', category: 'relationship' }
    ]
  },
  {
    id: 'results',
    title: 'Resultados e Monitoramento',
    icon: BarChart3,
    description: 'Insights, métricas e análises',
    questions: [
      { id: 'insights_monitoring', question: 'Monitora os insights semanalmente?', category: 'results' },
      { id: 'photo_views', question: 'As fotos têm bom engajamento (visualizações)?', category: 'results' },
      { id: 'discovery_searches', question: 'Aparece em pesquisas de descoberta?', category: 'results' },
      { id: 'direct_searches', question: 'Recebe pesquisas diretas pelo nome?', category: 'results' },
      { id: 'actions_tracking', question: 'Acompanha ações dos usuários (chamadas, direções)?', category: 'results' },
      { id: 'competitor_comparison', question: 'Compara performance com concorrentes?', category: 'results' }
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
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={goToPreviousSection}
              disabled={currentSectionIndex === 0}
            >
              <ChevronLeft size={20} className="mr-2" />
              Anterior
            </Button>
            
            <Button
              onClick={() => {
                const sectionAnswers = answers[currentSection.id] || {};
                handleSectionComplete(sectionAnswers);
              }}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black"
            >
              {currentSectionIndex === sections.length - 1 ? 'Finalizar Diagnóstico' : 'Próxima Seção'}
              <ChevronRight size={20} className="ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};