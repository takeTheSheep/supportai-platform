import { Button } from "@/components/common/button";

export const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) => {
  return (
    <div className="surface-card flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-panel to-surface px-6 py-12 text-center">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-panel text-sm font-semibold text-primary shadow-soft">
        AI
      </span>
      <h3 className="text-lg font-semibold text-heading">{title}</h3>
      <p className="max-w-md text-sm text-muted">{description}</p>
      {actionLabel && onAction ? (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
};

