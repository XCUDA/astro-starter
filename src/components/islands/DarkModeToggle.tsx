// DarkModeToggle.tsx - Simplified Astro 5 Approach (FOUC Eliminated)
// Lightweight toggle component - theme detection handled by Layout.astro inline script
// Path: src/components/islands/DarkModeToggle.tsx

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// Extend window for theme state (set by Layout.astro)  
declare global {
  interface Window {
    __THEME__?: 'dark' | 'light';
  }
}

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize from global theme state (set by Layout.astro inline script)
  useEffect(() => {
    // Get theme from global state or DOM
    const currentTheme = window.__THEME__ || 
                        (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    
    setIsDark(currentTheme === 'dark');
    setMounted(true);

    // Listen for theme restoration after ViewTransitions
    const handleThemeRestore = () => {
      const restoredTheme = window.__THEME__ || 
                           (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
      setIsDark(restoredTheme === 'dark');
    };

    window.addEventListener('theme:restored', handleThemeRestore);
    
    return () => {
      window.removeEventListener('theme:restored', handleThemeRestore);
    };
  }, []);

  // Simple theme toggle function
  const toggleTheme = () => {
    const newTheme = !isDark ? 'dark' : 'light';
    setIsDark(newTheme === 'dark');
    
    // Update DOM immediately with explicit classes
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(newTheme);
    
    // Update global state
    window.__THEME__ = newTheme;
    
    // Persist preference
    localStorage.setItem('theme', newTheme);
  };

  // Show loading state until mounted (prevents hydration mismatch)
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
        className="w-9 h-9 p-0"
        role="switch"
        aria-checked={false}
        aria-label="Loading theme toggle"
        aria-describedby="theme-loading-description"
      >
        <div className="w-4 h-4 animate-pulse bg-muted-foreground/30 rounded-full" />
        <span id="theme-loading-description" className="sr-only">
          Theme toggle is loading, please wait
        </span>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="w-9 h-9 p-0 hover:scale-105 transition-all duration-200"
      role="switch"
      aria-checked={isDark}
      aria-label={`Theme toggle: currently ${isDark ? 'dark' : 'light'} mode`}
      aria-describedby="theme-toggle-description"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        // Sun icon (switch to light)
        <svg 
          className="w-4 h-4 text-yellow-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
          />
        </svg>
      ) : (
        // Moon icon (switch to dark)
        <svg 
          className="w-4 h-4 text-slate-700 dark:text-slate-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
          />
        </svg>
      )}
      
      {/* Hidden description for screen readers */}
      <span id="theme-toggle-description" className="sr-only">
        Press to toggle between dark and light theme modes
      </span>
    </Button>
  );
}