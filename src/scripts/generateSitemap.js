// Script para gerar sitemap automaticamente
// Este script pode ser executado durante o build ou como parte de um processo de CI/CD

const fs = require('fs');
const path = require('path');

// Simular os blogPosts (em um projeto real, você importaria do módulo)
const blogPosts = [
  { slug: "importancia-presenca-digital", date: "2025-08-12" },
  { slug: "qrcode-avaliacoes", date: "2025-08-12" },
  { slug: "guia-hiperlink", date: "2025-08-12" },
  { slug: "seo-para-imagens", date: "2025-08-12" },
  { slug: "otimizar-gmn", date: "2025-08-12" },
  { slug: "analise-concorrencia-digital", date: "2025-08-12" },
  { slug: "cms-selection-checklist", date: "2025-08-12" },
  { slug: "cms-seo-integration", date: "2025-08-12" }
];

const BASE_URL = 'https://www.encantoshub.com.br';

const getStaticRoutes = () => [
  {
    loc: `${BASE_URL}/`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 1.0
  },
  {
    loc: `${BASE_URL}/blog`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    loc: `${BASE_URL}/ferramentas`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    loc: `${BASE_URL}/ferramentas/diagnostico-gmn`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.6
  }
];

const getBlogRoutes = () => {
  return blogPosts.map(post => ({
    loc: `${BASE_URL}/blog/${post.slug}`,
    lastmod: new Date(post.date).toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.6
  }));
};

const generateSitemap = () => {
  const staticRoutes = getStaticRoutes();
  const blogRoutes = getBlogRoutes();
  const allRoutes = [...staticRoutes, ...blogRoutes];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${route.loc}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemapXml;
};

// Executar a geração do sitemap
const sitemapContent = generateSitemap();
const outputPath = path.join(__dirname, '../public/sitemap.xml');

fs.writeFileSync(outputPath, sitemapContent, 'utf8');
console.log('✅ Sitemap gerado com sucesso em:', outputPath);
console.log(`📄 ${blogPosts.length + 4} URLs incluídas no sitemap`);

module.exports = { generateSitemap };