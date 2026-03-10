export const featureFlags = {
  enablePrismaRepository: process.env.USE_PRISMA_REPOSITORY === "true",
  enableWebhookIntegrations: false,
  enableBackgroundJobs: false
};

