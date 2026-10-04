"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { cn } from "@aliko/ui";

export function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "border-input bg-background peer size-4 shrink-0 rounded-[4px] border outline-none",
        "transition-[color,background-color,border-color,box-shadow] duration-150",
        "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground",
        "focus-visible:border-ring focus-visible:ring-ring/35 focus-visible:ring-[3px]",
        "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/25",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
