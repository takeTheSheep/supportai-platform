import { cn } from "@/lib/utils/cn";

export const Avatar = ({
  name,
  className
}: {
  name: string;
  className?: string;
}) => {
  const initials = name
    .split(" ")
    .map((piece) => piece[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      aria-label={name}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/25 bg-gradient-to-b from-primarySoft to-white text-xs font-semibold text-primaryDeep shadow-soft",
        className
      )}
    >
      {initials}
    </div>
  );
};

