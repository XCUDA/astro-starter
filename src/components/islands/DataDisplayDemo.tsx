import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';

// Business data for realistic demos
const ordersData = [
  { id: '#ORD-001', customer: 'Sophie Martin', product: 'Site Vitrine Premium', amount: 2800, status: 'completed', date: '2025-01-15' },
  { id: '#ORD-002', customer: 'Tech Solutions SA', product: 'E-commerce Platform', amount: 5200, status: 'in-progress', date: '2025-01-12' },
  { id: '#ORD-003', customer: 'Restaurant Le Gourmet', product: 'Menu Digital', amount: 890, status: 'pending', date: '2025-01-10' },
  { id: '#ORD-004', customer: 'Atelier Créatif', product: 'Portfolio Artist', amount: 1650, status: 'completed', date: '2025-01-08' },
  { id: '#ORD-005', customer: 'Cabinet Médical', product: 'Site Professionnel', amount: 3200, status: 'in-progress', date: '2025-01-05' },
];

const teamMembers = [
  { name: 'Angelo Bedoni', role: 'Lead Developer', avatar: '', status: 'online', initials: 'AB' },
  { name: 'Sarah Chen', role: 'UX Designer', avatar: '', status: 'away', initials: 'SC' },
  { name: 'Marc Dubois', role: 'Project Manager', avatar: '', status: 'offline', initials: 'MD' },
  { name: 'Lisa Rodriguez', role: 'Content Strategist', avatar: '', status: 'online', initials: 'LR' },
];

const testimonials = [
  { 
    name: 'Marie Leroy', 
    company: 'Boutique Fleurs', 
    text: 'Site magnifique qui a doublé nos ventes en ligne', 
    avatar: '', 
    initials: 'ML' 
  },
  { 
    name: 'David Kim', 
    company: 'Tech Startup', 
    text: 'Développement rapide et professionnel, équipe réactive', 
    avatar: '', 
    initials: 'DK' 
  },
];

const businessMetrics = [
  { label: 'Revenue mensuel', value: '€12,450', trend: '+15.3%' },
  { label: 'Projets actifs', value: '8', trend: '+2' },
  { label: 'Satisfaction client', value: '98%', trend: '+3%' },
  { label: 'Temps livraison', value: '12 jours', trend: '-2 jours' },
];

export default function DataDisplayDemo() {
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [feedbackMessages, setFeedbackMessages] = useState<string[]>([]);

  // Add feedback message function
  const addFeedbackMessage = (message: string) => {
    setFeedbackMessages(prev => [message, ...prev.slice(0, 4)]);
  };

  // Table sorting and filtering logic
  const filteredOrders = useMemo(() => {
    let filtered = ordersData;
    if (filterStatus !== 'all') {
      filtered = ordersData.filter(order => order.status === filterStatus);
    }
    
    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortField as keyof typeof a];
        const bValue = b[sortField as keyof typeof b];
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        const aString = String(aValue).toLowerCase();
        const bString = String(bValue).toLowerCase();
        return sortDirection === 'asc' 
          ? aString.localeCompare(bString)
          : bString.localeCompare(aString);
      });
    }
    
    return filtered;
  }, [sortField, sortDirection, filterStatus]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    addFeedbackMessage(`Tri appliqué sur ${field} (${sortDirection === 'asc' ? 'croissant' : 'décroissant'})`);
  };

  const handleFilter = (status: string) => {
    setFilterStatus(status);
    addFeedbackMessage(`Filtre appliqué: ${status === 'all' ? 'Toutes commandes' : status}`);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'completed': 'default',
      'in-progress': 'secondary', 
      'pending': 'outline'
    } as const;
    
    const labels = {
      'completed': 'Terminé',
      'in-progress': 'En cours',
      'pending': 'En attente'
    };
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    );
  };

  const getStatusIndicator = (status: string) => {
    const colors = {
      'online': 'bg-green-500',
      'away': 'bg-yellow-500',
      'offline': 'bg-gray-400'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-400';
  };

  return (
    <TooltipProvider>
      <div className="space-y-12">
        
        {/* Feedback Messages - ARIA Live Region */}
        {feedbackMessages.length > 0 && (
          <div 
            className="bg-muted/50 border rounded-lg p-4"
            role="status"
            aria-live="polite"
            aria-label="Data display actions feedback"
          >
            <h4 id="feedback-heading" className="font-semibold mb-2">📊 Actions Data Display :</h4>
            <ul className="text-sm space-y-1" aria-labelledby="feedback-heading">
              {feedbackMessages.map((message, index) => (
                <li key={index} className="text-muted-foreground">• {message}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Table Component Demo - Business Dashboard */}
        <section aria-labelledby="table-demo-heading">
          <Card>
            <CardHeader>
              <CardTitle id="table-demo-heading" className="flex items-center gap-2">
                📊 Table Component - Dashboard Business
              </CardTitle>
              <CardDescription>
                Gestion des commandes clients avec tri et filtrage. Démonstration interactive pour dashboards professionnels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Filters */}
              <div className="flex gap-4 items-center" role="group" aria-label="Table filters">
                <div className="flex gap-2">
                  <Button 
                    variant={filterStatus === 'all' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => handleFilter('all')}
                    aria-pressed={filterStatus === 'all'}
                    aria-label={`Show all orders (${ordersData.length} total)`}
                  >
                    Tous ({ordersData.length})
                  </Button>
                  <Button 
                    variant={filterStatus === 'completed' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => handleFilter('completed')}
                    aria-pressed={filterStatus === 'completed'}
                    aria-label={`Show completed orders only (${ordersData.filter(o => o.status === 'completed').length} orders)`}
                  >
                    Terminés ({ordersData.filter(o => o.status === 'completed').length})
                  </Button>
                  <Button 
                    variant={filterStatus === 'in-progress' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => handleFilter('in-progress')}
                    aria-pressed={filterStatus === 'in-progress'}
                    aria-label={`Show in-progress orders only (${ordersData.filter(o => o.status === 'in-progress').length} orders)`}
                  >
                    En cours ({ordersData.filter(o => o.status === 'in-progress').length})
                  </Button>
                </div>
              </div>

              {/* Orders Table */}
              <div className="rounded-md border">
                <Table role="table" aria-label="Orders management table">
                  <caption className="sr-only">
                    Table of customer orders with sorting and filtering capabilities. 
                    Currently showing {filteredOrders.length} of {ordersData.length} orders.
                    {sortField && ` Sorted by ${sortField} in ${sortDirection}ending order.`}
                  </caption>
                  <TableHeader>
                    <TableRow role="row">
                      <TableHead 
                        className="cursor-pointer hover:bg-muted/50 select-none"
                        onClick={() => handleSort('id')}
                        role="columnheader"
                        aria-sort={
                          sortField === 'id' 
                            ? (sortDirection === 'asc' ? 'ascending' : 'descending')
                            : 'none'
                        }
                        aria-label={`Sort by order ID ${sortField === 'id' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSort('id');
                          }
                        }}
                      >
                        Commande {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-muted/50 select-none"
                        onClick={() => handleSort('customer')}
                        role="columnheader"
                        aria-sort={
                          sortField === 'customer' 
                            ? (sortDirection === 'asc' ? 'ascending' : 'descending')
                            : 'none'
                        }
                        aria-label={`Sort by customer name ${sortField === 'customer' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSort('customer');
                          }
                        }}
                      >
                        Client {sortField === 'customer' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead role="columnheader">Produit</TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-muted/50 select-none text-right"
                        onClick={() => handleSort('amount')}
                        role="columnheader"
                        aria-sort={
                          sortField === 'amount' 
                            ? (sortDirection === 'asc' ? 'ascending' : 'descending')
                            : 'none'
                        }
                        aria-label={`Sort by amount ${sortField === 'amount' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSort('amount');
                          }
                        }}
                      >
                        Montant {sortField === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead role="columnheader">Statut</TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-muted/50 select-none"
                        onClick={() => handleSort('date')}
                        role="columnheader"
                        aria-sort={
                          sortField === 'date' 
                            ? (sortDirection === 'asc' ? 'ascending' : 'descending')
                            : 'none'
                        }
                        aria-label={`Sort by date ${sortField === 'date' ? (sortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSort('date');
                          }
                        }}
                      >
                        Date {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-muted/50" role="row">
                        <TableCell className="font-medium" role="cell">{order.id}</TableCell>
                        <TableCell role="cell">{order.customer}</TableCell>
                        <TableCell className="text-muted-foreground" role="cell">{order.product}</TableCell>
                        <TableCell className="text-right font-semibold" role="cell">
                          <span aria-label={`${order.amount} euros`}>
                            €{order.amount.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell role="cell">{getStatusBadge(order.status)}</TableCell>
                        <TableCell className="text-muted-foreground" role="cell">{order.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="text-sm text-muted-foreground">
                💡 Cliquez sur les en-têtes pour trier. Utilisez les filtres pour voir différents statuts.
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Avatar Component Demo - Team & Testimonials */}
        <section aria-labelledby="avatar-demo-heading">
          <Card>
            <CardHeader>
              <CardTitle id="avatar-demo-heading" className="flex items-center gap-2">
                👥 Avatar Component - Équipe & Témoignages
              </CardTitle>
              <CardDescription>
                Présentation d'équipe avec statuts en ligne et témoignages clients. Idéal pour pages équipe et social proof.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Team Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">🏢 Notre Équipe</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" role="list" aria-label="Team members">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50" role="listitem">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={`${member.name} avatar`} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        {/* Status indicator */}
                        <div 
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusIndicator(member.status)}`} 
                          aria-label={`Status: ${member.status}`}
                          role="img"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{member.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">💬 Témoignages Clients</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list" aria-label="Customer testimonials">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="p-4 rounded-lg border bg-muted/30" role="listitem">
                      <div className="flex items-start space-x-3">
                        <Avatar className="mt-1">
                          <AvatarImage src={testimonial.avatar} alt={`${testimonial.name} avatar`} />
                          <AvatarFallback className="bg-secondary text-secondary-foreground">
                            {testimonial.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <blockquote className="text-sm mb-2 italic">"{testimonial.text}"</blockquote>
                          <div>
                            <p className="font-medium text-sm">{testimonial.name}</p>
                            <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avatar Sizes Demo */}
              <div>
                <h3 className="text-lg font-semibold mb-4">📏 Tailles d'Avatars</h3>
                <div className="flex items-center space-x-4" role="group" aria-label="Avatar size examples">
                  <Avatar className="w-8 h-8" aria-label="Extra small avatar">
                    <AvatarFallback className="text-xs">XS</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-10 h-10" aria-label="Small avatar">
                    <AvatarFallback className="text-sm">SM</AvatarFallback>
                  </Avatar>
                  <Avatar aria-label="Medium avatar">
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-12 h-12" aria-label="Large avatar">
                    <AvatarFallback>LG</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-16 h-16" aria-label="Extra large avatar">
                    <AvatarFallback className="text-lg">XL</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                💡 Points verts/jaunes/gris = statut en ligne. Idéal pour équipes et témoignages clients.
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tooltip Component Demo - Business Metrics Help */}
        <section aria-labelledby="tooltip-demo-heading">
          <Card>
            <CardHeader>
              <CardTitle id="tooltip-demo-heading" className="flex items-center gap-2">
                💡 Tooltip Component - Aide Contextuelle Business
              </CardTitle>
              <CardDescription>
                Info-bulles pour expliquer métriques business et fournir aide contextuelle. Améliore l'UX sans encombrer l'interface.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Business Metrics with Tooltips */}
              <div>
                <h3 className="text-lg font-semibold mb-4">📈 Métriques Business</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" role="list" aria-label="Business metrics">
                  {businessMetrics.map((metric, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <div 
                          className="p-4 rounded-lg border hover:bg-muted/50 cursor-help transition-colors"
                          role="listitem"
                          aria-describedby={`metric-tooltip-${index}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-muted-foreground">{metric.label}</p>
                            <span className="text-xs text-blue-600" aria-hidden="true">?</span>
                          </div>
                          <p className="text-2xl font-bold">{metric.value}</p>
                          <p className="text-sm text-green-600">{metric.trend}</p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs" id={`metric-tooltip-${index}`}>
                        <p className="font-medium mb-1">{metric.label}</p>
                        <p className="text-sm">
                          {index === 0 && "Chiffre d'affaires mensuel récurrent. Calculé sur les 30 derniers jours avec projections."}
                          {index === 1 && "Nombre de projets clients actuellement en développement ou en phase de livraison."}
                          {index === 2 && "Pourcentage de satisfaction basé sur les retours clients post-livraison (NPS)."}
                          {index === 3 && "Délai moyen entre commande client et livraison finale du projet."}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>

              {/* Help Form with Tooltips */}
              <div>
                <h3 className="text-lg font-semibold mb-4">📋 Formulaire avec Aide</h3>
                <form className="max-w-md space-y-4" aria-labelledby="help-form-heading">
                  <h4 id="help-form-heading" className="sr-only">Project quote form with contextual help</h4>
                  <div>
                    <label htmlFor="budget-input" className="text-sm font-medium mb-2 flex items-center gap-2">
                      Budget projet
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-blue-600 cursor-help" aria-label="Help about budget">ⓘ</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Budget total incluant développement, design et maintenance première année</p>
                        </TooltipContent>
                      </Tooltip>
                    </label>
                    <Input 
                      id="budget-input"
                      placeholder="Ex: 5000 €" 
                      aria-describedby="budget-help"
                    />
                    <span id="budget-help" className="sr-only">
                      Enter your total project budget including development, design and first year maintenance
                    </span>
                  </div>
                  
                  <div>
                    <label htmlFor="deadline-input" className="text-sm font-medium mb-2 flex items-center gap-2">
                      Délai souhaité
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-blue-600 cursor-help" aria-label="Help about deadline">ⓘ</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Délai de livraison souhaité. Projets standards: 2-4 semaines</p>
                        </TooltipContent>
                      </Tooltip>
                    </label>
                    <Input 
                      id="deadline-input"
                      placeholder="Ex: 3 semaines" 
                      aria-describedby="deadline-help"
                    />
                    <span id="deadline-help" className="sr-only">
                      Enter your desired delivery deadline. Standard projects take 2-4 weeks
                    </span>
                  </div>
                  
                  <Button 
                    type="button"
                    className="w-full"
                    onClick={() => addFeedbackMessage('Formulaire avec tooltips d\'aide soumis')}
                    aria-describedby="submit-button-help"
                  >
                    Demander un devis
                  </Button>
                  <span id="submit-button-help" className="sr-only">
                    Click to submit your quote request with the provided information
                  </span>
                </form>
              </div>

              <div className="text-sm text-muted-foreground">
                💡 Survolez les éléments avec "?" ou "ⓘ" pour voir les explications détaillées.
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Accordion Component Demo - FAQ & Documentation */}
        <section aria-labelledby="accordion-demo-heading">
          <Card>
            <CardHeader>
              <CardTitle id="accordion-demo-heading" className="flex items-center gap-2">
                📚 Accordion Component - FAQ & Documentation
              </CardTitle>
              <CardDescription>
                Organisation de contenu par sections pliables. Parfait pour FAQ clients et documentation technique structurée.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Client FAQ */}
              <div>
                <h3 className="text-lg font-semibold mb-4">❓ FAQ Clients</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Combien de temps pour créer un site vitrine ?</AccordionTrigger>
                    <AccordionContent>
                      Un site vitrine standard prend entre 2 à 4 semaines selon la complexité. 
                      Cela inclut la conception, le développement, les tests et la mise en ligne. 
                      Les projets e-commerce peuvent nécessiter 4 à 8 semaines supplémentaires.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Quel est le coût d'un site professionnel ?</AccordionTrigger>
                    <AccordionContent>
                      Site vitrine simple: 800-2500€ | Site vitrine avancé: 2500-5000€ | 
                      E-commerce: 3000-8000€ | Application web: Sur devis. 
                      Prix incluant design, développement, responsive, SEO de base et formation.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Le site sera-t-il responsive (mobile) ?</AccordionTrigger>
                    <AccordionContent>
                      Absolument ! Tous nos sites sont développés "mobile-first" et s'adaptent 
                      parfaitement à tous les écrans (smartphone, tablette, desktop). 
                      Nous testons sur différents appareils avant livraison.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Puis-je modifier le contenu moi-même ?</AccordionTrigger>
                    <AccordionContent>
                      Oui ! Nous intégrons un système de gestion de contenu simple ou 
                      fournissons une formation pour les modifications de base. 
                      Pour les changements complexes, nous proposons un contrat de maintenance.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Que comprend la maintenance ?</AccordionTrigger>
                    <AccordionContent>
                      Maintenance: mises à jour sécurité, sauvegarde, monitoring, support technique. 
                      Forfaits de 50€/mois (site vitrine) à 200€/mois (e-commerce). 
                      Modifications de contenu et évolutions sur devis séparé.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Technical Documentation */}
              <div>
                <h3 className="text-lg font-semibold mb-4">🔧 Documentation Technique</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="tech-1">
                    <AccordionTrigger>Technologies utilisées</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p><strong>Frontend:</strong> Astro 5, React, TypeScript, TailwindCSS 4</p>
                        <p><strong>Composants:</strong> shadcn/ui pour interface moderne et accessible</p>
                        <p><strong>Performance:</strong> Islands Architecture, optimisation automatique</p>
                        <p><strong>Hébergement:</strong> Vercel, Netlify, ou serveurs Node.js traditionnels</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="tech-2">
                    <AccordionTrigger>Performance et SEO</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p><strong>Lighthouse Score:</strong> 100/100 sur les 4 métriques</p>
                        <p><strong>Core Web Vitals:</strong> LCP &lt; 1.2s, CLS &lt; 0.1, FID &lt; 100ms</p>
                        <p><strong>SEO:</strong> Structure sémantique, méta-données, Open Graph</p>
                        <p><strong>Accessibilité:</strong> WCAG 2.1 AA, navigation clavier, screen readers</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="tech-3">
                    <AccordionTrigger>Déploiement et mise en production</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <p><strong>Build:</strong> Génération statique optimisée, assets compressés</p>
                        <p><strong>CDN:</strong> Distribution mondiale pour temps de chargement minimal</p>
                        <p><strong>SSL:</strong> Certificats automatiques, HTTPS forcé</p>
                        <p><strong>Monitoring:</strong> Uptime, performance, erreurs en temps réel</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="text-sm text-muted-foreground">
                💡 Cliquez sur les sections pour révéler le contenu. Idéal pour organiser information sans surcharge visuelle.
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sprint 3 Summary */}
        <section aria-labelledby="sprint-summary-heading">
          <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
            <CardHeader>
              <CardTitle id="sprint-summary-heading" className="flex items-center gap-2 text-green-800 dark:text-green-200">
                🎊 Sprint 3 Data Display - Completed!
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-green-300">
                Système complet d'affichage de données professionnel avec cas d'usage business réalistes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">✅ Composants ajoutés:</h4>
                  <ul className="space-y-1 text-green-700 dark:text-green-300" role="list">
                    <li role="listitem">• <strong>Table:</strong> Dashboard analytics + gestion commandes</li>
                    <li role="listitem">• <strong>Avatar:</strong> Équipe avec statuts + témoignages</li>
                    <li role="listitem">• <strong>Tooltip:</strong> Métriques business + aide contextuelle</li>
                    <li role="listitem">• <strong>Accordion:</strong> FAQ clients + documentation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">🎯 Capacités business:</h4>
                  <ul className="space-y-1 text-green-700 dark:text-green-300" role="list">
                    <li role="listitem">• Dashboards professionnels complets</li>
                    <li role="listitem">• Pages équipe avec statuts en temps réel</li>
                    <li role="listitem">• Aide contextuelle sans encombrement</li>
                    <li role="listitem">• FAQ et documentation structurée</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 rounded bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200">
                <p className="font-semibold">🏆 Progression: 70% du projet terminé!</p>
                <p className="text-sm">Sprint 1 (Forms) + Sprint 2 (Navigation) + Sprint 3 (Data Display) = Triple Sprint Mastery</p>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </TooltipProvider>
  );
}