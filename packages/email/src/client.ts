import type { ReactElement } from "react";
import { render } from "@react-email/render";
import { Resend } from "resend";

import { emailEnv } from "../env";

let resend: Resend | null | undefined;

/** `null` = pas de clé configurée : on bascule sur la console. */
function getResend(): Resend | null {
  if (resend === undefined) {
    const key = emailEnv().RESEND_API_KEY;
    resend = key ? new Resend(key) : null;
  }
  return resend;
}

export interface SendResult {
  delivered: boolean;
  /** Renseigné quand l'envoi a échoué ; jamais montré à l'utilisateur. */
  error?: string;
}

/**
 * Un envoi raté ne doit jamais faire échouer la requête d'authentification qui
 * l'a déclenché : Better Auth renverrait une 500 et le formulaire accuserait
 * l'utilisateur d'une panne qui n'est pas la sienne. On journalise et on rend
 * la main.
 */
export async function sendEmail(options: {
  to: string;
  subject: string;
  react: ReactElement;
  text: string;
}): Promise<SendResult> {
  const client = getResend();

  if (!client) {
    /**
     * En production, un courrier non envoyé est une panne : la
     * réinitialisation de mot de passe ne marche tout simplement pas. On le
     * dit au niveau `error` pour que l'alerte parte.
     */
    const log =
      emailEnv().NODE_ENV === "production" ? console.error : console.info;
    log(
      `[email] RESEND_API_KEY absente — courrier non envoyé.\n` +
        `  à       : ${options.to}\n` +
        `  objet   : ${options.subject}\n` +
        `${options.text.replace(/^/gm, "  ")}`,
    );
    return { delivered: false };
  }

  try {
    const html = await render(options.react);
    const { error } = await client.emails.send({
      from: emailEnv().EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html,
      text: options.text,
    });

    if (error) {
      console.error("[email] Resend a refusé l'envoi", error);
      return { delivered: false, error: error.message };
    }

    return { delivered: true };
  } catch (cause) {
    console.error("[email] envoi impossible", cause);
    return {
      delivered: false,
      error: cause instanceof Error ? cause.message : String(cause),
    };
  }
}
