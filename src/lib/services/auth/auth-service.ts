import { prisma } from "@/lib/db/prisma";
import { hashPassword } from "@/lib/auth/password";
import { registerSchema } from "@/lib/validation/auth";
import { AppError } from "@/lib/security/errors";

export const authService = {
  async register(input: unknown) {
    const parsed = registerSchema.safeParse(input);

    if (!parsed.success) {
      throw new AppError("Invalid registration payload", 422);
    }

    const existing = await prisma.user.findUnique({
      where: { email: parsed.data.email }
    });

    if (existing) {
      throw new AppError("Email already exists", 409);
    }

    const workspace = await prisma.workspace.findFirst({
      where: { slug: "northline" }
    });

    if (!workspace) {
      throw new AppError("Workspace unavailable", 503, false);
    }

    const passwordHash = await hashPassword(parsed.data.password);

    return prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        passwordHash,
        memberships: {
          create: {
            workspaceId: workspace.id,
            role: "SUPPORT_AGENT"
          }
        }
      }
    });
  }
};

