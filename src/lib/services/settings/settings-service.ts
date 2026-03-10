import { repository } from "@/lib/repositories";
import {
  assistantBehaviorSchema,
  workspaceSettingsSchema
} from "@/lib/validation/settings";
import { AppError } from "@/lib/security/errors";

const workspaceSettings = {
  companyName: "Northline Support",
  supportEmail: "support@northline.example",
  defaultLanguage: "English",
  timezone: "Europe/Budapest"
};

const notificationSettings = {
  emailNotifications: true,
  escalationAlerts: true,
  digestFrequency: "DAILY" as const
};

export const settingsService = {
  async getWorkspaceSettings() {
    return workspaceSettings;
  },

  async updateWorkspaceSettings(payload: unknown) {
    const parsed = workspaceSettingsSchema.safeParse(payload);
    if (!parsed.success) {
      throw new AppError("Invalid workspace settings", 422);
    }

    Object.assign(workspaceSettings, parsed.data);
    return workspaceSettings;
  },

  async getAssistantSettings() {
    return repository.getAssistantSettings();
  },

  async updateAssistantSettings(payload: unknown) {
    const parsed = assistantBehaviorSchema.safeParse(payload);
    if (!parsed.success) {
      throw new AppError("Invalid assistant settings", 422);
    }

    return repository.updateAssistantSettings(parsed.data);
  },

  async getNotificationSettings() {
    return notificationSettings;
  },

  async updateNotificationSettings(payload: Partial<typeof notificationSettings>) {
    Object.assign(notificationSettings, payload);
    return notificationSettings;
  }
};

