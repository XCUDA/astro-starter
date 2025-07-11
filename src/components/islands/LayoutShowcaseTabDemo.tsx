import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import NavigationDemo from './NavigationDemo';
import MegaMenuDemo from './MegaMenuDemo';
import BreadcrumbsDemo from './BreadcrumbsDemo';
import TouchNavigationDemo from './TouchNavigationDemo';

const LayoutShowcaseTabDemo = () => {
  const [activeTab, setActiveTab] = useState('navigation');
  const announceRef = useRef<HTMLDivElement>(null);

  const announceChange = (message: string) => {
    if (announceRef.current) {
      announceRef.current.textContent = message;
    }
  };

  const tabs = [
    {
      id: 'navigation',
      name: 'Navigation',
      icon: '🧭',
      description: 'Responsive navigation with animations',
      component: NavigationDemo,
      badge: 'Interactive'
    },
    {
      id: 'megamenu',
      name: 'Mega Menu',
      icon: '📋',
      description: 'Business-specific mega menus',
      component: MegaMenuDemo,
      badge: 'Business'
    },
    {
      id: 'breadcrumbs',
      name: 'Breadcrumbs',
      icon: '📍',
      description: 'Smart navigation paths',
      component: BreadcrumbsDemo,
      badge: 'Smart'
    },
    {
      id: 'touch',
      name: 'Touch',
      icon: '📱',
      description: 'Mobile gestures & interactions',
      component: TouchNavigationDemo,
      badge: 'Mobile'
    }
  ];

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
    const tab = tabs.find(t => t.id === tabId);
    announceChange(`Switched to ${tab?.name} demo`);
  }, []);

  const handleTabKeydown = useCallback((event: React.KeyboardEvent, tabId: string) => {
    const currentIndex = tabs.findIndex(tab => tab.id === tabId);
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        newIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = tabs.length - 1;
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleTabChange(tabId);
        return;
      default:
        return;
    }

    const newTab = tabs[newIndex];
    if (newTab) {
      handleTabChange(newTab.id);
      // Focus the new tab
      setTimeout(() => {
        const tabButton = document.querySelector(`[data-tab-id="${newTab.id}"]`) as HTMLElement;
        if (tabButton) {
          tabButton.focus();
        }
      }, 10);
    }
  }, [handleTabChange]);

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || NavigationDemo;

  return (
    <div className="w-full dropdown-container" style={{ overflow: 'visible', position: 'relative' }}>
      {/* Live Region for Screen Readers */}
      <div ref={announceRef} className="sr-only" aria-live="polite"></div>

      {/* Tab Navigation */}
      <div 
        className="flex flex-wrap border-b border-border mb-8 overflow-x-auto" 
        role="tablist" 
        aria-label="Layout component demonstrations"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            data-tab-id={tab.id}
            className={`relative flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-all duration-200 border-b-2 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-w-0 flex-shrink-0 ${
              activeTab === tab.id
                ? 'border-primary text-primary bg-primary/5'
                : 'border-transparent text-muted-foreground hover:border-border'
            }`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => handleTabChange(tab.id)}
            onKeyDown={(e) => handleTabKeydown(e, tab.id)}
          >
            <span className="text-lg" aria-hidden="true">{tab.icon}</span>
            <span className="font-medium">{tab.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded transition-all duration-200 ${
              activeTab === tab.id 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {tab.badge}
            </span>
            
            {/* Active indicator */}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`tabpanel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            tabIndex={0}
            className={`transition-all duration-300 ${
              activeTab === tab.id 
                ? 'block animate-fade-in' 
                : 'hidden'
            }`}
          >
            {/* Tab Description */}
            <div className="mb-6 p-4 bg-muted/30 rounded-lg border-l-4 border-primary">
              <div className="flex items-start space-x-3">
                <span className="text-2xl mt-1" aria-hidden="true">{tab.icon}</span>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">
                    {tab.name} Component Demo
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    {tab.description}
                  </p>
                  <div className="flex items-center space-x-3 mt-3">
                    <span className={`text-xs px-2 py-1 rounded ${
                      tab.badge === 'Interactive' ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' :
                      tab.badge === 'Business' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' :
                      tab.badge === 'Smart' ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20' :
                      'bg-orange-500/10 text-orange-600 border border-orange-500/20'
                    }`}>
                      {tab.badge} Demo
                    </span>
                    <span className="text-xs text-muted-foreground">
                      React Island with client:load
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Component Demo */}
            <div className="island-container dropdown-container" style={{ overflow: 'visible', position: 'relative' }}>
              <ActiveComponent />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Instructions */}
      <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2 flex items-center space-x-2">
          <span>⌨️</span>
          <span>Keyboard Navigation</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-600 dark:text-blue-400">
          <div>• <kbd className="px-2 py-1 bg-blue-500/20 rounded text-xs">←</kbd> <kbd className="px-2 py-1 bg-blue-500/20 rounded text-xs">→</kbd> Navigate between tabs</div>
          <div>• <kbd className="px-2 py-1 bg-blue-500/20 rounded text-xs">Home</kbd> <kbd className="px-2 py-1 bg-blue-500/20 rounded text-xs">End</kbd> First/Last tab</div>
          <div>• <kbd className="px-2 py-1 bg-blue-500/20 rounded text-xs">Enter</kbd> <kbd className="px-2 py-1 bg-blue-500/20 rounded text-xs">Space</kbd> Activate tab</div>
          <div>• <kbd className="px-2 py-1 bg-blue-500/20 rounded text-xs">Tab</kbd> Navigate within demo components</div>
        </div>
      </div>

      {/* Performance Info */}
      <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
        <h4 className="font-medium text-green-700 dark:text-green-300 mb-2 flex items-center space-x-2">
          <span>⚡</span>
          <span>Performance Features</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-green-600 dark:text-green-400">
          <div>• Islands architecture for optimal loading</div>
          <div>• Only active components are hydrated</div>
          <div>• Smooth animations with GPU acceleration</div>
          <div>• WCAG 2.1 AA keyboard accessibility</div>
        </div>
      </div>
    </div>
  );
};

export default LayoutShowcaseTabDemo;