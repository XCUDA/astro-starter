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
        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            📬 Notifications récentes :
          </h4>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            {notifications.map((notif, index) => (
              <li key={index}>• {notif}</li>
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
          <div className="flex flex-wrap gap-3">
            {(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const).map((variant) => (
              <Button
                key={variant}
                variant={variant}
                onClick={() => addNotification(`Button ${variant} cliqué`)}
              >
                {variant}
              </Button>
            ))}
          </div>
        </div>

        {/* Button Sizes */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Tailles :</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <Button size="sm" onClick={() => addNotification('Small button cliqué')}>
              Small
            </Button>
            <Button size="default" onClick={() => addNotification('Default button cliqué')}>
              Default
            </Button>
            <Button size="lg" onClick={() => addNotification('Large button cliqué')}>
              Large
            </Button>
            <Button size="icon" onClick={() => addNotification('Icon button cliqué')}>
              🎯
            </Button>
          </div>
        </div>

        {/* Button States */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">États :</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="default">Normal</Button>
            <Button variant="default" disabled>Disabled</Button>
            <Button variant="outline" disabled>Outline Disabled</Button>
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
              <Input
                placeholder="Tapez quelque chose..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Valeur actuelle : <span className="font-mono bg-muted px-2 py-1 rounded">{inputValue || '(vide)'}</span>
              </p>
            </div>
          </div>

          {/* Input types */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Types d'input :</h3>
            <div className="space-y-3">
              <Input type="email" placeholder="email@exemple.com" />
              <Input type="password" placeholder="Mot de passe" />
              <Input type="number" placeholder="123" />
              <Input type="date" />
            </div>
          </div>
        </div>

        {/* Input disabled */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">États spéciaux :</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input placeholder="Input normal" />
            <Input placeholder="Input disabled" disabled />
            <Input placeholder="Avec valeur" defaultValue="Texte par défaut" />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card simple */}
          <Card>
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
              <Button size="sm" variant="outline" className="w-full">
                Action
              </Button>
            </CardFooter>
          </Card>

          {/* Card avec form */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 Card Interactive</CardTitle>
              <CardDescription>
                Card avec éléments interactifs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Nom d'utilisateur" />
              <Input type="email" placeholder="Email" />
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                Annuler
              </Button>
              <Button 
                size="sm" 
                className="flex-1"
                onClick={() => addNotification('Formulaire card soumis')}
              >
                Valider
              </Button>
            </CardFooter>
          </Card>

          {/* Card statistiques */}
          <Card>
            <CardHeader>
              <CardTitle>📊 Statistiques</CardTitle>
              <CardDescription>
                Exemples de métriques
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Visiteurs</span>
                  <span className="font-semibold">2,845</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Conversions</span>
                  <span className="font-semibold text-green-600">156</span>
                </div>
                <div className="flex justify-between">
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

        <div className="flex flex-wrap gap-4">
          {/* Dialog simple */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">🚀 Dialog Simple</Button>
            </DialogTrigger>
            <DialogContent>
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
                >
                  Fermer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Dialog avec formulaire */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>📧 Contact Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Formulaire de Contact</DialogTitle>
                <DialogDescription>
                  Envoyez-nous un message. Nous vous répondrons rapidement.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Input
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Votre message..."
                    required
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    Envoyer
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Dialog destructive */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">⚠️ Action Destructive</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Êtes-vous sûr ?</DialogTitle>
                <DialogDescription>
                  Cette action ne peut pas être annulée. Cela supprimera définitivement vos données.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Annuler</Button>
                <Button 
                  variant="destructive"
                  onClick={() => addNotification('Action destructive confirmée')}
                >
                  Supprimer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Résumé des tests */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          ✅ Résumé des composants testés
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium mb-2">Composants fonctionnels :</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• <strong>Button</strong> : Tous variants, tailles et états</li>
              <li>• <strong>Input</strong> : Types variés, validation, états</li>
              <li>• <strong>Card</strong> : Structure flexible, responsive</li>
              <li>• <strong>Dialog</strong> : Modales avec formulaires</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Fonctionnalités validées :</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• <strong>Dark Mode</strong> : Adaptation automatique</li>
              <li>• <strong>Interactions</strong> : Events et state management</li>
              <li>• <strong>Accessibilité</strong> : Focus et keyboard navigation</li>
              <li>• <strong>Responsive</strong> : Adaptation mobile/desktop</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}