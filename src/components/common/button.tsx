"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  loadingLabel?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      loadingLabel,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={props.disabled || loading}
        className={cn(
          "focus-ring inline-flex items-center justify-center rounded-xl border font-semibold transition duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60",
          variant === "primary" &&
            "border-primary/10 bg-gradient-to-br from-primary to-primaryDeep text-white shadow-soft hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-lift",
          variant === "secondary" &&
            "border-border/80 bg-white/80 text-heading shadow-[inset_0_1px_0_rgba(255,255,255,0.88)] hover:-translate-y-0.5 hover:bg-white hover:shadow-soft",
          variant === "ghost" && "border-transparent bg-transparent text-body hover:bg-white/75 hover:text-heading",
          variant === "danger" && "border-rose bg-rose text-white hover:bg-rose/90",
          size === "sm" && "h-9 px-3 text-sm",
          size === "md" && "h-10 px-4 text-sm",
          size === "lg" && "h-12 px-5 text-base",
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-r-transparent" />
            {loadingLabel ?? "Saving..."}
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

