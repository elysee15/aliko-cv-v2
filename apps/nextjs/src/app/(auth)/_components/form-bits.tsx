"use client";

import type { AnyFieldApi } from "@tanstack/react-form";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import { Button } from "@aliko/ui/button";

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

export function GoogleButton(props: { label: string }) {
  return (
    <Button type="button" variant="outline" size="lg" className="h-11 w-full">
      <GoogleMark />
      {props.label}
    </Button>
  );
}
