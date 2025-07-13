// ScrollIndicators.tsx - Professional Scroll Tracking System - PHASE 6+ STANDARDS
// Provides multiple scroll indicators for modern web applications with enhanced accessibility
// Path: src/components/islands/ScrollIndicators.tsx

import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

// Types for scroll indicators
export interface ScrollSection {
  id: string;
  title: string;
  element?: HTMLElement;
  level?: number; // For nested headings (h2=1, h3=2, etc.)
}

export interface ScrollProgress {
  percentage: number;
  currentSection?: ScrollSection;
  visibleSections: ScrollSection[];
}

// ===== PHASE 6+ ACCESSIBILITY HOOKS =====

// Live region announcer hook for screen readers
function useAnnouncer() {
  const announceRef = useRef<HTMLDivElement>(null);

  const announceChange = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (announceRef.current) {
      announceRef.current.setAttribute('aria-live', priority);
      announceRef.current.textContent = message;
      
      // Clear after announcement to allow repeat announcements
      setTimeout(() => {
        if (announceRef.current) {
          announceRef.current.textContent = '';
        }
      }, 1000);
    }
  }, []);

  return { announceRef, announceChange };
}

// Enhanced keyboard navigation hook for scroll components
function useScrollKeyboardNavigation(onKeyDown?: (e: React.KeyboardEvent) => void) {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Standard navigation shortcuts
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (e.currentTarget instanceof HTMLElement) {
          e.currentTarget.click();
        }
        break;
      case 'Escape':
        if (e.currentTarget instanceof HTMLElement) {
          e.currentTarget.blur();
        }
        break;
      case 'Home':
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'End':
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        break;
      default:
        // Custom handler for component-specific navigation
        if (onKeyDown) {
          onKeyDown(e);
        }
        break;
    }
  }, [onKeyDown]);

  return { handleKeyDown };
}

// Hook for scroll tracking with enhanced announcements
export function useScrollProgress(sections: ScrollSection[] = []) {
  const [progress, setProgress] = useState<ScrollProgress>({
    percentage: 0,
    visibleSections: []
  });
  
  const ticking = useRef(false);
  const { announceChange } = useAnnouncer();
  const lastAnnouncedSection = useRef<string | null>(null);

  const calculateProgress = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const trackLength = documentHeight - windowHeight;
        const percentage = Math.min((scrollTop / trackLength) * 100, 100);

        // Find current and visible sections
        const visibleSections: ScrollSection[] = [];
        let currentSection: ScrollSection | undefined;

        sections.forEach(section => {
          const element = section.element || document.getElementById(section.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < windowHeight && rect.bottom > 0;
            
            if (isVisible) {
              visibleSections.push(section);
              
              // Current section is the one closest to top of viewport
              if (rect.top <= windowHeight / 3 && rect.bottom > windowHeight / 3) {
                currentSection = section;
              }
            }
          }
        });

        // PHASE 6+ STANDARD: Announce section changes
        if (currentSection && currentSection.id !== lastAnnouncedSection.current) {
          announceChange(`Now viewing section: ${currentSection.title}`);
          lastAnnouncedSection.current = currentSection.id;
        }

        setProgress({
          percentage: Math.floor(percentage),
          currentSection,
          visibleSections
        });

        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [sections, announceChange]);

  useEffect(() => {
    calculateProgress(); // Initial calculation
    window.addEventListener('scroll', calculateProgress, { passive: true });
    window.addEventListener('resize', calculateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', calculateProgress);
    };
  }, [calculateProgress]);

  return progress;
}

// Reading Progress Bar Component with Phase 6+ Standards
export interface ReadingProgressProps {
  position?: 'top' | 'bottom';
  height?: number;
  className?: string;
  showPercentage?: boolean;
  color?: 'primary' | 'secondary' | 'accent' | 'custom';
  customColor?: string;
  ariaLabel?: string;
}

export function ReadingProgress({
  position = 'top',
  height = 3,
  className,
  showPercentage = false,
  color = 'primary',
  customColor,
  ariaLabel = 'Reading progress'
}: ReadingProgressProps) {
  const { percentage } = useScrollProgress();
  const { announceRef, announceChange } = useAnnouncer();
  const lastAnnouncedProgress = useRef(0);

  // PHASE 6+ STANDARD: Announce progress milestones
  useEffect(() => {
    const milestone = Math.floor(percentage / 25) * 25; // 0%, 25%, 50%, 75%, 100%
    if (milestone !== lastAnnouncedProgress.current && milestone > 0) {
      announceChange(`Reading progress: ${milestone}% complete`);
      lastAnnouncedProgress.current = milestone;
    }
  }, [percentage, announceChange]);

  const getColorClasses = () => {
    if (customColor || color === 'custom') return '';
    
    const colors: Record<Exclude<typeof color, 'custom'>, string> = {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      accent: 'bg-accent'
    };
    return colors[color];
  };

  const getPositionClasses = () => {
    return position === 'top' 
      ? 'fixed top-0 left-0 right-0 z-50' 
      : 'fixed bottom-0 left-0 right-0 z-50';
  };

  return (
    <>
      {/* PHASE 6+ STANDARD: Live region for screen reader announcements */}
      <div ref={announceRef} className="sr-only" aria-live="polite" />
      
      <div 
        className={cn('w-full bg-muted/30', getPositionClasses(), className)}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${ariaLabel}: ${percentage}% complete`}
        tabIndex={0}
      >
        <div
          className={cn(
            'transition-all duration-300 ease-out',
            getColorClasses()
          )}
          style={{
            width: `${percentage}%`,
            height: `${height}px`,
            backgroundColor: customColor || undefined
          }}
        />
        {showPercentage && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs font-medium text-foreground">
            {percentage}%
          </div>
        )}
      </div>
    </>
  );
}

// Circular Progress Ring Component with Phase 6+ Standards
export interface ScrollProgressRingProps {
  size?: number;
  strokeWidth?: number;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  showPercentage?: boolean;
  className?: string;
  color?: string;
  backgroundColor?: string;
  ariaLabel?: string;
}

export function ScrollProgressRing({
  size = 60,
  strokeWidth = 4,
  position = 'bottom-right',
  showPercentage = true,
  className,
  color = 'hsl(var(--primary))',
  backgroundColor = 'hsl(var(--muted))',
  ariaLabel = 'Reading progress'
}: ScrollProgressRingProps) {
  const { percentage } = useScrollProgress();
  const { announceRef, announceChange } = useAnnouncer();
  const { handleKeyDown } = useScrollKeyboardNavigation();
  const [isFocused, setIsFocused] = useState(false);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getPositionClasses = () => {
    const positions = {
      'bottom-right': 'bottom-6 right-6',
      'bottom-left': 'bottom-6 left-6',
      'top-right': 'top-6 right-6',
      'top-left': 'top-6 left-6'
    };
    return `fixed ${positions[position]} z-40`;
  };

  const handleClick = () => {
    announceChange(`Current reading progress: ${percentage}% complete`, 'assertive');
  };

  return (
    <>
      {/* PHASE 6+ STANDARD: Live region for screen reader announcements */}
      <div ref={announceRef} className="sr-only" aria-live="polite" />
      
      <div className={cn(getPositionClasses(), className)}>
        <div 
          className={cn(
            'relative cursor-pointer transition-all duration-200',
            // PHASE 6+ STANDARD: Enhanced focus indicators
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
            isFocused && 'scale-110'
          )}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${ariaLabel}: ${percentage}% complete`}
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          <svg
            width={size}
            height={size}
            className="transform -rotate-90"
            aria-hidden="true"
          >
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={backgroundColor}
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />
          </svg>
          {showPercentage && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-foreground" aria-hidden="true">
                {percentage}%
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Table of Contents with Enhanced Phase 6+ Standards
export interface TableOfContentsProps {
  sections: ScrollSection[];
  className?: string;
  position?: 'fixed-left' | 'fixed-right' | 'inline';
  showProgress?: boolean;
  maxLevel?: number;
}

export function TableOfContents({
  sections,
  className,
  position = 'fixed-right',
  showProgress = true,
  maxLevel = 3
}: TableOfContentsProps) {
  const { currentSection, visibleSections, percentage } = useScrollProgress(sections);
  const { announceRef, announceChange } = useAnnouncer();
  const { handleKeyDown } = useScrollKeyboardNavigation();

  const handleSectionClick = (sectionId: string, sectionTitle: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      announceChange(`Navigating to ${sectionTitle}`, 'assertive');
    }
  };

  const handleSectionKeyDown = (event: React.KeyboardEvent, sectionId: string, sectionTitle: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSectionClick(sectionId, sectionTitle);
    } else {
      handleKeyDown(event);
    }
  };

  const getPositionClasses = () => {
    const positions = {
      'fixed-left': 'fixed left-6 top-1/2 transform -translate-y-1/2 z-40',
      'fixed-right': 'fixed right-6 top-1/2 transform -translate-y-1/2 z-40',
      'inline': 'relative'
    };
    return positions[position];
  };

  const filteredSections = sections.filter(section => 
    !section.level || section.level <= maxLevel
  );

  return (
    <>
      {/* PHASE 6+ STANDARD: Live region for screen reader announcements */}
      <div ref={announceRef} className="sr-only" aria-live="polite" />
      
      <nav className={cn(getPositionClasses(), className)} aria-label="Table of contents navigation">
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg max-w-xs">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Table of Contents
          </h3>
          
          {showProgress && (
            <div 
              className="mb-3 text-xs text-muted-foreground"
              role="status"
              aria-live="polite"
            >
              Progress: {percentage}%
            </div>
          )}
          
          <ul className="space-y-1 max-h-96 overflow-y-auto" role="list">
            {filteredSections.map((section, index) => {
              const isActive = currentSection?.id === section.id;
              const isVisible = visibleSections.some(s => s.id === section.id);
              const indentLevel = (section.level || 1) - 1;
              
              return (
                <li key={section.id} style={{ marginLeft: `${indentLevel * 12}px` }} role="listitem">
                  <button
                    onClick={() => handleSectionClick(section.id, section.title)}
                    onKeyDown={(e) => handleSectionKeyDown(e, section.id, section.title)}
                    className={cn(
                      'block w-full text-left text-sm py-1.5 px-2 rounded transition-all duration-200',
                      'hover:bg-accent hover:text-accent-foreground',
                      // PHASE 6+ STANDARD: Enhanced focus indicators
                      'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
                      'focus-visible:ring-2 focus-visible:ring-primary',
                      isActive && 'bg-primary text-primary-foreground font-medium',
                      isVisible && !isActive && 'text-foreground',
                      !isVisible && 'text-muted-foreground'
                    )}
                    aria-current={isActive ? 'location' : undefined}
                    aria-label={`Navigate to ${section.title} ${isActive ? '(current section)' : ''}`}
                    tabIndex={0}
                  >
                    <span className="flex items-center space-x-2">
                      <span 
                        className={cn(
                          'w-1.5 h-1.5 rounded-full transition-colors',
                          isActive ? 'bg-primary-foreground' : 
                          isVisible ? 'bg-primary' : 'bg-muted-foreground'
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{section.title}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}

// Section Navigator with Phase 6+ Standards
export interface SectionNavigatorProps {
  sections: ScrollSection[];
  position?: 'left' | 'right';
  showLabels?: boolean;
  className?: string;
}

export function SectionNavigator({
  sections,
  position = 'right',
  showLabels = false,
  className
}: SectionNavigatorProps) {
  const { currentSection } = useScrollProgress(sections);
  const { announceRef, announceChange } = useAnnouncer();
  const { handleKeyDown } = useScrollKeyboardNavigation();

  const handleSectionClick = (sectionId: string, sectionTitle: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      announceChange(`Jumped to ${sectionTitle}`, 'assertive');
    }
  };

  const handleSectionKeyDown = (event: React.KeyboardEvent, sectionId: string, sectionTitle: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSectionClick(sectionId, sectionTitle);
    } else {
      handleKeyDown(event);
    }
  };

  const getPositionClasses = () => {
    return position === 'left'
      ? 'fixed left-6 top-1/2 transform -translate-y-1/2 z-40'
      : 'fixed right-6 top-1/2 transform -translate-y-1/2 z-40';
  };

  return (
    <>
      {/* PHASE 6+ STANDARD: Live region for screen reader announcements */}
      <div ref={announceRef} className="sr-only" aria-live="polite" />
      
      <nav className={cn(getPositionClasses(), className)} aria-label="Section navigation dots">
        <div className="space-y-4" role="list">
          {sections.map((section, index) => {
            const isActive = currentSection?.id === section.id;
            
            return (
              <div key={section.id} className="relative group" role="listitem">
                <button
                  onClick={() => handleSectionClick(section.id, section.title)}
                  onKeyDown={(e) => handleSectionKeyDown(e, section.id, section.title)}
                  className={cn(
                    'w-3 h-3 rounded-full border-2 transition-all duration-300',
                    'hover:scale-125',
                    // PHASE 6+ STANDARD: Enhanced focus indicators
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                    'focus-visible:ring-2 focus-visible:ring-primary',
                    isActive 
                      ? 'bg-primary border-primary scale-125' 
                      : 'bg-background border-muted-foreground hover:border-primary'
                  )}
                  aria-current={isActive ? 'location' : undefined}
                  aria-label={`Navigate to section ${index + 1}: ${section.title} ${isActive ? '(current)' : ''}`}
                  tabIndex={0}
                />
                
                {showLabels && (
                  <div className={cn(
                    'absolute top-1/2 transform -translate-y-1/2 whitespace-nowrap',
                    'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200',
                    'bg-card border border-border rounded px-2 py-1 text-xs shadow-lg pointer-events-none',
                    position === 'left' ? 'right-6' : 'left-6'
                  )} role="tooltip">
                    {section.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}

// Page Progress Bar with Phase 6+ Standards
export interface PageProgressBarProps {
  thickness?: 'thin' | 'medium' | 'thick';
  style?: 'gradient' | 'solid' | 'animated';
  position?: 'top' | 'bottom';
  className?: string;
  ariaLabel?: string;
}

export function PageProgressBar({
  thickness = 'medium',
  style = 'gradient',
  position = 'top',
  className,
  ariaLabel = 'Page reading progress'
}: PageProgressBarProps) {
  const { percentage } = useScrollProgress();
  const { announceRef, announceChange } = useAnnouncer();

  const getThicknessClasses = () => {
    const thicknesses = {
      thin: 'h-1',
      medium: 'h-2',
      thick: 'h-3'
    };
    return thicknesses[thickness];
  };

  const getStyleClasses = () => {
    const styles = {
      solid: 'bg-primary',
      gradient: 'bg-gradient-to-r from-primary via-primary/80 to-primary',
      animated: 'bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-pulse'
    };
    return styles[style];
  };

  const getPositionClasses = () => {
    return position === 'top'
      ? 'fixed top-0 left-0 right-0 z-50'
      : 'fixed bottom-0 left-0 right-0 z-50';
  };

  return (
    <>
      {/* PHASE 6+ STANDARD: Live region for screen reader announcements */}
      <div ref={announceRef} className="sr-only" aria-live="polite" />
      
      <div 
        className={cn('w-full bg-muted/20', getPositionClasses(), className)}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${ariaLabel}: ${percentage}% complete`}
        tabIndex={0}
      >
        <div
          className={cn(
            'transition-all duration-500 ease-out',
            getThicknessClasses(),
            getStyleClasses()
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </>
  );
}

// Utility function to auto-generate sections from headings
export function generateSectionsFromHeadings(
  containerSelector: string = 'main',
  headingSelectors: string[] = ['h1', 'h2', 'h3']
): ScrollSection[] {
  const container = document.querySelector(containerSelector);
  if (!container) return [];

  const sections: ScrollSection[] = [];
  const selector = headingSelectors.join(', ');
  const headings = container.querySelectorAll(selector) as NodeListOf<HTMLElement>;

  headings.forEach((heading, index) => {
    // Generate ID if not present
    if (!heading.id) {
      heading.id = `section-${index + 1}`;
    }

    // Determine heading level
    const tagName = heading.tagName.toLowerCase();
    const level = headingSelectors.findIndex(sel => sel.includes(tagName)) + 1;

    sections.push({
      id: heading.id,
      title: heading.textContent || `Section ${index + 1}`,
      element: heading,
      level
    });
  });

  return sections;
}

// Scroll to Top Button with Phase 6+ Standards
export interface ScrollToTopProps {
  showAt?: number;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  variant?: 'button' | 'fab' | 'minimal';
  showProgress?: boolean;
  className?: string;
}

export function ScrollToTop({
  showAt = 300,
  position = 'bottom-right',
  variant = 'button',
  showProgress = false,
  className
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { percentage } = useScrollProgress();
  const { announceRef, announceChange } = useAnnouncer();
  const { handleKeyDown } = useScrollKeyboardNavigation();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAt);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAt]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    announceChange('Scrolling to top of page', 'assertive');
  };

  const handleScrollKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToTop();
    } else {
      handleKeyDown(event);
    }
  };

  const getPositionClasses = () => {
    const positions = {
      'bottom-right': 'bottom-6 right-6',
      'bottom-left': 'bottom-6 left-6',
      'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2'
    };
    return `fixed ${positions[position]} z-40`;
  };

  const getVariantClasses = () => {
    const variants = {
      button: 'px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90',
      fab: 'w-12 h-12 bg-primary text-primary-foreground rounded-full hover:bg-primary/90',
      minimal: 'w-8 h-8 bg-card border border-border text-foreground rounded hover:bg-accent'
    };
    return variants[variant];
  };

  if (!isVisible) return null;

  return (
    <>
      {/* PHASE 6+ STANDARD: Live region for screen reader announcements */}
      <div ref={announceRef} className="sr-only" aria-live="assertive" />
      
      <button
        onClick={scrollToTop}
        onKeyDown={handleScrollKeyDown}
        className={cn(
          getPositionClasses(),
          getVariantClasses(),
          'flex items-center justify-center',
          'shadow-lg transition-all duration-300 ease-in-out',
          'hover:scale-110',
          // PHASE 6+ STANDARD: Enhanced focus indicators
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'focus-visible:ring-2 focus-visible:ring-primary',
          'opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-500',
          isVisible && 'opacity-100',
          className
        )}
        aria-label={`Scroll to top of page${showProgress ? ` (currently at ${percentage}%)` : ''}`}
        tabIndex={0}
      >
        {variant === 'button' ? (
          <span className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {showProgress && <span className="text-sm" aria-hidden="true">{percentage}%</span>}
          </span>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        )}
      </button>
    </>
  );
}