import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Search, ArrowRight } from "lucide-react";

// Blog post interface
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

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Mock blog posts data
  const blogPosts: BlogPost[] = [
    {
      slug: "guia-completo-seo-iniciantes",
      title: "Guia Completo de SEO para Iniciantes",
      summary: "Aprenda os fundamentos do SEO e como aplicar técnicas básicas para melhorar o posicionamento do seu site nos motores de busca.",
      date: "15-01-2024",
      category: "SEO",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      author: "Isabella",
      content: `<h1>Guia Completo de SEO para Iniciantes</h1>
        <p>O SEO (Search Engine Optimization) é fundamental para qualquer negócio que deseja ter visibilidade online...</p>`
    },
    {
      slug: "otimizacao-google-meu-negocio",
      title: "Como Otimizar seu Google Meu Negócio",
      summary: "Estratégias práticas para maximizar a visibilidade local do seu negócio e atrair mais clientes da sua região.",
      date: "12-01-2024",
      category: "GMN",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      author: "Paloma",
      content: `<h1>Como Otimizar seu Google Meu Negócio</h1>
        <p>O Google Meu Negócio é uma ferramenta essencial para empresas locais...</p>`
    },
    {
      slug: "tendencias-marketing-digital-2024",
      title: "Tendências de Marketing Digital para 2024",
      summary: "Descubra as principais tendências que vão dominar o marketing digital este ano e como se preparar para elas.",
      date: "08-01-2024",
      category: "Marketing",
      thumbnail: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=250&fit=crop",
      author: "Bruno",
      content: `<h1>Tendências de Marketing Digital para 2024</h1>
        <p>O mundo do marketing digital evolui constantemente...</p>`
    },
    {
      slug: "estrategias-conteudo-seo",
      title: "Estratégias de Conteúdo para SEO",
      summary: "Como criar conteúdo que ranqueia bem nos buscadores e atrai seu público-alvo.",
      date: "05-01-2024",
      category: "SEO",
      thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=250&fit=crop",
      author: "Isabella",
      content: `<h1>Estratégias de Conteúdo para SEO</h1>
        <p>Criar conteúdo que ranqueia bem requer estratégia...</p>`
    },
    {
      slug: "métricas-importantes-marketing-digital",
      title: "Métricas Importantes no Marketing Digital",
      summary: "Quais indicadores você deve acompanhar para medir o sucesso das suas campanhas de marketing digital.",
      date: "02-01-2024",
      category: "Marketing",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      author: "Bruno",
      content: `<h1>Métricas Importantes no Marketing Digital</h1>
        <p>Medir resultados é essencial para o sucesso...</p>`
    },
    {
      slug: "otimizacao-velocidade-site",
      title: "Otimização de Velocidade do Site",
      summary: "Técnicas práticas para acelerar seu site e melhorar a experiência do usuário e o SEO.",
      date: "28-12-2023",
      category: "SEO",
      thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=250&fit=crop",
      author: "Paloma",
      content: `<h1>Otimização de Velocidade do Site</h1>
        <p>A velocidade do site é um fator crucial para SEO...</p>`
    }
  ];

  const categories = ["Todos", "SEO", "GMN", "Marketing"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    document.title = "Blog de Marketing Digital e SEO | Encantos Hub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore estratégias e dicas sobre marketing digital e SEO. Conteúdo especializado para impulsionar sua presença online.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-white mb-4">
              Blog <span className="text-brand-gold">Encantos</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Estratégias e dicas sobre marketing digital e SEO para impulsionar sua presença online
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Pesquisar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-brand-gold text-brand-black hover:bg-brand-gold/90" : "hover:bg-brand-gold hover:text-brand-black"}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Nenhum artigo encontrado com os filtros selecionados.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <Card 
                    key={index} 
                    className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-border hover:border-brand-gold/30 overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-brand-gold text-brand-black hover:bg-brand-gold/90">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-brand-black mb-3 group-hover:text-brand-gold transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                        {post.summary}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User size={14} />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Link to={`/blog/${post.slug}`}>
                        <Button 
                          variant="outline"
                          className="w-full group-hover:bg-brand-gold group-hover:text-brand-black group-hover:border-brand-gold transition-all"
                        >
                          Ler Artigo
                          <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;