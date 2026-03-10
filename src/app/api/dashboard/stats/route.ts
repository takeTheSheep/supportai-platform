import { analyticsService } from "@/lib/services/analytics/analytics-service";
import { requireApiSession } from "@/lib/auth/api-session";
import { fail, ok } from "@/lib/security/http";

export async function GET() {
  const authResult = await requireApiSession();
  if ("error" in authResult) return authResult.error;

  try {
    const data = await analyticsService.getDashboardOverview();
    return ok({ data });
  } catch {
    return fail("Unable to load dashboard stats", 500);
  }
}

