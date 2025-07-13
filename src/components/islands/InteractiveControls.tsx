// InteractiveControls.tsx - Interactive Animation Controls for Professional Showcase
// Provides interactive controls to explore and customize animations in real-time
// Path: src/components/islands/InteractiveControls.tsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  PageTransition, 
  AnimatedButton, 
  TypewriterEffect, 
  AnimatedCounter, 
  AnimatedProgress,
  ScrollReveal 
} from './SmoothTransitions';

// ===== INTERACTIVE ANIMATION PLAYGROUND =====

export interface AnimationPlaygroundProps {
  className?: string;
  ariaLabel?: string;
}

export function AnimationPlayground({ className, ariaLabel }: AnimationPlaygroundProps) {
  // Animation states
  const [selectedDirection, setSelectedDirection] = useState<'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'rotate'>('up');
  const [duration, setDuration] = useState(500);
  const [delay, setDelay] = useState(0);
  const [easing, setEasing] = useState<'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear'>('ease-out');
  const [triggerKey, setTriggerKey] = useState(0); // Force re-render
  
  // Screen reader announcements
  const announceRef = useRef<HTMLDivElement>(null);
  
  const announceChange = useCallback((message: string) => {
    if (announceRef.current) {
      announceRef.current.textContent = message;
      setTimeout(() => {
        if (announceRef.current) {
          announceRef.current.textContent = '';
        }
      }, 1000);
    }
  }, []);

  // Replay animation
  const replayAnimation = () => {
    setTriggerKey(prev => prev + 1);
    announceChange(`Animation replayed with ${selectedDirection} direction, ${duration}ms duration`);
  };

  // Direction options
  const directions = [
    { value: 'up', label: 'Slide Up', icon: '⬆️' },
    { value: 'down', label: 'Slide Down', icon: '⬇️' },
    { value: 'left', label: 'Slide Left', icon: '⬅️' },
    { value: 'right', label: 'Slide Right', icon: '➡️' },
    { value: 'fade', label: 'Fade In', icon: '✨' },
    { value: 'scale', label: 'Scale In', icon: '🔍' },
    { value: 'rotate', label: 'Rotate In', icon: '🔄' }
  ] as const;

  // Easing options
  const easingOptions = [
    { value: 'ease', label: 'Ease' },
    { value: 'ease-in', label: 'Ease In' },
    { value: 'ease-out', label: 'Ease Out' },
    { value: 'ease-in-out', label: 'Ease In Out' },
    { value: 'linear', label: 'Linear' }
  ] as const;

  return (
    <>
      {/* Live region for screen reader announcements */}
      <div ref={announceRef} className="sr-only" aria-live="polite" />
      
      <Card className={cn('border-2 border-primary/20', className)}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span aria-hidden="true">🎮</span>
            <span>Animation Playground</span>
          </CardTitle>
          <CardDescription>
            Experiment with different animation settings in real-time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Animation Preview Area */}
          <div className="p-8 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 min-h-[200px] flex items-center justify-center">
            <PageTransition
              key={triggerKey} // Force re-mount for replay
              config={{
                direction: selectedDirection,
                duration,
                delay,
                easing
              }}
              ariaLabel="Animation preview area"
            >
              <div className="text-center space-y-4">
                <div className="text-6xl mb-4" aria-hidden="true">🎯</div>
                <h3 className="text-xl font-semibold">Animation Preview</h3>
                <p className="text-muted-foreground">
                  Direction: {selectedDirection} | Duration: {duration}ms | Easing: {easing}
                </p>
                <Badge variant="secondary">{selectedDirection.toUpperCase()}</Badge>
              </div>
            </PageTransition>
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Direction Controls */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Animation Direction</label>
              <div className="grid grid-cols-2 gap-2">
                {directions.map((dir) => (
                  <Button
                    key={dir.value}
                    variant={selectedDirection === dir.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setSelectedDirection(dir.value);
                      announceChange(`Direction changed to ${dir.label}`);
                    }}
                    className="justify-start space-x-2"
                    aria-pressed={selectedDirection === dir.value}
                  >
                    <span aria-hidden="true">{dir.icon}</span>
                    <span>{dir.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Timing Controls */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Timing Settings</label>
              
              {/* Duration Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Duration: {duration}ms</span>
                  <span>100ms - 2000ms</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={duration}
                  onChange={(e) => {
                    const newDuration = parseInt(e.target.value);
                    setDuration(newDuration);
                    announceChange(`Duration set to ${newDuration} milliseconds`);
                  }}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Animation duration in milliseconds"
                />
              </div>

              {/* Delay Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Delay: {delay}ms</span>
                  <span>0ms - 1000ms</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={delay}
                  onChange={(e) => {
                    const newDelay = parseInt(e.target.value);
                    setDelay(newDelay);
                    announceChange(`Delay set to ${newDelay} milliseconds`);
                  }}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Animation delay in milliseconds"
                />
              </div>
            </div>
          </div>

          {/* Easing Controls */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Easing Function</label>
            <div className="flex flex-wrap gap-2">
              {easingOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={easing === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setEasing(option.value);
                    announceChange(`Easing changed to ${option.label}`);
                  }}
                  aria-pressed={easing === option.value}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-4 border-t">
            <AnimatedButton
              variant="primary"
              animation="bounce"
              onClick={replayAnimation}
              aria-label="Replay animation with current settings"
            >
              <span className="mr-2" aria-hidden="true">🔄</span>
              Replay Animation
            </AnimatedButton>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedDirection('up');
                setDuration(500);
                setDelay(0);
                setEasing('ease-out');
                announceChange('Settings reset to defaults');
              }}
              aria-label="Reset all settings to default values"
            >
              <span className="mr-2" aria-hidden="true">↩️</span>
              Reset Defaults
            </Button>
          </div>

          {/* Generated Code Preview */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-medium mb-2 flex items-center space-x-2">
              <span aria-hidden="true">💻</span>
              <span>Generated Code</span>
            </h4>
            <pre className="text-xs overflow-x-auto bg-background p-3 rounded border">
              <code>{`<PageTransition
  config={{
    direction: '${selectedDirection}',
    duration: ${duration},
    delay: ${delay},
    easing: '${easing}'
  }}
>
  <YourComponent />
</PageTransition>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

// ===== INTERACTIVE TYPEWRITER DEMO =====

export interface TypewriterPlaygroundProps {
  className?: string;
}

export function TypewriterPlayground({ className }: TypewriterPlaygroundProps) {
  const [text, setText] = useState("Experience smooth animations...");
  const [speed, setSpeed] = useState(60);
  const [showCursor, setShowCursor] = useState(true);
  const [triggerKey, setTriggerKey] = useState(0);
  
  const announceRef = useRef<HTMLDivElement>(null);
  
  const announceChange = useCallback((message: string) => {
    if (announceRef.current) {
      announceRef.current.textContent = message;
      setTimeout(() => {
        if (announceRef.current) {
          announceRef.current.textContent = '';
        }
      }, 1000);
    }
  }, []);

  const replayTypewriter = () => {
    setTriggerKey(prev => prev + 1);
    announceChange(`Typewriter replayed with ${speed}ms speed`);
  };

  const presetTexts = [
    "Experience smooth animations...",
    "Modern web applications deserve professional UX",
    "Built with performance and accessibility in mind",
    "Customizable, responsive, and production-ready"
  ];

  return (
    <>
      <div ref={announceRef} className="sr-only" aria-live="polite" />
      
      <Card className={cn('border-2 border-violet-500/20', className)}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span aria-hidden="true">⌨️</span>
            <span>Typewriter Effect Studio</span>
          </CardTitle>
          <CardDescription>
            Customize typewriter animations with real-time preview
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Typewriter Preview */}
          <div className="p-6 bg-gradient-to-r from-violet-500/5 to-primary/5 rounded-lg border min-h-[120px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl font-medium">
                <TypewriterEffect
                  key={triggerKey}
                  text={text}
                  speed={speed}
                  delay={200}
                  showCursor={showCursor}
                  ariaLabel="Interactive typewriter preview"
                />
              </div>
            </div>
          </div>

          {/* Text Input */}
          <div className="space-y-2">
            <label htmlFor="typewriter-text" className="text-sm font-medium">Custom Text</label>
            <textarea
              id="typewriter-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 border rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={2}
              placeholder="Enter your text here..."
              aria-describedby="text-help"
            />
            <p id="text-help" className="text-xs text-muted-foreground">
              Enter the text you want to animate with the typewriter effect
            </p>
          </div>

          {/* Preset Texts */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Quick Presets</label>
            <div className="flex flex-wrap gap-2">
              {presetTexts.map((preset, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setText(preset);
                    announceChange(`Text changed to preset ${index + 1}`);
                  }}
                  className="text-xs"
                >
                  Preset {index + 1}
                </Button>
              ))}
            </div>
          </div>

          {/* Speed Control */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label>Typing Speed: {speed}ms per character</label>
              <span className="text-muted-foreground">
                {speed < 50 ? 'Very Fast' : speed < 80 ? 'Fast' : speed < 120 ? 'Normal' : 'Slow'}
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              step="10"
              value={speed}
              onChange={(e) => {
                const newSpeed = parseInt(e.target.value);
                setSpeed(newSpeed);
                announceChange(`Typing speed set to ${newSpeed} milliseconds`);
              }}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Typewriter typing speed in milliseconds"
            />
          </div>

          {/* Cursor Toggle */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="show-cursor"
              checked={showCursor}
              onChange={(e) => {
                setShowCursor(e.target.checked);
                announceChange(`Cursor ${e.target.checked ? 'enabled' : 'disabled'}`);
              }}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="show-cursor" className="text-sm font-medium cursor-pointer">
              Show blinking cursor
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-center space-x-3 pt-4 border-t">
            <AnimatedButton
              variant="primary"
              animation="pulse"
              onClick={replayTypewriter}
              aria-label="Replay typewriter animation"
            >
              <span className="mr-2" aria-hidden="true">▶️</span>
              Replay Effect
            </AnimatedButton>
          </div>

          {/* Code Preview */}
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-medium mb-2">Generated Code</h4>
            <pre className="text-xs overflow-x-auto bg-background p-3 rounded border">
              <code>{`<TypewriterEffect
  text="${text}"
  speed={${speed}}
  showCursor={${showCursor}}
  delay={200}
/>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

// ===== INTERACTIVE COUNTER DEMO =====

export interface CounterPlaygroundProps {
  className?: string;
}

export function CounterPlayground({ className }: CounterPlaygroundProps) {
  const [endValue, setEndValue] = useState(1000);
  const [startValue, setStartValue] = useState(0);
  const [duration, setDuration] = useState(2000);
  const [prefix, setPrefix] = useState('$');
  const [suffix, setSuffix] = useState('+');
  const [triggerKey, setTriggerKey] = useState(0);
  
  const announceRef = useRef<HTMLDivElement>(null);
  
  const announceChange = useCallback((message: string) => {
    if (announceRef.current) {
      announceRef.current.textContent = message;
      setTimeout(() => {
        if (announceRef.current) {
          announceRef.current.textContent = '';
        }
      }, 1000);
    }
  }, []);

  const replayCounter = () => {
    setTriggerKey(prev => prev + 1);
    announceChange(`Counter animation replayed from ${startValue} to ${endValue}`);
  };

  const presets = [
    { start: 0, end: 100, duration: 1500, prefix: '', suffix: '%', label: 'Percentage' },
    { start: 0, end: 1000, duration: 2000, prefix: '$', suffix: '+', label: 'Revenue' },
    { start: 0, end: 50, duration: 1200, prefix: '', suffix: ' clients', label: 'Clients' },
    { start: 0, end: 99, duration: 1800, prefix: '', suffix: '/100', label: 'Score' }
  ];

  return (
    <>
      <div ref={announceRef} className="sr-only" aria-live="polite" />
      
      <Card className={cn('border-2 border-green-500/20', className)}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span aria-hidden="true">🔢</span>
            <span>Animated Counter Studio</span>
          </CardTitle>
          <CardDescription>
            Create engaging number animations for statistics and metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Counter Preview */}
          <div className="p-8 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-lg border text-center">
            <div className="text-5xl font-bold text-primary mb-2">
              <AnimatedCounter
                key={triggerKey}
                start={startValue}
                end={endValue}
                duration={duration}
                prefix={prefix}
                suffix={suffix}
                ariaLabel="Interactive counter preview"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Animates from {startValue} to {endValue} in {duration}ms
            </p>
          </div>

          {/* Value Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="start-value" className="text-sm font-medium">Start Value</label>
              <input
                id="start-value"
                type="number"
                value={startValue}
                onChange={(e) => setStartValue(parseInt(e.target.value) || 0)}
                className="w-full p-2 border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="end-value" className="text-sm font-medium">End Value</label>
              <input
                id="end-value"
                type="number"
                value={endValue}
                onChange={(e) => setEndValue(parseInt(e.target.value) || 0)}
                className="w-full p-2 border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Duration Control */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label>Animation Duration: {duration}ms</label>
              <span className="text-muted-foreground">
                {duration < 1000 ? 'Fast' : duration < 2000 ? 'Normal' : 'Slow'}
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={duration}
              onChange={(e) => {
                const newDuration = parseInt(e.target.value);
                setDuration(newDuration);
                announceChange(`Duration set to ${newDuration} milliseconds`);
              }}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Prefix and Suffix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="prefix" className="text-sm font-medium">Prefix</label>
              <input
                id="prefix"
                type="text"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                placeholder="e.g., $, €, #"
                className="w-full p-2 border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="suffix" className="text-sm font-medium">Suffix</label>
              <input
                id="suffix"
                type="text"
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
                placeholder="e.g., +, %, K, M"
                className="w-full p-2 border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Presets */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Quick Presets</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {presets.map((preset, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setStartValue(preset.start);
                    setEndValue(preset.end);
                    setDuration(preset.duration);
                    setPrefix(preset.prefix);
                    setSuffix(preset.suffix);
                    announceChange(`Applied ${preset.label} preset`);
                  }}
                  className="text-xs"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center space-x-3 pt-4 border-t">
            <AnimatedButton
              variant="primary"
              animation="scale"
              onClick={replayCounter}
              aria-label="Replay counter animation"
            >
              <span className="mr-2" aria-hidden="true">🔄</span>
              Replay Counter
            </AnimatedButton>
          </div>

          {/* Code Preview */}
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="text-sm font-medium mb-2">Generated Code</h4>
            <pre className="text-xs overflow-x-auto bg-background p-3 rounded border">
              <code>{`<AnimatedCounter
  start={${startValue}}
  end={${endValue}}
  duration={${duration}}
  prefix="${prefix}"
  suffix="${suffix}"
/>`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </>
  );
}