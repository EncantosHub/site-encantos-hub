import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { ChecklistCategory } from "@/components/cms-checklist/ChecklistCategory";
import { ChecklistSummary } from "@/components/cms-checklist/ChecklistSummary";
import { checklistData } from "@/lib/cmsChecklistData";

export interface ChecklistItem {
  id: string;
  title: string;
  priority: 'Alto' | 'Médio' | 'Baixo';
  status: 'Implementado' | 'Em andamento' | 'Não implementado';
  description?: string;
}

export interface ChecklistCategory {
  id: string;
  title: string;
  icon: any;
  items: ChecklistItem[];
}

const CMSSEOChecklist = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ChecklistCategory[]>(checklistData);

  useSEO({
    title: "Checklist CMS SEO - Avaliação Completa | Encantos Hub",
    description: "Ferramenta interativa para avaliar se seu CMS atende todos os requisitos essenciais de SEO. Checklist completo com pontuação visual.",
    canonical: "https://www.encantoshub.com.br/ferramentas/cms-seo-checklist"
  });

  const handleBackToTools = () => {
    navigate('/ferramentas');
  };

  const updateItemStatus = (categoryId: string, itemId: string, status: ChecklistItem['status']) => {
    setCategories(prev => prev.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.map(item => {
            if (item.id === itemId) {
              return { ...item, status };
            }
            return item;
          })
        };
      }
      return category;
    }));
  };

  const resetChecklist = () => {
    setCategories(checklistData.map(category => ({
      ...category,
      items: category.items.map(item => ({
        ...item,
        status: 'Não implementado' as const
      }))
    })));
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
              
              <Button
                variant="ghost"
                onClick={resetChecklist}
                className="text-brand-white hover:text-brand-gold hover:bg-brand-white/10"
              >
                Resetar Checklist
              </Button>
            </div>
            
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-brand-white mb-4">
                Checklist <span className="text-brand-gold">CMS SEO</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Avalie se seu CMS atende todos os requisitos essenciais de SEO. 
                Marque cada item conforme implementado e veja sua pontuação em tempo real.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Summary Card */}
              <ChecklistSummary categories={categories} />
              
              {/* Checklist Categories */}
              <div className="space-y-8">
                {categories.map((category) => (
                  <ChecklistCategory
                    key={category.id}
                    category={category}
                    onItemStatusChange={updateItemStatus}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CMSSEOChecklist;