// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Site URL - essential for SEO and social sharing
  // In development, we use localhost, but this should be changed to your domain in production
  site: 'http://localhost:4321',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});