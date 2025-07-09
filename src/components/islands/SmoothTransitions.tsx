// SmoothTransitions.tsx - Professional Animation System (Sprint 9 - Step 5)
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

// Page Transition Component
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

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), config.delay || 0);
    return () => clearTimeout(timer);
  }, [config.delay]);

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
    <div 
      className={cn(getTransitionClasses(), className)}
      aria-label={ariaLabel}
      role={ariaLabel ? "region" : undefined}
    >
      {children}
    </div>
  );
}

// Scroll Reveal Animation Hook - FIXED: Changed HTMLElement to HTMLDivElement
export function useScrollReveal(config: ScrollRevealConfig = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null); // ✅ FIXED: HTMLDivElement instead of HTMLElement

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
  }, [config]);

  return { isVisible, elementRef };
}

// Scroll Reveal Component
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
    <div 
      ref={elementRef} 
      className={cn(getAnimationClasses(), className)}
      aria-label={ariaLabel}
      role={ariaLabel ? "region" : undefined}
    >
      {children}
    </div>
  );
}

// Staggered Animation Container
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
  // Convert children to array to handle both single and multiple children
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div 
      className={className}
      aria-label={ariaLabel}
      role={ariaLabel ? "group" : undefined}
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
  );
}

// Loading Skeleton Component
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
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height
      }}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
    />
  );
}

// Loading State Component
export interface LoadingStateProps {
  isLoading: boolean;
  children: React.ReactNode;
  skeleton?: React.ReactNode;
  className?: string;
  fadeTransition?: boolean;
  loadingLabel?: string;
}

export function LoadingState({ 
  isLoading, 
  children, 
  skeleton,
  className,
  fadeTransition = true,
  loadingLabel = 'Content is loading'
}: LoadingStateProps) {
  const defaultSkeleton = (
    <div className="space-y-4" role="status" aria-label={loadingLabel}>
      <Skeleton variant="text" className="w-3/4" ariaLabel="Loading title" />
      <Skeleton variant="text" className="w-1/2" ariaLabel="Loading subtitle" />
      <Skeleton variant="rectangular" height={200} className="w-full" ariaLabel="Loading main content" />
    </div>
  );

  const content = isLoading ? (skeleton || defaultSkeleton) : children;

  if (fadeTransition) {
    return (
      <PageTransition 
        className={className}
        config={{ direction: 'fade', duration: 300 }}
        ariaLabel={isLoading ? loadingLabel : 'Content loaded'}
      >
        {content}
      </PageTransition>
    );
  }

  return (
    <div 
      className={className}
      aria-live="polite"
      aria-busy={isLoading}
    >
      {content}
    </div>
  );
}

// Micro-interaction Button Component
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

  const handleClick = () => {
    if (disabled) return;
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);
    
    if (onClick) onClick();
  };

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
    <button
      onClick={handleClick}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel || (typeof children === 'string' ? children : 'Animated button')}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium',
        'transition-all duration-200 ease-in-out',
        'hover:scale-105 active:scale-95',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        getVariantClasses(),
        getSizeClasses(),
        getAnimationClasses(),
        className
      )}
    >
      {children}
    </button>
  );
}

// Hover Card Component with Smooth Transitions
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

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-in-out',
        'transform-gpu will-change-transform',
        shadow && 'hover:shadow-lg',
        className
      )}
      style={{
        transform: isHovered ? `scale(${hoverScale})` : 'scale(1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label={ariaLabel || 'Interactive hover card'}
    >
      {children}
      {hoverContent && isHovered && (
        <div 
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          aria-hidden="true"
        >
          {hoverContent}
        </div>
      )}
    </div>
  );
}

// Parallax Scroll Component
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
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = scrolled * -speed;
        setOffsetY(rate);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div 
      ref={elementRef} 
      className={className}
      role="region"
      aria-label={ariaLabel || 'Parallax scroll content'}
    >
      <div
        style={{
          transform: `translateY(${offsetY}px)`,
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Smooth Counter Animation
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
  const countRef = useRef(start);

  useEffect(() => {
    const startTime = Date.now();
    const difference = end - start;

    const updateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(start + difference * easeOut);
      
      setCount(currentCount);
      countRef.current = currentCount;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, start, duration]);

  return (
    <span 
      className={className}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel || `Counter animating from ${start} to ${end}, current value: ${count}`}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// Typewriter Effect Component
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

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(typeInterval);
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return (
    <span 
      className={className}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel || `Typewriter effect: ${isComplete ? text : `Typing: ${displayText}`}`}
    >
      {displayText}
      {showCursor && !isComplete && (
        <span className="animate-pulse" aria-hidden="true">|</span>
      )}
    </span>
  );
}

// Progress Bar with Smooth Animation
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
  const percentage = Math.min((value / max) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(percentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{Math.round(animatedValue)}%</span>
        </div>
      )}
      <div 
        className="w-full bg-muted rounded-full overflow-hidden"
        style={{ height: `${height}px` }}
        role="progressbar"
        aria-valuenow={Math.round(animatedValue)}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel || `Progress: ${Math.round(animatedValue)}% complete`}
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
  );
}

// Smooth Modal/Dialog Transition
export interface ModalTransitionProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function ModalTransition({ 
  isOpen, 
  onClose, 
  children, 
  className,
  ariaLabel = 'Modal dialog'
}: ModalTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div
        className={cn(
          'relative bg-card border border-border rounded-lg shadow-lg p-6',
          'transition-all duration-300 ease-out',
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4',
          className
        )}
        role="document"
      >
        {children}
      </div>
    </div>
  );
}