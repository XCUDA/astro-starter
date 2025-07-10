// NavigationShowcaseDemo.tsx - Interactive demo for Navigation & Feedback components
// Path: /src/components/islands/NavigationShowcaseDemo.tsx

import React, { useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type DemoType = 'breadcrumb' | 'tabs' | 'alert' | 'badge' | 'combined';
type AlertType = 'default' | 'destructive';

export default function NavigationShowcaseDemo() {
  const [activeDemo, setActiveDemo] = useState<DemoType>('combined');
  const [currentPage, setCurrentPage] = useState('products');
  const [alertType, setAlertType] = useState<AlertType>('default');
  const [notificationCount, setNotificationCount] = useState(3);
  const [orderStatus, setOrderStatus] = useState('processing');

  const demoTabs = [
    { id: 'combined' as DemoType, label: 'All Combined', icon: '🧭' },
    { id: 'breadcrumb' as DemoType, label: 'Breadcrumb', icon: '🗂️' },
    { id: 'tabs' as DemoType, label: 'Tabs', icon: '📑' },
    { id: 'alert' as DemoType, label: 'Alert', icon: '⚠️' },
    { id: 'badge' as DemoType, label: 'Badge', icon: '🏷️' }
  ];

  const BreadcrumbDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🗂️</span>
          Breadcrumb Navigation
        </CardTitle>
        <CardDescription>
          Hierarchical navigation showing user's current location
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* E-commerce Example */}
        <div>
          <h4 className="font-semibold mb-3">E-commerce Site Navigation:</h4>
          <div className="bg-muted/30 p-4 rounded-lg">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/electronics">Electronics</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/electronics/laptops">Laptops</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>MacBook Pro 16"</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Admin Dashboard Example */}
        <div>
          <h4 className="font-semibold mb-3">Admin Dashboard Navigation:</h4>
          <div className="bg-muted/30 p-4 rounded-lg">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/users">User Management</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/users/roles">Roles & Permissions</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Edit Role</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Interactive Example */}
        <div>
          <h4 className="font-semibold mb-3">Interactive Navigation:</h4>
          <div className="flex gap-2 mb-3">
            <Button 
              size="sm" 
              variant={currentPage === 'home' ? 'default' : 'outline'}
              onClick={() => setCurrentPage('home')}
            >
              Home
            </Button>
            <Button 
              size="sm" 
              variant={currentPage === 'products' ? 'default' : 'outline'}
              onClick={() => setCurrentPage('products')}
            >
              Products
            </Button>
            <Button 
              size="sm" 
              variant={currentPage === 'details' ? 'default' : 'outline'}
              onClick={() => setCurrentPage('details')}
            >
              Details
            </Button>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {currentPage !== 'home' && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {currentPage === 'products' ? (
                        <BreadcrumbPage>Products</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </>
                )}
                {currentPage === 'details' && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Product Details</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TabsDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📑</span>
          Tabs Navigation
        </CardTitle>
        <CardDescription>
          Organize content into logical sections with tab navigation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Product Information Tabs */}
        <div>
          <h4 className="font-semibold mb-3">Product Information Tabs:</h4>
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-4 border rounded-md bg-muted/20">
              <h5 className="font-semibold mb-2">Product Description</h5>
              <p className="text-sm text-muted-foreground">
                Detailed product description with features, benefits, and use cases. 
                Perfect for e-commerce product pages where customers need comprehensive information.
              </p>
            </TabsContent>
            <TabsContent value="specifications" className="p-4 border rounded-md bg-muted/20">
              <h5 className="font-semibold mb-2">Technical Specifications</h5>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><strong>Dimensions:</strong> 35.79 x 24.59 x 1.68 cm</div>
                <div><strong>Weight:</strong> 2.15 kg</div>
                <div><strong>Display:</strong> 16.2" Liquid Retina XDR</div>
                <div><strong>Processor:</strong> Apple M3 Pro chip</div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-4 border rounded-md bg-muted/20">
              <h5 className="font-semibold mb-2">Customer Reviews</h5>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">⭐⭐⭐⭐⭐</span>
                  <span className="text-sm font-medium">4.8/5</span>
                  <span className="text-xs text-muted-foreground">(247 reviews)</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Excellent performance and build quality. Highly recommended for professional work."
                </p>
              </div>
            </TabsContent>
            <TabsContent value="support" className="p-4 border rounded-md bg-muted/20">
              <h5 className="font-semibold mb-2">Support & Warranty</h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 1-year limited warranty included</li>
                <li>• 24/7 technical support available</li>
                <li>• Online documentation and tutorials</li>
                <li>• Extended warranty options available</li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>

        {/* Dashboard Tabs */}
        <div>
          <h4 className="font-semibold mb-3">Dashboard Navigation Tabs:</h4>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="p-4 border rounded-md bg-muted/20">
              <h5 className="font-semibold mb-2">Dashboard Overview</h5>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div className="p-2 bg-background rounded">
                  <div className="font-semibold">1,234</div>
                  <div className="text-muted-foreground">Total Users</div>
                </div>
                <div className="p-2 bg-background rounded">
                  <div className="font-semibold">€45,678</div>
                  <div className="text-muted-foreground">Revenue</div>
                </div>
                <div className="p-2 bg-background rounded">
                  <div className="font-semibold">89.5%</div>
                  <div className="text-muted-foreground">Uptime</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="p-4 border rounded-md bg-muted/20">
              <h5 className="font-semibold mb-2">Analytics & Reports</h5>
              <p className="text-sm text-muted-foreground">
                Detailed analytics, charts, and performance metrics would be displayed here.
              </p>
            </TabsContent>
            <TabsContent value="settings" className="p-4 border rounded-md bg-muted/20">
              <h5 className="font-semibold mb-2">System Settings</h5>
              <p className="text-sm text-muted-foreground">
                Configuration options, user preferences, and system administration tools.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );

  const AlertDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>⚠️</span>
          Alert Messages
        </CardTitle>
        <CardDescription>
          System feedback and important notifications for users
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Alert Types */}
        <div>
          <h4 className="font-semibold mb-3">Alert Types:</h4>
          <div className="flex gap-2 mb-4">
            <Button 
              size="sm" 
              variant={alertType === 'default' ? 'default' : 'outline'}
              onClick={() => setAlertType('default')}
            >
              Information
            </Button>
            <Button 
              size="sm" 
              variant={alertType === 'destructive' ? 'default' : 'outline'}
              onClick={() => setAlertType('destructive')}
            >
              Error
            </Button>
          </div>
          <div className="space-y-3">
            {alertType === 'default' && (
              <>
                <Alert>
                  <AlertTitle>System Update Available</AlertTitle>
                  <AlertDescription>
                    A new version of the application is available. Update now to get the latest features and security improvements.
                  </AlertDescription>
                </Alert>
                <Alert>
                  <AlertTitle>Data Sync Complete</AlertTitle>
                  <AlertDescription>
                    Your data has been successfully synchronized with the cloud. All changes are now backed up.
                  </AlertDescription>
                </Alert>
              </>
            )}
            {alertType === 'destructive' && (
              <>
                <Alert variant="destructive">
                  <AlertTitle>Payment Failed</AlertTitle>
                  <AlertDescription>
                    There was a problem processing your payment. Please check your payment method and try again.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertTitle>Connection Error</AlertTitle>
                  <AlertDescription>
                    Unable to connect to the server. Please check your internet connection and try again.
                  </AlertDescription>
                </Alert>
              </>
            )}
          </div>
        </div>

        {/* Business Context Examples */}
        <div>
          <h4 className="font-semibold mb-3">Business Context Examples:</h4>
          <div className="space-y-3">
            <Alert>
              <AlertTitle>🎉 Black Friday Sale</AlertTitle>
              <AlertDescription>
                Limited time offer: Get 50% off on all premium plans. Sale ends in 48 hours!
              </AlertDescription>
            </Alert>
            <Alert>
              <AlertTitle>📧 Email Verification Required</AlertTitle>
              <AlertDescription>
                Please verify your email address to complete your account setup and access all features.
              </AlertDescription>
            </Alert>
            <Alert>
              <AlertTitle>🔒 Security Notice</AlertTitle>
              <AlertDescription>
                For your security, please update your password. It's been 90 days since your last password change.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const BadgeDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🏷️</span>
          Badge Components
        </CardTitle>
        <CardDescription>
          Visual indicators for status, categories, and notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Badge Variants */}
        <div>
          <h4 className="font-semibold mb-3">Badge Variants:</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Error</Badge>
          </div>
        </div>

        {/* Status Indicators */}
        <div>
          <h4 className="font-semibold mb-3">Order Status System:</h4>
          <div className="flex gap-2 mb-4">
            <Button 
              size="sm" 
              variant={orderStatus === 'pending' ? 'default' : 'outline'}
              onClick={() => setOrderStatus('pending')}
            >
              Pending
            </Button>
            <Button 
              size="sm" 
              variant={orderStatus === 'processing' ? 'default' : 'outline'}
              onClick={() => setOrderStatus('processing')}
            >
              Processing
            </Button>
            <Button 
              size="sm" 
              variant={orderStatus === 'shipped' ? 'default' : 'outline'}
              onClick={() => setOrderStatus('shipped')}
            >
              Shipped
            </Button>
            <Button 
              size="sm" 
              variant={orderStatus === 'delivered' ? 'default' : 'outline'}
              onClick={() => setOrderStatus('delivered')}
            >
              Delivered
            </Button>
          </div>
          <div className="p-4 border rounded-lg bg-muted/20">
            <div className="flex items-center justify-between">
              <span className="font-medium">Order #12345</span>
              <Badge 
                variant={
                  orderStatus === 'pending' ? 'outline' :
                  orderStatus === 'processing' ? 'secondary' :
                  orderStatus === 'shipped' ? 'default' :
                  'default'
                }
              >
                {orderStatus === 'pending' && '⏳ Pending'}
                {orderStatus === 'processing' && '⚙️ Processing'}
                {orderStatus === 'shipped' && '🚚 Shipped'}
                {orderStatus === 'delivered' && '✅ Delivered'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Notification Counter */}
        <div>
          <h4 className="font-semibold mb-3">Notification Counter:</h4>
          <div className="flex gap-2 mb-4">
            <Button 
              size="sm" 
              onClick={() => setNotificationCount(Math.max(0, notificationCount - 1))}
            >
              Decrease
            </Button>
            <Button 
              size="sm" 
              onClick={() => setNotificationCount(notificationCount + 1)}
            >
              Increase
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setNotificationCount(0)}
            >
              Clear All
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span>📧 Messages</span>
              {notificationCount > 0 && (
                <Badge variant="destructive">{notificationCount}</Badge>
              )}
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span>🔔 Notifications</span>
              <Badge variant="secondary">All read</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span>📋 Tasks</span>
              <Badge variant="outline">5 pending</Badge>
            </div>
          </div>
        </div>

        {/* Product Categories */}
        <div>
          <h4 className="font-semibold mb-3">Product Categories & Tags:</h4>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="font-medium mb-2">MacBook Pro 16"</div>
              <div className="flex flex-wrap gap-1">
                <Badge variant="default">Electronics</Badge>
                <Badge variant="secondary">Computers</Badge>
                <Badge variant="outline">Apple</Badge>
                <Badge variant="default">New</Badge>
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-medium mb-2">Course: React Fundamentals</div>
              <div className="flex flex-wrap gap-1">
                <Badge variant="default">Programming</Badge>
                <Badge variant="secondary">Frontend</Badge>
                <Badge variant="outline">Beginner</Badge>
                <Badge variant="destructive">Hot</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CombinedDemo = () => (
    <div className="space-y-6">
      
      {/* E-commerce Product Page Simulation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🛒</span>
            E-commerce Product Page
          </CardTitle>
          <CardDescription>
            Complete navigation system with all 4 components working together
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Breadcrumb Navigation */}
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/electronics">Electronics</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/electronics/laptops">Laptops</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>MacBook Pro 16"</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Product Header with Badges */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold">MacBook Pro 16" (2024)</h3>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="destructive">Best Seller</Badge>
                <Badge variant="default">Free Shipping</Badge>
                <Badge variant="secondary">In Stock</Badge>
                <Badge variant="outline">AppleCare+</Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">€2,499</div>
              <div className="text-sm text-muted-foreground line-through">€2,899</div>
            </div>
          </div>

          {/* Promotional Alert */}
          <Alert>
            <AlertTitle>🎉 Limited Time Offer</AlertTitle>
            <AlertDescription>
              Save €400 on this MacBook Pro! Offer valid until midnight. Free AppleCare+ included with purchase.
            </AlertDescription>
          </Alert>

          {/* Product Information Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="specs">Tech Specs</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="p-4 border rounded-md">
              <h4 className="font-semibold mb-3">Product Overview</h4>
              <p className="text-sm text-muted-foreground mb-4">
                The most powerful MacBook Pro ever is here. With the blazing-fast M3 Pro chip, 
                you can fly through the most demanding workflows.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Display:</strong> 16.2" Liquid Retina XDR</div>
                <div><strong>Chip:</strong> Apple M3 Pro</div>
                <div><strong>Memory:</strong> 18GB Unified Memory</div>
                <div><strong>Storage:</strong> 512GB SSD</div>
              </div>
            </TabsContent>
            <TabsContent value="specs" className="p-4 border rounded-md">
              <h4 className="font-semibold mb-3">Technical Specifications</h4>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div><strong>Processor:</strong></div>
                  <div>Apple M3 Pro chip with 11-core CPU</div>
                  <div><strong>Graphics:</strong></div>
                  <div>14-core GPU</div>
                  <div><strong>Display:</strong></div>
                  <div>16.2" (3456x2234) Liquid Retina XDR</div>
                  <div><strong>Memory:</strong></div>
                  <div>18GB unified memory</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-4 border rounded-md">
              <h4 className="font-semibold mb-3">Customer Reviews</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <span>⭐⭐⭐⭐⭐</span>
                  <span className="font-medium">4.8 out of 5</span>
                  <Badge variant="outline">247 reviews</Badge>
                </div>
                <div className="border-l-2 border-primary pl-3">
                  <p className="text-sm text-muted-foreground">
                    "Incredible performance for video editing and development work. 
                    The display quality is outstanding."
                  </p>
                  <div className="text-xs text-muted-foreground mt-1">
                    - Professional User, ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="support" className="p-4 border rounded-md">
              <h4 className="font-semibold mb-3">Support & Warranty</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="default">1 Year</Badge>
                  <span>Limited warranty included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">24/7</Badge>
                  <span>Technical support available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Extended</Badge>
                  <span>AppleCare+ protection available</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Admin Dashboard Simulation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📊</span>
            Admin Dashboard Interface
          </CardTitle>
          <CardDescription>
            Dashboard navigation with real-time status indicators
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Dashboard Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/analytics">Analytics</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Performance Report</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* System Status Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Alert>
              <AlertTitle>✅ System Status: Operational</AlertTitle>
              <AlertDescription>
                All services are running normally. Last checked: 2 minutes ago.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>⚠️ High CPU Usage Detected</AlertTitle>
              <AlertDescription>
                Server load is at 85%. Consider scaling resources.
              </AlertDescription>
            </Alert>
          </div>

          {/* Dashboard Navigation */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">
                Overview 
                <Badge variant="secondary" className="ml-2">Live</Badge>
              </TabsTrigger>
              <TabsTrigger value="users">
                Users
                <Badge variant="destructive" className="ml-2">{notificationCount}</Badge>
              </TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="p-4 border rounded-md">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded">
                  <div className="text-2xl font-bold">1,247</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                  <Badge variant="default" className="mt-1">+12%</Badge>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded">
                  <div className="text-2xl font-bold">€45,678</div>
                  <div className="text-sm text-muted-foreground">Revenue</div>
                  <Badge variant="destructive" className="mt-1">-3%</Badge>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded">
                  <div className="text-2xl font-bold">99.8%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                  <Badge variant="default" className="mt-1">Stable</Badge>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="users" className="p-4 border rounded-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>New registrations today</span>
                  <Badge variant="default">47</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pending verifications</span>
                  <Badge variant="destructive">{notificationCount}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Premium subscribers</span>
                  <Badge variant="secondary">234</Badge>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reports" className="p-4 border rounded-md">
              <p className="text-sm text-muted-foreground">
                Detailed reports and analytics data would be displayed here.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );

  const renderDemo = () => {
    switch (activeDemo) {
      case 'breadcrumb':
        return <BreadcrumbDemo />;
      case 'tabs':
        return <TabsDemo />;
      case 'alert':
        return <AlertDemo />;
      case 'badge':
        return <BadgeDemo />;
      default:
        return <CombinedDemo />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Demo Selector */}
      <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-lg">
        {demoTabs.map((demo) => (
          <Button
            key={demo.id}
            variant={activeDemo === demo.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveDemo(demo.id)}
            className="flex items-center gap-2"
          >
            <span>{demo.icon}</span>
            <span className="hidden sm:inline">{demo.label}</span>
          </Button>
        ))}
      </div>

      {/* Demo Content */}
      <div className="min-h-[400px]">
        {renderDemo()}
      </div>

      {/* Component Integration Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Business Integration Patterns</CardTitle>
          <CardDescription>
            How these 4 navigation components work together in real business scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">E-commerce Sites:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Breadcrumb:</strong> Product category navigation</li>
                <li>• <strong>Tabs:</strong> Product info organization</li>
                <li>• <strong>Badge:</strong> Stock status, promotions</li>
                <li>• <strong>Alert:</strong> Sales notifications, shipping info</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">SaaS Dashboards:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Breadcrumb:</strong> Deep feature navigation</li>
                <li>• <strong>Tabs:</strong> Dashboard sections</li>
                <li>• <strong>Badge:</strong> Notification counters</li>
                <li>• <strong>Alert:</strong> System status updates</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}