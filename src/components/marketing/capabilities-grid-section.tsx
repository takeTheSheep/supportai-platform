import { ArrowUpRight, BookOpenText, Bot, LifeBuoy, ShieldCheck, SlidersHorizontal } from "lucide-react";

const capabilities = [
  {
    title: "Scenario-aware assistant",
    description: "Switch between SaaS, construction, dental, ecommerce, and consulting behavior profiles.",
    metric: "5 vertical presets",
    icon: Bot,
    className: "md:col-span-2"
  },
  {
    title: "Guardrail policy engine",
    description: "Topic boundaries, fallback behavior, and escalation paths remain enforceable by operations teams.",
    metric: "Policy-checked in real time",
    icon: ShieldCheck,
    className: ""
  },
  {
    title: "Knowledge synchronization",
    description: "Knowledge chips, article controls, and versioning keep assistant answers business-consistent.",
    metric: "91% coverage",
    icon: BookOpenText,
    className: ""
  },
  {
    title: "Widget configurator",
    description: "Tune launcher behavior, greeting prompts, and escalation affordances with instant visual preview.",
    metric: "Live brand-safe preview",
    icon: SlidersHorizontal,
    className: ""
  },
  {
    title: "Support team oversight",
    description: "Review conversation health, confidence trends, and handoff urgency without leaving the platform.",
    metric: "Ops command workflow",
    icon: LifeBuoy,
    className: "md:col-span-2"
  }
];

export const CapabilitiesGridSection = () => {
  return (
    <section className="section-shell section-block">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Platform Capabilities</p>
          <h2 className="mt-2 text-2xl font-semibold text-heading sm:text-3xl">
            Built for conversational AI operations, not generic CRM workflows
          </h2>
        </div>
        <span className="hidden rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-muted lg:inline-flex">
          Modular architecture • Provider-ready
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {capabilities.map((capability) => (
          <article key={capability.title} className={`bento-card ${capability.className}`}>
            <div className="flex items-start justify-between gap-3">
              <capability.icon size={18} className="text-primary" />
              <ArrowUpRight size={15} className="text-muted" />
            </div>
            <p className="mt-4 text-base font-semibold text-heading">{capability.title}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{capability.description}</p>
            <p className="mt-4 inline-flex rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-semibold text-body">
              {capability.metric}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

