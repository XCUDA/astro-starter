// SidebarDemo.tsx - Interactive Sidebar Demonstrations Component
// Solves React context issues with Tabs in Astro
// Path: src/components/islands/SidebarDemo.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SidebarDemo() {
  return (
    <Tabs defaultValue="admin" className="w-full">
      <TabsList className="grid w-full grid-cols-4" role="tablist" aria-label="Sidebar layout variants">
        <TabsTrigger 
          value="admin"
          aria-label="Admin variant: professional administration layout with full features"
        >
          Admin
        </TabsTrigger>
        <TabsTrigger 
          value="dashboard"
          aria-label="Dashboard variant: rich analytics interface with detailed descriptions"
        >
          Dashboard
        </TabsTrigger>
        <TabsTrigger 
          value="compact"
          aria-label="Compact variant: space-efficient design for smaller screens"
        >
          Compact
        </TabsTrigger>
        <TabsTrigger 
          value="minimal"
          aria-label="Minimal variant: clean distraction-free interface for focus"
        >
          Minimal
        </TabsTrigger>
      </TabsList>
      
      {/* Admin Variant Demo */}
      <TabsContent 
        value="admin" 
        className="space-y-6"
        role="tabpanel"
        aria-label="Admin sidebar variant demonstration"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span aria-hidden="true">🏢</span>
              <span>Admin Variant - Professional Administration</span>
            </CardTitle>
            <CardDescription>
              Balanced design for business administration with professional styling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border border-border rounded-lg overflow-hidden" role="region" aria-label="Admin sidebar layout preview">
              {/* Static Admin Sidebar Demo */}
              <div className="flex h-96 bg-muted/30">
                {/* Simulated Sidebar */}
                <div className="w-64 bg-card/95 backdrop-blur-sm border-r border-border flex flex-col" role="navigation" aria-label="Admin panel navigation">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm" aria-hidden="true">
                        ⚡
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground truncate">Admin Panel</div>
                        <div className="text-xs text-muted-foreground truncate">Admin Layout</div>
                      </div>
                    </div>
                    <button 
                      className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      aria-label="Collapse sidebar navigation"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="p-4 border-b border-border">
                    <div className="space-y-2" role="group" aria-label="Quick action buttons">
                      <a 
                        href="#" 
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground"
                        aria-label="Create new project"
                      >
                        <span aria-hidden="true">➕</span><span>New Project</span>
                      </a>
                      <a 
                        href="#" 
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:text-foreground"
                        aria-label="Open application settings"
                      >
                        <span aria-hidden="true">⚙️</span><span>Settings</span>
                      </a>
                    </div>
                  </div>
                  
                  {/* Navigation */}
                  <nav className="flex-1 overflow-y-auto p-4" aria-label="Main navigation menu">
                    <div className="space-y-6">
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Dashboard</div>
                        <div className="space-y-1" role="list">
                          <a 
                            href="#" 
                            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground"
                            aria-current="page"
                            aria-label="Dashboard - currently active page"
                            role="listitem"
                          >
                            <span aria-hidden="true">📊</span>
                            <span>Dashboard</span>
                            <span className="text-xs bg-primary-foreground/20 px-1.5 py-0.5 rounded ml-auto" aria-label="active page indicator">active</span>
                          </a>
                          <a 
                            href="#" 
                            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            aria-label="View analytics and performance metrics"
                            role="listitem"
                          >
                            <span aria-hidden="true">📈</span><span>Analytics</span>
                          </a>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Content</div>
                        <div className="space-y-1" role="list">
                          <a 
                            href="#" 
                            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            aria-label="Manage projects and files"
                            role="listitem"
                          >
                            <span aria-hidden="true">📁</span><span>Projects</span>
                          </a>
                          <a 
                            href="#" 
                            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            aria-label="Manage users and permissions"
                            role="listitem"
                          >
                            <span aria-hidden="true">👥</span><span>Users</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </nav>
                  
                  {/* User Profile */}
                  <div className="p-4 border-t border-border">
                    <button 
                      className="w-full flex items-center space-x-3 p-3 rounded-lg text-sm hover:bg-muted/50"
                      aria-label="Open user profile menu for Admin User"
                      aria-haspopup="menu"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-primary-foreground font-medium text-xs" aria-hidden="true">👤</div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="font-medium text-foreground truncate">Admin User</div>
                        <div className="text-xs text-muted-foreground truncate">Administrator</div>
                      </div>
                      <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Main Content Area */}
                <div className="flex-1 p-6" role="main" aria-label="Main content area">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Main Content Area</h3>
                    <p className="text-muted-foreground text-sm">This is where your page content would appear</p>
                    <div className="mt-4 h-32 bg-muted/50 rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">Content goes here</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground space-y-2">
              <p><strong>Perfect for:</strong></p>
              <ul className="list-disc list-inside space-y-1" role="list">
                <li role="listitem">Business administration panels</li>
                <li role="listitem">Company management systems</li>
                <li role="listitem">Professional dashboards</li>
                <li role="listitem">Corporate applications</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Dashboard Variant Demo */}
      <TabsContent 
        value="dashboard" 
        className="space-y-6"
        role="tabpanel"
        aria-label="Dashboard sidebar variant demonstration"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span aria-hidden="true">📊</span>
              <span>Dashboard Variant - Rich Analytics Interface</span>
            </CardTitle>
            <CardDescription>
              Enhanced dashboard with detailed descriptions and gradient styling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border border-border rounded-lg overflow-hidden" role="region" aria-label="Dashboard sidebar layout preview">
              {/* Static Dashboard Sidebar Demo */}
              <div className="flex h-96 bg-muted/30">
                {/* Simulated Sidebar */}
                <div className="w-72 bg-gradient-to-b from-card/95 to-muted/50 backdrop-blur-sm border-r border-border shadow-sm flex flex-col" role="navigation" aria-label="Dashboard navigation with detailed descriptions">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm" aria-hidden="true">
                        ⚡
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground truncate">Admin Panel</div>
                        <div className="text-xs text-muted-foreground truncate">Dashboard Layout</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation with descriptions */}
                  <nav className="flex-1 overflow-y-auto p-4" aria-label="Enhanced navigation with descriptions">
                    <div className="space-y-6">
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Dashboard</div>
                        <div className="space-y-1" role="list">
                          <a 
                            href="#" 
                            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground"
                            aria-current="page"
                            aria-label="Dashboard overview and analytics - currently active"
                            role="listitem"
                          >
                            <span aria-hidden="true">📊</span>
                            <div className="flex-1">
                              <div>Dashboard</div>
                              <div className="text-xs opacity-75">Overview and analytics</div>
                            </div>
                          </a>
                          <a 
                            href="#" 
                            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            aria-label="Analytics page - performance metrics and detailed reports"
                            role="listitem"
                          >
                            <span aria-hidden="true">📈</span>
                            <div className="flex-1">
                              <div>Analytics</div>
                              <div className="text-xs opacity-75">Performance metrics</div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Content</div>
                        <div className="space-y-1" role="list">
                          <a 
                            href="#" 
                            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            aria-label="Projects page - manage your projects and collaborations"
                            role="listitem"
                          >
                            <span aria-hidden="true">📁</span>
                            <div className="flex-1">
                              <div>Projects</div>
                              <div className="text-xs opacity-75">Manage your projects</div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>
                
                {/* Main Content Area */}
                <div className="flex-1 p-6" role="main" aria-label="Dashboard content area">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Dashboard Content</h3>
                    <p className="text-muted-foreground text-sm">Rich dashboard interface with detailed analytics</p>
                    <div className="mt-4 grid grid-cols-2 gap-4" role="list" aria-label="Dashboard widgets">
                      <div className="h-16 bg-primary/10 rounded-lg flex items-center justify-center" role="listitem">
                        <span className="text-sm">Analytics Card</span>
                      </div>
                      <div className="h-16 bg-secondary/10 rounded-lg flex items-center justify-center" role="listitem">
                        <span className="text-sm">Metrics Card</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground space-y-2">
              <p><strong>Ideal for:</strong></p>
              <ul className="list-disc list-inside space-y-1" role="list">
                <li role="listitem">Analytics dashboards</li>
                <li role="listitem">Data visualization platforms</li>
                <li role="listitem">Business intelligence tools</li>
                <li role="listitem">Complex admin interfaces</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Compact Variant Demo */}
      <TabsContent 
        value="compact" 
        className="space-y-6"
        role="tabpanel"
        aria-label="Compact sidebar variant demonstration"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span aria-hidden="true">📱</span>
              <span>Compact Variant - Space-Efficient Design</span>
            </CardTitle>
            <CardDescription>
              Optimized for smaller screens and space-constrained layouts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border border-border rounded-lg overflow-hidden" role="region" aria-label="Compact sidebar layout preview">
              {/* Static Compact Sidebar Demo */}
              <div className="flex h-96 bg-muted/30">
                {/* Simulated Sidebar */}
                <div className="w-56 bg-card border-r border-border flex flex-col" role="navigation" aria-label="Compact navigation for space efficiency">
                  {/* Header */}
                  <div className="flex items-center justify-between p-3 border-b border-border">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xs" aria-hidden="true">
                        ⚡
                      </div>
                      <div className="text-sm font-semibold text-foreground">Panel</div>
                    </div>
                  </div>
                  
                  {/* Compact Navigation */}
                  <nav className="flex-1 overflow-y-auto p-3" aria-label="Compact navigation menu">
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">Main</div>
                        <div className="space-y-1" role="list">
                          <a 
                            href="#" 
                            className="flex items-center space-x-2 px-2 py-2 rounded text-sm font-medium bg-primary text-primary-foreground"
                            aria-current="page"
                            aria-label="Dashboard - currently active page in compact layout"
                            role="listitem"
                          >
                            <span aria-hidden="true">📊</span><span>Dashboard</span>
                          </a>
                          <a 
                            href="#" 
                            className="flex items-center space-x-2 px-2 py-2 rounded text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            aria-label="Projects page in compact layout"
                            role="listitem"
                          >
                            <span aria-hidden="true">📁</span><span>Projects</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>
                
                {/* Main Content Area */}
                <div className="flex-1 p-6" role="main" aria-label="Compact layout content area">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Compact Layout</h3>
                    <p className="text-muted-foreground text-sm">Efficient use of space for smaller screens</p>
                    <div className="mt-4 h-32 bg-muted/50 rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">More space for content</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground space-y-2">
              <p><strong>Best for:</strong></p>
              <ul className="list-disc list-inside space-y-1" role="list">
                <li role="listitem">Mobile-first applications</li>
                <li role="listitem">Tablet interfaces</li>
                <li role="listitem">Space-constrained layouts</li>
                <li role="listitem">Focused work environments</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Minimal Variant Demo */}
      <TabsContent 
        value="minimal" 
        className="space-y-6"
        role="tabpanel"
        aria-label="Minimal sidebar variant demonstration"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span aria-hidden="true">⚡</span>
              <span>Minimal Variant - Clean & Distraction-Free</span>
            </CardTitle>
            <CardDescription>
              Ultra-clean design for applications requiring maximum focus
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border border-border rounded-lg overflow-hidden" role="region" aria-label="Minimal sidebar layout preview">
              {/* Static Minimal Sidebar Demo */}
              <div className="flex h-96 bg-muted/30">
                {/* Simulated Sidebar */}
                <div className="w-48 bg-background/80 backdrop-blur-sm border-r border-border/50 flex flex-col" role="navigation" aria-label="Minimal navigation for distraction-free focus">
                  {/* Header */}
                  <div className="flex items-center p-3 border-b border-border/50">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/70 rounded-md flex items-center justify-center text-primary-foreground font-bold text-xs" aria-hidden="true">
                        ⚡
                      </div>
                      <div className="text-sm font-medium text-foreground">App</div>
                    </div>
                  </div>
                  
                  {/* Minimal Navigation */}
                  <nav className="flex-1 overflow-y-auto p-3" aria-label="Minimal navigation menu">
                    <div className="space-y-1" role="list">
                      <a 
                        href="#" 
                        className="flex items-center space-x-2 px-2 py-2 rounded text-sm bg-primary text-primary-foreground"
                        aria-current="page"
                        aria-label="Dashboard - currently active page in minimal layout"
                        role="listitem"
                      >
                        <span aria-hidden="true">📊</span><span>Dashboard</span>
                      </a>
                      <a 
                        href="#" 
                        className="flex items-center space-x-2 px-2 py-2 rounded text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        aria-label="Files page in minimal layout"
                        role="listitem"
                      >
                        <span aria-hidden="true">📁</span><span>Files</span>
                      </a>
                      <a 
                        href="#" 
                        className="flex items-center space-x-2 px-2 py-2 rounded text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        aria-label="Settings page in minimal layout"
                        role="listitem"
                      >
                        <span aria-hidden="true">⚙️</span><span>Settings</span>
                      </a>
                    </div>
                  </nav>
                </div>
                
                {/* Main Content Area */}
                <div className="flex-1 p-6" role="main" aria-label="Minimal layout content area">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Minimal Interface</h3>
                    <p className="text-muted-foreground text-sm">Clean, distraction-free workspace</p>
                    <div className="mt-4 h-32 bg-muted/30 rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">Focus on content</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground space-y-2">
              <p><strong>Perfect for:</strong></p>
              <ul className="list-disc list-inside space-y-1" role="list">
                <li role="listitem">Creative applications</li>
                <li role="listitem">Writing and productivity tools</li>
                <li role="listitem">Minimalist interfaces</li>
                <li role="listitem">Focus-driven workflows</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}