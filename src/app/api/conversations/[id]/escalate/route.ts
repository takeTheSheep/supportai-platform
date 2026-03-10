import { NextRequest } from "next/server";
import { conversationService } from "@/lib/services/conversations/conversation-service";
import { requireApiSession } from "@/lib/auth/api-session";
import { escalationSchema } from "@/lib/validation/conversation";
import { fail, ok } from "@/lib/security/http";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  const authResult = await requireApiSession();
  if ("error" in authResult) return authResult.error;

  const { id } = await params;
  const body = await req.json();

  const parsed = escalationSchema.safeParse({
    ...body,
    conversationId: id
  });

  if (!parsed.success) {
    return fail("Invalid escalation payload", 422, parsed.error.flatten());
  }

  const escalation = await conversationService.escalate(
    id,
    parsed.data.reason,
    parsed.data.priority
  );

  if (!escalation) return fail("Conversation not found", 404);

  return ok({ data: escalation });
}

