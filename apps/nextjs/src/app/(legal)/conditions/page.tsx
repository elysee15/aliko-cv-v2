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
  title: "Conditions générales d’utilisation — Aliko",
  description:
    "Les règles d’usage du service Aliko : compte, contenus, abonnement, responsabilités et résiliation.",
};

const UPDATED_AT = "4 octobre 2026";

function Mail() {
  return (
    <a
      href="mailto:contact@aliko.fr"
      className="text-foreground underline underline-offset-4"
    >
      contact@aliko.fr
    </a>
  );
}

const sections: LegalSection[] = [
  {
    id: "objet",
    title: "Objet et acceptation",
    body: (
      <>
        <LegalParagraph>
          Les présentes conditions générales d’utilisation (les « Conditions »)
          régissent l’accès au service Aliko et son utilisation. Aliko est un
          service en ligne qui permet de créer et d’adapter des CV, de rédiger
          des lettres de motivation et de suivre des candidatures.
        </LegalParagraph>
        <LegalParagraph>
          Créer un compte, se connecter ou utiliser le service vaut acceptation
          sans réserve des Conditions. Qui ne les accepte pas ne doit pas
          utiliser Aliko.
        </LegalParagraph>
      </>
    ),
  },
  {
    id: "editeur",
    title: "Éditeur et hébergement",
    body: (
      <>
        <LegalParagraph>
          Le service est édité par <Todo>raison sociale à compléter</Todo>,{" "}
          <Todo>forme juridique</Todo> au capital de <Todo>montant</Todo>, dont
          le siège est situé <Todo>adresse</Todo>, immatriculée sous le numéro{" "}
          <Todo>SIREN / RCCM</Todo>. Directeur de la publication :{" "}
          <Todo>nom</Todo>. Contact : <Mail />.
        </LegalParagraph>
        <LegalParagraph>
          L’hébergement de l’application et des données est assuré par{" "}
          <Todo>hébergeur et région</Todo>.
        </LegalParagraph>
      </>
    ),
  },
  {
    id: "compte",
    title: "Compte et accès",
    body: (
      <>
        <LegalParagraph>
          L’ouverture d’un compte suppose d’avoir au moins 16 ans et de fournir
          des informations exactes. Un compte est personnel : il ne se partage
          ni ne se cède.
        </LegalParagraph>
        <LegalList
          items={[
            "Vous êtes responsable de la confidentialité de vos identifiants et de toute action menée depuis votre compte.",
            "Toute utilisation non autorisée doit nous être signalée sans délai.",
            "Nous pouvons suspendre un compte en cas de soupçon sérieux de fraude, d’usurpation ou d’atteinte à la sécurité du service.",
          ]}
        />
      </>
    ),
  },
  {
    id: "service",
    title: "Description du service",
    body: (
      <>
        <LegalParagraph>
          Aliko réunit l’importation et la structuration d’un CV, son adaptation
          à une offre d’emploi, la rédaction de lettres de motivation et le
          suivi de l’issue de chaque candidature. Certaines fonctionnalités
          permettent de mettre à jour un CV depuis une messagerie tierce
          (Telegram, WhatsApp) ; leur disponibilité dépend de ces services, sur
          lesquels nous n’avons aucun contrôle.
        </LegalParagraph>
        <LegalParagraph>
          Le service évolue : des fonctionnalités peuvent être ajoutées,
          modifiées ou retirées. Une suppression significative d’une
          fonctionnalité incluse dans un abonnement payant est annoncée par
          e-mail avant sa prise d’effet.
        </LegalParagraph>
      </>
    ),
  },
  {
    id: "contenus",
    title: "Vos contenus",
    body: (
      <>
        <LegalParagraph>
          Vous restez propriétaire de tout ce que vous déposez sur Aliko : CV,
          parcours, lettres, offres, notes de suivi. Nous n’en revendiquons
          aucun droit de propriété.
        </LegalParagraph>
        <LegalParagraph>
          Vous nous accordez uniquement la licence nécessaire à l’exploitation
          du service : héberger, afficher, traiter et transmettre vos contenus
          pour vous rendre le service demandé. Cette licence est non exclusive,
          sans droit de sous-licence autre que nos sous-traitants techniques, et
          prend fin avec la suppression des contenus concernés.
        </LegalParagraph>
        <LegalParagraph>
          Vos contenus ne sont pas utilisés pour entraîner des modèles
          d’intelligence artificielle.
        </LegalParagraph>
      </>
    ),
  },
  {
    id: "ia",
    title: "Contenus générés automatiquement",
    body: (
      <>
        <LegalParagraph>
          Les CV ciblés et les lettres proposés par Aliko sont produits par des
          modèles de langage à partir des informations que vous fournissez. Ces
          textes sont des propositions : ils peuvent contenir des erreurs, des
          approximations ou des formulations inadaptées.
        </LegalParagraph>
        <LegalList
          items={[
            "Vous relisez et validez tout document avant de l’envoyer à un employeur.",
            "Vous demeurez seul responsable de l’exactitude des informations présentées dans vos candidatures.",
            "Aliko ne garantit aucun résultat : ni entretien, ni réponse, ni embauche.",
          ]}
        />
      </>
    ),
  },
  {
    id: "usage",
    title: "Usages interdits",
    body: (
      <>
        <LegalParagraph>
          Il est interdit d’utiliser Aliko pour :
        </LegalParagraph>
        <LegalList
          items={[
            "produire des candidatures mensongères, usurper une identité ou se prévaloir de diplômes, d’expériences ou de qualifications que l’on n’a pas ;",
            "déposer des contenus illicites, diffamatoires, haineux ou portant atteinte aux droits d’un tiers ;",
            "contourner les limites d’usage, sonder la sécurité du service, en extraire les données de façon automatisée ou le revendre sans accord écrit ;",
            "perturber le fonctionnement du service ou l’accès des autres utilisateurs.",
          ]}
        />
        <LegalParagraph>
          Un manquement peut entraîner la suspension immédiate du compte, puis
          sa résiliation si le manquement persiste.
        </LegalParagraph>
      </>
    ),
  },
  {
    id: "abonnement",
    title: "Offres, abonnement et paiement",
    body: (
      <>
        <LegalParagraph>
          Une offre gratuite donne accès à un nombre limité de candidatures,
          sans carte bancaire. Les offres payantes sont décrites, avec leurs
          prix toutes taxes comprises, sur la page des tarifs au moment de la
          souscription.
        </LegalParagraph>
        <LegalList
          items={[
            "L’abonnement est reconduit automatiquement à chaque échéance jusqu’à résiliation.",
            "La résiliation prend effet à la fin de la période en cours ; les sommes déjà réglées pour cette période ne sont pas remboursées au prorata.",
            "Une modification tarifaire est annoncée au moins trente jours à l’avance et ne s’applique qu’aux échéances suivantes.",
            "Un défaut de paiement suspend l’accès aux fonctionnalités payantes.",
          ]}
        />
        <LegalParagraph>
          Conformément au droit de la consommation, vous disposez d’un délai de
          rétractation de quatorze jours à compter de la souscription. En
          demandant l’exécution immédiate du service, vous acceptez que ce
          délai puisse être perdu une fois le service pleinement fourni.
        </LegalParagraph>
      </>
    ),
  },
  {
    id: "propriete",
    title: "Propriété intellectuelle d’Aliko",
    body: (
      <LegalParagraph>
        Le service, sa marque, ses interfaces, ses modèles de documents et son
        code demeurent la propriété exclusive de l’éditeur. Les Conditions ne
        vous confèrent qu’un droit d’usage personnel, non exclusif et non
        transférable, limité à la durée de votre compte.
      </LegalParagraph>
    ),
  },
  {
    id: "disponibilite",
    title: "Disponibilité et responsabilité",
    body: (
      <>
        <LegalParagraph>
          Le service est fourni en l’état, sans garantie de disponibilité
          ininterrompue. Des interruptions peuvent survenir pour maintenance,
          mise à jour ou cause extérieure ; les maintenances programmées sont
          annoncées lorsque c’est possible.
        </LegalParagraph>
        <LegalParagraph>
          Notre responsabilité ne peut être engagée pour les dommages indirects,
          notamment une perte de chance, une opportunité d’emploi manquée ou un
          préjudice d’image. Dans tous les cas, notre responsabilité totale est
          plafonnée aux sommes que vous avez versées au titre des douze derniers
          mois. Rien dans les Conditions n’écarte la responsabilité qui ne peut
          l’être en droit.
        </LegalParagraph>
      </>
    ),
  },
  {
    id: "donnees",
    title: "Données personnelles",
    body: (
      <LegalParagraph>
        Le traitement de vos données est décrit dans la{" "}
        <Link
          href="/confidentialite"
          className="text-foreground underline underline-offset-4"
        >
          politique de confidentialité
        </Link>
        , qui fait partie intégrante des Conditions.
      </LegalParagraph>
    ),
  },
  {
    id: "resiliation",
    title: "Résiliation",
    body: (
      <>
        <LegalParagraph>
          Vous pouvez fermer votre compte à tout moment depuis vos paramètres ou
          en écrivant à <Mail />. Nous pouvons résilier un compte en cas de
          manquement grave aux Conditions, après mise en demeure restée sans
          effet pendant quinze jours, sauf urgence de sécurité.
        </LegalParagraph>
        <LegalParagraph>
          À la fermeture, vos documents restent exportables pendant trente
          jours, puis sont supprimés dans les conditions prévues par la
          politique de confidentialité.
        </LegalParagraph>
      </>
    ),
  },
  {
    id: "modifications",
    title: "Modification des Conditions",
    body: (
      <LegalParagraph>
        Les Conditions peuvent être modifiées. Toute modification substantielle
        est notifiée par e-mail au moins trente jours avant son entrée en
        vigueur. Continuer à utiliser le service après cette date vaut
        acceptation ; à défaut, vous pouvez résilier sans frais.
      </LegalParagraph>
    ),
  },
  {
    id: "droit",
    title: "Droit applicable et litiges",
    body: (
      <>
        <LegalParagraph>
          Les Conditions sont soumises au droit <Todo>droit applicable</Todo>.
          En cas de différend, une solution amiable est recherchée en premier
          lieu : écrivez à <Mail />.
        </LegalParagraph>
        <LegalParagraph>
          À défaut d’accord, le consommateur peut recourir gratuitement à un
          médiateur de la consommation <Todo>médiateur à désigner</Todo> ou
          saisir la juridiction compétente.
        </LegalParagraph>
      </>
    ),
  },
];

export default function ConditionsPage() {
  return (
    <LegalPage
      eyebrow="Légal"
      title="Conditions générales d’utilisation"
      updatedAt={UPDATED_AT}
      summary="Ce que nous nous engageons à fournir, ce que vous vous engagez à respecter, et ce qui se passe quand l’un ou l’autre s’arrête."
      sections={sections}
    />
  );
}
