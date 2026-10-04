import type { Metadata } from "next";
import Link from "next/link";

import { FieldSeparator } from "@aliko/ui/field";

import { RegisterPanel } from "../_components/auth-panels";
import { AuthHeader, AuthShell } from "../_components/auth-shell";
import { GoogleButton } from "../_components/form-bits";
import { RegisterForm } from "../_components/register-form";

export const metadata: Metadata = {
  title: "Inscription — Aliko",
  description:
    "Vos CV, vos lettres de motivation et le suivi de vos candidatures au même endroit.",
};

export default function RegisterPage() {
  return (
    <AuthShell side="start" panel={<RegisterPanel />}>
      <AuthHeader
        title="Créer votre compte"
        subtitle="Vos CV, vos lettres et le suivi de vos candidatures au même endroit."
      />

      <div className="mt-8 flex flex-col gap-6">
        <GoogleButton label="S’inscrire avec Google" />

        <FieldSeparator className="text-muted-foreground">
          ou par e-mail
        </FieldSeparator>

        <RegisterForm />
      </div>

      <p className="text-muted-foreground mt-8 text-center text-sm leading-normal">
        Vous avez déjà un compte ?{" "}
        <Link
          href="/login"
          className="text-foreground focus-visible:ring-ring/35 rounded-sm font-medium underline underline-offset-4 outline-none focus-visible:ring-[3px]"
        >
          Se connecter
        </Link>
      </p>
    </AuthShell>
  );
}
