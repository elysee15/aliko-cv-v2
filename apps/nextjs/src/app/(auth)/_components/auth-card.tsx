import Link from "next/link";

import { cn } from "@aliko/ui";
import { Button } from "@aliko/ui/button";
import { FieldSeparator } from "@aliko/ui/field";

import { AuthForm } from "./auth-form";

const TABS = [
  { href: "/login", label: "Connexion" },
  { href: "/register", label: "Inscription" },
] as const;

/** Le G officiel, en quatre couleurs : c'est une marque, pas un accent du système. */
function GoogleMark() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
      />
    </svg>
  );
}

export function AuthCard(props: {
  active: (typeof TABS)[number]["href"];
  title: string;
  description: string;
  socialLabel: string;
  submitLabel: string;
  /** Délai d'entrée du bouton de soumission, calé après la pile de champs. */
  submitDelay: number;
}) {
  return (
    <div className="w-full max-w-[420px]">
      <div className="bg-card border-border rounded-lg border p-6">
        <nav
          aria-label="Entrer dans Aliko"
          className="bg-muted border-border flex gap-1 rounded-full border p-1"
        >
          {TABS.map((tab) => {
            const isActive = tab.href === props.active;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "focus-visible:ring-ring/50 flex h-8 flex-1 items-center justify-center rounded-full text-sm font-medium outline-none focus-visible:ring-[3px]",
                  "transition-colors duration-180",
                  isActive
                    ? "auth-tab-open text-foreground"
                    : "text-foreground/70 hover:text-foreground",
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 flex flex-col gap-2">
          <h1 className="text-2xl leading-tight font-bold">
            {props.title}
          </h1>
          <p className="text-muted-foreground text-sm leading-normal">
            {props.description}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-12 w-full"
          >
            <GoogleMark />
            {props.socialLabel}
          </Button>

          <FieldSeparator
            className="auth-row *:data-[slot=field-separator-content]:bg-card text-muted-foreground"
          >
            ou
          </FieldSeparator>

          <AuthForm
            mode={props.active === "/register" ? "inscription" : "connexion"}
            submitLabel={props.submitLabel}
            submitDelay={props.submitDelay}
          />
        </div>
      </div>

      <p
        className="auth-row text-muted-foreground mt-6 px-1 text-xs leading-normal"
      >
        En continuant, vous acceptez les{" "}
        <Link
          href="/conditions"
          className="hover:text-foreground underline underline-offset-4"
        >
          conditions d’utilisation
        </Link>{" "}
        et la{" "}
        <Link
          href="/confidentialite"
          className="hover:text-foreground underline underline-offset-4"
        >
          politique de confidentialité
        </Link>{" "}
        d’Aliko.
      </p>
    </div>
  );
}
