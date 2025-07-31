import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, User } from "lucide-react";
import { Link } from "react-router-dom";

const BlogPreviewSection = () => {
  // Mock data for recent blog posts
  const recentPosts = [
    {
      slug: "guia-completo-seo-iniciantes",
      title: "Guia Completo de SEO para Iniciantes",
      summary: "Aprenda os fundamentos do SEO e como aplicar técnicas básicas para melhorar o posicionamento do seu site nos motores de busca.",
      date: "15-01-2024",
      category: "SEO",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      author: "Isabella"
    },
    {
      slug: "otimizacao-google-meu-negocio",
      title: "Como Otimizar seu Google Meu Negócio",
      summary: "Estratégias práticas para maximizar a visibilidade local do seu negócio e atrair mais clientes da sua região.",
      date: "12-01-2024", 
      category: "GMN",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      author: "Paloma"
    },
    {
      slug: "tendencias-marketing-digital-2024",
      title: "Tendências de Marketing Digital para 2024",
      summary: "Descubra as principais tendências que vão dominar o marketing digital este ano e como se preparar para elas.",
      date: "08-01-2024",
      category: "Marketing",
      thumbnail: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=250&fit=crop",
      author: "Bruno"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-black mb-4">
            Posts Recentes do <span className="text-brand-gold">Blog</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Acompanhe nossas dicas, estratégias e insights sobre marketing digital e SEO
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
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
                  <span className="bg-brand-gold text-brand-black px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
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

        <div className="text-center mt-12">
          <Link to="/blog">
            <Button className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-semibold px-8 py-3">
              Ver Todos os Posts
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;