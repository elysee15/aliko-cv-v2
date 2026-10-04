import Link from "next/link";

import { AlikoWordmark } from "../../(auth)/_components/auth-shell";

export interface LegalSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

/** Un repère à compléter avant mise en ligne : visible, jamais silencieux. */
export function Todo(props: { children: React.ReactNode }) {
  return (
    <span className="border-border bg-muted text-muted-foreground rounded-sm border px-1.5 py-0.5 font-mono text-[0.6875rem] tracking-[0.06em] uppercase">
      {props.children}
    </span>
  );
}

export function LegalParagraph(props: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed">{props.children}</p>;
}

export function LegalList(props: { items: React.ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {props.items.map((item, index) => (
        <li
          key={index}
          className="before:bg-border relative pl-5 text-sm leading-relaxed before:absolute before:top-[0.6875em] before:left-0 before:size-1.5 before:rounded-full"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Les pages légales sont des documents, pas des écrans : une colonne de texte
 * étroite, un filet pour séparer, et le sommaire posé à côté sur grand écran.
 * Aucune couleur d'action ici — rien sur ces pages n'est à « faire ».
 */
export function LegalPage(props: {
  eyebrow: string;
  title: string;
  updatedAt: string;
  summary: string;
  sections: LegalSection[];
}) {
  return (
    <div className="bg-background min-h-screen">
      <header className="border-border border-b">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8">
          <AlikoWordmark className="text-foreground" />
          <Link
            href="/login"
            className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/35 rounded-sm text-sm underline underline-offset-4 outline-none focus-visible:ring-[3px]"
          >
            Se connecter
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="flex flex-col gap-3">
          <p className="text-muted-foreground font-mono text-[0.6875rem] tracking-[0.06em] uppercase">
            {props.eyebrow}
          </p>
          <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.02em]">
            {props.title}
          </h1>
          <p className="text-muted-foreground max-w-prose text-sm leading-relaxed">
            {props.summary}
          </p>
          <p
            data-numeric
            className="text-muted-foreground mt-1 font-mono text-[0.6875rem] tracking-[0.06em] uppercase"
          >
            Dernière mise à jour : {props.updatedAt}
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-12 lg:flex-row lg:gap-16">
          <nav
            aria-label="Sommaire"
            className="lg:sticky lg:top-12 lg:order-2 lg:h-fit lg:w-60 lg:shrink-0"
          >
            <p className="text-muted-foreground font-mono text-[0.6875rem] tracking-[0.06em] uppercase">
              Sommaire
            </p>
            <ol className="border-border mt-4 flex flex-col border-l">
              {props.sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-muted-foreground hover:text-foreground hover:border-foreground focus-visible:ring-ring/35 -ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 text-[13px] leading-snug outline-none focus-visible:ring-[3px]"
                  >
                    <span data-numeric className="tabular-nums">
                      {index + 1}.
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0 flex-1 lg:order-1">
            {props.sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="border-border scroll-mt-12 border-t py-10 first:border-t-0 first:pt-0"
              >
                <h2 className="flex gap-3 text-base leading-[1.35] font-semibold tracking-normal">
                  <span
                    data-numeric
                    className="text-muted-foreground tabular-nums"
                  >
                    {index + 1}.
                  </span>
                  {section.title}
                </h2>
                <div className="mt-4 flex max-w-prose flex-col gap-4">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-border border-t">
        <div className="text-muted-foreground mx-auto flex w-full max-w-5xl flex-col gap-2 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Aliko</p>
          <nav className="flex gap-5">
            <Link
              href="/conditions"
              className="hover:text-foreground underline underline-offset-4"
            >
              Conditions d’utilisation
            </Link>
            <Link
              href="/confidentialite"
              className="hover:text-foreground underline underline-offset-4"
            >
              Politique de confidentialité
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
