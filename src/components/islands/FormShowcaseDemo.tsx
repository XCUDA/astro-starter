// FormShowcaseDemo.tsx - Interactive demo for Form Components
// Path: /src/components/islands/FormShowcaseDemo.tsx

import React, { useState } from 'react';
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

  const demoTabs = [
    { id: 'combined' as DemoType, label: 'All Combined', icon: '📝' },
    { id: 'contact' as DemoType, label: 'Contact Form', icon: '📬' },
    { id: 'newsletter' as DemoType, label: 'Newsletter', icon: '📧' },
    { id: 'quote' as DemoType, label: 'Quote Request', icon: '💰' },
    { id: 'components' as DemoType, label: 'Components', icon: '🧩' }
  ];

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
      setTimeout(() => {
        setSubmissionStatus('success');
        setTimeout(() => setSubmissionStatus('idle'), 3000);
      }, 1500);
    }
  };

  const ContactFormDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>📬</span>
          Professional Contact Form
        </CardTitle>
        <CardDescription>
          Complete contact form with validation and business logic
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleContactSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Full Name *</Label>
              <Input
                id="contact-name"
                value={contactForm.name}
                onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                className={validationErrors.name ? 'border-red-500' : ''}
              />
              {validationErrors.name && (
                <p className="text-sm text-red-500">{validationErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-email">Email Address *</Label>
              <Input
                id="contact-email"
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@company.com"
                className={validationErrors.email ? 'border-red-500' : ''}
              />
              {validationErrors.email && (
                <p className="text-sm text-red-500">{validationErrors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-company">Company/Organization</Label>
              <Input
                id="contact-company"
                value={contactForm.company}
                onChange={(e) => setContactForm(prev => ({ ...prev, company: e.target.value }))}
                placeholder="Your company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-subject">Subject *</Label>
              <Select value={contactForm.subject} onValueChange={(value) => setContactForm(prev => ({ ...prev, subject: value }))}>
                <SelectTrigger className={validationErrors.subject ? 'border-red-500' : ''}>
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
              {validationErrors.subject && (
                <p className="text-sm text-red-500">{validationErrors.subject}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-priority">Priority Level</Label>
            <Select value={contactForm.priority} onValueChange={(value) => setContactForm(prev => ({ ...prev, priority: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - General inquiry</SelectItem>
                <SelectItem value="medium">Medium - Business question</SelectItem>
                <SelectItem value="high">High - Urgent support needed</SelectItem>
                <SelectItem value="critical">Critical - System down</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">Message *</Label>
            <Textarea
              id="contact-message"
              value={contactForm.message}
              onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Please describe your inquiry in detail..."
              rows={4}
              className={validationErrors.message ? 'border-red-500' : ''}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{contactForm.message.length}/500 characters</span>
              {validationErrors.message && (
                <span className="text-red-500">{validationErrors.message}</span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="contact-consent"
                checked={contactForm.consent}
                onCheckedChange={(checked) => setContactForm(prev => ({ ...prev, consent: !!checked }))}
              />
              <Label htmlFor="contact-consent" className="text-sm">
                I agree to the processing of my personal data for the purpose of responding to my inquiry *
              </Label>
            </div>
            {validationErrors.consent && (
              <p className="text-sm text-red-500">{validationErrors.consent}</p>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="contact-newsletter"
                checked={contactForm.newsletter}
                onCheckedChange={(checked) => setContactForm(prev => ({ ...prev, newsletter: !!checked }))}
              />
              <Label htmlFor="contact-newsletter" className="text-sm">
                Subscribe to our newsletter for updates and news
              </Label>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              type="submit" 
              disabled={submissionStatus === 'loading'}
              className="flex-1"
            >
              {submissionStatus === 'loading' ? 'Sending...' : 'Send Message'}
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" variant="outline">
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Message Preview</DialogTitle>
                  <DialogDescription>
                    Review your message before sending
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-sm">
                  <div><strong>Name:</strong> {contactForm.name || 'Not provided'}</div>
                  <div><strong>Email:</strong> {contactForm.email || 'Not provided'}</div>
                  <div><strong>Company:</strong> {contactForm.company || 'Not provided'}</div>
                  <div><strong>Subject:</strong> {contactForm.subject || 'Not selected'}</div>
                  <div><strong>Priority:</strong> {contactForm.priority || 'Not set'}</div>
                  <div><strong>Message:</strong> {contactForm.message || 'No message'}</div>
                  <div><strong>Newsletter:</strong> {contactForm.newsletter ? 'Yes' : 'No'}</div>
                </div>
              </DialogContent>
            </Dialog>

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
              }}
            >
              Clear
            </Button>
          </div>

          {submissionStatus === 'success' && (
            <Alert>
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
          <span>📧</span>
          Newsletter Subscription
        </CardTitle>
        <CardDescription>
          Marketing newsletter signup with interest targeting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="newsletter-email">Email Address *</Label>
              <Input
                id="newsletter-email"
                type="email"
                value={newsletterForm.email}
                onChange={(e) => setNewsletterForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your.email@company.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newsletter-name">First Name</Label>
              <Input
                id="newsletter-name"
                value={newsletterForm.firstName}
                onChange={(e) => setNewsletterForm(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="Your first name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Interests (Select all that apply)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                    id={`interest-${interest}`}
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
                  />
                  <Label htmlFor={`interest-${interest}`} className="text-sm">
                    {interest}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newsletter-frequency">Email Frequency</Label>
            <Select value={newsletterForm.frequency} onValueChange={(value) => setNewsletterForm(prev => ({ ...prev, frequency: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="How often would you like to hear from us?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily - Get all updates</SelectItem>
                <SelectItem value="weekly">Weekly - Curated highlights</SelectItem>
                <SelectItem value="monthly">Monthly - Major updates only</SelectItem>
                <SelectItem value="quarterly">Quarterly - Essential news</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="newsletter-consent"
                checked={newsletterForm.consent}
                onCheckedChange={(checked) => setNewsletterForm(prev => ({ ...prev, consent: !!checked }))}
              />
              <Label htmlFor="newsletter-consent" className="text-sm">
                I agree to receive marketing emails and understand I can unsubscribe at any time *
              </Label>
            </div>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Subscription Preview:</h4>
            <div className="text-sm space-y-1">
              <div><strong>Email:</strong> {newsletterForm.email || 'Not provided'}</div>
              <div><strong>Name:</strong> {newsletterForm.firstName || 'Not provided'}</div>
              <div><strong>Interests:</strong> {newsletterForm.interests.length > 0 ? newsletterForm.interests.join(', ') : 'None selected'}</div>
              <div><strong>Frequency:</strong> {newsletterForm.frequency || 'Not selected'}</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1">
              Subscribe to Newsletter
            </Button>
            <Button variant="outline">
              Learn More
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  const QuoteFormDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>💰</span>
          Request Quote
        </CardTitle>
        <CardDescription>
          Business quote request with project details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quote-name">Contact Name *</Label>
              <Input
                id="quote-name"
                value={quoteForm.name}
                onChange={(e) => setQuoteForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote-email">Business Email *</Label>
              <Input
                id="quote-email"
                type="email"
                value={quoteForm.email}
                onChange={(e) => setQuoteForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="business.email@company.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote-company">Company Name *</Label>
            <Input
              id="quote-company"
              value={quoteForm.company}
              onChange={(e) => setQuoteForm(prev => ({ ...prev, company: e.target.value }))}
              placeholder="Your company or organization"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quote-service">Service Required *</Label>
              <Select value={quoteForm.service} onValueChange={(value) => setQuoteForm(prev => ({ ...prev, service: value }))}>
                <SelectTrigger>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote-budget">Project Budget Range</Label>
              <Select value={quoteForm.budget} onValueChange={(value) => setQuoteForm(prev => ({ ...prev, budget: value }))}>
                <SelectTrigger>
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
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote-timeline">Project Timeline</Label>
            <Select value={quoteForm.timeline} onValueChange={(value) => setQuoteForm(prev => ({ ...prev, timeline: value }))}>
              <SelectTrigger>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote-description">Project Description *</Label>
            <Textarea
              id="quote-description"
              value={quoteForm.description}
              onChange={(e) => setQuoteForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Please describe your project requirements, goals, and any specific features you need..."
              rows={5}
            />
            <div className="text-xs text-muted-foreground">
              {quoteForm.description.length}/1000 characters - Be as detailed as possible for accurate quote
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="quote-consent"
                checked={quoteForm.consent}
                onCheckedChange={(checked) => setQuoteForm(prev => ({ ...prev, consent: !!checked }))}
              />
              <Label htmlFor="quote-consent" className="text-sm">
                I agree to be contacted regarding this quote request and understand my information will be kept confidential *
              </Label>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
            <h4 className="font-medium mb-2 text-blue-800 dark:text-blue-200">💡 What happens next?</h4>
            <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
              <li>• We'll review your requirements within 24 hours</li>
              <li>• Our team will prepare a detailed proposal</li>
              <li>• We'll schedule a call to discuss the project</li>
              <li>• You'll receive a formal quote within 3-5 business days</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1">
              Request Quote
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  Review Request
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Quote Request Summary</DialogTitle>
                  <DialogDescription>
                    Please review your quote request details
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2 text-sm max-h-96 overflow-y-auto">
                  <div><strong>Contact:</strong> {quoteForm.name} ({quoteForm.email})</div>
                  <div><strong>Company:</strong> {quoteForm.company}</div>
                  <div><strong>Service:</strong> {quoteForm.service}</div>
                  <div><strong>Budget:</strong> {quoteForm.budget}</div>
                  <div><strong>Timeline:</strong> {quoteForm.timeline}</div>
                  <div><strong>Description:</strong> {quoteForm.description}</div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  const ComponentsDemo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>🧩</span>
          Form Components Library
        </CardTitle>
        <CardDescription>
          Individual component demonstrations and variants
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Button Variants */}
        <div>
          <h4 className="font-semibold mb-4">Button Component Variants:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
            <Button className="w-full">Full Width</Button>
          </div>
        </div>

        {/* Input Variants */}
        <div>
          <h4 className="font-semibold mb-4">Input Component States:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Normal Input</Label>
              <Input placeholder="Enter text..." />
            </div>
            <div className="space-y-2">
              <Label>Email Input</Label>
              <Input type="email" placeholder="email@example.com" />
            </div>
            <div className="space-y-2">
              <Label>Password Input</Label>
              <Input type="password" placeholder="Your password" />
            </div>
            <div className="space-y-2">
              <Label>Disabled Input</Label>
              <Input disabled placeholder="Disabled input" />
            </div>
            <div className="space-y-2">
              <Label>Error State</Label>
              <Input placeholder="Invalid input" className="border-red-500" />
            </div>
            <div className="space-y-2">
              <Label>Success State</Label>
              <Input placeholder="Valid input" className="border-green-500" />
            </div>
          </div>
        </div>

        {/* Select Variants */}
        <div>
          <h4 className="font-semibold mb-4">Select Component Options:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Basic Select</Label>
              <Select>
                <SelectTrigger>
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
              <Label>Countries</Label>
              <Select>
                <SelectTrigger>
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
              <Label>Priority Levels</Label>
              <Select>
                <SelectTrigger>
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
        </div>

        {/* Checkbox and Label */}
        <div>
          <h4 className="font-semibold mb-4">Checkbox & Label Combinations:</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="checkbox1" />
              <Label htmlFor="checkbox1">Basic checkbox with label</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="checkbox2" defaultChecked />
              <Label htmlFor="checkbox2">Pre-checked checkbox</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="checkbox3" disabled />
              <Label htmlFor="checkbox3">Disabled checkbox</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{' '}
                <a href="#" className="text-primary hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </Label>
            </div>
          </div>
        </div>

        {/* Textarea */}
        <div>
          <h4 className="font-semibold mb-4">Textarea Variations:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Standard Textarea</Label>
              <Textarea placeholder="Enter your message..." rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Large Textarea</Label>
              <Textarea placeholder="Detailed description..." rows={6} />
            </div>
            <div className="space-y-2">
              <Label>Disabled Textarea</Label>
              <Textarea disabled placeholder="Disabled textarea" rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Textarea with Counter</Label>
              <Textarea placeholder="Max 200 characters..." rows={3} />
              <div className="text-xs text-muted-foreground text-right">0/200</div>
            </div>
          </div>
        </div>

        {/* Dialog Demo */}
        <div>
          <h4 className="font-semibold mb-4">Dialog Component:</h4>
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Simple Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Simple Dialog</DialogTitle>
                  <DialogDescription>
                    This is a basic dialog with title and description.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p>Dialog content goes here...</p>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Form Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Contact Form Dialog</DialogTitle>
                  <DialogDescription>
                    Quick contact form in a modal dialog.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="your.email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea placeholder="Your message..." rows={3} />
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">Send</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CombinedDemo = () => (
    <div className="space-y-6">
      
      {/* Form Workflow Demonstration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🔄</span>
            Complete Form Workflow
          </CardTitle>
          <CardDescription>
            All 7 form components working together in realistic business scenarios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Contact Quick Form */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-semibold flex items-center gap-2">
                <span>📬</span> Quick Contact
              </h4>
              <div className="space-y-3">
                <Input placeholder="Your name" />
                <Input type="email" placeholder="Email address" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Inquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales Question</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea placeholder="Your message..." rows={2} />
                <div className="flex items-center space-x-2">
                  <Checkbox id="quick-consent" />
                  <Label htmlFor="quick-consent" className="text-xs">
                    I agree to be contacted
                  </Label>
                </div>
                <Button className="w-full">Send Message</Button>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-semibold flex items-center gap-2">
                <span>📧</span> Newsletter
              </h4>
              <div className="space-y-3">
                <Input type="email" placeholder="Email for updates" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
                <div className="space-y-2">
                  <Label className="text-sm">Interests:</Label>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="int1" />
                      <Label htmlFor="int1" className="text-xs">Product Updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="int2" />
                      <Label htmlFor="int2" className="text-xs">Industry News</Label>
                    </div>
                  </div>
                </div>
                <Button className="w-full">Subscribe</Button>
              </div>
            </div>

            {/* Quote Request */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-semibold flex items-center gap-2">
                <span>💰</span> Quick Quote
              </h4>
              <div className="space-y-3">
                <Input placeholder="Company name" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Service needed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web Development</SelectItem>
                    <SelectItem value="app">Mobile App</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
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
                    <Button className="w-full">Get Quote</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Quote Request Submitted</DialogTitle>
                      <DialogDescription>
                        Thank you! We'll send you a detailed quote within 24 hours.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Component Integration Summary */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">Form Component Integration Patterns:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Contact Form Pattern:</strong>
                <ul className="text-muted-foreground space-y-1 mt-1">
                  <li>• Input + Label for personal data</li>
                  <li>• Select for categorization</li>
                  <li>• Textarea for detailed messages</li>
                  <li>• Checkbox for consent (GDPR)</li>
                  <li>• Button for submission</li>
                  <li>• Dialog for confirmation</li>
                </ul>
              </div>
              <div>
                <strong>Business Benefits:</strong>
                <ul className="text-muted-foreground space-y-1 mt-1">
                  <li>• Lead generation 24/7</li>
                  <li>• Qualified prospect data</li>
                  <li>• Automated follow-up workflows</li>
                  <li>• GDPR compliance built-in</li>
                  <li>• Professional user experience</li>
                  <li>• Mobile-responsive design</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Validation Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Form Validation & User Experience</CardTitle>
          <CardDescription>
            Real-time validation, error handling, and success states
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Validation States:</h4>
              <div className="space-y-3">
                <div>
                  <Label>Email (Error State)</Label>
                  <Input type="email" placeholder="Invalid email" className="border-red-500" />
                  <p className="text-sm text-red-500">Please enter a valid email address</p>
                </div>
                <div>
                  <Label>Name (Success State)</Label>
                  <Input placeholder="John Doe" className="border-green-500" />
                  <p className="text-sm text-green-500">✓ Looks good!</p>
                </div>
                <div>
                  <Label>Required Field</Label>
                  <Input placeholder="This field is required" />
                  <p className="text-sm text-muted-foreground">* Required field</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">User Feedback:</h4>
              <div className="space-y-3">
                <Alert>
                  <AlertTitle>Form Submitted Successfully!</AlertTitle>
                  <AlertDescription>
                    Thank you for your message. We'll get back to you soon.
                  </AlertDescription>
                </Alert>
                
                <div className="p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    ⚠️ Please review the highlighted fields above.
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Badge variant="default">Valid</Badge>
                  <Badge variant="destructive">Error</Badge>
                  <Badge variant="secondary">Processing</Badge>
                </div>
              </div>
            </div>
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
      
      {/* Demo Selector */}
      <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-lg">
        {demoTabs.map((demo) => (
          <Button
            key={demo.id}
            variant={activeDemo === demo.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveDemo(demo.id)}
            className="flex items-center gap-2"
          >
            <span>{demo.icon}</span>
            <span className="hidden sm:inline">{demo.label}</span>
          </Button>
        ))}
      </div>

      {/* Demo Content */}
      <div className="min-h-[400px]">
        {renderDemo()}
      </div>

      {/* Business Integration Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Form Components Business Integration</CardTitle>
          <CardDescription>
            How these 7 components create complete business workflows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Lead Generation:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Contact forms capture prospects</li>
                <li>• Newsletter builds email lists</li>
                <li>• Quote requests qualify leads</li>
                <li>• GDPR compliance built-in</li>
                <li>• Professional presentation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">User Experience:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Real-time validation feedback</li>
                <li>• Clear error messages</li>
                <li>• Success confirmation dialogs</li>
                <li>• Mobile-responsive design</li>
                <li>• Accessibility compliant</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Business Value:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 24/7 customer inquiries</li>
                <li>• Automated lead qualification</li>
                <li>• Reduced support workload</li>
                <li>• Higher conversion rates</li>
                <li>• Professional brand image</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}