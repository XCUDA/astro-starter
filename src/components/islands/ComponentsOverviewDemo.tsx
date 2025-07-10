// ComponentsOverviewDemo.tsx - Quick interactive overview of all component categories
// Path: /src/components/islands/ComponentsOverviewDemo.tsx

import React, { useState } from 'react';
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

  const categories = [
    { id: 'all' as CategoryType, label: 'All Components', icon: '🧩' },
    { id: 'form' as CategoryType, label: 'Form Components', icon: '📝' },
    { id: 'navigation' as CategoryType, label: 'Navigation', icon: '🧭' },
    { id: 'data' as CategoryType, label: 'Data Display', icon: '📊' },
    { id: 'advanced' as CategoryType, label: 'Advanced', icon: '🔮' }
  ];

  const FormComponentsDemo = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📝</span>
            Form Components Demo
          </CardTitle>
          <CardDescription>
            Interactive demonstration of the 7 form components
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Contact Form Example */}
            <div className="space-y-4">
              <h4 className="font-semibold">Contact Form Example:</h4>
              
              <div>
                <Label htmlFor="demo-name">Full Name</Label>
                <Input
                  id="demo-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="demo-email">Email Address</Label>
                <Input
                  id="demo-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@company.com"
                />
              </div>

              <div>
                <Label htmlFor="demo-service">Service Needed</Label>
                <Select value={formData.service} onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-design">Web Design</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="demo-message">Project Description</Label>
                <Textarea
                  id="demo-message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Describe your project requirements..."
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="demo-newsletter"
                  checked={formData.newsletter}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, newsletter: !!checked }))}
                />
                <Label htmlFor="demo-newsletter" className="text-sm">
                  Subscribe to newsletter for updates
                </Label>
              </div>

              <div className="flex gap-2">
                <Button variant="default">Send Message</Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Preview</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Form Preview</DialogTitle>
                      <DialogDescription>
                        Here's what will be sent:
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2 text-sm">
                      <p><strong>Name:</strong> {formData.name || 'Not provided'}</p>
                      <p><strong>Email:</strong> {formData.email || 'Not provided'}</p>
                      <p><strong>Service:</strong> {formData.service || 'Not selected'}</p>
                      <p><strong>Message:</strong> {formData.message || 'No message'}</p>
                      <p><strong>Newsletter:</strong> {formData.newsletter ? 'Yes' : 'No'}</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Component Variants */}
            <div className="space-y-4">
              <h4 className="font-semibold">Button Variants:</h4>
              <div className="flex flex-wrap gap-2">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>

              <h4 className="font-semibold">Input States:</h4>
              <div className="space-y-2">
                <Input placeholder="Normal input" />
                <Input placeholder="Disabled input" disabled />
                <Input placeholder="Error state" className="border-red-500" />
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
            <span>🧭</span>
            Navigation & Feedback Components
          </CardTitle>
          <CardDescription>
            Breadcrumbs, Tabs, Alerts, and Badges for user guidance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Breadcrumbs */}
          <div>
            <h4 className="font-semibold mb-2">Breadcrumb Navigation:</h4>
            <Breadcrumb>
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
          </div>

          {/* Tabs */}
          <div>
            <h4 className="font-semibold mb-2">Tab Navigation:</h4>
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Account settings and profile information.</p>
              </TabsContent>
              <TabsContent value="security" className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Password and security preferences.</p>
              </TabsContent>
              <TabsContent value="notifications" className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Email and push notification settings.</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Alerts */}
          <div>
            <h4 className="font-semibold mb-2">Alert Messages:</h4>
            <div className="space-y-2">
              <Alert>
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  This is an informational message for users.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Something went wrong. Please try again.
                </AlertDescription>
              </Alert>
            </div>
          </div>

          {/* Badges */}
          <div>
            <h4 className="font-semibold mb-2">Status Badges:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Error</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const DataDisplayDemo = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📊</span>
            Data Display Components
          </CardTitle>
          <CardDescription>
            Tables, Avatars, Tooltips, and Accordions for information presentation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Table */}
          <div>
            <h4 className="font-semibold mb-2">Data Table:</h4>
            <Table>
              <TableCaption>Team members and their roles</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/api/placeholder/32/32" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      John Doe
                    </div>
                  </TableCell>
                  <TableCell>Developer</TableCell>
                  <TableCell>
                    <Badge variant="default">Active</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit user profile</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/api/placeholder/32/32" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      Jane Smith
                    </div>
                  </TableCell>
                  <TableCell>Designer</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Away</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit user profile</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Avatars */}
          <div>
            <h4 className="font-semibold mb-2">Avatar Variants:</h4>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/api/placeholder/32/32" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <p className="text-xs mt-1">Small</p>
              </div>
              <div className="text-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/api/placeholder/40/40" />
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>
                <p className="text-xs mt-1">Medium</p>
              </div>
              <div className="text-center">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/api/placeholder/48/48" />
                  <AvatarFallback>LG</AvatarFallback>
                </Avatar>
                <p className="text-xs mt-1">Large</p>
              </div>
            </div>
          </div>

          {/* Accordion */}
          <div>
            <h4 className="font-semibold mb-2">Collapsible Content:</h4>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What services do you offer?</AccordionTrigger>
                <AccordionContent>
                  We offer web design, development, consulting, and maintenance services for businesses of all sizes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How long does a project take?</AccordionTrigger>
                <AccordionContent>
                  Project timelines vary depending on scope and complexity. Typical websites take 2-6 weeks from start to finish.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Do you provide ongoing support?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer maintenance packages and ongoing support to ensure your website stays secure and up-to-date.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const AdvancedDemo = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🔮</span>
            Advanced Components
          </CardTitle>
          <CardDescription>
            Complex interactive elements: Calendar, Command, Sonner, Popover, Combobox, Date Picker
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Coming Soon:</h4>
              <div className="space-y-2">
                <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                  <span className="text-2xl">📅</span>
                  <p className="text-sm">Calendar Component</p>
                </div>
                <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                  <span className="text-2xl">⌘</span>
                  <p className="text-sm">Command Palette</p>
                </div>
                <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                  <span className="text-2xl">🔔</span>
                  <p className="text-sm">Sonner Notifications</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Rich Interactions:</h4>
              <div className="space-y-2">
                <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                  <span className="text-2xl">📋</span>
                  <p className="text-sm">Combobox Selection</p>
                </div>
                <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                  <span className="text-2xl">📅</span>
                  <p className="text-sm">Date Picker</p>
                </div>
                <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                  <span className="text-2xl">💬</span>
                  <p className="text-sm">Popover Content</p>
                </div>
              </div>
            </div>
          </div>

          <Alert>
            <AlertTitle>Advanced Components Status</AlertTitle>
            <AlertDescription>
              These complex components are integrated and ready for specialized showcases. 
              Visit the <strong>Advanced Components</strong> page for full interactive demonstrations.
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
      
      {/* Category Selector */}
      <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-lg">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
            className="flex items-center gap-2"
          >
            <span>{category.icon}</span>
            <span className="hidden sm:inline">{category.label}</span>
          </Button>
        ))}
      </div>

      {/* Demo Content */}
      <div className="min-h-[400px]">
        {renderDemo()}
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Explore Specialized Showcases</CardTitle>
          <CardDescription>
            Each category has its own dedicated page with detailed examples and use cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a 
              href="/form-showcase" 
              className="flex items-center p-3 rounded-lg border hover:bg-accent/50 transition-colors group"
            >
              <span className="text-xl mr-3">📝</span>
              <div>
                <div className="font-medium group-hover:text-primary transition-colors">Form Components</div>
                <div className="text-xs text-muted-foreground">Business forms & validation</div>
              </div>
            </a>
            <a 
              href="/navigation-showcase" 
              className="flex items-center p-3 rounded-lg border hover:bg-accent/50 transition-colors group"
            >
              <span className="text-xl mr-3">🧭</span>
              <div>
                <div className="font-medium group-hover:text-primary transition-colors">Navigation</div>
                <div className="text-xs text-muted-foreground">User guidance systems</div>
              </div>
            </a>
            <a 
              href="/data-display-showcase" 
              className="flex items-center p-3 rounded-lg border hover:bg-accent/50 transition-colors group"
            >
              <span className="text-xl mr-3">📊</span>
              <div>
                <div className="font-medium group-hover:text-primary transition-colors">Data Display</div>
                <div className="text-xs text-muted-foreground">Tables & information</div>
              </div>
            </a>
            <a 
              href="/advanced-showcase" 
              className="flex items-center p-3 rounded-lg border hover:bg-accent/50 transition-colors group"
            >
              <span className="text-xl mr-3">🔮</span>
              <div>
                <div className="font-medium group-hover:text-primary transition-colors">Advanced</div>
                <div className="text-xs text-muted-foreground">Complex interactions</div>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}