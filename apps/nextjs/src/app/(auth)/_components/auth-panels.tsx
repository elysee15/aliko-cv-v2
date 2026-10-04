import { CheckCircledIcon } from "@radix-ui/react-icons";

import { AlikoMark } from "./auth-shell";

function PanelCard(props: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`border-brand-panel-border rounded-lg border p-5 backdrop-blur-sm bg-white/5 ${props.className ?? ""}`}
    >
      {props.children}
    </div>
  );
}

export function LoginPanel() {
  const promises = [
    "Un CV par offre, sans repartir d’une page blanche",
    "Des lettres qui reprennent votre parcours, pas un modèle",
    "Chaque candidature suivie jusqu’à la réponse",
  ];

  return (
    <div className="flex flex-col gap-10">
      <AlikoMark className="size-8" />

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl leading-[1.1] font-semibold tracking-[-0.02em] text-balance">
          Donnez à votre candidature une longueur d’avance.
        </h2>
        <p className="text-brand-panel-muted text-[13px] leading-relaxed">
          Un CV aligné sur chaque offre, une lettre tirée de votre parcours,
          et chaque réponse suivie.
        </p>
      </div>

      <ul className="flex flex-col text-[12.5px] gap-3">
        {promises.map((promise) => (
          <li
            key={promise}
            className="flex items-start gap-3 text- leading-snug"
          >
            <CheckCircledIcon
              aria-hidden="true"
              className="mt-px size-4 shrink-0"
            />
            {promise}
          </li>
        ))}
      </ul>

      <PanelCard>
        <blockquote className="text-[12.5px] leading-relaxed">
          « J’ai arrêté de recopier mon CV à chaque offre. Trois entretiens en
          un mois, et je sais enfin où j’en suis. »
        </blockquote>
        <div className="mt-2 flex flex-col gap-0.5">
          <h2 className="text-[13px] font-semibold">Awa Diallo</h2>
          <p className="text-brand-panel-muted text-xs">
            Chargée de projet, Abidjan
          </p>
        </div>
      </PanelCard>
    </div>
  );
}

/** Panneau de l'inscription : ce qui attend l'utilisateur une fois le compte créé. */
export function RegisterPanel() {
  const steps = [
    {
      title: "Importez votre CV",
      detail: "PDF ou DOCX, relu et structuré",
    },
    {
      title: "Collez l’offre",
      detail: "Le CV s’aligne sur ce qu’elle demande",
    },
    {
      title: "Générez la lettre",
      detail: "À partir de votre parcours réel",
    },
    {
      title: "Suivez la réponse",
      detail: "Envoyée, entretien, offre, refus",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <AlikoMark className="size-8" />

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl leading-[1.1] font-semibold tracking-[-0.02em] text-balance">
          Quatre étapes, une candidature prête.
        </h2>
        <p className="text-brand-panel-muted text-[13px] leading-relaxed">
          Gratuit pour vos trois premières candidatures. Aucune carte bancaire.
        </p>
      </div>

      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {steps.map((step, index) => (
          <li key={step.title}>
            <PanelCard className="h-full">
              <span
                data-numeric
                className="border-brand-panel-border text-brand-panel-muted flex size-7 items-center justify-center rounded-md border text-[0.6875rem]"
              >
                {index + 1}
              </span>
              <p className="mt-4 text-sm leading-snug font-medium">
                {step.title}
              </p>
              <p className="text-brand-panel-muted mt-1 text-xs leading-normal">
                {step.detail}
              </p>
            </PanelCard>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Panneau du mot de passe oublié : rassurer, puis rappeler ce qui attend. */
export function ForgotPasswordPanel() {
  const facts = [
    "Le lien n’est valable qu’une heure, et une seule fois",
    "Vos CV, vos lettres et vos candidatures restent intacts",
    "Tant que le lien n’est pas ouvert, rien ne change",
  ];

  return (
    <div className="flex flex-col gap-10">
      <AlikoMark className="size-8" />

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl leading-[1.1] font-semibold tracking-[-0.02em] text-balance">
          Un mot de passe perdu ne perd pas votre travail.
        </h2>
        <p className="text-brand-panel-muted text-[13px] leading-relaxed">
          Indiquez l’adresse de votre compte : nous vous envoyons un lien pour
          en choisir un nouveau.
        </p>
      </div>

      <ul className="flex flex-col gap-3 text-[12.5px]">
        {facts.map((fact) => (
          <li key={fact} className="flex items-start gap-3 leading-snug">
            <CheckCircledIcon
              aria-hidden="true"
              className="mt-px size-4 shrink-0"
            />
            {fact}
          </li>
        ))}
      </ul>
    </div>
  );
}
