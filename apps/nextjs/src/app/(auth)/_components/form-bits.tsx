"use client";

import type { AnyFieldApi } from "@tanstack/react-form";
import { useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import { Button } from "@aliko/ui/button";
import { toast } from "@aliko/ui/toast";

import { authClient } from "~/auth/client";
import { authErrorMessage } from "./auth-errors";
import { GoogleMark } from "./google-mark";

/**
 * Le message n'apparaît qu'une fois le champ quitté : on ne corrige pas en
 * cours de frappe. `show` force l'affichage pour un champ jamais touché qu'une
 * soumission vient pourtant de recaler — typiquement une case à cocher.
 */
export function messageFor(
  field: AnyFieldApi,
  show = field.state.meta.isTouched,
): string | undefined {
  if (!show || field.state.meta.isValid) return undefined;

  const [first] = field.state.meta.errors as unknown[];
  if (typeof first === "string") return first;
  if (first !== null && typeof first === "object" && "message" in first) {
    const { message } = first as { message?: unknown };
    return typeof message === "string" ? message : undefined;
  }
  return undefined;
}

export function RevealButton(props: { shown: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={props.onToggle}
      aria-pressed={props.shown}
      aria-label={
        props.shown ? "Masquer le mot de passe" : "Afficher le mot de passe"
      }
    >
      {props.shown ? <EyeClosedIcon /> : <EyeOpenIcon />}
    </button>
  );
}

/**
 * Le bouton reste désactivé une fois cliqué : la redirection Google prend une
 * seconde ou deux, et un second clic entre-temps relancerait un flux OAuth
 * concurrent.
 */
export function GoogleButton(props: { label: string; callbackURL?: string }) {
  const [pending, setPending] = useState(false);

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      className="h-11 w-full"
      disabled={pending}
      onClick={() => {
        setPending(true);
        void authClient.signIn
          .social({
            provider: "google",
            callbackURL: props.callbackURL ?? "/",
          })
          .then((result) => {
            if (result.error) {
              toastAuthError(result.error);
              setPending(false);
            }
          })
          .catch(() => {
            toastAuthError();
            setPending(false);
          });
      }}
    >
      <GoogleMark />
      {pending ? "Redirection vers Google…" : props.label}
    </Button>
  );
}

/**
 * L'erreur qui ne vise aucun champ en particulier : identifiants refusés,
 * réseau coupé, lien périmé. Elle part en toast, et dure plus longtemps que
 * la valeur par défaut : on vient d'échouer à entrer, la phrase doit tenir le
 * temps d'être lue et le geste d'être repris.
 */
export function toastAuthError(error?: { code?: string; status?: number }) {
  toast.error(authErrorMessage(error), { duration: 10000 });
}
