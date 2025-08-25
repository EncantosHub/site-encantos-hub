import { 
  FileText, 
  Type, 
  Image, 
  Link, 
  Settings, 
  Code, 
  Sparkles 
} from "lucide-react";
import { ChecklistCategory } from "@/pages/CMSSEOChecklist";

export const checklistData: ChecklistCategory[] = [
  {
    id: "metadados",
    title: "Metadados da Página",
    icon: FileText,
    items: [
      {
        id: "meta-title",
        title: "Campo para Título SEO (meta title)",
        priority: "Alto",
        status: "Não implementado",
        description: "Campo específico para inserir o título SEO da página, separado do título do conteúdo"
      },
      {
        id: "meta-description",
        title: "Campo para Descrição SEO (meta description)",
        priority: "Alto",
        status: "Não implementado",
        description: "Campo para criar descrições personalizadas que aparecem nos resultados de busca"
      },
      {
        id: "canonical-tag",
        title: "Campo para Canonical tag",
        priority: "Médio",
        status: "Não implementado",
        description: "Possibilidade de definir a URL canônica para evitar conteúdo duplicado"
      }
    ]
  },
  {
    id: "estrutura-titulos",
    title: "Estrutura de Títulos",
    icon: Type,
    items: [
      {
        id: "multiplos-headings",
        title: "Suporte a múltiplos níveis de heading (H1, H2, H3...)",
        priority: "Alto",
        status: "Não implementado",
        description: "Editor que permite inserir diferentes níveis de títulos para hierarquia de conteúdo"
      },
      {
        id: "campo-h1",
        title: "Campo separado para H1",
        priority: "Médio",
        status: "Não implementado",
        description: "Campo específico para definir o H1 da página, separado do conteúdo principal"
      }
    ]
  },
  {
    id: "imagens-midias",
    title: "Imagens e Mídias",
    icon: Image,
    items: [
      {
        id: "alt-text",
        title: "Campo para Alt Text por imagem",
        priority: "Alto",
        status: "Não implementado",
        description: "Campo obrigatório para inserir texto alternativo em todas as imagens"
      },
      {
        id: "nome-arquivo",
        title: "Controle do nome do arquivo da imagem",
        priority: "Médio",
        status: "Não implementado",
        description: "Possibilidade de renomear arquivos de imagem com nomes SEO-friendly"
      },
      {
        id: "compressao-imagens",
        title: "Compressão automática de imagens",
        priority: "Baixo",
        status: "Não implementado",
        description: "Sistema que otimiza automaticamente o tamanho das imagens para web"
      }
    ]
  },
  {
    id: "urls-links",
    title: "URLs e Links",
    icon: Link,
    items: [
      {
        id: "campo-slug",
        title: "Campo para Slug (URL personalizada)",
        priority: "Alto",
        status: "Não implementado",
        description: "Possibilidade de personalizar a URL de cada página/post"
      },
      {
        id: "redirecionamento-301",
        title: "Redirecionamento 301 ao alterar slug",
        priority: "Alto",
        status: "Não implementado",
        description: "Sistema automático de redirecionamento quando URLs são alteradas"
      },
      {
        id: "links-internos",
        title: "Links internos e âncoras personalizadas",
        priority: "Médio",
        status: "Não implementado",
        description: "Ferramenta para criar links internos e âncoras facilmente"
      },
      {
        id: "nofollow-target",
        title: "Suporte a nofollow e target=\"_blank\"",
        priority: "Baixo",
        status: "Não implementado",
        description: "Opções para configurar atributos de links (nofollow, abrir em nova aba)"
      }
    ]
  },
  {
    id: "configuracoes-tecnicas",
    title: "Configurações Técnicas",
    icon: Settings,
    items: [
      {
        id: "controle-indexacao",
        title: "Controle de indexação por página (noindex/nofollow)",
        priority: "Alto",
        status: "Não implementado",
        description: "Opção para impedir indexação de páginas específicas pelos buscadores"
      },
      {
        id: "sitemap-dinamico",
        title: "Sitemap.xml dinâmico",
        priority: "Alto",
        status: "Não implementado",
        description: "Geração automática e atualização do sitemap XML"
      },
      {
        id: "robots-txt",
        title: "Robots.txt customizável",
        priority: "Médio",
        status: "Não implementado",
        description: "Interface para editar o arquivo robots.txt"
      },
      {
        id: "scripts-personalizados",
        title: "Campo para inserção de scripts (Analytics, Pixel, etc.)",
        priority: "Médio",
        status: "Não implementado",
        description: "Área para inserir códigos de tracking e scripts personalizados"
      }
    ]
  },
  {
    id: "conteudo",
    title: "Conteúdo",
    icon: Code,
    items: [
      {
        id: "editor-html",
        title: "Editor com suporte a tags HTML",
        priority: "Alto",
        status: "Não implementado",
        description: "Editor que permite inserir e editar código HTML diretamente"
      },
      {
        id: "campo-resumo",
        title: "Campo de resumo/excerpt",
        priority: "Médio",
        status: "Não implementado",
        description: "Campo para criar resumos que podem ser usados em listagens e meta descriptions"
      },
      {
        id: "multiplas-imagens",
        title: "Suporte a várias imagens com alt",
        priority: "Médio",
        status: "Não implementado",
        description: "Sistema de galeria com campo alt text para cada imagem"
      }
    ]
  },
  {
    id: "outros-recursos",
    title: "Outros Recursos Importantes",
    icon: Sparkles,
    items: [
      {
        id: "schema-org",
        title: "Compatibilidade com Schema.org",
        priority: "Médio",
        status: "Não implementado",
        description: "Suporte para marcação de dados estruturados (rich snippets)"
      },
      {
        id: "suporte-amp",
        title: "Suporte a AMP",
        priority: "Baixo",
        status: "Não implementado",
        description: "Geração automática de páginas AMP (Accelerated Mobile Pages)"
      },
      {
        id: "hreflang",
        title: "Suporte a Hreflang para multilíngue",
        priority: "Médio",
        status: "Não implementado",
        description: "Sistema para configurar hreflang em sites multilíngues"
      },
      {
        id: "blog-categorias",
        title: "Blog com categorias e tags",
        priority: "Médio",
        status: "Não implementado",
        description: "Sistema de blog com organização por categorias e tags"
      }
    ]
  }
];