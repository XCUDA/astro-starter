import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function FormShowcaseDemo() {
  // States pour les différents formulaires
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    urgency: '',
    newsletter: false
  });

  const [newsletterForm, setNewsletterForm] = useState({
    email: '',
    frequency: '',
    topics: [] as string[],
    terms: false
  });

  const [quoteForm, setQuoteForm] = useState({
    company: '',
    email: '',
    project: '',
    budget: '',
    timeline: '',
    services: [] as string[],
    description: '',
    nda: false
  });

  const [registrationForm, setRegistrationForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    role: '',
    experience: '',
    notifications: false,
    marketing: false,
    terms: false
  });

  // États de soumission
  const [submissions, setSubmissions] = useState<{[key: string]: 'idle' | 'loading' | 'success' | 'error'}>({
    contact: 'idle',
    newsletter: 'idle',
    quote: 'idle',
    registration: 'idle'
  });

  // Messages de feedback pour les soumissions
  const [feedbackMessages, setFeedbackMessages] = useState<string[]>([]);

  // Fonction pour ajouter un message de feedback
  const addFeedbackMessage = (message: string) => {
    setFeedbackMessages(prev => [message, ...prev.slice(0, 4)]);
  };

  // Simuler soumission de formulaire
  const simulateSubmission = async (formType: string, data: any) => {
    setSubmissions(prev => ({ ...prev, [formType]: 'loading' }));
    
    // Simulation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulation succès (ou erreur aléatoire)
    const success = Math.random() > 0.2; // 80% de succès
    
    if (success) {
      setSubmissions(prev => ({ ...prev, [formType]: 'success' }));
      addFeedbackMessage(`✅ Formulaire ${formType} soumis avec succès`);
      
      // Reset form après succès
      setTimeout(() => {
        setSubmissions(prev => ({ ...prev, [formType]: 'idle' }));
      }, 3000);
    } else {
      setSubmissions(prev => ({ ...prev, [formType]: 'error' }));
      addFeedbackMessage(`❌ Erreur lors de la soumission du formulaire ${formType}`);
      
      setTimeout(() => {
        setSubmissions(prev => ({ ...prev, [formType]: 'idle' }));
      }, 3000);
    }
  };

  // Handlers de soumission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    simulateSubmission('contact', contactForm);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    simulateSubmission('newsletter', newsletterForm);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    simulateSubmission('quote', quoteForm);
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    simulateSubmission('registration', registrationForm);
  };

  return (
    <div className="space-y-12">
      
      {/* Form Submissions Feedback */}
      {feedbackMessages.length > 0 && (
        <div className="bg-muted/50 border rounded-lg p-4">
          <h4 className="font-semibold mb-2">📬 Soumissions de formulaires :</h4>
          <ul className="text-sm space-y-1">
            {feedbackMessages.map((message, index) => (
              <li key={index} className="text-muted-foreground">• {message}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Grid des formulaires */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. Formulaire de Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📧 Contact Form
              {submissions.contact === 'loading' && <span className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">Envoi...</span>}
              {submissions.contact === 'success' && <span className="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">✅ Envoyé</span>}
              {submissions.contact === 'error' && <span className="text-xs bg-red-100 dark:bg-red-900 px-2 py-1 rounded">❌ Erreur</span>}
            </CardTitle>
            <CardDescription>
              Formulaire de contact classique pour sites vitrine
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleContactSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Nom complet *</Label>
                  <Input
                    id="contact-name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Jean Dupont"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="jean@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-subject">Sujet</Label>
                  <Input
                    id="contact-subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Demande d'information"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-urgency">Urgence</Label>
                  <Select value={contactForm.urgency} onValueChange={(value) => setContactForm(prev => ({ ...prev, urgency: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Faible</SelectItem>
                      <SelectItem value="medium">Moyenne</SelectItem>
                      <SelectItem value="high">Haute</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message">Message *</Label>
                <Textarea
                  id="contact-message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Décrivez votre demande..."
                  rows={4}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="contact-newsletter"
                  checked={contactForm.newsletter}
                  onCheckedChange={(checked) => setContactForm(prev => ({ ...prev, newsletter: checked as boolean }))}
                />
                <Label htmlFor="contact-newsletter" className="text-sm">
                  Je souhaite recevoir la newsletter
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={submissions.contact === 'loading'}
              >
                {submissions.contact === 'loading' ? 'Envoi en cours...' : 'Envoyer le message'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* 2. Newsletter Signup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📰 Newsletter
              {submissions.newsletter === 'loading' && <span className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">Envoi...</span>}
              {submissions.newsletter === 'success' && <span className="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">✅ Inscrit</span>}
            </CardTitle>
            <CardDescription>
              Inscription à la newsletter avec préférences
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleNewsletterSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newsletter-email">Email *</Label>
                <Input
                  id="newsletter-email"
                  type="email"
                  value={newsletterForm.email}
                  onChange={(e) => setNewsletterForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newsletter-frequency">Fréquence</Label>
                <Select value={newsletterForm.frequency} onValueChange={(value) => setNewsletterForm(prev => ({ ...prev, frequency: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir la fréquence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Quotidienne</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    <SelectItem value="monthly">Mensuelle</SelectItem>
                    <SelectItem value="occasional">Occasionnelle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Sujets d'intérêt</Label>
                {['Tech', 'Design', 'Business', 'Marketing'].map((topic) => (
                  <div key={topic} className="flex items-center space-x-2">
                    <Checkbox
                      id={`topic-${topic}`}
                      checked={newsletterForm.topics.includes(topic)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewsletterForm(prev => ({ ...prev, topics: [...prev.topics, topic] }));
                        } else {
                          setNewsletterForm(prev => ({ ...prev, topics: prev.topics.filter(t => t !== topic) }));
                        }
                      }}
                    />
                    <Label htmlFor={`topic-${topic}`} className="text-sm">{topic}</Label>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter-terms"
                  checked={newsletterForm.terms}
                  onCheckedChange={(checked) => setNewsletterForm(prev => ({ ...prev, terms: checked as boolean }))}
                />
                <Label htmlFor="newsletter-terms" className="text-sm">
                  J'accepte de recevoir des emails marketing *
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={!newsletterForm.terms || submissions.newsletter === 'loading'}
              >
                {submissions.newsletter === 'loading' ? 'Inscription...' : "S'inscrire"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* 3. Formulaire de Devis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              💰 Demande de Devis
              {submissions.quote === 'loading' && <span className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">Envoi...</span>}
              {submissions.quote === 'success' && <span className="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">✅ Envoyé</span>}
            </CardTitle>
            <CardDescription>
              Formulaire de devis pour services web
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleQuoteSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quote-company">Entreprise *</Label>
                  <Input
                    id="quote-company"
                    value={quoteForm.company}
                    onChange={(e) => setQuoteForm(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Mon Entreprise SARL"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quote-email">Email *</Label>
                  <Input
                    id="quote-email"
                    type="email"
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="contact@entreprise.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quote-project">Type de projet</Label>
                  <Select value={quoteForm.project} onValueChange={(value) => setQuoteForm(prev => ({ ...prev, project: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Site vitrine</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="webapp">Application web</SelectItem>
                      <SelectItem value="mobile">App mobile</SelectItem>
                      <SelectItem value="redesign">Refonte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quote-budget">Budget approximatif</Label>
                  <Select value={quoteForm.budget} onValueChange={(value) => setQuoteForm(prev => ({ ...prev, budget: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">&lt; 5k €</SelectItem>
                      <SelectItem value="medium">5k - 15k €</SelectItem>
                      <SelectItem value="large">15k - 50k €</SelectItem>
                      <SelectItem value="enterprise">&gt; 50k €</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quote-timeline">Timeline souhaitée</Label>
                <Select value={quoteForm.timeline} onValueChange={(value) => setQuoteForm(prev => ({ ...prev, timeline: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">Le plus tôt possible</SelectItem>
                    <SelectItem value="month">Dans le mois</SelectItem>
                    <SelectItem value="quarter">Dans le trimestre</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Services nécessaires</Label>
                {['Design UI/UX', 'Développement', 'SEO', 'Maintenance', 'Formation'].map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={`service-${service}`}
                      checked={quoteForm.services.includes(service)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setQuoteForm(prev => ({ ...prev, services: [...prev.services, service] }));
                        } else {
                          setQuoteForm(prev => ({ ...prev, services: prev.services.filter(s => s !== service) }));
                        }
                      }}
                    />
                    <Label htmlFor={`service-${service}`} className="text-sm">{service}</Label>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="quote-description">Description du projet</Label>
                <Textarea
                  id="quote-description"
                  value={quoteForm.description}
                  onChange={(e) => setQuoteForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Décrivez votre projet, vos objectifs, votre audience cible..."
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="quote-nda"
                  checked={quoteForm.nda}
                  onCheckedChange={(checked) => setQuoteForm(prev => ({ ...prev, nda: checked as boolean }))}
                />
                <Label htmlFor="quote-nda" className="text-sm">
                  Je souhaite signer un NDA avant discussion
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={submissions.quote === 'loading'}>
                {submissions.quote === 'loading' ? 'Envoi...' : 'Demander un devis'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* 4. Inscription Utilisateur */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              👤 Inscription
              {submissions.registration === 'loading' && <span className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">Envoi...</span>}
              {submissions.registration === 'success' && <span className="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">✅ Créé</span>}
            </CardTitle>
            <CardDescription>
              Création de compte utilisateur avec profil
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleRegistrationSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-firstname">Prénom *</Label>
                  <Input
                    id="reg-firstname"
                    value={registrationForm.firstName}
                    onChange={(e) => setRegistrationForm(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder="Jean"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-lastname">Nom *</Label>
                  <Input
                    id="reg-lastname"
                    value={registrationForm.lastName}
                    onChange={(e) => setRegistrationForm(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Dupont"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-email">Email *</Label>
                <Input
                  id="reg-email"
                  type="email"
                  value={registrationForm.email}
                  onChange={(e) => setRegistrationForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="jean.dupont@example.com"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-company">Entreprise</Label>
                  <Input
                    id="reg-company"
                    value={registrationForm.company}
                    onChange={(e) => setRegistrationForm(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Mon Entreprise"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-role">Rôle</Label>
                  <Select value={registrationForm.role} onValueChange={(value) => setRegistrationForm(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Votre rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="developer">Développeur</SelectItem>
                      <SelectItem value="designer">Designer</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="student">Étudiant</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-experience">Expérience</Label>
                <Select value={registrationForm.experience} onValueChange={(value) => setRegistrationForm(prev => ({ ...prev, experience: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Niveau d'expérience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Débutant (&lt; 1 an)</SelectItem>
                    <SelectItem value="junior">Junior (1-3 ans)</SelectItem>
                    <SelectItem value="mid">Intermédiaire (3-5 ans)</SelectItem>
                    <SelectItem value="senior">Senior (5+ ans)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Préférences</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="reg-notifications"
                    checked={registrationForm.notifications}
                    onCheckedChange={(checked) => setRegistrationForm(prev => ({ ...prev, notifications: checked as boolean }))}
                  />
                  <Label htmlFor="reg-notifications" className="text-sm">
                    Recevoir les notifications système
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="reg-marketing"
                    checked={registrationForm.marketing}
                    onCheckedChange={(checked) => setRegistrationForm(prev => ({ ...prev, marketing: checked as boolean }))}
                  />
                  <Label htmlFor="reg-marketing" className="text-sm">
                    Recevoir des emails marketing
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="reg-terms"
                    checked={registrationForm.terms}
                    onCheckedChange={(checked) => setRegistrationForm(prev => ({ ...prev, terms: checked as boolean }))}
                  />
                  <Label htmlFor="reg-terms" className="text-sm">
                    J'accepte les conditions d'utilisation *
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={!registrationForm.terms || submissions.registration === 'loading'}
              >
                {submissions.registration === 'loading' ? 'Création...' : 'Créer le compte'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      {/* Résumé technique des composants testés */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          ✅ Sprint 1 - Form Components validés
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium mb-3">Composants testés :</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>Label :</strong> Accessibilité et association sémantique</li>
              <li>• <strong>Input :</strong> Types variés (text, email) avec validation</li>
              <li>• <strong>Textarea :</strong> Texte multilignes avec redimensionnement</li>
              <li>• <strong>Select :</strong> Listes déroulantes avec recherche</li>
              <li>• <strong>Checkbox :</strong> Sélections multiples et acceptations</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3">Cas d'usage validés :</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>Contact :</strong> Formulaire complet avec urgence</li>
              <li>• <strong>Newsletter :</strong> Préférences et sujets d'intérêt</li>
              <li>• <strong>Devis :</strong> Sélections multiples et budget</li>
              <li>• <strong>Inscription :</strong> Profil utilisateur complet</li>
              <li>• <strong>Validation :</strong> États loading/success/error</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}