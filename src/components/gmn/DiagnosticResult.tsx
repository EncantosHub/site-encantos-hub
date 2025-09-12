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
import { useToast } from "@/hooks/use-toast";

interface DiagnosticResultProps {
  formData: FormData;
  leadData: LeadData | null;
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
  
  const yesCount = values.filter(value => value === 'yes').length;
  return Math.round((yesCount / values.length) * 100);
};

const getScoreColor = (score: number) => {
  if (score >= 70) return { color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200' };
  if (score >= 40) return { color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200' };
  return { color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200' };
};

const getScoreStatus = (score: number) => {
  if (score >= 70) return { icon: CheckCircle, label: 'Muito Bom', description: 'Perfil bem otimizado!' };
  if (score >= 40) return { icon: AlertTriangle, label: 'Precisa Melhorar', description: 'Tem potencial de crescimento' };
  return { icon: XCircle, label: 'Crítico', description: 'Necessita otimização urgente' };
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
  const { toast } = useToast();
  const sectionScores = Object.entries(formData).map(([section, data]) => ({
    section,
    score: calculateScore(data),
    data,
    yesCount: Object.values(data).filter(v => v === 'yes').length,
    noCount: Object.values(data).filter(v => v === 'no').length,
    totalQuestions: Object.values(data).length
  }));

  const overallScore = Math.round(
    sectionScores.reduce((acc, { score }) => acc + score, 0) / sectionScores.length
  );

  const overallStatus = getScoreStatus(overallScore);
  const overallColors = getScoreColor(overallScore);

  // Identify strengths and weaknesses
  const strengths = sectionScores.filter(s => s.score >= 70);
  const weaknesses = sectionScores.filter(s => s.score < 40);
  const improvementAreas = sectionScores.filter(s => s.score >= 40 && s.score < 70);

  const handleDownloadReport = () => {
    // Create a new window for the PDF
    const printWindow = window.open('', '_blank');
    const currentDate = new Date().toLocaleDateString('pt-BR');
    
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Diagnóstico GMN - ${leadData?.name || 'Cliente'} | Encantos Hub</title>
            <meta charset="utf-8">
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                line-height: 1.6;
                color: #333;
                background: white;
              }
              
              .page {
                max-width: 210mm;
                margin: 0 auto;
                padding: 20mm;
                page-break-after: always;
              }
              
              .page:last-child {
                page-break-after: avoid;
              }
              
              .header {
                text-align: center;
                margin-bottom: 40px;
                padding-bottom: 20px;
                border-bottom: 3px solid #D4AF37;
              }
              
              .header h1 {
                font-size: 28px;
                color: #D4AF37;
                margin-bottom: 10px;
              }
              
              .header .subtitle {
                font-size: 16px;
                color: #666;
                margin-bottom: 5px;
              }
              
              .header .date {
                font-size: 14px;
                color: #888;
              }
              
              .score-circle {
                width: 120px;
                height: 120px;
                margin: 0 auto 30px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              
              .overall-score {
                text-align: center;
                margin-bottom: 40px;
                page-break-inside: avoid;
              }
              
              .overall-score h2 {
                font-size: 48px;
                color: ${overallScore >= 70 ? '#059669' : overallScore >= 40 ? '#D97706' : '#DC2626'};
                margin-bottom: 10px;
              }
              
              .status-badge {
                display: inline-block;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: bold;
                background: ${overallScore >= 70 ? '#ECFDF5' : overallScore >= 40 ? '#FEF3C7' : '#FEE2E2'};
                color: ${overallScore >= 70 ? '#059669' : overallScore >= 40 ? '#D97706' : '#DC2626'};
                border: 2px solid ${overallScore >= 70 ? '#BBF7D0' : overallScore >= 40 ? '#FDE68A' : '#FECACA'};
              }
              
              .summary-grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 20px;
                margin-bottom: 40px;
                page-break-inside: avoid;
              }
              
              .summary-card {
                padding: 20px;
                border-radius: 8px;
                border: 2px solid;
              }
              
              .strengths {
                background: #ECFDF5;
                border-color: #BBF7D0;
                color: #059669;
              }
              
              .improvements {
                background: #FEF3C7;
                border-color: #FDE68A;
                color: #D97706;
              }
              
              .weaknesses {
                background: #FEE2E2;
                border-color: #FECACA;
                color: #DC2626;
              }
              
              .summary-card h3 {
                font-size: 16px;
                margin-bottom: 15px;
                font-weight: bold;
              }
              
              .summary-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
                font-size: 14px;
              }
              
              .section-analysis {
                page-break-before: always;
              }
              
              .section-item {
                margin-bottom: 30px;
                padding: 20px;
                border: 1px solid #E5E7EB;
                border-radius: 8px;
                page-break-inside: avoid;
              }
              
              .section-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
              }
              
              .section-title {
                font-size: 18px;
                font-weight: bold;
                color: #374151;
              }
              
              .section-score {
                font-size: 24px;
                font-weight: bold;
              }
              
              .progress-bar {
                width: 100%;
                height: 8px;
                background: #F3F4F6;
                border-radius: 4px;
                overflow: hidden;
                margin: 10px 0;
              }
              
              .progress-fill {
                height: 100%;
                border-radius: 4px;
              }
              
              .recommendations {
                page-break-before: always;
              }
              
              .recommendation-section {
                margin-bottom: 40px;
                padding: 20px;
                border-left: 4px solid #D4AF37;
                page-break-inside: avoid;
              }
              
              .recommendation-section h4 {
                font-size: 18px;
                color: #374151;
                margin-bottom: 15px;
              }
              
              .recommendation-list {
                list-style: none;
              }
              
              .recommendation-list li {
                display: flex;
                margin-bottom: 10px;
                align-items: flex-start;
              }
              
              .recommendation-number {
                background: #D4AF37;
                color: white;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
                margin-right: 12px;
                flex-shrink: 0;
              }
              
              .footer {
                text-align: center;
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #E5E7EB;
                color: #6B7280;
                font-size: 14px;
              }
              
              @media print {
                .page {
                  margin: 0;
                  page-break-after: always;
                }
                
                .section-analysis {
                  page-break-before: always;
                }
                
                .recommendations {
                  page-break-before: always;
                }
              }
            </style>
          </head>
          <body>
            <!-- Page 1: Overall Results -->
            <div class="page">
              <div class="header">
                <h1>📊 Diagnóstico GMN - Análise Completa do Google Meu Negócio</h1>
                <div class="subtitle">Encantos Hub</div>
                <div class="date">${currentDate}, 10:51</div>
              </div>
              
              <div class="overall-score">
                <div class="score-circle">
                  <h2>${overallScore}%</h2>
                </div>
                <div class="status-badge">
                  ${getScoreStatus(overallScore).label} - ${getScoreStatus(overallScore).description}
                </div>
              </div>
              
              <div class="summary-grid">
                <div class="summary-card strengths">
                  <h3>✅ Pontos Fortes</h3>
                  ${strengths.length > 0 ? 
                    strengths.map(({ section, score }) => 
                      `<div class="summary-item">
                        <span>${sectionTitles[section as keyof typeof sectionTitles]}</span>
                        <strong>${score}%</strong>
                      </div>`
                    ).join('') : 
                    '<p>Ainda não há pontos fortes identificados.</p>'
                  }
                </div>
                
                <div class="summary-card improvements">
                  <h3>⚠️ Pode Melhorar</h3>
                  ${improvementAreas.length > 0 ? 
                    improvementAreas.map(({ section, score }) => 
                      `<div class="summary-item">
                        <span>${sectionTitles[section as keyof typeof sectionTitles]}</span>
                        <strong>${score}%</strong>
                      </div>`
                    ).join('') : 
                    '<p>Ótimo! Não há áreas intermediárias.</p>'
                  }
                </div>
                
                <div class="summary-card weaknesses">
                  <h3>❌ Pontos Críticos</h3>
                  ${weaknesses.length > 0 ? 
                    weaknesses.map(({ section, score }) => 
                      `<div class="summary-item">
                        <span>${sectionTitles[section as keyof typeof sectionTitles]}</span>
                        <strong>${score}%</strong>
                      </div>`
                    ).join('') : 
                    '<p>Excelente! Não há pontos críticos.</p>'
                  }
                </div>
              </div>
              
              <div class="footer">
                <p>Relatório gerado automaticamente pela plataforma Encantos Hub</p>
                <p>Para mais informações e consultoria personalizada, entre em contato conosco</p>
              </div>
            </div>
            
            <!-- Page 2: Detailed Analysis -->
            <div class="page section-analysis">
              <div class="header">
                <h1>📈 Análise Detalhada por Seção</h1>
              </div>
              
              ${sectionScores.map(({ section, score, yesCount, noCount }) => {
                const colors = getScoreColor(score);
                const status = getScoreStatus(score);
                return `
                  <div class="section-item">
                    <div class="section-header">
                      <div class="section-title">${sectionTitles[section as keyof typeof sectionTitles]}</div>
                      <div class="section-score" style="color: ${score >= 70 ? '#059669' : score >= 40 ? '#D97706' : '#DC2626'}">${score}%</div>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width: ${score}%; background: ${score >= 70 ? '#059669' : score >= 40 ? '#D97706' : '#DC2626'}"></div>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 14px; color: #6B7280; margin-top: 8px;">
                      <span>✅ ${yesCount} implementados</span>
                      <span>❌ ${noCount} pendentes</span>
                    </div>
                    <div style="margin-top: 10px; padding: 10px; background: ${score >= 70 ? '#ECFDF5' : score >= 40 ? '#FEF3C7' : '#FEE2E2'}; border-radius: 6px;">
                      <strong>${status.label}</strong> - ${status.description}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
            
            <!-- Page 3: Action Plan -->
            <div class="page recommendations">
              <div class="header">
                <h1>🎯 Plano de Ação Personalizado</h1>
              </div>
              
              ${sectionScores
                .filter(({ score }) => score < 70)
                .sort((a, b) => a.score - b.score)
                .map(({ section, score }) => {
                  const recommendations = getRecommendations(section, score);
                  return `
                    <div class="recommendation-section">
                      <h4>${sectionTitles[section as keyof typeof sectionTitles]} - ${score}% (Prioridade ${score < 40 ? 'Alta' : 'Média'})</h4>
                      <p style="margin-bottom: 15px; color: #6B7280;">🎯 Ações recomendadas (ordem de prioridade):</p>
                      <ul class="recommendation-list">
                        ${recommendations.map((rec, index) => `
                          <li>
                            <div class="recommendation-number">${index + 1}</div>
                            <span>${rec}</span>
                          </li>
                        `).join('')}
                      </ul>
                    </div>
                  `;
                }).join('')
              }
              
              ${sectionScores.every(({ score }) => score >= 70) ? `
                <div style="text-align: center; padding: 40px 0;">
                  <div style="font-size: 48px; margin-bottom: 20px;">🎉</div>
                  <h3 style="color: #059669; font-size: 24px; margin-bottom: 10px;">Parabéns! Seu perfil GMN está muito bem otimizado!</h3>
                  <p style="color: #059669;">Continue monitorando e atualizando regularmente para manter a excelência.</p>
                </div>
              ` : ''}
              
              <div class="footer">
                <p><strong>Encantos Hub</strong> - Especialistas em Marketing Digital e Google Meu Negócio</p>
                <p>Este relatório foi gerado automaticamente com base nas suas respostas do diagnóstico</p>
              </div>
            </div>
          </body>
        </html>
      `);
      
      printWindow.document.close();
      
      // Wait a moment for content to load then print
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

  const handleShareReport = () => {
    const shareData = {
      title: `Diagnóstico GMN - ${leadData?.name || 'Cliente'} | Encantos Hub`,
      text: `Acabei de fazer meu diagnóstico do Google Meu Negócio e obtive ${overallScore}% de otimização! 📊`,
      url: window.location.href
    };
    
    if (navigator.share) {
      navigator.share(shareData).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        toast({
          title: "Link copiado!",
          description: "O link foi copiado para sua área de transferência."
        });
      });
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para sua área de transferência."
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8" id="diagnostic-result">
      {/* Header with Overall Score */}
      <Card className={`border-2 ${overallColors.border} ${overallColors.bg}`}>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className={`p-3 rounded-full ${overallColors.bg} border ${overallColors.border}`}>
              <overallStatus.icon className={`w-8 h-8 ${overallColors.color}`} />
            </div>
            <div>
              <CardTitle className="text-3xl text-brand-black">
                Seu Diagnóstico GMN
              </CardTitle>
              <p className="text-muted-foreground">
                Análise completa do seu Google Meu Negócio
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
                <div className={`text-3xl font-bold ${overallColors.color}`}>{overallScore}%</div>
                <div className="text-sm text-muted-foreground">otimização</div>
              </div>
            </div>
          </div>

          <Badge className={`${overallColors.bg} ${overallColors.color} border ${overallColors.border}`}>
            <overallStatus.icon className="w-4 h-4 mr-2" />
            {overallStatus.label} - {overallStatus.description}
          </Badge>
        </CardHeader>
      </Card>

      {/* Strengths and Weaknesses Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Strengths */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-700 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Pontos Fortes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {strengths.length > 0 ? (
              <ul className="space-y-2">
                {strengths.map(({ section, score }) => (
                  <li key={section} className="flex justify-between items-center">
                    <span className="text-sm text-green-800">
                      {sectionTitles[section as keyof typeof sectionTitles]}
                    </span>
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      {score}%
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-green-700">
                Ainda não há pontos fortes identificados. Vamos trabalhar para melhorar!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Areas for Improvement */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-700 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Pode Melhorar
            </CardTitle>
          </CardHeader>
          <CardContent>
            {improvementAreas.length > 0 ? (
              <ul className="space-y-2">
                {improvementAreas.map(({ section, score }) => (
                  <li key={section} className="flex justify-between items-center">
                    <span className="text-sm text-yellow-800">
                      {sectionTitles[section as keyof typeof sectionTitles]}
                    </span>
                    <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                      {score}%
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-yellow-700">
                Ótimo! Não há áreas intermediárias para melhorar.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Weaknesses */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center">
              <XCircle className="w-5 h-5 mr-2" />
              Pontos Críticos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {weaknesses.length > 0 ? (
              <ul className="space-y-2">
                {weaknesses.map(({ section, score }) => (
                  <li key={section} className="flex justify-between items-center">
                    <span className="text-sm text-red-800">
                      {sectionTitles[section as keyof typeof sectionTitles]}
                    </span>
                    <Badge className="bg-red-100 text-red-700 border-red-200">
                      {score}%
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-red-700">
                Excelente! Não há pontos críticos no seu perfil.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

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

      {/* Section Scores Detailed */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-black">
            Análise Detalhada por Área
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sectionScores.map(({ section, score, yesCount, noCount, totalQuestions }) => {
              const IconComponent = sectionIcons[section as keyof typeof sectionIcons];
              const colors = getScoreColor(score);
              const status = getScoreStatus(score);
              
              return (
                <div key={section} className={`p-4 rounded-lg border ${colors.border} ${colors.bg}`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <IconComponent className={`w-6 h-6 ${colors.color}`} />
                    <div>
                      <h3 className="font-semibold text-brand-black">
                        {sectionTitles[section as keyof typeof sectionTitles]}
                      </h3>
                      <Badge className={`${colors.bg} ${colors.color} border ${colors.border}`}>
                        {status.label}
                      </Badge>
                    </div>
                    <div className="ml-auto text-right">
                      <div className={`text-2xl font-bold ${colors.color}`}>{score}%</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Progress value={score} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>✅ {yesCount} implementados</span>
                      <span>❌ {noCount} pendentes</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-brand-black">
            <Award className="w-6 h-6 mr-3 text-brand-gold" />
            Plano de Ação Personalizado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {sectionScores
              .filter(({ score }) => score < 70)
              .sort((a, b) => a.score - b.score) // Start with lowest scores
              .map(({ section, score }) => {
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
                        {score}% - Prioridade {score < 40 ? 'Alta' : 'Média'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-muted-foreground mb-3">
                        🎯 Ações recomendadas (ordem de prioridade):
                      </h4>
                      <ul className="space-y-2">
                        {recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="bg-brand-gold text-brand-black text-xs px-2 py-1 rounded-full font-medium min-w-[24px] text-center">
                              {index + 1}
                            </span>
                            <span className="text-sm text-muted-foreground">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
              
            {sectionScores.every(({ score }) => score >= 70) && (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  Parabéns! Seu perfil GMN está muito bem otimizado!
                </h3>
                <p className="text-green-600">
                  Continue monitorando e atualizando regularmente para manter a excelência.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Share and Download Options */}
      <Card className="border-brand-gold/20">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Compartilhe ou Baixe seu Diagnóstico
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                const shareData = {
                  title: 'Meu Diagnóstico GMN - Encantos Hub',
                  text: `Acabei de fazer meu diagnóstico do Google Meu Negócio e obtive ${overallScore}% de otimização!`,
                  url: window.location.href
                };
                
                if (navigator.share) {
                  navigator.share(shareData);
                } else {
                  navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                  toast({
                    title: "Link copiado!",
                    description: "O link foi copiado para sua área de transferência."
                  });
                }
              }}
              variant="outline"
              className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar Resultado
            </Button>
            
            <Button
              onClick={handleDownloadReport}
              variant="outline"
              className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar PDF
            </Button>
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