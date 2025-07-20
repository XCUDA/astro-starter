// src/pages/sitemap.xml.ts
// Automatic sitemap.xml generation endpoint

import { getCollection, type CollectionEntry } from 'astro:content';
import { SitemapGenerator } from '@/lib/sitemap';
import type { SeoConfig } from '@/lib/seo';

export async function GET() {
  
  // ✅ CONFIGURATION SEO - À adapter par client
  const seoConfig: SeoConfig = {
    businessName: "Cabinet Wellness Lausanne",
    location: "Lausanne",
    siteUrl: "https://cabinet-wellness.ch", // ✅ URL IMPORTANTE pour sitemap
    defaultTemplate: "therapist",
    defaultKeywords: ["thérapie", "bien-être", "Lausanne", "massage", "relaxation"],
    social: {},
    analytics: {}
  };
  
  try {
    // Get all content collections
    const services = await getCollection('services');
    const pages = await getCollection('pages');
    
    // Optional collections with proper typing
    let testimonials: CollectionEntry<'testimonials'>[] = [];
    let booking: CollectionEntry<'booking'>[] = [];
    
    try {
      testimonials = await getCollection('testimonials');
    } catch {
      testimonials = [];
    }
    
    try {
      booking = await getCollection('booking');
    } catch {
      booking = [];
    }
    
    // Generate sitemap
    const generator = new SitemapGenerator(seoConfig);
    const sitemapXml = await generator.generateForCollections({
      services,
      pages,
      testimonials,
      booking
    });
    
    return new Response(sitemapXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache 1 hour
      },
    });
    
  } catch (error) {
    console.error('Sitemap generation error:', error);
    
    // Fallback minimal sitemap
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${seoConfig.siteUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${seoConfig.siteUrl}/services</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${seoConfig.siteUrl}/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
    
    return new Response(fallbackSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  }
}

/* 
RÉSULTAT AUTOMATIQUE :

Le sitemap.xml génère automatiquement :

1. ✅ Pages statiques (priorité 1.0-0.8)
   - / (accueil)
   - /services 
   - /about
   - /contact

2. ✅ Services (priorité 0.9-0.8)
   - /services/massage-therapeutique
   - /services/reflexologie-plantaire
   - Services featured en premier

3. ✅ Pages content (priorité 0.7-0.6)
   - Pages depuis Content Collections
   - Tri par order frontmatter

4. ✅ Pages business selon template
   - Therapist: /booking, /testimonials
   - Restaurant: /menu, /reservations, /events
   - E-commerce: /shop, /cart, /account

URL: https://votre-site.ch/sitemap.xml
Mise à jour: Automatique à chaque build
*/