// src/pages/robots.txt.ts
// Automatic robots.txt generation endpoint

import { SitemapGenerator } from '@/lib/sitemap';
import type { SeoConfig } from '@/lib/seo';

export async function GET() {
  
  // ✅ CONFIGURATION SEO - À adapter par client (même que sitemap.xml)
  const seoConfig: SeoConfig = {
    businessName: "Cabinet Wellness Lausanne",
    location: "Lausanne", 
    siteUrl: "https://cabinet-wellness.ch",
    defaultTemplate: "therapist",
    defaultKeywords: ["thérapie", "bien-être", "Lausanne", "massage", "relaxation"],
    social: {},
    analytics: {}
  };
  
  try {
    const generator = new SitemapGenerator(seoConfig);
    const robotsTxt = generator.generateRobots();
    
    return new Response(robotsTxt, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400', // Cache 24 hours
      },
    });
    
  } catch (error) {
    console.error('Robots.txt generation error:', error);
    
    // Fallback minimal robots.txt
    const fallbackRobots = `User-agent: *
Allow: /

Sitemap: ${seoConfig.siteUrl}/sitemap.xml

Disallow: /api/
Disallow: /_astro/
Disallow: /admin/`;
    
    return new Response(fallbackRobots, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }
}

/* 
RÉSULTAT AUTOMATIQUE robots.txt :

User-agent: *
Allow: /

# Sitemaps
Sitemap: https://cabinet-wellness.ch/sitemap.xml

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
Allow: /booking
Allow: /testimonials

URL: https://votre-site.ch/robots.txt
Adaptation: Automatique selon defaultTemplate
*/