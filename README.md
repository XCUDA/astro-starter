# Astro Professional Starter

A modern, production-ready Astro 5 starter with TailwindCSS 4, shadcn/ui, and TypeScript. Optimized for performance, accessibility, and professional development workflows.

## ✨ Features

- **⚡ Astro 5** - Latest performance optimizations with Islands architecture
- **🎨 TailwindCSS 4** - New high-performance engine with CSS-first configuration  
- **🧩 shadcn/ui** - Beautiful, accessible components with full code ownership
- **📘 TypeScript** - Full type safety with modern JSX transformation
- **♿ Accessibility** - WCAG 2.1 AA compliant structure and navigation
- **📱 Responsive** - Mobile-first design with modern CSS features
- **🔧 Developer Experience** - Hot reload, IntelliSense, and professional tooling

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/XCUDA/astro-starter.git
cd astro-starter
npm install

# Start development
npm run dev
```

Visit `http://localhost:4321` to see your starter in action.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📖 Documentation

- **[Quick Start Guide](./docs/QUICK-START.md)** - Get up and running in minutes
- **[Design System Guide](./docs/design-system/README.md)** - Complete color and component reference
- **[Architecture](#architecture)** - Technical details and decisions

## 🏗️ Architecture

### Stack Overview

- **Frontend Framework**: Astro 5 with Islands architecture
- **Styling**: TailwindCSS 4 with semantic color system
- **Components**: shadcn/ui with React 19 islands
- **Type Safety**: TypeScript with strict configuration
- **Build Tool**: Vite 6 with optimized bundling

### Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui components (owned code)
│   ├── layouts/      # Astro layout components  
│   └── islands/      # React interactive components
├── pages/            # Astro routes and pages
├── styles/           # Global CSS and theme configuration
├── lib/              # Shared utilities and helpers
└── content/          # Content collections (future)
```

### Islands Architecture

Static pages with selective hydration for optimal performance:

- **Static Content**: Rendered at build time for instant loading
- **Interactive Islands**: React components that hydrate on demand
- **Performance**: Only necessary JavaScript is loaded per page

## 🎨 Customization

### Design System

This starter uses a carefully crafted design system based on shadcn/ui:

- **Color Palettes**: Multiple options (Neutral, Slate, Gray, Stone, Zinc)
- **Component Variants**: Semantic button and element variations
- **Theme Support**: Built-in dark/light mode capabilities
- **Accessibility**: WCAG compliant color contrasts and interactions

See the [Design System Guide](./docs/design-system/README.md) for complete customization options.

### Adding Components

```bash
# Add individual shadcn/ui components as needed
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

Components are copied into your project for full control and customization.

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run preview  # Test production build locally
```

### Deployment Platforms

This starter is optimized for:

- **Vercel** - Zero-config deployment with automatic optimizations
- **Netlify** - Static site hosting with edge functions support  
- **Node.js Hosts** - Compatible with traditional hosting (Infomaniak, etc.)

## 📊 Performance

- **Lighthouse Score**: 100/100 for properly implemented pages
- **Core Web Vitals**: Optimized for real-world performance metrics
- **Bundle Size**: Minimal JavaScript footprint with selective hydration
- **Loading Speed**: Sub-second initial page loads

## 🤝 Contributing

This starter follows semantic versioning and conventional commits:

- `feat:` - New features or major improvements
- `fix:` - Bug fixes and patches  
- `docs:` - Documentation updates
- `chore:` - Maintenance and tooling updates

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🔗 Links

- [Astro Documentation](https://docs.astro.build/)
- [TailwindCSS 4 Documentation](https://tailwindcss.com/docs/v4-beta)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Astro Discord Community](https://astro.build/chat)

## 🌐 Online Development

Want to try this starter without local setup?

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/XCUDA/astro-starter)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/XCUDA/astro-starter)

---

**Built with ❤️ for professional web development**