// DarkModeToggle.tsx - Toggle pour basculer entre mode clair et sombre
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Initialiser le thème au chargement
  useEffect(() => {
    // Vérifier la préférence sauvegardée ou la préférence système
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    updateTheme(shouldBeDark);
  }, []);

  // Fonction pour mettre à jour le thème
  const updateTheme = (dark: boolean) => {
    const root = document.documentElement;
    
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Toggle du thème
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    updateTheme(newIsDark);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">
        {isDark ? '🌙 Mode Sombre' : '☀️ Mode Clair'}
      </span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={toggleTheme}
        className="flex items-center gap-2"
      >
        {isDark ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Clair
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            Sombre
          </>
        )}
      </Button>
      
      {/* Indicateur de status */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
        <span>{isDark ? 'Dark' : 'Light'}</span>
      </div>
    </div>
  );
}