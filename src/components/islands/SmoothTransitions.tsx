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
}

export function PageTransition({ 
  children, 
  className, 
  config = { duration: 300, easing: 'ease-out', direction: 'fade' } 
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
    <div className={cn(getTransitionClasses(), className)}>
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
}

export function ScrollReveal({ 
  children, 
  className, 
  config = { direction: 'up', duration: 600, threshold: 0.1, triggerOnce: true }
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
    <div ref={elementRef} className={cn(getAnimationClasses(), className)}>
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
}

export function StaggeredAnimation({ 
  children, 
  staggerDelay = 100, 
  className,
  config = { direction: 'up', duration: 400 }
}: StaggeredAnimationProps) {
  // Convert children to array to handle both single and multiple children
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <PageTransition
          key={index}
          config={{
            ...config,
            delay: index * staggerDelay
          }}
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
}

export function Skeleton({ 
  className, 
  variant = 'rectangular',
  width,
  height,
  animate = true
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
}

export function LoadingState({ 
  isLoading, 
  children, 
  skeleton,
  className,
  fadeTransition = true
}: LoadingStateProps) {
  const defaultSkeleton = (
    <div className="space-y-4">
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
      <Skeleton variant="rectangular" height={200} className="w-full" />
    </div>
  );

  const content = isLoading ? (skeleton || defaultSkeleton) : children;

  if (fadeTransition) {
    return (
      <PageTransition 
        className={className}
        config={{ direction: 'fade', duration: 300 }}
      >
        {content}
      </PageTransition>
    );
  }

  return <div className={className}>{content}</div>;
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
}

export function AnimatedButton({
  children,
  onClick,
  variant = 'default',
  size = 'md',
  animation = 'scale',
  className,
  disabled = false
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
}

export function HoverCard({ 
  children, 
  hoverContent,
  className,
  hoverScale = 1.02,
  shadow = true
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
    >
      {children}
      {hoverContent && isHovered && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
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
}

export function ParallaxScroll({ children, speed = 0.5, className }: ParallaxProps) {
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
    <div ref={elementRef} className={className}>
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
}

export function AnimatedCounter({ 
  end, 
  start = 0, 
  duration = 2000,
  prefix = '',
  suffix = '',
  className 
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
    <span className={className}>
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
}

export function TypewriterEffect({ 
  text, 
  speed = 50, 
  delay = 0,
  className,
  showCursor = true 
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
    <span className={className}>
      {displayText}
      {showCursor && !isComplete && (
        <span className="animate-pulse">|</span>
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
}

export function AnimatedProgress({ 
  value, 
  max = 100,
  className,
  showLabel = false,
  color = 'hsl(var(--primary))',
  height = 8,
  animationDuration = 1000
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
}

export function ModalTransition({ 
  isOpen, 
  onClose, 
  children, 
  className 
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

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
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
      >
        {children}
      </div>
    </div>
  );
}