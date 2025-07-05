// StickyHeader.tsx - Fixed Intelligent Sticky Header Behavior Component (Sprint 9 - Step 1)
// Provides advanced sticky behavior with corrected hide/show on scroll logic
// Path: src/components/islands/StickyHeader.tsx

import { useEffect, useState, useRef } from 'react';

export interface StickyHeaderProps {
  behavior?: 'always-visible' | 'hide-on-scroll' | 'auto-hide' | 'scroll-up-show';
  threshold?: number;
  hideDelay?: number;
  showScrollIndicator?: boolean;
  variant?: 'default' | 'minimal' | 'business' | 'landing';
  scrollSensitivity?: number;
  children: React.ReactNode;
}

export default function StickyHeader({
  behavior = 'scroll-up-show',
  threshold = 100,
  hideDelay = 2000,
  showScrollIndicator = false,
  variant = 'default',
  scrollSensitivity = 5,
  children
}: StickyHeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  
  const lastScrollY = useRef(0);
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  const ticking = useRef(false);

  // Throttled scroll handler for performance
  const handleScroll = () => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrollDifference = currentScrollY - lastScrollY.current;
        const isScrollingDown = scrollDifference > 0;
        const isScrollingUp = scrollDifference < 0;
        
        // Update scroll states
        setIsScrolled(currentScrollY > 10);
        setIsAtTop(currentScrollY < 10);
        
        // Calculate scroll progress for indicator
        if (showScrollIndicator) {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollTop = window.scrollY;
          const trackLength = documentHeight - windowHeight;
          const progress = Math.floor((scrollTop / trackLength) * 100);
          setScrollProgress(Math.min(progress, 100));
        }

        // Handle visibility based on behavior
        switch (behavior) {
          case 'always-visible':
            setIsVisible(true);
            break;
            
          case 'hide-on-scroll':
            if (currentScrollY > threshold) {
              setIsVisible(isScrollingUp);
            } else {
              setIsVisible(true);
            }
            break;
            
          case 'auto-hide':
            if (currentScrollY > threshold) {
              if (Math.abs(scrollDifference) > scrollSensitivity) {
                setIsVisible(false);
                // Clear any existing timeout
                if (hideTimeout.current) {
                  clearTimeout(hideTimeout.current);
                }
                // Show header again after delay if not scrolling
                hideTimeout.current = setTimeout(() => {
                  setIsVisible(true);
                }, hideDelay);
              }
            } else {
              setIsVisible(true);
            }
            break;
            
          case 'scroll-up-show':
          default:
            if (currentScrollY > threshold) {
              // Smart scroll detection with sensitivity
              if (isScrollingUp && Math.abs(scrollDifference) > scrollSensitivity) {
                // User is scrolling up with intent - show header
                setIsVisible(true);
              } else if (isScrollingDown && Math.abs(scrollDifference) > scrollSensitivity) {
                // User is scrolling down with intent - hide header
                setIsVisible(false);
              }
              // If scroll difference is too small, maintain current state
            } else {
              // Always show header when near top
              setIsVisible(true);
            }
            break;
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
      ticking.current = true;
    }
  };

  // Enhanced scroll listener with passive option for performance
  useEffect(() => {
    const handleScrollThrottled = () => handleScroll();
    
    window.addEventListener('scroll', handleScrollThrottled, { passive: true });
    
    // Initial call to set correct state
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScrollThrottled);
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    };
  }, [behavior, threshold, hideDelay, showScrollIndicator, scrollSensitivity]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    };
  }, []);

  // Dynamic header classes based on scroll state and variant
  const getHeaderClasses = () => {
    let baseClasses = "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out";
    
    // Visibility classes
    if (isVisible) {
      baseClasses += " translate-y-0 opacity-100";
    } else {
      baseClasses += " -translate-y-full opacity-0";
    }
    
    // Background adaptation based on scroll state and variant
    if (isScrolled && !isAtTop) {
      switch (variant) {
        case 'minimal':
          baseClasses += " bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm";
          break;
        case 'business':
          baseClasses += " bg-card/98 backdrop-blur-md border-b border-border shadow-md";
          break;
        case 'landing':
          baseClasses += " bg-gradient-to-r from-background/95 to-card/95 backdrop-blur-md border-b border-border shadow-lg";
          break;
        case 'default':
        default:
          baseClasses += " bg-background/90 backdrop-blur-md border-b border-border shadow-sm";
          break;
      }
    } else {
      // Original variant styles when at top
      switch (variant) {
        case 'minimal':
          baseClasses += " bg-transparent";
          break;
        case 'business':
          baseClasses += " bg-card/95 backdrop-blur-sm border-b border-border shadow-sm";
          break;
        case 'landing':
          baseClasses += " bg-gradient-to-r from-background/90 to-card/90 backdrop-blur-sm border-b border-border";
          break;
        case 'default':
        default:
          baseClasses += " bg-background/80 backdrop-blur-sm border-b border-border";
          break;
      }
    }
    
    return baseClasses;
  };

  // Calculate dynamic spacer height based on header content
  const getSpacerHeight = () => {
    if (typeof window !== 'undefined') {
      // Try to get actual header height from DOM
      const header = document.querySelector('header');
      if (header) {
        return header.offsetHeight;
      }
    }
    // Fallback based on variant
    switch (variant) {
      case 'minimal':
        return 64; // 16 * 4 = h-16
      case 'business':
      case 'landing':
        return 80; // 20 * 4 = h-20 on lg screens
      default:
        return 64; // Default height
    }
  };

  return (
    <>
      <header className={getHeaderClasses()}>
        {children}
        
        {/* Scroll Progress Indicator */}
        {showScrollIndicator && isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        )}
      </header>
      
      {/* Dynamic Spacer to prevent content jump when header becomes fixed */}
      <div 
        className="sticky-header-spacer transition-all duration-300"
        style={{ 
          height: isVisible ? '0px' : `${getSpacerHeight()}px`
        }}
      />
    </>
  );
}

// Hook for accessing sticky header state in other components
export function useStickyHeaderState() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);
      
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = documentHeight - windowHeight;
      const progress = Math.floor((scrollTop / trackLength) * 100);
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isVisible, isScrolled, scrollProgress };
}