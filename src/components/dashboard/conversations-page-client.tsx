"use client";

import { useState } from "react";
import { ConversationsTable } from "@/components/tables/conversations-table";
import { ConversationRecord } from "@/types/domain";

export const ConversationsPageClient = ({
  conversations
}: {
  conversations: ConversationRecord[];
}) => {
  const [scenario, setScenario] = useState("ALL");

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Conversations</p>
        <h1 className="text-2xl font-semibold text-heading">Conversation management</h1>
        <p className="mt-1 text-sm text-muted">
          Search, filter, and route conversations with fast transcript access and operational context.
        </p>
      </div>
      <ConversationsTable
        conversations={conversations}
        selectedScenario={scenario}
        onScenarioChange={setScenario}
      />
    </div>
  );
};

