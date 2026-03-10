import { NextRequest } from "next/server";
import { knowledgeService } from "@/lib/services/knowledge/knowledge-service";
import { requireApiSession } from "@/lib/auth/api-session";
import { safeErrorResponse } from "@/lib/security/errors";
import { fail, ok } from "@/lib/security/http";

export async function GET(req: NextRequest) {
  const authResult = await requireApiSession();
  if ("error" in authResult) return authResult.error;

  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") ?? undefined;
    const category = searchParams.get("category") ?? undefined;

    const data = await knowledgeService.list(query, category);
    return ok({ data });
  } catch (error) {
    const safe = safeErrorResponse(error);
    return fail(safe.message, safe.statusCode);
  }
}

export async function POST(req: NextRequest) {
  const authResult = await requireApiSession();
  if ("error" in authResult) return authResult.error;

  try {
    const body = await req.json();

    if (body.action === "duplicate") {
      const duplicated = await knowledgeService.duplicate(body);
      return ok({ data: duplicated }, 201);
    }

    if (body.action === "archive") {
      const archived = await knowledgeService.archive(body);
      return ok({ data: archived });
    }

    const created = await knowledgeService.create(body);
    return ok({ data: created }, 201);
  } catch (error) {
    const safe = safeErrorResponse(error);
    return fail(safe.message, safe.statusCode);
  }
}

export async function PATCH(req: NextRequest) {
  const authResult = await requireApiSession();
  if ("error" in authResult) return authResult.error;

  try {
    const body = await req.json();
    const id = body.articleId;

    if (!id) return fail("articleId is required", 422);

    const updated = await knowledgeService.update(id, body);
    return ok({ data: updated });
  } catch (error) {
    const safe = safeErrorResponse(error);
    return fail(safe.message, safe.statusCode);
  }
}

