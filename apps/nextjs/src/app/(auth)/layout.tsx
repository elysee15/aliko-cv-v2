import Link from "next/link";

export default function AuthLayout(props: { children: React.ReactNode }) {
  return (
    <div className="bg-sidebar flex min-h-screen flex-col">
      <header className="bg-card border-border border-b">
        <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center px-4 sm:px-8">
          <Link
            href="/"
            className="text-foreground focus-visible:ring-ring/50 focus-visible:border-ring rounded-sm font-mono text-[11px] font-medium tracking-[0.06em] uppercase outline-none focus-visible:ring-[3px]"
          >
            Aliko
          </Link>
        </div>
      </header>

      <main className="flex flex-1 justify-center px-4 pt-8 pb-16 sm:pt-24">
        {props.children}
      </main>
    </div>
  );
}
