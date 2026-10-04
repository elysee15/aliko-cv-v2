"use client";

import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion } from "motion/react";
import { Slot as SlotPrimitive } from "radix-ui";

import { cn } from "@aliko/ui";

export const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-[13px] font-bold whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs",
        destructive:
          "bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white shadow-xs",
        outline:
          "bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border shadow-xs",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/** Sober easing — no overshoot, no elastic. See DESIGN.md. */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const PRESS_TRANSITION = { duration: 0.12, ease: EASE_OUT };
const REVEAL_TRANSITION = { duration: 0.18, ease: EASE_OUT };

function Spinner() {
  return (
    <motion.svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="size-4"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
    >
      <circle
        cx="8"
        cy="8"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.25"
      />
      <path
        d="M8 1.5a6.5 6.5 0 0 1 6.5 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

export type ButtonProps = Omit<
  React.ComponentProps<typeof motion.button>,
  "ref" | "children"
> &
  VariantProps<typeof buttonVariants> & {
    children?: React.ReactNode;
    asChild?: boolean;
    /** Shows a spinner, disables interaction and marks the button `aria-busy`. */
    loading?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  if (asChild) {
    return (
      <SlotPrimitive.Slot
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...(props as React.ComponentProps<typeof SlotPrimitive.Slot>)}
      >
        {children}
      </SlotPrimitive.Slot>
    );
  }

  const inert = disabled ?? loading;

  return (
    <motion.button
      data-slot="button"
      data-loading={loading || undefined}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={inert}
      aria-busy={loading || undefined}
      whileTap={inert ? undefined : { scale: 0.98 }}
      transition={PRESS_TRANSITION}
      {...props}
    >
      <AnimatePresence initial={false}>
        {loading && (
          <motion.span
            key="spinner"
            className="inline-flex items-center overflow-hidden"
            // The negative margin cancels the button's flex gap so the spinner
            // reveal reads as one continuous width change.
            initial={{ width: 0, marginRight: "-0.5rem", opacity: 0 }}
            animate={{ width: "1rem", marginRight: 0, opacity: 1 }}
            exit={{ width: 0, marginRight: "-0.5rem", opacity: 0 }}
            transition={REVEAL_TRANSITION}
          >
            <Spinner />
          </motion.span>
        )}
      </AnimatePresence>
      {children}
    </motion.button>
  );
}
