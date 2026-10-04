import type { Metadata } from "next";
import Link from "next/link";

import { ForgotPasswordPanel } from "../_components/auth-panels";
import { AuthHeader, AuthShell } from "../_components/auth-shell";
import { ResetPasswordForm } from "../_components/reset-password-form";

export const metadata: Metadata = {
  title: "Nouveau mot de passe — Aliko",
  description:
    "Choisissez un nouveau mot de passe et retrouvez vos CV, vos lettres et vos candidatures.",
  robots: { index: false, follow: false },
};

/**
 * Better Auth renvoie ici après avoir validé le jeton : `?token=…` quand tout
 * va bien, `?error=…` quand le lien est périmé. Les deux cas descendent dans
 * le formulaire, qui n'affiche le champ que s'il a de quoi travailler.
 */
export default async function ResetPasswordPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const raw = searchParams.token;
  const token = typeof raw === "string" && raw.length > 0 ? raw : undefined;

  return (
    <AuthShell side="end" panel={<ForgotPasswordPanel />}>
      <AuthHeader
        title="Nouveau mot de passe"
        subtitle="Choisissez-en un que vous n’utilisez nulle part ailleurs."
      />

      <div className="mt-8">
        <ResetPasswordForm token={token} />
      </div>

      <p className="text-muted-foreground mt-8 text-center text-sm leading-normal">
        Vous vous en souvenez finalement ?{" "}
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
