const steps = [
  { title: "Train", description: "Structure your knowledge categories, prompts, and response boundaries." },
  { title: "Deploy", description: "Publish the widget with visual and behavior controls for your brand." },
  { title: "Assist", description: "Automate common support flows with scenario-aware AI responses." },
  { title: "Escalate", description: "Route low-confidence requests to the right human specialist." },
  { title: "Improve", description: "Use feedback and analytics to refine assistant quality over time." }
];

export const WorkflowSection = () => {
  return (
    <section className="section-shell section-block">
      <div className="surface-card p-5 sm:p-6">
        <div className="section-header">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Execution lifecycle</p>
          <h2 className="text-2xl font-semibold text-heading sm:text-3xl">How SupportAI moves from setup to measurable operations</h2>
        </div>

        <div className="relative">
          <div className="timeline-line" />
          <ol className="space-y-3">
            {steps.map((step, index) => (
              <li key={step.title} className="relative rounded-2xl border border-border bg-white p-4 pl-11 shadow-soft motion-surface hover:-translate-y-px">
                <span className="timeline-dot" />
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">Step {index + 1}</p>
                  <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] font-semibold text-muted">
                    Workflow control
                  </span>
                </div>
                <p className="mt-2 text-base font-semibold text-heading">{step.title}</p>
                <p className="mt-1 text-sm text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

