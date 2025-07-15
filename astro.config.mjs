// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// Toggle Demo/Client mode
const isClientMode = process.env.CLIENT_MODE === 'true';
const isDemoMode = !isClientMode;

console.log(`🎯 Mode: ${isClientMode ? 'CLIENT' : 'DEMO (avec showcases)'}`);


// https://astro.build/config
export default defineConfig({
  // Site URL - essential for SEO and social sharing
  // In development, we use localhost, but this should be changed to your domain in production
  site: isClientMode 
    ? 'https://votre-domaine-client.ch' 
    : 'http://localhost:4321',

  vite: {
    plugins: [tailwindcss()],
    define: {
      // Variables globales accessibles dans tous les composants
      'import.meta.env.CLIENT_MODE': isClientMode,
      'import.meta.env.DEMO_MODE': isDemoMode,
    }
  },

  integrations: [react()],

  // En mode client, on peut optimiser pour la production
  ...(isClientMode && {
    build: {
      inlineStylesheets: 'auto',
    },
    compressHTML: true,
  })
});