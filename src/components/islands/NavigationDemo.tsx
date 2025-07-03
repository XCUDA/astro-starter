import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type AlertType = 'default' | 'destructive';

interface AlertMessage {
  id: number;
  type: AlertType;
  title: string;
  message: string;
}

export default function NavigationDemo() {
  // Navigation state
  const [currentSection, setCurrentSection] = useState('accueil');
  const [cartItems, setCartItems] = useState(0);
  const [notifications, setNotifications] = useState(3);
  const [messages, setMessages] = useState(2);

  // Alert system (legitimate persistent alerts)
  const [activeAlerts, setActiveAlerts] = useState<AlertMessage[]>([]);
  const [alertCounter, setAlertCounter] = useState(1);

  // Navigation paths for breadcrumb demo
  const navigationPaths = {
    'accueil': ['Accueil'],
    'produits': ['Accueil', 'Produits'],
    'smartphones': ['Accueil', 'Produits', 'Smartphones'],
    'iphone': ['Accueil', 'Produits', 'Smartphones', 'iPhone 15 Pro'],
    'panier': ['Accueil', 'Mon Panier']
  };

  // Alert management
  const addAlert = (type: AlertType, title: string, message: string) => {
    const newAlert: AlertMessage = {
      id: alertCounter,
      type,
      title,
      message
    };
    setActiveAlerts(prev => [...prev, newAlert]);
    setAlertCounter(prev => prev + 1);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setActiveAlerts(prev => prev.filter(alert => alert.id !== newAlert.id));
    }, 5000);
  };

  // Navigation actions
  const navigateTo = (section: string) => {
    setCurrentSection(section);
  };

  const addToCart = () => {
    setCartItems(prev => prev + 1);
    addAlert('default', '✅ Succès', 'Produit ajouté au panier !');
  };

  const removeFromCart = () => {
    if (cartItems > 0) {
      setCartItems(prev => prev - 1);
      addAlert('default', 'ℹ️ Info', 'Article retiré du panier');
    }
  };

  const addMessage = () => {
    setMessages(prev => prev + 1);
    setNotifications(prev => prev + 1);
    addAlert('default', '📩 Message', 'Nouveau message reçu !');
  };

  const readMessage = () => {
    if (messages > 0) {
      setMessages(prev => prev - 1);
      if (notifications > 0) {
        setNotifications(prev => prev - 1);
      }
      addAlert('default', '👀 Lu', 'Message marqué comme lu');
    }
  };

  return (
    <div className="space-y-12">
      
      {/* Active Alerts Display */}
      {activeAlerts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">🔔 Alertes actives :</h3>
          {activeAlerts.map((alert) => (
            <Alert key={alert.id} variant={alert.type}>
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Breadcrumb Component Demo */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🧭 Breadcrumb Component - Navigation Hiérarchique
            </CardTitle>
            <CardDescription>
              Navigation par fil d'Ariane pour sites e-commerce et applications. Améliore l'UX et aide au référencement.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Current Breadcrumb */}
            <div>
              <h3 className="text-lg font-semibold mb-4">📍 Position actuelle</h3>
              <div className="p-4 border rounded-lg bg-muted/30">
                <Breadcrumb>
                  <BreadcrumbList>
                    {navigationPaths[currentSection as keyof typeof navigationPaths]?.map((item, index, array) => (
                      <React.Fragment key={index}>
                        <BreadcrumbItem>
                          {index === array.length - 1 ? (
                            <BreadcrumbPage className="font-semibold">{item}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink 
                              href="#"
                              className="hover:text-primary transition-colors"
                              onClick={(e) => {
                                e.preventDefault();
                                if (index === 0) navigateTo('accueil');
                                if (index === 1 && array.length > 2) navigateTo('produits');
                                if (index === 2 && array.length > 3) navigateTo('smartphones');
                              }}
                            >
                              {item}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {index < array.length - 1 && <BreadcrumbSeparator />}
                      </React.Fragment>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>

            {/* Navigation Simulation */}
            <div>
              <h3 className="text-lg font-semibold mb-4">🛍️ Simuler navigation e-commerce</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateTo('accueil')}
                  className={currentSection === 'accueil' ? 'bg-primary text-primary-foreground' : ''}
                >
                  🏠 Accueil
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateTo('produits')}
                  className={currentSection === 'produits' ? 'bg-primary text-primary-foreground' : ''}
                >
                  📱 Produits
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateTo('smartphones')}
                  className={currentSection === 'smartphones' ? 'bg-primary text-primary-foreground' : ''}
                >
                  📲 Smartphones
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateTo('iphone')}
                  className={currentSection === 'iphone' ? 'bg-primary text-primary-foreground' : ''}
                >
                  🍎 iPhone 15 Pro
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateTo('panier')}
                  className={currentSection === 'panier' ? 'bg-primary text-primary-foreground' : ''}
                >
                  🛒 Mon Panier
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              💡 Cliquez sur les boutons pour naviguer et voir le breadcrumb s'adapter. Les liens sont cliquables pour remonter.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Tabs Component Demo */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📑 Tabs Component - Organisation de Contenu
            </CardTitle>
            <CardDescription>
              Organisation par onglets pour sites vitrine, portfolios et documentation. Structure claire et navigation intuitive.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">À Propos</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="team">Équipe</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold">🏢 À Propos de Notre Agence</h3>
                <p className="text-muted-foreground">
                  Agence web spécialisée dans la création de sites professionnels avec Astro, React et TailwindCSS. 
                  Nous accompagnons TPE, PME et startups dans leur transformation digitale avec des solutions 
                  modernes, performantes et adaptées à leurs besoins métier.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="p-3 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">50+</div>
                    <div className="text-sm text-muted-foreground">Projets livrés</div>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">5 ans</div>
                    <div className="text-sm text-muted-foreground">D'expérience</div>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-sm text-muted-foreground">Satisfaction</div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="services" className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold">🛠️ Nos Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">🌐 Sites Vitrine</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Sites professionnels responsives avec CMS intégré
                    </p>
                    <div className="text-sm font-medium text-primary">À partir de 1200€</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">🛒 E-commerce</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Boutiques en ligne avec paiement sécurisé
                    </p>
                    <div className="text-sm font-medium text-primary">À partir de 3500€</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">📱 Applications Web</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      SaaS et plateformes métier sur mesure
                    </p>
                    <div className="text-sm font-medium text-primary">Sur devis</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">🔧 Maintenance</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Support technique et évolutions
                    </p>
                    <div className="text-sm font-medium text-primary">50€/mois</div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="portfolio" className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold">🎨 Portfolio Projets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Restaurant Le Gourmet', type: 'Site Vitrine', tech: 'Astro + React' },
                    { name: 'Boutique Mode', type: 'E-commerce', tech: 'Next.js + Stripe' },
                    { name: 'Cabinet Médical', type: 'Site Pro', tech: 'Astro + CMS' },
                    { name: 'Startup FinTech', type: 'Application', tech: 'React + Node.js' },
                    { name: 'Artisan Local', type: 'Site Vitrine', tech: 'Astro + Tailwind' },
                    { name: 'SaaS Analytics', type: 'Dashboard', tech: 'React + Charts' }
                  ].map((project, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <h4 className="font-semibold mb-1">{project.name}</h4>
                      <Badge variant="secondary" className="text-xs mb-2">{project.type}</Badge>
                      <p className="text-xs text-muted-foreground">{project.tech}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="team" className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold">👥 Notre Équipe</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { 
                      name: 'Angelo Bedoni', 
                      role: 'Lead Developer', 
                      skills: 'Astro, React, TypeScript, Node.js',
                      bio: 'Passionné par les technologies modernes et l\'architecture web performante.'
                    },
                    { 
                      name: 'Sarah Chen', 
                      role: 'UX/UI Designer', 
                      skills: 'Figma, Design System, User Research',
                      bio: 'Créatrice d\'expériences utilisateur intuitives et accessibles.'
                    },
                    { 
                      name: 'Marc Dubois', 
                      role: 'Project Manager', 
                      skills: 'Agile, Scrum, Customer Success',
                      bio: 'Garant de la qualité et du respect des délais projets.'
                    },
                    { 
                      name: 'Lisa Rodriguez', 
                      role: 'Content Strategist', 
                      skills: 'SEO, Copywriting, Analytics',
                      bio: 'Experte en contenu optimisé pour conversion et référencement.'
                    }
                  ].map((member, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-semibold">{member.name}</h4>
                      <Badge variant="outline" className="text-xs my-2">{member.role}</Badge>
                      <p className="text-sm text-muted-foreground mb-2">{member.bio}</p>
                      <p className="text-xs font-medium">Compétences: {member.skills}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-sm text-muted-foreground mt-6">
              💡 Navigation par onglets idéale pour organiser information sans surcharge. Contenu riche pour sites vitrine.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Badge Component Demo */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🏷️ Badge Component - Statuts et Notifications
            </CardTitle>
            <CardDescription>
              Badges pour statuts produits, promotions, compteurs de notifications. Essentiels pour e-commerce et dashboards.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Interactive Badges */}
            <div>
              <h3 className="text-lg font-semibold mb-4">📊 Badges Interactifs</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Panier:</span>
                  <Badge variant="default" className="relative">
                    🛒 {cartItems}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm">Notifications:</span>
                  <Badge variant="destructive" className="relative">
                    🔔 {notifications}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm">Messages:</span>
                  <Badge variant="secondary" className="relative">
                    📩 {messages}
                  </Badge>
                </div>
              </div>
              
              {/* Badge Controls */}
              <div className="flex flex-wrap gap-2 mt-4">
                <Button size="sm" onClick={addToCart}>+ Ajouter au panier</Button>
                <Button size="sm" variant="outline" onClick={removeFromCart}>- Retirer du panier</Button>
                <Button size="sm" onClick={addMessage}>+ Nouveau message</Button>
                <Button size="sm" variant="outline" onClick={readMessage}>Lire message</Button>
              </div>
            </div>

            {/* Badge Variants Demo */}
            <div>
              <h3 className="text-lg font-semibold mb-4">🎨 Variants de Badges</h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Nouveau</Badge>
                <Badge variant="secondary">En stock</Badge>
                <Badge variant="destructive">Rupture</Badge>
                <Badge variant="outline">Promo -20%</Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Livraison gratuite</Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Best seller</Badge>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Exclusif</Badge>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              💡 Utilisez les boutons pour voir les compteurs s'incrémenter. Parfait pour e-commerce et notifications.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Alert Component Demo */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚠️ Alert Component - Messages Système
            </CardTitle>
            <CardDescription>
              Alertes persistantes pour informations importantes, erreurs système et confirmations d'actions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Alert Generator */}
            <div>
              <h3 className="text-lg font-semibold mb-4">🔔 Générateur d'Alertes</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Testez les alertes interactives
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => addAlert('default', '✅ Succès', 'Action réalisée avec succès !')}
                >
                  Succès
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => addAlert('default', 'ℹ️ Info', 'Nouvelle fonctionnalité disponible')}
                >
                  Info
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => addAlert('destructive', '❌ Erreur', 'Une erreur est survenue')}
                >
                  Erreur
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => addAlert('destructive', '⚠️ Warning', 'Action potentiellement destructive')}
                >
                  Warning
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4">
                💡 Les alertes apparaissent en haut et disparaissent automatiquement après 5 secondes.
              </p>
            </div>

            {/* Alert Examples */}
            <div>
              <h3 className="text-lg font-semibold mb-4">📋 Exemples d'Alertes</h3>
              <div className="space-y-3">
                <Alert>
                  <AlertTitle>Information importante</AlertTitle>
                  <AlertDescription>
                    Maintenance programmée le dimanche 15 janvier de 2h à 4h du matin. 
                    Les services peuvent être temporairement indisponibles.
                  </AlertDescription>
                </Alert>
                
                <Alert variant="destructive">
                  <AlertTitle>Erreur de connexion</AlertTitle>
                  <AlertDescription>
                    Impossible de se connecter au serveur. Vérifiez votre connexion internet 
                    et réessayez dans quelques minutes.
                  </AlertDescription>
                </Alert>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              💡 Alertes persistantes vs notifications temporaires. Deux systèmes complémentaires pour UX optimale.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Sprint 2 Summary */}
      <section>
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
              🎊 Sprint 2 Navigation & Feedback - Completed!
            </CardTitle>
            <CardDescription className="text-blue-700 dark:text-blue-300">
              Système complet de navigation et feedback utilisateur avec cas d'usage business réalistes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">✅ Composants ajoutés:</h4>
                <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                  <li>• <strong>Breadcrumb:</strong> Navigation hiérarchique e-commerce</li>
                  <li>• <strong>Tabs:</strong> Organisation contenu site vitrine</li>
                  <li>• <strong>Alert:</strong> Messages système persistants</li>
                  <li>• <strong>Badge:</strong> Statuts et compteurs notifications</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">🎯 Capacités business:</h4>
                <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                  <li>• Navigation e-commerce complète</li>
                  <li>• Sites vitrine avec organisation par onglets</li>
                  <li>• Système d'alertes et notifications</li>
                  <li>• Badges dynamiques pour engagement</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

    </div>
  );
}