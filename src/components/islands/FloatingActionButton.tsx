// FloatingActionButton.tsx - Professional Floating Action Button Component (Sprint 9 - Step 3)
// Provides mobile-optimized floating action buttons with business-ready configurations
// Path: src/components/islands/FloatingActionButton.tsx

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface FABAction {
  id: string;
  title: string;
  icon: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'ghost';
  disabled?: boolean;
}

export interface FloatingActionButtonProps {
  // Main action (always visible)
  mainAction: FABAction;
  
  // Secondary actions (expand on click)
  secondaryActions?: FABAction[];
  
  // Position and behavior
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-left';
  hideOnScroll?: boolean;
  scrollThreshold?: number;
  showOnlyOnMobile?: boolean;
  
  // Visual variants
  size?: 'sm' | 'md' | 'lg' | 'xl';
  expandDirection?: 'up' | 'down' | 'left' | 'right' | 'radial';
  
  // Accessibility
  ariaLabel?: string;
  
  // Advanced features
  showTooltip?: boolean;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export default function FloatingActionButton({
  mainAction,
  secondaryActions = [],
  position = 'bottom-right',
  hideOnScroll = false,
  scrollThreshold = 100,
  showOnlyOnMobile = false,
  size = 'lg',
  expandDirection = 'up',
  ariaLabel,
  showTooltip = true,
  autoClose = true,
  autoCloseDelay = 3000
}: FloatingActionButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [focusedActionIndex, setFocusedActionIndex] = useState(-1);
  
  const lastScrollY = useRef(0);
  const autoCloseTimeout = useRef<NodeJS.Timeout | null>(null);
  const ticking = useRef(false);
  const mainButtonRef = useRef<HTMLButtonElement>(null);
  const secondaryButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Handle scroll behavior
  useEffect(() => {
    if (!hideOnScroll) return;

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY.current;
          
          setIsScrolled(currentScrollY > 10);
          
          if (currentScrollY > scrollThreshold) {
            setIsVisible(!isScrollingDown);
          } else {
            setIsVisible(true);
          }
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideOnScroll, scrollThreshold]);

  // Auto-close expanded FAB
  useEffect(() => {
    if (isExpanded && autoClose) {
      autoCloseTimeout.current = setTimeout(() => {
        setIsExpanded(false);
      }, autoCloseDelay);
    }

    return () => {
      if (autoCloseTimeout.current) {
        clearTimeout(autoCloseTimeout.current);
      }
    };
  }, [isExpanded, autoClose, autoCloseDelay]);

  // Close expanded FAB on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.fab-container')) {
        setIsExpanded(false);
        setFocusedActionIndex(-1);
      }
    };

    if (isExpanded) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isExpanded]);

  // Keyboard navigation support
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
          const newIndex = focusedActionIndex + direction;
          
          if (newIndex >= 0 && newIndex < secondaryActions.length) {
            setFocusedActionIndex(newIndex);
            secondaryButtonsRef.current[newIndex]?.focus();
          } else if (newIndex < 0) {
            setFocusedActionIndex(-1);
            mainButtonRef.current?.focus();
          }
          break;
        
        case 'Tab':
          // Allow natural tab navigation but close on tab out
          if (event.shiftKey && focusedActionIndex === 0) {
            setIsExpanded(false);
            setFocusedActionIndex(-1);
          } else if (!event.shiftKey && focusedActionIndex === secondaryActions.length - 1) {
            setIsExpanded(false);
            setFocusedActionIndex(-1);
          }
          break;
        
        case 'Enter':
        case ' ':
          if (focusedActionIndex >= 0) {
            event.preventDefault();
            const action = secondaryActions[focusedActionIndex];
            handleSecondaryClick(action);
          }
          break;
      }
    };

    if (isExpanded) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isExpanded, focusedActionIndex, secondaryActions]);

  // Focus management when expanding
  useEffect(() => {
    if (isExpanded && secondaryActions.length > 0) {
      // Focus first secondary action when expanded
      setTimeout(() => {
        secondaryButtonsRef.current[0]?.focus();
        setFocusedActionIndex(0);
      }, 150); // Wait for animation
    } else {
      setFocusedActionIndex(-1);
    }
  }, [isExpanded, secondaryActions.length]);

  // Handle main action click
  const handleMainClick = () => {
    if (secondaryActions.length > 0) {
      setIsExpanded(!isExpanded);
    } else if (mainAction.onClick) {
      mainAction.onClick();
    } else if (mainAction.href) {
      window.location.href = mainAction.href;
    }
  };

  // Handle secondary action click
  const handleSecondaryClick = (action: FABAction) => {
    if (action.onClick) {
      action.onClick();
    } else if (action.href) {
      window.location.href = action.href;
    }
    setIsExpanded(false);
    setFocusedActionIndex(-1);
  };

  // Position classes
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

  // Size classes
  const getSizeClasses = () => {
    const sizes = {
      sm: 'w-12 h-12 text-lg',
      md: 'w-14 h-14 text-xl',
      lg: 'w-16 h-16 text-2xl',
      xl: 'w-20 h-20 text-3xl'
    };
    return sizes[size];
  };

  // Variant classes
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

  // Secondary action position calculation with boundary detection
  const getSecondaryActionPosition = (index: number) => {
    const spacing = size === 'xl' ? 80 : size === 'lg' ? 70 : size === 'md' ? 60 : 50;
    const offset = (index + 1) * spacing;

    // Smart direction adjustment based on position and screen boundaries
    let adjustedDirection = expandDirection;
    
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      // Auto-adjust direction based on position to prevent overflow
      if (position === 'top-right' && expandDirection === 'radial') {
        adjustedDirection = 'down'; // Prevent radial overflow at top-right
      } else if (position === 'top-left' && expandDirection === 'radial') {
        adjustedDirection = 'down'; // Prevent radial overflow at top-left
      } else if (position === 'bottom-right' && expandDirection === 'right') {
        adjustedDirection = 'up'; // Prevent horizontal overflow at bottom-right
      } else if (position === 'bottom-left' && expandDirection === 'left') {
        adjustedDirection = 'up'; // Prevent horizontal overflow at bottom-left
      }
    }

    switch (adjustedDirection) {
      case 'up':
        return { bottom: `${offset + 24}px`, transform: 'translateX(0)' };
      case 'down':
        return { top: `${offset + 24}px`, transform: 'translateX(0)' };
      case 'left':
        return { right: `${offset + 24}px`, transform: 'translateY(0)' };
      case 'right':
        return { left: `${offset + 24}px`, transform: 'translateY(0)' };
      case 'radial':
        // Smart radial positioning based on screen position
        let startAngle = -90; // Default: start from top
        
        // Adjust start angle based on position to keep actions on screen
        if (position.includes('top')) {
          startAngle = 45; // Start from bottom-right for top positions
        } else if (position.includes('bottom')) {
          startAngle = -135; // Start from top-left for bottom positions
        }
        
        const angle = startAngle + (index * 45); // Spread 45° each
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

  // Don't render on desktop if showOnlyOnMobile is true
  if (showOnlyOnMobile && typeof window !== 'undefined') {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return null;
  }

  const hasSecondaryActions = secondaryActions.length > 0;
  const fabDescription = hasSecondaryActions 
    ? `${mainAction.title} with ${secondaryActions.length} quick actions`
    : mainAction.title;

  return (
    <div 
      className={cn(
        'fab-container fixed z-50 transition-all duration-300 ease-in-out',
        getPositionClasses(),
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none',
        showOnlyOnMobile && 'md:hidden'
      )}
      role="region"
      aria-label={ariaLabel || fabDescription}
    >
      
      {/* Live region for screen reader announcements */}
      <div 
        className="sr-only" 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {isExpanded && hasSecondaryActions && `${secondaryActions.length} quick actions expanded. Use arrow keys to navigate, Escape to close.`}
        {!isExpanded && hasSecondaryActions && "Quick actions collapsed."}
      </div>

      {/* Secondary Actions */}
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
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                'transform-gpu will-change-transform',
                getSizeClasses(),
                getVariantClasses(action.variant),
                isExpanded 
                  ? 'opacity-100 scale-100 pointer-events-auto' 
                  : 'opacity-0 scale-75 pointer-events-none',
                action.disabled && 'opacity-50 cursor-not-allowed'
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
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
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

      {/* Background overlay when expanded */}
      {isExpanded && hasSecondaryActions && (
        <div 
          className="fixed inset-0 bg-background/20 backdrop-blur-[2px] -z-10"
          onClick={() => {
            setIsExpanded(false);
            setFocusedActionIndex(-1);
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

// Pre-configured FAB variants for common business use cases
export const BusinessFAB = (props: Partial<FloatingActionButtonProps>) => (
  <FloatingActionButton
    mainAction={{
      id: 'main',
      title: 'Business Quick Actions',
      icon: '➕',
      variant: 'primary'
    }}
    secondaryActions={[
      {
        id: 'new-contact',
        title: 'New Contact',
        icon: '👤',
        href: '/contacts/new',
        variant: 'secondary'
      },
      {
        id: 'new-project',
        title: 'New Project',
        icon: '📁',
        href: '/projects/new',
        variant: 'secondary'
      },
      {
        id: 'quick-note',
        title: 'Quick Note',
        icon: '📝',
        onClick: () => alert('Quick note feature'),
        variant: 'secondary'
      }
    ]}
    ariaLabel="Business management quick actions"
    {...props}
  />
);

export const SupportFAB = (props: Partial<FloatingActionButtonProps>) => (
  <FloatingActionButton
    mainAction={{
      id: 'support',
      title: 'Customer Support',
      icon: '❓',
      variant: 'ghost'
    }}
    secondaryActions={[
      {
        id: 'chat',
        title: 'Live Chat',
        icon: '💬',
        onClick: () => alert('Opening live chat...'),
        variant: 'primary'
      },
      {
        id: 'docs',
        title: 'Documentation',
        icon: '📖',
        href: '/docs',
        variant: 'secondary'
      },
      {
        id: 'feedback',
        title: 'Send Feedback',
        icon: '📧',
        href: '/feedback',
        variant: 'secondary'
      }
    ]}
    expandDirection="up"
    position="bottom-left"
    ariaLabel="Customer support and help options"
    {...props}
  />
);

export const EcommerceFAB = (props: Partial<FloatingActionButtonProps>) => (
  <FloatingActionButton
    mainAction={{
      id: 'cart',
      title: 'Shopping Cart Actions',
      icon: '🛒',
      variant: 'primary'
    }}
    secondaryActions={[
      {
        id: 'wishlist',
        title: 'Wishlist',
        icon: '❤️',
        href: '/wishlist',
        variant: 'secondary'
      },
      {
        id: 'compare',
        title: 'Compare Products',
        icon: '⚖️',
        href: '/compare',
        variant: 'secondary'
      },
      {
        id: 'search',
        title: 'Search Products',
        icon: '🔍',
        onClick: () => {
          const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
          searchInput?.focus();
        },
        variant: 'ghost'
      }
    ]}
    expandDirection="radial"
    ariaLabel="E-commerce shopping quick actions"
    {...props}
  />
);

// CSS Animation for ripple effect (inject into head)
const rippleStyles = `
@keyframes ripple {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(4); opacity: 0; }
}
`;

// Inject styles if not already present
if (typeof document !== 'undefined' && !document.getElementById('fab-styles')) {
  const style = document.createElement('style');
  style.id = 'fab-styles';
  style.textContent = rippleStyles;
  document.head.appendChild(style);
}