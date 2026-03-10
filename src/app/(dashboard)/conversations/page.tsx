import { ConversationsPageClient } from "@/components/dashboard/conversations-page-client";
import { conversationService } from "@/lib/services/conversations/conversation-service";

export default async function ConversationsPage() {
  const result = await conversationService.list({ page: 1, pageSize: 50 });

  return <ConversationsPageClient conversations={result.rows} />;
}

