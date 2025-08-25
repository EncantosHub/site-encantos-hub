import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  TrendingUp, 
  Award,
  AlertTriangle
} from "lucide-react";
import { ChecklistCategory } from "@/pages/CMSSEOChecklist";

interface ChecklistSummaryProps {
  categories: ChecklistCategory[];
}

export const ChecklistSummary = ({ categories }: ChecklistSummaryProps) => {
  // Calculate overall statistics
  const totalItems = categories.reduce((sum, category) => sum + category.items.length, 0);
  const implementedCount = categories.reduce((sum, category) => 
    sum + category.items.filter(item => item.status === 'Implementado').length, 0
  );
  const inProgressCount = categories.reduce((sum, category) => 
    sum + category.items.filter(item => item.status === 'Em andamento').length, 0
  );
  const notImplementedCount = categories.reduce((sum, category) => 
    sum + category.items.filter(item => item.status === 'Não implementado').length, 0
  );

  // Calculate priority-based statistics
  const highPriorityItems = categories.reduce((sum, category) => 
    sum + category.items.filter(item => item.priority === 'Alto').length, 0
  );
  const highPriorityImplemented = categories.reduce((sum, category) => 
    sum + category.items.filter(item => item.priority === 'Alto' && item.status === 'Implementado').length, 0
  );

  const overallPercentage = totalItems > 0 ? Math.round((implementedCount / totalItems) * 100) : 0;
  const highPriorityPercentage = highPriorityItems > 0 ? Math.round((highPriorityImplemented / highPriorityItems) * 100) : 0;

  const getScoreLevel = (percentage: number) => {
    if (percentage >= 80) return { 
      level: 'Excelente', 
      color: 'text-green-600', 
      bgColor: 'bg-green-100', 
      borderColor: 'border-green-200',
      icon: Award
    };
    if (percentage >= 60) return { 
      level: 'Bom', 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-100', 
      borderColor: 'border-blue-200',
      icon: TrendingUp
    };
    if (percentage >= 40) return { 
      level: 'Regular', 
      color: 'text-yellow-600', 
      bgColor: 'bg-yellow-100', 
      borderColor: 'border-yellow-200',
      icon: AlertTriangle
    };
    return { 
      level: 'Crítico', 
      color: 'text-red-600', 
      bgColor: 'bg-red-100', 
      borderColor: 'border-red-200',
      icon: XCircle
    };
  };

  const scoreLevel = getScoreLevel(overallPercentage);
  const ScoreIcon = scoreLevel.icon;

  return (
    <div className="mb-8 space-y-6">
      {/* Overall Score Card */}
      <Card className={`border-2 ${scoreLevel.borderColor} ${scoreLevel.bgColor}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-full ${scoreLevel.bgColor} border ${scoreLevel.borderColor}`}>
                <ScoreIcon className={`w-6 h-6 ${scoreLevel.color}`} />
              </div>
              <div>
                <CardTitle className="text-2xl text-brand-black">
                  Pontuação SEO do seu CMS
                </CardTitle>
                <p className="text-muted-foreground">
                  Avaliação baseada em {totalItems} critérios essenciais
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-bold ${scoreLevel.color}`}>
                {overallPercentage}%
              </div>
              <Badge className={`${scoreLevel.bgColor} ${scoreLevel.color} border ${scoreLevel.borderColor}`}>
                {scoreLevel.level}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={overallPercentage} className="h-3" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm">
                  <strong className="text-green-600">{implementedCount}</strong> Implementados
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <span className="text-sm">
                  <strong className="text-yellow-600">{inProgressCount}</strong> Em andamento
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm">
                  <strong className="text-red-600">{notImplementedCount}</strong> Pendentes
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Priority Analysis and Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* High Priority Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-brand-black">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
              Itens de Alta Prioridade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-red-600">
                  {highPriorityPercentage}%
                </span>
                <span className="text-sm text-muted-foreground">
                  {highPriorityImplemented} de {highPriorityItems} implementados
                </span>
              </div>
              <Progress value={highPriorityPercentage} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Itens de alta prioridade são cruciais para SEO e devem ser implementados primeiro.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Category Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-brand-black">
              <TrendingUp className="w-5 h-5 mr-2 text-brand-gold" />
              Progresso por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.map((category) => {
                const implemented = category.items.filter(item => item.status === 'Implementado').length;
                const percentage = Math.round((implemented / category.items.length) * 100);
                const categoryScore = getScoreLevel(percentage);
                
                return (
                  <div key={category.id} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-brand-black truncate">
                      {category.title}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${categoryScore.bgColor} ${categoryScore.color} border ${categoryScore.borderColor} text-xs`}>
                        {percentage}%
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      {overallPercentage < 80 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <TrendingUp className="w-5 h-5 mr-2" />
              Próximos Passos Recomendados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-blue-800">
              {highPriorityPercentage < 100 && (
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    <strong>Prioridade 1:</strong> Foque nos itens de alta prioridade primeiro - eles têm maior impacto no SEO
                  </p>
                </div>
              )}
              {overallPercentage < 50 && (
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    <strong>Prioridade 2:</strong> Considere migrar para um CMS mais adequado para SEO se muitos itens não podem ser implementados
                  </p>
                </div>
              )}
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong>Dica:</strong> Marque os itens conforme for implementando para acompanhar seu progresso
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};