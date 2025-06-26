# Guide de Démarrage Rapide

## 🚀 Utilisation de ce starter

### Prérequis
- Node.js 22+ 
- npm ou yarn
- Git

### Installation pour un nouveau projet client

```bash
# 1. Cloner le starter
git clone https://github.com/XCUDA/astro-starter.git nom-projet-client
cd nom-projet-client

# 2. Installer les dépendances
npm install

# 3. Personnaliser pour le client
npx shadcn@latest init --force  # Choisir la palette appropriée

# 4. Démarrer le développement
npm run dev
```

### Choix rapide de palette selon le client

| Si le client est... | Choisir |
|---------------------|---------|
| Corporate, finance, minimal | `Neutral` |
| Moderne, dynamique | `Slate` | 
| Traditionnel, stable | `Gray` |
| Créatif, chaleureux | `Stone` |
| Tech, précis | `Zinc` |

### Ajouter des composants shadcn/ui

```bash
# Exemples de composants utiles
npx shadcn@latest add card
npx shadcn@latest add dialog  
npx shadcn@latest add form
npx shadcn@latest add navigation-menu
```

### Structure du projet

```
src/
├── components/
│   ├── ui/           # Composants shadcn/ui
│   ├── layouts/      # Layouts Astro
│   └── islands/      # Composants React interactifs
├── pages/            # Routes Astro
├── styles/           # CSS global et thème
└── lib/              # Utilitaires
```

### Déploiement

```bash
# Build de production
npm run build

# Preview local
npm run preview
```

## 📚 Documentation complète

- [Système de design](./design-system/README.md) - Guide complet des couleurs et variants
- [Architecture](../README.md#architecture) - Détails techniques de la stack

## 🆘 Dépannage rapide

### Les composants shadcn/ui ne s'affichent pas
1. Vérifier que React est configuré dans `astro.config.mjs`
2. S'assurer que les alias d'import sont correctement configurés dans `tsconfig.json`

### Erreurs de build TailwindCSS
1. Vérifier que `@tailwindcss/vite` est dans `astro.config.mjs`
2. Contrôler l'import dans `src/styles/global.css`

### Composants React non interactifs
1. Ajouter une directive client (`client:load`, `client:visible`, etc.)
2. Vérifier que le composant est dans un fichier `.tsx`