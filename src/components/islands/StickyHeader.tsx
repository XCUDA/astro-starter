// StickyHeader.tsx - VERSION FINALE CLEAN
// Path: src/components/islands/StickyHeader.tsx

import { useEffect, useState, useRef } from 'react';

export interface StickyHeaderProps {
  behavior?: 'always-visible' | 'hide-on-scroll' | 'auto-hide' | 'scroll-up-show' | 'static';
  threshold?: number;
  hideDelay?: number;
  showScrollIndicator?: boolean;
  variant?: 'default' | 'minimal' | 'business' | 'landing';
  scrollSensitivity?: number;
  children: React.ReactNode;
}

export default function StickyHeader({
  behavior = 'always-visible',
  threshold = 100,
  hideDelay = 2000,
  showScrollIndicator = false,
  variant = 'default',
  scrollSensitivity = 5,
  children
}: StickyHeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);

  // Hydratation
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Scroll Logic CORRIGÉE
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? Math.min((scrollY / maxScroll) * 100, 100) : 0;
      
      setIsScrolled(scrollY > 10);
      setScrollProgress(progress);

      // 🎯 LOGIQUE CORRIGÉE
      switch (behavior) {
        case 'static':
          setIsVisible(true);
          break;
          
        case 'always-visible':
          setIsVisible(true); // 🔧 TOUJOURS visible !
          break;
          
        case 'scroll-up-show':
          if (scrollY < threshold) {
            setIsVisible(true);
          } else {
            const scrollingUp = scrollY < lastScrollY.current;
            setIsVisible(scrollingUp);
          }
          break;
          
        case 'hide-on-scroll':
          setIsVisible(scrollY < threshold);
          break;
          
        default:
          setIsVisible(true);
      }

      lastScrollY.current = scrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isClient, behavior, threshold]);

  // CSS Classes - 🎯 Z-INDEX AUGMENTÉ POUR SKIP LINKS
  const getHeaderClasses = () => {
    if (behavior === 'static') {
      return "sticky top-0 z-[9998] w-full bg-background/80 backdrop-blur-sm border-b border-border transition-all duration-300";
    }

    let classes = "fixed top-0 left-0 right-0 z-[9998] transition-all duration-300 ease-in-out";
    
    // Visibility
    if (isVisible) {
      classes += " translate-y-0 opacity-100";
    } else {
      classes += " -translate-y-full opacity-0";
    }
    
    // Background
    if (isScrolled) {
      classes += " bg-background/95 backdrop-blur-md border-b border-border shadow-lg";
    } else {
      classes += " bg-background/80 backdrop-blur-sm border-b border-border";
    }

    return classes;
  };

  const getBehaviorDescription = () => {
    const descriptions = {
      'always-visible': 'Header always visible during scroll',
      'hide-on-scroll': `Header ${isVisible ? 'visible' : 'hidden'} based on scroll position`,
      'scroll-up-show': `Header ${isVisible ? 'visible' : 'hidden'} - shows when scrolling up`,
      'auto-hide': `Header ${isVisible ? 'visible' : 'hidden'} with auto-hide behavior`,
      'static': 'Header with static positioning'
    };
    return descriptions[behavior];
  };

  // Mode SSR
  if (!isClient) {
    return (
      <header 
        className="sticky top-0 z-[9998] w-full bg-background/80 backdrop-blur-sm border-b border-border"
        role="banner"
        aria-label="Main navigation header"
      >
        {children}
      </header>
    );
  }

  return (
    <>
      {/* Live region for screen reader announcements */}
      <div 
        className="sr-only" 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {getBehaviorDescription()}
        {showScrollIndicator && `, Page scroll progress: ${Math.round(scrollProgress)}%`}
      </div>

      <header 
        className={getHeaderClasses()} 
        role="banner"
        id="main-navigation"
        aria-label={`Main navigation header - ${getBehaviorDescription()}`}
        data-sticky-header="dynamic"
        data-behavior={behavior}
        data-visible={isVisible}
        data-scrolled={isScrolled}
      >
        {children}
        
        {showScrollIndicator && isScrolled && (
          <div 
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/20"
            role="progressbar"
            aria-valuenow={Math.round(scrollProgress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Page reading progress: ${Math.round(scrollProgress)}% complete`}
          >
            <div 
              className="h-full bg-primary transition-all duration-300 ease-out" 
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        )}
      </header>
      
      {/* 🎯 SPACER pour compenser le header fixed */}
      <div className="h-16 lg:h-20" aria-hidden="true" />
    </>
  );
}

export function useStickyHeaderState() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? Math.min((scrollY / maxScroll) * 100, 100) : 0;
      
      setIsScrolled(scrollY > 10);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isVisible, isScrolled, scrollProgress };
}