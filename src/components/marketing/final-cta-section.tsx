import Link from "next/link";
import { Button } from "@/components/common/button";
import { DemoLaunchButton } from "@/components/common/demo-launch-button";

export const FinalCTASection = () => {
  return (
    <section className="section-shell pb-16">
      <div className="interactive-card rounded-3xl bg-gradient-to-br from-panel via-panel to-surface p-8 sm:p-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2 className="text-2xl font-semibold text-heading sm:text-3xl">
              Build dependable AI support operations without sacrificing control.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-muted sm:text-base">
              Launch your assistant, monitor outcomes, and keep escalation quality high with a product built for operational trust.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="chip">Policy-safe automation</span>
              <span className="chip">Escalation-ready workflows</span>
              <span className="chip">Real-time performance analytics</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <DemoLaunchButton size="lg" label="Get Demo" />
            <Link href="/dashboard">
              <Button size="lg" variant="secondary">
                Explore Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

