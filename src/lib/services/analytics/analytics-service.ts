import {
  conversationSeries,
  dashboardMetrics,
  feedbackDistribution,
  topicUsage,
  unansweredTopics,
  widgetEngagement
} from "@/data/mock-data";
import { repository } from "@/lib/repositories";

export const analyticsService = {
  async getDashboardOverview() {
    const escalations = await repository.listEscalations();
    const conversations = await repository.listConversations({ page: 1, pageSize: 6 });

    return {
      metrics: dashboardMetrics,
      conversationSeries,
      topicUsage,
      escalationSummary: {
        awaitingHuman: escalations.filter((item) => item.status === "NEW_ESCALATION").length,
        assigned: escalations.filter((item) => item.status === "ASSIGNED").length,
        overdue: escalations.filter((item) => new Date(item.dueAt).getTime() < Date.now()).length,
        resolved: escalations.filter((item) => item.status === "RESOLVED").length
      },
      aiPerformance: {
        helpfulFeedback: 78,
        unresolvedRate: 14,
        fallbackRate: 12,
        confidenceBand: [0.42, 0.68, 0.81]
      },
      recentConversations: conversations.rows,
      widgetPerformance: {
        openRate: 66,
        interactionRate: 48,
        completionRate: 38
      }
    };
  },

  async getAnalyticsPageData() {
    return {
      conversationSeries,
      feedbackDistribution,
      topicUsage,
      unansweredTopics,
      widgetEngagement,
      resolutionVsEscalation: conversationSeries.map((point) => ({
        date: point.date,
        resolved: point.resolved,
        escalated: point.escalated
      }))
    };
  }
};

