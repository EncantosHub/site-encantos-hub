import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Share2, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getPostBySlug, type BlogPost as BlogPostType } from "@/lib/blogData";
import { useSEO } from "@/hooks/useSEO";

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const foundPost = getPostBySlug(slug || "");
    if (foundPost) {
      setPost(foundPost);
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