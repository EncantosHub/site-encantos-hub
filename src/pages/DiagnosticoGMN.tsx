import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DiagnosticForm } from "@/components/gmn/DiagnosticForm";
import { DiagnosticResult } from "@/components/gmn/DiagnosticResult";
import { LeadCapture } from "@/components/gmn/LeadCapture";
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
  const [currentStep, setCurrentStep] = useState<'form' | 'leadCapture' | 'result'>('form');
  const [formData, setFormData] = useState<FormData>({
    identity: {},
    media: {},
    services: {},
    relationship: {},
    results: {}
  });
  const [leadData, setLeadData] = useState<LeadData | null>(null);

  useSEO({
    title: "Diagnóstico GMN - Análise Completa do Google Meu Negócio | Encantos Hub",
    description: "Faça uma análise completa do seu perfil do Google Meu Negócio e receba um diagnóstico personalizado com recomendações práticas.",
    canonical: "https://www.encantoshub.com.br/ferramentas/diagnostico-gmn",
    ogImage: "https://www.encantoshub.com.br/lovable-uploads/50eafc97-7976-48cf-86d3-511cd2eb5e68.png"
  });

  const handleFormComplete = (data: FormData) => {
    setFormData(data);
    setCurrentStep('leadCapture');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const handleLeadCapture = (lead: LeadData) => {
    setLeadData(lead);
    setCurrentStep('result');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
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
    setLeadData(null);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'form':
        return <DiagnosticForm onComplete={handleFormComplete} />;
      case 'leadCapture':
        return <LeadCapture diagnosticFormData={formData} onSubmit={handleLeadCapture} />;
      case 'result':
        return <DiagnosticResult formData={formData} leadData={leadData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-8">
        {/* Header Section */}
        <section className="relative bg-brand-black py-12 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("/lovable-uploads/f080db56-f2da-46b1-8475-f9e86ca135b9.png")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }} />
          </div>
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-brand-black/60"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                variant="ghost"
                onClick={handleBackToTools}
                className="text-brand-white hover:text-brand-gold hover:bg-brand-white/10"
              >
                <ArrowLeft size={20} className="mr-2" />
                Voltar para Ferramentas
              </Button>
              
              {(currentStep === 'result' || currentStep === 'leadCapture') && (
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