"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/common/card";
import { Select } from "@/components/common/select";
import { cn } from "@/lib/utils/cn";

interface AnalyticsData {
  conversationSeries: Array<{ date: string; conversations: number; resolved: number; escalated: number }>;
  feedbackDistribution: Array<{ name: string; value: number; fill: string }>;
  topicUsage: Array<{ topic: string; usage: number }>;
  unansweredTopics: Array<{ topic: string; count: number }>;
  widgetEngagement: Array<{ name: string; value: number }>;
  resolutionVsEscalation: Array<{ date: string; resolved: number; escalated: number }>;
}

const chartTooltipStyle = {
  background: "#FFFFFF",
  border: "1px solid #DCE4F0",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(24,32,51,0.12)"
};

export const AnalyticsDashboard = ({ data }: { data: AnalyticsData }) => {
  const [dateRange, setDateRange] = useState("30D");
  const [scenario, setScenario] = useState("ALL");
  const [topic, setTopic] = useState("ALL");
  const [agent, setAgent] = useState("ALL");
  const [visibleSeries, setVisibleSeries] = useState({
    conversations: true,
    resolved: true,
    escalated: true
  });

  const trendCards = useMemo(
    () => [
      { label: "Deflection Rate", value: "67.9%", change: "+4.0%", note: "Stronger article coverage" },
      { label: "Avg Confidence", value: "74%", change: "+1.7%", note: "Prompt quality improved" },
      { label: "Escalation Ratio", value: "9.8%", change: "-1.4%", note: "Lower fallback pressure" },
      { label: "Widget Engagement", value: "48%", change: "+3.2%", note: "Launcher copy uplift" }
    ],
    []
  );

  const toggleSeries = (key: "conversations" | "resolved" | "escalated") => {
    setVisibleSeries((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="grid gap-3 md:grid-cols-4">
          <Select value={dateRange} onChange={(event) => setDateRange(event.target.value)}>
            <option value="7D">Last 7 days</option>
            <option value="30D">Last 30 days</option>
            <option value="90D">Last 90 days</option>
          </Select>
          <Select value={scenario} onChange={(event) => setScenario(event.target.value)}>
            <option value="ALL">All business modes</option>
            <option value="SAAS">SaaS</option>
            <option value="CONSTRUCTION">Construction</option>
            <option value="DENTAL">Dental</option>
            <option value="ECOMMERCE">E-commerce</option>
            <option value="CONSULTING">Consulting</option>
          </Select>
          <Select value={topic} onChange={(event) => setTopic(event.target.value)}>
            <option value="ALL">All topics</option>
            {data.topicUsage.map((entry) => (
              <option key={entry.topic} value={entry.topic}>
                {entry.topic}
              </option>
            ))}
          </Select>
          <Select value={agent} onChange={(event) => setAgent(event.target.value)}>
            <option value="ALL">All agents</option>
            <option value="Nora Patel">Nora Patel</option>
            <option value="Marta Chen">Marta Chen</option>
            <option value="Leo Hayes">Leo Hayes</option>
          </Select>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {trendCards.map((card) => (
          <Card key={card.label} className="interactive-card">
            <CardContent className="space-y-1 p-4">
              <p className="text-xs text-muted">{card.label}</p>
              <p className="text-2xl font-semibold text-heading">{card.value}</p>
              <p className={cn("text-xs font-semibold", card.change.startsWith("+") ? "text-teal" : "text-amber")}>{card.change}</p>
              <p className="text-[11px] text-muted">{card.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader className="space-y-3">
            <div>
              <h2 className="text-base font-semibold text-heading">Conversation volume over time</h2>
              <p className="text-xs text-muted">Toggle active series to inspect shifts in operational load.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { key: "conversations" as const, label: "Volume", color: "#4D74FF" },
                { key: "resolved" as const, label: "Resolved", color: "#35C3B0" },
                { key: "escalated" as const, label: "Escalated", color: "#FF6F8A" }
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => toggleSeries(item.key)}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-xs font-semibold transition",
                    visibleSeries[item.key]
                      ? "border-border bg-panel text-heading"
                      : "border-border/70 bg-surface text-muted"
                  )}
                >
                  <span className="mr-1 inline-block h-2 w-2 rounded-full" style={{ background: item.color }} />
                  {item.label}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.conversationSeries}>
                <CartesianGrid stroke="#DCE4F0" strokeDasharray="4 4" />
                <XAxis dataKey="date" stroke="#7D8AA3" fontSize={12} />
                <YAxis stroke="#7D8AA3" fontSize={12} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Legend />
                {visibleSeries.conversations ? (
                  <Line type="monotone" dataKey="conversations" stroke="#4D74FF" strokeWidth={2.4} dot={false} />
                ) : null}
                {visibleSeries.resolved ? (
                  <Line type="monotone" dataKey="resolved" stroke="#35C3B0" strokeWidth={2} dot={false} />
                ) : null}
                {visibleSeries.escalated ? (
                  <Line type="monotone" dataKey="escalated" stroke="#FF6F8A" strokeWidth={2} dot={false} />
                ) : null}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold text-heading">Feedback distribution</h2>
          </CardHeader>
          <CardContent className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.feedbackDistribution}
                  innerRadius={60}
                  outerRadius={94}
                  dataKey="value"
                  paddingAngle={3}
                >
                  {data.feedbackDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={chartTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <h2 className="text-base font-semibold text-heading">Resolution vs escalation</h2>
            <p className="text-xs text-muted">Stacked flow highlights escalation pressure per day.</p>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.resolutionVsEscalation}>
                <CartesianGrid stroke="#DCE4F0" strokeDasharray="4 4" />
                <XAxis dataKey="date" stroke="#7D8AA3" fontSize={12} />
                <YAxis stroke="#7D8AA3" fontSize={12} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="resolved" stackId="a" fill="#35C3B0" radius={[6, 6, 0, 0]} />
                <Bar dataKey="escalated" stackId="a" fill="#FF6F8A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold text-heading">Unanswered topics</h2>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.unansweredTopics.map((item) => (
              <div key={item.topic} className="rounded-xl border border-border bg-surface p-3">
                <p className="text-sm font-semibold text-heading">{item.topic}</p>
                <p className="text-xs text-muted">{item.count} unresolved threads</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {data.widgetEngagement.map((item) => (
          <Card key={item.name}>
            <CardContent className="space-y-2 p-4">
              <p className="text-xs text-muted">{item.name}</p>
              <p className="text-2xl font-semibold text-heading">{item.value}%</p>
              <div className="h-2 rounded-full bg-surface">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${item.value}%` }} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

