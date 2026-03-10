"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const SlideOver = ({
  open,
  title,
  onClose,
  children,
  width = "md"
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  width?: "sm" | "md" | "lg";
}) => {
  useEffect(() => {
    if (!open) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-heading/35 backdrop-blur-[2px] animate-fade-in" onClick={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
        className={cn(
          "absolute right-0 top-0 flex h-full flex-col border-l border-border/90 bg-panel shadow-float animate-slide-left",
          width === "sm" && "w-full max-w-sm",
          width === "md" && "w-full max-w-md",
          width === "lg" && "w-full max-w-lg"
        )}
      >
        <div className="flex items-center justify-between border-b border-border/90 px-5 py-4">
          <h3 className="text-lg font-semibold text-heading">{title}</h3>
          <button
            className="focus-ring rounded-lg border border-border bg-surface p-2 text-muted transition hover:text-heading"
            onClick={onClose}
            aria-label="Close panel"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </aside>
    </div>
  );
};

