import { blogPosts } from './blogData';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const BASE_URL = 'https://www.encantoshub.com.br';

export const getStaticRoutes = (): SitemapUrl[] => [
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

export const getBlogRoutes = (): SitemapUrl[] => {
  return blogPosts.map(post => ({
    loc: `${BASE_URL}/blog/${post.slug}`,
    lastmod: new Date(post.date).toISOString().split('T')[0],
    changefreq: 'monthly' as const,
    priority: 0.6
  }));
};

export const generateSitemap = (): string => {
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

export const updateSitemapFile = () => {
  // Esta função seria executada durante o build para gerar o sitemap.xml
  const sitemapContent = generateSitemap();
  console.log('Sitemap content generated:', sitemapContent);
  return sitemapContent;
};