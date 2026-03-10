import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db/prisma";
import { loginSchema } from "@/lib/validation/auth";
import { verifyPassword } from "@/lib/auth/password";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET ?? "supportai-local-dev-secret",
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
          include: {
            memberships: {
              include: { workspace: true },
              orderBy: { createdAt: "asc" }
            }
          }
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        const valid = await verifyPassword(parsed.data.password, user.passwordHash);
        if (!valid) {
          return null;
        }

        const membership = user.memberships[0];

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: membership?.role ?? "SUPPORT_AGENT",
          workspaceId: membership?.workspaceId ?? null,
          workspaceSlug: membership?.workspace.slug ?? null
        };
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.uid = user.id;
        token.role = user.role ?? "SUPPORT_AGENT";
        token.workspaceId = user.workspaceId ?? null;
        token.workspaceSlug = user.workspaceSlug ?? null;
      }

      if ((!token.role || !token.workspaceId) && token.sub) {
        const membership = await prisma.membership.findFirst({
          where: { userId: token.sub },
          include: { workspace: true },
          orderBy: { createdAt: "asc" }
        });

        token.uid = token.sub;
        token.role = membership?.role ?? "SUPPORT_AGENT";
        token.workspaceId = membership?.workspaceId ?? null;
        token.workspaceSlug = membership?.workspace.slug ?? null;
      }

      return token;
    },
    session: async ({ session, token }) => {
      const userId = (token.uid as string | undefined) ?? token.sub ?? "";

      if (session.user) {
        session.user.id = userId;
        session.user.role =
          (token.role as "ADMIN" | "SUPPORT_MANAGER" | "SUPPORT_AGENT" | undefined) ??
          "SUPPORT_AGENT";
        session.user.workspaceId =
          (token.workspaceId as string | null | undefined) ?? null;
        session.user.workspaceSlug =
          (token.workspaceSlug as string | null | undefined) ?? null;
      }

      return session;
    }
  }
});

