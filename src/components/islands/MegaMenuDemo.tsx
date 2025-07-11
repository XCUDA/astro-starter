import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const MegaMenuDemo = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [currentSite, setCurrentSite] = useState('business');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const announceRef = useRef<HTMLDivElement>(null);

  const announceChange = (message: string) => {
    if (announceRef.current) {
      announceRef.current.textContent = message;
    }
  };

  const siteTypes = {
    business: {
      name: 'Business Consulting',
      logo: '💼',
      promoText: '🎯 New: AI-Powered Business Solutions Available!',
      bgGradient: 'from-blue-600/10 to-indigo-600/10',
      accentColor: 'border-blue-500/30 bg-blue-500/10',
      menu: {
        title: 'Services & Solutions',
        columns: [
          {
            title: 'Consulting Services',
            items: [
              { name: 'Strategy Consulting', desc: 'Business strategy and planning', icon: '📊' },
              { name: 'Digital Transformation', desc: 'Technology modernization', icon: '🔄' },
              { name: 'Process Optimization', desc: 'Workflow improvements', icon: '⚡' },
              { name: 'Risk Management', desc: 'Risk assessment and mitigation', icon: '🛡️' }
            ]
          },
          {
            title: 'Technology Solutions',
            items: [
              { name: 'Cloud Migration', desc: 'Move to cloud infrastructure', icon: '☁️' },
              { name: 'Data Analytics', desc: 'Business intelligence solutions', icon: '📈' },
              { name: 'Security Audit', desc: 'Cybersecurity assessment', icon: '🔒' },
              { name: 'System Integration', desc: 'Connect your systems', icon: '🔗' }
            ]
          },
          {
            title: 'Training & Support',
            items: [
              { name: 'Executive Training', desc: 'Leadership development', icon: '👨‍💼' },
              { name: 'Team Workshops', desc: 'Skill building sessions', icon: '👥' },
              { name: '24/7 Support', desc: 'Round-the-clock assistance', icon: '🆘' },
              { name: 'Documentation', desc: 'Comprehensive guides', icon: '📚' }
            ]
          }
        ],
        featured: {
          title: 'Featured Service',
          name: 'Complete Digital Transformation',
          desc: 'End-to-end modernization of your business processes and technology stack.',
          price: 'From $25,000',
          badge: 'Most Popular',
          icon: '🚀'
        }
      }
    },
    ecommerce: {
      name: 'Fashion Store',
      logo: '👗',
      promoText: '✨ Summer Sale: Up to 70% Off Selected Items!',
      bgGradient: 'from-pink-500/10 to-purple-600/10',
      accentColor: 'border-pink-500/30 bg-pink-500/10',
      menu: {
        title: 'Shop Categories',
        columns: [
          {
            title: 'Women\'s Fashion',
            items: [
              { name: 'Dresses', desc: 'Casual & formal dresses', icon: '👗' },
              { name: 'Tops & Blouses', desc: 'Stylish tops for every occasion', icon: '👚' },
              { name: 'Pants & Jeans', desc: 'Comfortable & trendy bottoms', icon: '👖' },
              { name: 'Accessories', desc: 'Bags, jewelry & more', icon: '👜' }
            ]
          },
          {
            title: 'Men\'s Fashion',
            items: [
              { name: 'Shirts', desc: 'Business & casual shirts', icon: '👔' },
              { name: 'Pants & Chinos', desc: 'Professional & casual pants', icon: '👔' },
              { name: 'Shoes', desc: 'Sneakers, boots & dress shoes', icon: '👞' },
              { name: 'Watches', desc: 'Classic & modern timepieces', icon: '⌚' }
            ]
          },
          {
            title: 'Special Collections',
            items: [
              { name: 'Summer Collection', desc: 'Light & breezy outfits', icon: '☀️' },
              { name: 'Workwear', desc: 'Professional attire', icon: '💼' },
              { name: 'Weekend Casual', desc: 'Relaxed weekend style', icon: '🏖️' },
              { name: 'Premium Line', desc: 'Luxury fashion pieces', icon: '⭐' }
            ]
          }
        ],
        featured: {
          title: 'Summer Special',
          name: 'Complete Outfit Bundle',
          desc: 'Get a complete summer look with matching accessories at an incredible price.',
          price: '$199 (Save $150)',
          badge: 'Limited Time',
          icon: '🌟'
        }
      }
    },
    saas: {
      name: 'CloudTech Platform',
      logo: '⚡',
      promoText: '🚀 New: AI-Powered Analytics Dashboard Now Available!',
      bgGradient: 'from-emerald-500/10 to-teal-600/10',
      accentColor: 'border-emerald-500/30 bg-emerald-500/10',
      menu: {
        title: 'Platform Features',
        columns: [
          {
            title: 'Core Features',
            items: [
              { name: 'Dashboard Analytics', desc: 'Real-time data insights', icon: '📊' },
              { name: 'API Management', desc: 'Robust API integration', icon: '🔗' },
              { name: 'User Management', desc: 'Team & permission controls', icon: '👥' },
              { name: 'Automation Tools', desc: 'Workflow automation', icon: '🤖' }
            ]
          },
          {
            title: 'Advanced Tools',
            items: [
              { name: 'AI Assistant', desc: 'Intelligent data analysis', icon: '🧠' },
              { name: 'Custom Reports', desc: 'Tailored reporting solutions', icon: '📈' },
              { name: 'Integration Hub', desc: 'Connect your favorite tools', icon: '🔄' },
              { name: 'Mobile Apps', desc: 'iOS & Android applications', icon: '📱' }
            ]
          },
          {
            title: 'Enterprise',
            items: [
              { name: 'SSO Integration', desc: 'Single sign-on solutions', icon: '🔐' },
              { name: 'Advanced Security', desc: 'Enterprise-grade protection', icon: '🛡️' },
              { name: 'Custom Deployment', desc: 'On-premise or cloud', icon: '☁️' },
              { name: 'Priority Support', desc: '24/7 dedicated assistance', icon: '🎧' }
            ]
          }
        ],
        featured: {
          title: 'Try Free',
          name: 'Enterprise Trial',
          desc: 'Experience all premium features with a 30-day free trial. No credit card required.',
          price: 'Free for 30 days',
          badge: 'No Commitment',
          icon: '🎯'
        }
      }
    },
    restaurant: {
      name: 'Bella Vista Restaurant',
      logo: '🍽️',
      promoText: '🍷 Wine Tasting Event This Friday - Reserve Your Table!',
      bgGradient: 'from-amber-500/10 to-orange-600/10',
      accentColor: 'border-amber-500/30 bg-amber-500/10',
      menu: {
        title: 'Our Menu',
        columns: [
          {
            title: 'Appetizers',
            items: [
              { name: 'Bruschetta Trio', desc: 'Three variations of classic bruschetta', icon: '🍞' },
              { name: 'Seafood Platter', desc: 'Fresh oysters, shrimp & calamari', icon: '🦐' },
              { name: 'Cheese Board', desc: 'Artisanal cheeses & accompaniments', icon: '🧀' },
              { name: 'Soup of the Day', desc: 'Chef\'s daily special creation', icon: '🍲' }
            ]
          },
          {
            title: 'Main Courses',
            items: [
              { name: 'Grilled Salmon', desc: 'Atlantic salmon with seasonal vegetables', icon: '🐟' },
              { name: 'Beef Tenderloin', desc: 'Prime cut with truffle sauce', icon: '🥩' },
              { name: 'Pasta Primavera', desc: 'Fresh vegetables & house-made pasta', icon: '🍝' },
              { name: 'Roasted Chicken', desc: 'Free-range herb-crusted chicken', icon: '🍗' }
            ]
          },
          {
            title: 'Desserts & Drinks',
            items: [
              { name: 'Tiramisu', desc: 'Classic Italian dessert', icon: '🍰' },
              { name: 'Wine Selection', desc: 'Curated local & international wines', icon: '🍷' },
              { name: 'Craft Cocktails', desc: 'Signature mixologist creations', icon: '🍸' },
              { name: 'Coffee & Tea', desc: 'Premium blends & loose leaf teas', icon: '☕' }
            ]
          }
        ],
        featured: {
          title: 'Chef\'s Special',
          name: 'Tasting Menu Experience',
          desc: 'Five-course culinary journey featuring seasonal ingredients and wine pairings.',
          price: '$85 per person',
          badge: 'Reservation Required',
          icon: '👨‍🍳'
        }
      }
    }
  };

  const currentConfig = siteTypes[currentSite as keyof typeof siteTypes];

  const handleSiteChange = (site: string) => {
    setCurrentSite(site);
    setActiveMenu(null);
    announceChange(`Switched to ${siteTypes[site as keyof typeof siteTypes].name} demo`);
  };

  const toggleMenu = (menuName: string) => {
    const newMenu = activeMenu === menuName ? null : menuName;
    setActiveMenu(newMenu);
    announceChange(newMenu ? `${menuName} menu opened` : 'Menu closed');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    announceChange(mobileMenuOpen ? 'Mobile menu closed' : 'Mobile menu opened');
  };

  return (
    <div className="dropdown-container" style={{ overflow: 'visible', position: 'relative' }}>
      <Card className="dropdown-container">
        <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span aria-hidden="true">📋</span>
          <span>Interactive Mega Menu Demo</span>
        </CardTitle>
        <CardDescription>
          Mega menus adaptés pour différents types de business avec contenu réaliste
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Live Region */}
        <div ref={announceRef} className="sr-only" aria-live="polite"></div>

        {/* Site Type Selector */}
        <div className="mb-6 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-medium mb-3">Try Different Business Types:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(siteTypes).map(([key, site]) => (
              <Button
                key={key}
                variant={currentSite === key ? "default" : "outline"}
                size="sm"
                onClick={() => handleSiteChange(key)}
                className="text-xs flex items-center space-x-2"
              >
                <span>{site.logo}</span>
                <span className="hidden sm:inline">{site.name.split(' ')[0]}</span>
              </Button>
            ))}
          </div>
          
          {/* Mobile Menu */}
          <div 
            className={`lg:hidden border-t transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="py-4 space-y-6 max-h-96 overflow-y-auto bg-background">
              
              {/* Debug indicator - Remove in production */}
              <div className="px-4 text-xs text-muted-foreground">
                Menu Status: {mobileMenuOpen ? 'Open' : 'Closed'}
              </div>
              
              {/* Home Link */}
              <div className="px-4">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left p-3 rounded-lg bg-primary text-primary-foreground font-medium"
                >
                  🏠 Home
                </button>
              </div>

              {/* Mobile Menu Sections */}
              <div className="px-4 space-y-6">
                <div>
                  <h2 className="flex items-center space-x-2 text-lg font-semibold text-foreground mb-4">
                    <span>{currentConfig.logo}</span>
                    <span>{currentConfig.menu.title}</span>
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-6">
                    {currentConfig.menu.columns.map((column, colIndex) => (
                      <div key={colIndex} className="space-y-3">
                        <h3 className="font-medium text-foreground text-sm border-b border-border pb-2">
                          {column.title}
                        </h3>
                        <ul className="space-y-2 pl-4">
                          {column.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center space-x-3 w-full text-left p-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded transition-colors"
                              >
                                <span className="text-base">{item.icon}</span>
                                <div>
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                                </div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    
                    {/* Featured Section Mobile */}
                    <div className={`${currentConfig.accentColor} rounded-lg p-4 border`}>
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="text-3xl">{currentConfig.menu.featured.icon}</div>
                        <div className="w-full">
                          <div className="flex items-center justify-center space-x-2 mb-2 flex-wrap">
                            <span className="text-xs font-medium text-primary uppercase tracking-wider">
                              {currentConfig.menu.featured.title}
                            </span>
                            <Badge variant="secondary" className="text-xs flex-shrink-0">
                              {currentConfig.menu.featured.badge}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-foreground text-sm mb-2 break-words">
                            {currentConfig.menu.featured.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-3 leading-relaxed break-words">
                            {currentConfig.menu.featured.desc}
                          </p>
                          <div className="text-sm font-bold text-primary mb-3 break-words">
                            {currentConfig.menu.featured.price}
                          </div>
                          <Button size="sm" className="w-full text-xs" onClick={() => setMobileMenuOpen(false)}>
                            Learn More →
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Other Mobile Links */}
              <div className="px-4 space-y-2">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left p-3 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors"
                >
                  About
                </button>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left p-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mega Menu Demo */}
        <div className="border border-border rounded-lg shadow-lg relative" style={{ overflow: 'visible' }}>
          
          {/* Promo Bar */}
          <div className={`border-b bg-gradient-to-r ${currentConfig.bgGradient} transition-all duration-500`}>
            <div className="flex items-center justify-center py-3 px-4">
              <span className="text-sm font-medium text-center animate-pulse">
                {currentConfig.promoText}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mega-menu-nav w-full border-b bg-background/95 backdrop-blur-sm">
            <div className="px-4">
              <div className="flex items-center justify-between h-16">
                
                {/* Animated Logo */}
                <div className="flex items-center space-x-3 text-lg font-semibold">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-primary-foreground font-bold transition-all duration-500 hover:scale-110 hover:rotate-12">
                    {currentConfig.logo}
                  </div>
                  <span className="hidden sm:block font-bold">
                    {currentConfig.name}
                  </span>
                </div>

                {/* Desktop Mega Menu */}
                <div className="hidden lg:flex items-center space-x-1">
                  
                  <button className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground">
                    Home
                  </button>
                  
                  {/* Mega Menu Trigger */}
                  <div className="relative group">
                    <button
                      onClick={() => toggleMenu('main')}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                      aria-expanded={activeMenu === 'main'}
                      aria-haspopup="true"
                    >
                      <span>{currentConfig.menu.title}</span>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${activeMenu === 'main' ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                  </div>

                  <button className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50">
                    About
                  </button>
                  
                  <button className="px-4 py-2 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Contact
                  </button>
                </div>

                {/* Mobile Button */}
                <button className="lg:hidden p-2 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </nav>
          
          {/* Mega Menu Dropdown - Outside nav to avoid clipping */}
          <div 
            className={`relative w-full transition-all duration-300 ${
              activeMenu === 'main' 
                ? 'opacity-100 visible translate-y-0 scale-100' 
                : 'opacity-0 invisible translate-y-2 scale-95 absolute top-0 pointer-events-none'
            }`}
            style={{ 
              zIndex: 9999,
              marginTop: activeMenu === 'main' ? '8px' : '0'
            }}
          >
            <div className="w-full max-w-5xl mx-auto bg-card/95 backdrop-blur-sm border border-border rounded-xl shadow-xl">
              <div className="p-6">
                <div className="grid grid-cols-4 gap-6">
                  
                  {/* Menu Columns */}
                  {currentConfig.menu.columns.map((column, colIndex) => (
                    <div key={colIndex} className="space-y-4">
                      <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider border-b border-border pb-2">
                        {column.title}
                      </h3>
                      <ul className="space-y-3">
                        {column.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer group">
                              <span className="text-lg group-hover:scale-110 transition-transform">
                                {item.icon}
                              </span>
                              <div>
                                <div className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                                  {item.name}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {item.desc}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  
                  {/* Featured Section */}
                  <div className={`${currentConfig.accentColor} rounded-lg p-4 border transition-all duration-500`}>
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="text-4xl">{currentConfig.menu.featured.icon}</div>
                      <div className="w-full">
                        <div className="flex items-center justify-center space-x-2 mb-2 flex-wrap">
                          <span className="text-xs font-medium text-primary uppercase tracking-wider">
                            {currentConfig.menu.featured.title}
                          </span>
                          <Badge variant="secondary" className="text-xs flex-shrink-0">
                            {currentConfig.menu.featured.badge}
                          </Badge>
                        </div>
                        <h4 className="font-semibold text-foreground text-sm mb-2 break-words">
                          {currentConfig.menu.featured.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-3 leading-relaxed break-words">
                          {currentConfig.menu.featured.desc}
                        </p>
                        <div className="text-sm font-bold text-primary mb-3 break-words">
                          {currentConfig.menu.featured.price}
                        </div>
                        <Button size="sm" className="w-full text-xs">
                          Learn More →
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Showcase */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium mb-3">🎯 Business-Specific Features:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Industry-specific content organization</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Featured product/service highlighting</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Promotional banner integration</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Visual hierarchy with icons & descriptions</span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Perfect for:</strong> E-commerce stores, SaaS platforms, consulting firms, restaurants, and any business with complex product/service catalogs requiring organized navigation.</p>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

export default MegaMenuDemo;