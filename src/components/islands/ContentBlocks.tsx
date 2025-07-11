// ContentBlocks.tsx - Interactive React Components with Phase 6+ Standards
// WCAG 2.1 AA compliant with keyboard navigation and live announcements
// Path: src/components/islands/ContentBlocks.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

// Feature Tabs Component - Enhanced with Phase 6+ Standards
export function FeatureTabs() {
  const [activeTab, setActiveTab] = useState('performance');
  const announceRef = useRef<HTMLDivElement>(null);

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

  // Phase 6+ Standards: Live announcements for screen readers
  const announceChange = (message: string) => {
    if (announceRef.current) {
      announceRef.current.textContent = message;
    }
  };

  // Phase 6+ Standards: Enhanced keyboard navigation
  const handleTabKeydown = (e: React.KeyboardEvent) => {
    const tabKeys = Object.keys(features);
    const currentIndex = tabKeys.indexOf(activeTab);

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabKeys.length - 1;
        const prevTab = tabKeys[prevIndex];
        setActiveTab(prevTab);
        announceChange(`Selected ${features[prevTab as keyof typeof features].title} tab`);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = currentIndex < tabKeys.length - 1 ? currentIndex + 1 : 0;
        const nextTab = tabKeys[nextIndex];
        setActiveTab(nextTab);
        announceChange(`Selected ${features[nextTab as keyof typeof features].title} tab`);
        break;
      case 'Home':
        e.preventDefault();
        setActiveTab(tabKeys[0]);
        announceChange(`Selected ${features[tabKeys[0] as keyof typeof features].title} tab`);
        break;
      case 'End':
        e.preventDefault();
        const lastTab = tabKeys[tabKeys.length - 1];
        setActiveTab(lastTab);
        announceChange(`Selected ${features[lastTab as keyof typeof features].title} tab`);
        break;
    }
  };

  // Handle tab change with announcements
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const feature = features[value as keyof typeof features];
    announceChange(`Switched to ${feature.title}: ${feature.description}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6" role="region" aria-label="Interactive feature demonstration with tabbed content">
      {/* Live region for announcements - Phase 6+ Standard */}
      <div ref={announceRef} className="sr-only" aria-live="polite" />

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full" onKeyDown={handleTabKeydown}>
        <TabsList 
          className="grid w-full grid-cols-3 mb-8" 
          role="tablist" 
          aria-label="Feature categories - use arrow keys to navigate"
        >
          {Object.entries(features).map(([key, feature]) => (
            <TabsTrigger 
              key={key} 
              value={key} 
              className="flex items-center space-x-2"
              aria-label={`${feature.title}: ${feature.description} - Tab ${Object.keys(features).indexOf(key) + 1} of ${Object.keys(features).length}`}
              aria-selected={activeTab === key}
            >
              <span aria-hidden="true">{feature.icon}</span>
              <span className="hidden sm:inline">{feature.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(features).map(([key, feature]) => (
          <TabsContent 
            key={key} 
            value={key} 
            className="mt-0"
            role="tabpanel"
            aria-label={`${feature.title} details and performance metrics`}
          >
            <Card role="region" aria-label={`${feature.title} feature showcase with performance data`}>
              <CardHeader className="text-center">
                <div className="text-4xl mb-2" aria-hidden="true">{feature.icon}</div>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
                <CardDescription className="text-lg">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6 text-center" role="list" aria-label={`${feature.title} performance metrics`}>
                  {feature.metrics.map((metric, index) => (
                    <div key={index} className="space-y-2" role="listitem">
                      <div 
                        className={`text-2xl font-bold ${metric.color} transition-colors duration-200`} 
                        aria-label={`${metric.label}: ${metric.value}`}
                      >
                        {metric.value}
                      </div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Keyboard Instructions */}
      <div className="text-center text-sm text-muted-foreground">
        <span>💡 Use <kbd className="px-1 bg-muted rounded text-xs">←→</kbd> arrows or <kbd className="px-1 bg-muted rounded text-xs">Home/End</kbd> to navigate tabs</span>
      </div>
    </div>
  );
}

// Interactive Pricing Component - Enhanced with Phase 6+ Standards
export function InteractivePricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const announceRef = useRef<HTMLDivElement>(null);

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

  // Phase 6+ Standards: Live announcements
  const announceChange = (message: string) => {
    if (announceRef.current) {
      announceRef.current.textContent = message;
    }
  };

  // Phase 6+ Standards: Keyboard navigation for plan selection
  const handlePlanKeydown = (e: React.KeyboardEvent) => {
    const planKeys = Object.keys(plans);
    const currentIndex = planKeys.indexOf(selectedPlan);

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          const prevPlan = planKeys[currentIndex - 1];
          setSelectedPlan(prevPlan);
          const plan = plans[prevPlan as keyof typeof plans];
          announceChange(`Selected ${plan.name} plan: ${plan.description}`);
        }
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < planKeys.length - 1) {
          const nextPlan = planKeys[currentIndex + 1];
          setSelectedPlan(nextPlan);
          const plan = plans[nextPlan as keyof typeof plans];
          announceChange(`Selected ${plan.name} plan: ${plan.description}`);
        }
        break;
      case 'Home':
        e.preventDefault();
        setSelectedPlan(planKeys[0]);
        const firstPlan = plans[planKeys[0] as keyof typeof plans];
        announceChange(`Selected ${firstPlan.name} plan: ${firstPlan.description}`);
        break;
      case 'End':
        e.preventDefault();
        const lastPlanKey = planKeys[planKeys.length - 1];
        setSelectedPlan(lastPlanKey);
        const lastPlan = plans[lastPlanKey as keyof typeof plans];
        announceChange(`Selected ${lastPlan.name} plan: ${lastPlan.description}`);
        break;
      case 'b':
        if (e.ctrlKey) {
          e.preventDefault();
          const newPeriod = billingPeriod === 'monthly' ? 'yearly' : 'monthly';
          setBillingPeriod(newPeriod);
          announceChange(`Switched to ${newPeriod} billing`);
        }
        break;
    }
  };

  const yearlyDiscount = (planKey: string) => {
    const plan = plans[planKey as keyof typeof plans];
    if (plan.monthly === 0) return 0;
    return Math.round(((plan.monthly - plan.yearly) / plan.monthly) * 100);
  };

  const handleBillingChange = (period: 'monthly' | 'yearly') => {
    setBillingPeriod(period);
    announceChange(`Switched to ${period} billing${period === 'yearly' ? ' - Save 20%' : ''}`);
  };

  const handlePlanSelection = (planKey: string) => {
    setSelectedPlan(planKey);
    const plan = plans[planKey as keyof typeof plans];
    announceChange(`Selected ${plan.name} plan: ${plan.description}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8" role="region" aria-label="Interactive pricing plans with billing options">
      {/* Live region for announcements - Phase 6+ Standard */}
      <div ref={announceRef} className="sr-only" aria-live="polite" />

      {/* Billing Toggle */}
      <div className="text-center">
        <div 
          className="inline-flex items-center space-x-4 bg-muted p-1 rounded-lg"
          role="group"
          aria-label="Billing period selection - use Ctrl+B to toggle"
        >
          <button
            onClick={() => handleBillingChange('monthly')}
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              billingPeriod === 'monthly' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-pressed={billingPeriod === 'monthly'}
            aria-label="Select monthly billing period"
          >
            Monthly
          </button>
          <button
            onClick={() => handleBillingChange('yearly')}
            className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center space-x-2 ${
              billingPeriod === 'yearly' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            aria-pressed={billingPeriod === 'yearly'}
            aria-label="Select yearly billing period with 20% discount"
          >
            <span>Yearly</span>
            <Badge variant="secondary" className="text-xs" aria-label="Save 20% with yearly billing">Save 20%</Badge>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6" 
        role="group" 
        aria-label="Pricing plan options - use arrow keys to navigate, Enter to select"
        onKeyDown={handlePlanKeydown}
        tabIndex={0}
      >
        {Object.entries(plans).map(([key, plan]) => (
          <Card 
            key={key}
            className={`relative transition-all duration-300 hover:scale-105 cursor-pointer ${
              plan.popular ? 'border-primary shadow-lg scale-105' : ''
            } ${
              selectedPlan === key ? 'ring-2 ring-primary ring-offset-2' : ''
            }`}
            onClick={() => handlePlanSelection(key)}
            role="button"
            tabIndex={0}
            aria-pressed={selectedPlan === key}
            aria-label={`${selectedPlan === key ? 'Currently selected: ' : ''}${plan.name} plan: ${plan.description} - ${plan[billingPeriod] === 0 ? 'Free' : `$${plan[billingPeriod]} per ${billingPeriod === 'monthly' ? 'month' : 'year'}`}${plan.popular ? ' - Most popular' : ''}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePlanSelection(key);
              }
            }}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground" aria-label="Most popular plan">Most Popular</Badge>
              </div>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              
              <div className="mt-4">
                <div className="text-3xl font-bold text-primary" aria-label={`Price: ${plan[billingPeriod] === 0 ? 'Free' : `$${plan[billingPeriod]} per ${billingPeriod === 'monthly' ? 'month' : 'year'}`}`}>
                  {plan[billingPeriod] === 0 ? 'Free' : `$${plan[billingPeriod]}`}
                  {plan[billingPeriod] > 0 && (
                    <span className="text-sm text-muted-foreground font-normal">
                      /{billingPeriod === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  )}
                </div>
                
                {billingPeriod === 'yearly' && plan.monthly > 0 && (
                  <div className="text-sm text-green-600 mt-1" role="status" aria-live="polite">
                    Save {yearlyDiscount(key)}% vs monthly
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3 text-sm mb-6" role="list" aria-label={`${plan.name} plan features`}>
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2" role="listitem">
                    <span className="text-green-500" aria-hidden="true">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full" 
                variant={plan.popular ? 'default' : 'outline'}
                aria-label={`${plan.cta} with ${plan.name} plan`}
                onClick={() => announceChange(`${plan.cta} button activated for ${plan.name} plan`)}
              >
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Keyboard Instructions */}
      <div className="text-center text-sm text-muted-foreground space-y-2">
        <div>💡 Use <kbd className="px-1 bg-muted rounded text-xs">←→</kbd> arrows to navigate plans, <kbd className="px-1 bg-muted rounded text-xs">Enter</kbd> to select</div>
        <div>⌨️ Press <kbd className="px-1 bg-muted rounded text-xs">Ctrl+B</kbd> to toggle billing period</div>
      </div>
    </div>
  );
}

// Animated Stats Counter - Enhanced with Phase 6+ Standards
export function AnimatedStats() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const announceRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsPlaying(true);
    }, 500);
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

  // Phase 6+ Standards: Live announcements
  const announceChange = (message: string) => {
    if (announceRef.current) {
      announceRef.current.textContent = message;
    }
  };

  // Phase 6+ Standards: Keyboard control for animation
  const handleStatsKeydown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case ' ':
      case 'Enter':
        e.preventDefault();
        const newPlayState = !isPlaying;
        setIsPlaying(newPlayState);
        announceChange(`Animation ${newPlayState ? 'started' : 'paused'}`);
        break;
      case 'r':
      case 'R':
        e.preventDefault();
        setIsVisible(false);
        setIsPlaying(false);
        setTimeout(() => {
          setIsVisible(true);
          setIsPlaying(true);
          announceChange('Animation restarted');
        }, 100);
        break;
    }
  };

  const AnimatedNumber = ({ value, suffix, color, label }: { value: number; suffix: string; color: string; label: string }) => {
    const [current, setCurrent] = useState(0);
    
    useEffect(() => {
      if (!isVisible || !isPlaying) return;
      
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
    }, [isVisible, isPlaying, value]);

    // Reset animation when not playing
    useEffect(() => {
      if (!isPlaying) {
        setCurrent(0);
      }
    }, [isPlaying]);

    return (
      <span 
        className={`text-4xl font-bold ${color} transition-all duration-1000`}
        aria-label={`${label}: ${Math.round(current)}${suffix}`}
        role="status"
        aria-live="polite"
      >
        {Math.round(current)}{suffix}
      </span>
    );
  };

  return (
    <div className="space-y-6" role="region" aria-label="Animated business statistics and metrics">
      {/* Live region for announcements - Phase 6+ Standard */}
      <div ref={announceRef} className="sr-only" aria-live="polite" />

      {/* Animation Controls */}
      <div className="text-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const newPlayState = !isPlaying;
            setIsPlaying(newPlayState);
            announceChange(`Animation ${newPlayState ? 'started' : 'paused'}`);
          }}
          onKeyDown={handleStatsKeydown}
          aria-label={`${isPlaying ? 'Pause' : 'Play'} statistics animation`}
          aria-pressed={isPlaying}
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play'} Animation
        </Button>
      </div>

      <div 
        className="grid grid-cols-2 md:grid-cols-4 gap-6" 
        tabIndex={0}
        onKeyDown={handleStatsKeydown}
        role="group"
        aria-label="Business statistics - press Space to pause/play, R to restart"
      >
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className="text-center hover:scale-105 transition-all duration-300"
            role="region"
            aria-label={`${stat.label} statistic: ${stat.description}`}
          >
            <CardContent className="pt-6">
              <div className="mb-2">
                <AnimatedNumber 
                  value={stat.value} 
                  suffix={stat.suffix} 
                  color={stat.color}
                  label={stat.label}
                />
              </div>
              <div className="font-medium text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Keyboard Instructions */}
      <div className="text-center text-sm text-muted-foreground space-y-1">
        <div>💡 Press <kbd className="px-1 bg-muted rounded text-xs">Space</kbd> to pause/play animation</div>
        <div>🔄 Press <kbd className="px-1 bg-muted rounded text-xs">R</kbd> to restart animation</div>
      </div>
    </div>
  );
}

// Process Steps with Interactive Progress - Enhanced with Phase 6+ Standards
export function ProcessSteps() {
  const [currentStep, setCurrentStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const announceRef = useRef<HTMLDivElement>(null);

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

  // Phase 6+ Standards: Live announcements
  const announceChange = (message: string) => {
    if (announceRef.current) {
      announceRef.current.textContent = message;
    }
  };

  // Phase 6+ Standards: Enhanced keyboard navigation
  const handleStepsKeydown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        if (currentStep > 0) {
          const newStep = currentStep - 1;
          setCurrentStep(newStep);
          setAutoPlay(false);
          announceChange(`Step ${steps[newStep].number}: ${steps[newStep].title}`);
        }
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        if (currentStep < steps.length - 1) {
          const newStep = currentStep + 1;
          setCurrentStep(newStep);
          setAutoPlay(false);
          announceChange(`Step ${steps[newStep].number}: ${steps[newStep].title}`);
        }
        break;
      case 'Home':
        e.preventDefault();
        setCurrentStep(0);
        setAutoPlay(false);
        announceChange(`Step 1: ${steps[0].title}`);
        break;
      case 'End':
        e.preventDefault();
        const lastStep = steps.length - 1;
        setCurrentStep(lastStep);
        setAutoPlay(false);
        announceChange(`Step ${steps[lastStep].number}: ${steps[lastStep].title}`);
        break;
      case ' ':
      case 'Enter':
        e.preventDefault();
        const newAutoPlay = !autoPlay;
        setAutoPlay(newAutoPlay);
        announceChange(`Auto-play ${newAutoPlay ? 'enabled' : 'disabled'}`);
        break;
      case 'c':
        if (e.ctrlKey) {
          e.preventDefault();
          // Copy current step code to clipboard
          navigator.clipboard.writeText(steps[currentStep].code);
          announceChange(`Copied code for ${steps[currentStep].title}`);
        }
        break;
    }
  };

  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = (prev + 1) % steps.length;
        if (nextStep === 0) {
          announceChange('Restarting process demonstration');
        } else {
          announceChange(`Step ${steps[nextStep].number}: ${steps[nextStep].title}`);
        }
        return nextStep;
      });
    }, 3000);
    
    return () => clearInterval(timer);
  }, [autoPlay, steps.length]);

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    setAutoPlay(false);
    announceChange(`Step ${steps[index].number}: ${steps[index].title}`);
  };

  const handleAutoPlayToggle = () => {
    const newAutoPlay = !autoPlay;
    setAutoPlay(newAutoPlay);
    announceChange(`Auto-play ${newAutoPlay ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8" role="region" aria-label="Interactive step-by-step process demonstration">
      {/* Live region for announcements - Phase 6+ Standard */}
      <div ref={announceRef} className="sr-only" aria-live="polite" />

      {/* Auto-play Control */}
      <div className="text-center">
        <Button
          variant="outline"
          size="sm"
          onClick={handleAutoPlayToggle}
          className="text-sm"
          aria-label={`${autoPlay ? 'Pause' : 'Resume'} automatic step progression`}
          aria-pressed={autoPlay}
        >
          {autoPlay ? '⏸️ Pause' : '▶️ Play'} Auto Demo
        </Button>
      </div>

      {/* Step Navigation */}
      <div className="flex justify-center">
        <div 
          className="flex items-center space-x-4" 
          role="group" 
          aria-label="Process step navigation - use arrow keys to navigate, Enter to toggle auto-play"
          onKeyDown={handleStepsKeydown}
          tabIndex={0}
        >
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <button
                onClick={() => handleStepClick(index)}
                className={`w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center font-medium ${
                  index === currentStep
                    ? 'border-primary bg-primary text-primary-foreground scale-110'
                    : index < currentStep
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-muted text-muted-foreground hover:border-primary'
                }`}
                aria-current={index === currentStep ? 'step' : undefined}
                aria-label={`${index < currentStep ? 'Completed step' : index === currentStep ? 'Current step' : 'Future step'} ${step.number}: ${step.title}${index === currentStep ? ' - Press Ctrl+C to copy code' : ''}`}
              >
                {index < currentStep ? '✓' : step.number}
              </button>
              {index < steps.length - 1 && (
                <div 
                  className={`w-12 h-0.5 transition-all duration-500 ${
                    index < currentStep ? 'bg-green-500' : 'bg-muted'
                  }`} 
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <Card className="transition-all duration-500" role="region" aria-label={`Step ${steps[currentStep].number} details`}>
        <CardHeader className="text-center">
          <div className="text-4xl mb-2" aria-hidden="true">{steps[currentStep].icon}</div>
          <CardTitle className="text-2xl">
            Step {steps[currentStep].number}: {steps[currentStep].title}
          </CardTitle>
          <CardDescription className="text-lg">
            {steps[currentStep].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg relative">
            <code 
              className="text-sm font-mono text-foreground block"
              role="code"
              aria-label={`Command for ${steps[currentStep].title}: ${steps[currentStep].code}`}
            >
              {steps[currentStep].code}
            </code>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0"
              onClick={() => {
                navigator.clipboard.writeText(steps[currentStep].code);
                announceChange(`Copied code for ${steps[currentStep].title}`);
              }}
              aria-label={`Copy code for ${steps[currentStep].title}`}
            >
              📋
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Keyboard Instructions */}
      <div className="text-center text-sm text-muted-foreground space-y-1">
        <div>💡 Use <kbd className="px-1 bg-muted rounded text-xs">←→</kbd> arrows to navigate steps, <kbd className="px-1 bg-muted rounded text-xs">Space</kbd> to toggle auto-play</div>
        <div>⌨️ Press <kbd className="px-1 bg-muted rounded text-xs">Ctrl+C</kbd> to copy current step code</div>
      </div>
    </div>
  );
}

// Default export for compatibility
export default {
  FeatureTabs,
  InteractivePricing,
  AnimatedStats,
  ProcessSteps
};