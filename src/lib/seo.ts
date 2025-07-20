// src/lib/seo.ts
// SEO Utility System - Auto generation + Custom override
// Auto-generates meta tags from Content Collections with full customization support

import type { CollectionEntry } from 'astro:content';

// Business sector templates for automatic SEO generation
export const seoTemplates = {
  therapist: {
    titleSuffix: " | Thérapeute Holistique - Bien-être & Relaxation",
    descriptionTemplate: "Découvrez {service} pour votre bien-être. {description}",
    defaultKeywords: ["thérapie", "bien-être", "relaxation", "massage", "santé", "détente"],
    business: {
      type: "HealthAndBeautyBusiness",
      serviceType: "TherapyService"
    }
  },
  restaurant: {
    titleSuffix: " | Restaurant {businessName} - Cuisine Authentique",
    descriptionTemplate: "Savourez {dish} dans notre restaurant. {description}",
    defaultKeywords: ["restaurant", "cuisine", "gastronomie", "réservation", "chef"],
    business: {
      type: "Restaurant",
      serviceType: "FoodService"
    }
  },
  ecommerce: {
    titleSuffix: " | {businessName} - Boutique en Ligne",
    descriptionTemplate: "Achetez {product} de qualité. {description}",
    defaultKeywords: ["boutique", "achat", "qualité", "livraison", "prix"],
    business: {
      type: "Store", 
      serviceType: "OnlineStore"
    }
  },
  consultant: {
    titleSuffix: " | {businessName} - Conseil & Expertise",
    descriptionTemplate: "Services de {service} professionnels. {description}",
    defaultKeywords: ["conseil", "expertise", "professionnel", "service", "solution"],
    business: {
      type: "ProfessionalService",
      serviceType: "ConsultingService"
    }
  }
};

// Global SEO configuration (client customizable)
export interface SeoConfig {
  businessName: string;
  location: string;
  defaultTemplate: keyof typeof seoTemplates;
  defaultKeywords: string[];
  social: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  analytics: {
    ga4?: string;
    plausible?: string;
  };
}

// Content-based SEO data structure
export interface SeoData {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  canonical?: string;
  noindex?: boolean;
  author?: string;
  structuredData?: object;
}

// Extract SEO data from Content Collections
export function extractContentSeo(
  entry: CollectionEntry<'services'> | CollectionEntry<'pages'> | CollectionEntry<'testimonials'>,
  config: SeoConfig
): Partial<SeoData> {
  
  const { data, slug } = entry;
  const template = seoTemplates[config.defaultTemplate];
  
  // Handle different collection types
  if (entry.collection === 'testimonials') {
    // Testimonials don't have title/description, skip auto-generation
    return {
      keywords: [...template.defaultKeywords]
    };
  }
  
  // Type assertion for services and pages (both have title and description)
  const contentData = data as { 
    title: string; 
    description: string; 
    seo?: { metaTitle?: string; metaDescription?: string; keywords?: string[] };
    category?: string;
    benefits?: string[];
  };
  
  // Check for manual SEO override in frontmatter
  if (contentData.seo) {
    return {
      title: contentData.seo.metaTitle || contentData.title,
      description: contentData.seo.metaDescription || contentData.description,
      keywords: contentData.seo.keywords?.length ? contentData.seo.keywords : [...template.defaultKeywords],
    };
  }

  // Auto-generation based on content type
  let autoTitle = contentData.title;
  let autoDescription = contentData.description;
  let autoKeywords = [...template.defaultKeywords];

  // Service-specific auto-generation
  if (entry.collection === 'services') {
    autoTitle = `${contentData.title}${template.titleSuffix.replace('{businessName}', config.businessName)}`;
    
    if (contentData.benefits && contentData.benefits.length > 0) {
      const firstBenefit = contentData.benefits[0];
      autoDescription = template.descriptionTemplate
        .replace('{service}', contentData.title.toLowerCase())
        .replace('{description}', `${contentData.description} ${firstBenefit}.`);
    }
    
    // Add service-specific keywords
    if (contentData.category === 'massage') {
      autoKeywords.push('massage thérapeutique', 'soin corporel', contentData.title.toLowerCase());
    } else if (contentData.category === 'energetic') {
      autoKeywords.push('énergie', 'chakras', 'harmonisation');
    }
    
    // Add location-based keywords
    autoKeywords.push(config.location.toLowerCase(), `${config.location.toLowerCase()} ${contentData.category || 'service'}`);
  }

  return {
    title: autoTitle,
    description: autoDescription,
    keywords: autoKeywords
  };
}

// Generate complete SEO data with fallbacks
export function generateSeoData(
  pageTitle: string,
  pageDescription?: string,
  contentEntry?: CollectionEntry<'services'> | CollectionEntry<'pages'> | CollectionEntry<'testimonials'>,
  customSeo?: Partial<SeoData>,
  config?: SeoConfig
): SeoData {
  
  // Default config if not provided
  const defaultConfig: SeoConfig = {
    businessName: "Votre Entreprise",
    location: "Suisse",
    defaultTemplate: "therapist",
    defaultKeywords: ["professionnel", "qualité", "service"],
    social: {},
    analytics: {}
  };
  
  const finalConfig = config || defaultConfig;
  
  // Priority 1: Custom SEO override (highest priority)
  if (customSeo?.title) {
    return {
      title: customSeo.title,
      description: customSeo.description || pageDescription || "Description par défaut",
      keywords: customSeo.keywords || finalConfig.defaultKeywords,
      ogTitle: customSeo.ogTitle || customSeo.title,
      ogDescription: customSeo.ogDescription || customSeo.description,
      ogImage: customSeo.ogImage || "/og-default.jpg",
      ogType: customSeo.ogType || "website",
      canonical: customSeo.canonical,
      noindex: customSeo.noindex || false,
      ...customSeo
    };
  }
  
  // Priority 2: Content Collection auto-generation
  if (contentEntry) {
    const contentSeo = extractContentSeo(contentEntry, finalConfig);
    return {
      title: contentSeo.title || pageTitle,
      description: contentSeo.description || pageDescription || "Description générée automatiquement",
      keywords: contentSeo.keywords || finalConfig.defaultKeywords,
      ogTitle: contentSeo.title || pageTitle,
      ogDescription: contentSeo.description || pageDescription,
      ogImage: "/og-default.jpg",
      ogType: "website",
      noindex: false,
      ...contentSeo
    };
  }
  
  // Priority 3: Manual page data (fallback)
  const template = seoTemplates[finalConfig.defaultTemplate];
  return {
    title: pageTitle,
    description: pageDescription || `Page ${pageTitle} - ${finalConfig.businessName}`,
    keywords: finalConfig.defaultKeywords,
    ogTitle: pageTitle,
    ogDescription: pageDescription || `Découvrez ${pageTitle} avec ${finalConfig.businessName}`,
    ogImage: "/og-default.jpg", 
    ogType: "website",
    noindex: false
  };
}

// Generate structured data for services
export function generateServiceStructuredData(
  serviceEntry: CollectionEntry<'services'>,
  config: SeoConfig
): object {
  const { data } = serviceEntry;
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.title,
    "description": data.description,
    "provider": {
      "@type": "Organization",
      "name": config.businessName,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CH",
        "addressLocality": config.location
      }
    },
    ...(data.price && { "offers": {
      "@type": "Offer",
      "price": data.price.replace(/[^\d.,]/g, ''),
      "priceCurrency": "CHF"
    }}),
    ...(data.duration && { "duration": data.duration })
  };
}

// Utility for Layout.astro integration
export function prepareSeoForLayout(
  pageProps: {
    title: string;
    description?: string;
    keywords?: string[];
    customSeo?: Partial<SeoData>;
  },
  contentEntry?: CollectionEntry<'services'> | CollectionEntry<'pages'> | CollectionEntry<'testimonials'>,
  config?: SeoConfig
) {
  const seoData = generateSeoData(
    pageProps.title,
    pageProps.description,
    contentEntry,
    pageProps.customSeo,
    config
  );
  
  return {
    ...seoData,
    structuredData: contentEntry?.collection === 'services' 
      ? generateServiceStructuredData(contentEntry as CollectionEntry<'services'>, config!)
      : undefined
  };
}