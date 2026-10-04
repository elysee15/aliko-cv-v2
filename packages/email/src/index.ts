import { sendEmail } from "./client";
import {
  ResetPasswordEmail,
  resetPasswordText,
} from "./templates/reset-password";
import { VerifyEmail, verifyEmailText } from "./templates/verify-email";

export type { SendResult } from "./client";

export function sendResetPasswordEmail(options: {
  to: string;
  url: string;
  name?: string;
}) {
  return sendEmail({
    to: options.to,
    subject: "Réinitialisez votre mot de passe Aliko",
    react: ResetPasswordEmail({ url: options.url, name: options.name }),
    text: resetPasswordText({ url: options.url }),
  });
}

export function sendVerificationEmail(options: {
  to: string;
  url: string;
  name?: string;
}) {
  return sendEmail({
    to: options.to,
    subject: "Confirmez votre adresse e-mail Aliko",
    react: VerifyEmail({ url: options.url, name: options.name }),
    text: verifyEmailText({ url: options.url }),
  });
}
