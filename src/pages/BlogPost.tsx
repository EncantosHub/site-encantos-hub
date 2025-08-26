import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ArrowLeft, Calendar, User, Share2, Heart, Clock, Home, MessageCircle, BookOpen, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getPostBySlug, getRecentPosts, type BlogPost as BlogPostType } from "@/lib/blogData";
import { useSEO } from "@/hooks/useSEO";

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [tableOfContents, setTableOfContents] = useState<{id: string, title: string}[]>([]);

  useEffect(() => {
    const foundPost = getPostBySlug(slug || "");
    if (foundPost) {
      setPost(foundPost);
      
      // Get related posts (same category, excluding current post)
      const recentPosts = getRecentPosts(6);
      const related = recentPosts
        .filter(p => p.slug !== foundPost.slug && p.category === foundPost.category)
        .slice(0, 3);
      setRelatedPosts(related);

      // Extract table of contents from post content
      const parser = new DOMParser();
      const doc = parser.parseFromString(foundPost.content, 'text/html');
      const headings = doc.querySelectorAll('h2[id], h3[id]');
      const toc = Array.from(headings).map(heading => ({
        id: heading.id,
        title: heading.textContent || ''
      }));
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
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const text = doc.body.textContent || '';
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
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
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center gap-1">
                    <Home size={16} />
                    Home
                  </Link>
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
                <BreadcrumbLink asChild>
                  <Link to={`/blog?category=${post.category}`}>{post.category}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-brand-gold font-medium">{post.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Article Header */}
        <article className="pb-8">
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
              
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
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
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{calculateReadingTime(post.content)} min de leitura</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mb-8">
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

            {/* Introduction/Lead */}
            <div className="mb-8 p-6 bg-muted/50 rounded-lg border-l-4 border-brand-gold">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {post.summary}
              </p>
            </div>

            {/* Table of Contents */}
            {tableOfContents.length > 0 && (
              <div className="mb-12 p-6 bg-gradient-to-r from-brand-gold/10 to-brand-gold/5 rounded-lg border">
                <h2 className="text-xl font-bold text-brand-black mb-4 flex items-center gap-2">
                  <BookOpen size={20} />
                  Sumário do Artigo
                </h2>
                <ul className="space-y-2">
                  {tableOfContents.map((item, index) => (
                    <li key={item.id}>
                      <a 
                        href={`#${item.id}`}
                        className="flex items-center gap-2 text-muted-foreground hover:text-brand-gold transition-colors"
                      >
                        <span className="text-sm font-medium text-brand-gold">{index + 1}.</span>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-brand-black prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-muted-foreground prose-strong:text-brand-black prose-a:text-brand-gold hover:prose-a:text-brand-gold/80 prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:mb-2 prose-headings:scroll-mt-20"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Highlight Box */}
            <div className="my-16 p-8 bg-gradient-to-r from-brand-gold/20 to-brand-gold/10 rounded-lg border-l-4 border-brand-gold">
              <h3 className="text-xl font-bold text-brand-black mb-4">💡 Dica de Ouro</h3>
              <p className="text-muted-foreground">
                A implementação das estratégias apresentadas neste artigo pode transformar seus resultados. 
                Lembre-se: consistência é mais importante que perfeição. Comece pequeno e vá evoluindo gradualmente.
              </p>
            </div>

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

            {/* Share Section */}
            <div className="mt-12 p-6 bg-muted/30 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-brand-black mb-4">Compartilhe este artigo</h3>
              <div className="flex justify-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                >
                  LinkedIn
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
                >
                  Twitter
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(post.title + ' - ' + window.location.href)}`, '_blank')}
                >
                  WhatsApp
                </Button>
              </div>
            </div>

            {/* Comments/Interaction Section */}
            <div className="mt-12 p-6 bg-muted/20 rounded-lg">
              <h3 className="text-lg font-semibold text-brand-black mb-4 flex items-center gap-2">
                <MessageCircle size={20} />
                Deixe seu comentário
              </h3>
              <p className="text-muted-foreground mb-4">
                O que você achou deste artigo? Tem alguma dúvida ou sugestão? 
                Gostaríamos muito de ouvir sua opinião!
              </p>
              <Button 
                onClick={() => window.open("https://wa.me/5511964721143?text=Vim do blog e gostaria de comentar sobre o artigo: " + post.title, "_blank")}
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black"
              >
                Enviar Comentário via WhatsApp
              </Button>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-brand-black mb-8 flex items-center gap-2">
                  <BookOpen size={24} />
                  Artigos Relacionados
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <article key={relatedPost.slug} className="bg-card rounded-lg overflow-hidden shadow-elegant hover:shadow-lg transition-shadow">
                      <img 
                        src={relatedPost.thumbnail} 
                        alt={relatedPost.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <Badge className="bg-brand-gold text-brand-black mb-3">
                          {relatedPost.category}
                        </Badge>
                        <h4 className="font-semibold text-brand-black mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {relatedPost.summary}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{relatedPost.date}</span>
                          <Link 
                            to={`/blog/${relatedPost.slug}`}
                            className="inline-flex items-center text-brand-gold hover:text-brand-gold/80 transition-colors text-sm font-medium"
                          >
                            Ler artigo
                            <ChevronRight size={16} className="ml-1" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;