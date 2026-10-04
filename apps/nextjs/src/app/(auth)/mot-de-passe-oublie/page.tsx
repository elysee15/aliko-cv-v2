import type { Metadata } from "next";
import Link from "next/link";

import { ForgotPasswordPanel } from "../_components/auth-panels";
import { AuthHeader, AuthShell } from "../_components/auth-shell";
import { ForgotPasswordForm } from "../_components/forgot-password-form";

export const metadata: Metadata = {
  title: "Mot de passe oublié — Aliko",
  description:
    "Recevez un lien pour choisir un nouveau mot de passe et retrouver vos CV, vos lettres et vos candidatures.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell side="end" panel={<ForgotPasswordPanel />}>
      <AuthHeader
        title="Mot de passe oublié"
        subtitle="Indiquez l’adresse de votre compte. Nous vous envoyons un lien pour en choisir un nouveau."
      />

      <div className="mt-8">
        <ForgotPasswordForm />
      </div>

      <p className="text-muted-foreground mt-8 text-center text-sm leading-normal">
        Vous vous en souvenez ?{" "}
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
