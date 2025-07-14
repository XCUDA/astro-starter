// GlobalFAB.tsx - Professional Global Floating Action Button with Phase 6+ Standards
// Single FAB component with global viewport positioning and advanced behaviors
// Path: src/components/islands/FloatingActionButton.tsx

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

// ===== PHASE 6+ TYPES AND INTERFACES =====

export interface FABAction {
  id: string;
  title: string;
  icon: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'ghost';
  disabled?: boolean;
}

export interface GlobalFABProps {
  // Main action (always visible)
  mainAction: FABAction;
  
  // Secondary actions (expand on click)
  secondaryActions?: FABAction[];
  
  // Position and behavior
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-left';
  hideOnScroll?: boolean;
  scrollThreshold?: number;
  
  // Visual variants
  size?: 'md' | 'lg' | 'xl';
  expandDirection?: 'up' | 'down' | 'radial';
  
  // Advanced features
  showTooltip?: boolean;
  autoClose?: boolean;
  autoCloseDelay?: number;
  
  // Accessibility (Phase 6+ Standards)
  ariaLabel?: string;
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

// Enhanced keyboard navigation hook
function useKeyboardNavigation(
  isExpanded: boolean,
  secondaryActions: FABAction[],
  setIsExpanded: (expanded: boolean) => void,
  mainButtonRef: React.RefObject<HTMLButtonElement | null>,
  secondaryButtonsRef: React.MutableRefObject<(HTMLButtonElement | null)[]>
) {
  const [focusedActionIndex, setFocusedActionIndex] = useState(-1);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isExpanded || secondaryActions.length === 0) return;

      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          setIsExpanded(false);
          setFocusedActionIndex(-1);
          mainButtonRef.current?.focus();
          break;
        
        case 'ArrowUp':
        case 'ArrowDown':
          event.preventDefault();
          const direction = event.key === 'ArrowUp' ? -1 : 1;
          const newIndex = Math.max(0, Math.min(secondaryActions.length - 1, focusedActionIndex + direction));
          
          setFocusedActionIndex(newIndex);
          secondaryButtonsRef.current[newIndex]?.focus();
          break;
        
        case 'Home':
          event.preventDefault();
          setFocusedActionIndex(0);
          secondaryButtonsRef.current[0]?.focus();
          break;
        
        case 'End':
          event.preventDefault();
          const lastIndex = secondaryActions.length - 1;
          setFocusedActionIndex(lastIndex);
          secondaryButtonsRef.current[lastIndex]?.focus();
          break;
        
        case 'Enter':
        case ' ':
          if (focusedActionIndex >= 0) {
            event.preventDefault();
            const action = secondaryActions[focusedActionIndex];
            if (action.onClick) action.onClick();
            else if (action.href) window.location.href = action.href;
            setIsExpanded(false);
          }
          break;
      }
    };

    if (isExpanded) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isExpanded, focusedActionIndex, secondaryActions, setIsExpanded, mainButtonRef, secondaryButtonsRef]);

  return { focusedActionIndex, setFocusedActionIndex };
}

// ===== GLOBAL FAB MAIN COMPONENT WITH PHASE 6+ STANDARDS =====

export function GlobalFAB({
  mainAction,
  secondaryActions = [],
  position = 'bottom-right',
  hideOnScroll = true,
  scrollThreshold = 100,
  size = 'lg',
  expandDirection = 'up',
  showTooltip = true,
  autoClose = true,
  autoCloseDelay = 3000,
  ariaLabel
}: GlobalFABProps) {
  // ===== STATE MANAGEMENT =====
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // ===== REFS FOR DOM MANAGEMENT =====
  const lastScrollY = useRef(0);
  const autoCloseTimeout = useRef<NodeJS.Timeout | null>(null);
  const ticking = useRef(false);
  const mainButtonRef = useRef<HTMLButtonElement>(null);
  const secondaryButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // ===== PHASE 6+ ACCESSIBILITY HOOKS =====
  const { announceRef, announceChange } = useAnnouncer();
  const { focusedActionIndex, setFocusedActionIndex } = useKeyboardNavigation(
    isExpanded,
    secondaryActions,
    setIsExpanded,
    mainButtonRef,
    secondaryButtonsRef
  );

  // ===== SCROLL BEHAVIOR WITH PERFORMANCE OPTIMIZATION =====
  useEffect(() => {
    if (!hideOnScroll) return;

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY.current;
          
          setIsScrolled(currentScrollY > 10);
          
          if (currentScrollY > scrollThreshold) {
            const shouldBeVisible = !isScrollingDown;
            if (isVisible !== shouldBeVisible) {
              setIsVisible(shouldBeVisible);
              announceChange(
                shouldBeVisible 
                  ? 'Floating action button shown' 
                  : 'Floating action button hidden'
              );
            }
          } else {
            if (!isVisible) {
              setIsVisible(true);
              announceChange('Floating action button shown');
            }
          }
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideOnScroll, scrollThreshold, isVisible, announceChange]);

  // ===== AUTO-CLOSE BEHAVIOR =====
  useEffect(() => {
    if (isExpanded && autoClose && secondaryActions.length > 0) {
      autoCloseTimeout.current = setTimeout(() => {
        setIsExpanded(false);
        setFocusedActionIndex(-1);
        announceChange('Actions menu auto-closed');
      }, autoCloseDelay);
    }

    return () => {
      if (autoCloseTimeout.current) {
        clearTimeout(autoCloseTimeout.current);
      }
    };
  }, [isExpanded, autoClose, autoCloseDelay, secondaryActions.length, announceChange, setFocusedActionIndex]);

  // ===== OUTSIDE CLICK HANDLING =====
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.global-fab-container')) {
        if (isExpanded) {
          setIsExpanded(false);
          setFocusedActionIndex(-1);
          announceChange('Actions menu closed');
        }
      }
    };

    if (isExpanded) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isExpanded, announceChange, setFocusedActionIndex]);

  // ===== FOCUS MANAGEMENT FOR EXPANSION =====
  useEffect(() => {
    if (isExpanded && secondaryActions.length > 0) {
      // Focus first secondary action when expanded
      setTimeout(() => {
        secondaryButtonsRef.current[0]?.focus();
        setFocusedActionIndex(0);
      }, 150); // Wait for animation
    } else if (!isExpanded) {
      setFocusedActionIndex(-1);
    }
  }, [isExpanded, secondaryActions.length, setFocusedActionIndex]);

  // ===== ACTION HANDLERS =====
  const handleMainClick = () => {
    if (secondaryActions.length > 0) {
      const newExpanded = !isExpanded;
      setIsExpanded(newExpanded);
      announceChange(
        newExpanded 
          ? `${secondaryActions.length} quick actions expanded. Use arrow keys to navigate.`
          : 'Actions menu collapsed',
        'assertive'
      );
    } else if (mainAction.onClick) {
      mainAction.onClick();
      announceChange(`${mainAction.title} activated`);
    } else if (mainAction.href) {
      window.location.href = mainAction.href;
    }
  };

  const handleSecondaryClick = (action: FABAction) => {
    if (action.onClick) {
      action.onClick();
    } else if (action.href) {
      window.location.href = action.href;
    }
    setIsExpanded(false);
    setFocusedActionIndex(-1);
    announceChange(`${action.title} activated`);
  };

  // ===== STYLING UTILITIES =====
  const getPositionClasses = () => {
    const positions = {
      'bottom-right': 'bottom-6 right-6',
      'bottom-left': 'bottom-6 left-6',
      'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2',
      'top-right': 'top-6 right-6',
      'top-left': 'top-6 left-6'
    };
    return positions[position];
  };

  const getSizeClasses = () => {
    const sizes = {
      md: 'w-14 h-14 text-xl',
      lg: 'w-16 h-16 text-2xl',
      xl: 'w-20 h-20 text-3xl'
    };
    return sizes[size];
  };

  const getVariantClasses = (variant: FABAction['variant'] = 'primary') => {
    const variants = {
      default: 'bg-background text-foreground border border-border hover:bg-accent',
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      ghost: 'bg-background/90 text-foreground hover:bg-accent/90 backdrop-blur-sm'
    };
    return variants[variant];
  };

  // ===== SECONDARY ACTION POSITIONING =====
  const getSecondaryActionPosition = (index: number) => {
    const spacing = size === 'xl' ? 80 : size === 'lg' ? 70 : 60;
    const offset = (index + 1) * spacing;

    switch (expandDirection) {
      case 'up':
        return { bottom: `${offset + 24}px`, transform: 'translateX(0)' };
      case 'down':
        return { top: `${offset + 24}px`, transform: 'translateX(0)' };
      case 'radial':
        const startAngle = position.includes('top') ? 45 : -135;
        const angle = startAngle + (index * 45);
        const radius = spacing;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;
        return { 
          transform: `translate(${x}px, ${y}px)`,
          right: '0',
          bottom: '0'
        };
      default:
        return { bottom: `${offset + 24}px`, transform: 'translateX(0)' };
    }
  };

  // ===== COMPONENT DESCRIPTION FOR ACCESSIBILITY =====
  const hasSecondaryActions = secondaryActions.length > 0;
  const fabDescription = hasSecondaryActions 
    ? `${mainAction.title} with ${secondaryActions.length} quick actions`
    : mainAction.title;

  // ===== RENDER COMPONENT =====
  return (
    <div 
      className={cn(
        'global-fab-container fixed z-60 transition-all duration-300 ease-in-out',
        getPositionClasses(),
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
      )}
      role="region"
      aria-label={ariaLabel || fabDescription}
    >
      
      {/* PHASE 6+ STANDARD: Live region for screen reader announcements */}
      <div 
        ref={announceRef}
        className="sr-only" 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
      />

      {/* Secondary Actions Container */}
      {hasSecondaryActions && (
        <div
          role="menu"
          aria-label={`${mainAction.title} quick actions menu`}
          aria-expanded={isExpanded}
          className={cn(
            'absolute',
            isExpanded ? 'pointer-events-auto' : 'pointer-events-none'
          )}
        >
          {secondaryActions.map((action, index) => (
            <button
              key={action.id}
              ref={(el) => { secondaryButtonsRef.current[index] = el; }}
              onClick={() => handleSecondaryClick(action)}
              disabled={action.disabled}
              aria-disabled={action.disabled}
              className={cn(
                'absolute rounded-full shadow-lg transition-all duration-300 ease-out',
                'flex items-center justify-center font-medium',
                // PHASE 6+ STANDARD: Enhanced focus indicators
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                'focus-visible:ring-2 focus-visible:ring-primary',
                'transform-gpu will-change-transform',
                getSizeClasses(),
                getVariantClasses(action.variant),
                isExpanded 
                  ? 'opacity-100 scale-100 pointer-events-auto' 
                  : 'opacity-0 scale-75 pointer-events-none',
                action.disabled && 'opacity-50 cursor-not-allowed',
                // PHASE 6+ STANDARD: Focus state management
                focusedActionIndex === index && 'ring-2 ring-primary ring-offset-2'
              )}
              style={{
                ...getSecondaryActionPosition(index),
                transitionDelay: isExpanded ? `${index * 50}ms` : '0ms'
              }}
              aria-label={`${action.title} - quick action ${index + 1} of ${secondaryActions.length}`}
              title={showTooltip ? action.title : undefined}
              role="menuitem"
              tabIndex={isExpanded ? 0 : -1}
            >
              <span className="select-none" aria-hidden="true">{action.icon}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Action Button */}
      <button
        ref={mainButtonRef}
        onClick={handleMainClick}
        disabled={mainAction.disabled}
        aria-disabled={mainAction.disabled}
        className={cn(
          'relative rounded-full shadow-lg transition-all duration-300 ease-in-out',
          'flex items-center justify-center font-medium',
          // PHASE 6+ STANDARD: Enhanced focus management
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'focus-visible:ring-2 focus-visible:ring-primary',
          'hover:scale-110 active:scale-95',
          'transform-gpu will-change-transform',
          getSizeClasses(),
          getVariantClasses(mainAction.variant),
          isScrolled && 'shadow-xl',
          mainAction.disabled && 'opacity-50 cursor-not-allowed'
        )}
        aria-label={hasSecondaryActions 
          ? `${mainAction.title} - press to ${isExpanded ? 'collapse' : 'expand'} ${secondaryActions.length} quick actions`
          : mainAction.title
        }
        aria-expanded={hasSecondaryActions ? isExpanded : undefined}
        aria-haspopup={hasSecondaryActions ? "menu" : undefined}
        title={showTooltip ? mainAction.title : undefined}
        aria-describedby="fab-help-text"
      >
        {/* Main Icon with rotation animation */}
        <span 
          className={cn(
            'select-none transition-transform duration-300',
            isExpanded && hasSecondaryActions && 'rotate-45'
          )}
          aria-hidden="true"
        >
          {mainAction.icon}
        </span>

        {/* Ripple effect on click */}
        <span 
          className={cn(
            'absolute inset-0 rounded-full',
            'bg-white/20 scale-0 opacity-0',
            'transition-all duration-300 ease-out',
            'pointer-events-none'
          )}
          style={{
            animation: isExpanded ? 'ripple 0.6s ease-out' : 'none'
          }}
          aria-hidden="true"
        />
      </button>

      {/* PHASE 6+ STANDARD: Screen reader help text */}
      <div id="fab-help-text" className="sr-only">
        {hasSecondaryActions 
          ? `Press Enter or Space to ${isExpanded ? 'collapse' : 'expand'} actions menu. Use arrow keys to navigate when expanded.`
          : 'Press Enter or Space to activate action'
        }
      </div>

      {/* Background overlay when expanded (PHASE 6+ STANDARD: Better visual feedback) */}
      {isExpanded && hasSecondaryActions && (
        <div 
          className="fixed inset-0 bg-background/10 backdrop-blur-[1px] -z-10"
          onClick={() => {
            setIsExpanded(false);
            setFocusedActionIndex(-1);
            announceChange('Actions menu closed');
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

// ===== EXPORT COMPONENT =====
export default GlobalFAB;

// ===== CSS ANIMATION INJECTION (Phase 6+ Standard) =====
const rippleStyles = `
@keyframes ripple {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(4); opacity: 0; }
}
`;

// Inject styles if not already present (SSR safe)
if (typeof document !== 'undefined' && !document.getElementById('global-fab-styles')) {
  const style = document.createElement('style');
  style.id = 'global-fab-styles';
  style.textContent = rippleStyles;
  document.head.appendChild(style);
}