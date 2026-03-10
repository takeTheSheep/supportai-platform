import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export const getSession = async () => auth();

export const requireSession = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  return session;
};

export const requireRole = async (
  roles: Array<"ADMIN" | "SUPPORT_MANAGER" | "SUPPORT_AGENT">
) => {
  const session = await requireSession();
  const role = session.user.role ?? "SUPPORT_AGENT";
  if (!roles.includes(role)) {
    redirect("/dashboard");
  }
  return {
    ...session,
    user: {
      ...session.user,
      role
    }
  };
};

