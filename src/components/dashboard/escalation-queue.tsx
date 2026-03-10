"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, CheckCircle2, Clock3 } from "lucide-react";
import { EscalationRecord } from "@/types/domain";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { Card, CardContent, CardHeader } from "@/components/common/card";
import { Input } from "@/components/common/input";
import { Select } from "@/components/common/select";

export const EscalationQueue = ({ initialQueue }: { initialQueue: EscalationRecord[] }) => {
  const [queue, setQueue] = useState(initialQueue);
  const [noteDraft, setNoteDraft] = useState<Record<string, string>>({});
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const summary = useMemo(() => {
    const overdue = queue.filter(
      (item) => new Date(item.dueAt).getTime() < Date.now() && item.status !== "RESOLVED"
    ).length;

    return {
      open: queue.filter((item) => item.status !== "RESOLVED").length,
      overdue,
      resolved: queue.filter((item) => item.status === "RESOLVED").length
    };
  }, [queue]);

  return (
    <Card>
      <CardHeader className="space-y-3">
        <div>
          <h1 className="text-xl font-semibold text-heading">Escalation inbox</h1>
          <p className="text-xs text-muted">Operational queue with SLA-like urgency indicators.</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface p-2.5 text-xs">
            <p className="text-muted">Open escalations</p>
            <p className="text-lg font-semibold text-heading">{summary.open}</p>
          </div>
          <div className="rounded-xl border border-rose/25 bg-roseSoft p-2.5 text-xs">
            <p className="text-rose">Overdue</p>
            <p className="text-lg font-semibold text-heading">{summary.overdue}</p>
          </div>
          <div className="rounded-xl border border-teal/25 bg-tealSoft p-2.5 text-xs">
            <p className="text-teal">Resolved</p>
            <p className="text-lg font-semibold text-heading">{summary.resolved}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {statusNotice ? (
          <p className="inline-flex items-center gap-1 rounded-lg border border-teal/25 bg-tealSoft px-2.5 py-1 text-xs font-semibold text-teal">
            <CheckCircle2 size={13} />
            {statusNotice}
          </p>
        ) : null}
        {queue.map((item) => {
          const dueInMs = new Date(item.dueAt).getTime() - Date.now();
          const overdue = dueInMs < 0 && item.status !== "RESOLVED";
          const urgency = overdue
            ? "CRITICAL"
            : dueInMs < 3 * 60 * 60 * 1000
              ? "HIGH"
              : dueInMs < 8 * 60 * 60 * 1000
                ? "MEDIUM"
                : "LOW";

          return (
            <article
              key={item.id}
              className={`rounded-2xl border bg-panel p-4 transition duration-200 ${
                overdue ? "border-rose/60 shadow-soft" : "border-border"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-heading">{item.customerLabel}</p>
                  <p className="text-xs text-muted">Reason: {item.reason}</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted">
                    <Clock3 size={12} />
                    Due {formatDistanceToNow(new Date(item.dueAt), { addSuffix: true })}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge tone={urgency === "CRITICAL" || urgency === "HIGH" ? "rose" : urgency === "MEDIUM" ? "amber" : "violet"}>
                    {urgency} urgency
                  </Badge>
                  <Badge tone={item.priority === "HIGH" || item.priority === "CRITICAL" ? "rose" : "amber"}>
                    {item.priority}
                  </Badge>
                  <Badge tone={item.status === "RESOLVED" ? "teal" : item.status === "ASSIGNED" ? "blue" : "amber"}>
                    {item.status.replaceAll("_", " ")}
                  </Badge>
                  {overdue ? <Badge tone="rose">Overdue</Badge> : null}
                </div>
              </div>

              {overdue ? (
                <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-rose">
                  <AlertTriangle size={13} />
                  SLA risk: escalation has passed expected response time.
                </p>
              ) : null}

              <div className="mt-3 grid gap-2 md:grid-cols-[1fr_1fr_1fr_auto]">
                <Select
                  value={item.assignedAgent ?? "UNASSIGNED"}
                  onChange={(event) =>
                    setQueue((prev) =>
                      prev.map((row) =>
                        row.id === item.id
                          ? {
                              ...row,
                              assignedAgent:
                                event.target.value === "UNASSIGNED"
                                  ? null
                                  : event.target.value,
                              status: event.target.value === "UNASSIGNED" ? "NEW_ESCALATION" : "ASSIGNED"
                            }
                          : row
                      )
                    )
                  }
                >
                  <option value="UNASSIGNED">Unassigned</option>
                  <option value="agent_1">Nora Patel</option>
                  <option value="agent_2">Marta Chen</option>
                  <option value="agent_3">Leo Hayes</option>
                </Select>
                <Select
                  value={item.priority}
                  onChange={(event) =>
                    setQueue((prev) =>
                      prev.map((row) =>
                        row.id === item.id
                          ? { ...row, priority: event.target.value as EscalationRecord["priority"] }
                          : row
                      )
                    )
                  }
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="CRITICAL">Critical</option>
                </Select>
                <Input
                  placeholder="Add note"
                  value={noteDraft[item.id] ?? ""}
                  onChange={(event) =>
                    setNoteDraft((prev) => ({
                      ...prev,
                      [item.id]: event.target.value
                    }))
                  }
                />
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setQueue((prev) =>
                        prev.map((row) =>
                          row.id === item.id ? { ...row, status: "RESOLVED" } : row
                        )
                      );
                      setStatusNotice(`Escalation ${item.id} resolved.`);
                      setTimeout(() => setStatusNotice(null), 1500);
                    }}
                  >
                    Resolve
                  </Button>
                  <Link href={`/conversations/${item.conversationId}`}>
                    <Button size="sm">Open</Button>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </CardContent>
    </Card>
  );
};

