import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ChevronRight, ChevronLeft } from "lucide-react";

interface Question {
  id: string;
  question: string;
  category: string;
  explanation?: string;
}

interface FormSectionProps {
  questions: Question[];
  initialData: Record<string, string>;
  onComplete: (data: Record<string, string>) => void;
}

const answerOptions = [
  { value: 'yes', label: 'Sim', icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200', hoverColor: 'hover:bg-green-100' },
  { value: 'no', label: 'Não', icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200', hoverColor: 'hover:bg-red-100' }
];

export const FormSection = ({ questions, initialData, onComplete }: FormSectionProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>(initialData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    setAnswers(initialData);
    // Find the first unanswered question or start from the beginning
    const firstUnanswered = questions.findIndex(q => !initialData[q.id]);
    setCurrentQuestionIndex(firstUnanswered >= 0 ? firstUnanswered : 0);
  }, [initialData, questions]);

  const handleAnswerChange = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    // Auto advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // All questions answered, complete the section
        onComplete(newAnswers);
      }
    }, 300);
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(answers);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const completionCount = questions.filter(q => answers[q.id]).length;
  const isCurrentAnswered = answers[currentQuestion?.id];

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="bg-muted/30 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">
            Progresso da Seção
          </span>
          <span className="text-sm text-muted-foreground">
            {currentQuestionIndex + 1} de {questions.length} | {completionCount} respondidas
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-brand-gold h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Question */}
      {currentQuestion && (
        <Card className="border-brand-gold/30">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 mb-4">
                <span className="bg-brand-gold text-brand-black text-sm px-3 py-1 rounded-full font-medium">
                  Pergunta {currentQuestionIndex + 1}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                {currentQuestion.question}
              </h3>
              
              {currentQuestion.explanation && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-6 text-left max-w-2xl mx-auto">
                  <p className="text-sm text-blue-800 leading-relaxed">
                    <span className="font-medium">💡 Dica:</span> {currentQuestion.explanation}
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-center space-x-4 mb-8">
              {answerOptions.map((option) => {
                const IconComponent = option.icon;
                const isSelected = answers[currentQuestion.id] === option.value;
                
                return (
                  <Button
                    key={option.value}
                    variant="outline"
                    onClick={() => handleAnswerChange(currentQuestion.id, option.value)}
                    className={`h-16 px-8 text-lg font-medium transition-all transform hover:scale-105 ${
                      isSelected 
                        ? `${option.bgColor} ${option.borderColor} ${option.color} border-2 shadow-lg` 
                        : `border-border hover:border-brand-gold/50 ${option.hoverColor}`
                    }`}
                  >
                    <IconComponent size={24} className={`mr-3 ${isSelected ? option.color : 'text-muted-foreground'}`} />
                    <span className={isSelected ? option.color : 'text-foreground'}>
                      {option.label}
                    </span>
                  </Button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft size={20} className="mr-2" />
                Anterior
              </Button>
              
              <div className="text-sm text-muted-foreground">
                {isCurrentAnswered ? "Avançando automaticamente..." : "Selecione uma resposta"}
              </div>
              
              <Button
                variant="ghost"
                onClick={goToNextQuestion}
                disabled={!isCurrentAnswered}
                className="text-muted-foreground hover:text-foreground"
              >
                {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Próxima'}
                <ChevronRight size={20} className="ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};