import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const BreadcrumbsDemo = () => {
  const [currentPath, setCurrentPath] = useState('ecommerce');
  const announceRef = useRef<HTMLDivElement>(null);

  const announceChange = (message: string) => {
    if (announceRef.current) {
      announceRef.current.textContent = message;
    }
  };

  const breadcrumbPaths = {
    ecommerce: {
      title: 'E-commerce Product Page',
      description: 'Shopping site with category navigation',
      breadcrumbs: [
        { name: 'Home', href: '/', icon: '🏠' },
        { name: 'Categories', href: '/categories', icon: '📂' },
        { name: 'Women\'s Fashion', href: '/categories/womens', icon: '👗' },
        { name: 'Dresses', href: '/categories/womens/dresses', icon: '👚' },
        { name: 'Summer Collection', href: '/categories/womens/dresses/summer', icon: '☀️' },
        { name: 'Floral Maxi Dress', href: '#', icon: '🌸', current: true }
      ]
    },
    corporate: {
      title: 'Corporate Documentation',
      description: 'Business documentation with departments',
      breadcrumbs: [
        { name: 'Intranet', href: '/', icon: '🏢' },
        { name: 'Departments', href: '/departments', icon: '🏬' },
        { name: 'Human Resources', href: '/departments/hr', icon: '👥' },
        { name: 'Policies', href: '/departments/hr/policies', icon: '📋' },
        { name: 'Employee Handbook', href: '#', icon: '📖', current: true }
      ]
    },
    saas: {
      title: 'SaaS Platform Dashboard',
      description: 'Software platform with feature navigation',
      breadcrumbs: [
        { name: 'Dashboard', href: '/', icon: '📊' },
        { name: 'Analytics', href: '/analytics', icon: '📈' },
        { name: 'Reports', href: '/analytics/reports', icon: '📄' },
        { name: 'Custom Reports', href: '/analytics/reports/custom', icon: '🔧' },
        { name: 'Q4 Performance Report', href: '#', icon: '📑', current: true }
      ]
    },
    education: {
      title: 'Educational Platform',
      description: 'Learning management system navigation',
      breadcrumbs: [
        { name: 'Campus Portal', href: '/', icon: '🎓' },
        { name: 'Courses', href: '/courses', icon: '📚' },
        { name: 'Computer Science', href: '/courses/cs', icon: '💻' },
        { name: 'Web Development', href: '/courses/cs/webdev', icon: '🌐' },
        { name: 'React Fundamentals', href: '/courses/cs/webdev/react', icon: '⚛️' },
        { name: 'Assignment 3', href: '#', icon: '📝', current: true }
      ]
    },
    blog: {
      title: 'Blog Article',
      description: 'Content site with categories and tags',
      breadcrumbs: [
        { name: 'Blog', href: '/', icon: '✍️' },
        { name: 'Technology', href: '/category/tech', icon: '⚡' },
        { name: 'Web Development', href: '/category/tech/webdev', icon: '🌐' },
        { name: '10 Tips for Better React Performance', href: '#', icon: '📄', current: true }
      ]
    }
  };

  const breadcrumbVariants = {
    minimal: {
      name: 'Minimal',
      description: 'Clean and simple design',
      bgClass: 'bg-transparent',
      separatorColor: 'text-muted-foreground/50',
      linkClass: 'text-muted-foreground hover:text-foreground px-2 py-1 rounded transition-colors',
      currentClass: 'text-foreground font-medium px-2 py-1 rounded bg-muted/50'
    },
    outlined: {
      name: 'Outlined',
      description: 'Bordered breadcrumb items',
      bgClass: 'bg-muted/30 border border-border rounded-lg',
      separatorColor: 'text-primary',
      linkClass: 'text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md border border-transparent hover:border-border hover:bg-background/50 transition-all',
      currentClass: 'text-primary font-medium px-3 py-1.5 rounded-md border border-primary/30 bg-primary/10'
    },
    filled: {
      name: 'Filled',
      description: 'Solid background breadcrumbs',
      bgClass: 'bg-gradient-to-r from-primary/5 to-secondary/5 border border-border rounded-lg',
      separatorColor: 'text-primary/70',
      linkClass: 'text-foreground bg-background/80 hover:bg-background px-3 py-2 rounded-md border border-border/50 hover:border-border hover:shadow-sm transition-all',
      currentClass: 'text-primary-foreground font-medium px-3 py-2 rounded-md bg-primary shadow-sm'
    },
    pills: {
      name: 'Pills',
      description: 'Rounded pill-style breadcrumbs',
      bgClass: 'bg-muted/50 rounded-full border border-border',
      separatorColor: 'text-muted-foreground',
      linkClass: 'text-muted-foreground hover:text-foreground hover:bg-background/80 px-4 py-2 rounded-full transition-all hover:shadow-sm',
      currentClass: 'text-primary-foreground font-medium px-4 py-2 rounded-full bg-primary shadow-md'
    },
    modern: {
      name: 'Modern',
      description: 'Contemporary with subtle shadows',
      bgClass: 'bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl shadow-sm',
      separatorColor: 'text-primary/60',
      linkClass: 'text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted/50 transition-all hover:scale-105',
      currentClass: 'text-foreground font-semibold px-3 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30'
    }
  };

  const [currentVariant, setCurrentVariant] = useState('minimal');
  const variant = breadcrumbVariants[currentVariant as keyof typeof breadcrumbVariants];
  const pathData = breadcrumbPaths[currentPath as keyof typeof breadcrumbPaths];

  const handlePathChange = (path: string) => {
    setCurrentPath(path);
    announceChange(`Switched to ${breadcrumbPaths[path as keyof typeof breadcrumbPaths].title} example`);
  };

  const handleVariantChange = (variantName: string) => {
    setCurrentVariant(variantName);
    announceChange(`Breadcrumb style changed to ${variantName}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span aria-hidden="true">📍</span>
          <span>Interactive Breadcrumbs Demo</span>
        </CardTitle>
        <CardDescription>
          Breadcrumbs adaptatifs avec 5 styles visuels distincts et cas d'usage réalistes
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Live Region */}
        <div ref={announceRef} className="sr-only" aria-live="polite"></div>

        {/* Path Type Selector */}
        <div className="mb-6 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-medium mb-3">Choose Navigation Context:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {Object.entries(breadcrumbPaths).map(([key, path]) => (
              <Button
                key={key}
                variant={currentPath === key ? "default" : "outline"}
                size="sm"
                onClick={() => handlePathChange(key)}
                className="text-xs flex flex-col items-center space-y-1 h-auto py-3"
              >
                <span>{path.breadcrumbs[0].icon}</span>
                <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Style Variant Selector */}
        <div className="mb-6 p-4 bg-secondary/20 rounded-lg">
          <h3 className="font-medium mb-3">Choose Visual Style:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {Object.entries(breadcrumbVariants).map(([key, style]) => (
              <Button
                key={key}
                variant={currentVariant === key ? "default" : "outline"}
                size="sm"
                onClick={() => handleVariantChange(key)}
                className="text-xs flex flex-col items-center space-y-1 h-auto py-3"
              >
                <span className="font-semibold">{style.name}</span>
                <span className="text-xs text-muted-foreground text-center">{style.description}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Current Example Info */}
        <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">{pathData.breadcrumbs[0].icon}</span>
            <div>
              <h4 className="font-semibold text-foreground">{pathData.title}</h4>
              <p className="text-sm text-muted-foreground">{pathData.description}</p>
              <div className="mt-2 flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">{variant.name} Style</Badge>
                <Badge variant="secondary" className="text-xs">{pathData.breadcrumbs.length} Levels</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumbs Demo */}
        <div className="mb-6">
          <nav 
            aria-label="Breadcrumb navigation demo"
            className={`w-full transition-all duration-500 ${variant.bgClass}`}
          >
            <div className="px-4 py-3">
              <ol className="flex flex-wrap items-center gap-2 text-sm" role="list">
                {pathData.breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center" role="listitem">
                    
                    {/* Separator (except for first item) */}
                    {index > 0 && (
                      <svg 
                        className={`w-4 h-4 mx-2 flex-shrink-0 ${variant.separatorColor} transition-colors duration-300`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    )}

                    {/* Breadcrumb Item */}
                    {crumb.current ? (
                      <span 
                        className={`flex items-center space-x-2 ${variant.currentClass} transition-all duration-300`}
                        aria-current="page"
                      >
                        <span className="text-base" aria-hidden="true">{crumb.icon}</span>
                        <span className="max-w-32 md:max-w-none truncate">{crumb.name}</span>
                      </span>
                    ) : (
                      <a
                        href={crumb.href}
                        className={`flex items-center space-x-2 ${variant.linkClass} transition-all duration-300`}
                        aria-label={`Navigate to ${crumb.name}`}
                      >
                        <span className="text-base" aria-hidden="true">{crumb.icon}</span>
                        <span className="max-w-32 md:max-w-none truncate">{crumb.name}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ol>

              {/* Additional Context for Business variants */}
              {(currentVariant === 'filled' || currentVariant === 'modern') && (
                <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    <span>Current: <strong>{pathData.breadcrumbs.find(b => b.current)?.name}</strong></span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <button className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                      </svg>
                      <span>Back</span>
                    </button>
                    <button className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                      </svg>
                      <span>Home</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Features Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <h4 className="font-medium text-green-700 dark:text-green-300 mb-2 flex items-center space-x-2">
              <span>🎯</span>
              <span>Business Benefits</span>
            </h4>
            <ul className="text-sm space-y-1 text-green-600 dark:text-green-400">
              <li>• Improved user navigation experience</li>
              <li>• Reduced bounce rate & user confusion</li>
              <li>• Better SEO with structured data</li>
              <li>• Clear site hierarchy communication</li>
            </ul>
          </div>
          
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2 flex items-center space-x-2">
              <span>⚡</span>
              <span>Technical Features</span>
            </h4>
            <ul className="text-sm space-y-1 text-blue-600 dark:text-blue-400">
              <li>• Automatic JSON-LD structured data</li>
              <li>• WCAG 2.1 AA accessibility compliance</li>
              <li>• Mobile-responsive truncation</li>
              <li>• Keyboard navigation support</li>
            </ul>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium mb-3">💼 Perfect For:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              <span><strong>E-commerce:</strong> Product category navigation</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span><strong>Corporate:</strong> Document & department structure</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span><strong>SaaS:</strong> Feature & dashboard navigation</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span><strong>Education:</strong> Course & lesson hierarchy</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              <span><strong>Content:</strong> Blog categories & archives</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
              <span><strong>Support:</strong> Help documentation paths</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreadcrumbsDemo;