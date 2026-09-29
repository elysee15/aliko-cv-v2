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

export const AuthEmail = z
  .string()
  .trim()
  .min(1, "Renseignez votre adresse e-mail.")
  .pipe(z.email("Cette adresse e-mail n’est pas valide."));

/** À la connexion on ne juge pas la robustesse : le mot de passe existe déjà. */
export const AuthPassword = z
  .string()
  .min(1, "Renseignez votre mot de passe.");

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
