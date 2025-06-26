# Guide du Système de Design

## Vue d'ensemble

Ce starter utilise shadcn/ui avec TailwindCSS 4 pour créer un système de design moderne, cohérent et facilement personnalisable. Cette documentation explique les choix architecturaux et comment adapter le système selon les besoins clients.

## 🎨 Philosophie des Variants de Boutons

### Comprendre la subtilité intentionnelle

shadcn/ui adopte une approche de **design subtil** qui privilégie la hiérarchie sémantique sur le contraste visuel dramatique. Cette philosophie moderne vise à :

- **Réduire la fatigue visuelle** lors d'usage prolongé
- **Améliorer l'accessibilité** en évitant les contrastes excessifs  
- **Faciliter la personnalisation** client sans refonte complète
- **S'adapter aux tendances** du design professionnel moderne

### Hiérarchie des variants (du plus au moins visible)

1. **`default`** - Action principale que l'utilisateur doit remarquer
2. **`destructive`** - Actions potentiellement dangereuses (suppression)
3. **`outline`** - Actions importantes mais secondaires
4. **`secondary`** - Actions de support, moins prioritaires
5. **`ghost`** - Actions discrètes, souvent utilitaires
6. **`link`** - Références qui se fondent dans le texte

## 🎯 Palettes de couleurs disponibles

### Neutral (Configuration actuelle)
- **Usage** : Applications B2B, interfaces minimales
- **Caractéristique** : Contraste très subtil, élégance maximale
- **Avantage** : Base neutre facilement personnalisable

### Alternatives disponibles
- **Slate** : Plus de contraste, teintes bleues-grises
- **Gray** : Classique et stable
- **Stone** : Chaleureuse et organique  
- **Zinc** : Précise et technique

## 🛠️ Personnalisation pour projets clients

### Changer de palette (Recommandé)
```bash
npx shadcn@latest init --force
# Choisir la palette souhaitée lors de la configuration
```

### Modification manuelle (Avancé)
Éditer les variables oklch dans `src/styles/global.css` :

```css
:root {
  /* Exemple : augmenter le contraste */
  --secondary: oklch(0.90 0.008 240);  /* Plus sombre */
  --muted: oklch(0.94 0.005 60);       /* Teinte chaude */
  --accent: oklch(0.88 0.012 180);     /* Plus sombre + teinte */
}
```

## 📊 Recommandations par type de client

| Type de client | Palette recommandée | Justification |
|----------------|-------------------|---------------|
| Corporate/Finance | Neutral ou Slate | Sobriété, professionnalisme |
| Créatif/Marketing | Stone ou personnalisée | Caractère, différenciation |
| Technique/SaaS | Zinc ou Slate | Précision, modernité |
| Accessibilité forte | Personnalisée | Contrastes WCAG AAA |

## 🔧 Outils et validation

### Extensions VS Code recommandées
- Tailwind CSS IntelliSense (officielle)
- PostCSS Language Support

### Test de contraste
- Utiliser les DevTools navigateur
- Vérifier les ratios WCAG 2.1 AA minimum
- Tester sur différents écrans et conditions d'éclairage

## 📈 Évolution du système

Le système permet une évolution progressive :

1. **Phase 1** : Palette de base choisie selon le client
2. **Phase 2** : Ajustements selon retours utilisateur
3. **Phase 3** : Personnalisation avancée si nécessaire

Cette approche garantit une base solide tout en préservant la flexibilité pour l'évolution selon les besoins réels d'usage.

## 🚀 Prochaines étapes

- [ ] Choisir la palette selon le projet client
- [ ] Tester l'accessibilité avec les outils de validation
- [ ] Documenter les choix spécifiques dans le README du projet
- [ ] Recueillir les retours utilisateur pour ajustements futurs