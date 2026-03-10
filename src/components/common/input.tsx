"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "input-surface focus-ring h-11 w-full px-3 text-sm font-medium text-heading placeholder:font-normal placeholder:text-muted transition duration-200",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

