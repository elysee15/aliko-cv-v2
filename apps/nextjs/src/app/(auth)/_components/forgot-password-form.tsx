"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { useForm } from "@tanstack/react-form";

import { Button } from "@aliko/ui/button";
import { Field, FieldError, FieldLabel } from "@aliko/ui/field";
import { Input, InputGroup, InputIcon } from "@aliko/ui/input";
import { AuthEmail } from "@aliko/validators";

import { messageFor } from "./form-bits";

/**
 * Le formulaire ne dit jamais si l'adresse existe : la même phrase part dans
 * les deux cas, sans quoi n'importe qui pourrait tester des adresses une à une.
 */
export function ForgotPasswordForm() {
  const uid = useId();
  const [sentTo, setSentTo] = useState<string | null>(null);

  const form = useForm({
    defaultValues: { email: "" },
    // Le câblage Better Auth arrive dans un lot suivant, comme pour la
    // connexion ; la validation, elle, est déjà réelle.
    onSubmit: ({ value }) => setSentTo(value.email.trim()),
  });

  if (sentTo !== null) {
    return (
      <div className="flex flex-col gap-6">
        <div className="border-border bg-card flex flex-col gap-2 rounded-lg border p-5">
          <p className="text-sm leading-normal font-medium">
            Vérifiez votre boîte de réception
          </p>
          <p className="text-muted-foreground text-sm leading-normal">
            Si un compte Aliko est associé à{" "}
            <span className="text-foreground font-medium">{sentTo}</span>, un
            lien de réinitialisation vient d’y être envoyé. Il expire dans une
            heure.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button asChild size="lg" className="h-11 w-full">
            <Link href="/login">Retour à la connexion</Link>
          </Button>
          <button
            type="button"
            onClick={() => setSentTo(null)}
            className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/35 mx-auto rounded-sm text-sm underline underline-offset-4 outline-none focus-visible:ring-[3px]"
          >
            Essayer une autre adresse
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit();
      }}
    >
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
                  autoFocus
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

      <form.Subscribe
        selector={(state) => state.isSubmitting}
        children={(isSubmitting) => (
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="h-11 w-full"
          >
            Envoyer le lien
          </Button>
        )}
      />
    </form>
  );
}
