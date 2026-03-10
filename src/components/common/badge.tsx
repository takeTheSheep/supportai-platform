import { cn } from "@/lib/utils/cn";

export const Badge = ({
  tone = "neutral",
  className,
  children
}: {
  tone?: "neutral" | "blue" | "teal" | "violet" | "amber" | "rose";
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <span
      className={cn(
        "status-pill",
        tone === "neutral" && "border-border bg-surface text-body",
        tone === "blue" && "border-primary/20 bg-primarySoft text-primaryDeep",
        tone === "teal" && "border-teal/25 bg-tealSoft text-teal",
        tone === "violet" && "border-violet/20 bg-violetSoft text-violet",
        tone === "amber" && "border-amber/25 bg-amberSoft text-amber",
        tone === "rose" && "border-rose/25 bg-roseSoft text-rose",
        className
      )}
    >
      {children}
    </span>
  );
};

