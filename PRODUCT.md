# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Candidats francophones en recherche d'emploi. Situation : ils jonglent aujourd'hui entre un fichier CV, des lettres éparpillées et un tableur de suivi. Leur travail : adapter un CV à une offre précise, écrire la lettre qui va avec, envoyer, puis suivre où en est chaque candidature.

Deux audiences secondaires apparaissent dans le périmètre envisagé, non encore confirmées comme prioritaires :
- **créateurs de modèles** — conçoivent des gabarits de CV réutilisables et les publient ;
- **relecteurs professionnels** (coachs carrière) — relisent et commentent les CV des candidats contre rémunération.

## Product Purpose

Réunir CV, lettres de motivation et suivi de candidatures dans un seul produit, au lieu de trois outils désarticulés. Succès = un candidat crée un CV, en dérive une version ciblée pour une offre, produit la lettre associée et suit l'issue, sans quitter Aliko ni ressaisir ses données.

## Positioning

Différenciateur revendiqué : **le CV se met à jour par simple message** (Telegram / WhatsApp, en langage naturel, avec récapitulatif et confirmation avant application). Les concurrents traitent le CV comme un document qu'on ouvre ; Aliko le traite comme une donnée vivante qu'on modifie depuis sa messagerie.

Second axe : la **version de CV rattachée à une candidature** — la modification d'une version n'altère jamais le CV principal.

## Operating Context

- Le candidat part d'une **offre d'emploi** collée en texte ou en lien. LinkedIn et Indeed bloquent souvent la lecture des liens : le repli sur le texte collé est un fait d'exploitation, pas un cas limite.
- L'import du profil existant passe par **l'export LinkedIn**, qui arrive par email et peut prendre jusqu'à 24 h — le parcours doit survivre à cette attente asynchrone.
- Objets produits : CV principal, version de CV, candidature, lettre, modèle de lettre, modèle de CV, vitrine publique.
- Le **PDF** reste le livrable final envoyé aux recruteurs ; la fidélité écran → PDF est une contrainte d'usage.
- Statuts de candidature envisagés : À envoyer, Envoyée, Entretien, Offre, Refus.

## Capabilities and Constraints

**Socle technique (existant, confirmé par le dépôt)** — monorepo Turborepo `create-t3-turbo`, Bun 1.3.9, Next.js 16 App Router, tRPC v11, Better Auth, Drizzle + PostgreSQL, Tailwind CSS 4, shadcn/ui. Voir `CLAUDE.md`.

**Périmètre applicatif confirmé** — `apps/nextjs` est la seule application du produit. `apps/tanstack-start` et `apps/expo` sont des restes du scaffold, hors périmètre. Les composants partagés vivent dans `packages/ui`, les tokens dans `@aliko/tailwind-config/theme`.

**Contraintes transverses issues du cahier des charges** (voir *Evidence on Hand*, statut : point de départ) :
- tout écran qui limite une action interroge un **module de droits** unique, jamais une règle locale ;
- chaque écran fournit squelette de chargement, état d'erreur avec « Réessayer », et confirmation de succès ;
- thème clair et sombre ; desktop et mobile pour chaque écran ;
- coordonnées (email, téléphone) **masquées par défaut** sur toute surface publique ; export et suppression de compte complets (RGPD) ;
- vocabulaire technique cantonné à l'onglet Développeurs.

**Explicitement non décidé à ce stade :**
- le nom **Aliko** et le domaine **aliko.fr** ne sont pas verrouillés ;
- la tarification (l'hypothèse de travail est Gratuit + Pro à 9 €/mois ou 79 €/an) n'est pas verrouillée, ni les quotas associés ;
- le **français comme unique langue d'interface** est une hypothèse de travail, pas un engagement ;
- le détail des 13 lots fonctionnels reste susceptible de changer lot par lot.

## Evidence on Hand

- **`docs/CDC.md`** — cahier des charges v1.0 (2026-09-29), 13 lots fonctionnels, exigences transverses, socle technique. Statut confirmé par l'utilisateur : **point de départ, rien de contraignant**. À lire pour la substance fonctionnelle, à ne pas citer comme engagement.
- **Dépôt `apps/nextjs`** — scaffold `create-t3-turbo` intact (une page de démo `posts` + `auth-showcase`). Aucun écran Aliko n'existe encore. Il n'y a pas de monde visuel incumbent à préserver.
- **Projet v1 `../aliko-cv`** (code + 16 maquettes `docs/design/*.dc.html` + audit UX) — **écarté par décision de l'utilisateur**. Ne pas porter son code, ses maquettes ni sa direction visuelle.

**Absences à ne pas combler par invention :** aucun client, témoignage, chiffre d'usage, benchmark, logo, charte, police sous licence ni capture produit réelle n'existe aujourd'hui. Aucune donnée de marché. Toute preuve sociale affichée devra être marquée comme fictive tant que le réel n'existe pas.

## Product Principles

1. **Un seul endroit.** Toute fonctionnalité qui renverrait le candidat vers un outil externe pour finir son travail a échoué.
2. **La donnée vit, le document se dérive.** Le CV est une source de contenu ; versions, lettres, vitrine et PDF en sont des rendus, jamais des copies à entretenir à la main.
3. **Rien ne se perd, rien ne bloque sèchement.** Une limite d'offre explique et propose une sortie ; une fin d'abonnement met en lecture seule au lieu de supprimer ; une suppression offre « Annuler ».
4. **Le parcours survit à l'attente.** Import LinkedIn, relecture, réponse d'un recruteur : le produit assume des délais de plusieurs heures à plusieurs jours sans casser le fil.
5. **Le candidat garde la main.** Ni le relecteur ni l'automatisation par message n'écrivent dans le CV sans confirmation explicite.

## Accessibility & Inclusion

Exigences produit établies : navigation clavier complète, contrastes conformes, et respect strict des préférences système **Réduire les animations** et **Réduire la transparence** — cette dernière étant une contrainte réelle dès lors qu'une direction visuelle emploierait des matières translucides.
