import { AppRepository } from "@/lib/repositories/types";
import { mockRepository } from "@/lib/repositories/mock-repository";

// Placeholder for gradual migration to Prisma queries.
// This keeps service boundaries stable while UI and business logic evolve.
export const prismaRepository: AppRepository = mockRepository;

