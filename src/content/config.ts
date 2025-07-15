// src/content/config.ts
// Content Collections Schema for Holistic Therapist Website

import { defineCollection, z } from 'astro:content';

// Pages collection - Static pages content
const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      keywords: z.array(z.string()).default([]),
    }).optional(),
  }),
});

// Services collection - Therapeutic services offered
const services = defineCollection({
  type: 'content', 
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    duration: z.string(), // "60 minutes", "90 minutes"
    price: z.string(), // "CHF 120", "À partir de CHF 80"
    benefits: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    image: z.string().optional(),
    category: z.enum(['massage', 'energetic', 'movement', 'consultation']),
    suitable_for: z.array(z.string()).default([]),
    contraindications: z.array(z.string()).default([]),
  }),
});

// Testimonials collection - Client testimonials
const testimonials = defineCollection({
  type: 'content',
  schema: z.object({
    author: z.string(),
    location: z.string().optional(), // "Lausanne", "Région lémanique"
    service: z.string(), // Which service they received
    rating: z.number().min(1).max(5),
    featured: z.boolean().default(false),
    date: z.date(),
    verified: z.boolean().default(false),
  }),
});

// Booking info collection - Appointment and pricing info
const booking = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.enum(['schedule', 'pricing', 'policies', 'location']),
    order: z.number().default(0),
    contact: z.object({
      phone: z.string().optional(),
      email: z.string().optional(),
      whatsapp: z.string().optional(),
      booking_url: z.string().optional(),
    }).optional(),
    schedule: z.object({
      monday: z.string().optional(),
      tuesday: z.string().optional(), 
      wednesday: z.string().optional(),
      thursday: z.string().optional(),
      friday: z.string().optional(),
      saturday: z.string().optional(),
      sunday: z.string().optional(),
    }).optional(),
  }),
});

export const collections = {
  pages,
  services,
  testimonials,
  booking,
};