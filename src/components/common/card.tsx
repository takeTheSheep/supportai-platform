import { cn } from "@/lib/utils/cn";

export const Card = ({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={cn("surface-card", className)}>{children}</div>;
};

export const CardHeader = ({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={cn("border-b border-border/90 px-5 py-4", className)}>{children}</div>
);

export const CardContent = ({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={cn("p-5", className)}>{children}</div>;

