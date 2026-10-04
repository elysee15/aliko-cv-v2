import {
  EmailButton,
  EmailFallbackLink,
  EmailHeading,
  EmailLayout,
  EmailText,
} from "./layout";

export interface ResetPasswordEmailProps {
  url: string;
  /** Prénom ou nom complet ; absent pour un compte créé via Google. */
  name?: string;
}

export function ResetPasswordEmail({ url, name }: ResetPasswordEmailProps) {
  return (
    <EmailLayout
      preview="Réinitialisez votre mot de passe Aliko"
      footnote="Si vous n’êtes pas à l’origine de cette demande, ignorez ce message : votre mot de passe actuel reste valable."
    >
      <EmailHeading>Réinitialisez votre mot de passe</EmailHeading>
      <EmailText>
        {name ? `${name}, u` : "U"}n nouveau mot de passe vous attend. Le lien
        ci-dessous expire dans une heure et ne sert qu’une fois.
      </EmailText>
      <EmailButton href={url}>Choisir un nouveau mot de passe</EmailButton>
      <EmailFallbackLink href={url} />
    </EmailLayout>
  );
}

export function resetPasswordText({ url }: ResetPasswordEmailProps) {
  return [
    "Réinitialisez votre mot de passe Aliko",
    "",
    "Ouvrez ce lien pour choisir un nouveau mot de passe. Il expire dans une heure et ne sert qu'une fois.",
    url,
    "",
    "Si vous n'êtes pas à l'origine de cette demande, ignorez ce message : votre mot de passe actuel reste valable.",
  ].join("\n");
}
