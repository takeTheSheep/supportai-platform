import {
  ArrowRightLeft,
  BarChart3,
  BookOpen,
  Bot,
  Inbox,
  MessageSquare,
  Palette,
  Shield
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Assistant",
    description: "Instant, context-aware answers trained on your knowledge base.",
    accent: "bg-primarySoft text-primary"
  },
  {
    icon: BookOpen,
    title: "Knowledge Base",
    description: "Structured content, clean version control, and better retrieval.",
    accent: "bg-tealSoft text-teal"
  },
  {
    icon: ArrowRightLeft,
    title: "Human Handoff",
    description: "Escalate complex issues with full conversation context attached.",
    accent: "bg-violetSoft text-violet"
  },
  {
    icon: MessageSquare,
    title: "Conversation Review",
    description: "Browse, filter, and audit every interaction with rich metadata.",
    accent: "bg-amberSoft text-amber"
  },
  {
    icon: Palette,
    title: "Widget Customization",
    description: "Match your brand with live previews and easy embed controls.",
    accent: "bg-roseSoft text-rose"
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track resolution rates, response time, and workload by channel.",
    accent: "bg-primarySoft text-primary"
  },
  {
    icon: Inbox,
    title: "Team Inbox",
    description: "Prioritized queues with SLA awareness and quick actions.",
    accent: "bg-tealSoft text-teal"
  },
  {
    icon: Shield,
    title: "Safe Guardrails",
    description: "Define boundaries, confidence thresholds, and escalation rules.",
    accent: "bg-violetSoft text-violet"
  }
];

export const ReferenceLandingFeaturesSection = () => {
  return (
    <section id="features" className="section-block bg-white/40">
      <div className="section-shell">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-heading md:text-4xl">
            Everything you need to <span className="text-gradient-teal">scale support</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-body">
            A complete platform for deploying, managing, and improving your AI assistant.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className="interactive-card group rounded-[1.5rem] p-6">
                <span
                  className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${feature.accent}`}
                >
                  <Icon size={20} />
                </span>
                <h3 className="text-sm font-semibold text-heading">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
