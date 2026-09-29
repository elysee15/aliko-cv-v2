import type { Metadata } from "next";

import { AuthCard } from "../_components/auth-card";

export const metadata: Metadata = {
  title: "Connexion — Aliko",
  description:
    "Reprenez vos CV, vos lettres et le suivi de vos candidatures là où vous les avez laissés.",
};

export default function LoginPage() {
  return (
    <AuthCard
      active="/login"
      title="Se connecter"
      description="Reprenez vos CV, vos lettres et vos candidatures là où vous les avez laissés."
      socialLabel="Continuer avec Google"
      submitLabel="Se connecter"
      submitDelay={200}
    />
  );
}
