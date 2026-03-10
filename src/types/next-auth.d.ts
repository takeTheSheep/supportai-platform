import "next-auth";
import "next-auth/jwt";

type SupportRole = "ADMIN" | "SUPPORT_MANAGER" | "SUPPORT_AGENT";

declare module "next-auth" {
  interface User {
    role?: SupportRole;
    workspaceId?: string | null;
    workspaceSlug?: string | null;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: SupportRole;
      workspaceId?: string | null;
      workspaceSlug?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid?: string;
    role?: SupportRole;
    workspaceId?: string | null;
    workspaceSlug?: string | null;
  }
}

