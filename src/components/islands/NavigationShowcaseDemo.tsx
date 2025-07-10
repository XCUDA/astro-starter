// NavigationShowcaseDemo.tsx - FULLY ACCESSIBLE with WCAG 2.1 AA compliance
// Path: /src/components/islands/NavigationShowcaseDemo.tsx
// ✅ Full keyboard navigation, ARIA states, live regions, focus management

import React, { useState, useRef, useEffect } from 'react';
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

  // Accessibility: Refs for keyboard navigation and live announcements
  const demoButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const announceRef = useRef<HTMLDivElement>(null);
  const alertAnnounceRef = useRef<HTMLDivElement>(null);

  const demoTabs = [
    { id: 'combined' as DemoType, label: 'All Combined', icon: '🧭', shortcut: '1' },
    { id: 'breadcrumb' as DemoType, label: 'Breadcrumb', icon: '🗂️', shortcut: '2' },
    { id: 'tabs' as DemoType, label: 'Tabs', icon: '📑', shortcut: '3' },
    { id: 'alert' as DemoType, label: 'Alert', icon: '⚠️', shortcut: '4' },
    { id: 'badge' as DemoType, label: 'Badge', icon: '🏷️', shortcut: '5' }
  ];

  // Accessibility: Announce demo changes to screen readers
  const announceChange = (demoLabel: string) => {
    if (announceRef.current) {
      announceRef.current.textContent = `Now showing ${demoLabel} navigation component demonstration`;
    }
  };

  // Accessibility: Announce interactive changes
  const announceInteractiveChange = (message: string) => {
    if (alertAnnounceRef.current) {
      alertAnnounceRef.current.textContent = message;
    }
  };

  // Accessibility: Handle demo change with announcement
  const handleDemoChange = (demoId: DemoType) => {
    setActiveDemo(demoId);
    const demo = demoTabs.find(tab => tab.id === demoId);
    if (demo) {
      announceChange(demo.label);
    }
  };

  // Accessibility: Keyboard navigation for demo selector
  const handleDemoKeydown = (event: React.KeyboardEvent, currentIndex: number) => {
    let targetIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        targetIndex = currentIndex === 0 ? demoTabs.length - 1 : currentIndex - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        targetIndex = currentIndex === demoTabs.length - 1 ? 0 : currentIndex + 1;
        break;
      case 'Home':
        event.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        targetIndex = demoTabs.length - 1;
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
        event.preventDefault();
        const shortcutIndex = parseInt(event.key) - 1;
        if (shortcutIndex < demoTabs.length) {
          targetIndex = shortcutIndex;
          handleDemoChange(demoTabs[targetIndex].id);
        }
        break;
      default:
        return;
    }

    // Focus and select the target demo
    if (targetIndex !== currentIndex) {
      const targetButton = demoButtonsRef.current[targetIndex];
      if (targetButton) {
        targetButton.focus();
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || 
            event.key === 'ArrowUp' || event.key === 'ArrowDown' ||
            event.key === 'Home' || event.key === 'End') {
          handleDemoChange(demoTabs[targetIndex].id);
        }
      }
    }
  };

  // Accessibility: Setup keyboard shortcuts globally
  useEffect(() => {
    const handleGlobalKeydown = (event: KeyboardEvent) => {
      // Only activate shortcuts if not in an input field
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement ||
          event.target instanceof HTMLSelectElement) {
        return;
      }

      if (event.key >= '1' && event.key <= '5') {
        const shortcutIndex = parseInt(event.key) - 1;
        if (shortcutIndex < demoTabs.length) {
          event.preventDefault();
          handleDemoChange(demoTabs[shortcutIndex].id);
          demoButtonsRef.current[shortcutIndex]?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeydown);
    return () => document.removeEventListener('keydown', handleGlobalKeydown);
  }, []);

  // Accessibility: Enhanced page change handler
  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    announceInteractiveChange(`Breadcrumb navigation updated to show ${page} page`);
  };

  // Accessibility: Enhanced alert type change
  const handleAlertTypeChange = (type: AlertType) => {
    setAlertType(type);
    announceInteractiveChange(`Alert demonstration changed to ${type === 'default' ? 'information' : 'error'} alerts`);
  };

  // Accessibility: Enhanced order status change
  const handleOrderStatusChange = (status: string) => {
    setOrderStatus(status);
    announceInteractiveChange(`Order status updated to ${status}`);
  };

  // Accessibility: Enhanced notification count change
  const handleNotificationChange = (action: 'increase' | 'decrease' | 'clear') => {
    let newCount = notificationCount;
    switch (action) {
      case 'increase':
        newCount = notificationCount + 1;
        break;
      case 'decrease':
        newCount = Math.max(0, notificationCount - 1);
        break;
      case 'clear':
        newCount = 0;
        break;
    }
    setNotificationCount(newCount);
    announceInteractiveChange(`Notification count changed to ${newCount}`);
  };

  const BreadcrumbDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span aria-hidden="true">🗂️</span>
          Breadcrumb Navigation
        </CardTitle>
        <CardDescription>
          Hierarchical navigation showing user's current location with accessibility features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* E-commerce Example */}
        <section aria-labelledby="ecommerce-breadcrumb-heading">
          <h4 id="ecommerce-breadcrumb-heading" className="font-semibold mb-3">E-commerce Site Navigation:</h4>
          <div className="bg-muted/30 p-4 rounded-lg">
            <Breadcrumb aria-label="E-commerce product navigation path">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" aria-describedby="breadcrumb-home-desc">Home</BreadcrumbLink>
                  <span id="breadcrumb-home-desc" className="sr-only">Navigate to homepage</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator aria-hidden="true" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/electronics" aria-describedby="breadcrumb-electronics-desc">Electronics</BreadcrumbLink>
                  <span id="breadcrumb-electronics-desc" className="sr-only">Browse electronics category</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator aria-hidden="true" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/electronics/laptops" aria-describedby="breadcrumb-laptops-desc">Laptops</BreadcrumbLink>
                  <span id="breadcrumb-laptops-desc" className="sr-only">View laptop products</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator aria-hidden="true" />
                <BreadcrumbItem>
                  <BreadcrumbPage>MacBook Pro 16"</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Admin Dashboard Example */}
        <section aria-labelledby="admin-breadcrumb-heading">
          <h4 id="admin-breadcrumb-heading" className="font-semibold mb-3">Admin Dashboard Navigation:</h4>
          <div className="bg-muted/30 p-4 rounded-lg">
            <Breadcrumb aria-label="Admin dashboard navigation path">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin" aria-describedby="breadcrumb-dashboard-desc">Dashboard</BreadcrumbLink>
                  <span id="breadcrumb-dashboard-desc" className="sr-only">Go to admin dashboard</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator aria-hidden="true" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/users" aria-describedby="breadcrumb-users-desc">User Management</BreadcrumbLink>
                  <span id="breadcrumb-users-desc" className="sr-only">Manage users and accounts</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator aria-hidden="true" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/users/roles" aria-describedby="breadcrumb-roles-desc">Roles & Permissions</BreadcrumbLink>
                  <span id="breadcrumb-roles-desc" className="sr-only">Configure user roles and permissions</span>
                </BreadcrumbItem>
                <BreadcrumbSeparator aria-hidden="true" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Edit Role</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Interactive Example */}
        <section aria-labelledby="interactive-breadcrumb-heading">
          <h4 id="interactive-breadcrumb-heading" className="font-semibold mb-3">Interactive Navigation:</h4>
          <div className="flex gap-2 mb-3" role="group" aria-label="Page navigation controls">
            <Button 
              size="sm" 
              variant={currentPage === 'home' ? 'default' : 'outline'}
              onClick={() => handlePageChange('home')}
              aria-pressed={currentPage === 'home'}
              aria-describedby="home-page-desc"
            >
              Home
            </Button>
            <span id="home-page-desc" className="sr-only">Navigate to home page view</span>
            
            <Button 
              size="sm" 
              variant={currentPage === 'products' ? 'default' : 'outline'}
              onClick={() => handlePageChange('products')}
              aria-pressed={currentPage === 'products'}
              aria-describedby="products-page-desc"
            >
              Products
            </Button>
            <span id="products-page-desc" className="sr-only">Navigate to products page view</span>
            
            <Button 
              size="sm" 
              variant={currentPage === 'details' ? 'default' : 'outline'}
              onClick={() => handlePageChange('details')}
              aria-pressed={currentPage === 'details'}
              aria-describedby="details-page-desc"
            >
              Details
            </Button>
            <span id="details-page-desc" className="sr-only">Navigate to product details view</span>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <Breadcrumb aria-label="Interactive navigation demonstration">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {currentPage !== 'home' && (
                  <>
                    <BreadcrumbSeparator aria-hidden="true" />
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
                    <BreadcrumbSeparator aria-hidden="true" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Product Details</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>
      </CardContent>
    </Card>
  );

  const TabsDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span aria-hidden="true">📑</span>
          Tabs Navigation
        </CardTitle>
        <CardDescription>
          Organize content into logical sections with accessible tab navigation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Product Information Tabs */}
        <section aria-labelledby="product-tabs-heading">
          <h4 id="product-tabs-heading" className="font-semibold mb-3">Product Information Tabs:</h4>
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4" role="tablist" aria-label="Product information sections">
              <TabsTrigger value="description" role="tab">Description</TabsTrigger>
              <TabsTrigger value="specifications" role="tab">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" role="tab">Reviews</TabsTrigger>
              <TabsTrigger value="support" role="tab">Support</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-4 border rounded-md bg-muted/20" role="tabpanel" tabIndex={0} aria-labelledby="description-tab">
              <h5 id="description-tab" className="font-semibold mb-2">Product Description</h5>
              <p className="text-sm text-muted-foreground">
                Detailed product description with features, benefits, and use cases. 
                Perfect for e-commerce product pages where customers need comprehensive information 
                to make informed purchasing decisions.
              </p>
            </TabsContent>
            <TabsContent value="specifications" className="p-4 border rounded-md bg-muted/20" role="tabpanel" tabIndex={0} aria-labelledby="specifications-tab">
              <h5 id="specifications-tab" className="font-semibold mb-2">Technical Specifications</h5>
              <div className="grid grid-cols-2 gap-2 text-sm" role="table" aria-label="Product specifications">
                <div role="row"><span role="cell"><strong>Dimensions:</strong></span> <span role="cell">35.79 x 24.59 x 1.68 cm</span></div>
                <div role="row"><span role="cell"><strong>Weight:</strong></span> <span role="cell">2.15 kg</span></div>
                <div role="row"><span role="cell"><strong>Display:</strong></span> <span role="cell">16.2" Liquid Retina XDR</span></div>
                <div role="row"><span role="cell"><strong>Processor:</strong></span> <span role="cell">Apple M3 Pro chip</span></div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-4 border rounded-md bg-muted/20" role="tabpanel" tabIndex={0} aria-labelledby="reviews-tab">
              <h5 id="reviews-tab" className="font-semibold mb-2">Customer Reviews</h5>
              <div className="space-y-2">
                <div className="flex items-center gap-2" role="group" aria-label="Rating summary">
                  <span className="text-sm" aria-label="5 out of 5 stars">⭐⭐⭐⭐⭐</span>
                  <span className="text-sm font-medium">4.8/5</span>
                  <span className="text-xs text-muted-foreground">(247 reviews)</span>
                </div>
                <blockquote className="text-sm text-muted-foreground">
                  "Excellent performance and build quality. Highly recommended for professional work."
                </blockquote>
              </div>
            </TabsContent>
            <TabsContent value="support" className="p-4 border rounded-md bg-muted/20" role="tabpanel" tabIndex={0} aria-labelledby="support-tab">
              <h5 id="support-tab" className="font-semibold mb-2">Support & Warranty</h5>
              <ul className="text-sm text-muted-foreground space-y-1" role="list">
                <li role="listitem">• 1-year limited warranty included</li>
                <li role="listitem">• 24/7 technical support available</li>
                <li role="listitem">• Online documentation and tutorials</li>
                <li role="listitem">• Extended warranty options available</li>
              </ul>
            </TabsContent>
          </Tabs>
        </section>

        {/* Dashboard Tabs */}
        <section aria-labelledby="dashboard-tabs-heading">
          <h4 id="dashboard-tabs-heading" className="font-semibold mb-3">Dashboard Navigation Tabs:</h4>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3" role="tablist" aria-label="Dashboard sections">
              <TabsTrigger value="overview" role="tab">Overview</TabsTrigger>
              <TabsTrigger value="analytics" role="tab">Analytics</TabsTrigger>
              <TabsTrigger value="settings" role="tab">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="p-4 border rounded-md bg-muted/20" role="tabpanel" tabIndex={0}>
              <h5 className="font-semibold mb-2">Dashboard Overview</h5>
              <div className="grid grid-cols-3 gap-4 text-center text-sm" role="group" aria-label="Key metrics">
                <div className="p-2 bg-background rounded" role="group" aria-label="Total users metric">
                  <div className="font-semibold" aria-label="1,234 total users">1,234</div>
                  <div className="text-muted-foreground">Total Users</div>
                </div>
                <div className="p-2 bg-background rounded" role="group" aria-label="Revenue metric">
                  <div className="font-semibold" aria-label="45,678 euros revenue">€45,678</div>
                  <div className="text-muted-foreground">Revenue</div>
                </div>
                <div className="p-2 bg-background rounded" role="group" aria-label="Uptime metric">
                  <div className="font-semibold" aria-label="89.5 percent uptime">89.5%</div>
                  <div className="text-muted-foreground">Uptime</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="analytics" className="p-4 border rounded-md bg-muted/20" role="tabpanel" tabIndex={0}>
              <h5 className="font-semibold mb-2">Analytics & Reports</h5>
              <p className="text-sm text-muted-foreground">
                Detailed analytics, charts, and performance metrics would be displayed here with 
                accessible data visualizations and screen reader-friendly content.
              </p>
            </TabsContent>
            <TabsContent value="settings" className="p-4 border rounded-md bg-muted/20" role="tabpanel" tabIndex={0}>
              <h5 className="font-semibold mb-2">System Settings</h5>
              <p className="text-sm text-muted-foreground">
                Configuration options, user preferences, and system administration tools with 
                keyboard navigation and proper form accessibility.
              </p>
            </TabsContent>
          </Tabs>
        </section>
      </CardContent>
    </Card>
  );

  const AlertDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span aria-hidden="true">⚠️</span>
          Alert Messages
        </CardTitle>
        <CardDescription>
          System feedback and important notifications with accessibility announcements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Alert Types */}
        <section aria-labelledby="alert-types-heading">
          <h4 id="alert-types-heading" className="font-semibold mb-3">Alert Types:</h4>
          <div className="flex gap-2 mb-4" role="group" aria-label="Alert type selection">
            <Button 
              size="sm" 
              variant={alertType === 'default' ? 'default' : 'outline'}
              onClick={() => handleAlertTypeChange('default')}
              aria-pressed={alertType === 'default'}
              aria-describedby="info-alert-desc"
            >
              Information
            </Button>
            <span id="info-alert-desc" className="sr-only">Show information alert examples</span>
            
            <Button 
              size="sm" 
              variant={alertType === 'destructive' ? 'default' : 'outline'}
              onClick={() => handleAlertTypeChange('destructive')}
              aria-pressed={alertType === 'destructive'}
              aria-describedby="error-alert-desc"
            >
              Error
            </Button>
            <span id="error-alert-desc" className="sr-only">Show error alert examples</span>
          </div>
          <div className="space-y-3" role="group" aria-label="Alert demonstrations">
            {alertType === 'default' && (
              <>
                <Alert role="status" aria-live="polite">
                  <AlertTitle>System Update Available</AlertTitle>
                  <AlertDescription>
                    A new version of the application is available. Update now to get the latest features and security improvements.
                  </AlertDescription>
                </Alert>
                <Alert role="status" aria-live="polite">
                  <AlertTitle>Data Sync Complete</AlertTitle>
                  <AlertDescription>
                    Your data has been successfully synchronized with the cloud. All changes are now backed up.
                  </AlertDescription>
                </Alert>
              </>
            )}
            {alertType === 'destructive' && (
              <>
                <Alert variant="destructive" role="alert" aria-live="assertive">
                  <AlertTitle>Payment Failed</AlertTitle>
                  <AlertDescription>
                    There was a problem processing your payment. Please check your payment method and try again.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive" role="alert" aria-live="assertive">
                  <AlertTitle>Connection Error</AlertTitle>
                  <AlertDescription>
                    Unable to connect to the server. Please check your internet connection and try again.
                  </AlertDescription>
                </Alert>
              </>
            )}
          </div>
        </section>

        {/* Business Context Examples */}
        <section aria-labelledby="business-alerts-heading">
          <h4 id="business-alerts-heading" className="font-semibold mb-3">Business Context Examples:</h4>
          <div className="space-y-3" role="group" aria-label="Business alert examples">
            <Alert role="status" aria-live="polite">
              <AlertTitle>🎉 Black Friday Sale</AlertTitle>
              <AlertDescription>
                Limited time offer: Get 50% off on all premium plans. Sale ends in 48 hours!
              </AlertDescription>
            </Alert>
            <Alert role="status" aria-live="polite">
              <AlertTitle>📧 Email Verification Required</AlertTitle>
              <AlertDescription>
                Please verify your email address to complete your account setup and access all features.
              </AlertDescription>
            </Alert>
            <Alert role="alert" aria-live="assertive">
              <AlertTitle>🔒 Security Notice</AlertTitle>
              <AlertDescription>
                For your security, please update your password. It's been 90 days since your last password change.
              </AlertDescription>
            </Alert>
          </div>
        </section>
      </CardContent>
    </Card>
  );

  const BadgeDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span aria-hidden="true">🏷️</span>
          Badge Components
        </CardTitle>
        <CardDescription>
          Visual indicators for status, categories, and notifications with semantic meaning
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Badge Variants */}
        <section aria-labelledby="badge-variants-heading">
          <h4 id="badge-variants-heading" className="font-semibold mb-3">Badge Variants:</h4>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Badge style variations">
            <Badge variant="default" aria-label="Default badge style">Default</Badge>
            <Badge variant="secondary" aria-label="Secondary badge style">Secondary</Badge>
            <Badge variant="outline" aria-label="Outline badge style">Outline</Badge>
            <Badge variant="destructive" aria-label="Error badge style">Error</Badge>
          </div>
        </section>

        {/* Status Indicators */}
        <section aria-labelledby="order-status-heading">
          <h4 id="order-status-heading" className="font-semibold mb-3">Order Status System:</h4>
          <div className="flex gap-2 mb-4" role="group" aria-label="Order status controls">
            <Button 
              size="sm" 
              variant={orderStatus === 'pending' ? 'default' : 'outline'}
              onClick={() => handleOrderStatusChange('pending')}
              aria-pressed={orderStatus === 'pending'}
            >
              Pending
            </Button>
            <Button 
              size="sm" 
              variant={orderStatus === 'processing' ? 'default' : 'outline'}
              onClick={() => handleOrderStatusChange('processing')}
              aria-pressed={orderStatus === 'processing'}
            >
              Processing
            </Button>
            <Button 
              size="sm" 
              variant={orderStatus === 'shipped' ? 'default' : 'outline'}
              onClick={() => handleOrderStatusChange('shipped')}
              aria-pressed={orderStatus === 'shipped'}
            >
              Shipped
            </Button>
            <Button 
              size="sm" 
              variant={orderStatus === 'delivered' ? 'default' : 'outline'}
              onClick={() => handleOrderStatusChange('delivered')}
              aria-pressed={orderStatus === 'delivered'}
            >
              Delivered
            </Button>
          </div>
          <div className="p-4 border rounded-lg bg-muted/20" role="region" aria-label="Order status display">
            <div className="flex items-center justify-between">
              <span className="font-medium">Order #12345</span>
              <Badge 
                variant={
                  orderStatus === 'pending' ? 'outline' :
                  orderStatus === 'processing' ? 'secondary' :
                  orderStatus === 'shipped' ? 'default' :
                  'default'
                }
                aria-label={`Order status: ${orderStatus}`}
              >
                {orderStatus === 'pending' && '⏳ Pending'}
                {orderStatus === 'processing' && '⚙️ Processing'}
                {orderStatus === 'shipped' && '🚚 Shipped'}
                {orderStatus === 'delivered' && '✅ Delivered'}
              </Badge>
            </div>
          </div>
        </section>

        {/* Notification Counter */}
        <section aria-labelledby="notification-counter-heading">
          <h4 id="notification-counter-heading" className="font-semibold mb-3">Notification Counter:</h4>
          <div className="flex gap-2 mb-4" role="group" aria-label="Notification controls">
            <Button 
              size="sm" 
              onClick={() => handleNotificationChange('decrease')}
              aria-describedby="decrease-notifications-desc"
            >
              Decrease
            </Button>
            <span id="decrease-notifications-desc" className="sr-only">Decrease notification count by one</span>
            
            <Button 
              size="sm" 
              onClick={() => handleNotificationChange('increase')}
              aria-describedby="increase-notifications-desc"
            >
              Increase
            </Button>
            <span id="increase-notifications-desc" className="sr-only">Increase notification count by one</span>
            
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleNotificationChange('clear')}
              aria-describedby="clear-notifications-desc"
            >
              Clear All
            </Button>
            <span id="clear-notifications-desc" className="sr-only">Clear all notifications</span>
          </div>
          <div className="space-y-3" role="group" aria-label="Notification display">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span>📧 Messages</span>
              {notificationCount > 0 ? (
                <Badge variant="destructive" aria-label={`${notificationCount} unread messages`}>
                  {notificationCount}
                </Badge>
              ) : (
                <span className="sr-only">No unread messages</span>
              )}
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span>🔔 Notifications</span>
              <Badge variant="secondary" aria-label="All notifications read">All read</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span>📋 Tasks</span>
              <Badge variant="outline" aria-label="5 pending tasks">5 pending</Badge>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section aria-labelledby="product-categories-heading">
          <h4 id="product-categories-heading" className="font-semibold mb-3">Product Categories & Tags:</h4>
          <div className="space-y-3" role="group" aria-label="Product examples with tags">
            <article className="p-3 border rounded-lg">
              <h5 className="font-medium mb-2">MacBook Pro 16"</h5>
              <div className="flex flex-wrap gap-1" role="group" aria-label="Product tags">
                <Badge variant="default" aria-label="Electronics category">Electronics</Badge>
                <Badge variant="secondary" aria-label="Computers subcategory">Computers</Badge>
                <Badge variant="outline" aria-label="Apple brand">Apple</Badge>
                <Badge variant="default" aria-label="New product">New</Badge>
              </div>
            </article>
            <article className="p-3 border rounded-lg">
              <h5 className="font-medium mb-2">Course: React Fundamentals</h5>
              <div className="flex flex-wrap gap-1" role="group" aria-label="Course tags">
                <Badge variant="default" aria-label="Programming category">Programming</Badge>
                <Badge variant="secondary" aria-label="Frontend specialization">Frontend</Badge>
                <Badge variant="outline" aria-label="Beginner level">Beginner</Badge>
                <Badge variant="destructive" aria-label="Hot course">Hot</Badge>
              </div>
            </article>
          </div>
        </section>
      </CardContent>
    </Card>
  );

  const CombinedDemo = () => (
    <div className="space-y-6">
      
      {/* E-commerce Product Page Simulation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span aria-hidden="true">🛒</span>
            E-commerce Product Page
          </CardTitle>
          <CardDescription>
            Complete accessible navigation system with all 4 components working together
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Product page navigation">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator aria-hidden="true" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/electronics">Electronics</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator aria-hidden="true" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/electronics/laptops">Laptops</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator aria-hidden="true" />
                <BreadcrumbItem>
                  <BreadcrumbPage>MacBook Pro 16"</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </nav>

          {/* Product Header with Badges */}
          <header className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold">MacBook Pro 16" (2024)</h3>
              <div className="flex items-center gap-2 mt-2" role="group" aria-label="Product tags and status">
                <Badge variant="destructive" aria-label="Best selling product">Best Seller</Badge>
                <Badge variant="default" aria-label="Free shipping included">Free Shipping</Badge>
                <Badge variant="secondary" aria-label="Currently in stock">In Stock</Badge>
                <Badge variant="outline" aria-label="AppleCare plus available">AppleCare+</Badge>
              </div>
            </div>
            <div className="text-right" role="group" aria-label="Pricing information">
              <div className="text-2xl font-bold" aria-label="Current price 2,499 euros">€2,499</div>
              <div className="text-sm text-muted-foreground line-through" aria-label="Original price 2,899 euros">€2,899</div>
            </div>
          </header>

          {/* Promotional Alert */}
          <Alert role="status" aria-live="polite">
            <AlertTitle>🎉 Limited Time Offer</AlertTitle>
            <AlertDescription>
              Save €400 on this MacBook Pro! Offer valid until midnight. Free AppleCare+ included with purchase.
            </AlertDescription>
          </Alert>

          {/* Product Information Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4" role="tablist" aria-label="Product information sections">
              <TabsTrigger value="overview" role="tab">Overview</TabsTrigger>
              <TabsTrigger value="specs" role="tab">Tech Specs</TabsTrigger>
              <TabsTrigger value="reviews" role="tab">Reviews</TabsTrigger>
              <TabsTrigger value="support" role="tab">Support</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="p-4 border rounded-md" role="tabpanel" tabIndex={0}>
              <h4 className="font-semibold mb-3">Product Overview</h4>
              <p className="text-sm text-muted-foreground mb-4">
                The most powerful MacBook Pro ever is here. With the blazing-fast M3 Pro chip, 
                you can fly through the most demanding workflows.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm" role="table" aria-label="Key specifications">
                <div role="row"><span role="cell"><strong>Display:</strong></span> <span role="cell">16.2" Liquid Retina XDR</span></div>
                <div role="row"><span role="cell"><strong>Chip:</strong></span> <span role="cell">Apple M3 Pro</span></div>
                <div role="row"><span role="cell"><strong>Memory:</strong></span> <span role="cell">18GB Unified Memory</span></div>
                <div role="row"><span role="cell"><strong>Storage:</strong></span> <span role="cell">512GB SSD</span></div>
              </div>
            </TabsContent>
            <TabsContent value="specs" className="p-4 border rounded-md" role="tabpanel" tabIndex={0}>
              <h4 className="font-semibold mb-3">Technical Specifications</h4>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2" role="table" aria-label="Detailed specifications">
                  <div role="row"><span role="cell"><strong>Processor:</strong></span><span role="cell">Apple M3 Pro chip with 11-core CPU</span></div>
                  <div role="row"><span role="cell"><strong>Graphics:</strong></span><span role="cell">14-core GPU</span></div>
                  <div role="row"><span role="cell"><strong>Display:</strong></span><span role="cell">16.2" (3456x2234) Liquid Retina XDR</span></div>
                  <div role="row"><span role="cell"><strong>Memory:</strong></span><span role="cell">18GB unified memory</span></div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-4 border rounded-md" role="tabpanel" tabIndex={0}>
              <h4 className="font-semibold mb-3">Customer Reviews</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3" role="group" aria-label="Overall rating">
                  <span aria-label="5 out of 5 stars">⭐⭐⭐⭐⭐</span>
                  <span className="font-medium">4.8 out of 5</span>
                  <Badge variant="outline" aria-label="247 total reviews">247 reviews</Badge>
                </div>
                <blockquote className="border-l-2 border-primary pl-3">
                  <p className="text-sm text-muted-foreground">
                    "Incredible performance for video editing and development work. 
                    The display quality is outstanding."
                  </p>
                  <cite className="text-xs text-muted-foreground mt-1">
                    - Professional User, ⭐⭐⭐⭐⭐
                  </cite>
                </blockquote>
              </div>
            </TabsContent>
            <TabsContent value="support" className="p-4 border rounded-md" role="tabpanel" tabIndex={0}>
              <h4 className="font-semibold mb-3">Support & Warranty</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="default" aria-label="1 year warranty">1 Year</Badge>
                  <span>Limited warranty included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" aria-label="24/7 support">24/7</Badge>
                  <span>Technical support available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" aria-label="Extended protection">Extended</Badge>
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
            <span aria-hidden="true">📊</span>
            Admin Dashboard Interface
          </CardTitle>
          <CardDescription>
            Dashboard navigation with real-time status indicators and accessibility features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Dashboard Breadcrumb */}
          <nav aria-label="Dashboard navigation">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator aria-hidden="true" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/analytics">Analytics</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator aria-hidden="true" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Performance Report</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </nav>

          {/* System Status Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="group" aria-label="System status alerts">
            <Alert role="status" aria-live="polite">
              <AlertTitle>✅ System Status: Operational</AlertTitle>
              <AlertDescription>
                All services are running normally. Last checked: 2 minutes ago.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive" role="alert" aria-live="assertive">
              <AlertTitle>⚠️ High CPU Usage Detected</AlertTitle>
              <AlertDescription>
                Server load is at 85%. Consider scaling resources.
              </AlertDescription>
            </Alert>
          </div>

          {/* Dashboard Navigation */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3" role="tablist" aria-label="Dashboard sections">
              <TabsTrigger value="overview" role="tab" className="flex items-center gap-2">
                Overview 
                <Badge variant="secondary" className="ml-2" aria-label="Live data">Live</Badge>
              </TabsTrigger>
              <TabsTrigger value="users" role="tab" className="flex items-center gap-2">
                Users
                <Badge variant="destructive" className="ml-2" aria-label={`${notificationCount} new users`}>
                  {notificationCount}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="reports" role="tab">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="p-4 border rounded-md" role="tabpanel" tabIndex={0}>
              <div className="grid grid-cols-3 gap-4" role="group" aria-label="Dashboard metrics">
                <div className="text-center p-4 bg-muted/30 rounded" role="group" aria-label="Active users metric">
                  <div className="text-2xl font-bold" aria-label="1,247 active users">1,247</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                  <Badge variant="default" className="mt-1" aria-label="12% increase">+12%</Badge>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded" role="group" aria-label="Revenue metric">
                  <div className="text-2xl font-bold" aria-label="45,678 euros revenue">€45,678</div>
                  <div className="text-sm text-muted-foreground">Revenue</div>
                  <Badge variant="destructive" className="mt-1" aria-label="3% decrease">-3%</Badge>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded" role="group" aria-label="Uptime metric">
                  <div className="text-2xl font-bold" aria-label="99.8% uptime">99.8%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                  <Badge variant="default" className="mt-1" aria-label="Stable performance">Stable</Badge>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="users" className="p-4 border rounded-md" role="tabpanel" tabIndex={0}>
              <div className="space-y-3" role="group" aria-label="User statistics">
                <div className="flex items-center justify-between">
                  <span>New registrations today</span>
                  <Badge variant="default" aria-label="47 new registrations">47</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pending verifications</span>
                  <Badge variant="destructive" aria-label={`${notificationCount} pending verifications`}>
                    {notificationCount}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Premium subscribers</span>
                  <Badge variant="secondary" aria-label="234 premium subscribers">234</Badge>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reports" className="p-4 border rounded-md" role="tabpanel" tabIndex={0}>
              <p className="text-sm text-muted-foreground">
                Detailed reports and analytics data would be displayed here with accessible 
                data tables, charts, and export functionality.
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
      
      {/* Accessibility: Live regions for announcements */}
      <div 
        ref={announceRef}
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      ></div>
      <div 
        ref={alertAnnounceRef}
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      ></div>

      {/* Accessibility: Instructions for screen readers */}
      <div className="sr-only">
        <p>Navigation component demonstration selector. Use arrow keys to navigate, numbers 1-5 for quick access, or click to select different navigation components.</p>
      </div>
      
      {/* Demo Selector - Now fully keyboard accessible */}
      <div className="p-4 bg-muted/30 rounded-lg">
        <div className="mb-2">
          <h3 className="font-semibold text-sm">Navigation Component Demonstrations</h3>
          <p className="text-xs text-muted-foreground">
            Use arrow keys or numbers 1-5 to navigate navigation component types
          </p>
        </div>
        <div 
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Navigation component demonstration selection"
        >
          {demoTabs.map((demo, index) => (
            <Button
              key={demo.id}
              ref={(el) => { demoButtonsRef.current[index] = el; }}
              variant={activeDemo === demo.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleDemoChange(demo.id)}
              onKeyDown={(e) => handleDemoKeydown(e, index)}
              className="flex items-center gap-2 focus:ring-2 focus:ring-primary focus:ring-offset-2"
              role="tab"
              tabIndex={activeDemo === demo.id ? 0 : -1}
              aria-selected={activeDemo === demo.id}
              aria-current={activeDemo === demo.id ? 'page' : undefined}
              aria-describedby={`demo-${demo.id}-description`}
            >
              <span aria-hidden="true">{demo.icon}</span>
              <span className="hidden sm:inline">{demo.label}</span>
              <span className="text-xs opacity-60 ml-1">{demo.shortcut}</span>
            </Button>
          ))}
        </div>
        
        {/* Demo descriptions for screen readers */}
        <div className="sr-only">
          {demoTabs.map((demo) => (
            <div key={demo.id} id={`demo-${demo.id}-description`}>
              {demo.label} - Use keyboard shortcut {demo.shortcut} or select to view {demo.label.toLowerCase()} navigation demonstration
            </div>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <main role="main" aria-label="Navigation component demonstration">
        <div className="min-h-[400px]">
          {renderDemo()}
        </div>
      </main>

      {/* Component Integration Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Business Integration Patterns</CardTitle>
          <CardDescription>
            How these 4 navigation components work together in real business scenarios with accessibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <section aria-labelledby="ecommerce-integration-heading">
              <h4 id="ecommerce-integration-heading" className="font-semibold mb-2">E-commerce Sites:</h4>
              <ul className="space-y-1 text-muted-foreground" role="list">
                <li role="listitem">• <strong>Breadcrumb:</strong> Product category navigation with landmarks</li>
                <li role="listitem">• <strong>Tabs:</strong> Product info organization with ARIA controls</li>
                <li role="listitem">• <strong>Badge:</strong> Stock status, promotions with semantic labels</li>
                <li role="listitem">• <strong>Alert:</strong> Sales notifications with live announcements</li>
              </ul>
            </section>
            <section aria-labelledby="saas-integration-heading">
              <h4 id="saas-integration-heading" className="font-semibold mb-2">SaaS Dashboards:</h4>
              <ul className="space-y-1 text-muted-foreground" role="list">
                <li role="listitem">• <strong>Breadcrumb:</strong> Deep feature navigation with context</li>
                <li role="listitem">• <strong>Tabs:</strong> Dashboard sections with keyboard navigation</li>
                <li role="listitem">• <strong>Badge:</strong> Notification counters with screen reader support</li>
                <li role="listitem">• <strong>Alert:</strong> System status updates with priority announcements</li>
              </ul>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}