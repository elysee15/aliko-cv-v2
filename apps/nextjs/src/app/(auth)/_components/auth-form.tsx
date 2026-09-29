"use client";

import type { AnyFieldApi } from "@tanstack/react-form";
import { useId, useState } from "react";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";

import {
  AuthEmail,
  AuthName,
  AuthNewPassword,
  AuthPassword,
} from "@aliko/validators";
import { Button } from "@aliko/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@aliko/ui/field";
import { Input } from "@aliko/ui/input";

/** Le message n'apparaît qu'une fois le champ quitté : on ne corrige pas en cours de frappe. */
function messageFor(field: AnyFieldApi): string | undefined {
  if (!field.state.meta.isTouched || field.state.meta.isValid) return undefined;

  const [first] = field.state.meta.errors as unknown[];
  if (typeof first === "string") return first;
  if (first !== null && typeof first === "object" && "message" in first) {
    const { message } = first as { message?: unknown };
    return typeof message === "string" ? message : undefined;
  }
  return undefined;
}

function RevealButton(props: { shown: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={props.onToggle}
      aria-pressed={props.shown}
      className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 flex items-center rounded-sm px-3 text-xs underline underline-offset-4 outline-none focus-visible:ring-[3px]"
    >
      {props.shown ? "Masquer" : "Afficher"}
    </button>
  );
}

export function AuthForm(props: {
  mode: "connexion" | "inscription";
  submitLabel: string;
  submitDelay: number;
}) {
  const uid = useId();
  const [revealed, setRevealed] = useState(false);
  const isSignUp = props.mode === "inscription";

  const form = useForm({
    defaultValues: { name: "", email: "", password: "" },
    // Le câblage Better Auth arrive dans un lot suivant ; la validation, elle,
    // est déjà réelle et c'est elle qui garde la porte.
    onSubmit: () => undefined,
  });

  return (
    <form
      noValidate
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit();
      }}
    >
      <div
        className="auth-row flex flex-col gap-5"
        style={{ "--row-delay": "120ms" } as React.CSSProperties}
      >
        {isSignUp && (
          <form.Field
            name="name"
            validators={{ onBlur: AuthName, onSubmit: AuthName }}
            children={(field) => {
              const error = messageFor(field);
              return (
                <Field data-invalid={Boolean(error) || undefined}>
                  <FieldLabel htmlFor={`${uid}-name`}>Nom complet</FieldLabel>
                  <Input
                    id={`${uid}-name`}
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Awa Diallo"
                    className="h-11"
                    aria-invalid={Boolean(error) || undefined}
                    aria-describedby={error ? `${uid}-name-error` : undefined}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                  {error && (
                    <FieldError id={`${uid}-name-error`}>{error}</FieldError>
                  )}
                </Field>
              );
            }}
          />
        )}

        <form.Field
          name="email"
          validators={{ onBlur: AuthEmail, onSubmit: AuthEmail }}
          children={(field) => {
            const error = messageFor(field);
            return (
              <Field data-invalid={Boolean(error) || undefined}>
                <FieldLabel htmlFor={`${uid}-email`}>Adresse e-mail</FieldLabel>
                <Input
                  id={`${uid}-email`}
                  type="email"
                  name="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="vous@exemple.fr"
                  className="h-11"
                  aria-invalid={Boolean(error) || undefined}
                  aria-describedby={error ? `${uid}-email-error` : undefined}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                {error && (
                  <FieldError id={`${uid}-email-error`}>{error}</FieldError>
                )}
              </Field>
            );
          }}
        />

        <form.Field
          name="password"
          validators={{ onBlur: isSignUp ? AuthNewPassword : AuthPassword }}
          children={(field) => {
            const error = messageFor(field);
            const describedBy = error
              ? `${uid}-password-error`
              : isSignUp
                ? `${uid}-password-description`
                : undefined;
            return (
              <Field data-invalid={Boolean(error) || undefined}>
                <div className="flex items-center justify-between gap-3">
                  <FieldLabel htmlFor={`${uid}-password`}>
                    Mot de passe
                  </FieldLabel>
                  {!isSignUp && (
                    <Link
                      href="/mot-de-passe-oublie"
                      className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 rounded-sm text-xs underline underline-offset-4 outline-none focus-visible:ring-[3px]"
                    >
                      Mot de passe oublié ?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id={`${uid}-password`}
                    type={revealed ? "text" : "password"}
                    name="password"
                    autoComplete={
                      isSignUp ? "new-password" : "current-password"
                    }
                    className="h-11 pr-20"
                    aria-invalid={Boolean(error) || undefined}
                    aria-describedby={describedBy}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                  <RevealButton
                    shown={revealed}
                    onToggle={() => setRevealed((value) => !value)}
                  />
                </div>
                {error ? (
                  <FieldError id={`${uid}-password-error`}>{error}</FieldError>
                ) : isSignUp ? (
                  <FieldDescription id={`${uid}-password-description`}>
                    Huit caractères minimum.
                  </FieldDescription>
                ) : null}
              </Field>
            );
          }}
        />
      </div>

      <form.Subscribe
        selector={(state) => state.isSubmitting}
        children={(isSubmitting) => (
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="auth-row h-12 w-full"
            style={
              { "--row-delay": `${props.submitDelay}ms` } as React.CSSProperties
            }
          >
            {props.submitLabel}
          </Button>
        )}
      />
    </form>
  );
}
