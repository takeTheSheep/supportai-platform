"use client";

import { Bell, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Avatar } from "@/components/common/avatar";
import { Badge } from "@/components/common/badge";
import { Button } from "@/components/common/button";

export const DashboardTopbar = ({
  userName,
  role
}: {
  userName: string;
  role: string;
}) => {
  return (
    <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/90 bg-app/95 px-4 backdrop-blur sm:px-6">
      <div>
        <p className="text-[11px] uppercase tracking-wide text-muted">Workspace</p>
        <p className="text-sm font-semibold text-heading">Northline Support</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="focus-ring relative rounded-xl border border-border bg-panel p-2.5 text-muted transition hover:-translate-y-0.5 hover:text-heading hover:shadow-soft">
          <Bell size={16} />
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-rose animate-pulse-soft" />
        </button>
        <div className="hidden items-center gap-2 rounded-xl border border-border bg-panel px-2.5 py-1.5 shadow-soft sm:flex">
          <Avatar name={userName} className="h-8 w-8" />
          <div>
            <p className="text-xs font-semibold text-heading">{userName}</p>
            <Badge tone="blue" className="px-2 py-0.5 text-[10px]">
              {role}
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="gap-1"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </div>
  );
};

