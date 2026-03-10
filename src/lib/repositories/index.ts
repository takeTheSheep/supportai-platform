import { AppRepository } from "@/lib/repositories/types";
import { mockRepository } from "@/lib/repositories/mock-repository";
import { prismaRepository } from "@/lib/repositories/prisma-repository";

const usePrisma = process.env.USE_PRISMA_REPOSITORY === "true";

export const repository: AppRepository = usePrisma ? prismaRepository : mockRepository;

