import { NextRequest } from "next/server";
import { createChatMessageSchema } from "@/lib/validation/conversation";
import { conversationService } from "@/lib/services/conversations/conversation-service";
import { rateLimit } from "@/lib/rate-limit";
import { fail, ok } from "@/lib/security/http";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  const limiter = await rateLimit(`demo-chat:${ip}`, 25, 60_000);

  if (!limiter.allowed) {
    return fail("Rate limit exceeded", 429, { resetAt: limiter.resetAt.toISOString() });
  }

  try {
    const body = await req.json();
    const parsed = createChatMessageSchema.safeParse(body);

    if (!parsed.success) {
      return fail("Invalid message payload", 422, parsed.error.flatten());
    }

    const response = await conversationService.generateDemoReply(
      parsed.data.scenario,
      parsed.data.message,
      parsed.data.responseMode
    );

    return ok({ data: response });
  } catch (error) {
    return fail("Unable to generate assistant response", 500, {
      details: process.env.NODE_ENV === "development" ? String(error) : undefined
    });
  }
}

