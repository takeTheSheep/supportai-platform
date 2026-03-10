import { EscalationQueue } from "@/components/dashboard/escalation-queue";
import { escalationService } from "@/lib/services/escalations/escalation-service";

export default async function InboxPage() {
  const queue = await escalationService.listQueue();

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Inbox</p>
        <h1 className="text-2xl font-semibold text-heading">Escalations requiring human attention</h1>
        <p className="mt-1 text-sm text-muted">
          Prioritize high-risk conversations with urgency visibility, assignment controls, and faster handoff.
        </p>
      </div>
      <EscalationQueue initialQueue={queue} />
    </div>
  );
}

