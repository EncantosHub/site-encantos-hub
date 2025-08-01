import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Download, 
  Share2,
  User,
  Camera,
  Package,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Award
} from "lucide-react";
import { FormData, LeadData } from "@/pages/DiagnosticoGMN";

interface DiagnosticResultProps {
  formData: FormData;
  leadData: LeadData;
}

const sectionIcons = {
  identity: User,
  media: Camera,
  services: Package,
  relationship: MessageSquare,
  results: BarChart3
};

const sectionTitles = {
  identity: 'Identidade e Informações',
  media: 'Mídia e Conteúdo',
  services: 'Serviços e Produtos',
  relationship: 'Relacionamento',
  results: 'Resultados e Monitoramento'
};

const calculateScore = (sectionData: Record<string, string>) => {
  const values = Object.values(sectionData);
  if (values.length === 0) return 0;
  
  const points = values.reduce((acc, value) => {
    switch (value) {
      case 'yes': return acc + 100;
      case 'partial': return acc + 50;
      case 'no': return acc + 0;
      default: return acc;
    }
  }, 0);
  
  return Math.round(points / values.length);
};

const getScoreColor = (score: number) => {
  if (score >= 80) return { color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200' };
  if (score >= 50) return { color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200' };
  return { color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200' };
};

const getScoreStatus = (score: number) => {
  if (score >= 80) return { icon: CheckCircle, label: 'Excelente', description: 'Muito bem otimizado!' };
  if (score >= 50) return { icon: AlertTriangle, label: 'Atenção', description: 'Precisa de melhorias' };
  return { icon: XCircle, label: 'Crítico', description: 'Necessita ação urgente' };
};

const getRecommendations = (section: string, score: number) => {
  const recommendations: Record<string, string[]> = {
    identity: [
      'Complete todas as informações básicas do perfil',
      'Verifique se o endereço está correto e detalhado',
      'Mantenha os horários sempre atualizados',
      'Configure horários especiais para feriados'
    ],
    media: [
      'Adicione fotos de alta qualidade do estabelecimento',
      'Mantenha as fotos sempre atualizadas',
      'Publique posts regularmente para engajamento',
      'Inclua fotos da equipe e dos produtos/serviços'
    ],
    services: [
      'Escreva uma descrição completa e atrativa',
      'Liste todos os serviços oferecidos',
      'Configure os atributos relevantes',
      'Mantenha produtos e preços atualizados'
    ],
    relationship: [
      'Incentive clientes a deixarem avaliações',
      'Responda todas as avaliações, positivas e negativas',
      'Ative a função de mensagens',
      'Monitore e responda perguntas dos usuários'
    ],
    results: [
      'Acompanhe os insights semanalmente',
      'Analise quais fotos têm melhor performance',
      'Compare sua performance com concorrentes',
      'Monitore as ações dos usuários no perfil'
    ]
  };
  
  return recommendations[section] || [];
};

export const DiagnosticResult = ({ formData, leadData }: DiagnosticResultProps) => {
  const sectionScores = Object.entries(formData).map(([section, data]) => ({
    section,
    score: calculateScore(data),
    data
  }));

  const overallScore = Math.round(
    sectionScores.reduce((acc, { score }) => acc + score, 0) / sectionScores.length
  );

  const overallStatus = getScoreStatus(overallScore);
  const overallColors = getScoreColor(overallScore);

  const handleDownloadReport = () => {
    window.print();
  };

  const handleShareReport = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header with Overall Score */}
      <Card className={`border-2 ${overallColors.border} ${overallColors.bg}`}>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className={`p-3 rounded-full ${overallColors.bg} border ${overallColors.border}`}>
              <overallStatus.icon className={`w-8 h-8 ${overallColors.color}`} />
            </div>
            <div>
              <CardTitle className="text-3xl text-brand-black">
                Olá, {leadData.name}!
              </CardTitle>
              <p className="text-muted-foreground">
                Aqui está seu diagnóstico personalizado
              </p>
            </div>
          </div>
          
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-muted-foreground/20"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - overallScore / 100)}`}
                className={overallColors.color}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-3xl font-bold ${overallColors.color}`}>{overallScore}</div>
                <div className="text-sm text-muted-foreground">pontos</div>
              </div>
            </div>
          </div>

          <Badge className={`${overallColors.bg} ${overallColors.color} border ${overallColors.border}`}>
            <overallStatus.icon className="w-4 h-4 mr-2" />
            {overallStatus.label} - {overallStatus.description}
          </Badge>
        </CardHeader>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={handleDownloadReport}
          className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black"
        >
          <Download className="w-4 h-4 mr-2" />
          Baixar Relatório
        </Button>
        <Button 
          variant="outline"
          onClick={handleShareReport}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Compartilhar
        </Button>
      </div>

      {/* Section Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectionScores.map(({ section, score }) => {
          const IconComponent = sectionIcons[section as keyof typeof sectionIcons];
          const colors = getScoreColor(score);
          const status = getScoreStatus(score);
          
          return (
            <Card key={section} className={`border ${colors.border} hover:shadow-lg transition-shadow`}>
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${colors.bg}`}>
                    <IconComponent className={`w-5 h-5 ${colors.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium text-brand-black">
                      {sectionTitles[section as keyof typeof sectionTitles]}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-2xl font-bold ${colors.color}`}>{score}</span>
                  <Badge className={`${colors.bg} ${colors.color} border ${colors.border}`}>
                    <status.icon className="w-3 h-3 mr-1" />
                    {status.label}
                  </Badge>
                </div>
                <Progress value={score} className="h-2" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-brand-black">
            <Award className="w-6 h-6 mr-3 text-brand-gold" />
            Recomendações Personalizadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {sectionScores.map(({ section, score }) => {
              const IconComponent = sectionIcons[section as keyof typeof sectionIcons];
              const colors = getScoreColor(score);
              const recommendations = getRecommendations(section, score);
              
              return (
                <div key={section} className="border-l-4 border-brand-gold pl-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <IconComponent className="w-5 h-5 text-brand-gold" />
                    <h3 className="text-lg font-semibold text-brand-black">
                      {sectionTitles[section as keyof typeof sectionTitles]}
                    </h3>
                    <Badge className={`${colors.bg} ${colors.color} border ${colors.border}`}>
                      {score} pontos
                    </Badge>
                  </div>
                  
                  {score < 80 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-muted-foreground mb-3">
                        Próximos passos para melhorar:
                      </h4>
                      <ul className="space-y-2">
                        {recommendations.slice(0, score < 50 ? 4 : 2).map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <TrendingUp className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {score >= 80 && (
                    <p className="text-sm text-green-600">
                      ✅ Excelente! Esta área está bem otimizada. Continue assim!
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-gradient-hero text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Quer acelerar seus resultados?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Nossa equipe especializada pode implementar todas essas melhorias 
            para você e garantir que seu Google Meu Negócio esteja 100% otimizado.
          </p>
          <Button
            onClick={() => window.open("https://wa.me/5511964721143?text=Olá! Acabei de fazer o diagnóstico GMN e gostaria de uma consultoria personalizada.", "_blank")}
            className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-semibold px-8 py-3"
          >
            Falar com Especialista
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};