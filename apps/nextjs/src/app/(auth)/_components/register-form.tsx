"use client";

import { useId, useState } from "react";
import Link from "next/link";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useForm } from "@tanstack/react-form";

import { Button } from "@aliko/ui/button";
import { Checkbox } from "@aliko/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FieldRow,
} from "@aliko/ui/field";
import { Input, InputAction, InputGroup, InputIcon } from "@aliko/ui/input";
import {
  AuthEmail,
  AuthFamilyName,
  AuthGivenName,
  AuthNewPassword,
} from "@aliko/validators";

import { messageFor, RevealButton } from "./form-bits";
import { PasswordStrength } from "./password-strength";

export function RegisterForm() {
  const uid = useId();
  const [revealed, setRevealed] = useState(false);

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: false,
    },
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
      <div className="flex flex-col gap-5">
        <FieldRow>
          <form.Field
            name="firstName"
            validators={{ onBlur: AuthGivenName, onSubmit: AuthGivenName }}
            children={(field) => {
              const error = messageFor(field);
              return (
                <Field data-invalid={Boolean(error) || undefined}>
                  <FieldLabel htmlFor={`${uid}-first-name`}>Prénom</FieldLabel>
                  <InputGroup>
                    <InputIcon>
                      <PersonIcon />
                    </InputIcon>
                    <Input
                      id={`${uid}-first-name`}
                      type="text"
                      name="firstName"
                      autoComplete="given-name"
                      placeholder="Awa"
                      aria-invalid={Boolean(error) || undefined}
                      aria-describedby={
                        error ? `${uid}-first-name-error` : undefined
                      }
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                  </InputGroup>
                  {error && (
                    <FieldError id={`${uid}-first-name-error`}>
                      {error}
                    </FieldError>
                  )}
                </Field>
              );
            }}
          />

          <form.Field
            name="lastName"
            validators={{ onBlur: AuthFamilyName, onSubmit: AuthFamilyName }}
            children={(field) => {
              const error = messageFor(field);
              return (
                <Field data-invalid={Boolean(error) || undefined}>
                  <FieldLabel htmlFor={`${uid}-last-name`}>Nom</FieldLabel>
                  <InputGroup>
                    <InputIcon>
                      <PersonIcon />
                    </InputIcon>
                    <Input
                      id={`${uid}-last-name`}
                      type="text"
                      name="lastName"
                      autoComplete="family-name"
                      placeholder="Diallo"
                      aria-invalid={Boolean(error) || undefined}
                      aria-describedby={
                        error ? `${uid}-last-name-error` : undefined
                      }
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                  </InputGroup>
                  {error && (
                    <FieldError id={`${uid}-last-name-error`}>
                      {error}
                    </FieldError>
                  )}
                </Field>
              );
            }}
          />
        </FieldRow>

        <form.Field
          name="email"
          validators={{ onBlur: AuthEmail, onSubmit: AuthEmail }}
          children={(field) => {
            const error = messageFor(field);
            return (
              <Field data-invalid={Boolean(error) || undefined}>
                <FieldLabel htmlFor={`${uid}-email`}>Adresse e-mail</FieldLabel>
                <InputGroup>
                  <InputIcon>
                    <EnvelopeClosedIcon />
                  </InputIcon>
                  <Input
                    id={`${uid}-email`}
                    type="email"
                    name="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="vous@exemple.fr"
                    aria-invalid={Boolean(error) || undefined}
                    aria-describedby={error ? `${uid}-email-error` : undefined}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                </InputGroup>
                {error && (
                  <FieldError id={`${uid}-email-error`}>{error}</FieldError>
                )}
              </Field>
            );
          }}
        />

        <form.Field
          name="password"
          validators={{ onBlur: AuthNewPassword, onSubmit: AuthNewPassword }}
          children={(field) => {
            const error = messageFor(field);
            return (
              <Field data-invalid={Boolean(error) || undefined}>
                <FieldLabel htmlFor={`${uid}-password`}>
                  Mot de passe
                </FieldLabel>
                <InputGroup>
                  <InputIcon>
                    <LockClosedIcon />
                  </InputIcon>
                  <Input
                    id={`${uid}-password`}
                    type={revealed ? "text" : "password"}
                    name="password"
                    autoComplete="new-password"
                    placeholder="Choisissez un mot de passe"
                    aria-invalid={Boolean(error) || undefined}
                    aria-describedby={
                      error
                        ? `${uid}-password-error`
                        : `${uid}-password-strength`
                    }
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                  <InputAction>
                    <RevealButton
                      shown={revealed}
                      onToggle={() => setRevealed((value) => !value)}
                    />
                  </InputAction>
                </InputGroup>
                {error ? (
                  <FieldError id={`${uid}-password-error`}>{error}</FieldError>
                ) : (
                  <PasswordStrength
                    id={`${uid}-password-strength`}
                    value={field.state.value}
                  />
                )}
              </Field>
            );
          }}
        />

        <form.Subscribe
          selector={(state) => state.submissionAttempts}
          children={() => (
            <form.Field
              name="terms"
              validators={{
                onChange: ({ value }) =>
                  value
                    ? undefined
                    : "Acceptez les conditions d’utilisation pour continuer.",
                onSubmit: ({ value }) =>
                  value
                    ? undefined
                    : "Acceptez les conditions d’utilisation pour continuer.",
              }}
              children={(field) => {
                const error = messageFor(
                  field,
                  field.state.meta.isTouched ||
                    form.state.submissionAttempts > 0,
                );
                return (
                  <Field
                    orientation="horizontal"
                    data-invalid={Boolean(error) || undefined}
                    className="items-start gap-2.5"
                  >
                    <Checkbox
                      id={`${uid}-terms`}
                      className="mt-0.5"
                      checked={field.state.value}
                      aria-invalid={Boolean(error) || undefined}
                      aria-describedby={
                        error ? `${uid}-terms-error` : undefined
                      }
                      onBlur={field.handleBlur}
                      onCheckedChange={(checked) =>
                        field.handleChange(checked === true)
                      }
                    />
                    <FieldContent>
                      <FieldLabel
                        htmlFor={`${uid}-terms`}
                        className="text-foreground block w-full font-sans text-[13px] leading-snug font-normal tracking-normal normal-case"
                      >
                        J’accepte les{" "}
                        <Link
                          href="/conditions"
                          className="underline underline-offset-4"
                        >
                          conditions d’utilisation
                        </Link>{" "}
                        et la{" "}
                        <Link
                          href="/confidentialite"
                          className="underline underline-offset-4"
                        >
                          politique de confidentialité
                        </Link>
                        .
                      </FieldLabel>
                      {error && (
                        <FieldError id={`${uid}-terms-error`}>
                          {error}
                        </FieldError>
                      )}
                    </FieldContent>
                  </Field>
                );
              }}
            />
          )}
        />
      </div>

      <form.Subscribe
        selector={(state) => state.isSubmitting}
        children={(isSubmitting) => (
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="h-11 w-full"
          >
            Créer mon compte
          </Button>
        )}
      />
    </form>
  );
}
