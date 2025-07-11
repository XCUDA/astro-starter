// NavigationDemo.tsx - Navigation & Feedback Components Demo (Sprint 2)
// Path: src/components/islands/NavigationDemo.tsx

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Demo Component for Navigation & Feedback
export default function NavigationDemo() {
  const [activeAlert, setActiveAlert] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState('services');

  const showAlert = (type: string) => {
    setActiveAlert(type);
    // Auto-hide after 3 seconds
    setTimeout(() => setActiveAlert(null), 3000);
  };

  return (
    <div className="space-y-8" role="region" aria-label="Navigation and Feedback Components Demo">
      
      {/* Breadcrumb Demo */}
      <div className="bg-card border border-border rounded-lg p-6" role="region" aria-labelledby="breadcrumb-demo">
        <h3 id="breadcrumb-demo" className="text-lg font-semibold text-card-foreground mb-4">
          🧭 Breadcrumb Navigation
        </h3>
        <div className="space-y-4">
          <Breadcrumb aria-label="Business website navigation breadcrumb">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  href="/" 
                  className="hover:text-primary transition-colors"
                  aria-label="Navigate to home page"
                >
                  Accueil
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink 
                  href="/services" 
                  className="hover:text-primary transition-colors"
                  aria-label="Navigate to services page"
                >
                  Services
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage aria-current="page">
                  Consultation Marketing
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4" role="list" aria-label="Breadcrumb navigation examples">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentPage('home')}
              className="text-sm"
              aria-label="Change breadcrumb to home page example"
              role="listitem"
            >
              📍 Page d&apos;accueil
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentPage('services')}
              className="text-sm"
              aria-label="Change breadcrumb to services page example"
              role="listitem"
            >
              🏢 Page Services
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentPage('portfolio')}
              className="text-sm"
              aria-label="Change breadcrumb to portfolio page example"
              role="listitem"
            >
              💼 Portfolio Client
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Demo */}
      <div className="bg-card border border-border rounded-lg p-6" role="region" aria-labelledby="tabs-demo">
        <h3 id="tabs-demo" className="text-lg font-semibold text-card-foreground mb-4">
          📂 Tabs Organization
        </h3>
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-4" role="tablist" aria-label="Company information tabs">
            <TabsTrigger value="about" aria-controls="about-panel" aria-label="About company tab">À Propos</TabsTrigger>
            <TabsTrigger value="services" aria-controls="services-panel" aria-label="Services offered tab">Services</TabsTrigger>
            <TabsTrigger value="portfolio" aria-controls="portfolio-panel" aria-label="Portfolio showcase tab">Portfolio</TabsTrigger>
            <TabsTrigger value="team" aria-controls="team-panel" aria-label="Team members tab">Équipe</TabsTrigger>
          </TabsList>
          
          <TabsContent 
            value="about" 
            id="about-panel"
            role="tabpanel"
            aria-labelledby="about-tab"
            className="space-y-4 mt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Notre Mission</h4>
                <p className="text-sm text-muted-foreground">
                  Accompagner nos clients dans leur transformation digitale avec des solutions sur-mesure.
                </p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Nos Valeurs</h4>
                <p className="text-sm text-muted-foreground">
                  Innovation, qualité, proximité client et excellence technique au service de vos projets.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent 
            value="services" 
            id="services-panel"
            role="tabpanel"
            aria-labelledby="services-tab"
            className="space-y-4 mt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="list" aria-label="Services offered">
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20" role="listitem">
                <h4 className="font-semibold text-primary mb-2">🌐 Développement Web</h4>
                <p className="text-sm text-muted-foreground">Sites vitrine, e-commerce, applications web</p>
              </div>
              <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20" role="listitem">
                <h4 className="font-semibold text-secondary-foreground mb-2">📱 Applications Mobiles</h4>
                <p className="text-sm text-muted-foreground">Apps natives et hybrides pour iOS/Android</p>
              </div>
              <div className="bg-accent/5 p-4 rounded-lg border border-accent/20" role="listitem">
                <h4 className="font-semibold text-accent-foreground mb-2">🎨 Design UX/UI</h4>
                <p className="text-sm text-muted-foreground">Interfaces modernes et user-friendly</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent 
            value="portfolio" 
            id="portfolio-panel"
            role="tabpanel"
            aria-labelledby="portfolio-tab"
            className="space-y-4 mt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list" aria-label="Portfolio projects">
              <div className="bg-card border border-border rounded-lg overflow-hidden" role="listitem">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 flex items-center justify-center">
                  <span className="text-white font-semibold">E-commerce Fashion</span>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-2">Boutique Mode Premium</h4>
                  <p className="text-sm text-muted-foreground">Site e-commerce complet avec paiement sécurisé</p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg overflow-hidden" role="listitem">
                <div className="bg-gradient-to-r from-green-500 to-teal-600 h-32 flex items-center justify-center">
                  <span className="text-white font-semibold">SaaS Dashboard</span>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-2">Plateforme Analytics</h4>
                  <p className="text-sm text-muted-foreground">Dashboard temps réel avec visualisations</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent 
            value="team" 
            id="team-panel"
            role="tabpanel"
            aria-labelledby="team-tab"
            className="space-y-4 mt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="list" aria-label="Team members">
              <div className="text-center" role="listitem">
                <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl" aria-hidden="true">👨‍💻</span>
                </div>
                <h4 className="font-semibold">Jean Dupont</h4>
                <p className="text-sm text-muted-foreground">Lead Developer</p>
              </div>
              <div className="text-center" role="listitem">
                <div className="w-16 h-16 bg-secondary/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl" aria-hidden="true">🎨</span>
                </div>
                <h4 className="font-semibold">Marie Martin</h4>
                <p className="text-sm text-muted-foreground">UI/UX Designer</p>
              </div>
              <div className="text-center" role="listitem">
                <div className="w-16 h-16 bg-accent/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl" aria-hidden="true">📊</span>
                </div>
                <h4 className="font-semibold">Paul Dubois</h4>
                <p className="text-sm text-muted-foreground">Project Manager</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Alert Demo */}
      <div className="bg-card border border-border rounded-lg p-6" role="region" aria-labelledby="alert-demo">
        <h3 id="alert-demo" className="text-lg font-semibold text-card-foreground mb-4">
          ⚠️ Alert System
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4" role="group" aria-labelledby="alert-triggers">
          <span id="alert-triggers" className="sr-only">Alert trigger buttons</span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => showAlert('info')}
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
            aria-label="Show information alert"
          >
            📢 Info
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => showAlert('success')}
            className="text-green-600 border-green-200 hover:bg-green-50"
            aria-label="Show success alert"
          >
            ✅ Succès
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => showAlert('warning')}
            className="text-orange-600 border-orange-200 hover:bg-orange-50"
            aria-label="Show warning alert"
          >
            ⚠️ Warning
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => showAlert('error')}
            className="text-red-600 border-red-200 hover:bg-red-50"
            aria-label="Show error alert"
          >
            ❌ Erreur
          </Button>
        </div>

        {activeAlert && (
          <div 
            className="transition-all duration-300 ease-in-out"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {activeAlert === 'info' && (
              <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
                <AlertDescription className="text-blue-700 dark:text-blue-300">
                  📢 <strong>Information :</strong> Votre demande a été prise en compte et sera traitée sous 24h.
                </AlertDescription>
              </Alert>
            )}
            {activeAlert === 'success' && (
              <Alert className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
                <AlertDescription className="text-green-700 dark:text-green-300">
                  ✅ <strong>Succès :</strong> Votre commande a été confirmée ! Numéro de suivi : #CMD2024-001
                </AlertDescription>
              </Alert>
            )}
            {activeAlert === 'warning' && (
              <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
                <AlertDescription className="text-orange-700 dark:text-orange-300">
                  ⚠️ <strong>Attention :</strong> Stock limité - Il ne reste que 3 exemplaires de ce produit.
                </AlertDescription>
              </Alert>
            )}
            {activeAlert === 'error' && (
              <Alert className="border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
                <AlertDescription className="text-red-700 dark:text-red-300">
                  ❌ <strong>Erreur :</strong> Échec du paiement. Veuillez vérifier vos informations bancaires.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>

      {/* Badge Demo */}
      <div className="bg-card border border-border rounded-lg p-6" role="region" aria-labelledby="badge-demo">
        <h3 id="badge-demo" className="text-lg font-semibold text-card-foreground mb-4">
          🏷️ Badge System
        </h3>
        
        <div className="space-y-6">
          {/* Product Status Badges */}
          <div role="group" aria-labelledby="product-status">
            <h4 id="product-status" className="font-medium text-foreground mb-3">Statuts Produits :</h4>
            <div className="flex flex-wrap gap-3" role="list" aria-label="Product status badges">
              <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" role="listitem">
                ✅ En Stock
              </Badge>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" role="listitem">
                ⏳ Stock Limité
              </Badge>
              <Badge variant="destructive" role="listitem">
                ❌ Rupture
              </Badge>
              <Badge variant="outline" className="border-blue-300 text-blue-700 dark:border-blue-600 dark:text-blue-300" role="listitem">
                🔄 Précommande
              </Badge>
            </div>
          </div>

          {/* Priority Badges */}
          <div role="group" aria-labelledby="priority-badges">
            <h4 id="priority-badges" className="font-medium text-foreground mb-3">Priorités Business :</h4>
            <div className="flex flex-wrap gap-3" role="list" aria-label="Priority level badges">
              <Badge variant="destructive" className="animate-pulse" role="listitem">
                🔥 Urgent
              </Badge>
              <Badge variant="default" className="bg-orange-500 text-white dark:bg-orange-600" role="listitem">
                ⚡ Haute
              </Badge>
              <Badge variant="secondary" role="listitem">
                📋 Normale
              </Badge>
              <Badge variant="outline" role="listitem">
                💭 Basse
              </Badge>
            </div>
          </div>

          {/* Marketing Badges */}
          <div role="group" aria-labelledby="marketing-badges">
            <h4 id="marketing-badges" className="font-medium text-foreground mb-3">Marketing & Promotions :</h4>
            <div className="flex flex-wrap gap-3" role="list" aria-label="Marketing promotion badges">
              <Badge variant="default" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white animate-pulse" role="listitem">
                🎉 Nouveau
              </Badge>
              <Badge variant="default" className="bg-red-500 text-white" role="listitem">
                💥 -50%
              </Badge>
              <Badge variant="outline" className="border-yellow-400 text-yellow-600 dark:text-yellow-400" role="listitem">
                ⭐ Populaire
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" role="listitem">
                👑 Premium
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Business Use Cases */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 border border-purple-200 dark:border-purple-800 rounded-lg p-6" role="region" aria-labelledby="business-cases">
        <h3 id="business-cases" className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4">
          💼 Cas d&apos;Usage Business
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div role="group" aria-labelledby="navigation-cases">
            <h4 id="navigation-cases" className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Navigation :</h4>
            <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-1" role="list" aria-label="Navigation use cases">
              <li role="listitem">• <strong>E-commerce :</strong> Breadcrumb catégories produits</li>
              <li role="listitem">• <strong>Corporate :</strong> Tabs services/portfolio</li>
              <li role="listitem">• <strong>SaaS :</strong> Navigation dashboard modulaire</li>
              <li role="listitem">• <strong>Portfolio :</strong> Organisation projets par tabs</li>
            </ul>
          </div>
          <div role="group" aria-labelledby="feedback-cases">
            <h4 id="feedback-cases" className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Feedback :</h4>
            <ul className="text-sm text-purple-600 dark:text-purple-400 space-y-1" role="list" aria-label="Feedback use cases">
              <li role="listitem">• <strong>Alerts :</strong> Notifications système en temps réel</li>
              <li role="listitem">• <strong>Badges :</strong> Statuts commandes et produits</li>
              <li role="listitem">• <strong>UX :</strong> Feedback visuel immédiat</li>
              <li role="listitem">• <strong>Conversion :</strong> Call-to-action avec badges</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}