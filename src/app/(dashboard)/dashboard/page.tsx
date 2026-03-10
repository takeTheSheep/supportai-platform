import { AiPerformancePanel } from "@/components/dashboard/ai-performance-panel";
import { ConversationActivityChart } from "@/components/dashboard/conversation-activity-chart";
import { DashboardKpiGrid } from "@/components/dashboard/dashboard-kpi-grid";
import { EscalationSummaryPanel } from "@/components/dashboard/escalation-summary-panel";
import { RecentConversationsFeed } from "@/components/dashboard/recent-conversations-feed";
import { TopKnowledgeTopics } from "@/components/dashboard/top-knowledge-topics";
import { WidgetPerformanceMini } from "@/components/dashboard/widget-performance-mini";
import { analyticsService } from "@/lib/services/analytics/analytics-service";

export default async function DashboardPage() {
  const data = await analyticsService.getDashboardOverview();

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Dashboard</p>
        <h1 className="text-2xl font-semibold text-heading">Support operations command center</h1>
        <p className="mt-1 text-sm text-muted">
          Monitor AI quality, escalation load, and workspace support performance in one surface.
        </p>
      </div>

      <DashboardKpiGrid metrics={data.metrics} />

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <ConversationActivityChart data={data.conversationSeries} />
        <TopKnowledgeTopics topics={data.topicUsage} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <EscalationSummaryPanel stats={data.escalationSummary} />
        <AiPerformancePanel data={data.aiPerformance} />
        <WidgetPerformanceMini data={data.widgetPerformance} />
      </div>

      <RecentConversationsFeed conversations={data.recentConversations} />
    </div>
  );
}

