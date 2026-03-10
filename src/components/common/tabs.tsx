"use client";

import { cn } from "@/lib/utils/cn";

export const SegmentedTabs = <T extends string>({
  value,
  options,
  onChange,
  className,
  emphasis = "normal"
}: {
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (value: T) => void;
  className?: string;
  emphasis?: "normal" | "strong";
}) => {
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value)
  );
  const strong = emphasis === "strong";

  return (
    <div
      className={cn(
        "relative inline-grid grid-flow-col auto-cols-fr rounded-xl border border-border bg-surface/80 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]",
        strong && "border-primary/30 bg-panel shadow-soft",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-1 left-1 top-1 rounded-lg transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          strong
            ? "bg-gradient-to-b from-primary to-primaryDeep shadow-lift"
            : "bg-white shadow-soft"
        )}
        style={{
          width: `calc((100% - 0.5rem) / ${options.length || 1})`,
          transform: `translateX(${activeIndex * 100}%)`
        }}
      />
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "focus-ring relative z-10 rounded-lg px-3 py-1.5 text-sm font-semibold transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            value === option.value
              ? strong
                ? "text-white"
                : "text-heading"
              : strong
              ? "text-body/70 hover:bg-surface hover:text-heading"
              : "text-muted hover:text-heading hover:bg-white/70"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

