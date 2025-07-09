// InteractiveDemo.tsx - First React Island showcasing shadcn/ui integration
// This component demonstrates how to create interactive elements within Astro's Islands architecture

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function InteractiveDemo() {
  // State management works perfectly within React Islands
  const [clickCount, setClickCount] = useState(0);
  const [currentVariant, setCurrentVariant] = useState<'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'>('default');

  // Array of button variants to demonstrate shadcn/ui flexibility
  const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;

  const handleClick = () => {
    setClickCount(prev => prev + 1);
    // Cycle through variants on each click
    const currentIndex = variants.indexOf(currentVariant);
    const nextIndex = (currentIndex + 1) % variants.length;
    setCurrentVariant(variants[nextIndex]);
  };

  const resetDemo = () => {
    setClickCount(0);
    setCurrentVariant('default');
  };

  return (
    <div 
      className="bg-card border border-border rounded-xl p-8 max-w-2xl mx-auto"
      role="region"
      aria-label="Interactive React Island demonstration with button variants"
    >
      {/* Header section explaining the demo */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-card-foreground mb-3">
          🏝️ Interactive Island Demo
        </h3>
        <p className="text-muted-foreground">
          This entire section is a React Island that hydrates only when needed.
          The rest of the page remains static HTML for optimal performance.
        </p>
      </div>

      {/* Interactive counter display */}
      <div 
        className="bg-accent/30 rounded-lg p-6 mb-6 text-center"
        role="status"
        aria-live="polite"
        aria-label="Button interaction counter and current variant display"
      >
        <div 
          className="text-4xl font-bold text-primary mb-2"
          aria-label={`${clickCount} button clicks recorded`}
        >
          {clickCount}
        </div>
        <div className="text-sm text-muted-foreground">
          Button clicks • Current variant: <span className="font-mono bg-muted px-2 py-1 rounded">{currentVariant}</span>
        </div>
      </div>

      {/* Main interactive button showcasing current variant */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <Button 
          variant={currentVariant}
          size="lg"
          onClick={handleClick}
          className="min-w-48 transition-all duration-300"
          aria-label={`Click to increment counter and cycle to next variant. Current: ${currentVariant}, Count: ${clickCount}`}
        >
          Click me! ({currentVariant})
        </Button>
        
        <p className="text-sm text-muted-foreground text-center">
          ↑ This button changes variant with each click, demonstrating shadcn/ui's design system
        </p>
      </div>

      {/* Button showcase grid showing all variants */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-card-foreground text-center">
          All Button Variants Available
        </h4>
        
        <div 
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
          role="group"
          aria-label="Button variant selection grid"
        >
          {variants.map((variant) => (
            <Button
              key={variant}
              variant={variant}
              size="sm"
              onClick={() => setCurrentVariant(variant)}
              className={`transition-all duration-200 ${
                currentVariant === variant 
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                  : ''
              }`}
              aria-pressed={currentVariant === variant}
              aria-label={`Select ${variant} variant for main button ${currentVariant === variant ? '(currently selected)' : ''}`}
            >
              {variant}
            </Button>
          ))}
        </div>
      </div>

      {/* Reset functionality */}
      <div className="flex justify-center mt-8">
        <Button 
          variant="outline" 
          size="sm"
          onClick={resetDemo}
          className="text-xs"
          aria-label="Reset demonstration: set counter to 0 and variant to default"
        >
          🔄 Reset Demo
        </Button>
      </div>

      {/* Technical information about this Island */}
      <div 
        className="mt-8 p-4 bg-muted/50 rounded-lg"
        role="region"
        aria-label="Technical details about React Island architecture"
      >
        <h5 className="font-semibold text-sm text-muted-foreground mb-2">
          🔧 Technical Details:
        </h5>
        <ul className="text-xs text-muted-foreground space-y-1" role="list">
          <li role="listitem">• This component is a React Island that hydrates independently</li>
          <li role="listitem">• State management works normally within the Island boundary</li>
          <li role="listitem">• shadcn/ui components integrate seamlessly with TailwindCSS 4</li>
          <li role="listitem">• All interactions remain within this Island scope</li>
          <li role="listitem">• The rest of the page stays static for optimal performance</li>
        </ul>
      </div>
    </div>
  );
}