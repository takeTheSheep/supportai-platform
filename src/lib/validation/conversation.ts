import { z } from "zod";

const idSchema = z.string().min(2).max(80);

export const createChatMessageSchema = z.object({
  conversationId: idSchema.optional(),
  scenario: z.enum(["SAAS", "CONSTRUCTION", "DENTAL", "ECOMMERCE", "CONSULTING"]),
  message: z.string().min(1).max(1200),
  responseMode: z
    .enum(["standard", "strict", "lowConfidence"])
    .default("standard")
});

export const feedbackSchema = z.object({
  conversationId: idSchema,
  rating: z.enum(["HELPFUL", "NOT_HELPFUL"])
});

export const escalationSchema = z.object({
  conversationId: idSchema,
  reason: z.string().min(6).max(240),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).default("MEDIUM")
});

export const assignSchema = z.object({
  conversationId: idSchema,
  agentId: idSchema
});

export const resolveSchema = z.object({
  conversationId: idSchema
});

export const noteSchema = z.object({
  conversationId: idSchema,
  note: z.string().min(2).max(500)
});

export const conversationFilterSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(5).max(50).default(10),
  query: z.string().optional(),
  status: z.enum(["RESOLVED", "UNRESOLVED", "ESCALATED"]).optional(),
  feedback: z.enum(["HELPFUL", "NOT_HELPFUL", "NONE"]).optional(),
  topic: z.string().optional(),
  assignedOwner: z.string().optional(),
  scenario: z.enum(["SAAS", "CONSTRUCTION", "DENTAL", "ECOMMERCE", "CONSULTING"]).optional(),
  escalated: z.coerce.boolean().optional()
});

export type ConversationFilterInput = z.infer<typeof conversationFilterSchema>;

