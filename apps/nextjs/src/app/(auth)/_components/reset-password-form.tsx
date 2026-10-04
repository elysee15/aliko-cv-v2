"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { useForm } from "@tanstack/react-form";

import { Button } from "@aliko/ui/button";
import { Field, FieldError, FieldLabel } from "@aliko/ui/field";
import { Input, InputAction, InputGroup, InputIcon } from "@aliko/ui/input";
import { toast } from "@aliko/ui/toast";
import { AuthNewPassword, ResetPasswordSchema } from "@aliko/validators";

import { authClient } from "~/auth/client";
import { messageFor, RevealButton, toastAuthError } from "./form-bits";
import { PasswordStrength } from "./password-strength";

/**
 * Sans jeton, il n'y a rien à réinitialiser : on le dit tout de suite plutôt
 * que de laisser remplir un formulaire qui échouera à l'envoi.
 */
export function ResetPasswordForm(props: { token?: string }) {
  const uid = useId();
  const router = useRouter();
  const [revealed, setRevealed] = useState(false);

  const form = useForm({
    defaultValues: { password: "", confirmation: "" },
    validators: { onSubmit: ResetPasswordSchema },
    onSubmit: async ({ value }) => {
      if (!props.token) return;

      const { error } = await authClient.resetPassword({
        newPassword: value.password,
        token: props.token,
      });

      if (error) {
        toastAuthError(error);
        return;
      }

      toast.success("Mot de passe modifié", {
        description: "Connectez-vous avec votre nouveau mot de passe.",
      });
      router.push("/login");
    },
  });

  if (!props.token) {
    return (
      <div className="flex flex-col gap-6">
        <div className="border-border bg-card flex flex-col gap-2 rounded-lg border p-5">
          <p className="text-sm leading-normal font-medium">
            Ce lien ne fonctionne plus
          </p>
          <p className="text-muted-foreground text-sm leading-normal">
            Il est incomplet, a expiré ou a déjà servi. Les liens de
            réinitialisation ne valent qu’une heure, et une seule fois.
          </p>
        </div>
        <Button asChild size="lg" className="h-11 w-full">
          <Link href="/mot-de-passe-oublie">Demander un nouveau lien</Link>
        </Button>
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
      <div className="flex flex-col gap-5">
        <form.Field
          name="password"
          validators={{ onBlur: AuthNewPassword }}
          children={(field) => {
            const error = messageFor(field);
            return (
              <Field data-invalid={Boolean(error) || undefined}>
                <FieldLabel htmlFor={`${uid}-password`}>
                  Nouveau mot de passe
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
                    autoFocus
                    placeholder="Huit caractères minimum"
                    aria-invalid={Boolean(error) || undefined}
                    aria-describedby={`${uid}-strength${
                      error ? ` ${uid}-password-error` : ""
                    }`}
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
                <PasswordStrength
                  id={`${uid}-strength`}
                  value={field.state.value}
                />
                {error && (
                  <FieldError id={`${uid}-password-error`}>{error}</FieldError>
                )}
              </Field>
            );
          }}
        />

        <form.Field
          name="confirmation"
          children={(field) => {
            const error = messageFor(field);
            return (
              <Field data-invalid={Boolean(error) || undefined}>
                <FieldLabel htmlFor={`${uid}-confirmation`}>
                  Confirmez le mot de passe
                </FieldLabel>
                <InputGroup>
                  <InputIcon>
                    <LockClosedIcon />
                  </InputIcon>
                  <Input
                    id={`${uid}-confirmation`}
                    type={revealed ? "text" : "password"}
                    name="confirmation"
                    autoComplete="new-password"
                    placeholder="Le même, une seconde fois"
                    aria-invalid={Boolean(error) || undefined}
                    aria-describedby={
                      error ? `${uid}-confirmation-error` : undefined
                    }
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                </InputGroup>
                {error && (
                  <FieldError id={`${uid}-confirmation-error`}>
                    {error}
                  </FieldError>
                )}
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
            className="h-11 w-full"
          >
            {isSubmitting ? "Enregistrement…" : "Enregistrer le mot de passe"}
          </Button>
        )}
      />
    </form>
  );
}
