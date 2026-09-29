---
version: 1
slug: "apps-nextjs-src-app-auth"
primary_target: "apps/nextjs/src/app/(auth)"
related_targets: []
---

# Surface: entrée du produit — Connexion / Inscription

Scope: `apps/nextjs/src/app/(auth)` — routes `/login` et `/register`, plus leur shell partagé.
Visitor mode: **Operate**. Le visiteur vient entrer, pas se laisser convaincre.

## Audience & task

Candidat francophone qui revient sur Aliko, ou qui ouvre un compte pour la première fois. Tâche : passer la porte en moins de dix secondes. Aucune démonstration produit sur cette surface : la persuasion a déjà eu lieu ailleurs.

Méthodes retenues par l'utilisateur : **e-mail + mot de passe, plus Google**. Périmètre : **connexion et inscription** ; « mot de passe oublié » est un lien qui pointe vers une route non encore construite.

## Constraints

- **Statique par décision de l'utilisateur : aucune logique.** Pas d'appel Better Auth, pas de `useState`, pas de server action, pas de validation. Les deux pages sont des composants serveur sans état. Le câblage (Better Auth `emailAndPassword`, provider Google, `bun run auth:generate`, `db:push`) reste à faire et n'appartient pas à ce lot.
- Langue d'interface : **français**.
- Le monde visuel est arrêté par DESIGN.md et n'est pas rouvert ici. Aucun jeton, aucune police, aucun composant de `packages/ui` n'est modifié pour cette surface.
- Les champs sont construits avec les composants Field de `@aliko/ui/field` (exigence explicite de la demande).

## Direction contract

THESIS: L'entrée d'Aliko est **une fiche à intercalaires**, pas deux pages jumelles. Connexion et Inscription sont deux onglets d'un même carton posé sur la table ; le visiteur voit l'autre porte sans avoir à la chercher, et ne perd jamais le repère du carton en changeant d'onglet. Refuse l'arrangement par défaut de la catégorie : la carte centrée isolée dont l'autre route est un lien gris en pied de page, et le panneau marketing pleine hauteur qui vend un produit que le visiteur a déjà choisi.

OWN-WORLD: La table de travail de DESIGN.md, sans écart. Fond `--sidebar` (chrome) pour la table, fiche en `--card` (papier) posée dessus, filet 1 px `--border` avant toute ombre, rayon 12 px sur la fiche et 10 px sur les contrôles. Une seule voix sauge, sur le bouton de soumission et l'anneau de focus — le segment d'onglets reste encre sur papier. Instrument Sans pour tout ce qui se lit ; JetBrains Mono en capitales 11 px uniquement pour la marque de la barre haute. Aucune translucidité, aucun dégradé, aucune ombre colorée.

STORY: Le visiteur comprend en un regard qu'il est chez Aliko, qu'il y a exactement deux portes, et laquelle est ouverte. Il croit que le produit est tenu parce que la page est calme et que rien n'y est décoratif. Il agit : Google en un clic, ou e-mail et mot de passe puis le seul bouton plein de l'écran.

FIRST VIEWPORT: Barre haute de 56 px, filet en bas, fond papier : marque « ALIKO » à gauche en mono 11 px capitales espacées, rien à droite. Sous elle, la table en `--sidebar` occupe toute la hauteur restante, la fiche centrée horizontalement et posée à 96 px du haut sur desktop, 32 px sur mobile — jamais centrée verticalement. Fiche : 420 px de large, papier, filet 1 px, rayon 12 px, padding 24 px, aucune ombre au repos. De haut en bas : le segment d'onglets pleine largeur (conteneur `--muted` en pilule, filet 1 px, deux liens de 32 px, l'actif en plaque papier avec `shadow-xs` et texte encre, l'inactif en graphite) ; 24 px ; le titre en Headline 24 px et sa ligne d'aide en 14 px graphite ; 24 px ; le bouton Google en `outline` pleine largeur, 40 px, logo G quatre couleurs 16 px ; `FieldSeparator` portant « ou » ; le `FieldGroup` (Inscription : Nom complet, E-mail, Mot de passe ; Connexion : E-mail avec `autoComplete`, Mot de passe dont le `FieldLabel` porte à droite le lien « Mot de passe oublié ? ») ; le bouton sauge pleine largeur, 40 px, **seul aplat sauge de l'écran**. Sous la fiche, 24 px plus bas et hors du carton, la seule ligne restante est la mention légale en 12 px graphite : le segment d'onglets est déjà la bascule entre les deux portes, et une phrase « pas encore de compte ? » sous la fiche doublerait le contrôle qui la surmonte. Rien d'autre sur la table.

FORM: « Le classeur à onglets » — candidat 4 de ma liste ordonnée de sept (1 la table à deux plans, 2 le guichet, 3 la feuille posée, 4 le classeur à onglets, 5 la colonne de lecture, 6 l'établi, 7 la fiche cartonnée). Tirage : indices 3, 1, 4 ; l'utilisateur a verrouillé le 4. Seed key **d4c3ea61**, scope surface, mode operate. Chemin de build : **code-led** (aucune génération d'image disponible sur cette machine — ni outil harness, ni `OPENAI_API_KEY`), donc aucun comp n'est dû et l'ambition tient dans ce bloc et dans la signature ci-dessous.

SIGNATURE INTERACTION & MOTION: **« Le tirage de l'intercalaire »**, un seul moment orchestré, en CSS pur, joué à chaque arrivée sur une des deux routes. La plaque de l'onglet actif s'ouvre depuis 88 % de sa largeur jusqu'à 100 % en 280 ms `--ease-emphasized` pendant que son texte passe de graphite à encre ; la fiche monte de 8 px et passe de 0 à 1 en 320 ms `--ease-entrance` ; les rangées du formulaire — bouton Google, filet « ou », puis chaque `Field` — suivent en cascade de 6 px avec 40 ms d'écart, même courbe. La phrase de bascule sous la fiche arrive en dernier. Aucun rebond, aucune élasticité. Sous `prefers-reduced-motion: reduce` la règle globale de `styles.css` ramène tout à 0,01 ms : la page est alors complète et immobile dès la première frame, jamais vide. Hors de ce moment, seuls les états standard bougent : 180 ms `--ease-standard` sur survol et focus.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved

- Route `/mot-de-passe-oublie` : lien présent, page non construite (hors périmètre choisi).
- Le câblage Better Auth (e-mail/mot de passe + Google) et la redirection après connexion.
- Le nom « Aliko » n'est pas verrouillé (PRODUCT.md) : la marque de la barre haute changera avec lui.
