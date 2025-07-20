# Guide SEO - Référencement Automatique + Personnalisation

## 🎯 Notre Système SEO

**3 niveaux de personnalisation** (du plus simple au plus avancé) :

1. **Automatique** → Le système génère tout seul
2. **Frontmatter** → Vous modifiez dans le fichier Markdown
3. **Code** → Développeur modifie pour cas spéciaux

## ⚙️ Que Génère le Système Automatiquement

Pour chaque service, le système crée automatiquement :

```✅ Titre SEO : "Massage Thérapeutique | Thérapeute Holistique - Bien-être & Relaxation"
✅ Description : "Découvrez massage thérapeutique pour votre bien-être. Un massage classique..."
✅ Mots-clés : ["thérapie", "bien-être", "relaxation", "massage", "santé", "détente", "lausanne"]
✅ Open Graph : Image + titre/description pour réseaux sociaux automatiques
✅ Données Google : Prix CHF 120, Durée 60 minutes
✅ Analytics : Tracking Plausible + Google Analytics
✅ Sitemap : Pages ajoutées automatiquement à sitemap.xml
✅ Robots.txt : Génération automatique pour moteurs de recherche
```

## 🛠️ Comment Personnaliser (Méthode Simple)

### Étape 1 : Ouvrir le fichier service

**Fichier** : `src/content/services/massage-therapeutique.md`

### Étape 2 : Ajouter section SEO

```yaml
---
title: "Massage Thérapeutique Suédois"
description: "Un massage classique aux huiles essentielles..."
# ... autres champs existants

# ✅ AJOUTEZ CETTE SECTION
seo:
  metaTitle: "Votre titre SEO personnalisé"
  metaDescription: "Votre description SEO personnalisée" 
  keywords: ["mot1", "mot2", "mot3", "mot4", "mot5"]
---
```

### Étape 3 : Sauvegarder

Le SEO est mis à jour automatiquement.

## 📝 Éléments Personnalisables

### Niveau 1 : Frontmatter Service (Simple)

| Élément | Fonction | Règle | Exemple |
|---------|----------|-------|---------|
| `metaTitle` | Titre Google | 60 caractères max | `"Massage Prénatal Expert \| Grossesse Lausanne"` |
| `metaDescription` | Description Google | 160 caractères max | `"Massage prénatal spécialisé. Soulagement douleurs grossesse. RDV 021 123 45 67"` |
| `keywords` | Mots-clés | 5-8 mots maximum | `["massage prénatal", "grossesse", "lausanne", "future maman", "douleurs"]` |

### Niveau 2 : Frontmatter Avancé (Tous éléments)

```yaml
seo:
  # SEO de base
  metaTitle: "Titre Google personnalisé"
  metaDescription: "Description Google personnalisée"
  keywords: ["mot1", "mot2", "mot3"]
  
  # Open Graph (réseaux sociaux)
  ogTitle: "Titre différent pour Facebook/LinkedIn"
  ogDescription: "Description pour partage social"
  ogImage: "/images/service-og.jpg"
  ogType: "article"  # ou "website"
  
  # Twitter
  twitterCard: "summary_large_image"  # ou "summary"
  
  # Contrôle référencement
  canonical: "https://monsite.ch/url-canonique"
  noindex: true  # Empêcher indexation Google
  author: "Nom de l'auteur"
```

### Niveau 3 : Configuration Business (Développeur)

```js
const seoConfig = {
  businessName: "Cabinet Wellness Lausanne",
  location: "Lausanne",
  siteUrl: "https://cabinet-wellness.ch",    # ✅ IMPORTANT pour images Open Graph
  defaultTemplate: "therapist",
  defaultKeywords: ["thérapie", "bien-être", "Lausanne"],
  
  # ✅ RÉSEAUX SOCIAUX
  social: {
    facebook: "https://facebook.com/votre-page",
    instagram: "https://instagram.com/votre-compte",
    twitter: "@votre-compte"
  },
  
  # ✅ ANALYTICS
  analytics: {
    plausible: "votre-domaine.ch",        # Analytics Plausible
    ga4: "G-XXXXXXXXXX"                   # Google Analytics 4
  }
};
```

### Images Open Graph Automatiques

Le système sélectionne automatiquement les images de partage selon :

**1. Priorité** : Custom → Catégorie service → Template default → Fallback

**2. Images par catégorie** (dossier `/public/images/og/`) :

- **massage** → `massage-therapy.jpg`
- **energetic** → `energy-healing.jpg`  
- **movement** → `movement-therapy.jpg`
- **consultation** → `consultation.jpg`

**3. Customisation image** :

```yaml
seo:
  ogImage: "/images/og/mon-image-custom.jpg"  # Image spécifique
```

**4. Taille recommandée** : 1200x630 pixels

## 🎯 Cas d'Usage Concrets

### Service Standard → Laisser Automatique

```yaml
# ✅ RIEN À FAIRE - Le système génère automatiquement
title: "Réflexologie Plantaire"
description: "Technique de massage des pieds..."
```

### Service Spécialisé → Personnalisation Simple

```yaml
title: "Massage Prénatal"
description: "Massage adapté aux femmes enceintes..."
seo:
  metaTitle: "Massage Prénatal Expert | Grossesse Sereine Lausanne"
  metaDescription: "Massage prénatal certifié. Soulagement douleurs grossesse, relaxation future maman. RDV 021 647 12 34"
  keywords: ["massage prénatal", "grossesse", "future maman", "lausanne", "douleurs grossesse"]
```

### Service VIP → Personnalisation Complète (Réseaux Sociaux)

```yaml
title: "Consultation Découverte"
description: "Première consultation gratuite..."
seo:
  metaTitle: "Consultation Gratuite 30min | Découvrez Nos Thérapies"
  metaDescription: "Consultation découverte GRATUITE 30min. Discutez avec notre thérapeute, trouvez la thérapie adaptée."
  keywords: ["consultation gratuite", "découverte", "thérapie", "premier rendez-vous", "lausanne"]
  
  # ✅ OPEN GRAPH (Facebook, LinkedIn)
  ogTitle: "🎁 Consultation Gratuite - Cabinet Wellness Lausanne"
  ogDescription: "Offre spéciale : Consultation découverte GRATUITE de 30 minutes avec notre thérapeute experte."
  ogImage: "/images/consultation-gratuite-og.jpg"
  ogType: "article"
  
  # ✅ TWITTER
  twitterCard: "summary_large_image"
```

### Page Spéciale → Contrôle Indexation

```yaml
title: "Page Test Interne"
description: "Page de test non publique..."
seo:
  metaTitle: "Test - Ne pas indexer"
  metaDescription: "Page de test interne"
  noindex: true              # ✅ EMPÊCHE GOOGLE D'INDEXER
  canonical: "https://cabinet-wellness.ch/services/consultation"  # ✅ URL CANONIQUE
```

## 🔧 Configuration Business (Développeur)

**Fichier** : `src/pages/services/[...slug].astro`

```js
// ✅ À MODIFIER pour chaque client
const seoConfig = {
  businessName: "Cabinet Wellness Lausanne",     // Nom de votre business
  location: "Lausanne",                          // Votre ville
  defaultTemplate: "therapist",                  // Type business
  defaultKeywords: ["thérapie", "bien-être", "Lausanne", "massage", "relaxation"],
  
  // ✅ RÉSEAUX SOCIAUX
  social: {
    facebook: "https://facebook.com/votre-page",
    instagram: "https://instagram.com/votre-compte",
    twitter: "https://twitter.com/votre-compte"
  },
  
  // ✅ ANALYTICS
  analytics: {
    plausible: "votre-domaine.ch",              // Plausible Analytics
    ga4: "G-XXXXXXXXXX"                         // Google Analytics 4
  }
};
```

### Comment Configurer Google Analytics

**Étape 1** : Créer compte Google Analytics

1. Aller sur [analytics.google.com](https://analytics.google.com)
2. Créer propriété pour votre site
3. Copier l'ID (format : `G-XXXXXXXXXX`)

**Étape 2** : Ajouter l'ID dans seoConfig

```js
analytics: {
  ga4: "G-ABC123DEF4"  // ✅ Remplacer par votre ID réel
}
```

**Étape 3** : Le tracking se lance automatiquement

### Comment Configurer Plausible Analytics

**Étape 1** : Créer compte [Plausible](https://plausible.io)
**Étape 2** : Ajouter votre domaine

```js
analytics: {
  plausible: "cabinet-wellness.ch"  // ✅ Votre domaine sans https://
}
```

### Types Business Disponibles

- `"therapist"` → Thérapeute, massage, bien-être
- `"restaurant"` → Restaurant, cuisine  
- `"ecommerce"` → Boutique en ligne
- `"consultant"` → Conseil, expertise

## ✅ Checklist Validation SEO

**Après modification, vérifiez** :

### SEO de Base

- [ ] `metaTitle` ≤ 60 caractères
- [ ] `metaDescription` ≤ 160 caractères  
- [ ] 5-8 `keywords` maximum
- [ ] Mots-clés incluent votre ville
- [ ] Description inclut appel à l'action (téléphone/RDV)

### Open Graph (Réseaux Sociaux) - Optionnel

- [ ] `ogTitle` accrocheur pour partage
- [ ] `ogDescription` engageante
- [ ] `ogImage` existe (1200x630px recommandé)
- [ ] `ogType` correct ("website" ou "article")

### Contrôles Avancés - Optionnel  

- [ ] `canonical` URL correcte si différente
- [ ] `noindex: true` si page privée/test
- [ ] `author` renseigné si important
- [ ] `twitterCard` adapté au contenu

## 🔍 Comment Vérifier

### SEO de Base (vérification)

1. **Google** : `site:votre-domaine.ch massage`
2. **Titre et description** affichés correctement
3. **Sitemap** : `https://votre-site.ch/sitemap.xml` (doit lister vos pages)

### Open Graph (Réseaux Sociaux)

1. **Facebook Debugger** : [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/)
2. **LinkedIn Post Inspector** : [linkedin.com/post-inspector](https://www.linkedin.com/post-inspector/)
3. **Twitter Card Validator** : [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator)

### Google Search Console

1. Ajouter votre site : [Google Search Console](https://search.google.com/search-console)
2. **Soumettre sitemap** : Sitemaps → Ajouter → `https://votre-site.ch/sitemap.xml`
3. **Vérifier indexation** : Pages → Toutes les pages connues

### Tests Locaux

1. **Partager lien** sur Facebook/LinkedIn → Vérifier aperçu
2. **DevTools** → Elements → `<head>` → Vérifier meta tags

## 🆘 Problèmes Fréquents

| Problème | Solution |
|----------|----------|
| Titre trop long | Réduire à 60 caractères |
| Description générique | Ajouter ville + numéro téléphone |
| Pas de mots-clés ville | Ajouter "lausanne" dans keywords |
| Changement pas visible | Attendre 24h pour Google |

## 📞 Support

**Modifications simples** → Suivre ce guide
**Modifications avancées** → Contacter développeur avec :

- URL page concernée
- Modification souhaitée précise
