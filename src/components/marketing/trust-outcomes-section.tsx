const metrics = [
  { label: "Avg First Response Speed", value: "41s", note: "Automated replies in under a minute" },
  { label: "Resolved Conversations", value: "83.7%", note: "AI and team-assisted closure rate" },
  { label: "Handoff Reduction", value: "32%", note: "Fewer repetitive human escalations" },
  { label: "Satisfaction Proxy", value: "4.6/5", note: "Helpful feedback trend" }
];

export const TrustOutcomesSection = () => {
  return (
    <section className="section-shell section-block">
      <div className="glass-panel p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Operational outcomes</p>
            <h2 className="mt-2 text-2xl font-semibold text-heading sm:text-3xl">Business impact from controlled AI support</h2>
          </div>
          <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted">
            Last 30 days
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
            <article key={metric.label} className="rounded-2xl border border-border bg-white p-4 shadow-soft motion-surface hover:-translate-y-px">
            <p className="text-xs uppercase tracking-wide text-muted">{metric.label}</p>
            <p className="mt-2 text-3xl font-semibold text-heading">{metric.value}</p>
            <p className="mt-1 text-sm text-body">{metric.note}</p>
          </article>
        ))}
        </div>
      </div>
    </section>
  );
};

