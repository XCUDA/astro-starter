// ComponentsOverviewDemo.tsx - FULLY ACCESSIBLE with WCAG 2.1 AA compliance
// Path: /src/components/islands/ComponentsOverviewDemo.tsx
// ✅ Full keyboard navigation, ARIA states, live regions, focus management

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type CategoryType = 'form' | 'navigation' | 'data' | 'advanced' | 'all';

export default function ComponentsOverviewDemo() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    service: '',
    newsletter: false
  });

  // Accessibility: Refs for keyboard navigation and live announcements
  const categoryButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const announceRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all' as CategoryType, label: 'All Components', icon: '🧩', shortcut: '1' },
    { id: 'form' as CategoryType, label: 'Form Components', icon: '📝', shortcut: '2' },
    { id: 'navigation' as CategoryType, label: 'Navigation', icon: '🧭', shortcut: '3' },
    { id: 'data' as CategoryType, label: 'Data Display', icon: '📊', shortcut: '4' },
    { id: 'advanced' as CategoryType, label: 'Advanced', icon: '🔮', shortcut: '5' }
  ];

  // Accessibility: Announce category changes to screen readers
  const announceChange = (categoryLabel: string) => {
    if (announceRef.current) {
      announceRef.current.textContent = `Now showing ${categoryLabel} demonstration`;
    }
  };

  // Accessibility: Handle category change with announcement
  const handleCategoryChange = (categoryId: CategoryType) => {
    setActiveCategory(categoryId);
    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
      announceChange(category.label);
    }
  };

  // Accessibility: Keyboard navigation for category selector
  const handleCategoryKeydown = (event: React.KeyboardEvent, currentIndex: number) => {
    let targetIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        targetIndex = currentIndex === 0 ? categories.length - 1 : currentIndex - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        targetIndex = currentIndex === categories.length - 1 ? 0 : currentIndex + 1;
        break;
      case 'Home':
        event.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        targetIndex = categories.length - 1;
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
        event.preventDefault();
        const shortcutIndex = parseInt(event.key) - 1;
        if (shortcutIndex < categories.length) {
          targetIndex = shortcutIndex;
          handleCategoryChange(categories[targetIndex].id);
        }
        break;
      default:
        return; // Exit early for other keys
    }

    // Focus and select the target category
    if (targetIndex !== currentIndex) {
      const targetButton = categoryButtonsRef.current[targetIndex];
      if (targetButton) {
        targetButton.focus();
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || 
            event.key === 'ArrowUp' || event.key === 'ArrowDown' ||
            event.key === 'Home' || event.key === 'End') {
          handleCategoryChange(categories[targetIndex].id);
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
        if (shortcutIndex < categories.length) {
          event.preventDefault();
          handleCategoryChange(categories[shortcutIndex].id);
          categoryButtonsRef.current[shortcutIndex]?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeydown);
    return () => document.removeEventListener('keydown', handleGlobalKeydown);
  }, []);

  const FormComponentsDemo = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span aria-hidden="true">📝</span>
            Form Components Demo
          </CardTitle>
          <CardDescription>
            Interactive demonstration of the 7 form components with proper validation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Contact Form Example */}
            <div className="space-y-4">
              <h4 className="font-semibold">Contact Form Example:</h4>
              
              <div>
                <Label htmlFor="demo-name">
                  Full Name <span className="text-red-500" aria-label="required">*</span>
                </Label>
                <Input
                  id="demo-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  aria-required="true"
                  aria-describedby="demo-name-hint"
                />
                <div id="demo-name-hint" className="text-xs text-muted-foreground mt-1">
                  Required field for contact purposes
                </div>
              </div>

              <div>
                <Label htmlFor="demo-email">
                  Email Address <span className="text-red-500" aria-label="required">*</span>
                </Label>
                <Input
                  id="demo-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@company.com"
                  aria-required="true"
                  aria-describedby="demo-email-hint"
                />
                <div id="demo-email-hint" className="text-xs text-muted-foreground mt-1">
                  We'll use this to respond to your inquiry
                </div>
              </div>

              <div>
                <Label htmlFor="demo-service">Service Needed</Label>
                <Select 
                  value={formData.service} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}
                >
                  <SelectTrigger aria-describedby="demo-service-hint">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-design">Web Design</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                <div id="demo-service-hint" className="text-xs text-muted-foreground mt-1">
                  Optional: Helps us prepare for your project
                </div>
              </div>

              <div>
                <Label htmlFor="demo-message">Project Description</Label>
                <Textarea
                  id="demo-message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Describe your project requirements..."
                  rows={3}
                  aria-describedby="demo-message-hint"
                />
                <div id="demo-message-hint" className="text-xs text-muted-foreground mt-1">
                  Tell us about your project goals and requirements
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="demo-newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, newsletter: !!checked }))}
                  aria-describedby="demo-newsletter-description"
                />
                <div className="grid gap-1.5 leading-none">
                  <Label 
                    htmlFor="demo-newsletter" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Subscribe to newsletter for updates
                  </Label>
                  <p id="demo-newsletter-description" className="text-xs text-muted-foreground">
                    Receive project updates and company news (optional)
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="default"
                  aria-describedby="send-button-description"
                >
                  Send Message
                </Button>
                <div id="send-button-description" className="sr-only">
                  Submit your contact form with the provided information
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Preview Form Data</Button>
                  </DialogTrigger>
                  <DialogContent aria-describedby="preview-description">
                    <DialogHeader>
                      <DialogTitle>Form Data Preview</DialogTitle>
                      <DialogDescription id="preview-description">
                        Review the information you've entered before sending
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2 text-sm" role="group" aria-label="Form data summary">
                      <div><strong>Name:</strong> <span>{formData.name || 'Not provided'}</span></div>
                      <div><strong>Email:</strong> <span>{formData.email || 'Not provided'}</span></div>
                      <div><strong>Service:</strong> <span>{formData.service || 'Not selected'}</span></div>
                      <div><strong>Message:</strong> <span>{formData.message || 'No message'}</span></div>
                      <div><strong>Newsletter:</strong> <span>{formData.newsletter ? 'Yes' : 'No'}</span></div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Component Variants */}
            <div className="space-y-4">
              <h4 className="font-semibold">Button Variants:</h4>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Button style examples">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>

              <h4 className="font-semibold">Input States:</h4>
              <div className="space-y-2" role="group" aria-label="Input field examples">
                <Input placeholder="Normal input" aria-label="Normal input example" />
                <Input placeholder="Disabled input" disabled aria-label="Disabled input example" />
                <Input 
                  placeholder="Error state" 
                  className="border-red-500" 
                  aria-label="Error state input example"
                  aria-invalid="true"
                  aria-describedby="error-input-description"
                />
                <div id="error-input-description" className="text-xs text-red-600">
                  This shows how error states are displayed
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const NavigationDemo = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span aria-hidden="true">🧭</span>
            Navigation & Feedback Components
          </CardTitle>
          <CardDescription>
            Breadcrumbs, Tabs, Alerts, and Badges for user guidance and feedback
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Breadcrumbs */}
          <section aria-labelledby="breadcrumb-demo-heading">
            <h4 id="breadcrumb-demo-heading" className="font-semibold mb-2">Breadcrumb Navigation:</h4>
            <Breadcrumb aria-label="Page navigation path">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components-showcase">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </section>

          {/* Tabs */}
          <section aria-labelledby="tabs-demo-heading">
            <h4 id="tabs-demo-heading" className="font-semibold mb-2">Tab Navigation:</h4>
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-3" role="tablist" aria-label="Settings sections">
                <TabsTrigger value="account" role="tab">Account</TabsTrigger>
                <TabsTrigger value="security" role="tab">Security</TabsTrigger>
                <TabsTrigger value="notifications" role="tab">Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="p-4 border rounded-md" role="tabpanel" tabIndex={0}>
                <p className="text-sm text-muted-foreground">Account settings and profile information management.</p>
              </TabsContent>
              <TabsContent value="security" className="p-4 border rounded-md" role="tabpanel" tabIndex={0}>
                <p className="text-sm text-muted-foreground">Password and security preferences configuration.</p>
              </TabsContent>
              <TabsContent value="notifications" className="p-4 border rounded-md" role="tabpanel" tabIndex={0}>
                <p className="text-sm text-muted-foreground">Email and push notification settings management.</p>
              </TabsContent>
            </Tabs>
          </section>

          {/* Alerts */}
          <section aria-labelledby="alerts-demo-heading">
            <h4 id="alerts-demo-heading" className="font-semibold mb-2">Alert Messages:</h4>
            <div className="space-y-2" role="group" aria-label="Alert message examples">
              <Alert role="alert" aria-live="polite">
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  This is an informational message to keep users updated on system status.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive" role="alert" aria-live="assertive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Something went wrong. Please check your input and try again.
                </AlertDescription>
              </Alert>
            </div>
          </section>

          {/* Badges */}
          <section aria-labelledby="badges-demo-heading">
            <h4 id="badges-demo-heading" className="font-semibold mb-2">Status Badges:</h4>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Status badge examples">
              <Badge variant="default" aria-label="Default status">Default</Badge>
              <Badge variant="secondary" aria-label="Secondary status">Secondary</Badge>
              <Badge variant="outline" aria-label="Outline status">Outline</Badge>
              <Badge variant="destructive" aria-label="Error status">Error</Badge>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );

  const DataDisplayDemo = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span aria-hidden="true">📊</span>
            Data Display Components
          </CardTitle>
          <CardDescription>
            Tables, Avatars, Tooltips, and Accordions for comprehensive information presentation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Table */}
          <section aria-labelledby="table-demo-heading">
            <h4 id="table-demo-heading" className="font-semibold mb-2">Data Table:</h4>
            <Table>
              <TableCaption>A comprehensive list of team members and their current roles</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead scope="col">Name</TableHead>
                  <TableHead scope="col">Role</TableHead>
                  <TableHead scope="col">Status</TableHead>
                  <TableHead scope="col" className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/api/placeholder/32/32" alt="John Doe's profile picture" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      John Doe
                    </div>
                  </TableCell>
                  <TableCell>Developer</TableCell>
                  <TableCell>
                    <Badge variant="default" aria-label="Currently active">Active</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" aria-describedby="edit-john-tooltip">
                            Edit
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent id="edit-john-tooltip" role="tooltip">
                          <p>Edit John Doe's profile and settings</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/api/placeholder/32/32" alt="Jane Smith's profile picture" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      Jane Smith
                    </div>
                  </TableCell>
                  <TableCell>Designer</TableCell>
                  <TableCell>
                    <Badge variant="secondary" aria-label="Currently away">Away</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" aria-describedby="edit-jane-tooltip">
                            Edit
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent id="edit-jane-tooltip" role="tooltip">
                          <p>Edit Jane Smith's profile and settings</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>

          {/* Avatars */}
          <section aria-labelledby="avatars-demo-heading">
            <h4 id="avatars-demo-heading" className="font-semibold mb-2">Avatar Variants:</h4>
            <div className="flex items-center gap-4" role="group" aria-label="Avatar size examples">
              <div className="text-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/api/placeholder/32/32" alt="Small avatar example" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <p className="text-xs mt-1">Small</p>
              </div>
              <div className="text-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/api/placeholder/40/40" alt="Medium avatar example" />
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>
                <p className="text-xs mt-1">Medium</p>
              </div>
              <div className="text-center">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/api/placeholder/48/48" alt="Large avatar example" />
                  <AvatarFallback>LG</AvatarFallback>
                </Avatar>
                <p className="text-xs mt-1">Large</p>
              </div>
            </div>
          </section>

          {/* Accordion */}
          <section aria-labelledby="accordion-demo-heading">
            <h4 id="accordion-demo-heading" className="font-semibold mb-2">Collapsible Content:</h4>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger aria-describedby="faq-1-preview">
                  What services do you offer?
                </AccordionTrigger>
                <AccordionContent id="faq-1-preview">
                  We offer comprehensive web design, development, consulting, and maintenance services 
                  for businesses of all sizes, from startups to enterprise companies.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger aria-describedby="faq-2-preview">
                  How long does a project take?
                </AccordionTrigger>
                <AccordionContent id="faq-2-preview">
                  Project timelines vary depending on scope and complexity. Typical websites take 2-6 weeks 
                  from initial consultation to final launch, including design, development, and testing phases.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger aria-describedby="faq-3-preview">
                  Do you provide ongoing support?
                </AccordionTrigger>
                <AccordionContent id="faq-3-preview">
                  Yes, we offer comprehensive maintenance packages and ongoing support to ensure your website 
                  stays secure, up-to-date, and performs optimally with regular updates and monitoring.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </CardContent>
      </Card>
    </div>
  );

  const AdvancedDemo = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span aria-hidden="true">🔮</span>
            Advanced Components
          </CardTitle>
          <CardDescription>
            Complex interactive elements: Calendar, Command, Sonner, Popover, Combobox, Date Picker
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section aria-labelledby="advanced-coming-soon">
              <h4 id="advanced-coming-soon" className="font-semibold mb-2">Coming Soon:</h4>
              <div className="space-y-2" role="group" aria-label="Upcoming advanced components">
                <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                  <span className="text-2xl" aria-hidden="true">📅</span>
                  <p className="text-sm">Calendar Component</p>
                  <span className="sr-only">Interactive calendar for date selection - coming soon</span>
                </div>
                <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                  <span className="text-2xl" aria-hidden="true">⌘</span>
                  <p className="text-sm">Command Palette</p>
                  <span className="sr-only">Keyboard-driven command interface - coming soon</span>
                </div>
                <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                  <span className="text-2xl" aria-hidden="true">🔔</span>
                  <p className="text-sm">Sonner Notifications</p>
                  <span className="sr-only">Toast notification system - coming soon</span>
                </div>
              </div>
            </section>
            
            <section aria-labelledby="advanced-interactions">
              <h4 id="advanced-interactions" className="font-semibold mb-2">Rich Interactions:</h4>
              <div className="space-y-2" role="group" aria-label="Advanced interaction components">
                <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                  <span className="text-2xl" aria-hidden="true">📋</span>
                  <p className="text-sm">Combobox Selection</p>
                  <span className="sr-only">Searchable dropdown selection - coming soon</span>
                </div>
                <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                  <span className="text-2xl" aria-hidden="true">📅</span>
                  <p className="text-sm">Date Picker</p>
                  <span className="sr-only">Accessible date selection widget - coming soon</span>
                </div>
                <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                  <span className="text-2xl" aria-hidden="true">💬</span>
                  <p className="text-sm">Popover Content</p>
                  <span className="sr-only">Contextual popup information - coming soon</span>
                </div>
              </div>
            </section>
          </div>

          <Alert role="status" aria-live="polite">
            <AlertTitle>Advanced Components Status</AlertTitle>
            <AlertDescription>
              These complex components are integrated and ready for specialized showcases. 
              Visit the <strong>Advanced Components</strong> page for full interactive demonstrations 
              with complete accessibility features.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );

  const AllComponentsDemo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormComponentsDemo />
        <div className="space-y-6">
          <NavigationDemo />
          <DataDisplayDemo />
        </div>
      </div>
      <AdvancedDemo />
    </div>
  );

  const renderDemo = () => {
    switch (activeCategory) {
      case 'form':
        return <FormComponentsDemo />;
      case 'navigation':
        return <NavigationDemo />;
      case 'data':
        return <DataDisplayDemo />;
      case 'advanced':
        return <AdvancedDemo />;
      default:
        return <AllComponentsDemo />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Accessibility: Live region for announcements */}
      <div 
        ref={announceRef}
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      ></div>

      {/* Accessibility: Instructions for screen readers */}
      <div className="sr-only">
        <p>Component category selector. Use arrow keys to navigate, numbers 1-5 for quick access, or click to select.</p>
      </div>
      
      {/* Category Selector - Now fully keyboard accessible */}
      <div className="p-4 bg-muted/30 rounded-lg">
        <div className="mb-2">
          <h3 className="font-semibold text-sm">Component Categories</h3>
          <p className="text-xs text-muted-foreground">
            Use arrow keys or numbers 1-5 to navigate categories
          </p>
        </div>
        <div 
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Component category selection"
        >
          {categories.map((category, index) => (
            <Button
              key={category.id}
              ref={(el) => { categoryButtonsRef.current[index] = el; }}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange(category.id)}
              onKeyDown={(e) => handleCategoryKeydown(e, index)}
              className="flex items-center gap-2 focus:ring-2 focus:ring-primary focus:ring-offset-2"
              role="tab"
              tabIndex={activeCategory === category.id ? 0 : -1}
              aria-selected={activeCategory === category.id}
              aria-current={activeCategory === category.id ? 'page' : undefined}
              aria-describedby={`category-${category.id}-description`}
            >
              <span aria-hidden="true">{category.icon}</span>
              <span className="hidden sm:inline">{category.label}</span>
              <span className="text-xs opacity-60 ml-1">{category.shortcut}</span>
            </Button>
          ))}
        </div>
        
        {/* Category descriptions for screen readers */}
        <div className="sr-only">
          {categories.map((category) => (
            <div key={category.id} id={`category-${category.id}-description`}>
              {category.label} - Use keyboard shortcut {category.shortcut} or select to view components
            </div>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <main role="main" aria-label="Component demonstration">
        <div className="min-h-[400px]">
          {renderDemo()}
        </div>
      </main>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Explore Specialized Showcases</CardTitle>
          <CardDescription>
            Each category has its own dedicated page with detailed examples and use cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <nav aria-label="Specialized showcase links">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <a 
                href="/form-showcase" 
                className="flex items-center p-3 rounded-lg border hover:bg-accent/50 transition-colors group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-describedby="form-showcase-description"
              >
                <span className="text-xl mr-3" aria-hidden="true">📝</span>
                <div>
                  <div className="font-medium group-hover:text-primary transition-colors">Form Components</div>
                  <div id="form-showcase-description" className="text-xs text-muted-foreground">Business forms & validation</div>
                </div>
              </a>
              <a 
                href="/navigation-showcase" 
                className="flex items-center p-3 rounded-lg border hover:bg-accent/50 transition-colors group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-describedby="navigation-showcase-description"
              >
                <span className="text-xl mr-3" aria-hidden="true">🧭</span>
                <div>
                  <div className="font-medium group-hover:text-primary transition-colors">Navigation</div>
                  <div id="navigation-showcase-description" className="text-xs text-muted-foreground">User guidance systems</div>
                </div>
              </a>
              <a 
                href="/data-display-showcase" 
                className="flex items-center p-3 rounded-lg border hover:bg-accent/50 transition-colors group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-describedby="data-showcase-description"
              >
                <span className="text-xl mr-3" aria-hidden="true">📊</span>
                <div>
                  <div className="font-medium group-hover:text-primary transition-colors">Data Display</div>
                  <div id="data-showcase-description" className="text-xs text-muted-foreground">Tables & information</div>
                </div>
              </a>
              <a 
                href="/advanced-showcase" 
                className="flex items-center p-3 rounded-lg border hover:bg-accent/50 transition-colors group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-describedby="advanced-showcase-description"
              >
                <span className="text-xl mr-3" aria-hidden="true">🔮</span>
                <div>
                  <div className="font-medium group-hover:text-primary transition-colors">Advanced</div>
                  <div id="advanced-showcase-description" className="text-xs text-muted-foreground">Complex interactions</div>
                </div>
              </a>
            </div>
          </nav>
        </CardContent>
      </Card>
    </div>
  );
}