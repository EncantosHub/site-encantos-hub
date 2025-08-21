import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Search, ArrowRight } from "lucide-react";
import { blogPosts, categories, type BlogPost } from "@/lib/blogData";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

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
        <section className="relative bg-brand-black py-20 lg:py-32 overflow-hidden">
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
            <div className="max-w-4xl mx-auto text-center">
              {/* Main Heading */}
              <h1 className="text-5xl lg:text-7xl font-bold text-brand-white mb-6 leading-tight">
                Blog <span className="text-brand-gold">Encantos</span>Hub
              </h1>

              {/* Subtitle */}
              <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                Estratégias e dicas sobre marketing digital e SEO para impulsionar sua presença online
              </p>
              
              {/* Divider */}
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>
            </div>
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