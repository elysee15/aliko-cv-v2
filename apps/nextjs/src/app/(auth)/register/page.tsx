import type { Metadata } from "next";

import { AuthCard } from "../_components/auth-card";

export const metadata: Metadata = {
  title: "Inscription — Aliko",
  description:
    "Vos CV, vos lettres de motivation et le suivi de vos candidatures au même endroit.",
};

export default function RegisterPage() {
  return (
    <AuthCard
      active="/register"
      title="Créer un compte"
      description="Vos CV, vos lettres et le suivi de vos candidatures au même endroit."
      socialLabel="Continuer avec Google"
      submitLabel="Créer mon compte"
      submitDelay={200}
    />
  );
}
