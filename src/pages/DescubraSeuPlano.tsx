import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MessageCircle, ArrowLeft } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  nomeEmpresa: z.string().min(2, "Nome da empresa é obrigatório"),
  linkSite: z.string().url("URL do site inválida").or(z.literal("")),
  email: z.string().email("E-mail inválido"),
  segmento: z.string().min(1, "Selecione um segmento"),
  localizacao: z.string().min(2, "Localização é obrigatória"),
  unidades: z.string().min(1, "Selecione uma opção"),
  abrangencia: z.string().min(1, "Selecione uma opção"),
  timeMarketing: z.string().min(1, "Selecione uma opção"),
  funcoesInternas: z.array(z.string()),
  gestaoSite: z.string().min(1, "Selecione uma opção"),
  ferramentas: z.array(z.string()),
  investimentoAnterior: z.string().min(1, "Selecione uma opção"),
  faturamento: z.string().min(1, "Selecione uma opção"),
  expectativa: z.string().min(1, "Selecione uma opção"),
});

type FormData = z.infer<typeof formSchema>;

interface ServiceRecommendation {
  service: string;
  title: string;
  message: string;
  link: string;
}

const DescubraSeuPlano = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [recommendation, setRecommendation] = useState<ServiceRecommendation | null>(null);

  useSEO({
    title: "Descubra seu Serviço Ideal | Encantos Hub",
    description: "Responda algumas perguntas rápidas e descubra qual plano de marketing digital é ideal para o seu negócio.",
    canonical: "https://www.encantoshub.com.br/descubra-seu-plano"
  });

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      funcoesInternas: [],
      ferramentas: [],
    }
  });

  const watchedValues = watch();

  const getRecommendation = (data: FormData): ServiceRecommendation => {
    const faturamento = data.faturamento;
    const unidades = data.unidades;
    const abrangencia = data.abrangencia;
    const timeMarketing = data.timeMarketing;
    const gestaoSite = data.gestaoSite;
    const investimentoAnterior = data.investimentoAnterior;

    // Gestão Completa
    if (
      (faturamento === "+1M" || faturamento === "200k-1M") ||
      (unidades === "Mais de 5") ||
      (abrangencia === "Nacional" || abrangencia === "Internacional") &&
      (timeMarketing !== "Nenhum") &&
      (investimentoAnterior === "Sim contínuo")
    ) {
      return {
        service: "gestao-completa",
        title: "Gestão Completa e Personalizada",
        message: "Seu negócio tem estrutura e alcance para um projeto robusto. O plano recomendado é a Gestão Completa e Personalizada, com foco em SEO estratégico de longo prazo.",
        link: "/servicos/gestao-completa"
      };
    }

    // Gestão Essencial
    if (
      (faturamento === "50k-200k" || faturamento === "200k-1M") &&
      (timeMarketing === "1 pessoa" || timeMarketing === "Pequena equipe") &&
      (gestaoSite === "CMS autônomo" || gestaoSite === "CMS dependente de dev") &&
      (investimentoAnterior !== "Sim contínuo")
    ) {
      return {
        service: "gestao-essencial",
        title: "Gestão Essencial",
        message: "Seu negócio está em fase de evolução digital. O plano recomendado é a Gestão Essencial, ideal para construir autoridade no Google com investimento acessível.",
        link: "/servicos/gestao-essencial"
      };
    }

    // Gestão Local
    if (
      (faturamento === "até 50k") ||
      (unidades === "Não" || unidades === "Até 5") &&
      (abrangencia === "Local") &&
      (gestaoSite === "Não tem CMS" || !data.linkSite)
    ) {
      return {
        service: "gestao-local",
        title: "Gestão Local",
        message: "Seu negócio precisa ser encontrado na sua região. O plano recomendado é a Gestão Local, com foco em Google Meu Negócio e presença regional.",
        link: "/servicos/gestao-local"
      };
    }

    // Consultoria Estratégica (fallback)
    return {
      service: "consultoria",
      title: "Consultoria Estratégica",
      message: "Você precisa de direcionamento antes de investir em gestão contínua. O plano recomendado é a Consultoria Estratégica, com sessões personalizadas para definir seus próximos passos.",
      link: "/servicos/consultoria"
    };
  };

  const onSubmit = (data: FormData) => {
    const result = getRecommendation(data);
    setRecommendation(result);
    setCurrentStep(3);
  };

  const handleArrayField = (fieldName: keyof FormData, value: string) => {
    const currentValues = watchedValues[fieldName] as string[] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    setValue(fieldName, newValues);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Informações Básicas</h2>
      
      <div className="grid gap-4">
        <div>
          <Label htmlFor="nomeEmpresa">Nome da empresa *</Label>
          <Input id="nomeEmpresa" {...register("nomeEmpresa")} />
          {errors.nomeEmpresa && <p className="text-sm text-red-500 mt-1">{errors.nomeEmpresa.message}</p>}
        </div>

        <div>
          <Label htmlFor="linkSite">Link do site</Label>
          <Input id="linkSite" placeholder="https://..." {...register("linkSite")} />
          {errors.linkSite && <p className="text-sm text-red-500 mt-1">{errors.linkSite.message}</p>}
        </div>

        <div>
          <Label htmlFor="email">E-mail de contato *</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <Label htmlFor="segmento">Segmento da empresa *</Label>
          <Select onValueChange={(value) => setValue("segmento", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um segmento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="restaurante">Restaurante</SelectItem>
              <SelectItem value="clinica">Clínica/Saúde</SelectItem>
              <SelectItem value="servicos">Serviços</SelectItem>
              <SelectItem value="industria">Indústria</SelectItem>
              <SelectItem value="comercio">Comércio</SelectItem>
              <SelectItem value="educacao">Educação</SelectItem>
              <SelectItem value="tecnologia">Tecnologia</SelectItem>
              <SelectItem value="outros">Outros</SelectItem>
            </SelectContent>
          </Select>
          {errors.segmento && <p className="text-sm text-red-500 mt-1">{errors.segmento.message}</p>}
        </div>

        <div>
          <Label htmlFor="localizacao">Localização (cidade/estado) *</Label>
          <Input id="localizacao" placeholder="Ex: São Paulo/SP" {...register("localizacao")} />
          {errors.localizacao && <p className="text-sm text-red-500 mt-1">{errors.localizacao.message}</p>}
        </div>
      </div>

      <Button onClick={() => setCurrentStep(2)} className="w-full">
        Continuar
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Diagnóstico Empresarial</h2>
      
      <div className="grid gap-6">
        <div>
          <Label>Sua empresa possui mais de uma unidade? *</Label>
          <Select onValueChange={(value) => setValue("unidades", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Não">Não</SelectItem>
              <SelectItem value="Até 5">Até 5</SelectItem>
              <SelectItem value="Mais de 5">Mais de 5</SelectItem>
            </SelectContent>
          </Select>
          {errors.unidades && <p className="text-sm text-red-500 mt-1">{errors.unidades.message}</p>}
        </div>

        <div>
          <Label>Abrangência de atuação *</Label>
          <Select onValueChange={(value) => setValue("abrangencia", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Local">Local</SelectItem>
              <SelectItem value="Nacional">Nacional</SelectItem>
              <SelectItem value="Internacional">Internacional</SelectItem>
            </SelectContent>
          </Select>
          {errors.abrangencia && <p className="text-sm text-red-500 mt-1">{errors.abrangencia.message}</p>}
        </div>

        <div>
          <Label>Tamanho do time de marketing *</Label>
          <Select onValueChange={(value) => setValue("timeMarketing", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nenhum">Nenhum</SelectItem>
              <SelectItem value="1 pessoa">1 pessoa</SelectItem>
              <SelectItem value="Pequena equipe">Pequena equipe</SelectItem>
              <SelectItem value="Equipe completa">Equipe completa</SelectItem>
            </SelectContent>
          </Select>
          {errors.timeMarketing && <p className="text-sm text-red-500 mt-1">{errors.timeMarketing.message}</p>}
        </div>

        <div>
          <Label>Funções internas já disponíveis (pode marcar várias)</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {["Desenvolvedor", "Designer", "Conteúdo", "Imprensa"].map((funcao) => (
              <Button
                key={funcao}
                type="button"
                variant={watchedValues.funcoesInternas?.includes(funcao) ? "default" : "outline"}
                onClick={() => handleArrayField("funcoesInternas", funcao)}
                className="justify-start"
              >
                {funcao}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Gestão do site *</Label>
          <Select onValueChange={(value) => setValue("gestaoSite", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CMS autônomo">CMS autônomo</SelectItem>
              <SelectItem value="CMS dependente de dev">CMS dependente de dev</SelectItem>
              <SelectItem value="Não tem CMS">Não tem CMS</SelectItem>
            </SelectContent>
          </Select>
          {errors.gestaoSite && <p className="text-sm text-red-500 mt-1">{errors.gestaoSite.message}</p>}
        </div>

        <div>
          <Label>Ferramentas instaladas (pode marcar várias)</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {["GA4", "GSC", "Semrush/Ahrefs", "Nenhuma"].map((ferramenta) => (
              <Button
                key={ferramenta}
                type="button"
                variant={watchedValues.ferramentas?.includes(ferramenta) ? "default" : "outline"}
                onClick={() => handleArrayField("ferramentas", ferramenta)}
                className="justify-start"
              >
                {ferramenta}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Já investiu em marketing digital? *</Label>
          <Select onValueChange={(value) => setValue("investimentoAnterior", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sim contínuo">Sim contínuo</SelectItem>
              <SelectItem value="Sim pontual">Sim pontual</SelectItem>
              <SelectItem value="Não">Não</SelectItem>
            </SelectContent>
          </Select>
          {errors.investimentoAnterior && <p className="text-sm text-red-500 mt-1">{errors.investimentoAnterior.message}</p>}
        </div>

        <div>
          <Label>Faixa de faturamento mensal *</Label>
          <Select onValueChange={(value) => setValue("faturamento", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="até 50k">até R$ 50k</SelectItem>
              <SelectItem value="50k-200k">R$ 50k – R$ 200k</SelectItem>
              <SelectItem value="200k-1M">R$ 200k – R$ 1M</SelectItem>
              <SelectItem value="+1M">+ R$ 1M</SelectItem>
            </SelectContent>
          </Select>
          {errors.faturamento && <p className="text-sm text-red-500 mt-1">{errors.faturamento.message}</p>}
        </div>

        <div>
          <Label>Expectativa principal *</Label>
          <Select onValueChange={(value) => setValue("expectativa", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Visibilidade">Visibilidade</SelectItem>
              <SelectItem value="Reputação">Reputação</SelectItem>
              <SelectItem value="Vendas">Vendas</SelectItem>
              <SelectItem value="Tudo junto">Tudo junto</SelectItem>
            </SelectContent>
          </Select>
          {errors.expectativa && <p className="text-sm text-red-500 mt-1">{errors.expectativa.message}</p>}
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <Button onClick={handleSubmit(onSubmit)} className="flex-1">
          Ver Recomendação
        </Button>
      </div>
    </div>
  );

  const renderRecommendation = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Recomendação Personalizada</h2>
      </div>

      <Card className="border-2 border-primary">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{recommendation?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {recommendation?.message}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
              className="flex-1"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Falar no WhatsApp
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate(recommendation?.link || '/')}
              className="flex-1"
            >
              Ver Detalhes do Serviço
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button variant="link" onClick={() => navigate('/')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para ver todos os serviços
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Descubra seu Serviço Ideal</h1>
            <p className="text-xl text-muted-foreground">
              Responda algumas perguntas sobre sua empresa e receba nossa recomendação personalizada.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                1
              </div>
              <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                2
              </div>
              <div className={`w-16 h-1 ${currentStep >= 3 ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                3
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderRecommendation()}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DescubraSeuPlano;