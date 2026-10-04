import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "@aliko/ui";

export const inputVariants = cva(
  [
    "file:text-foreground placeholder:text-muted-foreground selection:bg-secondary selection:text-secondary-foreground",
    "border-input bg-background text-foreground w-full min-w-0 rounded-md border px-3 outline-none text-[13px]",
    "transition-[color,border-color,box-shadow] duration-150",
    "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-[13px] file:font-medium",
    "disabled:bg-muted disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
    // "focus-visible:border-ring focus-visible:ring-ring/35 focus-visible:ring-[3px]",
    "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/25 aria-invalid:focus-visible:border-destructive",
  ],
  {
    variants: {
      inputSize: {
        sm: "h-9",
        default: "h-[38px]",
        lg: "h-12",
      },
    },
    defaultVariants: {
      inputSize: "default",
    },
  },
);

export function Input({
  className,
  type,
  inputSize,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ inputSize }), className)}
      {...props}
    />
  );
}

/**
 * Enveloppe un `Input` et ses ornements (icône de tête, action de queue).
 * Le rembourrage du champ est déduit de ce qui est réellement présent, pour
 * qu'une icône ajoutée n'oblige jamais à retoucher la classe du champ.
 */
export function InputGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        "relative flex w-full items-center",
        "has-[>[data-slot=input-icon]]:[&>[data-slot=input]]:ps-10",
        "has-[>[data-slot=input-action]]:[&>[data-slot=input]]:pe-10",
        className,
      )}
      {...props}
    />
  );
}

/** Repère muet : il nomme le champ, il ne se clique pas. */
export function InputIcon({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="input-icon"
      aria-hidden="true"
      className={cn(
        "text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex w-10 items-center justify-center [&_svg]:size-3.5 [&_svg]:shrink-0",
        "group-data-[invalid=true]/field:text-destructive",
        className,
      )}
      {...props}
    />
  );
}

/** Fin de champ cliquable : révéler un mot de passe, vider une recherche. */
export function InputAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-action"
      className={cn(
        "absolute inset-y-0 end-0 flex items-center justify-center pe-1",
        "[&>button]:text-muted-foreground [&>button]:hover:text-foreground [&>button]:focus-visible:ring-ring/35 [&>button]:flex [&>button]:size-8 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-sm [&>button]:outline-none [&>button]:focus-visible:ring-[3px]",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}
