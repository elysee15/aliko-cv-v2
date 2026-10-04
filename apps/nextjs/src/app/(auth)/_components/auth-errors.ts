/**
 * Better Auth répond en anglais, avec un code machine. Rien de tout cela ne
 * doit atteindre l'écran : on traduit les codes connus, et tout le reste
 * tombe sur une seule phrase neutre — mieux vaut une phrase vague qu'un
 * message anglais ou, pire, un détail qui renseigne un attaquant.
 */
const MESSAGES: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "Adresse e-mail ou mot de passe incorrect.",
  CREDENTIAL_ACCOUNT_NOT_FOUND:
    "Ce compte a été créé avec Google. Continuez avec Google pour vous connecter.",
  USER_ALREADY_EXISTS:
    "Un compte existe déjà avec cette adresse. Connectez-vous plutôt.",
  USER_NOT_FOUND: "Adresse e-mail ou mot de passe incorrect.",
  INVALID_EMAIL: "Cette adresse e-mail n’est pas valide.",
  PASSWORD_TOO_SHORT: "Huit caractères minimum.",
  PASSWORD_TOO_LONG: "Cent vingt-huit caractères au maximum.",
  EMAIL_NOT_VERIFIED:
    "Confirmez d’abord votre adresse : un lien vous a été envoyé.",
  INVALID_TOKEN: "Ce lien a expiré ou a déjà servi. Demandez-en un nouveau.",
  FAILED_TO_CREATE_USER:
    "Impossible de créer le compte pour l’instant. Réessayez dans un instant.",
};

const FALLBACK = "Quelque chose a échoué de notre côté. Réessayez.";

export function authErrorMessage(error?: {
  code?: string;
  status?: number;
}): string {
  const known = error?.code ? MESSAGES[error.code] : undefined;
  if (known) return known;
  if (error?.status === 429) {
    return "Trop de tentatives. Patientez une minute avant de réessayer.";
  }
  return FALLBACK;
}
