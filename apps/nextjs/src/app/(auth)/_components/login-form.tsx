"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { useForm } from "@tanstack/react-form";

import { Button } from "@aliko/ui/button";
import { Checkbox } from "@aliko/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@aliko/ui/field";
import { Input, InputAction, InputGroup, InputIcon } from "@aliko/ui/input";
import { AuthEmail, AuthPassword } from "@aliko/validators";

import { authClient } from "~/auth/client";
import { messageFor, RevealButton, toastAuthError } from "./form-bits";

export function LoginForm() {
  const uid = useId();
  const router = useRouter();
  const [revealed, setRevealed] = useState(false);

  const form = useForm({
    defaultValues: { email: "", password: "", remember: true },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.signIn.email({
        email: value.email.trim(),
        password: value.password,
        rememberMe: value.remember,
      });

      if (error) {
        toastAuthError(error);
        return;
      }

      // `refresh()` est indispensable : les composants serveur ont déjà rendu
      // une page sans session, et seule une revalidation les remet à jour.
      router.push("/");
      router.refresh();
    },
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
          validators={{ onBlur: AuthPassword }}
          children={(field) => {
            const error = messageFor(field);
            return (
              <Field data-invalid={Boolean(error) || undefined}>
                <div className="flex items-center justify-between gap-3">
                  <FieldLabel htmlFor={`${uid}-password`}>
                    Mot de passe
                  </FieldLabel>
                  <Link
                    href="/mot-de-passe-oublie"
                    className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/35 rounded-sm text-xs underline underline-offset-4 outline-none focus-visible:ring-[3px]"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <InputGroup>
                  <InputIcon>
                    <LockClosedIcon />
                  </InputIcon>
                  <Input
                    id={`${uid}-password`}
                    type={revealed ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    placeholder="Votre mot de passe"
                    aria-invalid={Boolean(error) || undefined}
                    aria-describedby={
                      error ? `${uid}-password-error` : undefined
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
                {error && (
                  <FieldError id={`${uid}-password-error`}>{error}</FieldError>
                )}
              </Field>
            );
          }}
        />

        <form.Field
          name="remember"
          children={(field) => (
            <Field orientation="horizontal" className="items-center gap-2.5">
              <Checkbox
                id={`${uid}-remember`}
                checked={field.state.value}
                onCheckedChange={(checked) =>
                  field.handleChange(checked === true)
                }
              />
              <FieldLabel
                htmlFor={`${uid}-remember`}
                className="text-foreground flex-none font-sans text-[13px] tracking-normal normal-case"
              >
                Rester connecté
              </FieldLabel>
            </Field>
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
            {isSubmitting ? "Connexion…" : "Se connecter"}
          </Button>
        )}
      />
    </form>
  );
}
