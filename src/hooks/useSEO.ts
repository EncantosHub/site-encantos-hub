import { useEffect } from 'react';
import { BASE_URL } from '@/lib/sitemapUtils';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export const useSEO = ({
  title,
  description,
  canonical,
  robots = 'index, follow',
  ogTitle,
  ogDescription,
  ogImage
}: SEOProps) => {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Robots
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', robots);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = robots;
      document.head.appendChild(meta);
    }

    // Canonical
    const currentCanonical = canonical || `${BASE_URL}${window.location.pathname}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) {
      linkCanonical.setAttribute('href', currentCanonical);
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = currentCanonical;
      document.head.appendChild(link);
    }

    // Open Graph Title
    const currentOgTitle = ogTitle || title;
    let metaOgTitle = document.querySelector('meta[property="og:title"]');
    if (metaOgTitle) {
      metaOgTitle.setAttribute('content', currentOgTitle);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.content = currentOgTitle;
      document.head.appendChild(meta);
    }

    // Open Graph Description
    const currentOgDescription = ogDescription || description;
    let metaOgDescription = document.querySelector('meta[property="og:description"]');
    if (metaOgDescription) {
      metaOgDescription.setAttribute('content', currentOgDescription);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.content = currentOgDescription;
      document.head.appendChild(meta);
    }

    // Open Graph Image
    if (ogImage) {
      let metaOgImage = document.querySelector('meta[property="og:image"]');
      if (metaOgImage) {
        metaOgImage.setAttribute('content', ogImage);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:image');
        meta.content = ogImage;
        document.head.appendChild(meta);
      }
    }

    // Open Graph URL
    let metaOgUrl = document.querySelector('meta[property="og:url"]');
    if (metaOgUrl) {
      metaOgUrl.setAttribute('content', currentCanonical);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:url');
      meta.content = currentCanonical;
      document.head.appendChild(meta);
    }

    // Open Graph Type
    let metaOgType = document.querySelector('meta[property="og:type"]');
    if (metaOgType) {
      metaOgType.setAttribute('content', 'website');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:type');
      meta.content = 'website';
      document.head.appendChild(meta);
    }

  }, [title, description, canonical, robots, ogTitle, ogDescription, ogImage]);
};