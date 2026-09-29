---
name: Aliko
description: Un plan de travail blanc où les documents restent lisibles et une seule couleur désigne l'action.
colors:
  ink: "oklch(0.2178 0.0122 168)"
  paper: "oklch(1 0 0)"
  chrome: "oklch(0.9865 0.0018 106)"
  mist: "oklch(0.9698 0.0027 106)"
  graphite: "oklch(0.5514 0.0138 168)"
  hairline: "oklch(0.9189 0.0035 106)"
  sauge: "oklch(0.4824 0.0916 163)"
  sauge-tint: "oklch(0.9686 0.0064 163)"
  sauge-light: "oklch(0.7412 0.0978 163)"
  rose: "oklch(0.5847 0.2079 22.5)"
  status-sent: "oklch(0.5107 0.0862 245)"
  status-interview: "oklch(0.6412 0.1284 62)"
  document: "oklch(1 0 0)"
  document-ink: "oklch(0.1788 0 0)"
typography:
  display:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.5vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "normal"
  body:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.06em"
  numeric:
    fontFamily: "Instrument Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.2
    fontFeature: "tabular-nums"
rounded:
  sm: "8px"
  md: "10px"
  lg: "12px"
  xl: "16px"
  2xl: "20px"
  pill: "9999px"
spacing:
  hairline: "1px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  section: "48px"
  page: "64px"
components:
  button-primary:
    backgroundColor: "{colors.sauge}"
    textColor: "{colors.paper}"
    typography: "{typography.title}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"
  button-primary-hover:
    backgroundColor: "oklch(0.4324 0.0916 163)"
    textColor: "{colors.paper}"
  button-outline:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"
  button-outline-hover:
    backgroundColor: "{colors.sauge-tint}"
    textColor: "{colors.sauge}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "36px"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "36px"
  card-surface:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
  chip-status:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    typography: "{typography.numeric}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
    height: "24px"
  nav-item-active:
    backgroundColor: "{colors.sauge-tint}"
    textColor: "{colors.sauge}"
    typography: "{typography.title}"
    rounded: "{rounded.sm}"
    padding: "0 12px"
    height: "36px"
  document-page:
    backgroundColor: "{colors.document}"
    textColor: "{colors.document-ink}"
    rounded: "{rounded.sm}"
    width: "210mm"
---

# Design System: Aliko

## Overview

**Creative North Star: "La table de travail"**

Une table blanche, bien éclairée, sur laquelle des documents sont posés à plat. L'interface est la table : plane, silencieuse, sans matière propre. Les documents — CV, lettres, offres — sont les seuls objets qui ont le droit d'exister comme objets. Et il y a un stylo, un seul, vert sauge : il désigne ce sur quoi l'utilisateur doit agir. Toute la tension du système tient dans ce rapport. Quand le stylo se met à écrire partout, la table devient illisible.

Le système emprunte sa discipline à Airbnb : fond blanc franc, air généreux, filets de 1 px plutôt que bordures marquées, cartes plates au repos qui se soulèvent sous le curseur, contrôles en pilule ou en rectangle doux, et un accent unique tenu très court. Il n'en emprunte ni la couleur, ni la photographie, ni le vocabulaire de voyage. La retenue est reprise ; le costume ne l'est pas.

L'anti-référence est explicite et nommée : **le verre façon Apple du cahier des charges v1 est abandonné**. Pas de surfaces translucides, pas de `backdrop-filter`, pas de fond d'ambiance flouté, pas de verres teintés empilés. Un CV est un document opaque ; une interface qui prétend être en verre rend illisible ce qu'elle est censée mettre en valeur, et casse à la première préférence *Réduire la transparence*. La profondeur ici vient de l'ordre des plans et du filet, jamais de la matière.

**Key Characteristics:**

- Fond blanc, chrome applicatif en blanc cassé, texte encre à peine désaturé vers le vert
- Une seule couleur d'action : sauge profonde, tenue sous 10 % de la surface
- Filet de 1 px avant toute ombre ; les cartes sont plates au repos
- Instrument Sans partout, JetBrains Mono réservé aux micro-libellés
- La page du CV n'est jamais thémée : elle reste blanche et opaque, en clair comme en sombre
- Chiffres tabulaires partout où une valeur peut changer sans que la ligne bouge

## Colors

Palette d'un atelier plutôt que d'une marque : beaucoup de blanc et de gris papier, une encre presque noire, une seule couleur saturée.

### Primary

- **Sauge profonde** (`oklch(0.4824 0.0916 163)`) : la couleur de l'action et de la sélection. Bouton principal, élément de navigation actif, anneau de focus, courbes de graphique, statut « Offre ». Elle ne décore jamais une surface : elle désigne quelque chose que l'utilisateur peut faire ou vient de réussir. En sombre elle s'éclaircit (`oklch(0.7412 0.0978 163)`) pour tenir le contraste sur fond encre.
- **Sauge voile** (`oklch(0.9686 0.0064 163)`) : le fond des états sélectionné, survolé et actif. Assez pâle pour ne jamais concurrencer le blanc de la table.

### Secondary

Aucune. Le système n'a qu'une seule voix chromatique ; les statuts ci-dessous sont une signalétique fonctionnelle, pas une seconde couleur de marque.

### Tertiary

- **Signalétique de candidature** — cinq teintes, chacune avec un ton plein (pastille, texte) et un ton voilé (fond de pilule) : **Brouillon** graphite, **Envoyée** ardoise (`oklch(0.5107 0.0862 245)`), **Entretien** abricot (`oklch(0.6412 0.1284 62)`), **Offre** sauge, **Refus** rose (`oklch(0.5847 0.2079 22.5)`). Elles n'apparaissent que sur un objet candidature : pilule de statut, point de la frise, colonne du tableau. Nulle part ailleurs.

### Neutral

- **Encre** (`oklch(0.2178 0.0122 168)`) : tout le texte de premier plan. Un noir très légèrement dévié vers le vert, pour qu'il appartienne à la même famille que la sauge sans se lire comme coloré.
- **Papier** (`oklch(1 0 0)`) : le fond de la page et des cartes. Blanc franc, pas de crème.
- **Chrome** (`oklch(0.9865 0.0018 106)`) : la barre latérale et les zones d'outillage, décrochées du blanc d'un cheveu — assez pour que la table se distingue de ce qui est posé dessus.
- **Brume** (`oklch(0.9698 0.0027 106)`) : fonds discrets, lignes alternées, états désactivés.
- **Graphite** (`oklch(0.5514 0.0138 168)`) : texte secondaire, libellés, métadonnées. Le seul gris de texte autorisé sous l'encre.
- **Filet** (`oklch(0.9189 0.0035 106)`) : toutes les séparations, toutes les bordures de contrôle.

### Named Rules

**The One Pen Rule.** La sauge couvre au maximum 10 % de la surface d'un écran. Un écran qui contient deux boutons sauge contient un bouton de trop : le second devient `outline`. Sa rareté est ce qui la rend lisible.

**The Document Rule.** La page d'un CV, d'une lettre ou d'un aperçu de modèle utilise `--document` / `--document-foreground` / `--document-border`, jamais les jetons de thème. Elle reste blanche et opaque en mode sombre. Ce qui est imprimé ne se thème pas.

**The Signal-Only Rule.** Les cinq teintes de statut ne sortent jamais de l'objet candidature. Aucune icône décorative, aucun titre de section, aucun graphique ne les emprunte.

**The Browser-Surface Rule.** Les surfaces que le navigateur dessine lui-même portent le système comme les autres : sélection de texte en sauge voile (`--secondary` / `--secondary-foreground`), curseur de saisie et contrôles natifs en sauge (`caret-color` et `accent-color` en `--primary`), ascenseur en filet (`scrollbar-color: var(--border) transparent`, `scrollbar-width: thin`), soulignement des liens décollé de `0.25em` sur 1 px d'épaisseur. C'est câblé une seule fois dans la base globale de l'application ; un écran ne redéfinit jamais sa propre couleur de sélection.

## Typography

**Display Font:** Instrument Sans (repli `ui-sans-serif`, `system-ui`)
**Body Font:** Instrument Sans (même famille, poids et taille font la hiérarchie)
**Label/Mono Font:** JetBrains Mono (repli `ui-monospace`)

**Character:** Une seule grotesque pour tout le produit, tendue de −0.02 em aux grandes tailles pour qu'elle cesse de s'étaler. Instrument Sans a des terminaisons droites et une hauteur d'x haute : elle reste dense en petit corps, ce dont un tableau de candidatures a besoin, et tient un titre sans devenir une police d'affichage. JetBrains Mono n'écrit jamais de phrase : elle marque les micro-libellés en capitales espacées, les clés d'API et les valeurs techniques de l'onglet Développeurs. Le contraste entre les deux est une différence de fonction, pas d'ambiance.

### Hierarchy

- **Display** (600, `clamp(2rem, 4.5vw, 3.25rem)`, 1.05, −0.02 em) : titre de première vue d'une page publique ou d'un accueil. Un seul par page.
- **Headline** (600, 1.5 rem / 24 px, 1.2, −0.02 em) : titre d'écran applicatif, titre de carte de CV principal.
- **Title** (600, 1 rem / 16 px, 1.35) : titre de carte, libellé de bouton, entrée de navigation, en-tête de colonne.
- **Body** (400, 0.875 rem / 14 px, 1.55) : texte courant, descriptions, contenu d'offre. Ligne mesurée entre 65 et 75 caractères dès qu'il s'agit de lecture suivie.
- **Label** (500, 0.6875 rem / 11 px, +0.06 em, capitales, JetBrains Mono) : sur-titres de section, « VERSION », « VIA LINKEDIN », unités.
- **Numeric** (500, 0.875 rem, `tabular-nums`) : scores, compteurs, quotas, dates, montants.

### Named Rules

**The Two Voices Rule.** Instrument Sans écrit tout ce qui se lit. JetBrains Mono ne sort qu'en capitales, à 11 px, sur des libellés de quelques mots. Une phrase en mono est une erreur.

**The Steady Number Rule.** Toute valeur susceptible de changer sans rechargement — score sur 100, compteur de lettres restantes, nombre de versions, vues de la vitrine — est en chiffres tabulaires. Un chiffre qui fait sauter sa ligne détruit la confiance dans le chiffre.

## Layout

Grille de 12 colonnes, gouttière de 24 px, conteneur applicatif à 1400 px maximum, conteneur de lecture à 720 px. Le rythme d'espacement est une progression de 4 px utilisée par paliers : 4, 8, 12, 16, 24, 32, 48, 64. Un écart intermédiaire non listé est un écart non décidé.

Structure applicative : barre latérale fixe de 260 px sur desktop (fond chrome, filet à droite), contenu à `32px` de padding horizontal, `48px` entre deux sections. Sous 1024 px la barre latérale disparaît au profit d'une barre basse de 4 entrées à 56 px de haut, et le contenu passe à `16px` de gouttière. La vitrine publique et la landing sont pensées mobile d'abord et n'héritent pas du conteneur applicatif.

Densité : une liste de candidatures tient des lignes de 56 px avec `12px` de padding vertical. Les cartes de CV, plus rares et plus précieuses, ont `20px` de padding interne et `16px` entre elles. La densité suit la fréquence de consultation, pas l'esthétique.

**The Air Rule.** Il y a plus d'espace au-dessus d'un titre qu'en dessous — rapport 2:1 (`32px` / `16px`). C'est ce qui rattache visuellement un titre à ce qu'il annonce.

## Elevation & Depth

Le système est **plat au repos**. La profondeur est portée par le filet de 1 px et par le décrochage de valeur entre le chrome et le papier, pas par l'ombre. L'ombre est un événement : elle apparaît quand un élément se soulève sous le curseur, quand un calque flotte réellement au-dessus de la page (menu, popover, dialogue, toast), ou quand une barre devient collante au défilement.

### Shadow Vocabulary

- **Repose** (`box-shadow: 0 1px 2px 0 hsl(168 18% 8% / 0.06)`, `shadow-xs`) : contrôles pleins — bouton, champ — pour les décoller d'un cheveu. Le seul usage d'ombre autorisé à l'état de repos.
- **Soulèvement** (`0 6px 16px -4px hsl(168 18% 8% / 0.12)`, `shadow-md`) : carte au survol, combinée à `translateY(-2px)` sur 180 ms.
- **Calque** (`0 12px 28px -8px hsl(168 18% 8% / 0.16)`, `shadow-lg`) : menu déroulant, popover, pilule de suggestion de relecture.
- **Modal** (`0 20px 48px -12px hsl(168 18% 8% / 0.18)`, `shadow-xl`) : dialogue, tiroir mobile.

### Named Rules

**The Flat-At-Rest Rule.** Une surface posée est plate. Si vous ajoutez une ombre à une carte au repos, vous avez probablement un problème de contraste de fond, pas un problème de profondeur : montez le filet, pas l'ombre.

**The Hairline-First Rule.** Un filet de 1 px en `--border` est tenté avant toute ombre et avant tout aplat de fond. Deux séparateurs adjacents (filet + changement de fond) sont un de trop.

## Shapes

Rayons doux, jamais ronds. Trois familles seulement : **contrôle** 10 px (`rounded-md` — bouton, champ, entrée de menu), **surface** 12 px (`rounded-lg` — carte, panneau, dialogue), **pilule** complète (statut, filtre, variable de lettre, avatar). Les conteneurs larges qui encadrent d'autres cartes montent à 16 px (`rounded-xl`) pour que l'emboîtement reste lisible.

Le document est l'exception de forme : une page de CV a un rayon de 8 px, un filet `--document-border`, et un ratio A4 strict. Elle ne prend jamais le rayon des cartes de l'interface, parce qu'elle n'est pas une carte de l'interface.

Pas de biseaux, pas de formes découpées en `clip-path`, pas de bordures en dégradé, pas d'angles asymétriques. La géométrie est ennuyeuse par décision ; c'est le contenu qui doit être intéressant.

## Components

### Buttons

- **Shape:** rectangle à angles doux (10 px), hauteur 36 px par défaut, 32 px en `sm`, 40 px en `lg`, icône carrée 36 px.
- **Primary:** aplat sauge, texte blanc, `0 16px` de padding horizontal, `shadow-xs`. Un seul par écran (*The One Pen Rule*).
- **Hover / Focus:** le fond descend d'environ 5 % de clarté en 180 ms `--ease-standard` ; le focus clavier affiche un anneau de 3 px en `--ring/50` plus une bordure `--ring`, jamais un contour navigateur par défaut.
- **Outline:** fond papier, filet 1 px, texte encre ; au survol, fond sauge voile et texte sauge. C'est l'action secondaire par défaut.
- **Ghost:** sans fond ni filet ; réservé aux actions de rangée et de barre d'outils, jamais à l'action principale d'un écran.
- **Destructive:** aplat rose, texte blanc, et toujours derrière une confirmation explicite ; une suppression achevée propose « Annuler » en toast pendant 8 s.

### Chips

- **Style:** pilule de 24 px, fond en teinte voilée du statut, texte en teinte pleine, pastille de 6 px à gauche, chiffres tabulaires.
- **State:** les filtres non sélectionnés sont un filet 1 px sur fond papier ; sélectionné, le filet devient encre de 1 px et le fond sauge voile. Pas de coche, pas de changement de taille.

### Cards / Containers

- **Corner Style:** 12 px.
- **Background:** papier, sur fond chrome quand la carte est dans une zone applicative.
- **Shadow Strategy:** aucune au repos ; *Soulèvement* au survol quand la carte est cliquable, rien quand elle ne l'est pas — l'ombre au survol est la promesse qu'il se passera quelque chose au clic.
- **Border:** filet 1 px `--border`.
- **Internal Padding:** 20 px ; 16 px sur mobile.

### Inputs / Fields

- **Style:** fond transparent, filet 1 px `--input`, rayon 10 px, hauteur 36 px, texte 14 px, `placeholder` en graphite.
- **Focus:** la bordure passe en `--ring` et un anneau de 3 px `--ring/50` s'ajoute. Pas de halo coloré, pas de changement de fond.
- **Error / Disabled:** `aria-invalid` porte la bordure et l'anneau en rose, avec le message sous le champ en 12 px rose — jamais uniquement la couleur. Désactivé : opacité 50 %, curseur interdit.

### Navigation

- **Style:** barre latérale sur fond chrome, entrées en `Title` 16 px, icône 20 px à `12px` du libellé, hauteur 36 px, rayon 8 px.
- **Default / Hover / Active:** repos en graphite ; survol en fond brume ; actif en fond sauge voile, texte et icône sauge, et un filet vertical de 2 px en sauge collé au bord gauche. Un seul élément actif à la fois.
- **Badge:** le compte d'actions à faire est une pilule sauge à droite du libellé, chiffres tabulaires, jamais un simple point rouge.
- **Mobile:** barre basse de 4 entrées, 56 px, icône 24 px surmontant un libellé 11 px ; l'état actif est la sauge sur l'icône et le libellé, sans fond.

### Score de vérification (signature)

Le score sur 100 d'une candidature est un composant à part, et c'est le seul endroit où une couleur change en fonction d'une valeur. Un arc de 120 px, filet de 6 px, fond du tracé en brume, remplissage en sauge, chiffre au centre en `Display` réduit à 2 rem, chiffres tabulaires. Le remplissage s'anime de 0 à la valeur en 600 ms `--ease-entrance`, et pas du tout quand *Réduire les animations* est actif. Sous l'arc, exactement trois actions, chacune avec son gain de points en `Label` mono et un bouton `outline` « Corriger ». Le score n'est jamais affiché seul : un chiffre sans action à côté n'est qu'un jugement.

### Page du document (signature)

Toute surface qui représente un CV, une lettre ou un aperçu de modèle rend une page en ratio A4, fond `--document`, texte `--document-ink`, filet `--document-border`, rayon 8 px, `shadow-sm` pour la poser sur la table. Elle ne reçoit ni le thème sombre, ni la couleur de marque, ni les polices de l'interface : sa typographie est celle du modèle choisi. C'est l'objet que le recruteur verra ; l'interface n'a pas le droit de le repeindre.

## Do's and Don'ts

### Do:

- **Do** poser la sauge sur une seule action par écran, et passer toutes les autres en `outline` ou `ghost`.
- **Do** laisser les surfaces dessinées par le navigateur — sélection, curseur, contrôles natifs, ascenseur, soulignement — hériter de la base globale ; ne jamais les redéfinir écran par écran.
- **Do** tenter un filet `--border` de 1 px avant d'envisager une ombre ou un aplat de fond.
- **Do** utiliser `--document*` pour toute page de CV ou de lettre, y compris en mode sombre.
- **Do** mettre en chiffres tabulaires toute valeur qui peut changer sans rechargement (`data-numeric` ou `font-variant-numeric: tabular-nums`).
- **Do** doubler chaque couleur de statut d'un texte : la pilule porte son libellé, la pastille ne suffit pas.
- **Do** garder les gouttières sur la progression 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64, et laisser deux fois plus d'air au-dessus d'un titre qu'en dessous.
- **Do** animer avec `--ease-standard` sur 180 ms pour un état, `--ease-entrance` sur 300–600 ms pour une apparition, et rien du tout sous `prefers-reduced-motion`.

### Don't:

- **Don't** utiliser `backdrop-filter`, de surface translucide, de fond d'ambiance flouté ou de « verre » de quelque épaisseur que ce soit — la direction verre du CDC v1 est abandonnée, pas atténuée.
- **Don't** peindre une surface en dégradé, ni un texte, ni une bordure. Les aplats sont pleins.
- **Don't** colorer une ombre. Toutes les ombres sont l'encre du système à faible opacité.
- **Don't** sortir les cinq teintes de statut de l'objet candidature, ni les réutiliser comme couleurs de graphique — les graphiques sont une rampe de sauge.
- **Don't** thémer, teinter ou inverser la page d'un CV.
- **Don't** écrire une phrase en JetBrains Mono, ni l'employer au-dessus de 12 px.
- **Don't** ajouter d'ombre à une carte au repos, ni de seconde ombre pour « renforcer » la première.
- **Don't** signaler une erreur par la seule couleur : un message en texte accompagne toujours `aria-invalid`.
- **Don't** introduire un rayon hors des trois familles (10 / 12 / pilule, 16 px pour les conteneurs emboîtants).
- **Don't** animer avec un rebond ou un élastique (`cubic-bezier` dont la sortie dépasse 1). Le système décélère, il ne rebondit pas : l'emphase passe par `--ease-emphasized`.
