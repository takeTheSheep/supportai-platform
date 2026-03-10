import { repository } from "@/lib/repositories";
import { widgetConfigSchema } from "@/lib/validation/widget";
import { AppError } from "@/lib/security/errors";

export const widgetService = {
  async getConfig() {
    return repository.getWidgetConfig();
  },

  async updateConfig(payload: unknown) {
    const parsed = widgetConfigSchema.safeParse(payload);
    if (!parsed.success) {
      throw new AppError("Invalid widget configuration", 422);
    }

    const existing = await repository.getWidgetConfig();
    return repository.updateWidgetConfig({
      ...existing,
      ...parsed.data
    });
  }
};

