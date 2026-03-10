import { Badge } from "@/components/common/badge";
import { Card, CardContent, CardHeader } from "@/components/common/card";

export const AiPerformancePanel = ({
  data
}: {
  data: {
    helpfulFeedback: number;
    unresolvedRate: number;
    fallbackRate: number;
    confidenceBand: number[];
  };
}) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-heading">AI performance</h3>
        <Badge tone="blue">Guardrails active</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg border border-teal/25 bg-tealSoft p-2">
            <p className="text-xs text-teal">Helpful</p>
            <p className="text-lg font-semibold text-heading">{data.helpfulFeedback}%</p>
          </div>
          <div className="rounded-lg border border-amber/25 bg-amberSoft p-2">
            <p className="text-xs text-amber">Unresolved</p>
            <p className="text-lg font-semibold text-heading">{data.unresolvedRate}%</p>
          </div>
          <div className="rounded-lg border border-violet/25 bg-violetSoft p-2">
            <p className="text-xs text-violet">Fallback</p>
            <p className="text-lg font-semibold text-heading">{data.fallbackRate}%</p>
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Confidence band</p>
          <div className="flex h-3 overflow-hidden rounded-full border border-border bg-surface">
            <div className="bg-rose" style={{ width: `${data.confidenceBand[0] * 100}%` }} />
            <div
              className="bg-amber"
              style={{ width: `${Math.max(0, data.confidenceBand[1] - data.confidenceBand[0]) * 100}%` }}
            />
            <div
              className="bg-teal"
              style={{ width: `${Math.max(0, data.confidenceBand[2] - data.confidenceBand[1]) * 100}%` }}
            />
          </div>
          <p className="mt-1 text-[11px] text-muted">Low confidence responses now trigger proactive escalation suggestions.</p>
        </div>
      </CardContent>
    </Card>
  );
};

