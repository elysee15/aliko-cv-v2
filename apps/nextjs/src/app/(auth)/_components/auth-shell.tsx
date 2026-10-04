import Link from "next/link";

/** Le logotype : un carré encre, un point sauge. Le stylo, en tout petit. */
export function AlikoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" fill="currentColor" />
    </svg>
  );
}

export function AlikoWordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`focus-visible:ring-ring/35 inline-flex items-center gap-2.5 rounded-sm outline-none focus-visible:ring-[3px] ${className ?? ""}`}
    >
      <AlikoMark className="size-7" />
      <span className="text-[1.0625rem] leading-none font-semibold tracking-[-0.02em]">
        Aliko
      </span>
    </Link>
  );
}

/**
 * Les écrans d'accès sont coupés en deux : la table de travail d'un côté, un
 * panneau de marque de l'autre. Le panneau change de bord selon l'écran, pour
 * que passer de la connexion à l'inscription se voie.
 */
export function AuthShell(props: {
  side: "start" | "end";
  panel: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background grid min-h-screen lg:grid-cols-2">
      <aside
        data-side={props.side}
        className="bg-brand-panel text-brand-panel-foreground relative isolate hidden flex-col justify-center overflow-hidden px-10 py-16 lg:flex data-[side=end]:lg:order-2 xl:px-16"
      >
        <span
          aria-hidden="true"
          className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.22]"
        />
        <div className="mx-auto w-full max-w-lg">{props.panel}</div>
      </aside>

      <main className="flex items-center justify-center px-5 py-12 sm:px-10 lg:py-16">
        <div className="w-full max-w-104">{props.children}</div>
      </main>
    </div>
  );
}

/** En-tête du formulaire : marque, titre, sous-titre. Toujours dans cet ordre. */
export function AuthHeader(props: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col gap-8">
      <AlikoWordmark className="text-foreground" />
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl leading-tight font-semibold tracking-[-0.02em]">
          {props.title}
        </h1>
        <p className="text-muted-foreground text-sm leading-normal">
          {props.subtitle}
        </p>
      </div>
    </div>
  );
}

/** Mentions légales, en pied de formulaire. Identiques sur les deux écrans. */
export function AuthLegal() {
  return (
    <p className="text-muted-foreground mt-8 text-xs leading-normal">
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
  );
}
