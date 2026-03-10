import { Role } from "@/types/domain";

const roleRank: Record<Role, number> = {
  SUPPORT_AGENT: 1,
  SUPPORT_MANAGER: 2,
  ADMIN: 3
};

export const hasMinimumRole = (currentRole: Role, requiredRole: Role) => {
  return roleRank[currentRole] >= roleRank[requiredRole];
};

export const canManageSettings = (role: Role) =>
  role === "ADMIN" || role === "SUPPORT_MANAGER";

export const canManageTeam = (role: Role) => role === "ADMIN";

export const canHandleEscalations = (role: Role) =>
  role === "ADMIN" || role === "SUPPORT_MANAGER" || role === "SUPPORT_AGENT";

