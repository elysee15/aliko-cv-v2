import { z } from "zod/v4";

/**
 * Schémas d'authentification partagés entre le formulaire client et le serveur.
 * Les messages sont rédigés pour être lus directement sous le champ : ils
 * disent quoi faire, jamais « champ invalide ».
 */

export const AuthName = z
  .string()
  .trim()
  .min(2, "Indiquez votre nom complet.")
  .max(80, "Quatre-vingts caractères au maximum.");

/** Le formulaire d'inscription demande prénom et nom séparément : chaque
 *  message doit nommer le champ qu'il refuse. */
export const AuthGivenName = z
  .string()
  .trim()
  .min(2, "Indiquez votre prénom.")
  .max(40, "Quarante caractères au maximum.");

export const AuthFamilyName = z
  .string()
  .trim()
  .min(2, "Indiquez votre nom.")
  .max(40, "Quarante caractères au maximum.");

export const AuthEmail = z
  .string()
  .trim()
  .min(1, "Renseignez votre adresse e-mail.")
  .pipe(z.email("Cette adresse e-mail n’est pas valide."));

/** À la connexion on ne juge pas la robustesse : le mot de passe existe déjà. */
export const AuthPassword = z.string().min(1, "Renseignez votre mot de passe.");

export const AuthNewPassword = z
  .string()
  .min(8, "Huit caractères minimum.")
  .max(128, "Cent vingt-huit caractères au maximum.");

export const SignInSchema = z.object({
  email: AuthEmail,
  password: AuthPassword,
});

export const SignUpSchema = z.object({
  name: AuthName,
  email: AuthEmail,
  password: AuthNewPassword,
});

export type SignInValues = z.infer<typeof SignInSchema>;
export type SignUpValues = z.infer<typeof SignUpSchema>;

/** Mot de passe oublié : on ne demande que l'adresse, jamais autre chose. */
export const ForgotPasswordSchema = z.object({
  email: AuthEmail,
});

export type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>;

/**
 * Réinitialisation : le mot de passe est saisi deux fois. La confirmation est
 * vérifiée au niveau de l'objet, sinon le message se poserait sur le premier
 * champ alors qu'il parle du second.
 */
export const ResetPasswordSchema = z
  .object({
    password: AuthNewPassword,
    confirmation: z.string().min(1, "Confirmez votre mot de passe."),
  })
  .refine((values) => values.password === values.confirmation, {
    path: ["confirmation"],
    message: "Les deux mots de passe ne sont pas identiques.",
  });

export type ResetPasswordValues = z.infer<typeof ResetPasswordSchema>;
