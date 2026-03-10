import { KnowledgeBaseManager } from "@/components/dashboard/knowledge-base-manager";
import { knowledgeService } from "@/lib/services/knowledge/knowledge-service";

export default async function KnowledgeBasePage() {
  const articles = await knowledgeService.list();

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Knowledge Base</p>
        <h1 className="text-2xl font-semibold text-heading">Business knowledge management</h1>
      </div>
      <KnowledgeBaseManager initialArticles={articles} />
    </div>
  );
}

