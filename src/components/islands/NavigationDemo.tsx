// NavigationDemo.tsx - Démonstration complète des Navigation & Feedback Components
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

export default function NavigationDemo() {
  // États pour les démos interactives
  const [currentPage, setCurrentPage] = useState('home');
  const [activeAlerts, setActiveAlerts] = useState<Array<{id: string, type: 'default' | 'destructive', title: string, message: string}>>([]);
  const [notifications, setNotifications] = useState(3);
  const [cartItems, setCartItems] = useState(5);

  // Fonction pour ajouter des alertes
  const addAlert = (type: 'default' | 'destructive', title: string, message: string) => {
    const id = Date.now().toString();
    setActiveAlerts(prev => [{ id, type, title, message }, ...prev.slice(0, 2)]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setActiveAlerts(prev => prev.filter(alert => alert.id !== id));
    }, 5000);
  };

  // Navigation paths pour breadcrumb
  const navigationPaths = {
    home: [{ label: 'Accueil', href: '/' }],
    products: [
      { label: 'Accueil', href: '/' },
      { label: 'Produits', href: '/products' }
    ],
    category: [
      { label: 'Accueil', href: '/' },
      { label: 'Produits', href: '/products' },
      { label: 'Électronique', href: '/products/electronics' }
    ],
    product: [
      { label: 'Accueil', href: '/' },
      { label: 'Produits', href: '/products' },
      { label: 'Électronique', href: '/products/electronics' },
      { label: 'MacBook Pro', href: '/products/electronics/macbook-pro' }
    ]
  };

  return (
    <div className="space-y-12">
      
      {/* Active Alerts */}
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

      {/* Section Breadcrumb */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">🗺️ Breadcrumb Component</h2>
          <p className="text-muted-foreground mb-6">
            Navigation hiérarchique pour améliorer l'UX et le SEO des sites e-commerce.
          </p>
        </div>

        {/* Breadcrumb Interactive Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Navigation Hiérarchique Interactive</CardTitle>
            <CardDescription>
              Simulez la navigation dans un site e-commerce
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Breadcrumb actuel */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <Breadcrumb>
                <BreadcrumbList>
                  {navigationPaths[currentPage as keyof typeof navigationPaths].map((item, index, array) => (
                    <BreadcrumbItem key={index}>
                      {index === array.length - 1 ? (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      ) : (
                        <>
                          <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                          <BreadcrumbSeparator />
                        </>
                      )}
                    </BreadcrumbItem>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* Navigation buttons */}
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={currentPage === 'home' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setCurrentPage('home')}
              >
                🏠 Accueil
              </Button>
              <Button 
                variant={currentPage === 'products' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setCurrentPage('products')}
              >
                📦 Produits
              </Button>
              <Button 
                variant={currentPage === 'category' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setCurrentPage('category')}
              >
                💻 Électronique
              </Button>
              <Button 
                variant={currentPage === 'product' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setCurrentPage('product')}
              >
                🍎 MacBook Pro
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section Tabs */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">📑 Tabs Component</h2>
          <p className="text-muted-foreground mb-6">
            Organisation de contenu en onglets pour sites vitrine et portfolios.
          </p>
        </div>

        {/* Tabs Demo - Site Entreprise */}
        <Card>
          <CardHeader>
            <CardTitle>Site Vitrine Entreprise</CardTitle>
            <CardDescription>
              Organisation typique du contenu d'une entreprise
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
              
              <TabsContent value="about" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">🏢 À Propos de Notre Entreprise</h3>
                  <p className="text-muted-foreground">
                    Depuis 2010, nous développons des solutions web innovantes pour nos clients. 
                    Notre expertise couvre le développement frontend et backend, l'UX/UI design, 
                    et la stratégie digitale.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-primary">150+</div>
                      <div className="text-sm text-muted-foreground">Projets Réalisés</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-primary">50+</div>
                      <div className="text-sm text-muted-foreground">Clients Satisfaits</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-primary">13</div>
                      <div className="text-sm text-muted-foreground">Années d'Expérience</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="services" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">⚙️ Nos Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-border rounded-lg">
                      <h4 className="font-semibold mb-2">🎨 Design UI/UX</h4>
                      <p className="text-sm text-muted-foreground">
                        Conception d'interfaces utilisateur modernes et intuitives
                      </p>
                      <Badge variant="secondary" className="mt-2">Populaire</Badge>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                      <h4 className="font-semibold mb-2">💻 Développement Web</h4>
                      <p className="text-sm text-muted-foreground">
                        Sites vitrine, e-commerce et applications web sur mesure
                      </p>
                      <Badge variant="default" className="mt-2">Recommandé</Badge>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                      <h4 className="font-semibold mb-2">📱 Applications Mobile</h4>
                      <p className="text-sm text-muted-foreground">
                        Apps natives et hybrides pour iOS et Android
                      </p>
                      <Badge variant="outline" className="mt-2">Nouveau</Badge>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                      <h4 className="font-semibold mb-2">🚀 SEO & Marketing</h4>
                      <p className="text-sm text-muted-foreground">
                        Optimisation pour moteurs de recherche et stratégie digitale
                      </p>
                      <Badge variant="destructive" className="mt-2">Promo -20%</Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="portfolio" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">🎯 Portfolio</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { title: 'E-commerce Fashion', tech: 'React', status: 'Récent' },
                      { title: 'App Restaurant', tech: 'React Native', status: 'En cours' },
                      { title: 'Plateforme SaaS', tech: 'Next.js', status: 'Terminé' }
                    ].map((project, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{project.title}</h4>
                          <Badge variant={project.status === 'En cours' ? 'default' : 'secondary'}>
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Développé avec {project.tech}
                        </p>
                        <div className="h-20 bg-muted/50 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="team" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">👥 Notre Équipe</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { name: 'Marie Dupont', role: 'Lead Developer', status: 'Disponible' },
                      { name: 'Jean Martin', role: 'UI/UX Designer', status: 'En projet' },
                      { name: 'Sophie Chen', role: 'Project Manager', status: 'Disponible' }
                    ].map((member, index) => (
                      <div key={index} className="text-center p-4 border border-border rounded-lg">
                        <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-3"></div>
                        <h4 className="font-semibold">{member.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                        <Badge variant={member.status === 'Disponible' ? 'default' : 'secondary'}>
                          {member.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Section Alert */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">⚠️ Alert Component</h2>
          <p className="text-muted-foreground mb-6">
            Messages système pour informer, alerter et guider l'utilisateur.
          </p>
        </div>

        {/* Alert Demo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Alert Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Types d'Alertes</CardTitle>
              <CardDescription>Exemples d'alertes pour différents contextes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTitle>ℹ️ Information</AlertTitle>
                <AlertDescription>
                  Votre profil a été mis à jour avec succès.
                </AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <AlertTitle>❌ Erreur</AlertTitle>
                <AlertDescription>
                  Impossible de traiter votre demande. Veuillez réessayer.
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertTitle>🎉 Succès</AlertTitle>
                <AlertDescription>
                  Commande validée ! Vous recevrez un email de confirmation.
                </AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <AlertTitle>⚠️ Attention</AlertTitle>
                <AlertDescription>
                  Votre session expire dans 5 minutes. Sauvegardez votre travail.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Interactive Alert Generator */}
          <Card>
            <CardHeader>
              <CardTitle>Générateur d'Alertes</CardTitle>
              <CardDescription>Testez les alertes interactives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
              
              <div className="pt-4 text-sm text-muted-foreground">
                <p>💡 Les alertes apparaissent en haut de page et disparaissent automatiquement après 5 secondes.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Section Badge */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">🏷️ Badge Component</h2>
          <p className="text-muted-foreground mb-6">
            Étiquettes et statuts pour améliorer l'information visuelle.
          </p>
        </div>

        {/* Badge Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Badge Variants */}
          <Card>
            <CardHeader>
              <CardTitle>Variants de Badge</CardTitle>
              <CardDescription>Différents styles selon le contexte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Statuts Système :</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">En ligne</Badge>
                  <Badge variant="secondary">Hors ligne</Badge>
                  <Badge variant="destructive">Erreur</Badge>
                  <Badge variant="outline">En attente</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">E-commerce :</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="destructive">-50% PROMO</Badge>
                  <Badge variant="default">NOUVEAU</Badge>
                  <Badge variant="secondary">ÉPUISÉ</Badge>
                  <Badge variant="outline">BIENTÔT</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Notifications :</h4>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span>Messages</span>
                    <Badge variant="destructive">{notifications}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Panier</span>
                    <Badge variant="default">{cartItems}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Badge Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Demo Interactive</CardTitle>
              <CardDescription>Simulez des interactions avec badges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Produit avec badges */}
              <div className="p-4 border border-border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">MacBook Pro M3</h4>
                  <div className="flex gap-1">
                    <Badge variant="destructive">-15%</Badge>
                    <Badge variant="default">Nouveau</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Ordinateur portable haute performance
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">2.549€</span>
                    <span className="text-sm text-muted-foreground line-through">2.999€</span>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => {
                      setCartItems(prev => prev + 1);
                      addAlert('default', '🛒 Ajouté', 'Produit ajouté au panier');
                    }}
                  >
                    Ajouter au panier
                  </Button>
                </div>
              </div>

              {/* Contrôles notifications */}
              <div className="space-y-3">
                <h4 className="font-medium">Gestion Notifications :</h4>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setNotifications(prev => prev + 1);
                      addAlert('default', '📨 Message', 'Nouveau message reçu');
                    }}
                  >
                    + Message
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setNotifications(prev => Math.max(0, prev - 1))}
                  >
                    Lire Message
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCartItems(prev => Math.max(0, prev - 1))}
                  >
                    Retirer Panier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Résumé Sprint 2 */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          ✅ Sprint 2 - Navigation & Feedback Components validés
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium mb-3">Navigation Components :</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>Breadcrumb :</strong> Navigation hiérarchique e-commerce</li>
              <li>• <strong>Tabs :</strong> Organisation contenu multi-sections</li>
              <li>• <strong>SEO :</strong> Structure claire pour moteurs recherche</li>
              <li>• <strong>UX :</strong> Navigation intuitive et professionnelle</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Feedback Components :</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>Alert :</strong> Messages système (info, succès, erreur)</li>
              <li>• <strong>Badge :</strong> Statuts, promotions, notifications</li>
              <li>• <strong>Engagement :</strong> Feedback visuel immédiat</li>
              <li>• <strong>Conversion :</strong> Call-to-action avec badges promo</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}