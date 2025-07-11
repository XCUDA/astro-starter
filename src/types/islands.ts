// src/types/islands.ts
// Types TypeScript pour les React Islands du Layout Showcase
// Assure la cohérence et la type safety across all components

// =====================================
// Navigation Demo Types
// =====================================

export interface NavigationVariant {
  bgColor: string;
  logoColor: string;
  activeColor: string;
  title: string;
}

export interface NavigationItem {
  icon: string;
  name: string;
  desc: string;
  badge?: string;
}

export interface NavigationDemoProps {
  defaultVariant?: 'default' | 'business' | 'minimal' | 'colorful';
  showVariantSelector?: boolean;
  className?: string;
}

// =====================================
// Mega Menu Demo Types  
// =====================================

export interface MenuItem {
  name: string;
  desc: string;
  icon: string;
}

export interface MenuColumn {
  title: string;
  items: MenuItem[];
}

export interface FeaturedSection {
  title: string;
  name: string;
  desc: string;
  price: string;
  badge: string;
  icon: string;
}

export interface MenuConfig {
  title: string;
  columns: MenuColumn[];
  featured: FeaturedSection;
}

export interface SiteType {
  name: string;
  logo: string;
  promoText: string;
  bgGradient: string;
  accentColor: string;
  menu: MenuConfig;
}

export interface MegaMenuDemoProps {
  defaultSite?: 'business' | 'ecommerce' | 'saas' | 'restaurant';
  showSiteSelector?: boolean;
  className?: string;
}

// =====================================
// Breadcrumbs Demo Types
// =====================================

export interface BreadcrumbItem {
  name: string;
  href: string;
  icon: string;
  current?: boolean;
}

export interface BreadcrumbPath {
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
}

export interface BreadcrumbVariant {
  name: string;
  description: string;
  bgClass: string;
  separatorColor: string;
  linkClass: string;
  currentClass: string;
}

export interface BreadcrumbsDemoProps {
  defaultPath?: 'ecommerce' | 'corporate' | 'saas' | 'education' | 'blog';
  defaultVariant?: 'minimal' | 'outlined' | 'filled' | 'pills' | 'modern';
  showSelectors?: boolean;
  className?: string;
}

// =====================================
// Touch Navigation Demo Types
// =====================================

export interface FABAction {
  icon: string;
  label: string;
  color: string;
  action?: () => void;
}

export interface BottomTab {
  icon: string;
  label: string;
  badge?: string | null;
}

export interface PullToRefreshState {
  pulling: boolean;
  distance: number;
  triggered: boolean;
}

export interface TouchFeedback {
  x: number;
  y: number;
  id: number;
}

export interface TouchNavigationDemoProps {
  enableFAB?: boolean;
  enableBottomNav?: boolean;
  enablePullToRefresh?: boolean;
  enableSwipe?: boolean;
  enableLongPress?: boolean;
  className?: string;
}

// =====================================
// Tab Demo Types
// =====================================

export interface TabItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  component: React.ComponentType<any>;
  badge: string;
}

export interface LayoutTabDemoProps {
  defaultTab?: 'navigation' | 'megamenu' | 'breadcrumbs' | 'touch';
  showTabInfo?: boolean;
  className?: string;
}

// =====================================
// Shared/Common Types
// =====================================

export interface AccessibilityProps {
  announceRef: React.RefObject<HTMLDivElement>;
  announceChange: (message: string) => void;
}

export interface KeyboardNavigationEvent extends React.KeyboardEvent {
  target: HTMLElement;
}

export interface TouchEvent {
  touches: TouchList;
  clientX?: number;
  clientY?: number;
}

export interface DemoFeature {
  name: string;
  description: string;
  implemented: boolean;
  businessValue: string;
}

// =====================================
// Configuration Objects Types
// =====================================

export interface IslandConfig {
  name: string;
  component: string;
  features: DemoFeature[];
  businessUseCase: string[];
  performanceMetrics: {
    bundleSize: string;
    loadTime: string;
    interactionTime: string;
  };
}

// =====================================
// Performance & Analytics Types
// =====================================

export interface PerformanceMetrics {
  loadTime: number;
  interactionTime: number;
  memoryUsage: number;
  bundleSize: number;
}

export interface AnalyticsEvent {
  type: 'demo_interaction' | 'variant_change' | 'tab_switch';
  component: string;
  action: string;
  value?: string | number;
  timestamp: number;
}

// =====================================
// Validation & Error Handling
// =====================================

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

// =====================================
// Theme & Styling Types
// =====================================

export interface ThemeVariant {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
  };
  typography: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
  };
}

// =====================================
// Business Context Types
// =====================================

export interface BusinessContext {
  industry: 'consulting' | 'ecommerce' | 'saas' | 'restaurant' | 'corporate';
  brandColors: string[];
  targetAudience: string;
  primaryCTA: string;
  secondaryCTA?: string;
}

export interface ClientRequirements {
  mustHaveFeatures: string[];
  niceToHaveFeatures: string[];
  performanceTargets: {
    lighthouse: number;
    loadTime: number;
    accessibility: number;
  };
  browserSupport: string[];
}

// =====================================
// Data Structures for Demos
// =====================================

export interface DemoData {
  navigation: {
    variants: Record<string, NavigationVariant>;
    menuItems: NavigationItem[];
  };
  megaMenu: {
    siteTypes: Record<string, SiteType>;
  };
  breadcrumbs: {
    paths: Record<string, BreadcrumbPath>;
    variants: Record<string, BreadcrumbVariant>;
  };
  touch: {
    fabActions: FABAction[];
    bottomTabs: BottomTab[];
  };
}

// =====================================
// Utility Types
// =====================================

export type ComponentVariant = 'default' | 'business' | 'minimal' | 'modern';
export type DemoType = 'navigation' | 'megamenu' | 'breadcrumbs' | 'touch';
export type InteractionType = 'click' | 'swipe' | 'longpress' | 'keyboard';
export type DeviceType = 'desktop' | 'tablet' | 'mobile';

// =====================================
// API Response Types (for future extensions)
// =====================================

export interface DemoConfigResponse {
  config: DemoData;
  version: string;
  lastUpdated: string;
  features: {
    enabled: string[];
    disabled: string[];
  };
}

export interface AnalyticsResponse {
  success: boolean;
  eventId: string;
  timestamp: number;
}

// =====================================
// Type Guards
// =====================================

export const isNavigationVariant = (variant: string): variant is keyof NavigationVariant => {
  return ['default', 'business', 'minimal', 'colorful'].includes(variant);
};

export const isMegaMenuSite = (site: string): site is keyof SiteType => {
  return ['business', 'ecommerce', 'saas', 'restaurant'].includes(site);
};

export const isBreadcrumbPath = (path: string): path is keyof BreadcrumbPath => {
  return ['ecommerce', 'corporate', 'saas', 'education', 'blog'].includes(path);
};

export const isTouchEvent = (event: any): event is TouchEvent => {
  return event && typeof event.touches !== 'undefined';
};

// =====================================
// Constants
// =====================================

export const DEMO_CONSTANTS = {
  ANIMATION_DURATION: 300,
  LONG_PRESS_DURATION: 500,
  SWIPE_THRESHOLD: 100,
  PULL_REFRESH_THRESHOLD: 50,
  KEYBOARD_NAVIGATION_DELAY: 10,
  TOUCH_FEEDBACK_DURATION: 600,
  TAB_FOCUS_TIMEOUT: 50,
} as const;

export const ACCESSIBILITY_CONSTANTS = {
  ARIA_LIVE_REGIONS: ['polite', 'assertive', 'off'] as const,
  KEYBOARD_KEYS: {
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ENTER: 'Enter',
    SPACE: ' ',
    ESCAPE: 'Escape',
    HOME: 'Home',
    END: 'End',
    TAB: 'Tab',
  } as const,
} as const;

export const BUSINESS_CONSTANTS = {
  INDUSTRIES: ['consulting', 'ecommerce', 'saas', 'restaurant', 'corporate'] as const,
  DEMO_TYPES: ['navigation', 'megamenu', 'breadcrumbs', 'touch'] as const,
  VARIANTS: ['default', 'business', 'minimal', 'modern'] as const,
} as const;

// =====================================
// Re-export utility types for convenience
// =====================================

// All interfaces are already exported above with 'export interface'
// No need to re-export them to avoid conflicts