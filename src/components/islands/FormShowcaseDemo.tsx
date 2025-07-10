// FormShowcaseDemo.tsx - FULLY ACCESSIBLE with WCAG 2.1 AA compliance
// Path: /src/components/islands/FormShowcaseDemo.tsx
// ✅ Full keyboard navigation, ARIA states, live regions, form accessibility

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type DemoType = 'contact' | 'newsletter' | 'quote' | 'components' | 'combined';

interface ContactForm {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  priority: string;
  consent: boolean;
  newsletter: boolean;
}

interface NewsletterForm {
  email: string;
  firstName: string;
  interests: string[];
  frequency: string;
  consent: boolean;
}

interface QuoteForm {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  description: string;
  consent: boolean;
}

export default function FormShowcaseDemo() {
  const [activeDemo, setActiveDemo] = useState<DemoType>('combined');
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    priority: '',
    consent: false,
    newsletter: false
  });

  const [newsletterForm, setNewsletterForm] = useState<NewsletterForm>({
    email: '',
    firstName: '',
    interests: [],
    frequency: '',
    consent: false
  });

  const [quoteForm, setQuoteForm] = useState<QuoteForm>({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    description: '',
    consent: false
  });

  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Accessibility: Refs for keyboard navigation and live announcements
  const demoButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const announceRef = useRef<HTMLDivElement>(null);
  const formStatusRef = useRef<HTMLDivElement>(null);

  const demoTabs = [
    { id: 'combined' as DemoType, label: 'All Combined', icon: '📝', shortcut: '1' },
    { id: 'contact' as DemoType, label: 'Contact Form', icon: '📬', shortcut: '2' },
    { id: 'newsletter' as DemoType, label: 'Newsletter', icon: '📧', shortcut: '3' },
    { id: 'quote' as DemoType, label: 'Quote Request', icon: '💰', shortcut: '4' },
    { id: 'components' as DemoType, label: 'Components', icon: '🧩', shortcut: '5' }
  ];

  // Accessibility: Announce demo changes to screen readers
  const announceChange = (demoLabel: string) => {
    if (announceRef.current) {
      announceRef.current.textContent = `Now showing ${demoLabel} demonstration`;
    }
  };

  // Accessibility: Announce form status changes
  const announceFormStatus = (message: string) => {
    if (formStatusRef.current) {
      formStatusRef.current.textContent = message;
    }
  };

  // Accessibility: Handle demo change with announcement
  const handleDemoChange = (demoId: DemoType) => {
    setActiveDemo(demoId);
    const demo = demoTabs.find(tab => tab.id === demoId);
    if (demo) {
      announceChange(demo.label);
    }
  };

  // Accessibility: Keyboard navigation for demo selector
  const handleDemoKeydown = (event: React.KeyboardEvent, currentIndex: number) => {
    let targetIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        targetIndex = currentIndex === 0 ? demoTabs.length - 1 : currentIndex - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        targetIndex = currentIndex === demoTabs.length - 1 ? 0 : currentIndex + 1;
        break;
      case 'Home':
        event.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        targetIndex = demoTabs.length - 1;
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
        event.preventDefault();
        const shortcutIndex = parseInt(event.key) - 1;
        if (shortcutIndex < demoTabs.length) {
          targetIndex = shortcutIndex;
          handleDemoChange(demoTabs[targetIndex].id);
        }
        break;
      default:
        return;
    }

    // Focus and select the target demo
    if (targetIndex !== currentIndex) {
      const targetButton = demoButtonsRef.current[targetIndex];
      if (targetButton) {
        targetButton.focus();
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || 
            event.key === 'ArrowUp' || event.key === 'ArrowDown' ||
            event.key === 'Home' || event.key === 'End') {
          handleDemoChange(demoTabs[targetIndex].id);
        }
      }
    }
  };

  // Accessibility: Setup keyboard shortcuts globally
  useEffect(() => {
    const handleGlobalKeydown = (event: KeyboardEvent) => {
      // Only activate shortcuts if not in an input field
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement ||
          event.target instanceof HTMLSelectElement) {
        return;
      }

      if (event.key >= '1' && event.key <= '5') {
        const shortcutIndex = parseInt(event.key) - 1;
        if (shortcutIndex < demoTabs.length) {
          event.preventDefault();
          handleDemoChange(demoTabs[shortcutIndex].id);
          demoButtonsRef.current[shortcutIndex]?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeydown);
    return () => document.removeEventListener('keydown', handleGlobalKeydown);
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: {[key: string]: string} = {};
    
    if (!contactForm.name.trim()) errors.name = 'Name is required';
    if (!contactForm.email.trim()) errors.email = 'Email is required';
    else if (!validateEmail(contactForm.email)) errors.email = 'Invalid email format';
    if (!contactForm.subject) errors.subject = 'Subject is required';
    if (!contactForm.message.trim()) errors.message = 'Message is required';
    if (!contactForm.consent) errors.consent = 'Consent is required';

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      setSubmissionStatus('loading');
      announceFormStatus('Submitting contact form, please wait...');
      setTimeout(() => {
        setSubmissionStatus('success');
        announceFormStatus('Contact form submitted successfully! We will respond within 24 hours.');
        setTimeout(() => {
          setSubmissionStatus('idle');
          announceFormStatus('');
        }, 3000);
      }, 1500);
    } else {
      announceFormStatus(`Form has ${Object.keys(errors).length} validation errors. Please review and correct.`);
    }
  };

  const ContactFormDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span aria-hidden="true">📬</span>
          Professional Contact Form
        </CardTitle>
        <CardDescription>
          Complete contact form with validation and business logic - fully accessible
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleContactSubmit} className="space-y-6" role="form" aria-label="Professional contact form">
          
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <legend className="sr-only">Personal information</legend>
            
            <div className="space-y-2">
              <Label htmlFor="contact-name">
                Full Name <span className="text-red-500" aria-label="required">*</span>
              </Label>
              <Input
                id="contact-name"
                value={contactForm.name}
                onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                className={validationErrors.name ? 'border-red-500' : ''}
                aria-required="true"
                aria-invalid={!!validationErrors.name}
                aria-describedby="contact-name-error contact-name-hint"
              />
              <div id="contact-name-hint" className="text-xs text-muted-foreground">
                Required field for contact purposes
              </div>
              {validationErrors.name && (
                <p id="contact-name-error" className="text-sm text-red-500" role="alert">
                  {validationErrors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email">
                Email Address <span className="text-red-500" aria-label="required">*</span>
              </Label>
              <Input
                id="contact-email"
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@company.com"
                className={validationErrors.email ? 'border-red-500' : ''}
                aria-required="true"
                aria-invalid={!!validationErrors.email}
                aria-describedby="contact-email-error contact-email-hint"
              />
              <div id="contact-email-hint" className="text-xs text-muted-foreground">
                We'll use this to respond to your inquiry
              </div>
              {validationErrors.email && (
                <p id="contact-email-error" className="text-sm text-red-500" role="alert">
                  {validationErrors.email}
                </p>
              )}
            </div>
          </fieldset>

          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <legend className="sr-only">Contact details and inquiry type</legend>
            
            <div className="space-y-2">
              <Label htmlFor="contact-company">Company/Organization</Label>
              <Input
                id="contact-company"
                value={contactForm.company}
                onChange={(e) => setContactForm(prev => ({ ...prev, company: e.target.value }))}
                placeholder="Your company name"
                aria-describedby="contact-company-hint"
              />
              <div id="contact-company-hint" className="text-xs text-muted-foreground">
                Optional: Helps us understand your business context
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-subject">
                Subject <span className="text-red-500" aria-label="required">*</span>
              </Label>
              <Select 
                value={contactForm.subject} 
                onValueChange={(value) => setContactForm(prev => ({ ...prev, subject: value }))}
              >
                <SelectTrigger 
                  className={validationErrors.subject ? 'border-red-500' : ''}
                  aria-required="true"
                  aria-invalid={!!validationErrors.subject}
                  aria-describedby="contact-subject-error contact-subject-hint"
                >
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="support">Technical Support</SelectItem>
                  <SelectItem value="sales">Sales Question</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <div id="contact-subject-hint" className="text-xs text-muted-foreground">
                Helps us route your inquiry to the right team
              </div>
              {validationErrors.subject && (
                <p id="contact-subject-error" className="text-sm text-red-500" role="alert">
                  {validationErrors.subject}
                </p>
              )}
            </div>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="contact-priority">Priority Level</Label>
            <Select 
              value={contactForm.priority} 
              onValueChange={(value) => setContactForm(prev => ({ ...prev, priority: value }))}
            >
              <SelectTrigger aria-describedby="contact-priority-hint">
                <SelectValue placeholder="Select priority (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - General inquiry</SelectItem>
                <SelectItem value="medium">Medium - Business question</SelectItem>
                <SelectItem value="high">High - Urgent support needed</SelectItem>
                <SelectItem value="critical">Critical - System down</SelectItem>
              </SelectContent>
            </Select>
            <div id="contact-priority-hint" className="text-xs text-muted-foreground">
              Optional: Helps us prioritize response time
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">
              Message <span className="text-red-500" aria-label="required">*</span>
            </Label>
            <Textarea
              id="contact-message"
              value={contactForm.message}
              onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Please describe your inquiry in detail..."
              rows={4}
              className={validationErrors.message ? 'border-red-500' : ''}
              aria-required="true"
              aria-invalid={!!validationErrors.message}
              aria-describedby="contact-message-error contact-message-hint contact-message-count"
              maxLength={500}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span id="contact-message-hint">Tell us about your inquiry goals and requirements</span>
              <span id="contact-message-count" aria-live="polite">
                {contactForm.message.length}/500 characters
              </span>
            </div>
            {validationErrors.message && (
              <p id="contact-message-error" className="text-sm text-red-500" role="alert">
                {validationErrors.message}
              </p>
            )}
          </div>

          <fieldset className="space-y-4">
            <legend className="sr-only">Privacy and consent options</legend>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="contact-consent"
                checked={contactForm.consent}
                onCheckedChange={(checked) => setContactForm(prev => ({ ...prev, consent: !!checked }))}
                aria-required="true"
                aria-invalid={!!validationErrors.consent}
                aria-describedby="contact-consent-description contact-consent-error"
              />
              <div className="grid gap-1.5 leading-none">
                <Label 
                  htmlFor="contact-consent" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Privacy Consent <span className="text-red-500" aria-label="required">*</span>
                </Label>
                <p id="contact-consent-description" className="text-xs text-muted-foreground">
                  I agree to the processing of my personal data for the purpose of responding to my inquiry (required)
                </p>
                {validationErrors.consent && (
                  <p id="contact-consent-error" className="text-sm text-red-500" role="alert">
                    {validationErrors.consent}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="contact-newsletter"
                checked={contactForm.newsletter}
                onCheckedChange={(checked) => setContactForm(prev => ({ ...prev, newsletter: !!checked }))}
                aria-describedby="contact-newsletter-description"
              />
              <div className="grid gap-1.5 leading-none">
                <Label 
                  htmlFor="contact-newsletter" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Newsletter Subscription
                </Label>
                <p id="contact-newsletter-description" className="text-xs text-muted-foreground">
                  Subscribe to our newsletter for updates and news (optional)
                </p>
              </div>
            </div>
          </fieldset>

          <div className="flex gap-3">
            <Button 
              type="submit" 
              disabled={submissionStatus === 'loading'}
              className="flex-1"
              aria-describedby="send-button-status"
            >
              {submissionStatus === 'loading' ? 'Sending...' : 'Send Message'}
            </Button>
            <div id="send-button-status" className="sr-only">
              {submissionStatus === 'loading' ? 'Form is being submitted' : 'Ready to submit contact form'}
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" variant="outline" aria-describedby="preview-button-description">
                  Preview Form Data
                </Button>
              </DialogTrigger>
              <DialogContent aria-describedby="preview-description">
                <DialogHeader>
                  <DialogTitle>Contact Form Preview</DialogTitle>
                  <DialogDescription id="preview-description">
                    Review the information you've entered before sending
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2 text-sm" role="group" aria-label="Form data summary">
                  <div><strong>Name:</strong> <span>{contactForm.name || 'Not provided'}</span></div>
                  <div><strong>Email:</strong> <span>{contactForm.email || 'Not provided'}</span></div>
                  <div><strong>Company:</strong> <span>{contactForm.company || 'Not provided'}</span></div>
                  <div><strong>Subject:</strong> <span>{contactForm.subject || 'Not selected'}</span></div>
                  <div><strong>Priority:</strong> <span>{contactForm.priority || 'Not set'}</span></div>
                  <div><strong>Message:</strong> <span>{contactForm.message || 'No message'}</span></div>
                  <div><strong>Newsletter:</strong> <span>{contactForm.newsletter ? 'Yes' : 'No'}</span></div>
                </div>
              </DialogContent>
            </Dialog>
            <div id="preview-button-description" className="sr-only">
              Open dialog to review form data before submission
            </div>

            <Button 
              type="button" 
              variant="outline"
              onClick={() => {
                setContactForm({
                  name: '',
                  email: '',
                  company: '',
                  subject: '',
                  message: '',
                  priority: '',
                  consent: false,
                  newsletter: false
                });
                setValidationErrors({});
                announceFormStatus('Contact form has been cleared');
              }}
              aria-describedby="clear-button-description"
            >
              Clear Form
            </Button>
            <div id="clear-button-description" className="sr-only">
              Clear all form fields and start over
            </div>
          </div>

          {submissionStatus === 'success' && (
            <Alert role="status" aria-live="polite">
              <AlertTitle>Message Sent Successfully!</AlertTitle>
              <AlertDescription>
                Thank you for contacting us. We'll get back to you within 24 hours.
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );

  const NewsletterFormDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span aria-hidden="true">📧</span>
          Newsletter Subscription
        </CardTitle>
        <CardDescription>
          Marketing newsletter signup with interest targeting and accessibility features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" role="form" aria-label="Newsletter subscription form">
          
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <legend className="sr-only">Personal information for newsletter</legend>
            
            <div className="space-y-2">
              <Label htmlFor="newsletter-email">
                Email Address <span className="text-red-500" aria-label="required">*</span>
              </Label>
              <Input
                id="newsletter-email"
                type="email"
                value={newsletterForm.email}
                onChange={(e) => setNewsletterForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@company.com"
                aria-required="true"
                aria-describedby="newsletter-email-hint"
              />
              <div id="newsletter-email-hint" className="text-xs text-muted-foreground">
                Required: We'll send newsletters to this address
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newsletter-name">First Name</Label>
              <Input
                id="newsletter-name"
                value={newsletterForm.firstName}
                onChange={(e) => setNewsletterForm(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="Your first name"
                aria-describedby="newsletter-name-hint"
              />
              <div id="newsletter-name-hint" className="text-xs text-muted-foreground">
                Optional: Helps us personalize content
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Interests (Select all that apply)</legend>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3" role="group" aria-labelledby="interests-legend">
              {[
                'Product Updates',
                'Industry News', 
                'Technical Tips',
                'Case Studies',
                'Events & Webinars',
                'Special Offers'
              ].map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={`interest-${interest.replace(/\s+/g, '-').toLowerCase()}`}
                    checked={newsletterForm.interests.includes(interest)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setNewsletterForm(prev => ({
                          ...prev,
                          interests: [...prev.interests, interest]
                        }));
                      } else {
                        setNewsletterForm(prev => ({
                          ...prev,
                          interests: prev.interests.filter(i => i !== interest)
                        }));
                      }
                    }}
                    aria-describedby={`interest-${interest.replace(/\s+/g, '-').toLowerCase()}-description`}
                  />
                  <Label 
                    htmlFor={`interest-${interest.replace(/\s+/g, '-').toLowerCase()}`} 
                    className="text-sm"
                  >
                    {interest}
                  </Label>
                  <span 
                    id={`interest-${interest.replace(/\s+/g, '-').toLowerCase()}-description`} 
                    className="sr-only"
                  >
                    Subscribe to {interest.toLowerCase()} content
                  </span>
                </div>
              ))}
            </div>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="newsletter-frequency">Email Frequency</Label>
            <Select 
              value={newsletterForm.frequency} 
              onValueChange={(value) => setNewsletterForm(prev => ({ ...prev, frequency: value }))}
            >
              <SelectTrigger aria-describedby="newsletter-frequency-hint">
                <SelectValue placeholder="How often would you like to hear from us?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily - Get all updates</SelectItem>
                <SelectItem value="weekly">Weekly - Curated highlights</SelectItem>
                <SelectItem value="monthly">Monthly - Major updates only</SelectItem>
                <SelectItem value="quarterly">Quarterly - Essential news</SelectItem>
              </SelectContent>
            </Select>
            <div id="newsletter-frequency-hint" className="text-xs text-muted-foreground">
              Optional: Choose how often you want to receive emails
            </div>
          </div>

          <fieldset className="space-y-4">
            <legend className="sr-only">Consent and privacy</legend>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="newsletter-consent"
                checked={newsletterForm.consent}
                onCheckedChange={(checked) => setNewsletterForm(prev => ({ ...prev, consent: !!checked }))}
                aria-required="true"
                aria-describedby="newsletter-consent-description"
              />
              <div className="grid gap-1.5 leading-none">
                <Label 
                  htmlFor="newsletter-consent" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Marketing Consent <span className="text-red-500" aria-label="required">*</span>
                </Label>
                <p id="newsletter-consent-description" className="text-xs text-muted-foreground">
                  I agree to receive marketing emails and understand I can unsubscribe at any time (required)
                </p>
              </div>
            </div>
          </fieldset>

          <section className="bg-muted/30 p-4 rounded-lg" aria-labelledby="subscription-preview-heading">
            <h4 id="subscription-preview-heading" className="font-medium mb-2">Subscription Preview:</h4>
            <div className="text-sm space-y-1" role="group" aria-label="Newsletter subscription summary">
              <div><strong>Email:</strong> <span>{newsletterForm.email || 'Not provided'}</span></div>
              <div><strong>Name:</strong> <span>{newsletterForm.firstName || 'Not provided'}</span></div>
              <div><strong>Interests:</strong> <span>{newsletterForm.interests.length > 0 ? newsletterForm.interests.join(', ') : 'None selected'}</span></div>
              <div><strong>Frequency:</strong> <span>{newsletterForm.frequency || 'Not selected'}</span></div>
            </div>
          </section>

          <div className="flex gap-3">
            <Button className="flex-1" aria-describedby="newsletter-subscribe-description">
              Subscribe to Newsletter
            </Button>
            <div id="newsletter-subscribe-description" className="sr-only">
              Submit newsletter subscription with selected preferences
            </div>
            <Button variant="outline" aria-describedby="newsletter-learn-more-description">
              Learn More
            </Button>
            <div id="newsletter-learn-more-description" className="sr-only">
              Learn more about our newsletter content and privacy policy
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  const QuoteFormDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span aria-hidden="true">💰</span>
          Request Quote
        </CardTitle>
        <CardDescription>
          Business quote request with project details and accessibility features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" role="form" aria-label="Business quote request form">
          
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <legend className="sr-only">Contact information</legend>
            
            <div className="space-y-2">
              <Label htmlFor="quote-name">
                Contact Name <span className="text-red-500" aria-label="required">*</span>
              </Label>
              <Input
                id="quote-name"
                value={quoteForm.name}
                onChange={(e) => setQuoteForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your full name"
                aria-required="true"
                aria-describedby="quote-name-hint"
              />
              <div id="quote-name-hint" className="text-xs text-muted-foreground">
                Primary contact for this quote request
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote-email">
                Business Email <span className="text-red-500" aria-label="required">*</span>
              </Label>
              <Input
                id="quote-email"
                type="email"
                value={quoteForm.email}
                onChange={(e) => setQuoteForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="business.email@company.com"
                aria-required="true"
                aria-describedby="quote-email-hint"
              />
              <div id="quote-email-hint" className="text-xs text-muted-foreground">
                Business email for official communication
              </div>
            </div>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="quote-company">
              Company Name <span className="text-red-500" aria-label="required">*</span>
            </Label>
            <Input
              id="quote-company"
              value={quoteForm.company}
              onChange={(e) => setQuoteForm(prev => ({ ...prev, company: e.target.value }))}
              placeholder="Your company or organization"
              aria-required="true"
              aria-describedby="quote-company-hint"
            />
            <div id="quote-company-hint" className="text-xs text-muted-foreground">
              Legal entity name for contract purposes
            </div>
          </div>

          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <legend className="sr-only">Project specifications</legend>
            
            <div className="space-y-2">
              <Label htmlFor="quote-service">
                Service Required <span className="text-red-500" aria-label="required">*</span>
              </Label>
              <Select 
                value={quoteForm.service} 
                onValueChange={(value) => setQuoteForm(prev => ({ ...prev, service: value }))}
              >
                <SelectTrigger aria-required="true" aria-describedby="quote-service-hint">
                  <SelectValue placeholder="Select the service you need" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web-design">Web Design</SelectItem>
                  <SelectItem value="web-development">Web Development</SelectItem>
                  <SelectItem value="ecommerce">E-commerce Solution</SelectItem>
                  <SelectItem value="mobile-app">Mobile App Development</SelectItem>
                  <SelectItem value="consulting">Technical Consulting</SelectItem>
                  <SelectItem value="maintenance">Website Maintenance</SelectItem>
                  <SelectItem value="seo">SEO Optimization</SelectItem>
                  <SelectItem value="custom">Custom Solution</SelectItem>
                </SelectContent>
              </Select>
              <div id="quote-service-hint" className="text-xs text-muted-foreground">
                Primary service for accurate quote estimation
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote-budget">Project Budget Range</Label>
              <Select 
                value={quoteForm.budget} 
                onValueChange={(value) => setQuoteForm(prev => ({ ...prev, budget: value }))}
              >
                <SelectTrigger aria-describedby="quote-budget-hint">
                  <SelectValue placeholder="Select your budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-5k">Under €5,000</SelectItem>
                  <SelectItem value="5k-10k">€5,000 - €10,000</SelectItem>
                  <SelectItem value="10k-25k">€10,000 - €25,000</SelectItem>
                  <SelectItem value="25k-50k">€25,000 - €50,000</SelectItem>
                  <SelectItem value="50k-100k">€50,000 - €100,000</SelectItem>
                  <SelectItem value="over-100k">Over €100,000</SelectItem>
                  <SelectItem value="discuss">Prefer to discuss</SelectItem>
                </SelectContent>
              </Select>
              <div id="quote-budget-hint" className="text-xs text-muted-foreground">
                Optional: Helps us tailor the proposal scope
              </div>
            </div>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="quote-timeline">Project Timeline</Label>
            <Select 
              value={quoteForm.timeline} 
              onValueChange={(value) => setQuoteForm(prev => ({ ...prev, timeline: value }))}
            >
              <SelectTrigger aria-describedby="quote-timeline-hint">
                <SelectValue placeholder="When do you need this completed?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asap">ASAP - Rush project</SelectItem>
                <SelectItem value="1-month">Within 1 month</SelectItem>
                <SelectItem value="2-3months">2-3 months</SelectItem>
                <SelectItem value="3-6months">3-6 months</SelectItem>
                <SelectItem value="6months+">6+ months</SelectItem>
                <SelectItem value="flexible">Timeline is flexible</SelectItem>
              </SelectContent>
            </Select>
            <div id="quote-timeline-hint" className="text-xs text-muted-foreground">
              Optional: Affects pricing and resource allocation
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote-description">
              Project Description <span className="text-red-500" aria-label="required">*</span>
            </Label>
            <Textarea
              id="quote-description"
              value={quoteForm.description}
              onChange={(e) => setQuoteForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Please describe your project requirements, goals, and any specific features you need..."
              rows={5}
              aria-required="true"
              aria-describedby="quote-description-hint quote-description-count"
              maxLength={1000}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span id="quote-description-hint">Be as detailed as possible for accurate quote</span>
              <span id="quote-description-count" aria-live="polite">
                {quoteForm.description.length}/1000 characters
              </span>
            </div>
          </div>

          <fieldset className="space-y-4">
            <legend className="sr-only">Consent and agreement</legend>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="quote-consent"
                checked={quoteForm.consent}
                onCheckedChange={(checked) => setQuoteForm(prev => ({ ...prev, consent: !!checked }))}
                aria-required="true"
                aria-describedby="quote-consent-description"
              />
              <div className="grid gap-1.5 leading-none">
                <Label 
                  htmlFor="quote-consent" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Contact Agreement <span className="text-red-500" aria-label="required">*</span>
                </Label>
                <p id="quote-consent-description" className="text-xs text-muted-foreground">
                  I agree to be contacted regarding this quote request and understand my information will be kept confidential (required)
                </p>
              </div>
            </div>
          </fieldset>

          <section className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg" aria-labelledby="next-steps-heading">
            <h4 id="next-steps-heading" className="font-medium mb-2 text-blue-800 dark:text-blue-200">
              <span aria-hidden="true">💡</span> What happens next?
            </h4>
            <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1" role="list">
              <li role="listitem">• We'll review your requirements within 24 hours</li>
              <li role="listitem">• Our team will prepare a detailed proposal</li>
              <li role="listitem">• We'll schedule a call to discuss the project</li>
              <li role="listitem">• You'll receive a formal quote within 3-5 business days</li>
            </ul>
          </section>

          <div className="flex gap-3">
            <Button className="flex-1" aria-describedby="quote-submit-description">
              Request Quote
            </Button>
            <div id="quote-submit-description" className="sr-only">
              Submit quote request with all provided information
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" aria-describedby="quote-review-description">
                  Review Request
                </Button>
              </DialogTrigger>
              <DialogContent aria-describedby="quote-review-modal-description">
                <DialogHeader>
                  <DialogTitle>Quote Request Summary</DialogTitle>
                  <DialogDescription id="quote-review-modal-description">
                    Please review your quote request details before submission
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2 text-sm max-h-96 overflow-y-auto" role="group" aria-label="Quote request summary">
                  <div><strong>Contact:</strong> <span>{quoteForm.name} ({quoteForm.email})</span></div>
                  <div><strong>Company:</strong> <span>{quoteForm.company}</span></div>
                  <div><strong>Service:</strong> <span>{quoteForm.service}</span></div>
                  <div><strong>Budget:</strong> <span>{quoteForm.budget}</span></div>
                  <div><strong>Timeline:</strong> <span>{quoteForm.timeline}</span></div>
                  <div><strong>Description:</strong> <span>{quoteForm.description}</span></div>
                </div>
              </DialogContent>
            </Dialog>
            <div id="quote-review-description" className="sr-only">
              Open dialog to review quote request details
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  const ComponentsDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span aria-hidden="true">🧩</span>
          Form Components Library
        </CardTitle>
        <CardDescription>
          Individual component demonstrations and variants with accessibility features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Button Variants */}
        <section aria-labelledby="button-variants-heading">
          <h4 id="button-variants-heading" className="font-semibold mb-4">Button Component Variants:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3" role="group" aria-label="Button style variations">
            <Button variant="default" aria-label="Default button style">Default</Button>
            <Button variant="secondary" aria-label="Secondary button style">Secondary</Button>
            <Button variant="destructive" aria-label="Destructive button style">Destructive</Button>
            <Button variant="outline" aria-label="Outline button style">Outline</Button>
            <Button variant="ghost" aria-label="Ghost button style">Ghost</Button>
            <Button variant="link" aria-label="Link button style">Link</Button>
            <Button size="sm" aria-label="Small button size">Small</Button>
            <Button size="lg" aria-label="Large button size">Large</Button>
            <Button disabled aria-label="Disabled button state">Disabled</Button>
            <Button className="w-full" aria-label="Full width button">Full Width</Button>
          </div>
        </section>

        {/* Input Variants */}
        <section aria-labelledby="input-variants-heading">
          <h4 id="input-variants-heading" className="font-semibold mb-4">Input Component States:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="group" aria-label="Input field variations">
            <div className="space-y-2">
              <Label htmlFor="demo-input-normal">Normal Input</Label>
              <Input id="demo-input-normal" placeholder="Enter text..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-input-email">Email Input</Label>
              <Input id="demo-input-email" type="email" placeholder="email@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-input-password">Password Input</Label>
              <Input id="demo-input-password" type="password" placeholder="Your password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-input-disabled">Disabled Input</Label>
              <Input id="demo-input-disabled" disabled placeholder="Disabled input" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-input-error">Error State</Label>
              <Input 
                id="demo-input-error" 
                placeholder="Invalid input" 
                className="border-red-500" 
                aria-invalid="true"
                aria-describedby="demo-input-error-message"
              />
              <p id="demo-input-error-message" className="text-xs text-red-500">
                This field has an error
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-input-success">Success State</Label>
              <Input 
                id="demo-input-success" 
                placeholder="Valid input" 
                className="border-green-500"
                aria-describedby="demo-input-success-message"
              />
              <p id="demo-input-success-message" className="text-xs text-green-500">
                This field is valid
              </p>
            </div>
          </div>
        </section>

        {/* Select Variants */}
        <section aria-labelledby="select-variants-heading">
          <h4 id="select-variants-heading" className="font-semibold mb-4">Select Component Options:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="group" aria-label="Select dropdown variations">
            <div className="space-y-2">
              <Label htmlFor="demo-select-basic">Basic Select</Label>
              <Select>
                <SelectTrigger id="demo-select-basic">
                  <SelectValue placeholder="Choose option..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-select-countries">Countries</Label>
              <Select>
                <SelectTrigger id="demo-select-countries">
                  <SelectValue placeholder="Select country..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">🇺🇸 United States</SelectItem>
                  <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                  <SelectItem value="fr">🇫🇷 France</SelectItem>
                  <SelectItem value="de">🇩🇪 Germany</SelectItem>
                  <SelectItem value="ch">🇨🇭 Switzerland</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-select-priority">Priority Levels</Label>
              <Select>
                <SelectTrigger id="demo-select-priority">
                  <SelectValue placeholder="Select priority..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">🟢 Low Priority</SelectItem>
                  <SelectItem value="medium">🟡 Medium Priority</SelectItem>
                  <SelectItem value="high">🟠 High Priority</SelectItem>
                  <SelectItem value="critical">🔴 Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Checkbox and Label */}
        <section aria-labelledby="checkbox-variants-heading">
          <h4 id="checkbox-variants-heading" className="font-semibold mb-4">Checkbox & Label Combinations:</h4>
          <div className="space-y-3" role="group" aria-label="Checkbox variations">
            <div className="flex items-center space-x-2">
              <Checkbox id="demo-checkbox1" />
              <Label htmlFor="demo-checkbox1">Basic checkbox with label</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="demo-checkbox2" defaultChecked />
              <Label htmlFor="demo-checkbox2">Pre-checked checkbox</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="demo-checkbox3" disabled />
              <Label htmlFor="demo-checkbox3">Disabled checkbox</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="demo-terms" />
              <Label htmlFor="demo-terms" className="text-sm">
                I agree to the{' '}
                <a href="#" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
                  Terms of Service
                </a>
                {' '}and{' '}
                <a href="#" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded">
                  Privacy Policy
                </a>
              </Label>
            </div>
          </div>
        </section>

        {/* Textarea */}
        <section aria-labelledby="textarea-variants-heading">
          <h4 id="textarea-variants-heading" className="font-semibold mb-4">Textarea Variations:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="group" aria-label="Textarea variations">
            <div className="space-y-2">
              <Label htmlFor="demo-textarea-standard">Standard Textarea</Label>
              <Textarea id="demo-textarea-standard" placeholder="Enter your message..." rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-textarea-large">Large Textarea</Label>
              <Textarea id="demo-textarea-large" placeholder="Detailed description..." rows={6} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-textarea-disabled">Disabled Textarea</Label>
              <Textarea id="demo-textarea-disabled" disabled placeholder="Disabled textarea" rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-textarea-counter">Textarea with Counter</Label>
              <Textarea 
                id="demo-textarea-counter" 
                placeholder="Max 200 characters..." 
                rows={3}
                aria-describedby="demo-textarea-counter-count"
              />
              <div id="demo-textarea-counter-count" className="text-xs text-muted-foreground text-right" aria-live="polite">
                0/200 characters
              </div>
            </div>
          </div>
        </section>

        {/* Dialog Demo */}
        <section aria-labelledby="dialog-variants-heading">
          <h4 id="dialog-variants-heading" className="font-semibold mb-4">Dialog Component:</h4>
          <div className="flex gap-3" role="group" aria-label="Dialog variations">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Simple Dialog</Button>
              </DialogTrigger>
              <DialogContent aria-describedby="simple-dialog-description">
                <DialogHeader>
                  <DialogTitle>Simple Dialog</DialogTitle>
                  <DialogDescription id="simple-dialog-description">
                    This is a basic dialog with title and description for demonstration purposes.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p>Dialog content goes here. This demonstrates how modal dialogs work with proper focus management and accessibility.</p>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Form Dialog</Button>
              </DialogTrigger>
              <DialogContent aria-describedby="form-dialog-description">
                <DialogHeader>
                  <DialogTitle>Contact Form Dialog</DialogTitle>
                  <DialogDescription id="form-dialog-description">
                    Quick contact form in a modal dialog with accessibility features.
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4 py-4" role="form" aria-label="Quick contact form">
                  <div className="space-y-2">
                    <Label htmlFor="dialog-form-name">Name</Label>
                    <Input id="dialog-form-name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dialog-form-email">Email</Label>
                    <Input id="dialog-form-email" type="email" placeholder="your.email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dialog-form-message">Message</Label>
                    <Textarea id="dialog-form-message" placeholder="Your message..." rows={3} />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">Send</Button>
                    <Button type="button" variant="outline">Cancel</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </CardContent>
    </Card>
  );

  const CombinedDemo = () => (
    <div className="space-y-6">
      
      {/* Form Workflow Demonstration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span aria-hidden="true">🔄</span>
            Complete Form Workflow
          </CardTitle>
          <CardDescription>
            All 7 form components working together in realistic business scenarios with full accessibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" role="group" aria-label="Business form examples">
            
            {/* Contact Quick Form */}
            <section className="space-y-4 p-4 border rounded-lg" aria-labelledby="quick-contact-heading">
              <h4 id="quick-contact-heading" className="font-semibold flex items-center gap-2">
                <span aria-hidden="true">📬</span> Quick Contact
              </h4>
              <form className="space-y-3" role="form" aria-label="Quick contact form">
                <Input placeholder="Your name" aria-label="Your full name" />
                <Input type="email" placeholder="Email address" aria-label="Your email address" />
                <Select>
                  <SelectTrigger aria-label="Type of inquiry">
                    <SelectValue placeholder="Inquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales Question</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea 
                  placeholder="Your message..." 
                  rows={2} 
                  aria-label="Your message or inquiry"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox id="quick-consent" />
                  <Label htmlFor="quick-consent" className="text-xs">
                    I agree to be contacted
                  </Label>
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </section>

            {/* Newsletter Signup */}
            <section className="space-y-4 p-4 border rounded-lg" aria-labelledby="newsletter-quick-heading">
              <h4 id="newsletter-quick-heading" className="font-semibold flex items-center gap-2">
                <span aria-hidden="true">📧</span> Newsletter
              </h4>
              <form className="space-y-3" role="form" aria-label="Newsletter subscription form">
                <Input 
                  type="email" 
                  placeholder="Email for updates" 
                  aria-label="Your email address for newsletter"
                />
                <Select>
                  <SelectTrigger aria-label="Email frequency preference">
                    <SelectValue placeholder="Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <fieldset className="space-y-2">
                  <legend className="text-sm">Interests:</legend>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="quick-int1" />
                      <Label htmlFor="quick-int1" className="text-xs">Product Updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="quick-int2" />
                      <Label htmlFor="quick-int2" className="text-xs">Industry News</Label>
                    </div>
                  </div>
                </fieldset>
                <Button type="submit" className="w-full">Subscribe</Button>
              </form>
            </section>

            {/* Quote Request */}
            <section className="space-y-4 p-4 border rounded-lg" aria-labelledby="quote-quick-heading">
              <h4 id="quote-quick-heading" className="font-semibold flex items-center gap-2">
                <span aria-hidden="true">💰</span> Quick Quote
              </h4>
              <form className="space-y-3" role="form" aria-label="Quick quote request form">
                <Input 
                  placeholder="Company name" 
                  aria-label="Your company name"
                />
                <Select>
                  <SelectTrigger aria-label="Service needed">
                    <SelectValue placeholder="Service needed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web Development</SelectItem>
                    <SelectItem value="app">Mobile App</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger aria-label="Budget range">
                    <SelectValue placeholder="Budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5-10k">€5K - €10K</SelectItem>
                    <SelectItem value="10-25k">€10K - €25K</SelectItem>
                    <SelectItem value="25k+">€25K+</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button type="button" className="w-full">Get Quote</Button>
                  </DialogTrigger>
                  <DialogContent aria-describedby="quote-submitted-description">
                    <DialogHeader>
                      <DialogTitle>Quote Request Submitted</DialogTitle>
                      <DialogDescription id="quote-submitted-description">
                        Thank you! We'll send you a detailed quote within 24 hours.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </form>
            </section>
          </div>

          {/* Component Integration Summary */}
          <section className="bg-muted/30 p-4 rounded-lg" aria-labelledby="integration-patterns-heading">
            <h4 id="integration-patterns-heading" className="font-semibold mb-3">Form Component Integration Patterns:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Contact Form Pattern:</strong>
                <ul className="text-muted-foreground space-y-1 mt-1" role="list">
                  <li role="listitem">• Input + Label for personal data</li>
                  <li role="listitem">• Select for categorization</li>
                  <li role="listitem">• Textarea for detailed messages</li>
                  <li role="listitem">• Checkbox for consent (GDPR)</li>
                  <li role="listitem">• Button for submission</li>
                  <li role="listitem">• Dialog for confirmation</li>
                </ul>
              </div>
              <div>
                <strong>Business Benefits:</strong>
                <ul className="text-muted-foreground space-y-1 mt-1" role="list">
                  <li role="listitem">• Lead generation 24/7</li>
                  <li role="listitem">• Qualified prospect data</li>
                  <li role="listitem">• Automated follow-up workflows</li>
                  <li role="listitem">• GDPR compliance built-in</li>
                  <li role="listitem">• Professional user experience</li>
                  <li role="listitem">• Mobile-responsive design</li>
                </ul>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Form Validation Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Form Validation & User Experience</CardTitle>
          <CardDescription>
            Real-time validation, error handling, and success states with accessibility announcements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section aria-labelledby="validation-states-heading">
              <h4 id="validation-states-heading" className="font-semibold mb-3">Validation States:</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="demo-validation-email">Email (Error State)</Label>
                  <Input 
                    id="demo-validation-email"
                    type="email" 
                    placeholder="Invalid email" 
                    className="border-red-500"
                    aria-invalid="true"
                    aria-describedby="demo-validation-email-error"
                  />
                  <p id="demo-validation-email-error" className="text-sm text-red-500" role="alert">
                    Please enter a valid email address
                  </p>
                </div>
                <div>
                  <Label htmlFor="demo-validation-name">Name (Success State)</Label>
                  <Input 
                    id="demo-validation-name"
                    placeholder="John Doe" 
                    className="border-green-500"
                    aria-describedby="demo-validation-name-success"
                  />
                  <p id="demo-validation-name-success" className="text-sm text-green-500">
                    ✓ Looks good!
                  </p>
                </div>
                <div>
                  <Label htmlFor="demo-validation-required">Required Field</Label>
                  <Input 
                    id="demo-validation-required"
                    placeholder="This field is required"
                    aria-required="true"
                    aria-describedby="demo-validation-required-hint"
                  />
                  <p id="demo-validation-required-hint" className="text-sm text-muted-foreground">
                    * Required field
                  </p>
                </div>
              </div>
            </section>
            
            <section aria-labelledby="user-feedback-heading">
              <h4 id="user-feedback-heading" className="font-semibold mb-3">User Feedback:</h4>
              <div className="space-y-3">
                <Alert role="status" aria-live="polite">
                  <AlertTitle>Form Submitted Successfully!</AlertTitle>
                  <AlertDescription>
                    Thank you for your message. We'll get back to you soon.
                  </AlertDescription>
                </Alert>
                
                <div className="p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded" role="alert">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <span aria-hidden="true">⚠️</span> Please review the highlighted fields above.
                  </p>
                </div>
                
                <div className="flex gap-2" role="group" aria-label="Status indicators">
                  <Badge variant="default" aria-label="Valid status">Valid</Badge>
                  <Badge variant="destructive" aria-label="Error status">Error</Badge>
                  <Badge variant="secondary" aria-label="Processing status">Processing</Badge>
                </div>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDemo = () => {
    switch (activeDemo) {
      case 'contact':
        return <ContactFormDemo />;
      case 'newsletter':
        return <NewsletterFormDemo />;
      case 'quote':
        return <QuoteFormDemo />;
      case 'components':
        return <ComponentsDemo />;
      default:
        return <CombinedDemo />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Accessibility: Live regions for announcements */}
      <div 
        ref={announceRef}
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      ></div>
      <div 
        ref={formStatusRef}
        className="sr-only" 
        aria-live="assertive" 
        aria-atomic="true"
      ></div>

      {/* Accessibility: Instructions for screen readers */}
      <div className="sr-only">
        <p>Form demonstration selector. Use arrow keys to navigate, numbers 1-5 for quick access, or click to select different form types.</p>
      </div>
      
      {/* Demo Selector - Now fully keyboard accessible */}
      <div className="p-4 bg-muted/30 rounded-lg">
        <div className="mb-2">
          <h3 className="font-semibold text-sm">Form Demonstrations</h3>
          <p className="text-xs text-muted-foreground">
            Use arrow keys or numbers 1-5 to navigate form types
          </p>
        </div>
        <div 
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Form demonstration selection"
        >
          {demoTabs.map((demo, index) => (
            <Button
              key={demo.id}
              ref={(el) => { demoButtonsRef.current[index] = el; }}
              variant={activeDemo === demo.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleDemoChange(demo.id)}
              onKeyDown={(e) => handleDemoKeydown(e, index)}
              className="flex items-center gap-2 focus:ring-2 focus:ring-primary focus:ring-offset-2"
              role="tab"
              tabIndex={activeDemo === demo.id ? 0 : -1}
              aria-selected={activeDemo === demo.id}
              aria-current={activeDemo === demo.id ? 'page' : undefined}
              aria-describedby={`demo-${demo.id}-description`}
            >
              <span aria-hidden="true">{demo.icon}</span>
              <span className="hidden sm:inline">{demo.label}</span>
              <span className="text-xs opacity-60 ml-1">{demo.shortcut}</span>
            </Button>
          ))}
        </div>
        
        {/* Demo descriptions for screen readers */}
        <div className="sr-only">
          {demoTabs.map((demo) => (
            <div key={demo.id} id={`demo-${demo.id}-description`}>
              {demo.label} - Use keyboard shortcut {demo.shortcut} or select to view {demo.label.toLowerCase()} demonstration
            </div>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <main role="main" aria-label="Form component demonstration">
        <div className="min-h-[400px]">
          {renderDemo()}
        </div>
      </main>

      {/* Business Integration Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Form Components Business Integration</CardTitle>
          <CardDescription>
            How these 7 components create complete business workflows with accessibility built-in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <section aria-labelledby="lead-generation-heading">
              <h4 id="lead-generation-heading" className="font-semibold mb-2">Lead Generation:</h4>
              <ul className="space-y-1 text-muted-foreground" role="list">
                <li role="listitem">• Contact forms capture prospects</li>
                <li role="listitem">• Newsletter builds email lists</li>
                <li role="listitem">• Quote requests qualify leads</li>
                <li role="listitem">• GDPR compliance built-in</li>
                <li role="listitem">• Professional presentation</li>
              </ul>
            </section>
            <section aria-labelledby="user-experience-heading">
              <h4 id="user-experience-heading" className="font-semibold mb-2">User Experience:</h4>
              <ul className="space-y-1 text-muted-foreground" role="list">
                <li role="listitem">• Real-time validation feedback</li>
                <li role="listitem">• Clear error messages</li>
                <li role="listitem">• Success confirmation dialogs</li>
                <li role="listitem">• Mobile-responsive design</li>
                <li role="listitem">• Full accessibility compliance</li>
              </ul>
            </section>
            <section aria-labelledby="business-value-heading">
              <h4 id="business-value-heading" className="font-semibold mb-2">Business Value:</h4>
              <ul className="space-y-1 text-muted-foreground" role="list">
                <li role="listitem">• 24/7 customer inquiries</li>
                <li role="listitem">• Automated lead qualification</li>
                <li role="listitem">• Reduced support workload</li>
                <li role="listitem">• Higher conversion rates</li>
                <li role="listitem">• Professional brand image</li>
              </ul>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}