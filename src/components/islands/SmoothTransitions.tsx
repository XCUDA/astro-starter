// SmoothTransitions.tsx - Professional Animation System (Sprint 9 - Step 5) - PHASE 6+ STANDARDS
// Provides smooth transitions, micro-interactions, and loading states for modern applications
// Path: src/components/islands/SmoothTransitions.tsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

// Animation configuration types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'rotate';
}

export interface ScrollRevealConfig extends AnimationConfig {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
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

// Keyboard navigation hook for interactive components
function useKeyboardNavigation(onKeyDown?: (e: React.KeyboardEvent) => void) {
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

// ===== PAGE TRANSITION COMPONENT =====

export interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  config?: AnimationConfig;
  ariaLabel?: string;
}

export function PageTransition({ 
  children, 
  className, 
  config = { duration: 300, easing: 'ease-out', direction: 'fade' },
  ariaLabel
}: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { announceRef, announceChange } = useAnnouncer();

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
      announceChange(`Page section loaded with ${config.direction} animation`);
    }, config.delay || 0);
    return () => clearTimeout(timer);
  }, [config.delay, config.direction, announceChange]);

  const getTransitionClasses = () => {
    const { duration = 300, easing = 'ease-out', direction = 'fade' } = config;
    
    const baseClasses = `transition-all duration-${duration} ${easing}`;
    
    const directionClasses = {
      fade: isVisible ? 'opacity-100' : 'opacity-0',
      up: isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
      down: isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0',
      left: isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0',
      right: isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0',
      scale: isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
      rotate: isVisible ? 'rotate-0 opacity-100' : 'rotate-3 opacity-0'
    };

    return `${baseClasses} ${directionClasses[direction]}`;
  };

  return (
    <>
      {/* PHASE 6+ STANDARD: Live region for screen reader announcements */}
      <div ref={announceRef} className="sr-only" aria-live="polite" />
      
      <div 
        className={cn(getTransitionClasses(), className)}
        aria-label={ariaLabel}
        role={ariaLabel ? "region" : undefined}
      >
        {children}
      </div>
    </>
  );
}

// ===== SCROLL REVEAL ANIMATION HOOK =====

export function useScrollReveal(config: ScrollRevealConfig = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const { announceChange } = useAnnouncer();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          announceChange(`Content revealed with ${config.direction || 'fade'} animation`);
          
          if (config.triggerOnce !== false) {
            observer.unobserve(element);
          }
        } else if (config.triggerOnce === false) {
          setIsVisible(false);
        }
      },
      {
        threshold: config.threshold || 0.1,
        rootMargin: config.rootMargin || '0px'
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [config, announceChange]);

  return { isVisible, elementRef };
}

// ===== SCROLL REVEAL COMPONENT =====

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  config?: ScrollRevealConfig;
  ariaLabel?: string;
}

export function ScrollReveal({ 
  children, 
  className, 
  config = { direction: 'up', duration: 600, threshold: 0.1, triggerOnce: true },
  ariaLabel
}: ScrollRevealProps) {
  const { isVisible, elementRef } = useScrollReveal(config);
  const { announceRef, announceChange } = useAnnouncer();

  const getAnimationClasses = () => {
    const { direction = 'up', duration = 600, easing = 'ease-out' } = config;
    
    const baseClasses = `transition-all duration-${duration} ${easing}`;
    
    const directionClasses = {
      fade: isVisible ? 'opacity-100' : 'opacity-0',
      up: isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0',
      down: isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0',
      left: isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0',
      right: isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0',
      scale: isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
      rotate: isVisible ? 'rotate-0 opacity-100' : 'rotate-6 opacity-0'
    };

    return `${baseClasses} ${directionClasses[direction]}`;
  };

  return (
    <>
      {/* PHASE 6+ STANDARD: Live region for screen reader announcements */}
      <div ref={announceRef} className="sr-only" aria-live="polite" />
      
      <div 
        ref={elementRef} 
        className={cn(getAnimationClasses(), className)}
        aria-label={ariaLabel}
        role={ariaLabel ? "region" : undefined}
      >
        {children}
      </div>
    </>
  );
}

// ===== STAGGERED ANIMATION CONTAINER =====

export interface StaggeredAnimationProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  config?: AnimationConfig;
  ariaLabel?: string;
}

export function StaggeredAnimation({ 
  children, 
  staggerDelay = 100, 
  className,
  config = { direction: 'up', duration: 400 },
  ariaLabel
}: StaggeredAnimationProps) {
  const { announceRef, announceChange } = useAnnouncer();
  const { handleKeyDown } = useKeyboardNavigation();
  
  // Convert children to array to handle both single and multiple children
  const childrenArray = React.Children.toArray(children);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      announceChange(`Staggered animation started for ${childrenArray.length} items`);
    }, 500);
    return () => clearTimeout(timer);
  }, [childrenArray.length, announceChange]);
  
  return (
    <>
      {/* PHASE 6+ STANDARD: Live region for screen reader announcements */}
      <div ref={announceRef} className="sr-only" aria-live="polite" />
      
      <div 
        className={className}
        aria-label={ariaLabel}
        role={ariaLabel ? "group" : undefined}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {childrenArray.map((child, index) => (
          <PageTransition
            key={index}
            config={{
              ...config,
              delay: index * staggerDelay
            }}
            ariaLabel={`Animation item ${index + 1} of ${childrenArray.length}`}
          >
            {child}
          </PageTransition>
        ))}
      </div>
    </>
  );
}

// ===== LOADING SKELETON COMPONENT =====

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animate?: boolean;
  ariaLabel?: string;
}

export function Skeleton({ 
  className, 
  variant = 'rectangular',
  width,
  height,
  animate = true,
  ariaLabel = 'Loading content'
}: SkeletonProps) {
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg'
  };

  const animationClass = animate ? 'animate-pulse' : '';

  return (
    <div
      className={cn(
        'bg-muted',
        variantClasses[variant],
        animationClass,
        // PHASE 6+ STANDARD: Enhanced focus indicators
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height
      }}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      tabIndex={0}
    />
  );
}

// ===== ANIMATED BUTTON COMPONENT WITH PHASE 6+ STANDARDS =====

export interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  animation?: 'scale' | 'bounce' | 'shake' | 'pulse' | 'rotate';
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export function AnimatedButton({
  children,
  onClick,
  variant = 'default',
  size = 'md',
  animation = 'scale',
  className,
  disabled = false,
  ariaLabel
}: AnimatedButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  const { announceRef, announceChange } = useAnnouncer();
  const { handleKeyDown } = useKeyboardNavigation();

  const handleClick = () => {
    if (disabled) return;
    
    setIsAnimating(true);
    announceChange(`${animation} animation triggered`, 'assertive');
    
    setTimeout(() => setIsAnimating(false), 200);
    
    if (onClick) onClick();
  };

  // PHASE 6+ STANDARD: Enhanced keyboard support
  const handleButtonKeyDown = useCallback((e: React.KeyboardEvent) => {
    handleKeyDown(e);
    
    // Animation shortcuts
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      handleClick();
    }
  }, [handleKeyDown, disabled]);

  const getVariantClasses = () => {
    const variants = {
      default: 'bg-background text-foreground border border-border hover:bg-accent',
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      ghost: 'text-foreground hover:bg-accent hover:text-accent-foreground'
    };
    return variants[variant];
  };

  const getSizeClasses = () => {
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };
    return sizes[size];
  };

  const getAnimationClasses = () => {
    if (!isAnimating) return '';
    
    const animations = {
      scale: 'animate-pulse scale-95',
      bounce: 'animate-bounce',
      shake: 'animate-pulse',
      pulse: 'animate-pulse',
      rotate: 'animate-spin'
    };
    return animations[animation];
  };

  return (
    <>
      {/* PHASE 6+ STANDARD: Live region for screen reader announcements */}
      <div ref={announceRef} className="sr-only" aria-live="assertive" />
      
      <button
        onClick={handleClick}
        onKeyDown={handleButtonKeyDown}
        onFocus={() => setFocusVisible(true)}
        onBlur={() => setFocusVisible(false)}
        disabled={disabled}
        aria-disabled={disabled}
        aria-label={ariaLabel || (typeof children === 'string' ? children : 'Animated button')}
        aria-describedby="button-animation-help"
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium',
          'transition-all duration-200 ease-in-out',
          'hover:scale-105 active:scale-95',
          // PHASE 6+ STANDARD: Enhanced focus management
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'focus-visible:ring-2 focus-visible:ring-primary',
          focusVisible && 'ring-2 ring-primary ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          getVariantClasses(),
          getSizeClasses(),
          getAnimationClasses(),
          className
        )}
      >
        {children}
      </button>
      
      {/* PHASE 6+ STANDARD: Screen reader help text */}
      <div id="button-animation-help" className="sr-only">
        Press Enter or Space to activate {animation} animation effect
      </div>
    </>
  );
}

// ===== HOVER CARD COMPONENT =====

export interface HoverCardProps {
  children: React.ReactNode;
  hoverContent?: React.ReactNode;
  className?: string;
  hoverScale?: number;
  shadow?: boolean;
  ariaLabel?: string;
}

export function HoverCard({ 
  children, 
  hoverContent,
  className,
  hoverScale = 1.02,
  shadow = true,
  ariaLabel
}: HoverCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { announceRef, announceChange } = useAnnouncer();
  const { handleKeyDown } = useKeyboardNavigation();

  const isActive = isHovered || isFocused;

  useEffect(() => {
    if (isActive) {
      announceChange('Interactive card activated');
    }
  }, [isActive, announceChange]);

  return (
    <>
      {/* PHASE 6+ STANDARD: Live region for screen reader announcements */}
      <div ref={announceRef} className="sr-only" aria-live="polite" />
      
      <div
        className={cn(
          'transition-all duration-300 ease-in-out',
          'transform-gpu will-change-transform',
          // PHASE 6+ STANDARD: Enhanced focus indicators
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'focus-visible:ring-2 focus-visible:ring-primary',
          shadow && 'hover:shadow-lg',
          className
        )}
        style={{
          transform: isActive ? `scale(${hoverScale})` : 'scale(1)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        role="region"
        aria-label={ariaLabel || 'Interactive hover card'}
        tabIndex={0}
      >
        {children}
        {hoverContent && isActive && (
          <div 
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          >
            {hoverContent}
          </div>
        )}
      </div>
    </>
  );
}

// ===== PARALLAX SCROLL COMPONENT =====

export interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  ariaLabel?: string;
}

export function ParallaxScroll({ 
  children, 
  speed = 0.5, 
  className,
  ariaLabel
}: ParallaxProps) {
  const [offsetY, setOffsetY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ASTRO SSR FIX: Vérifier que nous sommes côté client
    if (typeof window === 'undefined') return;

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    const handleScroll = () => {
      if (elementRef.current && !prefersReducedMotion) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = scrolled * -speed;
        setOffsetY(rate);
      }
    };

    // Listen for reduced motion changes
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    
    // Listen for scroll events only if motion is allowed
    if (!prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, prefersReducedMotion]);

  return (
    <div 
      ref={elementRef} 
      className={className}
      role="region"
      aria-label={ariaLabel || 'Parallax scroll content'}
      // PHASE 6+ STANDARD: Respect reduced motion preference (SSR safe)
      style={{
        transform: prefersReducedMotion 
          ? 'translateY(0px)' 
          : `translateY(${offsetY}px)`,
        willChange: prefersReducedMotion ? 'auto' : 'transform'
      }}
    >
      <div>
        {children}
      </div>
    </div>
  );
}

// ===== ANIMATED COUNTER WITH PHASE 6+ STANDARDS =====

export interface CounterProps {
  end: number;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  ariaLabel?: string;
}

export function AnimatedCounter({ 
  end, 
  start = 0, 
  duration = 2000,
  prefix = '',
  suffix = '',
  className,
  ariaLabel
}: CounterProps) {
  const [count, setCount] = useState(start);
  const { announceRef, announceChange } = useAnnouncer();
  const countRef = useRef(start);

  useEffect(() => {
    const startTime = Date.now();
    const difference = end - start;

    announceChange(`Counter animation starting from ${start} to ${end}`);

    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(start + difference * easeOut);
      
      setCount(currentCount);
      countRef.current = currentCount;

      if (progress >= 1) {
        announceChange(`Counter animation completed at ${end}${suffix}`);
      } else {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, start, duration, suffix, announceChange]);

  return (
    <>
      {/* PHASE 6+ STANDARD: Live region for screen reader announcements */}
      <div ref={announceRef} className="sr-only" aria-live="polite" />
      
      <span 
        className={cn(
          'tabindex-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded',
          className
        )}
        role="status"
        aria-live="polite"
        aria-label={ariaLabel || `Counter animating from ${start} to ${end}, current value: ${count}`}
        tabIndex={0}
      >
        {prefix}{count.toLocaleString()}{suffix}
      </span>
    </>
  );
}

// ===== TYPEWRITER EFFECT WITH PHASE 6+ STANDARDS =====

export interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  ariaLabel?: string;
}

export function TypewriterEffect({ 
  text, 
  speed = 50, 
  delay = 0,
  className,
  showCursor = true,
  ariaLabel
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const { announceRef, announceChange } = useAnnouncer();

  useEffect(() => {
    announceChange('Typewriter animation starting');
    
    const timer = setTimeout(() => {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          setIsComplete(true);
          announceChange(`Typewriter animation completed: ${text}`);
          clearInterval(typeInterval);
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay, announceChange]);

  return (
    <>
      {/* PHASE 6+ STANDARD: Live region for screen reader announcements */}
      <div ref={announceRef} className="sr-only" aria-live="polite" />
      
      <span 
        className={cn(
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded',
          className
        )}
        role="status"
        aria-live="polite"
        aria-label={ariaLabel || `Typewriter effect: ${isComplete ? text : `Typing: ${displayText}`}`}
        tabIndex={0}
      >
        {displayText}
        {showCursor && !isComplete && (
          <span className="animate-pulse" aria-hidden="true">|</span>
        )}
      </span>
    </>
  );
}

// ===== ANIMATED PROGRESS WITH PHASE 6+ STANDARDS =====

export interface AnimatedProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  color?: string;
  height?: number;
  animationDuration?: number;
  ariaLabel?: string;
}

export function AnimatedProgress({ 
  value, 
  max = 100,
  className,
  showLabel = false,
  color = 'hsl(var(--primary))',
  height = 8,
  animationDuration = 1000,
  ariaLabel
}: AnimatedProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const { announceRef, announceChange } = useAnnouncer();
  const percentage = Math.min((value / max) * 100, 100);

  useEffect(() => {
    announceChange(`Progress bar animation starting to ${percentage}%`);
    
    const timer = setTimeout(() => {
      setAnimatedValue(percentage);
      
      // Announce completion
      setTimeout(() => {
        announceChange(`Progress updated to ${Math.round(percentage)}%`);
      }, animationDuration);
    }, 100);

    return () => clearTimeout(timer);
  }, [percentage, animationDuration, announceChange]);

  return (
    <>
      {/* PHASE 6+ STANDARD: Live region for screen reader announcements */}
      <div ref={announceRef} className="sr-only" aria-live="polite" />
      
      <div className={cn('w-full', className)}>
        {showLabel && (
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(animatedValue)}%</span>
          </div>
        )}
        <div 
          className={cn(
            'w-full bg-muted rounded-full overflow-hidden',
            // PHASE 6+ STANDARD: Enhanced focus indicators
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
          )}
          style={{ height: `${height}px` }}
          role="progressbar"
          aria-valuenow={Math.round(animatedValue)}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={ariaLabel || `Progress: ${Math.round(animatedValue)}% complete`}
          tabIndex={0}
        >
          <div
            className="h-full rounded-full transition-all ease-out"
            style={{
              width: `${animatedValue}%`,
              backgroundColor: color,
              transitionDuration: `${animationDuration}ms`
            }}
          />
        </div>
      </div>
    </>
  );
}