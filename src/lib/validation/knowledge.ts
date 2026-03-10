import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(3).max(140),
  summary: z.string().min(6).max(280),
  category: z.string().min(2).max(60),
  content: z.string().min(12).max(12000),
  tags: z.array(z.string().min(2).max(24)).max(12),
  status: z.enum(["PUBLISHED", "DRAFT", "ARCHIVED"]),
  sourceTag: z.string().min(2).max(40),
  versionNote: z.string().min(2).max(120)
});

export const archiveArticleSchema = z.object({
  articleId: z.string().min(2).max(80)
});

export const duplicateArticleSchema = z.object({
  articleId: z.string().min(2).max(80)
});

