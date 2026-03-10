import { TopicUsagePoint } from "@/types/domain";
import { Card, CardContent, CardHeader } from "@/components/common/card";

export const TopKnowledgeTopics = ({ topics }: { topics: TopicUsagePoint[] }) => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-base font-semibold text-heading">Top knowledge topics</h3>
      </CardHeader>
      <CardContent className="space-y-3">
        {topics.map((topic) => (
          <div key={topic.topic} className="rounded-xl border border-border bg-surface p-2.5">
            <div className="mb-1 flex items-center justify-between text-xs text-muted">
              <span>{topic.topic}</span>
              <span>{topic.usage}</span>
            </div>
            <div className="h-2 rounded-full bg-panel">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${Math.min(100, Math.max(8, topic.usage / 2.5))}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

