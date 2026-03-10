import { NextRequest } from "next/server";
import { conversationService } from "@/lib/services/conversations/conversation-service";
import { requireApiSession } from "@/lib/auth/api-session";
import { rateLimit } from "@/lib/rate-limit";
import { safeErrorResponse } from "@/lib/security/errors";
import { fail, ok } from "@/lib/security/http";

export async function GET(req: NextRequest) {
  const authResult = await requireApiSession();
  if ("error" in authResult) return authResult.error;

  const limiter = await rateLimit(`conversations:list:${authResult.session.user.id}`, 60, 60_000);
  if (!limiter.allowed) {
    return fail("Rate limit exceeded", 429, { resetAt: limiter.resetAt.toISOString() });
  }

  try {
    const { searchParams } = new URL(req.url);

    const result = await conversationService.list({
      page: searchParams.get("page") ?? 1,
      pageSize: searchParams.get("pageSize") ?? 10,
      query: searchParams.get("query") ?? undefined,
      status: searchParams.get("status") ?? undefined,
      feedback: searchParams.get("feedback") ?? undefined,
      topic: searchParams.get("topic") ?? undefined,
      assignedOwner: searchParams.get("assignedOwner") ?? undefined,
      scenario: searchParams.get("scenario") ?? undefined,
      escalated: searchParams.get("escalated") ?? undefined
    });

    return ok(result);
  } catch (error) {
    const safe = safeErrorResponse(error);
    return fail(safe.message, safe.statusCode);
  }
}

