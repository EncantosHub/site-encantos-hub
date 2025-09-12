import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, Mail, MessageSquare, CheckCircle, Star, Users, MessageCircle, Link2, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/hooks/useSEO";
import { supabase } from "@/integrations/supabase/client";

interface QuizAnswers {
  clientProfile: string;
  communicationChannel: string;
  clientExperience: string;
  includeExtras: string;
}

// Modelos de mensagem organizados por tipo e canal
const messageModels = {
  // Modelo 1 – Amigável e personalizada (clientes fiéis/recorrentes)
  amigavel: {
    whatsapp: "Oi [Nome], que bom ter você com a gente de novo! Ficaremos muito felizes se puder contar no Google como foi sua experiência. [link]",
    presencial: "Sempre bom receber você por aqui! Escaneie este QR e deixe sua avaliação no Google. Sua opinião faz diferença.",
    email: "Olá [Nome], agradecemos por mais uma visita. Se puder, compartilhe sua opinião no Google. Isso ajuda muito nosso crescimento! [link]",
    redes: "Oi [Nome], sempre um prazer ter você com a gente! Que tal compartilhar sua experiência no Google? [link]"
  },
  
  // Modelo 2 – Com benefício (clientes que valorizam melhorias)
  beneficio: {
    whatsapp: "Sua avaliação nos ajuda a melhorar sempre! Se puder, deixe sua opinião no Google. [link]",
    email: "Queremos evoluir junto com você! Sua avaliação no Google mostra o que estamos fazendo bem e onde podemos melhorar. [link]",
    presencial: "Gostou da experiência? Sua avaliação no Google nos ajuda a trazer ainda mais novidades. Escaneie o QR e participe.",
    redes: "Sua opinião nos ajuda a evoluir! Avalie nossa experiência no Google e nos ajude a melhorar sempre. [link]"
  },
  
  // Modelo 3 – Reputação e melhoria contínua (clientes neutros ou críticos construtivos)
  reputacao: {
    whatsapp: "Obrigado por sua visita, [Nome]. Sua opinião é essencial para que possamos melhorar cada vez mais. Avalie aqui no Google: [link]",
    email: "Valorizamos muito sua opinião sincera. Se puder, deixe sua avaliação no Google para nos ajudar a crescer com responsabilidade. [link]",
    presencial: "Sua opinião conta muito para nós! Escaneie aqui e conte como podemos melhorar sua experiência.",
    redes: "Sua avaliação sincera no Google nos ajuda a crescer de forma responsável. Conte sua experiência! [link]"
  },
  
  // Modelo 4 – Avaliação com foto (clientes que compartilham momentos visuais)
  foto: {
    whatsapp: "Adoramos quando nossos clientes registram os melhores momentos! Se quiser, compartilhe sua avaliação com uma foto no Google. Isso inspira muita gente. [link]",
    email: "Além de sua avaliação no Google, que tal incluir uma foto do momento especial que viveu conosco? Vai inspirar novos clientes! [link]",
    presencial: "Tire uma foto e compartilhe sua experiência no Google. É simples, só escanear aqui.",
    redes: "Que tal compartilhar uma foto dessa experiência na sua avaliação do Google? Vai inspirar outros clientes! [link]"
  },
  
  // Modelo 5 – Cliente novo (primeira vez, experiência positiva)
  clienteNovo: {
    whatsapp: "Foi um prazer receber você pela primeira vez, [Nome]! Se puder contar no Google como foi, vai nos ajudar muito a crescer. [link]",
    email: "Esperamos que sua primeira experiência tenha sido ótima. Se puder avaliar no Google, será um grande incentivo para seguirmos evoluindo. [link]",
    presencial: "Seja bem-vindo(a)! Gostaríamos muito de saber sua opinião. Escaneie aqui e deixe sua primeira avaliação no Google.",
    redes: "Que bom ter você pela primeira vez! Sua avaliação no Google nos ajuda a receber mais clientes como você. [link]"
  }
};

// Textos adicionais para foto e mimo
const extrasTexts = {
  foto: " Que tal incluir uma foto na sua avaliação para inspirar outros clientes?",
  mimo: " Esperamos que tenha gostado do nosso mimo especial!"
};

export default function GeradorMensagensAvaliacoes() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [email, setEmail] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    clientProfile: '',
    communicationChannel: '',
    clientExperience: '',
    includeExtras: ''
  });
  const [gmnLink, setGmnLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Gerador de Mensagens para Avaliação - Encantos Hub",
    description: "Descubra a melhor forma de pedir avaliações no Google Meu Negócio. Quiz interativo com modelos personalizados para seu tipo de negócio.",
    canonical: "https://encantoshub.com/ferramentas/gerador-mensagens-avaliacoes",
    ogImage: "/images/blog/google-business-optimization.jpg"
  });

  const questions = [
    {
      id: 'clientProfile',
      question: 'Qual o perfil do cliente que você deseja incentivar a avaliar?',
      options: [
        { value: 'fieis', label: 'Clientes fiéis e recorrentes' },
        { value: 'novos', label: 'Clientes novos (primeira experiência)' },
        { value: 'melhoria', label: 'Clientes que valorizam melhorias e reputação' },
        { value: 'compartilham', label: 'Clientes que compartilham fotos e interações nas redes' },
        { value: 'todos', label: 'Todos os tipos' }
      ]
    },
    {
      id: 'communicationChannel',
      question: 'Onde você normalmente se comunica com seus clientes?',
      options: [
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'email', label: 'E-mail' },
        { value: 'presencial', label: 'Presencialmente' },
        { value: 'redes', label: 'Redes sociais' },
        { value: 'outro', label: 'Outro' }
      ]
    },
    {
      id: 'clientExperience',
      question: 'Como foi a experiência do cliente?',
      options: [
        { value: 'proxima', label: 'Muito próxima, temos uma boa relação' },
        { value: 'positiva', label: 'Primeira vez, mas pareceu positiva' },
        { value: 'neutra', label: 'Aparentemente neutra, quero melhorar' },
        { value: 'marcante', label: 'Teve um momento visual marcante (produto, ambiente, comida)' }
      ]
    },
    {
      id: 'includeExtras',
      question: 'Deseja incluir alguma imagem, brinde ou link personalizado?',
      options: [
        { value: 'mimo', label: 'Sim, gostaria de mostrar um mimo' },
        { value: 'foto', label: 'Sim, quero incluir uma foto' },
        { value: 'nao', label: 'Não, prefiro algo simples e direto' }
      ]
    }
  ];

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email obrigatório",
        description: "Por favor, insira seu e-mail para continuar.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Save email lead to database
      const { error: leadError } = await supabase
        .from('gerador_avaliacoes_leads')
        .insert([{ email }]);

      if (leadError) {
        console.error('Error saving lead:', leadError);
        throw new Error('Erro ao salvar dados. Tente novamente.');
      }
      
      setCurrentStep('quiz');
      toast({
        title: "Perfeito!",
        description: "Vamos começar o quiz para encontrar a mensagem ideal para você."
      });
    } catch (error) {
      console.error('Error saving lead:', error);
      toast({
        title: "Erro",
        description: "Houve um problema. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnswerSelect = (value: string) => {
    const questionKey = questions[currentQuestion].id as keyof QuizAnswers;
    setAnswers(prev => ({ ...prev, [questionKey]: value }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentStep('result');
      saveQuizResults();
    }
  };

  const saveQuizResults = async () => {
    try {
      // Save quiz results to database
      const { error: responseError } = await supabase
        .from('gerador_avaliacoes_respostas')
        .insert([{
          email,
          client_profile: answers.clientProfile,
          communication_channel: answers.communicationChannel,
          client_experience: answers.clientExperience,
          include_extras: answers.includeExtras
        }]);

      if (responseError) {
        console.error('Error saving quiz results:', responseError);
        toast({
          title: "Aviso",
          description: "Resultado gerado com sucesso, mas houve um problema ao salvar as respostas.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error saving quiz results:', error);
    }
  };

  const getRecommendedTemplate = () => {
    // Determinar o modelo baseado no perfil e experiência do cliente
    let selectedModel = 'beneficio'; // default
    let modelTitle = 'Modelo 2: Com Benefício';
    
    if (answers.clientProfile === 'fieis' && (answers.clientExperience === 'proxima' || answers.clientExperience === 'positiva')) {
      selectedModel = 'amigavel';
      modelTitle = 'Modelo 1: Amigável e Personalizada';
    } else if (answers.clientProfile === 'novos' && answers.clientExperience === 'positiva') {
      selectedModel = 'clienteNovo';
      modelTitle = 'Modelo 5: Cliente Novo';
    } else if (answers.clientProfile === 'melhoria' || answers.clientExperience === 'neutra') {
      selectedModel = 'reputacao';
      modelTitle = 'Modelo 3: Reputação e Melhoria Contínua';
    } else if (answers.clientProfile === 'compartilham' || answers.clientExperience === 'marcante' || answers.includeExtras === 'foto') {
      selectedModel = 'foto';
      modelTitle = 'Modelo 4: Avaliação com Foto';
    }
    
    // Determinar o canal de comunicação
    let channel = answers.communicationChannel;
    if (channel === 'outro') channel = 'whatsapp'; // fallback
    
    // Buscar a mensagem base do modelo e canal
    const baseMessage = messageModels[selectedModel as keyof typeof messageModels]?.[channel as keyof typeof messageModels.amigavel] || 
                       messageModels[selectedModel as keyof typeof messageModels]?.whatsapp || 
                       messageModels.beneficio.whatsapp;
    
    // Adicionar extras se necessário
    let finalMessage = baseMessage;
    if (answers.includeExtras === 'foto' && selectedModel !== 'foto') {
      finalMessage += extrasTexts.foto;
    } else if (answers.includeExtras === 'mimo') {
      finalMessage += extrasTexts.mimo;
    }
    
    return {
      title: modelTitle,
      message: finalMessage
    };
  };

  const copyToClipboard = (text: string) => {
    const finalMessage = gmnLink 
      ? text.replace('[Link da Avaliação]', gmnLink)
      : text;
    
    navigator.clipboard.writeText(finalMessage);
    toast({
      title: "Copiado!",
      description: "A mensagem foi copiada para sua área de transferência."
    });
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (currentStep === 'intro') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section with Background */}
        <section className="relative bg-brand-black py-16 overflow-hidden">
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

          <main className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <Badge className="mb-4 bg-brand-gold/20 text-brand-gold border-brand-gold/30">
                  <Star className="w-4 h-4 mr-2" />
                  Ferramenta Gratuita
                </Badge>
                <h1 className="text-4xl font-bold mb-4 text-brand-white">
                  Descubra a melhor forma de pedir avaliações no Google!
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Responda 4 perguntas rápidas e receba um modelo de mensagem ideal para seu negócio.
                </p>
              </div>

            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Começar Quiz
                </CardTitle>
                <CardDescription>
                  Insira seu e-mail para desbloquear o resultado personalizado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email">E-mail profissional</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processando..." : "Iniciar Quiz →"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-brand-gold" />
                <p className="text-sm text-gray-300">5 Modelos<br />Personalizados</p>
              </div>
              <div className="text-center">
                <MessageCircle className="w-8 h-8 mx-auto mb-2 text-brand-gold" />
                <p className="text-sm text-gray-300">WhatsApp &<br />E-mail Ready</p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-brand-gold" />
                <p className="text-sm text-gray-300">100%<br />Gratuita</p>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-brand-gold" />
                <p className="text-sm text-gray-300">Resultados<br />Comprovados</p>
              </div>
            </div>
          </div>
        </main>
        </section>
        <Footer />
      </div>
    );
  }

  if (currentStep === 'quiz') {
    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <Badge variant="outline">
                  Pergunta {currentQuestion + 1} de {questions.length}
                </Badge>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}% completo</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{currentQ.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={answers[currentQ.id as keyof QuizAnswers]}
                  onValueChange={handleAnswerSelect}
                >
                  {currentQ.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label 
                        htmlFor={option.value} 
                        className="flex-1 cursor-pointer p-3 rounded border hover:bg-accent transition-colors"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                  >
                    ← Anterior
                  </Button>
                  <Button
                    onClick={handleNextQuestion}
                    disabled={!answers[currentQ.id as keyof QuizAnswers]}
                  >
                    {currentQuestion === questions.length - 1 ? 'Ver Resultado' : 'Próxima →'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (currentStep === 'result') {
    const template = getRecommendedTemplate();

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="mb-4" variant="default">
                <CheckCircle className="w-4 h-4 mr-2" />
                Resultado Personalizado
              </Badge>
              <h1 className="text-3xl font-bold mb-4">Sua Mensagem Ideal Está Pronta!</h1>
              <p className="text-muted-foreground">
                Com base nas suas respostas, este é o modelo mais eficaz para seu negócio:
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    {template.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg mb-4">
                    <Textarea
                      value={template.message}
                      readOnly
                      className="min-h-[300px] resize-none border-0 bg-transparent"
                    />
                  </div>
                  <Button
                    onClick={() => copyToClipboard(template.message)}
                    className="w-full mb-2"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar Mensagem
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Link2 className="w-5 h-5" />
                      Personalizar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="gmn-link">Link de Avaliação do Google Meu Negócio</Label>
                      <Input
                        id="gmn-link"
                        placeholder="https://g.page/r/..."
                        value={gmnLink}
                        onChange={(e) => setGmnLink(e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Cole o link de avaliação do seu GMN para gerar a mensagem final
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="w-5 h-5" />
                      Dicas Extras
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 text-green-500" />
                        Use sempre o nome do cliente na mensagem
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 text-green-500" />
                        Envie a solicitação logo após o atendimento
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 text-green-500" />
                        Seja genuíno e não insistente
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 text-green-500" />
                        Nunca ofereça benefícios pela avaliação
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentStep('intro');
                      setCurrentQuestion(0);
                      setAnswers({
                        clientProfile: '',
                        communicationChannel: '',
                        clientExperience: '',
                        includeExtras: ''
                      });
                      setGmnLink('');
                      setEmail('');
                    }}
                  >
                    Fazer Outro Quiz
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return null;
}