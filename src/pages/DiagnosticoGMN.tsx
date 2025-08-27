import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DiagnosticForm } from "@/components/gmn/DiagnosticForm";
import { DiagnosticResult } from "@/components/gmn/DiagnosticResult";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

export interface FormData {
  identity: Record<string, string>;
  media: Record<string, string>;
  services: Record<string, string>;
  relationship: Record<string, string>;
  results: Record<string, string>;
}

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  company: string;
}

const DiagnosticoGMN = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'form' | 'result'>('form');
  const [formData, setFormData] = useState<FormData>({
    identity: {},
    media: {},
    services: {},
    relationship: {},
    results: {}
  });

  useSEO({
    title: "Diagnóstico GMN - Análise Completa do Google Meu Negócio | Encantos Hub",
    description: "Faça uma análise completa do seu perfil do Google Meu Negócio e receba um diagnóstico personalizado com recomendações práticas.",
    canonical: "https://www.encantoshub.com.br/ferramentas/diagnostico-gmn",
    ogImage: "https://www.encantoshub.com.br/lovable-uploads/50eafc97-7976-48cf-86d3-511cd2eb5e68.png"
  });

  const handleFormComplete = (data: FormData) => {
    setFormData(data);
    setCurrentStep('result');
  };

  const handleBackToTools = () => {
    navigate('/ferramentas');
  };

  const handleRestartDiagnosis = () => {
    setCurrentStep('form');
    setFormData({
      identity: {},
      media: {},
      services: {},
      relationship: {},
      results: {}
    });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'form':
        return <DiagnosticForm onComplete={handleFormComplete} />;
      case 'result':
        return <DiagnosticResult formData={formData} leadData={null} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-8">
        {/* Header Section */}
        <section className="bg-gradient-hero py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                variant="ghost"
                onClick={handleBackToTools}
                className="text-brand-white hover:text-brand-gold hover:bg-brand-white/10"
              >
                <ArrowLeft size={20} className="mr-2" />
                Voltar para Ferramentas
              </Button>
              
              {currentStep === 'result' && (
                <Button
                  variant="ghost"
                  onClick={handleRestartDiagnosis}
                  className="text-brand-white hover:text-brand-gold hover:bg-brand-white/10"
                >
                  Fazer Novo Diagnóstico
                </Button>
              )}
            </div>
            
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-brand-white mb-4">
                Diagnóstico <span className="text-brand-gold">GMN</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Avalie seu perfil do Google Meu Negócio e receba um diagnóstico 
                personalizado com recomendações práticas para melhorar sua presença digital
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {renderCurrentStep()}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DiagnosticoGMN;