import { notFound } from "next/navigation";
import { ConversationDetailView } from "@/components/dashboard/conversation-detail-view";
import { conversationService } from "@/lib/services/conversations/conversation-service";
import { repository } from "@/lib/repositories";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ConversationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const conversation = await conversationService.getById(id);

  if (!conversation) {
    notFound();
  }

  const team = await repository.listTeamStats();

  return <ConversationDetailView initialConversation={conversation} team={team} />;
}

