const guardrails = [
  "Safe topic boundaries",
  "Escalation logic when confidence drops",
  "Consistent response behavior",
  "Business control over assistant tone"
];

export const GuardrailsStrip = () => {
  return (
    <section className="section-shell pb-16">
      <div className="glass-panel bg-gradient-to-r from-primarySoft/80 via-violetSoft/70 to-tealSoft/80 px-5 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold text-heading">AI Behavior Guardrails</p>
          {guardrails.map((item) => (
            <span key={item} className="rounded-full bg-panel px-3 py-1 text-xs text-body shadow-soft">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

