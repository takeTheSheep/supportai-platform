import { z } from "zod";

export const widgetConfigSchema = z.object({
  primaryColor: z.string().regex(/^#([0-9A-Fa-f]{6})$/),
  greetingMessage: z.string().min(5).max(120),
  widgetTitle: z.string().min(2).max(60),
  launcherPosition: z.enum(["LEFT", "RIGHT"]),
  borderRadius: z.enum(["SOFT", "ROUNDED", "SQUARE"]),
  avatarStyle: z.enum(["ORBIT", "CIRCLE", "INITIALS"]),
  promptChips: z.array(z.string().min(2).max(36)).max(6),
  businessHoursMessage: z.string().min(5).max(140),
  showEscalation: z.boolean()
});

export type WidgetConfigInput = z.infer<typeof widgetConfigSchema>;

