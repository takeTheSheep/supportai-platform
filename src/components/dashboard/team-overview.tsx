"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/common/badge";
import { Card, CardContent, CardHeader } from "@/components/common/card";
import { TeamMemberStat } from "@/types/domain";

export const TeamOverview = ({ members }: { members: TeamMemberStat[] }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {members.map((member) => (
        <Card key={member.id}>
          <CardHeader className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-heading">{member.name}</h2>
              <p className="text-xs text-muted">{member.role.replaceAll("_", " ")}</p>
            </div>
            <Badge tone={member.availability === "ONLINE" ? "teal" : member.availability === "AWAY" ? "amber" : "neutral"}>
              {member.availability}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-surface p-2">
                <p className="text-[11px] text-muted">Assigned</p>
                <p className="font-semibold text-heading">{member.assignedEscalations}</p>
              </div>
              <div className="rounded-lg bg-surface p-2">
                <p className="text-[11px] text-muted">Resolved</p>
                <p className="font-semibold text-heading">{member.resolvedCases}</p>
              </div>
              <div className="rounded-lg bg-surface p-2">
                <p className="text-[11px] text-muted">Avg reply</p>
                <p className="font-semibold text-heading">{member.avgResponseTime}</p>
              </div>
            </div>
            <div className="h-16 rounded-lg bg-surface p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={member.sparkline.map((point, index) => ({
                    index,
                    point
                  }))}
                >
                  <Line type="monotone" dataKey="point" stroke="#4D74FF" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted">{member.recentActivity}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

