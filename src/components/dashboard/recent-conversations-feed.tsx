import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/common/badge";
import { Card, CardContent, CardHeader } from "@/components/common/card";
import { ConversationRecord } from "@/types/domain";

export const RecentConversationsFeed = ({
  conversations
}: {
  conversations: ConversationRecord[];
}) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-heading">Recent conversations</h3>
        <Badge tone="blue">Live feed</Badge>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {conversations.map((conversation) => {
          const latestMessage = conversation.messages[conversation.messages.length - 1];
          return (
            <Link
              key={conversation.id}
              href={`/conversations/${conversation.id}`}
              className="block rounded-xl border border-border bg-surface px-3 py-2.5 transition duration-200 hover:border-primary/40 hover:bg-panel"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-heading">{conversation.customerLabel}</p>
                <div className="flex items-center gap-1.5">
                  {conversation.escalationState ? <Badge tone="amber">Escalated</Badge> : null}
                  <Badge tone={conversation.feedback === "NOT_HELPFUL" ? "rose" : conversation.feedback === "HELPFUL" ? "teal" : "neutral"}>
                    {conversation.feedback.replace("_", " ")}
                  </Badge>
                </div>
              </div>
              <p className="mt-1 text-xs text-body">{conversation.topic}</p>
              <p className="mt-1 line-clamp-1 text-[11px] text-muted">{latestMessage?.text ?? "No transcript yet"}</p>
              <p className="mt-1 text-[11px] text-muted">
                Updated {formatDistanceToNow(new Date(conversation.updatedAt), { addSuffix: true })}
              </p>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
};

