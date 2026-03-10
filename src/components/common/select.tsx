"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        "input-surface focus-ring h-11 w-full px-3 text-sm font-medium text-heading",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";

