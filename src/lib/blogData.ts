export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  thumbnail: string;
  author: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "guia-completo-seo-iniciantes",
    title: "Guia Completo de SEO para Iniciantes",
    summary: "Aprenda os fundamentos do SEO e como aplicar técnicas básicas para melhorar o posicionamento do seu site nos motores de busca.",
    date: "15-01-2024",
    category: "SEO",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    author: "Isabella",
    content: `
      <div class="prose prose-lg max-w-none">
        <h1>Guia Completo de SEO para Iniciantes</h1>
        
        <p class="lead">O SEO (Search Engine Optimization) é fundamental para qualquer negócio que deseja ter visibilidade online. Neste guia completo, você aprenderá os conceitos básicos e técnicas essenciais para começar a otimizar seu site.</p>
        
        <h2>O que é SEO?</h2>
        <p>SEO é o conjunto de técnicas e estratégias utilizadas para melhorar o posicionamento de um site nos resultados orgânicos dos motores de busca, principalmente o Google.</p>
        
        <h2>Por que o SEO é importante?</h2>
        <ul>
          <li>Aumenta a visibilidade online do seu negócio</li>
          <li>Atrai tráfego qualificado e gratuito</li>
          <li>Melhora a credibilidade da sua marca</li>
          <li>Oferece resultados de longo prazo</li>
          <li>Tem melhor ROI que outras estratégias de marketing</li>
        </ul>
        
        <h2>Elementos Fundamentais do SEO</h2>
        
        <h3>1. Pesquisa de Palavras-chave</h3>
        <p>A pesquisa de palavras-chave é a base de qualquer estratégia de SEO. Você precisa entender:</p>
        <ul>
          <li>Quais termos seu público-alvo pesquisa</li>
          <li>Volume de busca de cada palavra-chave</li>
          <li>Dificuldade de rankeamento</li>
          <li>Intenção de busca por trás de cada termo</li>
        </ul>
        
        <h3>2. SEO On-Page</h3>
        <p>Refere-se às otimizações feitas diretamente nas páginas do seu site:</p>
        <ul>
          <li><strong>Title Tags:</strong> Títulos únicos e descritivos para cada página</li>
          <li><strong>Meta Descriptions:</strong> Descrições atrativas que incentivem o clique</li>
          <li><strong>Headers (H1, H2, H3):</strong> Estrutura hierárquica do conteúdo</li>
          <li><strong>URLs amigáveis:</strong> URLs curtas e descritivas</li>
          <li><strong>Conteúdo de qualidade:</strong> Texto relevante e útil para o usuário</li>
        </ul>
        
        <h2>Conclusão</h2>
        <p>SEO é uma estratégia de longo prazo que requer consistência e paciência. Comece implementando as técnicas básicas e vá evoluindo gradualmente.</p>
      </div>
    `
  },
  {
    slug: "otimizacao-google-meu-negocio",
    title: "Como Otimizar seu Google Meu Negócio",
    summary: "Estratégias práticas para maximizar a visibilidade local do seu negócio e atrair mais clientes da sua região.",
    date: "12-01-2024",
    category: "GMN",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    author: "Paloma",
    content: `
      <div class="prose prose-lg max-w-none">
        <h1>Como Otimizar seu Google Meu Negócio</h1>
        
        <p class="lead">O Google Meu Negócio é uma ferramenta essencial para empresas locais aumentarem sua visibilidade nos resultados de busca e atraírem mais clientes.</p>
        
        <h2>O que é o Google Meu Negócio?</h2>
        <p>É uma plataforma gratuita do Google que permite que empresas gerenciem sua presença online nos serviços do Google, incluindo busca e mapas.</p>
        
        <h2>Benefícios da Otimização</h2>
        <ul>
          <li>Maior visibilidade local</li>
          <li>Mais confiança dos clientes</li>
          <li>Aumento nas vendas</li>
          <li>Melhor comunicação com clientes</li>
        </ul>
        
        <h2>Passos para Otimizar</h2>
        
        <h3>1. Complete todas as informações</h3>
        <p>Preencha todos os campos disponíveis com informações precisas e atualizadas.</p>
        
        <h3>2. Adicione fotos de qualidade</h3>
        <p>Inclua fotos do estabelecimento, produtos e equipe para atrair mais clientes.</p>
        
        <h3>3. Colete e responda avaliações</h3>
        <p>Incentive clientes satisfeitos a deixar avaliações e sempre responda a elas.</p>
        
        <h2>Conclusão</h2>
        <p>Um perfil otimizado no Google Meu Negócio é fundamental para o sucesso de negócios locais.</p>
      </div>
    `
  },
  {
    slug: "tendencias-marketing-digital-2024",
    title: "Tendências de Marketing Digital para 2024",
    summary: "Descubra as principais tendências que vão dominar o marketing digital este ano e como se preparar para elas.",
    date: "08-01-2024",
    category: "Marketing",
    thumbnail: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=400&fit=crop",
    author: "Bruno",
    content: `
      <div class="prose prose-lg max-w-none">
        <h1>Tendências de Marketing Digital para 2024</h1>
        
        <p class="lead">O mundo do marketing digital evolui constantemente. Conheça as principais tendências que moldarão 2024.</p>
        
        <h2>1. Inteligência Artificial</h2>
        <p>A IA revoluciona como criamos conteúdo, analisamos dados e personalizamos experiências.</p>
        
        <h2>2. Marketing de Vídeo</h2>
        <p>Vídeos continuam dominando as redes sociais e se tornam cada vez mais essenciais.</p>
        
        <h2>3. Personalização em Massa</h2>
        <p>Criar experiências personalizadas em grande escala usando dados e automação.</p>
        
        <h2>4. Sustentabilidade</h2>
        <p>Consumidores valorizam marcas com propósito e práticas sustentáveis.</p>
        
        <h2>Como se Adaptar</h2>
        <ul>
          <li>Invista em tecnologia</li>
          <li>Foque na experiência do cliente</li>
          <li>Seja autêntico</li>
          <li>Mensure resultados</li>
        </ul>
        
        <h2>Conclusão</h2>
        <p>Mantenha-se atualizado e adapte sua estratégia às novas tendências para manter-se competitivo.</p>
      </div>
    `
  },
  {
    slug: "estrategias-conteudo-seo",
    title: "Estratégias de Conteúdo para SEO",
    summary: "Como criar conteúdo que ranqueia bem nos buscadores e atrai seu público-alvo.",
    date: "05-01-2024",
    category: "SEO",
    thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop",
    author: "Isabella",
    content: `
      <div class="prose prose-lg max-w-none">
        <h1>Estratégias de Conteúdo para SEO</h1>
        
        <p class="lead">Criar conteúdo que ranqueia bem requer estratégia, pesquisa e foco na experiência do usuário.</p>
        
        <h2>Pilares do Conteúdo SEO</h2>
        
        <h3>1. Pesquisa de Palavras-chave</h3>
        <p>Identifique termos relevantes com bom volume de busca e baixa competição.</p>
        
        <h3>2. Intenção de Busca</h3>
        <p>Entenda o que o usuário realmente quer encontrar quando faz uma pesquisa.</p>
        
        <h3>3. Qualidade do Conteúdo</h3>
        <p>Crie conteúdo útil, completo e que resolva os problemas do seu público.</p>
        
        <h2>Técnicas de Otimização</h2>
        <ul>
          <li>Use a palavra-chave no título</li>
          <li>Inclua variações semânticas</li>
          <li>Otimize imagens com alt text</li>
          <li>Crie links internos relevantes</li>
        </ul>
        
        <h2>Mensuração de Resultados</h2>
        <p>Acompanhe métricas como posicionamento, tráfego orgânico e engajamento.</p>
        
        <h2>Conclusão</h2>
        <p>Conteúdo de qualidade otimizado para SEO é fundamental para o sucesso online.</p>
      </div>
    `
  },
  {
    slug: "metricas-importantes-marketing-digital",
    title: "Métricas Importantes no Marketing Digital",
    summary: "Quais indicadores você deve acompanhar para medir o sucesso das suas campanhas de marketing digital.",
    date: "02-01-2024",
    category: "Marketing",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    author: "Bruno",
    content: `
      <div class="prose prose-lg max-w-none">
        <h1>Métricas Importantes no Marketing Digital</h1>
        
        <p class="lead">Medir resultados é essencial para o sucesso no marketing digital. Conheça as principais métricas.</p>
        
        <h2>Métricas de Awareness</h2>
        <ul>
          <li>Alcance</li>
          <li>Impressões</li>
          <li>Visualizações de página</li>
        </ul>
        
        <h2>Métricas de Engajamento</h2>
        <ul>
          <li>Taxa de cliques (CTR)</li>
          <li>Tempo na página</li>
          <li>Taxa de rejeição</li>
        </ul>
        
        <h2>Métricas de Conversão</h2>
        <ul>
          <li>Taxa de conversão</li>
          <li>Custo por aquisição (CPA)</li>
          <li>Retorno sobre investimento (ROI)</li>
        </ul>
        
        <h2>Como Analisar</h2>
        <p>Use ferramentas como Google Analytics para monitorar e analisar suas métricas regularmente.</p>
        
        <h2>Conclusão</h2>
        <p>Foque nas métricas que realmente importam para seus objetivos de negócio.</p>
      </div>
    `
  },
  {
    slug: "otimizacao-velocidade-site",
    title: "Otimização de Velocidade do Site",
    summary: "Técnicas práticas para acelerar seu site e melhorar a experiência do usuário e o SEO.",
    date: "28-12-2023",
    category: "SEO",
    thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=400&fit=crop",
    author: "Paloma",
    content: `
      <div class="prose prose-lg max-w-none">
        <h1>Otimização de Velocidade do Site</h1>
        
        <p class="lead">A velocidade do site é um fator crucial para SEO e experiência do usuário. Aprenda como otimizar.</p>
        
        <h2>Por que a Velocidade Importa</h2>
        <ul>
          <li>Melhora o ranking no Google</li>
          <li>Reduz taxa de rejeição</li>
          <li>Aumenta conversões</li>
          <li>Melhora experiência mobile</li>
        </ul>
        
        <h2>Principais Técnicas</h2>
        
        <h3>1. Otimização de Imagens</h3>
        <p>Comprima imagens sem perder qualidade e use formatos modernos como WebP.</p>
        
        <h3>2. Minimização de Código</h3>
        <p>Remova espaços desnecessários de CSS, JavaScript e HTML.</p>
        
        <h3>3. Cache do Navegador</h3>
        <p>Configure cache para reduzir tempo de carregamento em visitas subsequentes.</p>
        
        <h2>Ferramentas de Teste</h2>
        <ul>
          <li>Google PageSpeed Insights</li>
          <li>GTmetrix</li>
          <li>Pingdom</li>
        </ul>
        
        <h2>Conclusão</h2>
        <p>Investir na velocidade do site traz benefícios significativos para SEO e conversões.</p>
      </div>
    `
  }
];

export const categories = ["Todos", "SEO", "GMN", "Marketing"];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRecentPosts = (limit: number = 3): BlogPost[] => {
  return blogPosts.slice(0, limit);
};