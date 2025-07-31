import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Share2, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  thumbnail: string;
  author: string;
  content: string;
}

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  // Mock blog posts data (in a real app, this would come from an API or database)
  const blogPosts: BlogPost[] = [
    {
      slug: "guia-completo-seo-iniciantes",
      title: "Guia Completo de SEO para Iniciantes",
      summary: "Aprenda os fundamentos do SEO e como aplicar técnicas básicas para melhorar o posicionamento do seu site nos motores de busca.",
      date: "15-01-2024",
      category: "SEO",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      author: "Isabella",
      content: `
        <div class="prose prose-lg max-w-none">
          <h1>Guia Completo de SEO para Iniciantes</h1>
          
          <p class="lead">O SEO (Search Engine Optimization) é fundamental para qualquer negócio que deseja ter visibilidade online. Neste guia completo, você aprenderá os conceitos básicos e técnicas essenciais para começar a otimizar seu site.</p>
          
          <h2>O que é SEO?</h2>
          <p>SEO é o conjunto de técnicas e estratégias utilizadas para melhorar o posicionamento de um site nos resultados orgânicos dos motores de busca, principalmente o Google.</p>
          
          <h2>Por que o SEO é importante?</h2>
          <ul>
            <li>Aumenta a visibilidade online do seu negócio</li>
            <li>Atrai tráfego qualificado e gratuito</li>
            <li>Melhora a credibilidade da sua marca</li>
            <li>Oferece resultados de longo prazo</li>
            <li>Tem melhor ROI que outras estratégias de marketing</li>
          </ul>
          
          <h2>Elementos Fundamentais do SEO</h2>
          
          <h3>1. Pesquisa de Palavras-chave</h3>
          <p>A pesquisa de palavras-chave é a base de qualquer estratégia de SEO. Você precisa entender:</p>
          <ul>
            <li>Quais termos seu público-alvo pesquisa</li>
            <li>Volume de busca de cada palavra-chave</li>
            <li>Dificuldade de rankeamento</li>
            <li>Intenção de busca por trás de cada termo</li>
          </ul>
          
          <h3>2. SEO On-Page</h3>
          <p>Refere-se às otimizações feitas diretamente nas páginas do seu site:</p>
          <ul>
            <li><strong>Title Tags:</strong> Títulos únicos e descritivos para cada página</li>
            <li><strong>Meta Descriptions:</strong> Descrições atrativas que incentivem o clique</li>
            <li><strong>Headers (H1, H2, H3):</strong> Estrutura hierárquica do conteúdo</li>
            <li><strong>URLs amigáveis:</strong> URLs curtas e descritivas</li>
            <li><strong>Conteúdo de qualidade:</strong> Texto relevante e útil para o usuário</li>
          </ul>
          
          <h3>3. SEO Técnico</h3>
          <p>Aspectos técnicos que influenciam o rankeamento:</p>
          <ul>
            <li>Velocidade de carregamento</li>
            <li>Responsividade mobile</li>
            <li>Estrutura do site e navegação</li>
            <li>Sitemap XML</li>
            <li>Arquivo robots.txt</li>
            <li>HTTPS (certificado SSL)</li>
          </ul>
          
          <h2>Primeiros Passos para Implementar SEO</h2>
          
          <h3>1. Auditoria do Site</h3>
          <p>Antes de implementar melhorias, faça uma auditoria completa para identificar problemas técnicos e oportunidades de otimização.</p>
          
          <h3>2. Otimize o Conteúdo Existente</h3>
          <p>Revise e otimize as páginas mais importantes do seu site, incluindo:</p>
          <ul>
            <li>Página inicial</li>
            <li>Páginas de produtos/serviços</li>
            <li>Páginas de contato e sobre</li>
          </ul>
          
          <h3>3. Crie Conteúdo Novo</h3>
          <p>Desenvolva um calendário editorial com conteúdo relevante para seu público, sempre focando em palavras-chave estratégicas.</p>
          
          <h2>Ferramentas Essenciais para SEO</h2>
          
          <h3>Ferramentas Gratuitas</h3>
          <ul>
            <li><strong>Google Search Console:</strong> Monitore o desempenho do seu site no Google</li>
            <li><strong>Google Analytics:</strong> Analise o tráfego e comportamento dos usuários</li>
            <li><strong>Google PageSpeed Insights:</strong> Teste a velocidade das suas páginas</li>
            <li><strong>Ubersuggest:</strong> Pesquisa de palavras-chave básica</li>
          </ul>
          
          <h3>Ferramentas Pagas</h3>
          <ul>
            <li><strong>SEMrush:</strong> Plataforma completa de SEO e marketing digital</li>
            <li><strong>Ahrefs:</strong> Análise de backlinks e pesquisa de palavras-chave</li>
            <li><strong>Moz Pro:</strong> Suite de ferramentas SEO</li>
          </ul>
          
          <h2>Métricas Importantes para Acompanhar</h2>
          <ul>
            <li><strong>Posicionamento das palavras-chave:</strong> Em que posição suas páginas aparecem</li>
            <li><strong>Tráfego orgânico:</strong> Número de visitantes vindos dos buscadores</li>
            <li><strong>Taxa de cliques (CTR):</strong> Percentual de pessoas que clicam no seu resultado</li>
            <li><strong>Tempo de permanência:</strong> Quanto tempo os usuários ficam no seu site</li>
            <li><strong>Taxa de rejeição:</strong> Percentual de usuários que saem sem interagir</li>
          </ul>
          
          <h2>Erros Comuns de SEO para Evitar</h2>
          <ul>
            <li>Keyword stuffing (excesso de palavras-chave)</li>
            <li>Conteúdo duplicado</li>
            <li>Links quebrados</li>
            <li>Site lento</li>
            <li>Não otimizar para mobile</li>
            <li>Ignorar a experiência do usuário</li>
          </ul>
          
          <h2>Conclusão</h2>
          <p>SEO é uma estratégia de longo prazo que requer consistência e paciência. Comece implementando as técnicas básicas apresentadas neste guia e vá evoluindo gradualmente.</p>
          
          <p>Lembre-se: o foco principal deve sempre ser criar conteúdo de qualidade que realmente ajude seu público. Os algoritmos dos motores de busca estão cada vez mais sofisticados e priorizam sites que oferecem valor real aos usuários.</p>
          
          <p>Se precisar de ajuda profissional para implementar uma estratégia de SEO completa, nossa equipe está pronta para acelerar seus resultados. Entre em contato conosco!</p>
        </div>
      `
    },
    // Add other blog posts here...
  ];

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
      document.title = `${foundPost.title} | Blog Encantos Hub`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', foundPost.summary);
      }
    } else {
      document.title = "Post não encontrado | Blog Encantos Hub";
    }
  }, [slug]);

  const handleShare = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.summary,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiado!",
        description: "O link do artigo foi copiado para sua área de transferência.",
      });
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Like removido" : "Obrigado pelo like!",
      description: isLiked ? "Você removeu seu like deste artigo." : "Que bom que você gostou deste artigo!",
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-8">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-bold text-brand-black mb-4">Post não encontrado</h1>
            <p className="text-muted-foreground mb-8">O artigo que você está procurando não existe.</p>
            <Link to="/blog">
              <Button className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black">
                <ArrowLeft size={20} className="mr-2" />
                Voltar ao Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-8">
        {/* Article Header */}
        <article className="py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Back Button */}
            <Link to="/blog" className="inline-flex items-center text-brand-gold hover:text-brand-gold/80 transition-colors mb-8">
              <ArrowLeft size={20} className="mr-2" />
              Voltar ao Blog
            </Link>

            {/* Article Meta */}
            <div className="mb-8">
              <Badge className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 mb-4">
                {post.category}
              </Badge>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-brand-black mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-muted-foreground mb-6">
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{post.date}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold"
                >
                  <Share2 size={16} className="mr-2" />
                  Compartilhar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLike}
                  className={`hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold ${
                    isLiked ? "bg-brand-gold text-brand-black border-brand-gold" : ""
                  }`}
                >
                  <Heart size={16} className={`mr-2 ${isLiked ? "fill-current" : ""}`} />
                  {isLiked ? "Curtido" : "Curtir"}
                </Button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-12">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-[400px] object-cover rounded-lg shadow-elegant"
              />
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-brand-black prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-muted-foreground prose-strong:text-brand-black prose-a:text-brand-gold hover:prose-a:text-brand-gold/80 prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Call to Action */}
            <div className="mt-16 p-8 bg-gradient-hero rounded-lg text-center">
              <h3 className="text-2xl font-bold text-brand-white mb-4">
                Gostou do conteúdo?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Nossa equipe pode ajudar você a implementar essas estratégias em seu negócio. 
                Entre em contato para uma consultoria personalizada.
              </p>
              <Button 
                onClick={() => window.open("https://wa.me/5511964721143?text=Vim do blog e gostaria de uma consultoria.", "_blank")}
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-semibold px-8 py-3"
              >
                Falar com Especialista
              </Button>
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;