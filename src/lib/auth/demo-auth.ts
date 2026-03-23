import bcrypt from "bcryptjs";
import { hashPassword } from "@/lib/auth/password";

export type DemoAuthUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  passwordHash: string;
  role: "ADMIN" | "SUPPORT_MANAGER" | "SUPPORT_AGENT";
  workspaceId: string;
  workspaceSlug: string;
};

const DEMO_WORKSPACE_ID = "workspace_northline";
const DEMO_WORKSPACE_SLUG = "northline";
const DEMO_PASSWORD_HASH = bcrypt.hashSync("DemoPass123!", 10);

declare global {
  // eslint-disable-next-line no-var
  var demoAuthUsers: Map<string, DemoAuthUser> | undefined;
}

const createSeedUsers = () =>
  new Map<string, DemoAuthUser>([
    [
      "admin@supportai.dev",
      {
        id: "demo_admin",
        name: "Leo Hayes",
        email: "admin@supportai.dev",
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Leo%20Hayes",
        passwordHash: DEMO_PASSWORD_HASH,
        role: "ADMIN",
        workspaceId: DEMO_WORKSPACE_ID,
        workspaceSlug: DEMO_WORKSPACE_SLUG
      }
    ],
    [
      "manager@supportai.dev",
      {
        id: "demo_manager",
        name: "Nora Patel",
        email: "manager@supportai.dev",
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Nora%20Patel",
        passwordHash: DEMO_PASSWORD_HASH,
        role: "SUPPORT_MANAGER",
        workspaceId: DEMO_WORKSPACE_ID,
        workspaceSlug: DEMO_WORKSPACE_SLUG
      }
    ],
    [
      "agent@supportai.dev",
      {
        id: "demo_agent",
        name: "Marta Chen",
        email: "agent@supportai.dev",
        image: "https://api.dicebear.com/9.x/initials/svg?seed=Marta%20Chen",
        passwordHash: DEMO_PASSWORD_HASH,
        role: "SUPPORT_AGENT",
        workspaceId: DEMO_WORKSPACE_ID,
        workspaceSlug: DEMO_WORKSPACE_SLUG
      }
    ]
  ]);

const getStore = () => {
  if (!global.demoAuthUsers) {
    global.demoAuthUsers = createSeedUsers();
  }

  return global.demoAuthUsers;
};

export const demoAuth = {
  getUserByEmail(email: string) {
    return getStore().get(email.toLowerCase()) ?? null;
  },

  async registerUser(input: { name: string; email: string; password: string }) {
    const email = input.email.toLowerCase();
    const store = getStore();

    if (store.has(email)) {
      return null;
    }

    const passwordHash = await hashPassword(input.password);
    const user: DemoAuthUser = {
      id: `demo_${Date.now()}`,
      name: input.name,
      email,
      image: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(input.name)}`,
      passwordHash,
      role: "SUPPORT_AGENT",
      workspaceId: DEMO_WORKSPACE_ID,
      workspaceSlug: DEMO_WORKSPACE_SLUG
    };

    store.set(email, user);
    return user;
  }
};
