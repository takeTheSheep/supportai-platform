import { cn } from "@/lib/utils/cn";

export const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-lg border border-border/70 bg-gradient-to-r from-surface via-primarySoft/35 to-surface bg-[length:200%_100%]",
        className
      )}
      aria-hidden="true"
    />
  );
};

