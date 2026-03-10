import { Card, CardContent, CardHeader } from "@/components/common/card";

export const EscalationSummaryPanel = ({
  stats
}: {
  stats: {
    awaitingHuman: number;
    assigned: number;
    overdue: number;
    resolved: number;
  };
}) => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-base font-semibold text-heading">Escalation summary</h3>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-amber/25 bg-amberSoft p-3">
          <p className="text-xs text-amber">Awaiting</p>
          <p className="text-xl font-semibold text-heading">{stats.awaitingHuman}</p>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primarySoft p-3">
          <p className="text-xs text-primaryDeep">Assigned</p>
          <p className="text-xl font-semibold text-heading">{stats.assigned}</p>
        </div>
        <div className="rounded-xl border border-rose/25 bg-roseSoft p-3">
          <p className="text-xs text-rose">Overdue</p>
          <p className="text-xl font-semibold text-heading">{stats.overdue}</p>
        </div>
        <div className="rounded-xl border border-teal/25 bg-tealSoft p-3">
          <p className="text-xs text-teal">Resolved</p>
          <p className="text-xl font-semibold text-heading">{stats.resolved}</p>
        </div>
      </CardContent>
    </Card>
  );
};

