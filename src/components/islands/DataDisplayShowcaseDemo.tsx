// DataDisplayShowcaseDemo.tsx - Interactive demo for Data Display components
// Path: /src/components/islands/DataDisplayShowcaseDemo.tsx

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type DemoType = 'table' | 'avatar' | 'tooltip' | 'accordion' | 'combined';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  status: 'active' | 'away' | 'offline';
  avatar: string;
  department: string;
  joinDate: string;
  projects: number;
  skills: string[];
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'available' | 'low_stock' | 'out_of_stock';
  description: string;
  specifications: { [key: string]: string };
}

export default function DataDisplayShowcaseDemo() {
  const [activeDemo, setActiveDemo] = useState<DemoType>('combined');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [tableView, setTableView] = useState<'team' | 'products'>('team');

  const demoTabs = [
    { id: 'combined' as DemoType, label: 'All Combined', icon: '📊' },
    { id: 'table' as DemoType, label: 'Table', icon: '📋' },
    { id: 'avatar' as DemoType, label: 'Avatar', icon: '👤' },
    { id: 'tooltip' as DemoType, label: 'Tooltip', icon: '💬' },
    { id: 'accordion' as DemoType, label: 'Accordion', icon: '📁' }
  ];

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Lead Developer',
      email: 'sarah.johnson@company.com',
      status: 'active',
      avatar: '/api/placeholder/40/40',
      department: 'Engineering',
      joinDate: '2022-03-15',
      projects: 8,
      skills: ['React', 'TypeScript', 'Node.js', 'AWS']
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'UX Designer',
      email: 'michael.chen@company.com',
      status: 'away',
      avatar: '/api/placeholder/40/40',
      department: 'Design',
      joinDate: '2023-01-20',
      projects: 5,
      skills: ['Figma', 'User Research', 'Prototyping']
    },
    {
      id: 3,
      name: 'Emma Davis',
      role: 'Product Manager',
      email: 'emma.davis@company.com',
      status: 'active',
      avatar: '/api/placeholder/40/40',
      department: 'Product',
      joinDate: '2021-11-08',
      projects: 12,
      skills: ['Strategy', 'Analytics', 'Roadmapping']
    },
    {
      id: 4,
      name: 'Alex Rodriguez',
      role: 'Backend Developer',
      email: 'alex.rodriguez@company.com',
      status: 'offline',
      avatar: '/api/placeholder/40/40',
      department: 'Engineering',
      joinDate: '2023-06-12',
      projects: 3,
      skills: ['Python', 'PostgreSQL', 'Docker', 'Kubernetes']
    }
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'MacBook Pro 16"',
      category: 'Computers',
      price: 2499,
      stock: 15,
      status: 'available',
      description: 'Professional laptop with M3 Pro chip',
      specifications: {
        'Processor': 'Apple M3 Pro',
        'Memory': '18GB Unified',
        'Storage': '512GB SSD',
        'Display': '16.2" Liquid Retina XDR'
      }
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      category: 'Smartphones',
      price: 999,
      stock: 3,
      status: 'low_stock',
      description: 'Latest iPhone with titanium design',
      specifications: {
        'Chip': 'A17 Pro',
        'Storage': '128GB',
        'Camera': '48MP Main',
        'Display': '6.1" Super Retina XDR'
      }
    },
    {
      id: 3,
      name: 'AirPods Pro',
      category: 'Audio',
      price: 249,
      stock: 0,
      status: 'out_of_stock',
      description: 'Premium wireless earbuds',
      specifications: {
        'Chip': 'H2',
        'Battery': '6h listening',
        'Features': 'Active Noise Cancellation',
        'Case': 'MagSafe charging'
      }
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'away':
        return <Badge variant="secondary">Away</Badge>;
      case 'offline':
        return <Badge variant="outline">Offline</Badge>;
      case 'available':
        return <Badge variant="default">Available</Badge>;
      case 'low_stock':
        return <Badge variant="destructive">Low Stock</Badge>;
      case 'out_of_stock':
        return <Badge variant="outline">Out of Stock</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const TableDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📋</span>
          Data Table Component
        </CardTitle>
        <CardDescription>
          Professional data tables with sorting, status indicators, and responsive design
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Table Type Selector */}
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant={tableView === 'team' ? 'default' : 'outline'}
            onClick={() => setTableView('team')}
          >
            Team Management
          </Button>
          <Button 
            size="sm" 
            variant={tableView === 'products' ? 'default' : 'outline'}
            onClick={() => setTableView('products')}
          >
            Product Inventory
          </Button>
        </div>

        {/* Team Table */}
        {tableView === 'team' && (
          <div>
            <h4 className="font-semibold mb-3">Team Management Table:</h4>
            <div className="rounded-md border">
              <Table>
                <TableCaption>Team members and their current status</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-xs text-muted-foreground">{member.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.department}</TableCell>
                      <TableCell>{getStatusBadge(member.status)}</TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help">{member.projects}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Active projects assigned</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedMember(member)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Products Table */}
        {tableView === 'products' && (
          <div>
            <h4 className="font-semibold mb-3">Product Inventory Table:</h4>
            <div className="rounded-md border">
              <Table>
                <TableCaption>Current product inventory and availability</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 rounded-md">
                            <AvatarImage src="/api/placeholder/32/32" alt={product.name} />
                            <AvatarFallback className="rounded-md">
                              {product.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-xs text-muted-foreground">{product.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>€{product.price.toLocaleString()}</TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className={`cursor-help ${product.stock <= 5 ? 'text-destructive font-medium' : ''}`}>
                                {product.stock} units
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{product.stock <= 5 ? 'Low stock - reorder soon' : 'Stock level healthy'}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Selected Member Details */}
        {selectedMember && (
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Selected Team Member:</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><strong>Name:</strong> {selectedMember.name}</div>
              <div><strong>Role:</strong> {selectedMember.role}</div>
              <div><strong>Department:</strong> {selectedMember.department}</div>
              <div><strong>Join Date:</strong> {selectedMember.joinDate}</div>
              <div className="col-span-2">
                <strong>Skills:</strong> {selectedMember.skills.join(', ')}
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3"
              onClick={() => setSelectedMember(null)}
            >
              Close
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const AvatarDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>👤</span>
          Avatar Component
        </CardTitle>
        <CardDescription>
          User profile images with fallbacks and multiple sizes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Avatar Sizes */}
        <div>
          <h4 className="font-semibold mb-3">Avatar Sizes:</h4>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/api/placeholder/24/24" />
                <AvatarFallback>XS</AvatarFallback>
              </Avatar>
              <p className="text-xs mt-2">Extra Small</p>
            </div>
            <div className="text-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/api/placeholder/32/32" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <p className="text-xs mt-2">Small</p>
            </div>
            <div className="text-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/api/placeholder/40/40" />
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <p className="text-xs mt-2">Medium</p>
            </div>
            <div className="text-center">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/api/placeholder/48/48" />
                <AvatarFallback>LG</AvatarFallback>
              </Avatar>
              <p className="text-xs mt-2">Large</p>
            </div>
            <div className="text-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/api/placeholder/64/64" />
                <AvatarFallback>XL</AvatarFallback>
              </Avatar>
              <p className="text-xs mt-2">Extra Large</p>
            </div>
          </div>
        </div>

        {/* Avatar with Status Indicators */}
        <div>
          <h4 className="font-semibold mb-3">Status Indicators:</h4>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/api/placeholder/48/48" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-background rounded-full"></div>
              </div>
              <p className="text-xs mt-2">Online</p>
            </div>
            <div className="text-center">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/api/placeholder/48/48" />
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-yellow-500 border-2 border-background rounded-full"></div>
              </div>
              <p className="text-xs mt-2">Away</p>
            </div>
            <div className="text-center">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/api/placeholder/48/48" />
                  <AvatarFallback>ED</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-red-500 border-2 border-background rounded-full"></div>
              </div>
              <p className="text-xs mt-2">Busy</p>
            </div>
            <div className="text-center">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/api/placeholder/48/48" />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-gray-400 border-2 border-background rounded-full"></div>
              </div>
              <p className="text-xs mt-2">Offline</p>
            </div>
          </div>
        </div>

        {/* Avatar Groups */}
        <div>
          <h4 className="font-semibold mb-3">Avatar Groups:</h4>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Project Team (overlapping):</p>
              <div className="flex -space-x-2">
                <Avatar className="h-8 w-8 border-2 border-background">
                  <AvatarImage src="/api/placeholder/32/32" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border-2 border-background">
                  <AvatarImage src="/api/placeholder/32/32" />
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border-2 border-background">
                  <AvatarImage src="/api/placeholder/32/32" />
                  <AvatarFallback>ED</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border-2 border-background">
                  <AvatarFallback>+3</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Department Leads:</p>
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="h-10 w-10 cursor-help">
                        <AvatarImage src="/api/placeholder/40/40" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Sarah Johnson - Engineering Lead</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="h-10 w-10 cursor-help">
                        <AvatarImage src="/api/placeholder/40/40" />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Michael Chen - Design Lead</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="h-10 w-10 cursor-help">
                        <AvatarImage src="/api/placeholder/40/40" />
                        <AvatarFallback>ED</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Emma Davis - Product Lead</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>

        {/* Fallback Examples */}
        <div>
          <h4 className="font-semibold mb-3">Fallback Examples:</h4>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/broken-link.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <p className="text-xs mt-2">Initials Fallback</p>
            </div>
            <div className="text-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/broken-link.jpg" />
                <AvatarFallback>👤</AvatarFallback>
              </Avatar>
              <p className="text-xs mt-2">Icon Fallback</p>
            </div>
            <div className="text-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/broken-link.jpg" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">AB</AvatarFallback>
              </Avatar>
              <p className="text-xs mt-2">Gradient Fallback</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TooltipDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>💬</span>
          Tooltip Component
        </CardTitle>
        <CardDescription>
          Contextual information and help text on hover or focus
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Basic Tooltips */}
        <div>
          <h4 className="font-semibold mb-3">Basic Tooltips:</h4>
          <div className="flex gap-4 flex-wrap">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a basic tooltip</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">With description</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div>
                    <p className="font-semibold">Detailed Information</p>
                    <p className="text-xs">This tooltip contains more detailed information</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Rich content</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    <p className="font-semibold">Feature Status</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">Active</Badge>
                      <span className="text-xs">Last updated: 2 hours ago</span>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Business Context Examples */}
        <div>
          <h4 className="font-semibold mb-3">Business Context Examples:</h4>
          <div className="space-y-4">
            
            {/* Help Icons */}
            <div className="flex items-center gap-2">
              <span className="text-sm">Account Balance:</span>
              <span className="font-semibold">€1,234.56</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-4 w-4 p-0 text-muted-foreground">
                      ℹ️
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Available balance after pending transactions</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Form Field Help */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">API Key</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-4 w-4 p-0 text-muted-foreground">
                        ?
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        <p className="font-semibold">API Key Help</p>
                        <p className="text-xs">Found in Settings &gt; API Management</p>
                        <p className="text-xs">Keep this secret and secure</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <input 
                type="password" 
                placeholder="sk-..." 
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              />
            </div>

            {/* Status Indicators with Tooltips */}
            <div className="space-y-2">
              <p className="text-sm font-medium">System Status:</p>
              <div className="flex gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 cursor-help">
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">API</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div>
                        <p className="font-semibold">API Status: Operational</p>
                        <p className="text-xs">Response time: 45ms</p>
                        <p className="text-xs">Uptime: 99.9%</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 cursor-help">
                        <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Database</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div>
                        <p className="font-semibold">Database: Degraded</p>
                        <p className="text-xs">High latency detected</p>
                        <p className="text-xs">Investigation in progress</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2 cursor-help">
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">CDN</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div>
                        <p className="font-semibold">CDN: Operational</p>
                        <p className="text-xs">All regions healthy</p>
                        <p className="text-xs">Cache hit rate: 94%</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div>
          <h4 className="font-semibold mb-3">Interactive Examples:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p className="font-medium">User Actions:</p>
              <div className="space-y-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-left w-full justify-start">
                        <span className="mr-2">📧</span> Send Email
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send notification email to user</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-left w-full justify-start">
                        <span className="mr-2">🔒</span> Lock Account
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div>
                        <p className="font-semibold text-destructive">Lock Account</p>
                        <p className="text-xs">Temporarily disable access</p>
                        <p className="text-xs">User can request unlock</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="font-medium">Quick Stats:</p>
              <div className="space-y-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="p-2 border rounded cursor-help">
                        <div className="font-semibold">1,247</div>
                        <div className="text-xs text-muted-foreground">Active Users</div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div>
                        <p className="font-semibold">Active Users Breakdown</p>
                        <p className="text-xs">Online now: 423</p>
                        <p className="text-xs">Last 24h: 1,247</p>
                        <p className="text-xs">Growth: +12% vs last week</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const AccordionDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📁</span>
          Accordion Component
        </CardTitle>
        <CardDescription>
          Collapsible content sections for organizing information hierarchically
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* FAQ Example */}
        <div>
          <h4 className="font-semibold mb-3">FAQ Section:</h4>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger>What is included in the basic plan?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <p>The basic plan includes:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Up to 10 team members</li>
                    <li>5GB storage per user</li>
                    <li>Basic integrations</li>
                    <li>Email support</li>
                    <li>Mobile apps access</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger>How do I upgrade my plan?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <p>To upgrade your plan:</p>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    <li>Go to Settings → Billing</li>
                    <li>Click "Upgrade Plan"</li>
                    <li>Select your desired plan</li>
                    <li>Complete payment process</li>
                  </ol>
                  <p className="text-xs text-muted-foreground mt-2">
                    Changes take effect immediately. You'll be prorated for the current billing period.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <p>Yes, you can cancel your subscription at any time from the billing settings.</p>
                  <div className="bg-muted p-3 rounded text-xs">
                    <p className="font-medium">Note:</p>
                    <p>Your account will remain active until the end of the current billing period. 
                    All data will be preserved for 30 days after cancellation.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Product Specifications */}
        <div>
          <h4 className="font-semibold mb-3">Product Specifications:</h4>
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="specs-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <span>💻</span>
                  Technical Specifications
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-medium">Processor</p>
                    <p className="text-muted-foreground">Apple M3 Pro chip</p>
                  </div>
                  <div>
                    <p className="font-medium">Memory</p>
                    <p className="text-muted-foreground">18GB Unified Memory</p>
                  </div>
                  <div>
                    <p className="font-medium">Storage</p>
                    <p className="text-muted-foreground">512GB SSD</p>
                  </div>
                  <div>
                    <p className="font-medium">Display</p>
                    <p className="text-muted-foreground">16.2" Liquid Retina XDR</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="specs-2">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <span>📐</span>
                  Dimensions & Weight
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="font-medium">Dimensions</p>
                      <p className="text-muted-foreground">35.79 × 24.59 × 1.68 cm</p>
                    </div>
                    <div>
                      <p className="font-medium">Weight</p>
                      <p className="text-muted-foreground">2.15 kg</p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="specs-3">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <span>🔌</span>
                  Connectivity & Ports
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 3 × Thunderbolt 4 (USB-C) ports</li>
                    <li>• HDMI port</li>
                    <li>• SDXC card slot</li>
                    <li>• 3.5mm headphone jack</li>
                    <li>• MagSafe 3 charging port</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Help Documentation */}
        <div>
          <h4 className="font-semibold mb-3">Help Documentation:</h4>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="help-1">
              <AccordionTrigger>Getting Started Guide</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <h5 className="font-medium">1. Create Your Account</h5>
                    <p className="text-muted-foreground">
                      Sign up with your email address and verify your account through the confirmation email.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium">2. Set Up Your Profile</h5>
                    <p className="text-muted-foreground">
                      Complete your profile information and upload a profile picture for better team recognition.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium">3. Invite Team Members</h5>
                    <p className="text-muted-foreground">
                      Add your team members by sending invitations through the team management section.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="help-2">
              <AccordionTrigger>Troubleshooting Common Issues</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <h5 className="font-medium">Login Problems</h5>
                    <ul className="text-muted-foreground list-disc list-inside space-y-1">
                      <li>Clear browser cache and cookies</li>
                      <li>Try incognito/private browsing mode</li>
                      <li>Reset password if necessary</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium">Sync Issues</h5>
                    <ul className="text-muted-foreground list-disc list-inside space-y-1">
                      <li>Check internet connection</li>
                      <li>Force refresh the application</li>
                      <li>Contact support if issues persist</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );

  const CombinedDemo = () => (
    <div className="space-y-6">
      
      {/* Customer Management System */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>👥</span>
            Customer Management System
          </CardTitle>
          <CardDescription>
            Complete CRM interface with all 4 data display components working together
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Customer Table */}
          <div>
            <h4 className="font-semibold mb-3">Customer Database:</h4>
            <div className="rounded-md border">
              <Table>
                <TableCaption>Active customers and their account status</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/api/placeholder/32/32" />
                          <AvatarFallback>TC</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">TechCorp Inc.</div>
                          <div className="text-xs text-muted-foreground">contact@techcorp.com</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">Enterprise</Badge>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 cursor-help">
                              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                              <span>Active</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div>
                              <p className="font-semibold">Account Active</p>
                              <p className="text-xs">Billing current</p>
                              <p className="text-xs">All services operational</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>2 hours ago</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/api/placeholder/32/32" />
                          <AvatarFallback>DS</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">DesignStudio Ltd.</div>
                          <div className="text-xs text-muted-foreground">hello@designstudio.com</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">Professional</Badge>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 cursor-help">
                              <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                              <span>Payment Due</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div>
                              <p className="font-semibold">Payment Overdue</p>
                              <p className="text-xs">Invoice due: 3 days ago</p>
                              <p className="text-xs">Grace period: 7 days remaining</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>1 day ago</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Customer Details Accordion */}
          <div>
            <h4 className="font-semibold mb-3">Customer Account Details:</h4>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="account-1">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>TC</AvatarFallback>
                    </Avatar>
                    TechCorp Inc. - Account Overview
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-2">Account Information</h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Plan:</span>
                          <Badge variant="default">Enterprise</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Users:</span>
                          <span>45/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Storage:</span>
                          <span>2.3TB/5TB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Next Billing:</span>
                          <span>March 15, 2024</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Recent Activity</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          <span>User login - 2 hours ago</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                          <span>File uploaded - 4 hours ago</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                          <span>Settings updated - 1 day ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="account-2">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                    DesignStudio Ltd. - Account Overview
                    <Badge variant="destructive" className="ml-auto">Payment Due</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-2">Account Information</h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Plan:</span>
                          <Badge variant="secondary">Professional</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Users:</span>
                          <span>8/25</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Storage:</span>
                          <span>156GB/1TB</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Next Billing:</span>
                          <span className="text-destructive">Overdue (3 days)</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Payment Status</h5>
                      <div className="space-y-2 text-sm">
                        <div className="p-2 bg-destructive/10 border border-destructive/20 rounded">
                          <p className="font-medium text-destructive">Payment Required</p>
                          <p className="text-xs">Invoice #INV-2024-0089</p>
                          <p className="text-xs">Amount: €299.00</p>
                        </div>
                        <Button variant="destructive" size="sm" className="w-full">
                          Send Payment Reminder
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </CardContent>
      </Card>

      {/* Product Catalog Example */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🛍️</span>
            Product Catalog Management
          </CardTitle>
          <CardDescription>
            E-commerce product management with rich data display
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableCaption>Product inventory with detailed specifications</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-md">
                          <AvatarImage src="/api/placeholder/40/40" />
                          <AvatarFallback className="rounded-md">
                            {product.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-muted-foreground">{product.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>€{product.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className={`cursor-help ${product.stock <= 5 ? 'text-destructive font-medium' : ''}`}>
                              {product.stock} units
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div>
                              <p className="font-semibold">Stock Details</p>
                              <p className="text-xs">Available: {product.stock}</p>
                              <p className="text-xs">Reserved: 2</p>
                              <p className="text-xs">Reorder level: 5</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Manage</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDemo = () => {
    switch (activeDemo) {
      case 'table':
        return <TableDemo />;
      case 'avatar':
        return <AvatarDemo />;
      case 'tooltip':
        return <TooltipDemo />;
      case 'accordion':
        return <AccordionDemo />;
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

      {/* Business Integration Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Data Display Integration Patterns</CardTitle>
          <CardDescription>
            How these 4 components work together for professional data presentation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">CRM & Customer Management:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Table:</strong> Customer lists with filtering</li>
                <li>• <strong>Avatar:</strong> Customer profile identification</li>
                <li>• <strong>Tooltip:</strong> Quick account status details</li>
                <li>• <strong>Accordion:</strong> Expandable customer history</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Product & Inventory:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Table:</strong> Product catalog with stock levels</li>
                <li>• <strong>Avatar:</strong> Product thumbnails & images</li>
                <li>• <strong>Tooltip:</strong> Stock alerts & specifications</li>
                <li>• <strong>Accordion:</strong> Detailed product information</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}