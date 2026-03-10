import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { hashPassword } from "@/lib/auth/password";
import { registerSchema } from "@/lib/validation/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid registration payload", details: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email: parsed.data.email }
    });

    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(parsed.data.password);

    const workspace = await prisma.workspace.findFirst({
      where: { slug: "northline" }
    });

    const fallbackWorkspace =
      workspace ??
      (await prisma.workspace.create({
        data: {
          name: "Demo Workspace",
          slug: `demo-${Date.now()}`,
          supportEmail: parsed.data.email,
          defaultLanguage: "en",
          timezone: "UTC"
        }
      }));

    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        passwordHash,
        memberships: {
          create: {
            workspaceId: fallbackWorkspace.id,
            role: "SUPPORT_AGENT"
          }
        }
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Registration failed",
        details: process.env.NODE_ENV === "development" ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}

