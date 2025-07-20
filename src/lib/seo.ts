// src/lib/seo.ts
// SEO Utility System - COMPLETELY SELF-CONTAINED (no external imports)

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
  siteUrl?: string;
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
  ogImageMeta?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  openGraphData?: object;
  twitterCard?: string;
  canonical?: string;
  noindex?: boolean;
  author?: string;
  structuredData?: object;
}

// INTERNAL UTILITY FUNCTIONS (no exports to avoid import issues)

function makeAbsoluteUrl(imageUrl: string, config: SeoConfig): string {
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  const baseUrl = config.siteUrl || `https://${config.businessName.toLowerCase().replace(/\s+/g, '-')}.ch`;
  return `${baseUrl}${imageUrl}`;
}

function selectOgImage(
  contentEntry?: CollectionEntry<'services'> | CollectionEntry<'pages'> | CollectionEntry<'testimonials'>,
  config?: SeoConfig,
  customOgImage?: string
): string {
  
  // Priority 1: Custom image
  if (customOgImage) {
    return customOgImage.startsWith('http') ? customOgImage : makeAbsoluteUrl(customOgImage, config!);
  }
  
  // Priority 2: Service category image
  if (contentEntry?.collection === 'services') {
    const serviceData = contentEntry.data as any;
    const categoryImages: Record<string, string> = {
      massage: '/images/og/massage-therapy.jpg',
      energetic: '/images/og/energy-healing.jpg',
      movement: '/images/og/movement-therapy.jpg',
      consultation: '/images/og/consultation.jpg'
    };
    
    if (serviceData.category && categoryImages[serviceData.category]) {
      return makeAbsoluteUrl(categoryImages[serviceData.category], config!);
    }
  }
  
  // Priority 3: Template default
  const template = config?.defaultTemplate || 'therapist';
  const defaultImages: Record<string, string> = {
    therapist: '/images/og/therapist-default.jpg',
    restaurant: '/images/og/restaurant-default.jpg',
    ecommerce: '/images/og/shop-default.jpg',
    consultant: '/images/og/consulting-default.jpg'
  };
  
  return makeAbsoluteUrl(defaultImages[template] || defaultImages.therapist, config!);
}

function buildOpenGraphData(
  title: string,
  description: string,
  imageUrl: string,
  canonicalUrl: string,
  config: SeoConfig,
  contentType: 'website' | 'article' = 'website'
) {
  return {
    type: contentType,
    title: title,
    description: description,
    url: canonicalUrl,
    site_name: config.businessName,
    locale: 'fr_CH',
    image: {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: `Image de partage pour ${title}`
    }
  };
}

// Extract SEO data from Content Collections
export function extractContentSeo(
  entry: CollectionEntry<'services'> | CollectionEntry<'pages'> | CollectionEntry<'testimonials'>,
  config: SeoConfig
): Partial<SeoData> {
  
  const { data, slug } = entry;
  const template = seoTemplates[config.defaultTemplate];
  
  // Handle testimonials differently (no title/description)
  if (entry.collection === 'testimonials') {
    return {
      keywords: [...template.defaultKeywords]
    };
  }
  
  // Type assertion for services and pages
  const contentData = data as { 
    title: string; 
    description: string; 
    seo?: { metaTitle?: string; metaDescription?: string; keywords?: string[] };
    category?: string;
    benefits?: string[];
  };
  
  // Check for manual SEO override
  if (contentData.seo) {
    return {
      title: contentData.seo.metaTitle || contentData.title,
      description: contentData.seo.metaDescription || contentData.description,
      keywords: contentData.seo.keywords?.length ? contentData.seo.keywords : [...template.defaultKeywords],
    };
  }

  // Auto-generation
  let autoTitle = contentData.title;
  let autoDescription = contentData.description;
  let autoKeywords = [...template.defaultKeywords];

  // Service-specific enhancement
  if (entry.collection === 'services') {
    autoTitle = `${contentData.title}${template.titleSuffix.replace('{businessName}', config.businessName)}`;
    
    if (contentData.benefits && contentData.benefits.length > 0) {
      const firstBenefit = contentData.benefits[0];
      autoDescription = template.descriptionTemplate
        .replace('{service}', contentData.title.toLowerCase())
        .replace('{description}', `${contentData.description} ${firstBenefit}.`);
    }
    
    // Add category keywords
    if (contentData.category === 'massage') {
      autoKeywords.push('massage thérapeutique', 'soin corporel', contentData.title.toLowerCase());
    } else if (contentData.category === 'energetic') {
      autoKeywords.push('énergie', 'chakras', 'harmonisation');
    }
    
    // Add location keywords
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
  config?: SeoConfig,
  canonicalUrl?: string
): SeoData {
  
  // Default config
  const defaultConfig: SeoConfig = {
    businessName: "Votre Entreprise",
    location: "Suisse",
    siteUrl: "https://votre-site.ch",
    defaultTemplate: "therapist",
    defaultKeywords: ["professionnel", "qualité", "service"],
    social: {},
    analytics: {}
  };
  
  const finalConfig = config || defaultConfig;
  const finalCanonicalUrl = canonicalUrl || `${finalConfig.siteUrl}/`;
  
  // Priority 1: Custom SEO override
  if (customSeo?.title) {
    const ogImageUrl = selectOgImage(contentEntry, finalConfig, customSeo.ogImage);
    
    return {
      title: customSeo.title,
      description: customSeo.description || pageDescription || "Description par défaut",
      keywords: customSeo.keywords || finalConfig.defaultKeywords,
      ogTitle: customSeo.ogTitle || customSeo.title,
      ogDescription: customSeo.ogDescription || customSeo.description,
      ogImage: ogImageUrl,
      ogType: customSeo.ogType || "website",
      openGraphData: buildOpenGraphData(
        customSeo.ogTitle || customSeo.title,
        customSeo.ogDescription || customSeo.description || pageDescription || "Description par défaut",
        ogImageUrl,
        finalCanonicalUrl,
        finalConfig,
        customSeo.ogType as 'website' | 'article' || 'website'
      ),
      canonical: customSeo.canonical || finalCanonicalUrl,
      noindex: customSeo.noindex || false,
      ...customSeo
    };
  }
  
  // Priority 2: Content Collection auto-generation
  if (contentEntry) {
    const contentSeo = extractContentSeo(contentEntry, finalConfig);
    const autoOgImageUrl = selectOgImage(contentEntry, finalConfig);
    
    return {
      title: contentSeo.title || pageTitle,
      description: contentSeo.description || pageDescription || "Description générée automatiquement",
      keywords: contentSeo.keywords || finalConfig.defaultKeywords,
      ogTitle: contentSeo.title || pageTitle,
      ogDescription: contentSeo.description || pageDescription,
      ogImage: autoOgImageUrl,
      ogType: contentEntry.collection === 'services' ? 'article' : 'website',
      openGraphData: buildOpenGraphData(
        contentSeo.title || pageTitle,
        contentSeo.description || pageDescription || "Description générée automatiquement",
        autoOgImageUrl,
        finalCanonicalUrl,
        finalConfig,
        contentEntry.collection === 'services' ? 'article' : 'website'
      ),
      canonical: finalCanonicalUrl,
      noindex: false,
      ...contentSeo
    };
  }
  
  // Priority 3: Manual page data (fallback)
  const defaultOgImageUrl = selectOgImage(undefined, finalConfig);
  
  return {
    title: pageTitle,
    description: pageDescription || `Page ${pageTitle} - ${finalConfig.businessName}`,
    keywords: finalConfig.defaultKeywords,
    ogTitle: pageTitle,
    ogDescription: pageDescription || `Découvrez ${pageTitle} avec ${finalConfig.businessName}`,
    ogImage: defaultOgImageUrl,
    ogType: "website",
    openGraphData: buildOpenGraphData(
      pageTitle,
      pageDescription || `Découvrez ${pageTitle} avec ${finalConfig.businessName}`,
      defaultOgImageUrl,
      finalCanonicalUrl,
      finalConfig
    ),
    canonical: finalCanonicalUrl,
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
  config?: SeoConfig,
  canonicalUrl?: string
) {
  const seoData = generateSeoData(
    pageProps.title,
    pageProps.description,
    contentEntry,
    pageProps.customSeo,
    config,
    canonicalUrl
  );
  
  return {
    ...seoData,
    structuredData: contentEntry?.collection === 'services' 
      ? generateServiceStructuredData(contentEntry as CollectionEntry<'services'>, config!)
      : undefined
  };
}