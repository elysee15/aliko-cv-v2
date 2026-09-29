import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { cn } from "@aliko/ui";
import { ThemeProvider, ThemeToggle } from "@aliko/ui/theme";
import { Toaster } from "@aliko/ui/toast";

import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

import "~/app/styles.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://turbo.t3.gg"
      : "http://localhost:3000",
  ),
  title: "Create T3 Turbo",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Create T3 Turbo",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Create T3 Turbo",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};



const apfelGrotezk = localFont({
  src: [
    {
      path: "../styles/fonts/ApfelGrotezk-Brukt/ApfelGrotezk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../styles/fonts/ApfelGrotezk-Brukt/ApfelGrotezk-Mittel.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../styles/fonts/ApfelGrotezk-Brukt/ApfelGrotezk-Fett.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-apfel",
  display: "swap",
});



export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background text-foreground min-h-screen font-sans antialiased",
          apfelGrotezk.variable,
        )}
      >
        <ThemeProvider>
          <TRPCReactProvider>{props.children}</TRPCReactProvider>
          <div className="absolute right-4 bottom-4">
            <ThemeToggle />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
