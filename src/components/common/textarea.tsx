"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "input-surface focus-ring w-full px-3 py-2.5 text-sm font-medium text-heading placeholder:font-normal placeholder:text-muted",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

