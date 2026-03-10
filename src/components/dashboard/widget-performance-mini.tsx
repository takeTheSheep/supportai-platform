import { Card, CardContent, CardHeader } from "@/components/common/card";

export const WidgetPerformanceMini = ({
  data
}: {
  data: {
    openRate: number;
    interactionRate: number;
    completionRate: number;
  };
}) => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-base font-semibold text-heading">Widget performance</h3>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="mb-1 text-xs text-muted">Open rate</p>
          <div className="h-2 rounded-full border border-border bg-surface">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${data.openRate}%` }} />
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs text-muted">Interaction rate</p>
          <div className="h-2 rounded-full border border-border bg-surface">
            <div className="h-2 rounded-full bg-teal" style={{ width: `${data.interactionRate}%` }} />
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs text-muted">Completion rate</p>
          <div className="h-2 rounded-full border border-border bg-surface">
            <div className="h-2 rounded-full bg-violet" style={{ width: `${data.completionRate}%` }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

