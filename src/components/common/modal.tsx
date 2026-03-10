"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const Modal = ({
  open,
  title,
  onClose,
  children
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-heading/35 p-4 backdrop-blur-[2px] animate-fade-in"
      onMouseDown={onClose}
      role="presentation"
    >
      <div
        className={cn("surface-card w-full max-w-lg animate-fade-up")}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border/90 px-5 py-4">
          <h3 className="text-lg font-semibold text-heading">{title}</h3>
          <button
            className="focus-ring rounded-lg border border-border bg-surface p-2 text-muted transition hover:text-heading"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

