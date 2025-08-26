import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Share2, 
  Heart, 
  Clock, 
  Tag,
  ChevronRight,
  BookOpen,
  MessageCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getPostBySlug, blogPosts, type BlogPost as BlogPostType } from "@/lib/blogData";
import { useSEO } from "@/hooks/useSEO";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [tableOfContents, setTableOfContents] = useState<Array<{id: string, text: string, level: number}>>([]);

  useEffect(() => {
    const foundPost = getPostBySlug(slug || "");
    if (foundPost) {
      setPost(foundPost);
      
      // Find related posts (same category, different slug)
      const related = blogPosts
        .filter(p => p.category === foundPost.category && p.slug !== foundPost.slug)
        .slice(0, 3);
      setRelatedPosts(related);

      // Extract table of contents from post content
      const parser = new DOMParser();
      const doc = parser.parseFromString(foundPost.content, 'text/html');
      const headings = doc.querySelectorAll('h2, h3, h4');
      const toc = Array.from(headings).map((heading, index) => {
        const id = heading.id || `heading-${index}`;
        const level = parseInt(heading.tagName.charAt(1));
        return {
          id,
          text: heading.textContent || '',
          level
        };
      }).slice(0, 8); // Limit to 8 items
      setTableOfContents(toc);
    }
  }, [slug]);

  useSEO({
    title: post ? `${post.title} | Encantos Hub` : "Artigo não encontrado | Encantos Hub",
    description: post ? post.summary : "O artigo que você procura não foi encontrado.",
    canonical: post ? `https://www.encantoshub.com.br/blog/${post.slug}` : undefined,
    ogImage: post?.thumbnail ? `https://www.encantoshub.com.br${post.thumbnail}` : undefined
  });

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

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
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
        <article className="py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            
            {/* Breadcrumb Navigation */}
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/blog">Blog</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>{post.category}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-brand-gold font-medium">
                    {post.title.length > 50 ? `${post.title.substring(0, 50)}...` : post.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Article Header */}
            <header className="mb-12">
              {/* Category Badge */}
              <Badge className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 mb-6">
                <Tag size={14} className="mr-1" />
                {post.category}
              </Badge>
              
              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-bold text-brand-black mb-6 leading-tight">
                {post.title}
              </h1>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  {post.authorLinkedIn ? (
                    <a 
                      href={post.authorLinkedIn} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-brand-gold hover:text-brand-gold/80 transition-colors"
                    >
                      {post.author}
                    </a>
                  ) : (
                    <span>{post.author}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>{calculateReadingTime(post.content)} min de leitura</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4 mb-8">
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
            </header>

            {/* Featured Image */}
            <div className="mb-12">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-[400px] object-cover rounded-lg shadow-elegant"
              />
            </div>

            {/* Introduction/Lead */}
            <div className="mb-12 p-6 bg-gradient-to-r from-brand-gold/5 to-transparent border-l-4 border-brand-gold rounded-r-lg">
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                {post.summary}
              </p>
            </div>

            {/* Table of Contents */}
            {tableOfContents.length > 0 && (
              <div className="mb-12 p-6 bg-muted/30 rounded-lg border">
                <div className="flex items-center mb-4">
                  <BookOpen size={20} className="mr-2 text-brand-gold" />
                  <h2 className="text-xl font-semibold text-brand-black">Sumário</h2>
                </div>
                <nav>
                  <ul className="space-y-2">
                    {tableOfContents.map((item, index) => (
                      <li key={index} className={`${item.level > 2 ? 'ml-4' : ''}`}>
                        <a 
                          href={`#${item.id}`}
                          className="text-muted-foreground hover:text-brand-gold transition-colors inline-flex items-center"
                        >
                          <ChevronRight size={14} className="mr-1 flex-shrink-0" />
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            {/* Article Content */}
            <div className="mb-16">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-brand-black prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-brand-black prose-a:text-brand-gold hover:prose-a:text-brand-gold/80 prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:mb-2 prose-blockquote:border-l-brand-gold prose-blockquote:bg-muted/20 prose-blockquote:py-4 prose-img:rounded-lg prose-img:shadow-md"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Highlighted Insight Box */}
            <div className="mb-16 p-8 bg-gradient-to-r from-brand-gold/10 to-brand-gold/5 border border-brand-gold/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-1 h-16 bg-brand-gold rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-black mb-3">💡 Dica Importante</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A implementação consistente dessas estratégias é fundamental para obter resultados duradouros. 
                    Lembre-se: o sucesso digital vem da combinação entre conhecimento técnico e aplicação prática.
                  </p>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="mb-16 p-8 bg-gradient-hero rounded-lg text-center">
              <h3 className="text-2xl font-bold text-brand-white mb-4">
                Precisa de ajuda para implementar essas estratégias?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Nossa equipe especializada pode ajudar você a colocar em prática tudo que aprendeu neste artigo. 
                Entre em contato para uma consultoria personalizada e acelere seus resultados.
              </p>
              <Button 
                onClick={() => window.open("https://wa.me/5511964721143?text=Vim do blog e gostaria de uma consultoria personalizada.", "_blank")}
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-semibold px-8 py-3 text-lg"
              >
                Solicitar Consultoria Gratuita
              </Button>
            </div>

            {/* Social Sharing */}
            <div className="mb-16 p-6 bg-muted/30 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-brand-black mb-4">Gostou do conteúdo? Compartilhe!</h3>
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold"
                >
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold"
                >
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Confira este artigo: ${post.title} ${window.location.href}`)}`, '_blank')}
                  className="hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold"
                >
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold"
                >
                  <Share2 size={16} className="mr-1" />
                  Copiar Link
                </Button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mb-16 p-6 bg-muted/30 rounded-lg">
              <div className="flex items-center mb-4">
                <MessageCircle size={20} className="mr-2 text-brand-gold" />
                <h3 className="text-xl font-semibold text-brand-black">Deixe seu comentário</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Tem alguma dúvida ou quer compartilhar sua experiência? Deixe um comentário ou entre em contato conosco!
              </p>
              <Button 
                onClick={() => window.open("https://wa.me/5511964721143?text=Tenho uma dúvida sobre o artigo do blog.", "_blank")}
                variant="outline"
                className="hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold"
              >
                Comentar via WhatsApp
              </Button>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-brand-black mb-8 text-center">Artigos Relacionados</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link 
                      key={relatedPost.slug} 
                      to={`/blog/${relatedPost.slug}`}
                      className="group block"
                    >
                      <article className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                        <img
                          src={relatedPost.thumbnail}
                          alt={relatedPost.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <Badge className="bg-brand-gold/10 text-brand-gold border-brand-gold/20 mb-2 text-xs">
                            {relatedPost.category}
                          </Badge>
                          <h4 className="font-semibold text-brand-black mb-2 line-clamp-2 group-hover:text-brand-gold transition-colors">
                            {relatedPost.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {relatedPost.summary}
                          </p>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Blog */}
            <div className="text-center">
              <Link to="/blog">
                <Button 
                  variant="outline" 
                  className="hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Ver Todos os Artigos
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;