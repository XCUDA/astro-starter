// TouchNavigation.tsx - Advanced Touch Gestures for Mobile Navigation
// React component for enhanced mobile navigation with swipe gestures and touch interactions
// Path: src/components/islands/TouchNavigation.tsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Menu, X, Home, ArrowUp } from 'lucide-react';

interface TouchNavigationProps {
  variant?: 'swipe-drawer' | 'bottom-nav' | 'floating-fab' | 'gesture-panel';
  enableSwipeToClose?: boolean;
  enableSwipeNavigation?: boolean;
  enablePullToRefresh?: boolean;
  showBackToTop?: boolean;
  navigationItems?: Array<{
    name: string;
    href: string;
    icon: React.ReactNode;
    badge?: string;
  }>;
  currentPage?: string;
}

interface TouchState {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  deltaX: number;
  deltaY: number;
  isDragging: boolean;
  direction: 'horizontal' | 'vertical' | null;
}

export default function TouchNavigation({
  variant = 'swipe-drawer',
  enableSwipeToClose = true,
  enableSwipeNavigation = true,
  enablePullToRefresh = false,
  showBackToTop = true,
  navigationItems = [
    { name: 'Home', href: '/', icon: <Home size={20} /> },
    { name: 'Components', href: '/components-showcase', icon: <Menu size={20} /> },
    { name: 'Forms', href: '/form-showcase', icon: <span>📝</span> },
    { name: 'Advanced', href: '/advanced-showcase', icon: <span>🔮</span> }
  ],
  currentPage
}: TouchNavigationProps) {
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [touchState, setTouchState] = useState<TouchState>({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    deltaX: 0,
    deltaY: 0,
    isDragging: false,
    direction: null
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const drawerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  
  // Detect scroll position for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Touch event handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    const newTouchState = {
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      deltaX: 0,
      deltaY: 0,
      isDragging: true,
      direction: null
    };
    
    setTouchState(newTouchState);
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchState.isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchState.startX;
    const deltaY = touch.clientY - touchState.startY;
    
    // Determine primary direction on first significant movement
    let direction = touchState.direction;
    if (!direction && (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10)) {
      direction = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical';
    }
    
    const newTouchState = {
      ...touchState,
      currentX: touch.clientX,
      currentY: touch.clientY,
      deltaX,
      deltaY,
      direction
    };
    
    setTouchState(newTouchState);
    
    // Handle drawer swipe (only for horizontal swipes from edge)
    if (variant === 'swipe-drawer' && direction === 'horizontal') {
      if (isDrawerOpen && deltaX < -50) {
        // Swipe left to close
        if (drawerRef.current) {
          const progress = Math.min(Math.abs(deltaX) / 200, 1);
          drawerRef.current.style.transform = `translateX(${progress * 100}%)`;
        }
      } else if (!isDrawerOpen && touchState.startX < 50 && deltaX > 50) {
        // Swipe right from left edge to open
        if (drawerRef.current) {
          const progress = Math.min(deltaX / 200, 1);
          drawerRef.current.style.transform = `translateX(${-100 + progress * 100}%)`;
          drawerRef.current.style.visibility = 'visible';
        }
      }
    }
    
    // Handle pull to refresh (vertical swipe from top)
    if (enablePullToRefresh && direction === 'vertical' && touchState.startY < 100 && deltaY > 100) {
      const progress = Math.min(deltaY / 150, 1);
      // Show pull to refresh indicator
      if (progress > 0.8 && !isRefreshing) {
        setIsRefreshing(true);
        // Simulate refresh
        setTimeout(() => {
          setIsRefreshing(false);
          window.location.reload();
        }, 1500);
      }
    }
  }, [touchState, isDrawerOpen, variant, enablePullToRefresh, isRefreshing]);

  const handleTouchEnd = useCallback(() => {
    const { deltaX, deltaY, direction } = touchState;
    
    // Handle drawer gestures
    if (variant === 'swipe-drawer' && direction === 'horizontal') {
      if (isDrawerOpen && deltaX < -100) {
        // Close drawer
        setIsDrawerOpen(false);
      } else if (!isDrawerOpen && touchState.startX < 50 && deltaX > 100) {
        // Open drawer
        setIsDrawerOpen(true);
      }
      
      // Reset drawer position
      if (drawerRef.current) {
        drawerRef.current.style.transform = isDrawerOpen ? 'translateX(0)' : 'translateX(-100%)';
        drawerRef.current.style.visibility = isDrawerOpen ? 'visible' : 'hidden';
      }
    }
    
    // Handle swipe navigation (horizontal swipes in content area)
    if (enableSwipeNavigation && direction === 'horizontal' && Math.abs(deltaX) > 100) {
      const currentIndex = navigationItems.findIndex(item => 
        window.location.pathname === item.href || 
        (currentPage && item.href.includes(currentPage))
      );
      
      if (currentIndex !== -1) {
        if (deltaX > 0 && currentIndex > 0) {
          // Swipe right - go to previous page
          window.location.href = navigationItems[currentIndex - 1].href;
        } else if (deltaX < 0 && currentIndex < navigationItems.length - 1) {
          // Swipe left - go to next page
          window.location.href = navigationItems[currentIndex + 1].href;
        }
      }
    }
    
    setTouchState({
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      deltaX: 0,
      deltaY: 0,
      isDragging: false,
      direction: null
    });
    
    touchStartRef.current = null;
  }, [touchState, isDrawerOpen, variant, enableSwipeNavigation, navigationItems, currentPage]);

  // Back to top functionality
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const isCurrentPage = (href: string) => {
    return window.location.pathname === href || 
           (currentPage && href.includes(currentPage));
  };

  // Render based on variant
  switch (variant) {
    case 'swipe-drawer':
      return (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Touch area for opening drawer */}
          <div 
            className="absolute left-0 top-0 w-6 h-full pointer-events-auto"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          
          {/* Drawer */}
          <div
            ref={drawerRef}
            className={`absolute left-0 top-0 h-full w-80 bg-card/95 backdrop-blur-sm border-r border-border shadow-xl transform transition-transform duration-300 pointer-events-auto ${
              isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            style={{ visibility: isDrawerOpen ? 'visible' : 'hidden' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Navigation</h2>
              <button
                onClick={toggleDrawer}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                aria-label="Close navigation"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Navigation Items */}
            <div className="p-4 space-y-2">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    isCurrentPage(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
          
          {/* Backdrop */}
          {isDrawerOpen && (
            <div
              className="absolute inset-0 bg-background/50 backdrop-blur-sm pointer-events-auto"
              onClick={() => setIsDrawerOpen(false)}
            />
          )}
        </div>
      );

    case 'bottom-nav':
      return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border">
          <div className="flex items-center justify-around py-2">
            {navigationItems.slice(0, 5).map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                  isCurrentPage(item.href)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.icon}
                <span className="text-xs font-medium">{item.name}</span>
                {item.badge && (
                  <span className="absolute -top-1 -right-1 text-xs bg-destructive text-destructive-foreground w-5 h-5 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      );

    case 'floating-fab':
      return (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Main FAB */}
          <button
            onClick={toggleDrawer}
            className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 flex items-center justify-center"
            aria-label="Open navigation menu"
          >
            {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* FAB Menu */}
          {isDrawerOpen && (
            <div className="absolute bottom-16 right-0 space-y-3">
              {navigationItems.slice(0, 4).map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center justify-center w-12 h-12 bg-card text-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 border border-border"
                  style={{ 
                    transform: `translateY(${isDrawerOpen ? 0 : 20}px)`,
                    opacity: isDrawerOpen ? 1 : 0,
                    transitionDelay: `${index * 50}ms`
                  }}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          )}
          
          {/* Back to Top Button */}
          {showBackToTop && showScrollTop && (
            <button
              onClick={scrollToTop}
              className="absolute -top-16 right-0 w-12 h-12 bg-muted text-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 flex items-center justify-center"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </button>
          )}
        </div>
      );

    case 'gesture-panel':
      return (
        <div 
          className="fixed inset-0 pointer-events-none z-40"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Pull to Refresh Indicator */}
          {enablePullToRefresh && isRefreshing && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-card text-foreground px-4 py-2 rounded-full shadow-lg border border-border">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Refreshing...</span>
              </div>
            </div>
          )}
          
          {/* Swipe Navigation Hints */}
          {enableSwipeNavigation && touchState.isDragging && touchState.direction === 'horizontal' && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card/90 text-foreground px-6 py-3 rounded-lg shadow-lg border border-border">
              <div className="flex items-center space-x-3">
                {touchState.deltaX > 0 ? (
                  <>
                    <ChevronLeft size={20} />
                    <span className="text-sm">Previous page</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm">Next page</span>
                    <ChevronRight size={20} />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
}

// Export touch utilities for other components
export const touchUtils = {
  detectSwipeDirection: (startX: number, startY: number, endX: number, endY: number) => {
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    
    if (absDeltaX < 30 && absDeltaY < 30) return null;
    
    if (absDeltaX > absDeltaY) {
      return deltaX > 0 ? 'right' : 'left';
    } else {
      return deltaY > 0 ? 'down' : 'up';
    }
  },
  
  isTouchDevice: () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },
  
  preventZoom: (e: TouchEvent) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }
};