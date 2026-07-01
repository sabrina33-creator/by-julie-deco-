# CLAUDE.md — Projet By Julie Déco
> Fichier de contexte à coller en début de session Claude Code

---

## IDENTITÉ DU PROJET

- **Nom commercial** : By Julie Déco
- **Cliente** : Julie Demaya (amie de Sabrina)
- **Activité** : Conseil en décoration intérieure 100% en ligne
- **Email** : byjuliedeco@gmail.com
- **Adresse** : 15 Rue Jean Ferrat, 33450 Saint-Loubès
- **SIRET** : 94247343000018
- **Zone SEO** : Bordeaux en priorité, France entière à distance

---

## STACK TECHNIQUE

- **Framework** : React 19.2.5 (Create React App)
- **React DOM** : 19.2.5
- **React Router** : 7.17.0
- **Framer Motion** : 12.40.0
- **react-scripts** : 5.0.1
- **Repo GitHub** : jd-deco (repo dédié, séparé du repo personnel essaloc)
- **Déploiement** : Netlify
- **Pas de** : TypeScript, Next.js, Vite


---

## STRUCTURE DES FICHIERS

```
src/
├── App.js              ← routing, header, footer, page contact
├── JDDecoHome.jsx      ← page accueil (hero, why, réalisations, FAQ, CTA)
├── JDDecoServices.jsx  ← page prestations
├── tokens.js           ← design tokens (couleurs C, typographies F)
├── analytics.js        ← wrapper trackEvent GA4
├── index.js / index.css / App.css
└── [photos Julie]      ← directement dans src/ (pas dans src/photos/)
    ├── cuisine avant.png / cuisine apres.png
    ├── cuisine derriere avant.jpeg / Cuisine derriere apres.jpeg
    ├── cuisine plaque avant.png / cuisine plaque apres.png
    ├── SDB avant.png / SDB apres.png
    ├── Salon avant.png / Salon apres.png
    └── [photos ambiance Unsplash pour hero/pilliers]
```

---

## IDENTITÉ VISUELLE

| Élément | Valeur |
|---|---|
| Couleur principale | Noir #0a0a0a |
| Couleur secondaire | Blanc #ffffff |
| Couleur accent | Or #C9A84C |
| Typographie titres | Georgia, serif fin |
| Typographie corps | Sans-sérif léger |
| Style général | Épuré, contemporain, minimaliste |
| Espacement | Beaucoup d'espace blanc |

---

## LOGO

- **Version horizontale** → navbar du site uniquement
- **Version carrée** → GMB, favicon, avatars, réseaux sociaux
- **Formats** : SVG (site) + PNG fond transparent (GMB, favicon)
- **GMB n'accepte pas le SVG** — toujours exporter en PNG

Structure logo :
- "by" en italique or (#C9A84C)
- "JULIE" en blanc ou noir selon fond
- "DÉCO" en or (#C9A84C)
- Lignes décoratives fines or

---

## PAGES DU SITE

### Page Accueil
- Hero plein écran — photo Unsplash intérieur minimaliste
- Accroche : *"Un intérieur qui vous ressemble, pour longtemps."*
- Section 3 arguments : Sur-mesure / Budget maîtrisé / Durable dans le temps
- Section réalisations avant/après (cuisine + salle de bain)
- CTA WhatsApp final

### Page Services
- Banner photo plein largeur (70vh)
- 3 cartes prestations avec prix affichés :
  - Conseil déco + moodboard — 150€
  - Sélection mobilier — 250€
  - Accompagnement complet — 490€
- CTA WhatsApp

### Page Contact
- Banner photo plein largeur (70vh)
- WhatsApp + email uniquement (pas de formulaire)
- Mention : "Premier échange gratuit sans engagement"

---

## CE QUI EST FAIT ✅

- Structure React 3 pages créée
- Design noir/blanc/or appliqué
- Photos Unsplash intégrées (hero, banners, arguments)
- Logo horizontal SVG + carré SVG + carré PNG intégrés dans navbar + footer
- Description GMB rédigée
- Appel GMB soumis avec SIRET
- Schéma JSON-LD LocalBusiness dans index.html (sans telephone ni sameAs encore)
- GA4 intégré (ID G-RBFV04NW4D) — events : whatsapp_click, email_click, page_view, cta_clicked
- Section "Mes réalisations" (JDDecoHome.jsx) : 5 projets avant/après avec vraies photos Julie
  - Cuisine / Cuisine II / Salle de bain / Salon / Cuisine III
  - Photos dans src/ (pas src/photos/)
  - Labels AVANT/APRÈS en or, séparateur vertical, responsive mobile
- Slider BeforeAfterSection supprimé (remplacé par la galerie réelle ci-dessus)

---

## CE QUI RESTE À FAIRE ⏳

- [ ] Vrai numéro WhatsApp Julie → remplacer +33600000000 dans App.js (l. 10), JDDecoHome.jsx (l. 656), JDDecoServices.jsx (l. 325 et 470)
- [ ] Ajouter `telephone` et `sameAs` (Instagram, etc.) dans le schéma LocalBusiness de index.html
- [ ] Fallback GA4 : file d'attente pour le premier `page_view` si gtag pas encore chargé (analytics.js l. 2)
- [ ] Labels des réalisations à valider avec Julie (Cuisine III → nom réel ?)
- [ ] Favicon créé et intégré
- [ ] Déploiement Netlify (domaine by-julie-deco.fr) + mise à jour URL flux GA4
- [ ] GMB — en attente réponse Google
- [ ] Modification nom commercial URSSAF (appeler le 3957)
- [ ] Numéro pro Julie (eSIM + WhatsApp Business)
- [ ] Page /realisations dédiée si les projets deviennent > 5

---

## RÈGLES IMPORTANTES À RESPECTER

### Git
- **Toujours vérifier le répertoire de travail avant tout commit**
- Confirme le chemin exact avant de faire quoi que ce soit
- Repo cible : jd-deco — jamais Salloc ni autre repo personnel

### Photos
- Photos Unsplash = placeholders légaux uniquement
- Pinterest = interdit (copyright)
- Photos Julie = dans src/photos, nommées explicitement

### Responsive
- Mobile first obligatoire
- Lazy loading sur toutes les images
- Limiter les animations sur mobile

### GMB
- En attente réponse Google sur appel soumis
- Document SIRET disponible (Demaya Julie, 94247343000018)
- Facture justificatif adresse en attente (à recevoir de Julie)
- Nom commercial "By Julie Déco" en cours de régularisation URSSAF

---

## DIFFÉRENCIATEUR CLÉ DE JULIE

> Décoration tendance et durable, accessible financièrement.
> Pas du luxe inaccessible, pas du cheap jetable.
> Le bon choix, au bon prix, pour longtemps.

---

## CONTACTS UTILES

- URSSAF auto-entrepreneurs : **3957** (appel lundi)
- Guichet unique : formalites.entreprises.gouv.fr
- Repo GitHub : jd-deco
