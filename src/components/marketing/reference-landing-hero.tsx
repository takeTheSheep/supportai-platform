import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleDashed, Sparkles, Star } from "lucide-react";
import { DemoLaunchButton } from "@/components/common/demo-launch-button";

const floatingCards = [
  {
    icon: CheckCircle2,
    label: "Resolved in 4s",
    accent: "bg-tealSoft text-teal"
  },
  {
    icon: CircleDashed,
    label: "98.3% accuracy",
    accent: "bg-primarySoft text-primary"
  },
  {
    icon: Star,
    label: "0 escalations",
    accent: "bg-violetSoft text-violet"
  }
];

export const ReferenceLandingHero = () => {
  return (
    <section className="relative overflow-hidden pb-20 pt-28 md:pb-24 md:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-hero" />
      <div className="pointer-events-none absolute left-[8%] top-[16%] h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] top-[20%] h-48 w-48 rounded-full bg-violet/10 blur-3xl" />

      <div className="section-shell relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primarySoft/75 px-4 py-1.5 text-xs font-semibold text-primary shadow-soft">
            <Sparkles size={14} />
            AI-powered customer support
          </div>

          <h1 className="text-4xl font-semibold leading-[1.02] text-heading sm:text-5xl md:text-6xl lg:text-7xl">
            Your support team,
            <span className="text-gradient-blue"> amplified by AI</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-body sm:text-lg">
            Deploy an intelligent assistant that resolves questions instantly, escalates when
            needed, and gives your team full visibility into every conversation.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <DemoLaunchButton size="lg" label="Launch Demo" />
            <Link
              href="/product"
              className="inline-flex items-center gap-2 rounded-2xl border border-border/80 bg-white/90 px-7 py-3.5 text-sm font-semibold text-heading shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lift"
            >
              Explore Platform
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-3xl flex-wrap items-center justify-center gap-4 md:mt-20">
          {floatingCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="card-elevated animate-float px-5 py-3"
                style={{ animationDelay: `${index * 1.2}s` }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${card.accent}`}
                  >
                    <Icon size={18} />
                  </span>
                  <span className="text-sm font-medium text-heading">{card.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
