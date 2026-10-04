"use client";

import { cn } from "@aliko/ui";

const CRITERIA = [
  { test: (value: string) => value.length >= 8 },
  { test: (value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value) },
  { test: (value: string) => /\d/.test(value) },
  { test: (value: string) => /[^\w\s]/.test(value) },
] as const;

const LABELS = ["Trop court", "Faible", "Correct", "Solide"] as const;

export function scorePassword(value: string): number {
  if (value.length === 0) return 0;
  return CRITERIA.filter((criterion) => criterion.test(value)).length;
}

/**
 * Quatre segments, une seule couleur : la jauge dit où on en est, elle ne
 * met pas une note en rouge. Le texte porte le sens, pas la teinte.
 */
export function PasswordStrength(props: { value: string; id?: string }) {
  const score = scorePassword(props.value);
  const label = score === 0 ? undefined : LABELS[score - 1];

  return (
    <div className="flex flex-col gap-1.5" id={props.id}>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={CRITERIA.length}
        aria-valuenow={score}
        aria-valuetext={label ?? "Mot de passe vide"}
        aria-label="Robustesse du mot de passe"
        className="flex gap-1.5"
      >
        {CRITERIA.map((_, index) => (
          <span
            key={index}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-150",
              index < score ? "bg-primary" : "bg-muted",
            )}
          />
        ))}
      </div>
      <p className="text-muted-foreground text-xs leading-normal">
        {label
          ? `${label} — huit caractères minimum, majuscule, chiffre et symbole.`
          : "Huit caractères minimum."}
      </p>
    </div>
  );
}
