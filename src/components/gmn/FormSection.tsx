import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface Question {
  id: string;
  question: string;
  category: string;
}

interface FormSectionProps {
  questions: Question[];
  initialData: Record<string, string>;
  onComplete: (data: Record<string, string>) => void;
}

const answerOptions = [
  { value: 'yes', label: 'Sim / Correto', icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200', hoverColor: 'hover:bg-green-100' },
  { value: 'partial', label: 'Parcial / Precisa Revisar', icon: AlertTriangle, color: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200', hoverColor: 'hover:bg-yellow-100' },
  { value: 'no', label: 'Não / Ausente', icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200', hoverColor: 'hover:bg-red-100' }
];

export const FormSection = ({ questions, initialData, onComplete }: FormSectionProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>(initialData);

  useEffect(() => {
    setAnswers(initialData);
  }, [initialData]);

  const handleAnswerChange = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
  };

  const isComplete = questions.every(q => answers[q.id]);
  const completionCount = questions.filter(q => answers[q.id]).length;

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="bg-muted/30 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">
            Progresso da Seção
          </span>
          <span className="text-sm text-muted-foreground">
            {completionCount} de {questions.length} perguntas respondidas
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-brand-gold h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completionCount / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((question, index) => (
          <Card key={question.id} className="border-border hover:border-brand-gold/30 transition-colors">
            <CardContent className="p-6">
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="bg-brand-gold text-brand-black text-xs px-2 py-1 rounded-full font-medium">
                    {index + 1}
                  </span>
                  <h3 className="text-lg font-medium text-foreground">
                    {question.question}
                  </h3>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {answerOptions.map((option) => {
                  const IconComponent = option.icon;
                  const isSelected = answers[question.id] === option.value;
                  
                  return (
                    <Button
                      key={option.value}
                      variant="outline"
                      onClick={() => handleAnswerChange(question.id, option.value)}
                      className={`h-auto p-4 justify-start transition-all ${
                        isSelected 
                          ? `${option.bgColor} ${option.borderColor} ${option.color} border-2` 
                          : `border-border hover:border-brand-gold/50 ${option.hoverColor}`
                      }`}
                    >
                      <IconComponent size={20} className={`mr-3 ${isSelected ? option.color : 'text-muted-foreground'}`} />
                      <span className={`text-sm font-medium ${isSelected ? option.color : 'text-foreground'}`}>
                        {option.label}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Complete Button */}
      {isComplete && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              Seção Completa!
            </h3>
            <p className="text-green-600 mb-4">
              Todas as perguntas desta seção foram respondidas. 
              Clique em "Próxima Seção" para continuar.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};