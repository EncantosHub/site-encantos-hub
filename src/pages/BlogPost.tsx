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
import { supabase } from "@/integrations/supabase/client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BlogComment {
  id: string;
  name: string;
  comment: string;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [tableOfContents, setTableOfContents] = useState<Array<{id: string, text: string, level: number}>>([]);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [commentForm, setCommentForm] = useState({name: '', email: '', comment: ''});
  const [loadingComments, setLoadingComments] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);

  // Load likes count from Supabase
  const loadLikesCount = async (postSlug: string) => {
    try {
      const { data, error } = await supabase
        .from('blog_likes')
        .select('likes_count')
        .eq('post_slug', postSlug)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Error loading likes:', error);
      } else {
        setLikesCount(data?.likes_count || 0);
      }
    } catch (error) {
      console.error('Error loading likes:', error);
    }
  };

  // Load comments from Supabase using secure function
  const loadComments = async (postSlug: string) => {
    setLoadingComments(true);
    try {
      const { data, error } = await supabase
        .rpc('get_approved_blog_comments', { post_slug_param: postSlug });

      if (error) {
        console.error('Error loading comments:', error);
        toast({
          title: "Erro ao carregar comentários",
          description: "Não foi possível carregar os comentários. Tente recarregar a página.",
          variant: "destructive"
        });
      } else {
        setComments(data || []);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    const foundPost = getPostBySlug(slug || "");
    if (foundPost) {
      setPost(foundPost);
      
      // Load likes count for this post
      loadLikesCount(foundPost.slug);
      
      // Load comments for this post
      loadComments(foundPost.slug);
      
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

  // Add IDs to headings in the rendered content for table of contents navigation
  useEffect(() => {
    if (post && tableOfContents.length > 0) {
      const contentContainer = document.querySelector('.prose');
      if (contentContainer) {
        const headings = contentContainer.querySelectorAll('h2, h3, h4');
        headings.forEach((heading, index) => {
          if (!heading.id) {
            heading.id = `heading-${index}`;
          }
        });
      }
    }
  }, [post, tableOfContents]);

  useSEO({
    title: post ? `${post.title} | Encantos Hub` : "Artigo não encontrado | Encantos Hub",
    description: post ? post.summary : "O artigo que você procura não foi encontrado.",
    canonical: post ? `https://www.encantoshub.com.br/blog/${post.slug}` : undefined,
    ogTitle: post ? post.title : undefined,
    ogDescription: post ? post.summary : undefined,
    ogImage: post?.thumbnail ? `https://www.encantoshub.com.br${post.thumbnail}` : "https://www.encantoshub.com.br/lovable-uploads/50eafc97-7976-48cf-86d3-511cd2eb5e68.png"
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

  const handleLike = async () => {
    if (!post) return;

    try {
      const { data, error } = await supabase
        .rpc('increment_blog_likes', { post_slug_param: post.slug });

      if (error) {
        console.error('Error incrementing likes:', error);
        toast({
          title: "Erro ao curtir",
          description: "Não foi possível registrar seu like. Tente novamente.",
          variant: "destructive"
        });
      } else {
        setLikesCount(data || 0);
        setIsLiked(true);
        toast({
          title: "Obrigado pelo like!",
          description: "Que bom que você gostou deste artigo!",
        });
      }
    } catch (error) {
      console.error('Error incrementing likes:', error);
      toast({
        title: "Erro ao curtir",
        description: "Não foi possível registrar seu like. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields including email
    if (!commentForm.name.trim() || !commentForm.email.trim() || !commentForm.comment.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha nome, email e comentário.",
        variant: "destructive"
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(commentForm.email.trim())) {
      toast({
        title: "Email inválido",
        description: "Por favor, digite um email válido.",
        variant: "destructive"
      });
      return;
    }

    if (!post) return;

    setSubmittingComment(true);
    try {
      const { error } = await supabase
        .from('blog_comments')
        .insert({
          post_slug: post.slug,
          name: commentForm.name.trim(),
          email: commentForm.email.trim(),
          comment: commentForm.comment.trim()
        });

      if (error) {
        console.error('Error submitting comment:', error);
        toast({
          title: "Erro ao enviar comentário",
          description: "Não foi possível enviar seu comentário. Tente novamente.",
          variant: "destructive"
        });
      } else {
        setCommentForm({ name: '', email: '', comment: '' });
        toast({
          title: "Comentário enviado!",
          description: "Seu comentário foi enviado e está aguardando aprovação."
        });
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast({
        title: "Erro ao enviar comentário",
        description: "Não foi possível enviar seu comentário. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setSubmittingComment(false);
    }
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
                  className="hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold"
                >
                  <Heart size={16} className="mr-2" />
                  Curtir {likesCount > 0 && `(${likesCount})`}
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


            {/* Social Sharing */}
            <div className="mb-16 p-8 bg-gradient-to-r from-brand-gold/20 to-brand-gold/10 border border-brand-gold/30 rounded-lg text-center shadow-lg">
              <h3 className="text-xl font-bold text-brand-black mb-6">🌟 Gostou do conteúdo? Compartilhe!</h3>
              <div className="flex justify-center flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}&hashtags=EncantosHub,SEO,MarketingDigital`, '_blank')}
                  className="bg-white/50 hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold transition-all duration-300"
                >
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="bg-white/50 hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold transition-all duration-300"
                >
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`📖 Confira este artigo da EncantosHub: "${post.title}" ${window.location.href}`)}`, '_blank')}
                  className="bg-white/50 hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold transition-all duration-300"
                >
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const shareText = `📖 Confira este artigo: "${post.title}" - EncantosHub\n\n${window.location.href}\n\n#EncantosHub #MarketingDigital #SEO`;
                    if (navigator.share) {
                      navigator.share({
                        title: post.title,
                        text: shareText,
                        url: window.location.href
                      });
                    } else {
                      window.open('https://www.instagram.com/', '_blank');
                    }
                  }}
                  className="bg-white/50 hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold transition-all duration-300"
                >
                  Instagram
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="bg-white/50 hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold transition-all duration-300"
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
                <h3 className="text-xl font-semibold text-brand-black">Comentários ({comments.length})</h3>
              </div>
              
              {/* Comment Form */}
              <form onSubmit={handleSubmitComment} className="mb-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-black mb-1">
                      Nome *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={commentForm.name}
                      onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-black mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={commentForm.email}
                      onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-brand-black mb-1">
                    Comentário *
                  </label>
                  <textarea
                    id="comment"
                    value={commentForm.comment}
                    onChange={(e) => setCommentForm({ ...commentForm, comment: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-vertical"
                    placeholder="Escreva seu comentário..."
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={submittingComment}
                  className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 disabled:opacity-50"
                >
                  {submittingComment ? "Enviando..." : "Enviar Comentário"}
                </Button>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {loadingComments ? (
                  <p className="text-muted-foreground text-center py-4">
                    Carregando comentários...
                  </p>
                ) : comments.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    Seja o primeiro a comentar! Compartilhe sua opinião sobre este artigo.
                  </p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="border-l-4 border-brand-gold pl-4 py-3 bg-background rounded-r-lg shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center">
                          <span className="text-brand-black font-semibold text-sm">
                            {comment.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-brand-black">{comment.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(comment.created_at).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{comment.comment}</p>
                    </div>
                  ))
                )}
              </div>
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