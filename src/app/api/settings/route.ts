import { NextRequest } from "next/server";
import { settingsService } from "@/lib/services/settings/settings-service";
import { requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/security/http";
import { safeErrorResponse } from "@/lib/security/errors";

export async function GET(req: NextRequest) {
  const authResult = await requireApiSession();
  if ("error" in authResult) return authResult.error;

  const section = req.nextUrl.searchParams.get("section");

  try {
    if (section === "workspace") {
      return ok({ data: await settingsService.getWorkspaceSettings() });
    }

    if (section === "assistant") {
      return ok({ data: await settingsService.getAssistantSettings() });
    }

    if (section === "notifications") {
      return ok({ data: await settingsService.getNotificationSettings() });
    }

    return ok({
      data: {
        workspace: await settingsService.getWorkspaceSettings(),
        assistant: await settingsService.getAssistantSettings(),
        notifications: await settingsService.getNotificationSettings()
      }
    });
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
    const section = body.section;

    if (section === "workspace") {
      return ok({ data: await settingsService.updateWorkspaceSettings(body.data) });
    }

    if (section === "assistant") {
      return ok({ data: await settingsService.updateAssistantSettings(body.data) });
    }

    if (section === "notifications") {
      return ok({ data: await settingsService.updateNotificationSettings(body.data) });
    }

    return fail("Unknown settings section", 422);
  } catch (error) {
    const safe = safeErrorResponse(error);
    return fail(safe.message, safe.statusCode);
  }
}

