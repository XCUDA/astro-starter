import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TouchNavigationDemo = () => {
  const [fabExpanded, setFabExpanded] = useState(false);
  const [activeBottomTab, setActiveBottomTab] = useState(0);
  const [pullToRefresh, setPullToRefresh] = useState({ pulling: false, distance: 0, triggered: false });
  const [swipePosition, setSwipePosition] = useState(0);
  const [longPressActive, setLongPressActive] = useState(false);
  const [touchFeedback, setTouchFeedback] = useState<{ x: number; y: number; id: number } | null>(null);
  
  const pullAreaRef = useRef<HTMLDivElement>(null);
  const swipeAreaRef = useRef<HTMLDivElement>(null);
  const longPressRef = useRef<HTMLDivElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const announceRef = useRef<HTMLDivElement>(null);

  const announceChange = (message: string) => {
    if (announceRef.current) {
      announceRef.current.textContent = message;
    }
  };

  // FAB Actions
  const fabActions = [
    { icon: '📧', label: 'Messages', color: 'bg-blue-500' },
    { icon: '📞', label: 'Call', color: 'bg-green-500' },
    { icon: '📅', label: 'Calendar', color: 'bg-purple-500' },
    { icon: '⚙️', label: 'Settings', color: 'bg-gray-500' }
  ];

  // Bottom Navigation Tabs
  const bottomTabs = [
    { icon: '🏠', label: 'Home', badge: null },
    { icon: '🔍', label: 'Search', badge: null },
    { icon: '❤️', label: 'Favorites', badge: '3' },
    { icon: '👤', label: 'Profile', badge: null }
  ];

  // Touch Feedback Effect
  const createTouchFeedback = useCallback((x: number, y: number) => {
    const id = Date.now();
    setTouchFeedback({ x, y, id });
    setTimeout(() => setTouchFeedback(null), 600);
  }, []);

  // Handle FAB Toggle
  const toggleFAB = () => {
    setFabExpanded(!fabExpanded);
    announceChange(fabExpanded ? 'FAB collapsed' : 'FAB expanded with 4 actions available');
  };

  // Handle FAB Action
  const handleFABAction = (action: typeof fabActions[0]) => {
    announceChange(`${action.label} action triggered`);
    setFabExpanded(false);
    // Simulate action with brief visual feedback
    setTimeout(() => {
      announceChange(`${action.label} completed`);
    }, 1000);
  };

  // Handle Bottom Tab Change
  const handleBottomTabChange = (index: number) => {
    setActiveBottomTab(index);
    announceChange(`Switched to ${bottomTabs[index].label} tab`);
  };

  // Pull to Refresh Logic
  useEffect(() => {
    const pullArea = pullAreaRef.current;
    if (!pullArea) return;

    let startY = 0;
    let currentY = 0;
    let pulling = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (pullArea.scrollTop <= 0) {
        startY = e.touches[0].clientY;
        pulling = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!pulling) return;
      
      currentY = e.touches[0].clientY;
      const distance = Math.max(0, (currentY - startY) * 0.4);
      
      if (distance > 0) {
        e.preventDefault();
        setPullToRefresh(prev => ({ ...prev, pulling: true, distance }));
      }
    };

    const handleTouchEnd = () => {
      if (pulling && pullToRefresh.distance > 50) {
        setPullToRefresh(prev => ({ ...prev, triggered: true }));
        announceChange('Pull to refresh triggered');
        
        setTimeout(() => {
          setPullToRefresh({ pulling: false, distance: 0, triggered: false });
          announceChange('Content refreshed');
        }, 1500);
      } else {
        setPullToRefresh({ pulling: false, distance: 0, triggered: false });
      }
      pulling = false;
    };

    pullArea.addEventListener('touchstart', handleTouchStart, { passive: false });
    pullArea.addEventListener('touchmove', handleTouchMove, { passive: false });
    pullArea.addEventListener('touchend', handleTouchEnd);

    return () => {
      pullArea.removeEventListener('touchstart', handleTouchStart);
      pullArea.removeEventListener('touchmove', handleTouchMove);
      pullArea.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullToRefresh.distance]);

  // Swipe Navigation Logic
  useEffect(() => {
    const swipeArea = swipeAreaRef.current;
    if (!swipeArea) return;

    let startX = 0;
    let currentX = 0;
    let swiping = false;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      swiping = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!swiping) return;
      
      currentX = e.touches[0].clientX;
      const distance = currentX - startX;
      setSwipePosition(distance);
    };

    const handleTouchEnd = () => {
      if (Math.abs(swipePosition) > 100) {
        const direction = swipePosition > 0 ? 'right' : 'left';
        announceChange(`Swiped ${direction} - navigating to ${direction === 'right' ? 'previous' : 'next'} page`);
        
        // Animate to completion
        setSwipePosition(swipePosition > 0 ? 300 : -300);
        setTimeout(() => setSwipePosition(0), 300);
      } else {
        setSwipePosition(0);
      }
      swiping = false;
    };

    swipeArea.addEventListener('touchstart', handleTouchStart);
    swipeArea.addEventListener('touchmove', handleTouchMove);
    swipeArea.addEventListener('touchend', handleTouchEnd);

    return () => {
      swipeArea.removeEventListener('touchstart', handleTouchStart);
      swipeArea.removeEventListener('touchmove', handleTouchMove);
      swipeArea.removeEventListener('touchend', handleTouchEnd);
    };
  }, [swipePosition]);

  // Long Press Logic
  useEffect(() => {
    const longPressArea = longPressRef.current;
    if (!longPressArea) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      createTouchFeedback(touch.clientX, touch.clientY);
      
      longPressTimer.current = setTimeout(() => {
        setLongPressActive(true);
        announceChange('Long press detected - context menu available');
        navigator.vibrate?.(100); // Haptic feedback if available
        
        setTimeout(() => setLongPressActive(false), 2000);
      }, 500);
    };

    const handleTouchEnd = () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
    };

    longPressArea.addEventListener('touchstart', handleTouchStart);
    longPressArea.addEventListener('touchend', handleTouchEnd);
    longPressArea.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
      }
      longPressArea.removeEventListener('touchstart', handleTouchStart);
      longPressArea.removeEventListener('touchend', handleTouchEnd);
      longPressArea.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [createTouchFeedback]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span aria-hidden="true">📱</span>
          <span>Touch Navigation Interactive Demo</span>
        </CardTitle>
        <CardDescription>
          Vraies interactions tactiles avec FAB, bottom navigation, swipe, pull-to-refresh et haptic feedback
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Live Region */}
        <div ref={announceRef} className="sr-only" aria-live="polite"></div>

        {/* Instructions */}
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">📱 Try These Touch Interactions:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-600 dark:text-blue-400">
            <div>• <strong>TAP</strong> FAB to expand actions</div>
            <div>• <strong>PULL DOWN</strong> content area to refresh</div>
            <div>• <strong>SWIPE LEFT/RIGHT</strong> on cards to navigate</div>
            <div>• <strong>LONG PRESS</strong> anywhere for context menu</div>
          </div>
        </div>

        {/* Touch Demo Areas */}
        <div className="space-y-6">
          
          {/* Pull to Refresh Demo */}
          <div className="relative">
            <h3 className="font-medium mb-3 flex items-center space-x-2">
              <span>🔄</span>
              <span>Pull to Refresh</span>
              {pullToRefresh.triggered && <Badge variant="secondary">Refreshing...</Badge>}
            </h3>
            
            <div 
              ref={pullAreaRef}
              className="relative h-48 bg-muted/30 rounded-lg border border-border overflow-y-auto"
              style={{ 
                transform: `translateY(${pullToRefresh.distance}px)`,
                transition: pullToRefresh.pulling ? 'none' : 'transform 0.3s ease'
              }}
            >
              {/* Pull Indicator */}
              <div 
                className={`absolute top-0 left-0 right-0 flex items-center justify-center transition-all duration-300 ${
                  pullToRefresh.distance > 0 ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ height: `${pullToRefresh.distance}px` }}
              >
                <div className={`transform transition-transform duration-300 ${
                  pullToRefresh.distance > 50 ? 'scale-110' : 'scale-100'
                }`}>
                  {pullToRefresh.triggered ? (
                    <div className="animate-spin text-primary">⟳</div>
                  ) : pullToRefresh.distance > 50 ? (
                    <div className="text-green-500">↓ Release to refresh</div>
                  ) : (
                    <div className="text-muted-foreground">↓ Pull to refresh</div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-background rounded border">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      📄
                    </div>
                    <div>
                      <div className="font-medium">Content Item {i}</div>
                      <div className="text-sm text-muted-foreground">Updated content after refresh</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Swipe Navigation Demo */}
          <div>
            <h3 className="font-medium mb-3 flex items-center space-x-2">
              <span>👆</span>
              <span>Swipe Navigation</span>
              <Badge variant="outline" className="text-xs">Try swiping cards</Badge>
            </h3>
            
            <div 
              ref={swipeAreaRef}
              className="relative bg-muted/30 rounded-lg border border-border overflow-hidden"
              style={{
                transform: `translateX(${swipePosition}px)`,
                transition: Math.abs(swipePosition) > 100 ? 'transform 0.3s ease' : 'none'
              }}
            >
              <div className="flex">
                <div className="w-full p-6 flex-shrink-0">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📱</div>
                    <h4 className="font-semibold mb-2">Current Page</h4>
                    <p className="text-sm text-muted-foreground">
                      Swipe left or right to navigate between pages
                    </p>
                    <div className="mt-4 flex justify-center space-x-2">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Swipe Indicators */}
              <div className={`absolute top-0 left-0 h-full w-16 bg-green-500/20 flex items-center justify-center transition-opacity ${
                swipePosition > 50 ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="text-green-500">◀</div>
              </div>
              <div className={`absolute top-0 right-0 h-full w-16 bg-blue-500/20 flex items-center justify-center transition-opacity ${
                swipePosition < -50 ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="text-blue-500">▶</div>
              </div>
            </div>
          </div>

          {/* Long Press Demo */}
          <div>
            <h3 className="font-medium mb-3 flex items-center space-x-2">
              <span>⏰</span>
              <span>Long Press & Context Menu</span>
              {longPressActive && <Badge variant="secondary">Menu Active</Badge>}
            </h3>
            
            <div 
              ref={longPressRef}
              className={`relative p-6 bg-muted/30 rounded-lg border border-border transition-all duration-300 ${
                longPressActive ? 'bg-primary/10 border-primary/30 scale-105' : ''
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">👆</div>
                <h4 className="font-semibold mb-2">Touch & Hold</h4>
                <p className="text-sm text-muted-foreground">
                  Press and hold for 500ms to activate context menu
                </p>
              </div>

              {/* Context Menu */}
              <div className={`absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg transition-all duration-300 ${
                longPressActive ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
              }`}>
                <div className="p-2 space-y-1">
                  <button className="w-full text-left px-3 py-2 text-sm rounded hover:bg-muted/50 transition-colors">
                    📋 Copy
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm rounded hover:bg-muted/50 transition-colors">
                    📤 Share
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm rounded hover:bg-muted/50 transition-colors">
                    ⭐ Favorite
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm rounded hover:bg-muted/50 transition-colors text-red-600">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8">
          <h3 className="font-medium mb-3 flex items-center space-x-2">
            <span>📱</span>
            <span>Bottom Navigation</span>
          </h3>
          
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="h-32 bg-muted/30 flex items-center justify-center text-muted-foreground">
              Content Area - {bottomTabs[activeBottomTab].label} View
            </div>
            
            <div className="border-t border-border bg-background/95 backdrop-blur-sm">
              <div className="flex">
                {bottomTabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => handleBottomTabChange(index)}
                    className={`flex-1 flex flex-col items-center space-y-1 py-3 transition-all duration-200 ${
                      activeBottomTab === index 
                        ? 'text-primary bg-primary/10' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <div className="relative text-lg">
                      {tab.icon}
                      {tab.badge && (
                        <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs w-5 h-5 p-0 flex items-center justify-center">
                          {tab.badge}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6">
          {/* FAB Actions */}
          <div className={`absolute bottom-16 right-0 space-y-3 transition-all duration-300 ${
            fabExpanded ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
          }`}>
            {fabActions.map((action, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 transition-all duration-300`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span className="text-xs font-medium text-foreground bg-card border border-border px-2 py-1 rounded shadow-sm">
                  {action.label}
                </span>
                <button
                  onClick={() => handleFABAction(action)}
                  className={`w-12 h-12 ${action.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center text-lg`}
                >
                  {action.icon}
                </button>
              </div>
            ))}
          </div>

          {/* Main FAB */}
          <button
            onClick={toggleFAB}
            className={`w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center text-xl ${
              fabExpanded ? 'rotate-45' : 'rotate-0'
            }`}
            aria-label={fabExpanded ? "Close FAB menu" : "Open FAB menu"}
            aria-expanded={fabExpanded}
          >
            {fabExpanded ? '✕' : '+'}
          </button>
        </div>

        {/* Touch Feedback Effect */}
        {touchFeedback && (
          <div
            className="fixed pointer-events-none z-50"
            style={{
              left: touchFeedback.x - 20,
              top: touchFeedback.y - 20,
            }}
          >
            <div className="w-10 h-10 bg-primary/30 rounded-full animate-ping"></div>
          </div>
        )}

        {/* Features Summary */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium mb-3">🚀 Demonstrated Touch Features:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Responsive pull-to-refresh with visual feedback</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Swipe navigation with directional indicators</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>Long press context menus with haptic feedback</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>Animated FAB with expandable actions</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>Bottom navigation with badges</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
              <span>Touch feedback effects and animations</span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Perfect for:</strong> Mobile-first web apps, progressive web apps (PWA), touch-enabled kiosks, and modern responsive websites targeting mobile users.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TouchNavigationDemo;