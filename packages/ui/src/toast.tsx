"use client";

import type { ToasterProps } from "sonner";
import { Toaster as Sonner, toast } from "sonner";

import { useTheme } from "./theme";

/**
 * Le toast est un calque : il flotte réellement au-dessus de la page, donc il
 * a droit à l'ombre « Calque » — mais le filet d'1 px passe d'abord, et rien
 * n'est translucide. Même papier, même filet, même rayon que les cartes des
 * écrans d'accès.
 */
export const Toaster = ({ ...props }: ToasterProps) => {
  const { themeMode } = useTheme();

  return (
    <Sonner
      theme={themeMode === "auto" ? "system" : themeMode}
      position="top-center"
      offset={16}
      gap={8}
      className="toaster group"
      toastOptions={{
        duration: 6000,
        classNames: {
          toast:
            "group/toast font-sans w-full items-start gap-3 rounded-[10px] border border-border bg-popover p-4 text-popover-foreground shadow-lg",
          /**
           * Un titre de toast est un `Title` : il tient sur une ligne et dit
           * ce qui vient de se passer, jamais pourquoi.
           */
          title: "text-[13px] font-medium leading-snug tracking-normal",
          description: "!text-muted-foreground mt-1 text-[13px] leading-normal",
          icon: "mt-px size-4 shrink-0",
          /** La sauge ne salue que la réussite — jamais une surface. */
          success: "[&_[data-icon]]:text-primary",
          error:
            "border-destructive/25 bg-destructive/5 [&_[data-icon]]:text-destructive [&_[data-title]]:text-destructive",
          /**
           * Pas de teinte de statut ici : les cinq couleurs de candidature ne
           * quittent jamais l'objet candidature.
           */
          warning: "[&_[data-icon]]:text-foreground",
          info: "[&_[data-icon]]:text-muted-foreground",
          actionButton:
            "bg-primary text-primary-foreground rounded-md px-3 text-[13px] font-medium",
          cancelButton:
            "text-muted-foreground hover:text-foreground rounded-md px-3 text-[13px] font-medium",
          closeButton:
            "border-border bg-popover text-muted-foreground hover:text-foreground rounded-md",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { toast };
