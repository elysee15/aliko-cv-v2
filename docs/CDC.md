# Cahier des charges — Aliko CV

**Version :** 1.0 · **Date :** 2026-09-29
**Sources :** `docs/specs/01` à `13`, `docs/design/`, code existant (`apps/web`, `packages/db`).

---

## 1. Contexte et objectif

Aliko est une plateforme web qui réunit **le CV, les lettres de motivation et le suivi de candidatures au même endroit**, avec un différenciateur : **le CV se met à jour par simple message** (Telegram / WhatsApp).

Cible : candidats francophones en recherche d'emploi, plus une population secondaire de **créateurs de modèles** et de **relecteurs professionnels** (coachs carrière).

Promesse produit : *« Ton CV, tes lettres et tes candidatures au même endroit. Et ton CV se met à jour par simple message. »*

## 2. Périmètre fonctionnel

13 lots fonctionnels, numérotés comme les specs. Ordre de construction = ordre des dépendances.

| # | Lot | Dépend de | État |
|---|---|---|---|
| 01 | Charte v2 et coque applicative | – | à construire |
| 02 | Aliko Pro : offres, droits, quotas | 01 | à construire |
| 03 | CV principal et versions | 01, 02 | partiel (CV existant, pas la hiérarchie) |
| 04 | Accueil guidé et import LinkedIn | 03 | partiel (import ZIP existe) |
| 05 | Candidatures | 02, 03 | partiel (suivi simple existant) |
| 06 | Lettres | 02, 05, 09 | partiel (lettres isolées) |
| 07 | Ma vitrine | 02, 03, 09 | partiel (CV public + portfolio à fusionner) |
| 08 | Mises à jour par message | 02, 03 | partiel (Telegram à commandes) |
| 09 | Studio (créateur de modèles) | 01, 02, 03 | à construire |
| 10 | Modèles de la communauté | 09 | à construire |
| 11 | Relecture pro en temps réel | 02, 03 | à construire (commentaires simples existants) |
| 12 | Landing page et site public | 01, 02, 10, 11 | à construire |
| 13 | Paramètres | 01, 02 | partiel |

### 01 — Charte v2 et coque

Direction visuelle « verre façon Apple » + touche futuriste : matières de verre fin/épais, surfaces pleines, fond d'ambiance, palette sauge et encre, pastels en verres teintés. Instrument Sans (interface), JetBrains Mono (micro-libellés). Micro-interactions à ressort, avec respect strict de *Réduire les animations* et *Réduire la transparence*.

Coque : barre latérale desktop (Accueil, Candidatures, Mes CV, Lettres, Modèles, Ma vitrine ; en bas Relecture pro, Paramètres, compte) et barre basse mobile à 4 entrées (Accueil, Candidatures, CV, Plus). Badge d'actions à faire sur « Candidatures ». États globaux réutilisables : squelettes, erreur pleine page, erreur en ligne, toast de succès avec action. Thème clair et sombre.

**Invariant :** la page du CV reste toujours opaque et blanche, fidèle au PDF.

### 02 — Aliko Pro

Deux offres : **Gratuit** et **Aliko Pro** (9 €/mois ou 79 €/an). Un **module de droits** unique répond pour tout le produit à : « cet utilisateur peut-il faire X ? » et « combien lui reste-t-il de Y ? ».

| | Gratuit | Pro |
|---|---|---|
| CV principaux | 1 | Illimités |
| Versions pour une offre | 3 | Illimitées |
| Vérifications d'offre | 3 / mois | Illimitées |
| Lettres | 2 | Illimitées |
| Modèles | 3 de base + communauté gratuits | Tous |
| Studio | 1 modèle personnel, blocs gratuits | Illimité, tous blocs, polices importées |
| Ma vitrine | Lien de partage simple | Vitrine complète + identifiant personnalisé |
| Mises à jour par message | 1 canal | 2 canaux + rappels |
| Postuler en un clic | Non | Oui |
| Développeurs | Lecture seule | Lecture/écriture + webhooks |
| Relecture pro | Prix normal | −15 % |

Règles : le parcours complet reste faisable en gratuit ; aucun blocage sans explication ni sortie « Plus tard » ; à la fin d'un abonnement rien n'est supprimé, le surplus passe en lecture seule. Écrans : comparatif, paiement carte (récapitulatif TTC), bienvenue Pro, gestion d'abonnement et factures.

### 03 — CV principal et versions

- **CV principal** : un par métier, source de contenu.
- **Version** : copie d'un CV principal adaptée à une offre, créée depuis une candidature. La modifier n'altère jamais le principal.

Écran « Mes CV » : grande carte par CV principal, versions empilées dessous (nombre de versions, dernière modification, lien de partage). Version : origine + candidature liée, duplication, renommage, suppression avec confirmation et toast « Annuler », mise à jour depuis le principal par sections choisies. Nom par défaut « Version pour &lt;entreprise&gt; ».

Éditeur (formulaire + aperçu direct) : nouveau bloc **En-tête** avec titre du poste et accroche (300 caractères, compteur). Indicateur « Enregistré » après chaque modification.

### 04 — Accueil guidé et import LinkedIn

Accueil adaptatif :
- **nouvel utilisateur** : carte « Ta mise en route » en 4 étapes (Créer ton CV → Obtenir ton lien de partage → Mettre à jour par message → Envoyer ta première candidature), une seule active, validation automatique, étapes passables, disparition une fois terminée ;
- **utilisateur actif** : bloc « Prochaine action » (ex. « Relancer Acme ») puis candidatures en cours.

**Import LinkedIn en 3 étapes** : demander l'export (instructions précises + lien direct), attendre l'email (jusqu'à 24 h, « Me le rappeler plus tard » + email de rappel J+1 + carte de reprise sur l'Accueil), déposer le ZIP (glisser-déposer, progression, erreurs explicites : mauvais fichier, trop gros, abîmé). Puis **vérification** : sections trouvées avec compteurs, décochage, aperçu avant création. Les données importées sont marquées « via LinkedIn » quelques jours.

### 05 — Candidatures

La **candidature** est l'objet central : offre (texte, lien, poste, entreprise, lieu, contrat), version de CV, résultat de vérification, lettre, statut, suivi.

- **Création en 2 étapes** : coller l'offre (texte ou lien, repli sur le texte si le lien est illisible — LinkedIn/Indeed bloquent souvent), puis choisir le CV (principal présélectionné). Extraction automatique poste/entreprise/lieu/contrat, corrigeable.
- **Vérification** : score sur 100 + 3 actions concrètes avec gain de points, « Corriger » renvoie à la bonne section du CV. Enchaînements : « Créer une version pour Acme », « Écrire la lettre ». Relance possible après modification.
- **Statuts** : À envoyer, Envoyée, Entretien, Offre, Refus. Vue liste (défaut) et vue tableau par statut avec glisser-déposer, filtres et recherche, archivage.
- **Règle d'affichage** : score et « 3 actions » uniquement pour « À envoyer ». Sinon étape suivante : Relancer (envoyée depuis > 7 jours sans réponse), Préparer l'entretien, Répondre.
- **Espace candidature** : offre, CV utilisé, lettre, frise de suivi + notes, bouton principal contextuel.

### 06 — Lettres

Deux objets dans deux onglets :
- **Modèles de lettre** : textes réutilisables avec variables `{entreprise}`, `{poste}`… insérées en pilules ;
- **Lettres** : liées à une candidature, variables déjà résolues, texte normal éditable.

Création : choisir la candidature, puis modèle ou page blanche (aperçu du remplissage, alerte si une variable est irrésolue). En-tête repris du profil. Mise en forme simple (gras, italique, paragraphes), « Enregistrée » automatique, Copier, PDF avec la police et la couleur du CV. Enregistrer une lettre comme nouveau modèle. Recherche, renommage, suppression. Compteur de lettres restantes en gratuit. « Postuler en un clic » joint la lettre liée.

### 07 — Ma vitrine

Fusion du CV public et du portfolio en **une seule page publique** `aliko.fr/<identifiant>`.

Réglages : interrupteur « Vitrine en ligne » (hors ligne → page « profil privé », pas une erreur) ; « Basée sur : CV principal · &lt;métier&gt; » modifiable ; « Ce qui est visible » (photo, accroche, expériences, formation, compétences, certifications, langues, bouton PDF, coordonnées) avec **email et téléphone masqués par défaut** ; aperçu direct, dont aperçu mobile. Compteur de vues.

Gratuit : identifiant généré, un CV principal. Pro : identifiant choisi (contrôle d'unicité, redirection temporaire de l'ancien), plusieurs CV principaux, section projets avec images.

### 08 — Mises à jour par message (Telegram + WhatsApp)

Le candidat écrit à Aliko **en langage naturel** (« Ajoute certif AWS Solutions Architect, décembre 2024 »). Aliko répond par un **récapitulatif** avec **Confirmer / Modifier / Annuler**, puis applique. Il demande « Sur quel CV ? » si nécessaire, propose un mini-formulaire pour une expérience complète, refuse poliment le hors-sujet.

Côté web : chaque changement reçu est signalé dans l'éditeur, consigné dans un **journal**, et **annulable**.

Connexion : QR code sur ordinateur, bouton sur mobile, code valable 10 minutes, case d'accord explicite pour WhatsApp. Gratuit : 1 canal. Pro : 2 canaux + rappels de candidatures.

### 09 — Studio (créateur de modèles)

Outil séparé, plein écran, façon Webflow, pour concevoir **modèles** et **blocs** réutilisables. Il ne contient jamais de contenu saisi à la main : les textes sont **liés à des champs du CV**, les sections répétées sont des **répéteurs**.

Trois panneaux : Ajouter / Calques / Communauté à gauche, **page A4** au centre, **Style** à droite (disposition, espacement, taille, typographie, fond et bordure, données). Styles globaux du modèle (accent, polices, tailles, espacement). Aperçus : données d'exemple, mon CV principal, contenu long (test de débordement). Panneau **Lisibilité robots** (ATS). Publication pour soi ou pour la communauté.

**Moteur de rendu** (document de modèle → HTML/CSS → PDF) : livrable indépendant, prérequis des lots 06 (PDF des lettres) et 07 (vitrine).

### 10 — Modèles de la communauté

Rubrique **Modèles** dans la navigation + version publique `/modeles` sans compte.
- **Galerie** : onglets Tous / Par Aliko / Communauté / Mes modèles ; filtres (métier, style, compatible robots, gratuit) ; tris (populaires, récents, mieux notés).
- **Fiche modèle** : grand aperçu **avec mes propres données**, auteur, note et avis, compatibilité robots, couleurs ; « Utiliser », « Enregistrer », « Signaler ».
- **Page auteur**, **Mes modèles** (Privé / En revue / Publié / À corriger + statistiques).
- **Modération** par l'équipe Aliko avant publication (données personnelles, contenu inapproprié).

### 11 — Relecture pro en temps réel

Relecture sur la plateforme, en temps réel façon Figma. **Règle clé : le relecteur ne modifie jamais le CV directement** — il commente et suggère, le candidat accepte ou refuse.

- Deux formules : **Relecture écrite** (retours sous 24–72 h) et **Session en direct** (30 ou 45 min sur créneau).
- **Espace de relecture** : éditeur habituel + présence (avatars, curseurs nommés, sélections colorées), commentaires ancrés (épingles numérotées, fils, résolution), mode suggestion (barré/souligné, Accepter / Refuser / Tout accepter).
- **Fin de relecture** : synthèse, suggestions à traiter, note du candidat.
- **Espace relecteur** : Tableau de bord, Demandes, Agenda, Revenus, Mon profil, parcours « Devenir relecteur ». Réservation et paiement inclus (−15 % pour les abonnés Pro).

### 12 — Landing page et site public

Charte v2, clair et sombre, desktop et mobile. Sections : navigation collante, hero (deux CTA + visuel en couches), bande de chiffres, « Comment ça marche » en 4 étapes, fonctionnalités (candidatures, messagerie, Studio, relecture en direct, vitrine), aperçu de la marketplace de modèles, relecteurs, témoignages, tarifs, FAQ, appel final, pied de page complet. Visuels = captures stylisées de la vraie interface. SEO et partage social traités.

### 13 — Paramètres

Sous-navigation : **Compte**, **Messages**, **Abonnement**, **Développeurs**, **Mes données**.

- **Compte** : photo, prénom, nom, email, mot de passe, langue, thème (clair / sombre / automatique), « Réduire la transparence ».
- **Messages** : écran du lot 08. **Abonnement** : écran du lot 02.
- **Développeurs** (seul endroit au vocabulaire technique) : clés API (portées « Lecture » / « Lecture et écriture », format `ak_…`), webhooks (événements réels du code), export JSON, lien vers la documentation.
- **Mes données** : téléchargement de toutes les données ; suppression du compte avec confirmation par email tapé, en annonçant ce qui est déconnecté (messageries) et révoqué (clés API).

## 3. Exigences transverses

- **Droits** : tout écran qui limite une action passe par le module de droits du lot 02, jamais par une règle locale.
- **Accessibilité** : navigation clavier, contrastes, respect de *Réduire les animations* et *Réduire la transparence*.
- **Responsive** : desktop et mobile pour chaque écran ; vitrine et landing pensées mobile d'abord.
- **États** : chaque écran fournit squelette de chargement, erreur (avec « Réessayer ») et succès.
- **Langue** : interface en français ; vocabulaire technique cantonné à l'onglet Développeurs.
- **Confidentialité** : coordonnées masquées par défaut en public ; export et suppression de compte complets (RGPD) ; bandeau de consentement cookies.
- **Sécurité** : authentification Better Auth (email/mot de passe, réinitialisation), clés API à portées, webhooks signés, durcissement des routes API.

## 4. Socle technique

| Couche | Choix |
|---|---|
| Runtime | Bun 1.2+ |
| Monorepo | Turborepo + workspaces Bun |
| Framework | Next.js 16 (App Router, Turbopack) |
| Auth | Better Auth |
| Base de données | PostgreSQL via Drizzle ORM |
| UI | Tailwind CSS 4, shadcn/ui, Base UI |
| Validation | Zod 4 + React Hook Form, next-safe-action |
| Qualité | ESLint 9 (+ `eslint-plugin-drizzle`), Prettier |

Structure : `apps/web` (application), `packages/auth`, `packages/db`, `packages/ui`, `packages/eslint-config`, `packages/typescript-config`.

Domaines en base aujourd'hui : `user` / `session` / `account` / `verification`, `resume` / `resumeSection` / `resumeEntry`, `jobApplication`, `coverLetter`, `sectionComment`, `portfolioSettings`, `telegramLink` / `telegramLinkToken`, `apiKey`, `webhook` (+ tables WhatsApp en cours de migration).

## 5. Hors périmètre v1

- Applications mobiles natives.
- Candidature automatique sur les sites d'emploi tiers au-delà de « Postuler en un clic ».
- Place de marché de relecteurs ouverte sans validation manuelle.
- Internationalisation au-delà du français.
