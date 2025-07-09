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
      
      {/* Notifications - ARIA Live Region */}
      {notifications.length > 0 && (
        <div 
          className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4"
          role="status" 
          aria-live="polite"
          aria-label="Component interaction notifications"
        >
          <h4 id="notifications-heading" className="font-semibold text-green-800 dark:text-green-200 mb-2">
            📬 Notifications récentes :
          </h4>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1" aria-labelledby="notifications-heading">
            {notifications.map((notif, index) => (
              <li key={index}>• {notif}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Section Button */}
      <section className="space-y-6" aria-labelledby="button-section-heading">
        <div>
          <h2 id="button-section-heading" className="text-2xl font-semibold text-foreground mb-4">🔘 Button Component</h2>
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
                aria-describedby={`button-${variant}-description`}
              >
                {variant}
                <span id={`button-${variant}-description`} className="sr-only">
                  Bouton de démonstration du variant {variant}
                </span>
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
              aria-label="Small size button example"
            >
              Small
            </Button>
            <Button 
              size="default" 
              onClick={() => addNotification('Default button cliqué')}
              aria-label="Default size button example"
            >
              Default
            </Button>
            <Button 
              size="lg" 
              onClick={() => addNotification('Large button cliqué')}
              aria-label="Large size button example"
            >
              Large
            </Button>
            <Button 
              size="icon" 
              onClick={() => addNotification('Icon button cliqué')}
              aria-label="Icon button example with target emoji"
            >
              🎯
            </Button>
          </div>
        </div>

        {/* Button States */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">États :</h3>
          <div className="flex flex-wrap gap-3" role="group" aria-label="Button states demonstration">
            <Button variant="default" aria-label="Normal state button">Normal</Button>
            <Button variant="default" disabled aria-label="Disabled state button">Disabled</Button>
            <Button variant="outline" disabled aria-label="Outline disabled state button">Outline Disabled</Button>
          </div>
        </div>
      </section>

      {/* Section Input */}
      <section className="space-y-6" aria-labelledby="input-section-heading">
        <div>
          <h2 id="input-section-heading" className="text-2xl font-semibold text-foreground mb-4">📝 Input Component</h2>
          <p className="text-muted-foreground mb-6">
            Champs de saisie avec différents types et états de validation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input basique */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Input basique :</h3>
            <div className="space-y-3">
              <label htmlFor="demo-input-basic" className="sr-only">
                Champ de démonstration pour tester la saisie
              </label>
              <Input
                id="demo-input-basic"
                placeholder="Tapez quelque chose..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                aria-describedby="demo-input-help"
              />
              <span id="demo-input-help" className="sr-only">
                La valeur saisie s'affichera ci-dessous en temps réel
              </span>
              <p className="text-sm text-muted-foreground" aria-live="polite">
                Valeur actuelle : <span className="font-mono bg-muted px-2 py-1 rounded">{inputValue || '(vide)'}</span>
              </p>
            </div>
          </div>

          {/* Input types */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Types d'input :</h3>
            <div className="space-y-3" role="group" aria-label="Different input types demonstration">
              <Input 
                type="email" 
                placeholder="email@exemple.com" 
                aria-label="Démonstration input email"
              />
              <Input 
                type="password" 
                placeholder="Mot de passe" 
                aria-label="Démonstration input password"
              />
              <Input 
                type="number" 
                placeholder="123" 
                aria-label="Démonstration input number"
              />
              <Input 
                type="date" 
                aria-label="Démonstration input date"
              />
            </div>
          </div>
        </div>

        {/* Input disabled */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">États spéciaux :</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3" role="group" aria-label="Input states demonstration">
            <Input 
              placeholder="Input normal" 
              aria-label="Normal state input"
            />
            <Input 
              placeholder="Input disabled" 
              disabled 
              aria-label="Disabled state input"
            />
            <Input 
              placeholder="Avec valeur" 
              defaultValue="Texte par défaut" 
              aria-label="Input with default value"
            />
          </div>
        </div>
      </section>

      {/* Section Card */}
      <section className="space-y-6" aria-labelledby="card-section-heading">
        <div>
          <h2 id="card-section-heading" className="text-2xl font-semibold text-foreground mb-4">🃏 Card Component</h2>
          <p className="text-muted-foreground mb-6">
            Structure de contenu flexible avec header, content et footer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="group" aria-label="Card components demonstration">
          {/* Card simple */}
          <Card role="article" aria-labelledby="simple-card-title">
            <CardHeader>
              <CardTitle id="simple-card-title">Card Simple</CardTitle>
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
                aria-label="Action button for simple card"
              >
                Action
              </Button>
            </CardFooter>
          </Card>

          {/* Card avec form */}
          <Card role="article" aria-labelledby="interactive-card-title">
            <CardHeader>
              <CardTitle id="interactive-card-title">🎯 Card Interactive</CardTitle>
              <CardDescription>
                Card avec éléments interactifs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <label htmlFor="card-username" className="sr-only">Nom d'utilisateur</label>
              <Input 
                id="card-username"
                placeholder="Nom d'utilisateur" 
                aria-label="Nom d'utilisateur pour démonstration"
              />
              <label htmlFor="card-email" className="sr-only">Email</label>
              <Input 
                id="card-email"
                type="email" 
                placeholder="Email" 
                aria-label="Email pour démonstration"
              />
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                aria-label="Cancel interactive card form"
              >
                Annuler
              </Button>
              <Button 
                size="sm" 
                className="flex-1"
                onClick={() => addNotification('Formulaire card soumis')}
                aria-label="Submit interactive card form"
              >
                Valider
              </Button>
            </CardFooter>
          </Card>

          {/* Card statistiques */}
          <Card role="article" aria-labelledby="stats-card-title">
            <CardHeader>
              <CardTitle id="stats-card-title">📊 Statistiques</CardTitle>
              <CardDescription>
                Exemples de métriques
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3" role="list" aria-label="Statistics metrics">
                <div className="flex justify-between" role="listitem">
                  <span className="text-sm text-muted-foreground">Visiteurs</span>
                  <span className="font-semibold" aria-label="2845 visiteurs">2,845</span>
                </div>
                <div className="flex justify-between" role="listitem">
                  <span className="text-sm text-muted-foreground">Conversions</span>
                  <span className="font-semibold text-green-600" aria-label="156 conversions">156</span>
                </div>
                <div className="flex justify-between" role="listitem">
                  <span className="text-sm text-muted-foreground">Taux</span>
                  <span className="font-semibold" aria-label="Taux de conversion 5.48%">5.48%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                size="sm" 
                variant="ghost" 
                className="w-full"
                onClick={() => addNotification('Rapport généré')}
                aria-label="Generate detailed statistics report"
              >
                📈 Voir le rapport
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Section Dialog */}
      <section className="space-y-6" aria-labelledby="dialog-section-heading">
        <div>
          <h2 id="dialog-section-heading" className="text-2xl font-semibold text-foreground mb-4">💬 Dialog Component</h2>
          <p className="text-muted-foreground mb-6">
            Modal/dialog avec overlay et gestion du focus.
          </p>
        </div>

        <div className="flex flex-wrap gap-4" role="group" aria-label="Dialog components demonstration">
          {/* Dialog simple */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" aria-describedby="simple-dialog-description">🚀 Dialog Simple</Button>
            </DialogTrigger>
            <DialogContent role="dialog" aria-labelledby="simple-dialog-title">
              <DialogHeader>
                <DialogTitle id="simple-dialog-title">Confirmation</DialogTitle>
                <DialogDescription id="simple-dialog-description">
                  Ceci est un exemple de dialog simple avec un message de confirmation.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => addNotification('Dialog simple fermé')}
                  aria-label="Close simple dialog"
                >
                  Fermer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Dialog avec formulaire */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button aria-describedby="contact-dialog-description">📧 Contact Dialog</Button>
            </DialogTrigger>
            <DialogContent role="dialog" aria-labelledby="contact-dialog-title">
              <DialogHeader>
                <DialogTitle id="contact-dialog-title">Formulaire de Contact</DialogTitle>
                <DialogDescription id="contact-dialog-description">
                  Envoyez-nous un message. Nous vous répondrons rapidement.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleContactSubmit} aria-labelledby="contact-dialog-title">
                <fieldset className="space-y-4">
                  <legend className="sr-only">Formulaire de contact dans dialog</legend>
                  <div className="space-y-2">
                    <label htmlFor="dialog-name" className="text-sm font-medium">Nom</label>
                    <Input
                      id="dialog-name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Votre nom"
                      required
                      aria-required="true"
                      aria-describedby="dialog-name-help"
                    />
                    <span id="dialog-name-help" className="sr-only">
                      Saisissez votre nom complet
                    </span>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="dialog-email" className="text-sm font-medium">Email</label>
                    <Input
                      id="dialog-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="votre@email.com"
                      required
                      aria-required="true"
                      aria-describedby="dialog-email-help"
                    />
                    <span id="dialog-email-help" className="sr-only">
                      Saisissez votre adresse email
                    </span>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="dialog-message" className="text-sm font-medium">Message</label>
                    <Input
                      id="dialog-message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Votre message..."
                      required
                      aria-required="true"
                      aria-describedby="dialog-message-help"
                    />
                    <span id="dialog-message-help" className="sr-only">
                      Saisissez votre message
                    </span>
                  </div>
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                      aria-label="Cancel contact form"
                    >
                      Annuler
                    </Button>
                    <Button 
                      type="submit"
                      aria-label="Send contact message"
                    >
                      Envoyer
                    </Button>
                  </DialogFooter>
                </fieldset>
              </form>
            </DialogContent>
          </Dialog>

          {/* Dialog destructive */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" aria-describedby="destructive-dialog-description">⚠️ Action Destructive</Button>
            </DialogTrigger>
            <DialogContent role="dialog" aria-labelledby="destructive-dialog-title">
              <DialogHeader>
                <DialogTitle id="destructive-dialog-title">Êtes-vous sûr ?</DialogTitle>
                <DialogDescription id="destructive-dialog-description">
                  Cette action ne peut pas être annulée. Cela supprimera définitivement vos données.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button 
                  variant="outline"
                  aria-label="Cancel destructive action"
                >
                  Annuler
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => addNotification('Action destructive confirmée')}
                  aria-label="Confirm destructive action - this will delete data permanently"
                >
                  Supprimer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Résumé des tests   */}
      <section 
        className="bg-card border border-border rounded-lg p-6"
        aria-labelledby="summary-heading"
        role="region"
      >
        <h3 id="summary-heading" className="text-lg font-semibold text-card-foreground mb-4">
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
      </section>

    </div>
  );
}