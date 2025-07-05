// ContentBlocks.tsx - Interactive React Components for Grid System
// Business-ready blocks with animations and interactivity
// Path: src/components/islands/ContentBlocks.tsx

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

// Feature Tabs Component - Interactive tabbed content
export function FeatureTabs() {
  const [activeTab, setActiveTab] = useState('performance');

  const features = {
    performance: {
      title: 'Lightning Performance',
      description: 'Optimized for speed and Core Web Vitals',
      icon: '⚡',
      metrics: [
        { label: 'Page Load', value: '<1s', color: 'text-green-500' },
        { label: 'Lighthouse', value: '100', color: 'text-green-500' },
        { label: 'Bundle Size', value: 'Minimal', color: 'text-blue-500' }
      ]
    },
    development: {
      title: 'Developer Experience',
      description: 'Modern tooling and best practices',
      icon: '🔧',
      metrics: [
        { label: 'TypeScript', value: 'Strict', color: 'text-blue-500' },
        { label: 'Hot Reload', value: 'Instant', color: 'text-green-500' },
        { label: 'Components', value: '26+', color: 'text-purple-500' }
      ]
    },
    design: {
      title: 'Beautiful Design',
      description: 'Modern aesthetics and accessibility',
      icon: '🎨',
      metrics: [
        { label: 'Dark Mode', value: 'Native', color: 'text-purple-500' },
        { label: 'Responsive', value: 'Mobile-first', color: 'text-blue-500' },
        { label: 'WCAG', value: 'AA Compliant', color: 'text-green-500' }
      ]
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          {Object.entries(features).map(([key, feature]) => (
            <TabsTrigger key={key} value={key} className="flex items-center space-x-2">
              <span>{feature.icon}</span>
              <span className="hidden sm:inline">{feature.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(features).map(([key, feature]) => (
          <TabsContent key={key} value={key} className="mt-0">
            <Card>
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{feature.icon}</div>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
                <CardDescription className="text-lg">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6 text-center">
                  {feature.metrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

// Interactive Pricing Component with plan comparison
export function InteractivePricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState('professional');

  const plans = {
    starter: {
      name: 'Starter',
      description: 'Perfect for small projects',
      monthly: 0,
      yearly: 0,
      features: ['Basic components', 'Community support', 'MIT License'],
      popular: false,
      cta: 'Get Started'
    },
    professional: {
      name: 'Professional', 
      description: 'For serious projects',
      monthly: 99,
      yearly: 79,
      features: ['All components', 'Priority support', 'Commercial license', 'Lifetime updates'],
      popular: true,
      cta: 'Start Building'
    },
    enterprise: {
      name: 'Enterprise',
      description: 'For large organizations',
      monthly: 299,
      yearly: 249,
      features: ['Everything included', 'Custom development', 'Dedicated support', 'Training included'],
      popular: false,
      cta: 'Contact Sales'
    }
  };

  const yearlyDiscount = (planKey: string) => {
    const plan = plans[planKey as keyof typeof plans];
    if (plan.monthly === 0) return 0;
    return Math.round(((plan.monthly - plan.yearly) / plan.monthly) * 100);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Billing Toggle */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-4 bg-muted p-1 rounded-lg">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              billingPeriod === 'monthly' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 ${
              billingPeriod === 'yearly' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>Yearly</span>
            <Badge variant="secondary" className="text-xs">Save 20%</Badge>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(plans).map(([key, plan]) => (
          <Card 
            key={key}
            className={`relative transition-all duration-300 hover:scale-105 cursor-pointer ${
              plan.popular ? 'border-primary shadow-lg scale-105' : ''
            } ${
              selectedPlan === key ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedPlan(key)}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              
              <div className="mt-4">
                <div className="text-3xl font-bold text-primary">
                  {plan[billingPeriod] === 0 ? 'Free' : `$${plan[billingPeriod]}`}
                  {plan[billingPeriod] > 0 && (
                    <span className="text-sm text-muted-foreground font-normal">
                      /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  )}
                </div>
                
                {billingPeriod === 'yearly' && plan.monthly > 0 && (
                  <div className="text-sm text-green-600 mt-1">
                    Save {yearlyDiscount(key)}% vs monthly
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3 text-sm mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full" 
                variant={plan.popular ? 'default' : 'outline'}
              >
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Animated Stats Counter
export function AnimatedStats() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { 
      value: 26, 
      suffix: '+', 
      label: 'UI Components', 
      description: 'shadcn/ui components ready to use',
      color: 'text-blue-500'
    },
    { 
      value: 100, 
      suffix: '', 
      label: 'Lighthouse Score', 
      description: 'Perfect performance optimization',
      color: 'text-green-500'
    },
    { 
      value: 4, 
      suffix: '', 
      label: 'Layout Variants', 
      description: 'Different business configurations',
      color: 'text-purple-500'
    },
    { 
      value: 96, 
      suffix: '%', 
      label: 'Phase Complete', 
      description: 'Professional-grade development',
      color: 'text-orange-500'
    }
  ];

  const AnimatedNumber = ({ value, suffix, color }: { value: number; suffix: string; color: string }) => {
    const [current, setCurrent] = useState(0);
    
    useEffect(() => {
      if (!isVisible) return;
      
      const increment = value / 50;
      const timer = setInterval(() => {
        setCurrent(prev => {
          const next = prev + increment;
          if (next >= value) {
            clearInterval(timer);
            return value;
          }
          return next;
        });
      }, 30);
      
      return () => clearInterval(timer);
    }, [isVisible, value]);

    return (
      <span className={`text-4xl font-bold ${color} transition-all duration-1000`}>
        {Math.round(current)}{suffix}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="text-center hover:scale-105 transition-all duration-300">
          <CardContent className="pt-6">
            <div className="mb-2">
              <AnimatedNumber 
                value={stat.value} 
                suffix={stat.suffix} 
                color={stat.color}
              />
            </div>
            <div className="font-medium text-foreground mb-1">{stat.label}</div>
            <div className="text-xs text-muted-foreground">{stat.description}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Process Steps with Interactive Progress
export function ProcessSteps() {
  const [currentStep, setCurrentStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const steps = [
    {
      number: 1,
      title: 'Download & Install',
      description: 'Clone the repository and install dependencies with npm install',
      code: 'git clone astro-starter && npm install',
      icon: '📦'
    },
    {
      number: 2,
      title: 'Configure Design',
      description: 'Choose your color palette and customize the design system',
      code: 'npx shadcn@latest init --force',
      icon: '🎨'
    },
    {
      number: 3,
      title: 'Add Components',
      description: 'Add the shadcn/ui components you need for your project',
      code: 'npx shadcn@latest add button card dialog',
      icon: '🧩'
    },
    {
      number: 4,
      title: 'Build & Deploy',
      description: 'Build your site and deploy to your favorite platform',
      code: 'npm run build && npm run preview',
      icon: '🚀'
    }
  ];

  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 3000);
    
    return () => clearInterval(timer);
  }, [autoPlay, steps.length]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Auto-play Control */}
      <div className="text-center mb-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAutoPlay(!autoPlay)}
          className="text-sm"
        >
          {autoPlay ? '⏸️ Pause' : '▶️ Play'} Auto Demo
        </Button>
      </div>

      {/* Step Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <button
                onClick={() => {
                  setCurrentStep(index);
                  setAutoPlay(false);
                }}
                className={`w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center font-medium ${
                  index === currentStep
                    ? 'border-primary bg-primary text-primary-foreground scale-110'
                    : index < currentStep
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-muted text-muted-foreground hover:border-primary'
                }`}
              >
                {index < currentStep ? '✓' : step.number}
              </button>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 transition-all duration-500 ${
                  index < currentStep ? 'bg-green-500' : 'bg-muted'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <Card className="transition-all duration-500">
        <CardHeader className="text-center">
          <div className="text-4xl mb-2">{steps[currentStep].icon}</div>
          <CardTitle className="text-2xl">
            Step {steps[currentStep].number}: {steps[currentStep].title}
          </CardTitle>
          <CardDescription className="text-lg">
            {steps[currentStep].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg">
            <code className="text-sm font-mono text-foreground">
              {steps[currentStep].code}
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Export all components
export default {
  FeatureTabs,
  InteractivePricing,
  AnimatedStats,
  ProcessSteps
};