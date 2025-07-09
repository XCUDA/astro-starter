// ComponentsDemo.tsx - Démonstration complète des composants shadcn/ui
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function ComponentsDemo() {
  // State pour les démonstrations
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  // Fonction pour ajouter une notification
  const addNotification = (message: string) => {
    setNotifications(prev => [message, ...prev.slice(0, 4)]); // Garde les 5 dernières
  };

  // Handler pour le formulaire de contact
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification(`Message envoyé de ${formData.name}`);
    setFormData({ name: '', email: '', message: '' });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-12">
      
      {/* Notifications */}
      {notifications.length > 0 && (
        <div 
          className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4"
          role="region"
          aria-label="Recent notifications and activity updates"
        >
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            📬 Notifications récentes :
          </h4>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1" role="list">
            {notifications.map((notif, index) => (
              <li key={index} role="listitem">• {notif}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Section Button */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">🔘 Button Component</h2>
          <p className="text-muted-foreground mb-6">
            Tous les variants avec gestion des états hover, focus et disabled.
          </p>
        </div>

        {/* Button Variants */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Variants :</h3>
          <div className="flex flex-wrap gap-3" role="group" aria-label="Button variants demonstration">
            {(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const).map((variant) => (
              <Button
                key={variant}
                variant={variant}
                onClick={() => addNotification(`Button ${variant} cliqué`)}
                aria-label={`Demonstrate ${variant} button variant and trigger notification`}
              >
                {variant}
              </Button>
            ))}
          </div>
        </div>

        {/* Button Sizes */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Tailles :</h3>
          <div className="flex flex-wrap gap-3 items-center" role="group" aria-label="Button sizes demonstration">
            <Button 
              size="sm" 
              onClick={() => addNotification('Small button cliqué')}
              aria-label="Demonstrate small button size and trigger notification"
            >
              Small
            </Button>
            <Button 
              size="default" 
              onClick={() => addNotification('Default button cliqué')}
              aria-label="Demonstrate default button size and trigger notification"
            >
              Default
            </Button>
            <Button 
              size="lg" 
              onClick={() => addNotification('Large button cliqué')}
              aria-label="Demonstrate large button size and trigger notification"
            >
              Large
            </Button>
            <Button 
              size="icon" 
              onClick={() => addNotification('Icon button cliqué')}
              aria-label="Demonstrate icon button with emoji target symbol"
            >
              🎯
            </Button>
          </div>
        </div>

        {/* Button States */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">États :</h3>
          <div className="flex flex-wrap gap-3" role="group" aria-label="Button states demonstration">
            <Button variant="default" aria-label="Normal active button state">Normal</Button>
            <Button variant="default" disabled aria-label="Disabled button state - not interactive">Disabled</Button>
            <Button variant="outline" disabled aria-label="Outline disabled button state - not interactive">Outline Disabled</Button>
          </div>
        </div>
      </div>

      {/* Section Input */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">📝 Input Component</h2>
          <p className="text-muted-foreground mb-6">
            Champs de saisie avec différents types et états de validation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input basique */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Input basique :</h3>
            <div className="space-y-3">
              <label htmlFor="basic-input" className="sr-only">
                Basic text input for demonstration
              </label>
              <Input
                id="basic-input"
                placeholder="Tapez quelque chose..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                aria-label="Basic text input to demonstrate real-time value updates"
              />
              <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
                Valeur actuelle : <span className="font-mono bg-muted px-2 py-1 rounded">{inputValue || '(vide)'}</span>
              </p>
            </div>
          </div>

          {/* Input types */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Types d'input :</h3>
            <div className="space-y-3">
              <label htmlFor="email-input" className="sr-only">Email address input</label>
              <Input 
                id="email-input"
                type="email" 
                placeholder="email@exemple.com"
                aria-label="Email address input for demonstration"
              />
              
              <label htmlFor="password-input" className="sr-only">Password input</label>
              <Input 
                id="password-input"
                type="password" 
                placeholder="Mot de passe"
                aria-label="Password input for demonstration"
              />
              
              <label htmlFor="number-input" className="sr-only">Number input</label>
              <Input 
                id="number-input"
                type="number" 
                placeholder="123"
                aria-label="Numeric input for demonstration"
              />
              
              <label htmlFor="date-input" className="sr-only">Date input</label>
              <Input 
                id="date-input"
                type="date"
                aria-label="Date picker input for demonstration"
              />
            </div>
          </div>
        </div>

        {/* Input disabled */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">États spéciaux :</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label htmlFor="normal-input" className="sr-only">Normal input state</label>
              <Input 
                id="normal-input"
                placeholder="Input normal"
                aria-label="Normal input state for demonstration"
              />
            </div>
            <div>
              <label htmlFor="disabled-input" className="sr-only">Disabled input state</label>
              <Input 
                id="disabled-input"
                placeholder="Input disabled" 
                disabled
                aria-label="Disabled input state - not editable"
              />
            </div>
            <div>
              <label htmlFor="default-value-input" className="sr-only">Input with default value</label>
              <Input 
                id="default-value-input"
                placeholder="Avec valeur" 
                defaultValue="Texte par défaut"
                aria-label="Input with default value for demonstration"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section Card */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">🃏 Card Component</h2>
          <p className="text-muted-foreground mb-6">
            Structure de contenu flexible avec header, content et footer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="group" aria-label="Card component variations">
          {/* Card simple */}
          <Card role="region" aria-label="Simple card example with basic structure">
            <CardHeader>
              <CardTitle>Card Simple</CardTitle>
              <CardDescription>
                Description de la card avec texte muted
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Contenu principal de la card. Peut contenir du texte, des images, ou d'autres composants.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full"
                aria-label="Perform simple card action"
              >
                Action
              </Button>
            </CardFooter>
          </Card>

          {/* Card avec form */}
          <Card role="region" aria-label="Interactive card with form elements">
            <CardHeader>
              <CardTitle>🎯 Card Interactive</CardTitle>
              <CardDescription>
                Card avec éléments interactifs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <label htmlFor="card-username" className="sr-only">Username for card form</label>
              <Input 
                id="card-username"
                placeholder="Nom d'utilisateur"
                aria-label="Username input for interactive card demonstration"
              />
              
              <label htmlFor="card-email" className="sr-only">Email for card form</label>
              <Input 
                id="card-email"
                type="email" 
                placeholder="Email"
                aria-label="Email input for interactive card demonstration"
              />
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                aria-label="Cancel interactive card form submission"
              >
                Annuler
              </Button>
              <Button 
                size="sm" 
                className="flex-1"
                onClick={() => addNotification('Formulaire card soumis')}
                aria-label="Submit interactive card form and show notification"
              >
                Valider
              </Button>
            </CardFooter>
          </Card>

          {/* Card statistiques */}
          <Card role="region" aria-label="Statistics card with business metrics">
            <CardHeader>
              <CardTitle>📊 Statistiques</CardTitle>
              <CardDescription>
                Exemples de métriques
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3" role="list" aria-label="Business metrics and statistics">
                <div className="flex justify-between" role="listitem">
                  <span className="text-sm text-muted-foreground">Visiteurs</span>
                  <span className="font-semibold">2,845</span>
                </div>
                <div className="flex justify-between" role="listitem">
                  <span className="text-sm text-muted-foreground">Conversions</span>
                  <span className="font-semibold text-green-600">156</span>
                </div>
                <div className="flex justify-between" role="listitem">
                  <span className="text-sm text-muted-foreground">Taux</span>
                  <span className="font-semibold">5.48%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                size="sm" 
                variant="ghost" 
                className="w-full"
                onClick={() => addNotification('Rapport généré')}
                aria-label="Generate detailed statistics report and show notification"
              >
                📈 Voir le rapport
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Section Dialog */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">💬 Dialog Component</h2>
          <p className="text-muted-foreground mb-6">
            Modal/dialog avec overlay et gestion du focus.
          </p>
        </div>

        <div className="flex flex-wrap gap-4" role="group" aria-label="Dialog component demonstrations">
          {/* Dialog simple */}
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline"
                aria-label="Open simple confirmation dialog to demonstrate basic modal functionality"
              >
                🚀 Dialog Simple
              </Button>
            </DialogTrigger>
            <DialogContent role="dialog" aria-label="Simple confirmation dialog">
              <DialogHeader>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogDescription>
                  Ceci est un exemple de dialog simple avec un message de confirmation.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => addNotification('Dialog simple fermé')}
                  aria-label="Close simple dialog and show notification"
                >
                  Fermer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Dialog avec formulaire */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button aria-label="Open contact form dialog to demonstrate form within modal">
                📧 Contact Dialog
              </Button>
            </DialogTrigger>
            <DialogContent role="dialog" aria-label="Contact form dialog">
              <DialogHeader>
                <DialogTitle>Formulaire de Contact</DialogTitle>
                <DialogDescription>
                  Envoyez-nous un message. Nous vous répondrons rapidement.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-medium">Nom</label>
                  <Input
                    id="contact-name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Votre nom"
                    required
                    aria-required="true"
                    aria-label="Enter your full name for contact form"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-medium">Email</label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="votre@email.com"
                    required
                    aria-required="true"
                    aria-label="Enter your email address for contact form"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-sm font-medium">Message</label>
                  <Input
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Votre message..."
                    required
                    aria-required="true"
                    aria-label="Enter your message for contact form"
                  />
                </div>
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    aria-label="Cancel contact form and close dialog"
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="submit"
                    aria-label="Submit contact form and send message"
                  >
                    Envoyer
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Dialog destructive */}
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="destructive"
                aria-label="Open destructive action confirmation dialog with warning"
              >
                ⚠️ Action Destructive
              </Button>
            </DialogTrigger>
            <DialogContent role="dialog" aria-label="Destructive action confirmation dialog">
              <DialogHeader>
                <DialogTitle>Êtes-vous sûr ?</DialogTitle>
                <DialogDescription>
                  Cette action ne peut pas être annulée. Cela supprimera définitivement vos données.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button 
                  variant="outline"
                  aria-label="Cancel destructive action and keep data safe"
                >
                  Annuler
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => addNotification('Action destructive confirmée')}
                  aria-label="Confirm destructive action and permanently delete data"
                >
                  Supprimer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Résumé des tests */}
      <div className="bg-card border border-border rounded-lg p-6" role="region" aria-label="Components testing summary and validation">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          ✅ Résumé des composants testés
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium mb-2">Composants fonctionnels :</h4>
            <ul className="space-y-1 text-muted-foreground" role="list">
              <li role="listitem">• <strong>Button</strong> : Tous variants, tailles et états</li>
              <li role="listitem">• <strong>Input</strong> : Types variés, validation, états</li>
              <li role="listitem">• <strong>Card</strong> : Structure flexible, responsive</li>
              <li role="listitem">• <strong>Dialog</strong> : Modales avec formulaires</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Fonctionnalités validées :</h4>
            <ul className="space-y-1 text-muted-foreground" role="list">
              <li role="listitem">• <strong>Dark Mode</strong> : Adaptation automatique</li>
              <li role="listitem">• <strong>Interactions</strong> : Events et state management</li>
              <li role="listitem">• <strong>Accessibilité</strong> : Focus et keyboard navigation</li>
              <li role="listitem">• <strong>Responsive</strong> : Adaptation mobile/desktop</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}