const testimonials = [
  {
    role: "Support Operations Lead",
    quote: "SupportAI reduced repetitive queue load while giving our managers better escalation visibility."
  },
  {
    role: "Customer Experience Manager",
    quote: "The assistant stays consistent with our tone and escalates edge cases before trust is impacted."
  },
  {
    role: "Head of Service Delivery",
    quote: "The widget controls and conversation review flow feel enterprise-ready from day one."
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="section-shell section-block">
      <div className="section-header">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Role Feedback</p>
        <h2 className="mt-2 text-2xl font-semibold text-heading sm:text-3xl">
          Built for teams that need trust and control
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.role} className="glass-panel p-5">
            <p className="text-sm text-body">
              &ldquo;{item.quote}&rdquo;
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">{item.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

