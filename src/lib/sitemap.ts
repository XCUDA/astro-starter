// src/lib/sitemap.ts
// Automatic Sitemap Generation from Content Collections

import type { CollectionEntry } from 'astro:content';
import type { SeoConfig } from './seo';

interface SitemapUrl {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

// Generate sitemap data from Content Collections
export async function generateSitemapData(
  config: SeoConfig,
  collections: {
    services: CollectionEntry<'services'>[];
    pages: CollectionEntry<'pages'>[];
    testimonials?: CollectionEntry<'testimonials'>[];
    booking?: CollectionEntry<'booking'>[];
  }
): Promise<SitemapUrl[]> {
  
  const baseUrl = config.siteUrl || `https://${config.businessName.toLowerCase().replace(/\s+/g, '-')}.ch`;
  const urls: SitemapUrl[] = [];
  
  // 1. Static pages (highest priority)
  const staticPages = [
    { path: '/', priority: 1.0, changefreq: 'weekly' as const },
    { path: '/services', priority: 0.9, changefreq: 'weekly' as const },
    { path: '/about', priority: 0.8, changefreq: 'monthly' as const },
    { path: '/contact', priority: 0.9, changefreq: 'monthly' as const },
  ];
  
  staticPages.forEach(page => {
    urls.push({
      url: `${baseUrl}${page.path}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: page.changefreq,
      priority: page.priority
    });
  });
  
  // 2. Services pages (high priority)
  collections.services
    .sort((a, b) => (b.data.featured ? 1 : 0) - (a.data.featured ? 1 : 0)) // Featured first
    .forEach(service => {
      urls.push({
        url: `${baseUrl}/services/${service.slug}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: service.data.featured ? 0.9 : 0.8
      });
    });
  
  // 3. Content pages (medium priority)  
  collections.pages
    .sort((a, b) => (a.data.order || 999) - (b.data.order || 999))
    .forEach(page => {
      urls.push({
        url: `${baseUrl}/${page.slug}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: page.data.featured ? 0.7 : 0.6
      });
    });
  
  // 4. Business-specific pages based on template
  if (config.defaultTemplate === 'therapist') {
    const therapistPages = [
      { path: '/booking', priority: 0.8, changefreq: 'weekly' as const },
      { path: '/testimonials', priority: 0.6, changefreq: 'monthly' as const },
    ];
    
    therapistPages.forEach(page => {
      urls.push({
        url: `${baseUrl}${page.path}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: page.changefreq,
        priority: page.priority
      });
    });
  } else if (config.defaultTemplate === 'restaurant') {
    const restaurantPages = [
      { path: '/menu', priority: 0.9, changefreq: 'weekly' as const },
      { path: '/reservations', priority: 0.8, changefreq: 'daily' as const },
      { path: '/events', priority: 0.7, changefreq: 'weekly' as const },
    ];
    
    restaurantPages.forEach(page => {
      urls.push({
        url: `${baseUrl}${page.path}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: page.changefreq,
        priority: page.priority
      });
    });
  } else if (config.defaultTemplate === 'ecommerce') {
    const ecommercePages = [
      { path: '/shop', priority: 0.9, changefreq: 'daily' as const },
      { path: '/cart', priority: 0.7, changefreq: 'always' as const },
      { path: '/account', priority: 0.6, changefreq: 'weekly' as const },
    ];
    
    ecommercePages.forEach(page => {
      urls.push({
        url: `${baseUrl}${page.path}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: page.changefreq,
        priority: page.priority
      });
    });
  }
  
  return urls.sort((a, b) => (b.priority || 0) - (a.priority || 0));
}

// Generate XML sitemap content
export function generateSitemapXml(urls: SitemapUrl[]): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';
  
  const urlEntries = urls.map(urlData => {
    let entry = `  <url>\n    <loc>${urlData.url}</loc>`;
    
    if (urlData.lastmod) {
      entry += `\n    <lastmod>${urlData.lastmod}</lastmod>`;
    }
    
    if (urlData.changefreq) {
      entry += `\n    <changefreq>${urlData.changefreq}</changefreq>`;
    }
    
    if (urlData.priority !== undefined) {
      entry += `\n    <priority>${urlData.priority.toFixed(1)}</priority>`;
    }
    
    entry += '\n  </url>';
    return entry;
  }).join('\n');
  
  return `${xmlHeader}\n${urlsetOpen}\n${urlEntries}\n${urlsetClose}`;
}

// Generate robots.txt content
export function generateRobotsTxt(config: SeoConfig): string {
  const baseUrl = config.siteUrl || `https://${config.businessName.toLowerCase().replace(/\s+/g, '-')}.ch`;
  
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Common crawl optimizations
Crawl-delay: 1

# Block common unwanted paths
Disallow: /api/
Disallow: /_astro/
Disallow: /admin/
Disallow: /.well-known/

# Allow important business pages
Allow: /services/
Allow: /about
Allow: /contact
${config.defaultTemplate === 'therapist' ? 'Allow: /booking\nAllow: /testimonials' : ''}
${config.defaultTemplate === 'restaurant' ? 'Allow: /menu\nAllow: /reservations' : ''}
${config.defaultTemplate === 'ecommerce' ? 'Allow: /shop\nAllow: /products' : ''}`;
}

// Utility functions for Astro endpoints
export class SitemapGenerator {
  constructor(private config: SeoConfig) {}
  
  async generateForCollections(collections: Parameters<typeof generateSitemapData>[1]) {
    const urls = await generateSitemapData(this.config, collections);
    return generateSitemapXml(urls);
  }
  
  generateRobots() {
    return generateRobotsTxt(this.config);
  }
  
  // Get sitemap statistics for debugging
  async getStats(collections: Parameters<typeof generateSitemapData>[1]) {
    const urls = await generateSitemapData(this.config, collections);
    
    return {
      totalUrls: urls.length,
      byPriority: {
        high: urls.filter(u => (u.priority || 0) >= 0.8).length,
        medium: urls.filter(u => (u.priority || 0) >= 0.6 && (u.priority || 0) < 0.8).length,
        low: urls.filter(u => (u.priority || 0) < 0.6).length,
      },
      byChangeFreq: {
        daily: urls.filter(u => u.changefreq === 'daily').length,
        weekly: urls.filter(u => u.changefreq === 'weekly').length,
        monthly: urls.filter(u => u.changefreq === 'monthly').length,
      }
    };
  }
}