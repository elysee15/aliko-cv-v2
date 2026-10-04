import type { Metadata } from "next";
import Link from "next/link";

import { FieldSeparator } from "@aliko/ui/field";

import { LoginPanel } from "../_components/auth-panels";
import { AuthHeader, AuthLegal, AuthShell } from "../_components/auth-shell";
import { GoogleButton } from "../_components/form-bits";
import { LoginForm } from "../_components/login-form";

export const metadata: Metadata = {
  title: "Connexion — Aliko",
  description:
    "Reprenez vos CV, vos lettres et le suivi de vos candidatures là où vous les avez laissés.",
};

export default function LoginPage() {
  return (
    <AuthShell side="end" panel={<LoginPanel />}>
      <AuthHeader
        title="Content de vous revoir"
        subtitle="Reprenez vos CV, vos lettres et vos candidatures là où vous les avez laissés."
      />

      <div className="mt-8 flex flex-col gap-6">
        <GoogleButton label="Continuer avec Google" />

        <FieldSeparator className="text-muted-foreground">
          ou par e-mail
        </FieldSeparator>

        <LoginForm />
      </div>

      <p className="text-muted-foreground mt-8 text-center text-sm leading-normal">
        Pas encore de compte ?{" "}
        <Link
          href="/register"
          className="text-foreground focus-visible:ring-ring/35 rounded-sm font-medium underline underline-offset-4 outline-none focus-visible:ring-[3px]"
        >
          Créer un compte
        </Link>
      </p>

      <AuthLegal />
    </AuthShell>
  );
}
