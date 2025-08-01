import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Gift, FileText } from "lucide-react";
import { LeadData } from "@/pages/DiagnosticoGMN";

interface LeadCaptureProps {
  onSubmit: (data: LeadData) => void;
}

export const LeadCapture = ({ onSubmit }: LeadCaptureProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit(formData);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = formData.name && formData.email && formData.phone;

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-brand-gold/20 shadow-gold">
        <CardHeader className="text-center">
          <div className="bg-brand-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-brand-gold" />
          </div>
          <CardTitle className="text-2xl text-brand-black mb-2">
            Parabéns! Seu diagnóstico está pronto
          </CardTitle>
          <p className="text-muted-foreground">
            Para acessar seu relatório personalizado com recomendações específicas 
            para melhorar seu Google Meu Negócio, precisamos de algumas informações:
          </p>
        </CardHeader>
        
        <CardContent>
          {/* Benefits */}
          <div className="bg-muted/30 p-6 rounded-lg mb-8">
            <h3 className="font-semibold text-brand-black mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-brand-gold" />
              O que você receberá:
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-brand-gold rounded-full mt-2"></div>
                <span className="text-sm text-muted-foreground">
                  Relatório detalhado com sua pontuação por área
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-brand-gold rounded-full mt-2"></div>
                <span className="text-sm text-muted-foreground">
                  Recomendações personalizadas baseadas nas suas respostas
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-brand-gold rounded-full mt-2"></div>
                <span className="text-sm text-muted-foreground">
                  Plano de ação prático para melhorar seus resultados
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-brand-gold rounded-full mt-2"></div>
                <span className="text-sm text-muted-foreground">
                  Dicas exclusivas da nossa equipe especializada
                </span>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Nome completo *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Seu nome completo"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  E-mail *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  WhatsApp *
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium">
                  Nome da empresa
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Nome da sua empresa"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">
                    Seus dados estão seguros
                  </h4>
                  <p className="text-sm text-blue-700">
                    Utilizamos suas informações apenas para enviar o relatório e 
                    ocasionalmente compartilhar dicas valiosas sobre marketing digital. 
                    Você pode cancelar a qualquer momento.
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-semibold py-3 text-lg"
            >
              {isSubmitting ? 'Gerando seu relatório...' : 'Receber Meu Diagnóstico'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};