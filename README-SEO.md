# Configuração SEO - Encantos Hub

Este documento explica como o sistema de SEO foi configurado no projeto e como mantê-lo atualizado.

## 🎯 Configurações Implementadas

### 1. **Sitemap Automático**
- **Arquivo**: `public/sitemap.xml`
- **Utilitário**: `src/lib/sitemapUtils.ts`
- **Script**: `src/scripts/generateSitemap.js`

O sitemap é gerado automaticamente e inclui:
- Todas as páginas estáticas (Home, Blog, Ferramentas, etc.)
- Todos os posts do blog baseados em `src/lib/blogData.ts`
- URLs com prioridades e frequências de atualização apropriadas

### 2. **Robots.txt**
- **Arquivo**: `public/robots.txt`
- **Configuração**:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://www.encantoshub.com.br/sitemap.xml
  ```

### 3. **Hook SEO Automático**
- **Arquivo**: `src/hooks/useSEO.ts`
- **Funcionalidades**:
  - Meta title e description
  - Tag robots (INDEX, FOLLOW por padrão)
  - Link canonical automático
  - Open Graph tags (og:title, og:description, og:image, og:url, og:type)

### 4. **Tags SEO em Todas as Páginas**

#### **Página Inicial (`src/pages/Index.tsx`)**
```typescript
useSEO({
  title: "Consultoria de Marketing Digital e SEO | Encantos Hub",
  description: "Descubra como nossa consultoria de marketing digital pode impulsionar sua presença online. Serviços especializados em SEO, conteúdo e mais.",
  canonical: "https://www.encantoshub.com.br/"
});
```

#### **Blog (`src/pages/Blog.tsx`)**
```typescript
useSEO({
  title: "Blog de Marketing Digital e SEO | Encantos Hub",
  description: "Explore estratégias e dicas sobre marketing digital e SEO. Conteúdo especializado para impulsionar sua presença online.",
  canonical: "https://www.encantoshub.com.br/blog"
});
```

#### **Posts do Blog (`src/pages/BlogPost.tsx`)**
```typescript
useSEO({
  title: post ? `${post.title} | Encantos Hub` : "Artigo não encontrado | Encantos Hub",
  description: post ? post.summary : "O artigo que você procura não foi encontrado.",
  canonical: post ? `https://www.encantoshub.com.br/blog/${post.slug}` : undefined,
  ogImage: post?.thumbnail ? `https://www.encantoshub.com.br${post.thumbnail}` : undefined
});
```

#### **Ferramentas (`src/pages/Ferramentas.tsx`)**
```typescript
useSEO({
  title: "Ferramentas de SEO e Marketing Digital | Encantos Hub",
  description: "Acesse ferramentas profissionais de SEO e marketing digital. Diagnóstico GMN, gerador de mensagens e validador de SEO.",
  canonical: "https://www.encantoshub.com.br/ferramentas"
});
```

#### **Diagnóstico GMN (`src/pages/DiagnosticoGMN.tsx`)**
```typescript
useSEO({
  title: "Diagnóstico GMN - Análise Completa do Google Meu Negócio | Encantos Hub",
  description: "Faça uma análise completa do seu perfil do Google Meu Negócio e receba um diagnóstico personalizado com recomendações práticas.",
  canonical: "https://www.encantoshub.com.br/ferramentas/diagnostico-gmn"
});
```

## 🔄 Como Adicionar Novas Páginas

### 1. **Páginas Estáticas**
1. Adicione a rota em `src/App.tsx`
2. Atualize `getStaticRoutes()` em `src/lib/sitemapUtils.ts`
3. Execute o script de geração do sitemap
4. Use o hook `useSEO` na nova página

### 2. **Posts do Blog**
1. Adicione o novo post em `src/lib/blogData.ts`
2. O sitemap será atualizado automaticamente através de `getBlogRoutes()`
3. Execute o script de geração do sitemap

### 3. **Exemplo de Nova Página**
```typescript
import { useSEO } from "@/hooks/useSEO";

const MinhaNovaPage = () => {
  useSEO({
    title: "Título da Página | Encantos Hub",
    description: "Descrição da página para SEO",
    canonical: "https://www.encantoshub.com.br/minha-nova-pagina"
  });

  return (
    // Conteúdo da página
  );
};
```

## 🛠️ Manutenção

### **Atualizar Sitemap**
```bash
# Executar script de geração
node src/scripts/generateSitemap.js
```

### **Verificar SEO**
1. Acesse cada página e inspecione o HTML
2. Verifique se todas as meta tags estão presentes:
   - `<title>`
   - `<meta name="description">`
   - `<meta name="robots" content="index, follow">`
   - `<link rel="canonical">`
   - Tags Open Graph

### **Monitoramento**
- Google Search Console: `https://search.google.com/search-console`
- Sitemap: `https://www.encantoshub.com.br/sitemap.xml`
- Robots: `https://www.encantoshub.com.br/robots.txt`

## 📝 Notas Importantes

1. **BASE_URL**: Configurado para `https://www.encantoshub.com.br` em `src/lib/sitemapUtils.ts`
2. **Robots padrão**: "index, follow" para todas as páginas
3. **Canonical automático**: Gerado automaticamente baseado na URL atual
4. **Open Graph**: Configurado automaticamente para compartilhamento em redes sociais
5. **Sitemap**: Atualizado automaticamente quando novos posts são adicionados ao `blogData.ts`

## 🎨 Customizações

Para customizar o comportamento SEO de uma página específica:

```typescript
useSEO({
  title: "Título Customizado",
  description: "Descrição customizada",
  canonical: "https://exemplo.com/url-customizada",
  robots: "noindex, nofollow", // Para páginas privadas
  ogImage: "https://exemplo.com/imagem-custom.jpg",
  ogTitle: "Título diferente para compartilhamento",
  ogDescription: "Descrição diferente para compartilhamento"
});
```

Este sistema garante que todas as páginas tenham SEO otimizado automaticamente! 🚀