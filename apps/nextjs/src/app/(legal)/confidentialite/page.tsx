import type { Metadata } from "next";
import Link from "next/link";

import type { LegalSection } from "../_components/legal-page";
import {
  LegalList,
  LegalPage,
  LegalParagraph,
  Todo,
} from "../_components/legal-page";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Aliko",
  description:
    "Quelles données Aliko collecte, pourquoi, combien de temps elle les conserve, et comment exercer vos droits.",
};

const UPDATED_AT = "4 octobre 2026";

function Mail(props: { address: string }) {
  return (
    <a
      href={`mailto:${props.address}`}
      className="text-foreground underline underline-offset-4"
    >
      {props.address}
    </a>
  );
}

const sections: LegalSection[] = [
  {
    id: "responsable",
    title: "Responsable du traitement",
    body: (
      <>
        <LegalParagraph>
          Le responsable du traitement est <Todo>raison sociale à compléter</Todo>,{" "}
          <Todo>adresse du siège</Todo>. Pour toute question relative à vos
          données : <Mail address="privacy@aliko.fr" />.
        </LegalParagraph>
        <LegalParagraph>
          Délégué à la protection des données : <Todo>nom ou « non désigné »</Todo>.
        </LegalParagraph>
      </>
    ),
  },
  {
    id: "principes",
    title: "Nos principes",
    body: (
      <LegalList
        items={[
          "Nous ne collectons que les données nécessaires au service, et rien de plus.",
          "Nous ne vendons ni ne louons vos données à quiconque.",
          "Vos CV, lettres et candidatures ne servent pas à entraîner des modèles d’intelligence artificielle.",
          "Aucune publicité ciblée n’est servie sur Aliko.",
        ]}
      />
    ),
  },
  {
    id: "donnees",
    title: "Données collectées",
    body: (
      <>
        <LegalParagraph>
          <strong className="font-medium">Compte.</strong> Nom, prénom, adresse
          e-mail, mot de passe chiffré ; ou, en cas de connexion via un
          fournisseur tiers, l’identifiant, le nom et l’adresse e-mail
          transmis par ce fournisseur.
        </LegalParagraph>
        <LegalParagraph>
          <strong className="font-medium">Contenus de candidature.</strong> CV
          importés, expériences, formations, compétences, lettres de
          motivation, offres d’emploi collées, statuts et notes de suivi. Ces
          contenus peuvent comporter des données sensibles si vous choisissez
          de les y inscrire — nous vous invitons à ne mentionner ni santé, ni
          appartenance syndicale, ni opinion politique ou religieuse.
        </LegalParagraph>
        <LegalParagraph>
          <strong className="font-medium">Usage et technique.</strong> Journaux
          de connexion, adresse IP, type d’appareil et de navigateur, pages
          consultées, horodatages, erreurs applicatives.
        </LegalParagraph>
        <LegalParagraph>
          <strong className="font-medium">Messagerie liée.</strong> Si vous
          reliez Telegram ou WhatsApp, l’identifiant du compte de messagerie et
          le contenu des messages que vous nous adressez pour mettre à jour
          votre CV.
        </LegalParagraph>
        <LegalParagraph>
          <strong className="font-medium">Facturation.</strong> Offre
          souscrite, historique de paiement, pays de facturation. Les numéros de
          carte sont traités par notre prestataire de paiement et ne transitent
          jamais par nos serveurs.
        </LegalParagraph>
      </>
    ),
  },
  {
    id: "finalites",
    title: "Finalités et bases légales",
    body: (
      <LegalList
        items={[
          "Fournir le service — création de compte, génération de CV et de lettres, suivi des candidatures : exécution du contrat.",
          "Facturer et gérer les abonnements : exécution du contrat et obligation légale comptable.",
          "Sécuriser le service — détection de fraude, d’abus et d’intrusion : intérêt légitime.",
          "Mesurer l’usage de façon agrégée pour améliorer le produit : intérêt légitime, avec opposition possible.",
          "Envoyer des informations de service (sécurité, changement de conditions) : exécution du contrat.",
          "Envoyer des messages commerciaux ou des nouveautés : consentement, révocable à tout moment.",
        ]}
      />
    ),
  },
  {
    id: "ia",
    title: "Traitement par des modèles d’IA",
    body: (
      <>
        <LegalParagraph>
          Pour adapter un CV à une offre ou rédiger une lettre, le contenu
          concerné est transmis à un fournisseur de modèles de langage{" "}
          <Todo>fournisseurs à lister</Todo>, agissant comme sous-traitant.
        </LegalParagraph>
        <LegalList
          items={[
            "La transmission n’a lieu qu’au moment où vous déclenchez une génération.",
            "Les contenus transmis ne sont pas utilisés pour entraîner les modèles du fournisseur.",
            "Aucune décision produisant un effet juridique n’est prise de façon automatisée : les textes proposés ne sont que des brouillons que vous validez.",
          ]}
        />
      </>
    ),
  },
  {
    id: "destinataires",
    title: "Destinataires et sous-traitants",
    body: (
      <>
        <LegalParagraph>
          Vos données ne sont accessibles qu’aux personnes de notre équipe qui
          en ont besoin, et aux sous-traitants suivants, liés par contrat :
        </LegalParagraph>
        <LegalList
          items={[
            <>
              Hébergement et base de données : <Todo>prestataire</Todo>
            </>,
            <>
              Modèles de langage : <Todo>prestataire</Todo>
            </>,
            <>
              Envoi d’e-mails transactionnels : <Todo>prestataire</Todo>
            </>,
            <>
              Paiement : <Todo>prestataire</Todo>
            </>,
            <>
              Mesure d’audience et supervision d’erreurs : <Todo>prestataire</Todo>
            </>,
          ]}
        />
        <LegalParagraph>
          Des données peuvent aussi être communiquées à une autorité lorsqu’une
          obligation légale l’impose.
        </LegalParagraph>
      </>
    ),
  },
  {
    id: "transferts",
    title: "Transferts hors Union européenne",
    body: (
      <LegalParagraph>
        Certains sous-traitants sont établis hors de l’Union européenne. Ces
        transferts reposent sur les clauses contractuelles types de la
        Commission européenne ou sur une décision d’adéquation. Le détail par
        prestataire est disponible sur demande à{" "}
        <Mail address="privacy@aliko.fr" />.
      </LegalParagraph>
    ),
  },
  {
    id: "conservation",
    title: "Durées de conservation",
    body: (
      <LegalList
        items={[
          "Compte et contenus de candidature : pendant toute la vie du compte, puis trente jours après sa fermeture.",
          "Sauvegardes chiffrées : au plus trente-cinq jours supplémentaires, le temps du cycle de rotation.",
          "Journaux de connexion et de sécurité : douze mois.",
          "Pièces comptables et factures : dix ans, conformément à l’obligation légale.",
          "Compte inactif sans aucune connexion pendant trois ans : avertissement par e-mail, puis suppression.",
        ]}
      />
    ),
  },
  {
    id: "securite",
    title: "Sécurité",
    body: (
      <>
        <LegalParagraph>
          Les échanges sont chiffrés en transit (TLS) et les données au repos
          sont chiffrées côté hébergeur. Les mots de passe sont stockés sous
          forme d’empreintes et ne sont jamais lisibles, y compris par nous.
          Les accès internes sont nominatifs et limités au nécessaire.
        </LegalParagraph>
        <LegalParagraph>
          En cas de violation de données susceptible d’engendrer un risque élevé
          pour vos droits, vous serez informé sans délai injustifié, comme
          l’autorité de contrôle compétente.
        </LegalParagraph>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies et traceurs",
    body: (
      <>
        <LegalParagraph>
          Aliko dépose les cookies strictement nécessaires à son
          fonctionnement : maintien de la session, préférence de thème,
          protection contre la falsification de requête. Ils ne requièrent pas
          de consentement.
        </LegalParagraph>
        <LegalParagraph>
          Les traceurs de mesure d’audience, le cas échéant, ne sont déposés
          qu’après votre accord et restent révocables à tout moment depuis vos
          paramètres.
        </LegalParagraph>
      </>
    ),
  },
  {
    id: "droits",
    title: "Vos droits",
    body: (
      <>
        <LegalParagraph>
          Vous disposez des droits d’accès, de rectification, d’effacement, de
          limitation, d’opposition et de portabilité, ainsi que du droit de
          retirer votre consentement et de définir des directives relatives au
          sort de vos données après votre décès.
        </LegalParagraph>
        <LegalParagraph>
          Exercez-les depuis vos paramètres — export et suppression sont
          disponibles en autonomie — ou en écrivant à{" "}
          <Mail address="privacy@aliko.fr" />. Nous répondons sous un mois.
        </LegalParagraph>
        <LegalParagraph>
          Si notre réponse ne vous satisfait pas, vous pouvez introduire une
          réclamation auprès de l’autorité de contrôle compétente{" "}
          <Todo>autorité à préciser</Todo>.
        </LegalParagraph>
      </>
    ),
  },
  {
    id: "mineurs",
    title: "Mineurs",
    body: (
      <LegalParagraph>
        Le service n’est pas destiné aux personnes de moins de 16 ans. Si nous
        apprenons qu’un compte a été ouvert par un mineur de moins de 16 ans
        sans autorisation, il est supprimé.
      </LegalParagraph>
    ),
  },
  {
    id: "modifications",
    title: "Modification de la politique",
    body: (
      <LegalParagraph>
        Cette politique peut évoluer. Toute modification substantielle est
        notifiée par e-mail avant son entrée en vigueur. Les{" "}
        <Link
          href="/conditions"
          className="text-foreground underline underline-offset-4"
        >
          conditions d’utilisation
        </Link>{" "}
        complètent le présent document.
      </LegalParagraph>
    ),
  },
];

export default function ConfidentialitePage() {
  return (
    <LegalPage
      eyebrow="Légal"
      title="Politique de confidentialité"
      updatedAt={UPDATED_AT}
      summary="Un CV dit presque tout d’une vie. Voici précisément ce que nous en faisons, avec qui nous le partageons, et comment l’effacer."
      sections={sections}
    />
  );
}
