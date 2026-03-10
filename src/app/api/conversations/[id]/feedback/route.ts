import { NextRequest } from "next/server";
import { conversationService } from "@/lib/services/conversations/conversation-service";
import { requireApiSession } from "@/lib/auth/api-session";
import { feedbackSchema } from "@/lib/validation/conversation";
import { fail, ok } from "@/lib/security/http";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  const authResult = await requireApiSession();
  if ("error" in authResult) return authResult.error;

  const { id } = await params;
  const body = await req.json();

  const parsed = feedbackSchema.safeParse({
    ...body,
    conversationId: id
  });

  if (!parsed.success) {
    return fail("Invalid feedback payload", 422, parsed.error.flatten());
  }

  const updated = await conversationService.addFeedback(id, parsed.data.rating);
  if (!updated) return fail("Conversation not found", 404);

  return ok({ data: updated });
}

