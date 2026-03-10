import { conversationService } from "@/lib/services/conversations/conversation-service";
import { requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/security/http";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_: Request, { params }: RouteContext) {
  const authResult = await requireApiSession();
  if ("error" in authResult) return authResult.error;

  const { id } = await params;
  const conversation = await conversationService.getById(id);

  if (!conversation) {
    return fail("Conversation not found", 404);
  }

  return ok({ data: conversation });
}

