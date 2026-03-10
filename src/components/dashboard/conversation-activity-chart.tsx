"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { AnalyticsSeriesPoint } from "@/types/domain";
import { Card, CardContent, CardHeader } from "@/components/common/card";

const tooltipStyle = {
  background: "#FFFFFF",
  border: "1px solid #DCE4F0",
  borderRadius: "12px",
  boxShadow: "0 10px 30px rgba(24,32,51,0.12)"
};

export const ConversationActivityChart = ({ data }: { data: AnalyticsSeriesPoint[] }) => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-base font-semibold text-heading">Conversation activity</h3>
        <p className="text-xs text-muted">Daily volume, resolved, and escalated trend.</p>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" stroke="#DCE4F0" />
            <XAxis dataKey="date" stroke="#7D8AA3" fontSize={12} />
            <YAxis stroke="#7D8AA3" fontSize={12} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />
            <Line type="monotone" dataKey="conversations" stroke="#4D74FF" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="resolved" stroke="#35C3B0" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="escalated" stroke="#FF6F8A" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

