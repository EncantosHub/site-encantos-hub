# 📝 Sistema de Blog - EncantosHub

## ⚡ Como Adicionar Novos Posts (Método Simplificado)

### 📋 Método Recomendado: Cole HTML Diretamente

1. **Prepare seu conteúdo em HTML**
   - Escreva ou cole seu conteúdo já formatado em HTML
   - Use tags como `<h1>`, `<h2>`, `<p>`, `<ul>`, `<li>`, `<strong>`, `<a>`, etc.

2. **Abra o arquivo: `src/lib/blogData.ts`**

3. **Localize o array `blogPosts` (aproximadamente linha 12)**

4. **Adicione seu novo post no INÍCIO do array (antes do primeiro post existente):**

```typescript
{
  slug: "titulo-do-seu-post", // URL amigável (só letras minúsculas, números e hífens)
  title: "Título que aparece na página",
  summary: "Descrição breve para a listagem de posts",
  date: "2025-01-15", // Data no formato YYYY-MM-DD (posts mais recentes primeiro)
  category: "SEO", // Escolha: SEO, Marketing, Ferramentas, GMN, Conteúdo, Análise
  thumbnail: "/images/blog/sua-imagem.jpg", // Imagem de capa (coloque na pasta public/images/blog/)
  author: "Nome do Autor",
  authorLinkedIn: "https://linkedin.com/in/perfil-do-autor", // OPCIONAL: Link do LinkedIn
  content: \`
    <div style="max-width: 100%; overflow: hidden;">
      <h1>Título Principal</h1>
      <p>Seu conteúdo em HTML aqui...</p>
      <h2>Subtítulo</h2>
      <p>Mais conteúdo...</p>
      <ul>
        <li>Item da lista</li>
        <li>Outro item</li>
      </ul>
      <p><strong>Texto em negrito</strong></p>
      <p><a href="https://example.com" target="_blank" rel="noopener">Link externo</a></p>
    </div>
  \`
},
```

5. **Salve o arquivo** - o novo post aparecerá automaticamente no blog!

## 🖼️ Como Adicionar Imagens

### Estrutura de Imagens do Blog

1. **Pasta dedicada**: Todas as imagens do blog devem ir em `public/images/blog/`
2. **Nomenclatura**: Use nomes descritivos como `seo-guia-2025.jpg`
3. **Formatos**: Prefira JPG para fotos e PNG para gráficos
4. **Tamanho**: Otimize as imagens (máximo 1MB cada)

### Como usar imagens nos posts:

```html
<!-- Imagem no thumbnail (capa do post) -->
thumbnail: "/images/blog/minha-imagem.jpg"

<!-- Imagem dentro do conteúdo -->
<img src="/images/blog/minha-imagem.jpg" alt="Descrição da imagem" style="max-width: 100%; height: auto; display: block; margin: 1rem auto;">

<!-- Imagem com legenda -->
<div style="text-align: center; margin: 2rem 0;">
  <img src="/images/blog/grafico-vendas.jpg" alt="Gráfico mostrando aumento de vendas" style="max-width: 100%; height: auto;">
  <p style="font-size: 0.9em; color: #666; margin-top: 0.5rem;"><em>Gráfico: Aumento de 150% nas vendas após implementação do SEO</em></p>
</div>
```

## 📝 Exemplo Prático de Conteúdo HTML

```html
<div style="max-width: 100%; overflow: hidden;">
  <h1>Como Melhorar seu SEO em 2025</h1>
  <p>O SEO continua sendo fundamental para qualquer negócio online. Neste artigo, vamos explorar as principais estratégias para 2025.</p>

  <h2>Estratégias Fundamentais</h2>
  <ul>
    <li><strong>Pesquisa de palavras-chave:</strong> Identifique termos relevantes para seu nicho</li>
    <li><strong>Conteúdo de qualidade:</strong> Produza material útil e relevante</li>
    <li><strong>Otimização técnica:</strong> Melhore a velocidade e estrutura do site</li>
  </ul>

  <h2>Ferramentas Recomendadas</h2>
  <p>Para implementar essas estratégias, recomendamos:</p>
  <ol>
    <li>Google Search Console</li>
    <li>Google Analytics</li>
    <li>SEMrush ou Ahrefs</li>
  </ol>

  <p>Para saber mais sobre nossos serviços de SEO, <a href="https://encantoshub.com" target="_blank" rel="noopener">visite nosso site</a>.</p>
</div>
```

## 🔧 Template HTML Pronto para Copiar

```html
<div style="max-width: 100%; overflow: hidden;">
  <h1>Título do Seu Post</h1>

  <p>Introdução do seu artigo aqui...</p>

  <h2>Primeiro Subtítulo</h2>

  <p>Conteúdo do primeiro tópico...</p>

  <h3>Sub-subtítulo (se necessário)</h3>

  <p>Conteúdo mais específico...</p>

  <ul>
    <li>Item da lista</li>
    <li>Outro item</li>
    <li>Mais um item</li>
  </ul>

  <h2>Segundo Subtítulo</h2>

  <p>Mais conteúdo...</p>

  <ol>
    <li>Primeiro passo</li>
    <li>Segundo passo</li>
    <li>Terceiro passo</li>
  </ol>

  <p><strong>Texto em negrito importante</strong></p>

  <p><a href="https://suaurl.com" target="_blank" rel="noopener">Link para mais informações</a></p>

  <h2>Conclusão</h2>

  <p>Resumo final do artigo...</p>
</div>
```

## ✏️ Como Editar um Post Existente

1. Encontre o post em `src/lib/blogData.ts`
2. Edite as informações desejadas (título, conteúdo, categoria, etc.)
3. Salve o arquivo
4. As mudanças aparecerão automaticamente no site

## 📂 Categorias Disponíveis

- **SEO**: Posts sobre otimização para mecanismos de busca
- **Marketing**: Estratégias de marketing digital
- **Ferramentas**: Dicas de ferramentas úteis
- **GMN**: Google Meu Negócio
- **Conteúdo**: Marketing de conteúdo
- **Análise**: Análises e métricas

## 🏷️ Tags HTML Permitidas e Recomendadas

### Estrutura do Conteúdo
- `<h1>` - Título principal (apenas um por post)
- `<h2>` - Subtítulos principais
- `<h3>` - Sub-subtítulos
- `<p>` - Parágrafos
- `<div>` - Divisões de conteúdo

### Formatação de Texto
- `<strong>` - Texto em negrito
- `<em>` - Texto em itálico
- `<b>` - Negrito (alternativa)
- `<i>` - Itálico (alternativa)

### Listas
- `<ul>` - Lista não ordenada
- `<ol>` - Lista ordenada  
- `<li>` - Item da lista

### Links
- `<a href="URL" target="_blank" rel="noopener">` - Links para outras páginas

### Outros Elementos
- `<br>` - Quebra de linha
- `<hr>` - Linha horizontal
- `<blockquote>` - Citação
- `<code>` - Código inline
- `<pre>` - Código formatado
- `<img>` - Imagens

## 👤 Sistema de Autores com LinkedIn

### Como adicionar link do LinkedIn ao autor:

```typescript
{
  // ... outros campos do post
  author: "Nome do Autor",
  authorLinkedIn: "https://linkedin.com/in/perfil-do-autor", // OPCIONAL
}
```

- Se você adicionar o campo `authorLinkedIn`, o nome do autor ficará clicável
- O link abrirá em nova aba com segurança (`target="_blank" rel="noopener noreferrer"`)
- O estilo será automaticamente aplicado (cor dourada da marca)

## 🎨 Estilos Automáticos

O sistema aplica automaticamente estilos profissionais aos elementos HTML:

- **Headings**: Tamanhos e cores adequados
- **Parágrafos**: Espaçamento e legibilidade otimizados
- **Listas**: Formatação clara e organizada
- **Links**: Cores da marca (dourado) com hover
- **Texto**: Cores contrastantes para boa leitura
- **Autores**: Links dourados quando LinkedIn está disponível

## 🔒 Segurança

O sistema possui sanitização automática que:

- Remove scripts maliciosos
- Bloqueia eventos JavaScript
- Filtra tags perigosas
- Mantém apenas HTML seguro

## 💡 Dicas Importantes

- **URLs amigáveis**: Use slugs descritivos e sem espaços (ex: "como-fazer-seo")
- **Datas**: Sempre no formato YYYY-MM-DD
- **Imagens**: Coloque as imagens na pasta `public/images/blog/` e referencie como `/images/blog/nome.jpg`
- **Consistência**: Mantenha um padrão na estrutura dos posts
- **HTML válido**: Certifique-se de que todas as tags estão fechadas corretamente
- **Aspas**: Use aspas duplas para atributos HTML
- **Container obrigatório**: Sempre envolva o conteúdo com `<div style="max-width: 100%; overflow: hidden;">`

## ⚠️ Cuidados Importantes

- Sempre feche as tags HTML corretamente
- Use aspas duplas em atributos: `href="url"` não `href='url'`
- Teste sempre o post após adicioná-lo
- Não use tags não suportadas (como `<script>`, `<iframe>`, etc.)
- Mantenha a estrutura com apenas um `<h1>` por post
- **Container obrigatório**: Todo conteúdo DEVE estar dentro de `<div style="max-width: 100%; overflow: hidden;">`

## 🚀 Vantagens do Sistema Atual

✅ HTML puro renderizado corretamente  
✅ Formatação visual profissional  
✅ Headings, listas e links funcionam perfeitamente  
✅ Segurança automatizada  
✅ Fácil de usar - apenas cole o HTML  
✅ Sem processamento adicional necessário  
✅ Sistema de autores com LinkedIn integrado  
✅ Estrutura organizada de imagens  

## 📖 Exemplo de Post Completo

```typescript
{
  slug: "guia-seo-completo",
  title: "Guia Completo de SEO para Pequenas Empresas",
  summary: "Aprenda as estratégias essenciais de SEO para fazer sua empresa aparecer no Google",
  date: "2025-01-15",
  category: "SEO",
  thumbnail: "/images/blog/seo-guia.jpg",
  author: "Isabella Brilha",
  authorLinkedIn: "https://linkedin.com/in/isabella-brilha",
  content: \`
    <div style="max-width: 100%; overflow: hidden;">
      <h1>Guia Completo de SEO para Pequenas Empresas</h1>
      
      <p>Se você tem uma pequena empresa e quer aparecer no Google, este guia é para você. Vamos abordar as estratégias mais eficazes de SEO de forma simples e prática.</p>
      
      <h2>Por que SEO é importante?</h2>
      
      <p>O SEO (Search Engine Optimization) é fundamental porque:</p>
      <ul>
        <li>Aumenta a visibilidade da sua empresa</li>
        <li>Atrai clientes qualificados</li>
        <li>Gera resultados de longo prazo</li>
        <li>Tem baixo custo comparado a anúncios</li>
      </ul>
      
      <img src="/images/blog/importancia-seo.jpg" alt="Gráfico mostrando importância do SEO" style="max-width: 100%; height: auto; display: block; margin: 2rem auto;">
      
      <h2>Primeiros Passos</h2>
      
      <h3>1. Pesquisa de Palavras-chave</h3>
      <p>Identifique o que seus clientes buscam no Google. Use ferramentas como:</p>
      <ol>
        <li>Google Keyword Planner</li>
        <li>Ubersuggest</li>
        <li>Answer The Public</li>
      </ol>
      
      <h3>2. Otimização do Site</h3>
      <p>Certifique-se de que seu site está otimizado para os mecanismos de busca.</p>
      
      <h2>Conclusão</h2>
      
      <p>SEO é um investimento de longo prazo que trará resultados consistentes para sua empresa. <strong>Comece hoje mesmo!</strong></p>
      
      <p>Precisa de ajuda com SEO? <a href="https://encantoshub.com" target="_blank" rel="noopener">Entre em contato conosco</a>.</p>
    </div>
  \`
},
```

Esta estrutura garante que seu conteúdo seja exibido exatamente como uma página web real, com formatação profissional, links funcionais do LinkedIn para autores e todos os elementos HTML funcionando corretamente!