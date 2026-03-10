"use client";

import { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { AlertCircle, CheckCircle2, Flag, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";
import { Card, CardContent, CardHeader } from "@/components/common/card";
import { Input } from "@/components/common/input";
import { Select } from "@/components/common/select";
import { SlideOver } from "@/components/common/slide-over";
import { Textarea } from "@/components/common/textarea";
import { ConversationRecord, TeamMemberStat } from "@/types/domain";

export const ConversationDetailView = ({
  initialConversation,
  team
}: {
  initialConversation: ConversationRecord;
  team: TeamMemberStat[];
}) => {
  const [conversation, setConversation] = useState(initialConversation);
  const [noteDraft, setNoteDraft] = useState("");
  const [showAssign, setShowAssign] = useState(false);
  const [showEscalation, setShowEscalation] = useState(false);
  const [assignAgentId, setAssignAgentId] = useState(team[0]?.id ?? "");
  const [escalationReason, setEscalationReason] = useState("Complex policy exception");
  const [escalationPriority, setEscalationPriority] = useState("MEDIUM");
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const postAction = async (action: () => Promise<void>) => {
    try {
      await action();
    } catch {
      setStatusMessage({ type: "error", text: "Action failed. Please retry." });
    }
  };

  const assignAgent = async () => {
    await postAction(async () => {
      const response = await fetch(`/api/conversations/${conversation.id}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId: assignAgentId })
      }).then((res) => res.json());

      if (response.data) {
        setConversation(response.data);
        setShowAssign(false);
        setStatusMessage({ type: "success", text: "Conversation assigned successfully." });
      }
    });
  };

  const markResolved = async () => {
    await postAction(async () => {
      const response = await fetch(`/api/conversations/${conversation.id}/resolve`, {
        method: "POST"
      }).then((res) => res.json());

      if (response.data) {
        setConversation(response.data);
        setStatusMessage({ type: "success", text: "Conversation marked as resolved." });
      }
    });
  };

  const addNote = async () => {
    if (noteDraft.trim().length < 2) return;

    await postAction(async () => {
      const response = await fetch(`/api/conversations/${conversation.id}/note`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: noteDraft.trim() })
      }).then((res) => res.json());

      if (response.data) {
        setConversation(response.data);
        setNoteDraft("");
        setStatusMessage({ type: "success", text: "Internal note added." });
      }
    });
  };

  const escalate = async () => {
    await postAction(async () => {
      const response = await fetch(`/api/conversations/${conversation.id}/escalate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: escalationReason, priority: escalationPriority })
      }).then((res) => res.json());

      if (response.data) {
        setConversation((prev) => ({
          ...prev,
          status: "ESCALATED",
          escalationState: "NEW_ESCALATION"
        }));
        setShowEscalation(false);
        setStatusMessage({ type: "success", text: "Escalation created and queued for human follow-up." });
      }
    });
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[1.38fr_1fr]">
      <Card>
        <CardHeader className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-heading">Conversation {conversation.id}</h1>
            <p className="text-xs text-muted">
              {conversation.customerLabel} • Updated {formatDistanceToNow(new Date(conversation.updatedAt), { addSuffix: true })}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={conversation.status === "RESOLVED" ? "teal" : conversation.status === "ESCALATED" ? "amber" : "violet"}>
              {conversation.status}
            </Badge>
            {conversation.flaggedForReview ? <Badge tone="rose">Flagged for review</Badge> : null}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {statusMessage ? (
            <p
              className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold ${
                statusMessage.type === "success"
                  ? "border-teal/30 bg-tealSoft text-teal"
                  : "border-rose/30 bg-roseSoft text-rose"
              }`}
            >
              {statusMessage.type === "success" ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
              {statusMessage.text}
            </p>
          ) : null}

          <div className="space-y-3 rounded-2xl border border-border bg-surface p-4">
            {conversation.messages.map((message) => (
              <div
                key={message.id}
                className={message.sender === "USER" ? "ml-auto max-w-[84%] animate-slide-left" : "max-w-[88%] animate-slide-right"}
              >
                <div
                  className={
                    message.sender === "USER"
                      ? "rounded-2xl rounded-br-md border border-primaryDeep/30 bg-gradient-to-b from-primary to-primaryDeep px-3.5 py-2.5 text-sm text-white shadow-soft"
                      : "rounded-2xl rounded-bl-md border border-border bg-panel px-3.5 py-2.5 text-sm text-body shadow-soft"
                  }
                >
                  {message.text}
                  {typeof message.confidence === "number" ? (
                    <p className="mt-2 text-[11px] text-muted">Confidence {Math.round(message.confidence * 100)}%</p>
                  ) : null}
                </div>
                <p className="mt-1 text-[11px] text-muted">{format(new Date(message.createdAt), "MMM d, HH:mm")}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-heading">Internal notes</p>
            <div className="space-y-2">
              {conversation.internalNotes.length === 0 ? (
                <p className="rounded-xl border border-border bg-surface p-3 text-xs text-muted">No internal notes yet.</p>
              ) : (
                conversation.internalNotes.map((note) => (
                  <p key={note} className="rounded-xl border border-border bg-panel p-3 text-sm text-body">
                    {note}
                  </p>
                ))
              )}
            </div>
            <div className="mt-3 flex gap-2">
              <Input
                value={noteDraft}
                onChange={(event) => setNoteDraft(event.target.value)}
                placeholder="Add internal note"
              />
              <Button variant="secondary" onClick={addNote}>
                Add note
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-heading">Actions</h2>
        </CardHeader>
        <CardContent className="space-y-3">
          <button
            type="button"
            className="focus-ring w-full rounded-xl border border-border bg-surface px-3 py-2 text-left text-sm font-semibold text-body transition hover:bg-panel"
            onClick={() => setShowAssign(true)}
          >
            Assign to agent
          </button>
          <button
            type="button"
            className="focus-ring w-full rounded-xl border border-border bg-surface px-3 py-2 text-left text-sm font-semibold text-body transition hover:bg-panel"
            onClick={markResolved}
          >
            Mark resolved
          </button>
          <button
            type="button"
            className="focus-ring w-full rounded-xl border border-border bg-surface px-3 py-2 text-left text-sm font-semibold text-body transition hover:bg-panel"
            onClick={() =>
              setConversation((prev) => ({
                ...prev,
                flaggedForReview: true
              }))
            }
          >
            Flag for review
          </button>
          <button
            type="button"
            className="focus-ring w-full rounded-xl border border-border bg-surface px-3 py-2 text-left text-sm font-semibold text-body transition hover:bg-panel"
            onClick={() => setShowEscalation(true)}
          >
            Escalate
          </button>

          <div className="rounded-xl border border-border bg-surface p-3 text-sm">
            <p className="text-xs text-muted">Topic classification</p>
            <p className="font-semibold text-heading">{conversation.topic}</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-3 text-sm">
            <p className="text-xs text-muted">Confidence indicator</p>
            <p className="font-semibold text-heading">{Math.round(conversation.confidence * 100)}%</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-3 text-sm">
            <p className="mb-1 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted">
              <ShieldAlert size={13} />
              Suggested next actions
            </p>
            <ul className="space-y-1 text-xs text-body">
              <li>- Share knowledge article excerpt</li>
              <li>- Assign specialist for edge-case review</li>
              <li>- Confirm SLA expectation with customer</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <SlideOver open={showAssign} title="Assign conversation" onClose={() => setShowAssign(false)}>
        <div className="space-y-3">
          <p className="text-sm text-muted">Choose the owner for this thread and keep queue accountability clear.</p>
          <Select value={assignAgentId} onChange={(event) => setAssignAgentId(event.target.value)}>
            {team.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name} ({member.role})
              </option>
            ))}
          </Select>
          <Button onClick={assignAgent}>Assign</Button>
        </div>
      </SlideOver>

      <SlideOver open={showEscalation} title="Escalation details" onClose={() => setShowEscalation(false)}>
        <div className="space-y-3">
          <p className="text-sm text-muted">Capture a clear escalation reason so the assignee can respond faster.</p>
          <Select
            value={escalationPriority}
            onChange={(event) => setEscalationPriority(event.target.value)}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </Select>
          <div className="flex flex-wrap gap-2">
            {[
              "Policy exception",
              "Customer requested human follow-up",
              "Low confidence answer"
            ].map((preset) => (
              <button key={preset} type="button" className="chip" onClick={() => setEscalationReason(preset)}>
                {preset}
              </button>
            ))}
          </div>
          <Textarea
            value={escalationReason}
            onChange={(event) => setEscalationReason(event.target.value)}
            rows={5}
          />
          <Button className="gap-2" onClick={escalate}>
            <Flag size={15} />
            Escalate now
          </Button>
        </div>
      </SlideOver>
    </div>
  );
};

