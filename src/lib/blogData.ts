export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  thumbnail: string;
  author: string;
  authorLinkedIn?: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "importancia-presenca-digital",
    title: "Importância da presença digital para aparecer no Google",
    summary: "Descubra por que investir na presença digital é essencial e como o Google Meu Negócio pode ser o primeiro passo para atrair clientes e crescer online.",
    date: "2025-08-12",
    category: "GMN",
    thumbnail: "/images/blog/presenca-digital-empresas.jpg",
    author: "Isabella Brilha",
    authorLinkedIn: "https://linkedin.com/in/isabella-brilha",
    content: `
      <p>Estar presente no digital deixou de ser um diferencial — é uma exigência para empresas que desejam crescer de forma sustentável. Para empreendedores e profissionais de marketing, entender onde investir primeiro, de acordo com o momento do negócio, é o ponto de partida para uma presença digital estratégica.</p>

      <h2 id="aparecer-google">Como aparecer no Google gratuitamente?</h2>
      <p>Se você quer que sua empresa seja encontrada com facilidade nas buscas do Google e no Google Maps, o melhor caminho é criar e manter um <strong>Perfil da Empresa no Google</strong> (antigo Google Meu Negócio).</p>
      
      <p>Esse canal gratuito permite que seu negócio apareça nas pesquisas locais sempre que alguém buscar por produtos ou serviços na sua região. Além da visibilidade, o perfil oferece recursos para atrair e engajar potenciais clientes.</p>

      <h2 id="estrategia-presenca">Estratégia de presença digital eficaz</h2>
      <p>Na EncantosHub, acreditamos que uma boa gestão de presença local começa com um diagnóstico estratégico. Antes de qualquer otimização, analisamos como a empresa aparece nas buscas e qual é sua reputação atual.</p>
      
      <p>Pronto para dar o próximo passo? Entre em contato conosco e descubra como podemos ajudar seu negócio a se destacar no ambiente digital.</p>

      <hr />
      <p>Acesse a <a href="https://encantoshub.com.br/blog" title="Acesse o blog da EncantosHub">página central do nosso Blog</a> e descubra mais conteúdos exclusivos.</p>
    `
  },
  {
    slug: "seo-para-imagens",
    title: "SEO para Imagens: Guia Completo de Otimização [2025]",
    summary: "Aprenda como otimizar suas imagens para SEO, melhorar o rankeamento no Google e garantir acessibilidade com alt text, nomes corretos e compressão ideal.",
    date: "2025-07-17",
    category: "SEO",
    thumbnail: "/images/blog/seo-imagens-otimizacao.jpg",
    author: "Isabella Brilha",
    authorLinkedIn: "https://linkedin.com/in/isabella-brilha",
    content: `
      <p>Otimizar imagens para SEO vai muito além de apenas reduzir o tamanho dos arquivos. É sobre criar uma experiência completa que beneficia tanto usuários quanto mecanismos de busca.</p>

      <h2 id="importancia-seo-imagens">Por que o SEO de imagens é fundamental?</h2>
      <p>As imagens representam uma parcela significativa do peso total de uma página web. Quando mal otimizadas, podem prejudicar drasticamente a velocidade de carregamento.</p>

      <h2 id="nomeacao-estrategica">Nomeação estratégica de arquivos</h2>
      <p>O nome do arquivo é o primeiro sinal que você envia ao Google sobre o conteúdo da imagem. Evite nomes genéricos como "IMG_001.jpg".</p>

      <h2 id="alt-text-perfeito">Alt text: descrevendo para humanos e robôs</h2>
      <p>O texto alternativo é crucial para acessibilidade e SEO. Ele descreve o conteúdo da imagem para leitores de tela e ajuda os mecanismos de busca.</p>

      <hr />
      <p>Acesse a <a href="https://encantoshub.com.br/blog" title="Acesse o blog da EncantosHub">página central do nosso Blog</a> e descubra mais conteúdos exclusivos.</p>
    `
  },
  {
    slug: "qrcode-avaliacoes",
    title: "Como Criar QR Code para Avaliações no Google: Guia Prático",
    summary: "Aprenda a criar QR Codes eficazes para facilitar avaliações no Google Meu Negócio, aumentar sua reputação online e conquistar mais clientes locais.",
    date: "2025-07-17",
    category: "GMN",
    thumbnail: "/images/blog/qr-code-avaliacoes.jpg",
    author: "Isabella Brilha",
    authorLinkedIn: "https://linkedin.com/in/isabella-brilha",
    content: `
      <p>Conseguir avaliações positivas no Google é uma das estratégias mais eficazes para fortalecer a reputação do seu negócio online.</p>

      <h2 id="importancia-avaliacoes">Por que as avaliações no Google são fundamentais?</h2>
      <p>As avaliações no Google Meu Negócio funcionam como um termômetro da confiança que seus clientes têm no seu negócio.</p>

      <h2 id="criar-qr-code">Como criar seu QR Code para avaliações</h2>
      <p>O processo é mais simples do que parece. Aqui está o passo a passo completo.</p>

      <hr />
      <p>Acesse a <a href="https://encantoshub.com.br/blog" title="Acesse o blog da EncantosHub">página central do nosso Blog</a> e descubra mais conteúdos exclusivos.</p>
    `
  }
];

export const categories = ["GMN", "SEO", "Marketing", "Análise"];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRecentPosts = (limit: number = 3): BlogPost[] => {
  return blogPosts.slice(0, limit);
};