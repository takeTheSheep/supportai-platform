import { repository } from "@/lib/repositories";
import {
  archiveArticleSchema,
  articleSchema,
  duplicateArticleSchema
} from "@/lib/validation/knowledge";
import { AppError } from "@/lib/security/errors";

export const knowledgeService = {
  async list(query?: string, category?: string) {
    return repository.listKnowledgeArticles(query, category);
  },

  async getById(id: string) {
    return repository.getKnowledgeArticleById(id);
  },

  async create(payload: unknown) {
    const parsed = articleSchema.safeParse(payload);
    if (!parsed.success) {
      throw new AppError("Invalid article payload", 422);
    }

    return repository.createKnowledgeArticle({
      ...parsed.data,
      owner: "Current User"
    });
  },

  async update(id: string, payload: unknown) {
    const parsed = articleSchema.partial().safeParse(payload);
    if (!parsed.success) {
      throw new AppError("Invalid article update", 422);
    }

    return repository.updateKnowledgeArticle(id, parsed.data);
  },

  async archive(payload: unknown) {
    const parsed = archiveArticleSchema.safeParse(payload);
    if (!parsed.success) {
      throw new AppError("Invalid archive payload", 422);
    }

    return repository.archiveKnowledgeArticle(parsed.data.articleId);
  },

  async duplicate(payload: unknown) {
    const parsed = duplicateArticleSchema.safeParse(payload);
    if (!parsed.success) {
      throw new AppError("Invalid duplicate payload", 422);
    }

    return repository.duplicateKnowledgeArticle(parsed.data.articleId);
  }
};

