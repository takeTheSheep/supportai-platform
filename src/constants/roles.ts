export const roles = {
  admin: "ADMIN",
  supportManager: "SUPPORT_MANAGER",
  supportAgent: "SUPPORT_AGENT"
} as const;

export type AppRole = (typeof roles)[keyof typeof roles];

