"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_NAV } from "@/constants/navigation";
import { cn } from "@/lib/utils/cn";
import { Logo } from "@/components/layout/logo";
import { Badge } from "@/components/common/badge";

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[268px] flex-col border-r border-border/90 bg-gradient-to-b from-panel to-surface px-4 py-5 lg:flex">
      <Logo href="/dashboard" />
      <div className="mt-6 space-y-1">
        {DASHBOARD_NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition duration-200",
                active
                  ? "bg-primarySoft text-primaryDeep shadow-soft"
                  : "text-muted hover:bg-panel hover:text-heading"
              )}
            >
              {active ? <span className="absolute left-1 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-primary" /> : null}
              <span className={cn("ml-0 transition", active && "ml-2")}>{item.label}</span>
              {item.href === "/inbox" ? <Badge tone="amber">3</Badge> : null}
            </Link>
          );
        })}
      </div>
      <div className="mt-auto rounded-2xl border border-border bg-panel p-3 text-xs">
        <p className="font-semibold text-heading">Assistant Guardrails</p>
        <p className="mt-1 text-muted">Prompt validation, confidence fallback, and escalation routing are active.</p>
      </div>
    </aside>
  );
};

