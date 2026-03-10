import { z } from "zod";

export const workspaceSettingsSchema = z.object({
  companyName: z.string().min(2).max(120),
  supportEmail: z.string().email().max(160),
  defaultLanguage: z.string().min(2).max(32),
  timezone: z.string().min(2).max(64)
});

export const assistantBehaviorSchema = z.object({
  responseStyle: z.enum(["CONCISE", "BALANCED", "DETAILED"]),
  tonePreset: z.enum(["PROFESSIONAL", "FRIENDLY", "ENTERPRISE"]),
  escalationThreshold: z.number().min(20).max(100),
  confidenceThreshold: z.number().min(20).max(100),
  restrictedTopics: z.array(z.string().min(2).max(64)).max(20),
  fallbackMessage: z.string().min(8).max(220)
});

export const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean(),
  escalationAlerts: z.boolean(),
  digestFrequency: z.enum(["OFF", "DAILY", "WEEKLY"])
});

