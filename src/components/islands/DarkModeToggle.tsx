// DarkModeToggle.tsx - Minimalist Sun/Moon Toggle (FOUC Fixed + UX Improved)
// Simple, professional dark mode toggle without verbosity
// Path: src/components/islands/DarkModeToggle.tsx

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// Extend window for theme state
declare global {
  interface Window {
    __THEME_STATE__?: 'dark' | 'light';
  }
}

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize from pre-set theme state (prevents FOUC)
  useEffect(() => {
    const currentTheme = window.__THEME_STATE__ || 
                        (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    
    setIsDark(currentTheme === 'dark');
    setMounted(true);
  }, []);

  // Theme toggle function
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // Update DOM and storage
    const root = document.documentElement;
    if (newTheme) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      window.__THEME_STATE__ = 'dark';
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      window.__THEME_STATE__ = 'light';
    }
  };

  // Show loading state until mounted (prevents hydration mismatch)
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
        className="w-9 h-9 p-0"
        aria-label="Loading theme toggle"
      >
        <div className="w-4 h-4 animate-pulse bg-muted-foreground/30 rounded-full" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="w-9 h-9 p-0 hover:scale-105 transition-all duration-200"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? (
        // Sun icon (when in dark mode, clicking switches to light)
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
        // Moon icon (when in light mode, clicking switches to dark)
        <svg 
          className="w-4 h-4 text-slate-700" 
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
    </Button>
  );
}