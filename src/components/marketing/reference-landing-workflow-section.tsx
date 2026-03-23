"use client";

import { useState } from "react";
import { ArrowUpRight, MessageCircle, Rocket, TrendingUp, Upload } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const steps = [
  {
    icon: Upload,
    title: "Train",
    description:
      "Upload your FAQs, docs, and procedures. The assistant learns your business context instantly.",
    accent: "bg-primarySoft text-primary"
  },
  {
    icon: Rocket,
    title: "Deploy",
    description:
      "Add a single script tag, tune behavior from the dashboard, and publish across your channels.",
    accent: "bg-tealSoft text-teal"
  },
  {
    icon: MessageCircle,
    title: "Assist",
    description:
      "The assistant handles repetitive questions 24/7 with fast, on-brand responses from your knowledge base.",
    accent: "bg-violetSoft text-violet"
  },
  {
    icon: ArrowUpRight,
    title: "Escalate",
    description:
      "Complex issues route to your team with full context, sentiment, and issue history attached.",
    accent: "bg-amberSoft text-amber"
  },
  {
    icon: TrendingUp,
    title: "Improve",
    description:
      "Review gaps, refine content, and continuously improve resolution quality over time.",
    accent: "bg-roseSoft text-rose"
  }
];

export const ReferenceLandingWorkflowSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = steps[activeStep];
  const CurrentIcon = currentStep.icon;

  return (
    <section id="workflow" className="section-block">
      <div className="section-shell">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-heading md:text-4xl">
            From zero to <span className="text-gradient-blue">intelligent support</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-body">
            Five steps to transform your customer support experience.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                onClick={() => setActiveStep(index)}
                className={cn(
                  "rounded-xl px-4 py-2.5 text-sm font-medium transition duration-300",
                  activeStep === index
                    ? "bg-white text-heading shadow-soft"
                    : "text-muted hover:text-heading"
                )}
              >
                <span className="font-mono-code mr-2 text-xs opacity-70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step.title}
              </button>
            ))}
          </div>

          <div className="card-elevated flex flex-col gap-6 rounded-[1.5rem] p-8 md:flex-row md:items-start md:p-10">
            <span
              className={`inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${currentStep.accent}`}
            >
              <CurrentIcon size={22} />
            </span>

            <div>
              <h3 className="text-lg font-semibold text-heading">{currentStep.title}</h3>
              <p className="mt-3 max-w-xl leading-7 text-body">{currentStep.description}</p>
            </div>
          </div>

          <div className="mt-4 flex gap-1">
            {steps.map((_, index) => (
              <div key={index} className="h-1 flex-1 overflow-hidden rounded-full bg-surface">
                <div
                  className={cn(
                    "h-full rounded-full bg-gradient-to-r from-primary to-primaryDeep transition-all duration-300",
                    activeStep >= index ? "w-full" : "w-0"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
