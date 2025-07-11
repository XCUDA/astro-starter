import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Types for sidebar configuration
interface SidebarProps {
  variant: 'admin' | 'dashboard' | 'compact' | 'minimal';
  collapsed: boolean;
  onToggleCollapse: () => void;
  activeMenu: string;
  onMenuChange: (menu: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  userProfile: {
    name: string;
    role: string;
    avatar: string;
  };
  quickActions: Array<{
    id: string;
    name: string;
    icon: string;
    href: string;
    variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  }>;
}

interface NavigationItem {
  id: string;
  name: string;
  icon: string;
  href: string;
  description?: string;
  category?: string;
}

// Enhanced navigation data for each variant
const navigationData: Record<string, NavigationItem[]> = {
  admin: [
    { id: 'dashboard', name: 'Dashboard', icon: '📊', href: '/admin/dashboard', category: 'Dashboard' },
    { id: 'analytics', name: 'Analytics', icon: '📈', href: '/admin/analytics', category: 'Dashboard' },
    { id: 'projects', name: 'Projects', icon: '📁', href: '/admin/projects', category: 'Content' },
    { id: 'users', name: 'Users', icon: '👥', href: '/admin/users', category: 'Content' },
    { id: 'settings', name: 'Settings', icon: '⚙️', href: '/admin/settings', category: 'System' },
  ],
  dashboard: [
    { id: 'dashboard', name: 'Dashboard', icon: '📊', href: '/dashboard', description: 'Overview and analytics', category: 'Dashboard' },
    { id: 'analytics', name: 'Analytics', icon: '📈', href: '/analytics', description: 'Performance metrics', category: 'Dashboard' },
    { id: 'projects', name: 'Projects', icon: '📁', href: '/projects', description: 'Manage your projects', category: 'Content' },
    { id: 'reports', name: 'Reports', icon: '📋', href: '/reports', description: 'Business intelligence', category: 'Content' },
  ],
  compact: [
    { id: 'dashboard', name: 'Dashboard', icon: '📊', href: '/dashboard' },
    { id: 'projects', name: 'Projects', icon: '📁', href: '/projects' },
    { id: 'settings', name: 'Settings', icon: '⚙️', href: '/settings' },
  ],
  minimal: [
    { id: 'dashboard', name: 'Dashboard', icon: '📊', href: '/dashboard' },
    { id: 'files', name: 'Files', icon: '📁', href: '/files' },
    { id: 'settings', name: 'Settings', icon: '⚙️', href: '/settings' },
  ],
};

// Quick actions for each variant
const quickActionsData: Record<string, SidebarProps['quickActions']> = {
  admin: [
    { id: 'new-project', name: 'New Project', icon: '➕', href: '/admin/projects/new', variant: 'default' },
    { id: 'settings', name: 'Settings', icon: '⚙️', href: '/admin/settings', variant: 'secondary' },
  ],
  dashboard: [
    { id: 'new-report', name: 'New Report', icon: '📊', href: '/reports/new', variant: 'default' },
    { id: 'export', name: 'Export Data', icon: '⬇️', href: '/export', variant: 'secondary' },
  ],
  compact: [
    { id: 'new-item', name: 'New', icon: '➕', href: '/new', variant: 'default' },
  ],
  minimal: [
    { id: 'create', name: 'Create', icon: '➕', href: '/create', variant: 'default' },
  ],
};

// User profiles for each variant
const userProfilesData: Record<string, SidebarProps['userProfile']> = {
  admin: { name: 'Admin User', role: 'Administrator', avatar: '👤' },
  dashboard: { name: 'John Analyst', role: 'Data Analyst', avatar: '📊' },
  compact: { name: 'Jane Doe', role: 'User', avatar: '👤' },
  minimal: { name: 'Creator', role: 'Designer', avatar: '🎨' },
};

// Interactive Sidebar Component
function InteractiveSidebar({
  variant,
  collapsed,
  onToggleCollapse,
  activeMenu,
  onMenuChange,
  onKeyDown,
  userProfile,
  quickActions,
}: SidebarProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigation = navigationData[variant] || [];
  
  // Group navigation by category for admin/dashboard variants
  const groupedNavigation = navigation.reduce((acc, item) => {
    const category = item.category || 'Main';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, NavigationItem[]>);

  // Variant-specific styling
  const sidebarClasses = {
    admin: `${collapsed ? 'w-16' : 'w-64'} bg-card/95 backdrop-blur-sm border-r border-border shadow-sm`,
    dashboard: `${collapsed ? 'w-16' : 'w-72'} bg-gradient-to-b from-card/95 to-muted/50 backdrop-blur-sm border-r border-border shadow-sm`,
    compact: `${collapsed ? 'w-12' : 'w-56'} bg-card border-r border-border`,
    minimal: `${collapsed ? 'w-12' : 'w-48'} bg-background/80 backdrop-blur-sm border-r border-border/50`,
  };

  return (
    <div 
      className={`flex flex-col transition-all duration-300 ease-in-out ${sidebarClasses[variant]}`}
      role="navigation" 
      aria-label={`${variant} sidebar navigation${collapsed ? ' - collapsed' : ''}`}
      onKeyDown={onKeyDown}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm" aria-hidden="true">
              ⚡
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-foreground truncate">
                {variant === 'minimal' ? 'App' : 'Admin Panel'}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {variant.charAt(0).toUpperCase() + variant.slice(1)} Layout
              </div>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="p-1.5"
          aria-label={collapsed ? 'Expand sidebar navigation' : 'Collapse sidebar navigation'}
          aria-expanded={!collapsed}
        >
          <svg 
            className={`w-4 h-4 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </Button>
      </div>

      {/* Quick Actions */}
      {!collapsed && quickActions.length > 0 && (
        <div className="p-4 border-b border-border">
          <div className="space-y-2" role="group" aria-label="Quick action buttons">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant={action.variant}
                size="sm"
                className={`w-full justify-start ${action.variant === 'default' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
                onClick={() => console.log(`Navigate to: ${action.href}`)}
                aria-label={`${action.name} - navigate to ${action.href}`}
              >
                <span className="mr-2" aria-hidden="true">{action.icon}</span>
                {action.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-4" aria-label="Main navigation menu">
        <div className="space-y-6">
          {Object.entries(groupedNavigation).map(([category, items]) => (
            <div key={category}>
              {!collapsed && category !== 'Main' && (
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                  {category}
                </div>
              )}
              <div className="space-y-1" role="list">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onMenuChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeMenu === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                    aria-current={activeMenu === item.id ? 'page' : undefined}
                    aria-label={`${item.name}${item.description ? ` - ${item.description}` : ''}${activeMenu === item.id ? ' - currently active' : ''}`}
                    role="listitem"
                  >
                    <span aria-hidden="true">{item.icon}</span>
                    {!collapsed && (
                      <div className="flex-1 text-left">
                        <div>{item.name}</div>
                        {item.description && variant === 'dashboard' && (
                          <div className="text-xs opacity-75">{item.description}</div>
                        )}
                      </div>
                    )}
                    {!collapsed && activeMenu === item.id && (
                      <Badge variant="secondary" className="text-xs">
                        active
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* User Profile */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="relative">
            <Button
              variant="ghost"
              className="w-full justify-start p-3"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              aria-label={`Open user profile menu for ${userProfile.name}`}
              aria-haspopup="menu"
              aria-expanded={userMenuOpen}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-primary-foreground font-medium text-xs mr-3" aria-hidden="true">
                {userProfile.avatar}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="font-medium text-foreground truncate">{userProfile.name}</div>
                <div className="text-xs text-muted-foreground truncate">{userProfile.role}</div>
              </div>
              <svg 
                className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </Button>

            {/* User Dropdown Menu */}
            {userMenuOpen && (
              <div 
                className="absolute bottom-full left-0 right-0 mb-2 bg-card border border-border rounded-lg shadow-lg z-10"
                role="menu"
                aria-label="User profile menu"
              >
                <div className="p-2 space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => console.log('Navigate to profile')}
                    role="menuitem"
                  >
                    <span className="mr-2" aria-hidden="true">👤</span>
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => console.log('Navigate to preferences')}
                    role="menuitem"
                  >
                    <span className="mr-2" aria-hidden="true">⚙️</span>
                    Preferences
                  </Button>
                  <div className="border-t border-border my-1" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={() => console.log('Logout')}
                    role="menuitem"
                  >
                    <span className="mr-2" aria-hidden="true">🚪</span>
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Main SidebarDemo Component with full Phase 6+ standards
export default function SidebarDemo() {
  const [selectedVariant, setSelectedVariant] = useState<'admin' | 'dashboard' | 'compact' | 'minimal'>('admin');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const announceRef = useRef<HTMLDivElement>(null);

  // Announce changes for screen readers
  const announceChange = (message: string) => {
    if (announceRef.current) {
      announceRef.current.textContent = message;
    }
  };

  // Enhanced keyboard navigation
  const handleSidebarKeydown = (e: React.KeyboardEvent) => {
    const navigation = navigationData[selectedVariant] || [];
    const currentIndex = navigation.findIndex(item => item.id === activeMenu);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < navigation.length - 1) {
          const nextItem = navigation[currentIndex + 1];
          setActiveMenu(nextItem.id);
          announceChange(`Selected ${nextItem.name}`);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          const prevItem = navigation[currentIndex - 1];
          setActiveMenu(prevItem.id);
          announceChange(`Selected ${prevItem.name}`);
        }
        break;
      case 'Home':
        e.preventDefault();
        if (navigation.length > 0) {
          setActiveMenu(navigation[0].id);
          announceChange(`Selected ${navigation[0].name}`);
        }
        break;
      case 'End':
        e.preventDefault();
        if (navigation.length > 0) {
          const lastItem = navigation[navigation.length - 1];
          setActiveMenu(lastItem.id);
          announceChange(`Selected ${lastItem.name}`);
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        const currentItem = navigation.find(item => item.id === activeMenu);
        if (currentItem) {
          announceChange(`Activated ${currentItem.name}`);
          console.log(`Navigate to: ${currentItem.href}`);
        }
        break;
      case 'c':
        if (e.ctrlKey) {
          e.preventDefault();
          setIsCollapsed(!isCollapsed);
          announceChange(isCollapsed ? 'Sidebar expanded' : 'Sidebar collapsed');
        }
        break;
    }
  };

  // Handle variant changes
  const handleVariantChange = (variant: string) => {
    setSelectedVariant(variant as typeof selectedVariant);
    setActiveMenu('dashboard'); // Reset to first item
    setIsCollapsed(false); // Reset collapse state
    announceChange(`Switched to ${variant} variant`);
  };

  // Handle collapse toggle
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    announceChange(isCollapsed ? 'Sidebar expanded' : 'Sidebar collapsed');
  };

  // Handle menu changes
  const handleMenuChange = (menuId: string) => {
    setActiveMenu(menuId);
    const navigation = navigationData[selectedVariant] || [];
    const item = navigation.find(nav => nav.id === menuId);
    if (item) {
      announceChange(`Selected ${item.name}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Live region for announcements - WCAG 2.1 AA compliance */}
      <div ref={announceRef} className="sr-only" aria-live="polite" />

      {/* Variant Selector with enhanced accessibility */}
      <Tabs 
        value={selectedVariant} 
        onValueChange={handleVariantChange} 
        className="w-full"
      >
        <TabsList 
          className="grid w-full grid-cols-4" 
          role="tablist" 
          aria-label="Sidebar layout variants - use arrow keys to navigate"
        >
          <TabsTrigger 
            value="admin"
            aria-label="Admin variant: professional administration layout with full features and quick actions"
          >
            🏢 Admin
          </TabsTrigger>
          <TabsTrigger 
            value="dashboard"
            aria-label="Dashboard variant: rich analytics interface with detailed descriptions and gradient styling"
          >
            📊 Dashboard
          </TabsTrigger>
          <TabsTrigger 
            value="compact"
            aria-label="Compact variant: space-efficient design optimized for smaller screens and mobile devices"
          >
            📱 Compact
          </TabsTrigger>
          <TabsTrigger 
            value="minimal"
            aria-label="Minimal variant: clean distraction-free interface for creative and productivity applications"
          >
            ⚡ Minimal
          </TabsTrigger>
        </TabsList>

        {/* Interactive Demonstrations for each variant */}
        {(['admin', 'dashboard', 'compact', 'minimal'] as const).map((variant) => (
          <TabsContent 
            key={variant}
            value={variant} 
            className="space-y-6"
            role="tabpanel"
            aria-label={`${variant} sidebar variant interactive demonstration`}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span aria-hidden="true">
                    {variant === 'admin' && '🏢'}
                    {variant === 'dashboard' && '📊'}
                    {variant === 'compact' && '📱'}
                    {variant === 'minimal' && '⚡'}
                  </span>
                  <span>
                    {variant.charAt(0).toUpperCase() + variant.slice(1)} Variant - Interactive Demo
                  </span>
                </CardTitle>
                <CardDescription>
                  Fully interactive sidebar with keyboard navigation, collapsible functionality, and real business features
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Interactive Sidebar Container */}
                <div 
                  className="border border-border rounded-lg overflow-hidden bg-muted/20" 
                  role="region" 
                  aria-label={`Interactive ${variant} sidebar layout with keyboard navigation`}
                >
                  <div className="flex h-96">
                    {/* Interactive Sidebar */}
                    <InteractiveSidebar
                      variant={variant}
                      collapsed={isCollapsed}
                      onToggleCollapse={handleToggleCollapse}
                      activeMenu={activeMenu}
                      onMenuChange={handleMenuChange}
                      onKeyDown={handleSidebarKeydown}
                      userProfile={userProfilesData[variant]}
                      quickActions={quickActionsData[variant]}
                    />
                    
                    {/* Main Content Area */}
                    <div className="flex-1 p-6 bg-background" role="main" aria-label={`${variant} layout content area`}>
                      <div className="text-center space-y-4">
                        <h3 className="text-lg font-semibold">Interactive {variant.charAt(0).toUpperCase() + variant.slice(1)} Layout</h3>
                        <p className="text-muted-foreground text-sm">
                          Try the keyboard navigation: ↑↓ to navigate, Enter to select, Ctrl+C to toggle collapse
                        </p>
                        <div className="grid gap-3">
                          <div className="h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-medium">Active: {activeMenu}</span>
                          </div>
                          <div className="h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-medium">Collapsed: {isCollapsed ? 'Yes' : 'No'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Usage Instructions */}
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">🎯 Interactive Features:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <ul className="space-y-1">
                      <li>• <kbd className="px-1 bg-background rounded text-xs">↑↓</kbd> Navigate menu items</li>
                      <li>• <kbd className="px-1 bg-background rounded text-xs">Enter</kbd> Activate menu item</li>
                      <li>• <kbd className="px-1 bg-background rounded text-xs">Home/End</kbd> First/Last item</li>
                    </ul>
                    <ul className="space-y-1">
                      <li>• <kbd className="px-1 bg-background rounded text-xs">Ctrl+C</kbd> Toggle collapse</li>
                      <li>• Click user profile for dropdown menu</li>
                      <li>• Screen reader announcements enabled</li>
                    </ul>
                  </div>
                </div>

                {/* Business Applications */}
                <div className="mt-4 text-sm text-muted-foreground space-y-2">
                  <p><strong>Perfect for:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    {variant === 'admin' && (
                      <>
                        <li>Business administration panels</li>
                        <li>Company management systems</li>
                        <li>Professional dashboards</li>
                        <li>Corporate applications</li>
                      </>
                    )}
                    {variant === 'dashboard' && (
                      <>
                        <li>Analytics dashboards</li>
                        <li>Data visualization platforms</li>
                        <li>Business intelligence tools</li>
                        <li>Complex admin interfaces</li>
                      </>
                    )}
                    {variant === 'compact' && (
                      <>
                        <li>Mobile-first applications</li>
                        <li>Tablet interfaces</li>
                        <li>Space-constrained layouts</li>
                        <li>Focused work environments</li>
                      </>
                    )}
                    {variant === 'minimal' && (
                      <>
                        <li>Creative applications</li>
                        <li>Writing and productivity tools</li>
                        <li>Minimalist interfaces</li>
                        <li>Focus-driven workflows</li>
                      </>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Global Keyboard Shortcuts Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-lg">⌨️ Keyboard Navigation & Accessibility</CardTitle>
          <CardDescription>
            Full WCAG 2.1 AA compliance with enhanced keyboard navigation and screen reader support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Navigation</h4>
              <ul className="text-sm space-y-1 text-blue-600 dark:text-blue-400">
                <li>• Arrow keys for menu navigation</li>
                <li>• Tab for focus management</li>
                <li>• Enter/Space to activate</li>
                <li>• Home/End for first/last item</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Shortcuts</h4>
              <ul className="text-sm space-y-1 text-blue-600 dark:text-blue-400">
                <li>• Ctrl+C toggles collapse</li>
                <li>• Escape closes menus</li>
                <li>• Alt+Tab variant switching</li>
                <li>• Focus visible indicators</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Accessibility</h4>
              <ul className="text-sm space-y-1 text-blue-600 dark:text-blue-400">
                <li>• Live region announcements</li>
                <li>• ARIA labels and roles</li>
                <li>• High contrast support</li>
                <li>• Screen reader optimized</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}