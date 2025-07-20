// src/lib/og-images.ts
// Open Graph Images Generation System

import type { CollectionEntry } from 'astro:content';
import type { SeoConfig } from './seo';

// OG Image templates by business sector
export const ogImageTemplates = {
  therapist: {
    defaultImage: "/images/og/therapist-default.jpg",
    serviceImages: {
      massage: "/images/og/massage-therapy.jpg",
      energetic: "/images/og/energy-healing.jpg", 
      movement: "/images/og/movement-therapy.jpg",
      consultation: "/images/og/consultation.jpg"
    },
    fallbackColor: "#10b981", // green-500 for wellness
    logoPosition: "bottom-right"
  },
  restaurant: {
    defaultImage: "/images/og/restaurant-default.jpg",
    serviceImages: {
      menu: "/images/og/menu-special.jpg",
      event: "/images/og/restaurant-event.jpg",
      catering: "/images/og/catering-service.jpg"
    },
    fallbackColor: "#f59e0b", // amber-500 for food
    logoPosition: "bottom-left"
  },
  ecommerce: {
    defaultImage: "/images/og/shop-default.jpg", 
    serviceImages: {
      product: "/images/og/product-showcase.jpg",
      sale: "/images/og/special-offer.jpg",
      new: "/images/og/new-arrival.jpg"
    },
    fallbackColor: "#3b82f6", // blue-500 for commerce
    logoPosition: "center"
  },
  consultant: {
    defaultImage: "/images/og/consulting-default.jpg",
    serviceImages: {
      strategy: "/images/og/business-strategy.jpg",
      training: "/images/og/professional-training.jpg",
      audit: "/images/og/business-audit.jpg"
    },
    fallbackColor: "#6366f1", // indigo-500 for business
    logoPosition: "top-center"
  }
};

// Generate OG image URL for a service
export function generateOgImageUrl(
  contentEntry: CollectionEntry<'services'> | CollectionEntry<'pages'>,
  config: SeoConfig,
  customOgImage?: string
): string {
  
  // Priority 1: Custom image provided
  if (customOgImage) {
    return ensureAbsoluteUrl(customOgImage, config);
  }
  
  // Priority 2: Service-specific image
  if (contentEntry.collection === 'services') {
    const template = ogImageTemplates[config.defaultTemplate];
    const serviceData = contentEntry.data as { category?: string; featured?: boolean };
    
    // Check for category-specific image
    if (serviceData.category && template.serviceImages[serviceData.category as keyof typeof template.serviceImages]) {
      return ensureAbsoluteUrl(template.serviceImages[serviceData.category as keyof typeof template.serviceImages], config);
    }
    
    // Check for featured service (use default)
    if (serviceData.featured) {
      return ensureAbsoluteUrl(template.defaultImage, config);
    }
  }
  
  // Priority 3: Template default image
  const template = ogImageTemplates[config.defaultTemplate];
  return ensureAbsoluteUrl(template.defaultImage, config);
}

// Generate dynamic OG image with text overlay (future enhancement)
export function generateDynamicOgImage(
  title: string,
  subtitle: string,
  config: SeoConfig,
  template?: keyof typeof ogImageTemplates
): string {
  
  const businessTemplate = template || config.defaultTemplate;
  const templateConfig = ogImageTemplates[businessTemplate];
  
  // For now, return static image
  // TODO: Implement dynamic image generation with Canvas API or service
  return ensureAbsoluteUrl(templateConfig.defaultImage, config);
}

// Ensure URL is absolute for Open Graph
function ensureAbsoluteUrl(imageUrl: string, config: SeoConfig): string {
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // Build absolute URL
  const baseUrl = config.siteUrl || `https://${config.businessName.toLowerCase().replace(/\s+/g, '-')}.ch`;
  return `${baseUrl}${imageUrl}`;
}

// Generate OG image dimensions and metadata
export function getOgImageMeta(imageUrl: string) {
  return {
    url: imageUrl,
    width: 1200,
    height: 630,
    alt: "Image de partage pour les réseaux sociaux"
  };
}

// Validate OG image exists (for development)
export async function validateOgImage(imageUrl: string): Promise<boolean> {
  try {
    // In a real implementation, you'd check if the image exists
    // For now, return true for relative URLs (assume they exist)
    return !imageUrl.startsWith('http') || true;
  } catch {
    return false;
  }
}

// Generate Open Graph data structure
export function generateOpenGraphData(
  title: string,
  description: string,
  imageUrl: string,
  canonicalUrl: string,
  config: SeoConfig,
  contentType: 'website' | 'article' = 'website'
) {
  const imageMeta = getOgImageMeta(imageUrl);
  
  return {
    type: contentType,
    title: title,
    description: description,
    url: canonicalUrl,
    site_name: config.businessName,
    locale: 'fr_CH',
    image: {
      url: imageMeta.url,
      width: imageMeta.width,
      height: imageMeta.height,
      alt: imageMeta.alt
    },
    // Business-specific OG data
    ...(config.defaultTemplate === 'therapist' && {
      'business:contact_data:locality': config.location,
      'business:contact_data:country_name': 'Switzerland'
    }),
    ...(config.defaultTemplate === 'restaurant' && {
      'restaurant:menu': `${canonicalUrl}/menu`,
      'restaurant:contact_info:locality': config.location
    })
  };
}

// Default OG images that should exist in public/images/og/
export const requiredOgImages = [
  // Therapist images
  '/images/og/therapist-default.jpg',
  '/images/og/massage-therapy.jpg', 
  '/images/og/energy-healing.jpg',
  '/images/og/movement-therapy.jpg',
  '/images/og/consultation.jpg',
  
  // Restaurant images
  '/images/og/restaurant-default.jpg',
  '/images/og/menu-special.jpg',
  '/images/og/restaurant-event.jpg', 
  '/images/og/catering-service.jpg',
  
  // E-commerce images
  '/images/og/shop-default.jpg',
  '/images/og/product-showcase.jpg',
  '/images/og/special-offer.jpg',
  '/images/og/new-arrival.jpg',
  
  // Consultant images
  '/images/og/consulting-default.jpg',
  '/images/og/business-strategy.jpg',
  '/images/og/professional-training.jpg',
  '/images/og/business-audit.jpg',
  
  // Global fallback
  '/images/og/default-fallback.jpg'
];