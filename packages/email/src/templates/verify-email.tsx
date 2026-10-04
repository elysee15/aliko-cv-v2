import {
  EmailButton,
  EmailFallbackLink,
  EmailHeading,
  EmailLayout,
  EmailText,
} from "./layout";

export interface VerifyEmailProps {
  url: string;
  name?: string;
}

export function VerifyEmail({ url, name }: VerifyEmailProps) {
  return (
    <EmailLayout
      preview="Confirmez votre adresse e-mail Aliko"
      footnote="Votre compte est déjà actif : cette confirmation sert à sécuriser la récupération de votre mot de passe."
    >
      <EmailHeading>Confirmez votre adresse</EmailHeading>
      <EmailText>
        {name ? `Bienvenue, ${name}. ` : "Bienvenue. "}
        Un clic suffit pour confirmer que cette adresse est bien la vôtre.
      </EmailText>
      <EmailButton href={url}>Confirmer mon adresse</EmailButton>
      <EmailFallbackLink href={url} />
    </EmailLayout>
  );
}

export function verifyEmailText({ url }: VerifyEmailProps) {
  return [
    "Confirmez votre adresse e-mail Aliko",
    "",
    "Ouvrez ce lien pour confirmer que cette adresse est bien la vôtre.",
    url,
    "",
    "Votre compte est déjà actif : cette confirmation sert à sécuriser la récupération de votre mot de passe.",
  ].join("\n");
}
