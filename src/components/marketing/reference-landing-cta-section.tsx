import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const ReferenceLandingCtaSection = () => {
  return (
    <section id="cta" className="section-block pt-8 md:pt-12">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-cta px-6 py-12 text-center shadow-float sm:px-10 md:px-14 md:py-16">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "32px 32px"
            }}
          />

          <div className="relative z-10">
            <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-[1.08] text-white md:text-4xl lg:text-5xl">
              Ready to transform your support?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 md:text-lg">
              Join teams already using SupportAI to resolve issues faster, reduce escalations,
              and keep customer conversations under control.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-semibold text-primary transition duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                Start Free Trial
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white/90 transition duration-300 hover:bg-white/10"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
