import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const NavigationDemo = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentVariant, setCurrentVariant] = useState('default');
  const announceRef = useRef<HTMLDivElement>(null);

  const announceChange = (message: string) => {
    if (announceRef.current) {
      announceRef.current.textContent = message;
    }
  };

  // Navigation variants avec couleurs complètes
  const navigationVariants = {
    default: {
      bgColor: 'bg-background/80',
      logoColor: 'from-blue-500 to-blue-600',
      activeColor: 'bg-blue-500 text-white',
      title: 'Default Navigation',
      dropdownBg: 'bg-card',
      dropdownText: 'text-card-foreground',
      dropdownHover: 'hover:bg-muted/50',
      titleColor: 'text-muted-foreground',
      badgeStyle: 'bg-blue-100 text-blue-800'
    },
    business: {
      bgColor: 'bg-slate-900/95',
      logoColor: 'from-emerald-500 to-emerald-600',
      activeColor: 'bg-emerald-500 text-white',
      title: 'Business Navigation',
      dropdownBg: 'bg-slate-800',
      dropdownText: 'text-slate-100',
      dropdownHover: 'hover:bg-slate-700',
      titleColor: 'text-emerald-400',
      badgeStyle: 'bg-emerald-500 text-emerald-900'
    },
    minimal: {
      bgColor: 'bg-white/90',
      logoColor: 'from-gray-800 to-gray-900',
      activeColor: 'bg-gray-800 text-white',
      title: 'Minimal Navigation',
      dropdownBg: 'bg-white',
      dropdownText: 'text-gray-900',
      dropdownHover: 'hover:bg-gray-100',
      titleColor: 'text-gray-600',
      badgeStyle: 'bg-gray-200 text-gray-700'
    },
    colorful: {
      bgColor: 'bg-gradient-to-r from-purple-500/20 to-pink-500/20',
      logoColor: 'from-purple-500 to-pink-500',
      activeColor: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
      title: 'Creative Navigation',
      dropdownBg: 'bg-gradient-to-br from-purple-500/90 to-pink-500/90',
      dropdownText: 'text-white',
      dropdownHover: 'hover:bg-white/20',
      titleColor: 'text-yellow-300',
      badgeStyle: 'bg-yellow-400 text-purple-900'
    }
  };

  // Contenu dropdown adaptatif par variant
  const getDropdownConfig = () => {
    switch (currentVariant) {
      case 'business':
        return {
          title: 'Business Services',
          items: [
            { icon: '💼', name: 'Consulting', desc: 'Business strategy services', badge: 'Premium' },
            { icon: '📊', name: 'Analytics', desc: 'Data-driven insights', badge: 'Pro' },
            { icon: '🎯', name: 'Marketing', desc: 'Digital marketing solutions', badge: 'Popular' },
            { icon: '⚡', name: 'Automation', desc: 'Process optimization', badge: 'New' }
          ]
        };
      case 'minimal':
        return {
          title: 'Site Elements',
          items: [
            { icon: '📄', name: 'Pages', desc: 'Simple web pages', badge: '' },
            { icon: '🔗', name: 'Links', desc: 'Navigation links', badge: '' },
            { icon: '📝', name: 'Content', desc: 'Text content', badge: '' },
            { icon: '🎨', name: 'Design', desc: 'Clean layouts', badge: '' }
          ]
        };
      case 'colorful':
        return {
          title: 'Creative Portfolio',
          items: [
            { icon: '🌈', name: 'Creative', desc: 'Colorful designs', badge: 'Trending' },
            { icon: '🎨', name: 'Art Gallery', desc: 'Visual portfolios', badge: 'Hot' },
            { icon: '✨', name: 'Animations', desc: 'Dynamic effects', badge: 'Cool' },
            { icon: '🚀', name: 'Innovation', desc: 'Cutting-edge tech', badge: 'New' }
          ]
        };
      default:
        return {
          title: 'Products & Services',
          items: [
            { icon: '🌐', name: 'Websites', desc: 'Custom web solutions', badge: 'Popular' },
            { icon: '🛒', name: 'E-commerce', desc: 'Online stores', badge: 'New' },
            { icon: '📱', name: 'Mobile Apps', desc: 'iOS & Android apps', badge: '' },
            { icon: '⚡', name: 'Performance', desc: 'Speed optimization', badge: 'Pro' }
          ]
        };
    }
  };

  const currentNav = navigationVariants[currentVariant as keyof typeof navigationVariants];
  const dropdownConfig = getDropdownConfig();

  const handleVariantChange = (variant: string) => {
    setCurrentVariant(variant);
    setActiveDropdown(null); // Fermer dropdown lors du changement
    announceChange(`Navigation variant changed to ${variant}`);
  };

  const toggleDropdown = (dropdown: string) => {
    const newDropdown = activeDropdown === dropdown ? null : dropdown;
    setActiveDropdown(newDropdown);
    announceChange(newDropdown ? `${dropdown} menu opened` : 'Menu closed');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    announceChange(mobileMenuOpen ? 'Mobile menu closed' : 'Mobile menu opened');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-area')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="dropdown-container" style={{ overflow: 'visible', position: 'relative' }}>
      <Card className="dropdown-container">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span aria-hidden="true">🧭</span>
            <span>Interactive Navigation Demo</span>
          </CardTitle>
          <CardDescription>
            Vraie navigation responsive avec animations et interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Live Region for Announcements */}
          <div ref={announceRef} className="sr-only" aria-live="polite"></div>

          {/* Variant Selector */}
          <div className="mb-6 p-4 bg-muted/50 rounded-lg">
            <h3 className="font-medium mb-3">Try Different Variants:</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(navigationVariants).map(([key, variant]) => (
                <Button
                  key={key}
                  variant={currentVariant === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleVariantChange(key)}
                  className="text-xs"
                >
                  {variant.title}
                </Button>
              ))}
            </div>
          </div>

          {/* Navigation Demo */}
          <div className="border border-border rounded-lg shadow-lg relative" style={{ overflow: 'visible' }}>
            <nav 
              className={`dropdown-nav w-full border-b ${currentNav.bgColor} backdrop-blur-sm transition-all duration-500`}
              role="navigation" 
              aria-label="Demo navigation"
            >
              <div className="px-4">
                <div className="flex items-center justify-between h-16">
                  
                  {/* Animated Logo */}
                  <div className="flex items-center space-x-3 text-lg font-semibold">
                    <div 
                      className={`w-10 h-10 bg-gradient-to-br ${currentNav.logoColor} rounded-lg flex items-center justify-center text-white font-bold transition-all duration-500 hover:scale-110 hover:rotate-12 cursor-pointer`}
                    >
                      ⚡
                    </div>
                    <span className="hidden sm:block font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                      {currentNav.title}
                    </span>
                  </div>

                  {/* Desktop Navigation */}
                  <div className="hidden lg:flex items-center space-x-1">
                    
                    {/* Home */}
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${currentNav.activeColor} shadow-md hover:shadow-lg transform hover:scale-105`}>
                      🏠 Home
                    </button>
                    
                    {/* Products Dropdown - ZONE CRITIQUE */}
                    <div className="relative dropdown-area">
                      <button
                        onClick={() => toggleDropdown('products')}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                        aria-expanded={activeDropdown === 'products'}
                        aria-haspopup="true"
                      >
                        <span>💼 Products</span>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                      
                      {/* UN SEUL DROPDOWN - Adaptatif en couleurs et contenu */}
                      {activeDropdown === 'products' && (
                        <div 
                          className={`absolute top-full left-0 mt-2 w-64 border border-border rounded-lg shadow-xl transition-all duration-300 z-50 ${currentNav.dropdownBg} ${currentNav.dropdownText}`}
                          style={{ zIndex: 9999 }}
                        >
                          <div className="p-4 space-y-3">
                            <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${currentNav.titleColor}`}>
                              {dropdownConfig.title}
                            </div>
                            {dropdownConfig.items.map((item, index) => (
                              <div 
                                key={index}
                                className={`flex items-start space-x-3 p-2 rounded-lg transition-colors cursor-pointer group ${currentNav.dropdownHover}`}
                                onClick={() => setActiveDropdown(null)}
                              >
                                <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <span className={`font-medium ${currentNav.dropdownText}`}>{item.name}</span>
                                    {item.badge && (
                                      <Badge className={`text-xs ${currentNav.badgeStyle}`}>
                                        {item.badge}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className={`text-xs ${currentNav.dropdownText} opacity-70`}>{item.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Services */}
                    <button className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200">
                      🛠️ Services
                    </button>
                    
                    {/* Contact with pulse animation */}
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 animate-pulse">
                      📞 Contact
                    </button>
                  </div>

                  {/* Mobile Menu Button with animated hamburger */}
                  <button 
                    onClick={toggleMobileMenu}
                    className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                    aria-label="Toggle mobile navigation menu"
                    aria-expanded={mobileMenuOpen}
                    aria-controls="demo-mobile-menu"
                  >
                    <div className="w-5 h-5 relative">
                      <span className={`absolute block h-0.5 w-5 bg-current transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'}`}></span>
                      <span className={`absolute block h-0.5 w-5 bg-current transform transition-all duration-300 translate-y-2 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                      <span className={`absolute block h-0.5 w-5 bg-current transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 translate-y-2' : 'translate-y-4'}`}></span>
                    </div>
                  </button>
                </div>

                {/* Mobile Menu with slide animation */}
                <div 
                  className={`lg:hidden border-t overflow-hidden transition-all duration-300 ${
                    mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="py-4 space-y-2">
                    <div className={`block p-3 rounded-lg font-medium ${currentNav.activeColor} shadow-md`}>
                      🏠 Home
                    </div>
                    <button 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-left p-3 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors"
                    >
                      💼 Products
                    </button>
                    <button 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-left p-3 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors"
                    >
                      🛠️ Services
                    </button>
                    <button 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full text-left p-3 rounded-lg bg-primary text-primary-foreground font-medium"
                    >
                      📞 Contact
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* Features List */}
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium mb-3">🚀 Demonstrated Features:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Animated logo with hover effects</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Adaptive dropdown colors per variant</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Dynamic content per variant</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Perfect positioning under button</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Animated hamburger menu</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>ARIA accessibility support</span>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="mt-4 text-sm text-muted-foreground">
            <p><strong>Business Applications:</strong> This navigation adapts perfectly for corporate websites, SaaS platforms, and e-commerce sites. Each variant serves different brand personalities while maintaining professional functionality.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NavigationDemo;