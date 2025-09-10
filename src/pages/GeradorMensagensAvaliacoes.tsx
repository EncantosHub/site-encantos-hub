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

interface QuizAnswers {
  clientProfile: string;
  communicationChannel: string;
  clientExperience: string;
  includeExtras: string;
}

const messageTemplates = {
  "fieis-whatsapp-proxima-nao": {
    title: "Modelo 1: Amigável e Personalizada",
    message: `Oi, [Nome do Cliente]! 😊

Espero que esteja tudo bem! Foi um prazer atendê-lo(a) hoje. 

Sua opinião é muito importante para nós! Se possível, deixe uma avaliação sobre sua experiência conosco no Google. Isso nos ajuda muito a continuar melhorando.

[Link da Avaliação]

Muito obrigado(a)!
[Seu Nome/Empresa]`
  },
  "novos-email-positiva-nao": {
    title: "Modelo 5: Cliente Novo",
    message: `Olá, [Nome do Cliente]!

Agradecemos por escolher nossos serviços! Esperamos que tenha tido uma experiência positiva conosco.

Gostaríamos muito de saber sua opinião sobre nosso atendimento. Se você ficou satisfeito(a), que tal compartilhar sua experiência no Google? Sua avaliação nos ajuda a crescer e a atender ainda melhor outros clientes.

[Link da Avaliação]

Muito obrigado pelo seu tempo!
Equipe [Nome da Empresa]`
  },
  "melhoria-presencial-neutra-nao": {
    title: "Modelo 3: Reputação e Melhoria Contínua",
    message: `Prezado(a) [Nome do Cliente],

Agradecemos por sua visita e confiança em nossos serviços.

Como estamos sempre buscando melhorar, sua opinião é fundamental para nós. Que tal compartilhar sua experiência no Google? Sua avaliação nos ajuda a entender o que estamos fazendo bem e onde podemos melhorar.

[Link da Avaliação]

Obrigado por nos ajudar a crescer!
[Nome da Empresa]`
  },
  "compartilham-redes-marcante-foto": {
    title: "Modelo 4: Avaliação com Foto",
    message: `Oi, [Nome do Cliente]! 📸

Que momento especial tivemos hoje! Adoramos ver sua alegria com [produto/serviço].

Se você gostou da experiência, que tal compartilhar isso no Google e anexar aquela foto incrível? Sua avaliação com foto ajuda outros clientes a conhecer melhor nosso trabalho!

[Link da Avaliação]

Muito obrigado!
[Seu Nome/Empresa]`
  },
  "default": {
    title: "Modelo 2: Com Benefício (Cuidado com Diretrizes)",
    message: `Olá, [Nome do Cliente]!

Muito obrigado por escolher nossos serviços! Ficamos felizes em atendê-lo(a).

Sua opinião é muito valiosa para nós. Se você ficou satisfeito(a) com nossa experiência, que tal deixar uma avaliação no Google?

[Link da Avaliação]

Agradecemos muito!
Equipe [Nome da Empresa]

⚠️ Importante: Este modelo deve ser usado com cuidado, sem oferecer benefícios diretos pela avaliação.`
  }
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
      // TODO: Save email lead to database when types are updated
      console.log('Lead captured:', email);
      
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
      // TODO: Save quiz results to database when types are updated
      console.log('Quiz results:', { email, answers });
    } catch (error) {
      console.error('Error saving quiz results:', error);
    }
  };

  const getRecommendedTemplate = () => {
    const key = `${answers.clientProfile}-${answers.communicationChannel}-${answers.clientExperience}-${answers.includeExtras}`;
    return messageTemplates[key as keyof typeof messageTemplates] || messageTemplates.default;
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