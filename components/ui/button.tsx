"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--accent-strong)] px-4 py-2.5 text-white shadow-[0_16px_35px_rgba(30,92,82,0.22)] hover:bg-[var(--accent-stronger)] focus-visible:ring-[var(--accent-strong)]",
        secondary:
          "border border-white/65 bg-white/70 px-4 py-2.5 text-slate-700 hover:border-[var(--accent-soft)] hover:text-slate-950 focus-visible:ring-[var(--accent-soft)]",
        ghost:
          "px-3 py-2 text-slate-600 hover:bg-white/70 hover:text-slate-950 focus-visible:ring-[var(--accent-soft)]",
        subtle:
          "border border-[var(--border-strong)] bg-[var(--panel-muted)] px-4 py-2.5 text-slate-700 hover:bg-white focus-visible:ring-[var(--accent-soft)]",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-5",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
