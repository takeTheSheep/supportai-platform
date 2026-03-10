import { NextRequest } from "next/server";
import { widgetService } from "@/lib/services/widget/widget-service";
import { requireApiSession } from "@/lib/auth/api-session";
import { safeErrorResponse } from "@/lib/security/errors";
import { fail, ok } from "@/lib/security/http";

export async function GET() {
  const authResult = await requireApiSession();
  if ("error" in authResult) return authResult.error;

  try {
    const data = await widgetService.getConfig();
    return ok({ data });
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
    const data = await widgetService.updateConfig(body);
    return ok({ data });
  } catch (error) {
    const safe = safeErrorResponse(error);
    return fail(safe.message, safe.statusCode);
  }
}

