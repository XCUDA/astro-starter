// SidebarDemo.tsx - Interactive Sidebar Demonstrations Component
// Solves React context issues with Tabs in Astro
// Path: src/components/islands/SidebarDemo.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SidebarDemo() {
  return (
    <Tabs defaultValue="admin" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="admin">Admin</TabsTrigger>
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="compact">Compact</TabsTrigger>
        <TabsTrigger value="minimal">Minimal</TabsTrigger>
      </TabsList>
      
      {/* Admin Variant Demo */}
      <TabsContent value="admin" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🏢</span>
              <span>Admin Variant - Professional Administration</span>
            </CardTitle>
            <CardDescription>
              Balanced design for business administration with professional styling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border border-border rounded-lg overflow-hidden">
              {/* Static Admin Sidebar Demo */}
              <div className="flex h-96 bg-muted/30">
                {/* Simulated Sidebar */}
                <div className="w-64 bg-card/95 backdrop-blur-sm border-r border-border flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
                        ⚡
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground truncate">Admin Panel</div>
                        <div className="text-xs text-muted-foreground truncate">Admin Layout</div>
                      </div>
                    </div>
                    <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="p-4 border-b border-border">
                    <div className="space-y-2">
                      <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground">
                        <span>➕</span><span>New Project</span>
                      </a>
                      <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:text-foreground">
                        <span>⚙️</span><span>Settings</span>
                      </a>
                    </div>
                  </div>
                  
                  {/* Navigation */}
                  <nav className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-6">
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Dashboard</div>
                        <div className="space-y-1">
                          <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground">
                            <span>📊</span><span>Dashboard</span><span className="text-xs bg-primary-foreground/20 px-1.5 py-0.5 rounded ml-auto">active</span>
                          </a>
                          <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50">
                            <span>📈</span><span>Analytics</span>
                          </a>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Content</div>
                        <div className="space-y-1">
                          <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50">
                            <span>📁</span><span>Projects</span>
                          </a>
                          <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50">
                            <span>👥</span><span>Users</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </nav>
                  
                  {/* User Profile */}
                  <div className="p-4 border-t border-border">
                    <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-sm hover:bg-muted/50">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-primary-foreground font-medium text-xs">👤</div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="font-medium text-foreground truncate">Admin User</div>
                        <div className="text-xs text-muted-foreground truncate">Administrator</div>
                      </div>
                      <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Main Content Area */}
                <div className="flex-1 p-6">
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
              <ul className="list-disc list-inside space-y-1">
                <li>Business administration panels</li>
                <li>Company management systems</li>
                <li>Professional dashboards</li>
                <li>Corporate applications</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Dashboard Variant Demo */}
      <TabsContent value="dashboard" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>📊</span>
              <span>Dashboard Variant - Rich Analytics Interface</span>
            </CardTitle>
            <CardDescription>
              Enhanced dashboard with detailed descriptions and gradient styling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border border-border rounded-lg overflow-hidden">
              {/* Static Dashboard Sidebar Demo */}
              <div className="flex h-96 bg-muted/30">
                {/* Simulated Sidebar */}
                <div className="w-72 bg-gradient-to-b from-card/95 to-muted/50 backdrop-blur-sm border-r border-border shadow-sm flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
                        ⚡
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground truncate">Admin Panel</div>
                        <div className="text-xs text-muted-foreground truncate">Dashboard Layout</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation with descriptions */}
                  <nav className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-6">
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Dashboard</div>
                        <div className="space-y-1">
                          <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground">
                            <span>📊</span>
                            <div className="flex-1">
                              <div>Dashboard</div>
                              <div className="text-xs opacity-75">Overview and analytics</div>
                            </div>
                          </a>
                          <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50">
                            <span>📈</span>
                            <div className="flex-1">
                              <div>Analytics</div>
                              <div className="text-xs opacity-75">Performance metrics</div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Content</div>
                        <div className="space-y-1">
                          <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50">
                            <span>📁</span>
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
                <div className="flex-1 p-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Dashboard Content</h3>
                    <p className="text-muted-foreground text-sm">Rich dashboard interface with detailed analytics</p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-sm">Analytics Card</span>
                      </div>
                      <div className="h-16 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <span className="text-sm">Metrics Card</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground space-y-2">
              <p><strong>Ideal for:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Analytics dashboards</li>
                <li>Data visualization platforms</li>
                <li>Business intelligence tools</li>
                <li>Complex admin interfaces</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Compact Variant Demo */}
      <TabsContent value="compact" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>📱</span>
              <span>Compact Variant - Space-Efficient Design</span>
            </CardTitle>
            <CardDescription>
              Optimized for smaller screens and space-constrained layouts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border border-border rounded-lg overflow-hidden">
              {/* Static Compact Sidebar Demo */}
              <div className="flex h-96 bg-muted/30">
                {/* Simulated Sidebar */}
                <div className="w-56 bg-card border-r border-border flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between p-3 border-b border-border">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xs">
                        ⚡
                      </div>
                      <div className="text-sm font-semibold text-foreground">Panel</div>
                    </div>
                  </div>
                  
                  {/* Compact Navigation */}
                  <nav className="flex-1 overflow-y-auto p-3">
                    <div className="space-y-4">
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">Main</div>
                        <div className="space-y-1">
                          <a href="#" className="flex items-center space-x-2 px-2 py-2 rounded text-sm font-medium bg-primary text-primary-foreground">
                            <span>📊</span><span>Dashboard</span>
                          </a>
                          <a href="#" className="flex items-center space-x-2 px-2 py-2 rounded text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50">
                            <span>📁</span><span>Projects</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>
                
                {/* Main Content Area */}
                <div className="flex-1 p-6">
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
              <ul className="list-disc list-inside space-y-1">
                <li>Mobile-first applications</li>
                <li>Tablet interfaces</li>
                <li>Space-constrained layouts</li>
                <li>Focused work environments</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Minimal Variant Demo */}
      <TabsContent value="minimal" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>⚡</span>
              <span>Minimal Variant - Clean & Distraction-Free</span>
            </CardTitle>
            <CardDescription>
              Ultra-clean design for applications requiring maximum focus
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border border-border rounded-lg overflow-hidden">
              {/* Static Minimal Sidebar Demo */}
              <div className="flex h-96 bg-muted/30">
                {/* Simulated Sidebar */}
                <div className="w-48 bg-background/80 backdrop-blur-sm border-r border-border/50 flex flex-col">
                  {/* Header */}
                  <div className="flex items-center p-3 border-b border-border/50">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/70 rounded-md flex items-center justify-center text-primary-foreground font-bold text-xs">
                        ⚡
                      </div>
                      <div className="text-sm font-medium text-foreground">App</div>
                    </div>
                  </div>
                  
                  {/* Minimal Navigation */}
                  <nav className="flex-1 overflow-y-auto p-3">
                    <div className="space-y-1">
                      <a href="#" className="flex items-center space-x-2 px-2 py-2 rounded text-sm bg-primary text-primary-foreground">
                        <span>📊</span><span>Dashboard</span>
                      </a>
                      <a href="#" className="flex items-center space-x-2 px-2 py-2 rounded text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30">
                        <span>📁</span><span>Files</span>
                      </a>
                      <a href="#" className="flex items-center space-x-2 px-2 py-2 rounded text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30">
                        <span>⚙️</span><span>Settings</span>
                      </a>
                    </div>
                  </nav>
                </div>
                
                {/* Main Content Area */}
                <div className="flex-1 p-6">
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
              <ul className="list-disc list-inside space-y-1">
                <li>Creative applications</li>
                <li>Writing and productivity tools</li>
                <li>Minimalist interfaces</li>
                <li>Focus-driven workflows</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}