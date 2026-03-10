import { PolicyInteractiveExplorer } from "@/components/marketing/policy-interactive-explorer";

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">Privacy</p>
      <h1 className="mt-2 text-3xl font-semibold text-heading">Privacy architecture and operational controls</h1>
      <div className="mt-4 space-y-3 text-sm text-body">
        <p>SupportAI is a demo product architecture designed for workspace-scoped customer support operations.</p>
        <p>Conversation records, audit actions, and settings updates are modeled with role-aware data boundaries.</p>
        <p>Future production deployments should add retention controls, encryption for sensitive fields, and legal policy workflows.</p>
      </div>
      <PolicyInteractiveExplorer mode="privacy" />
    </div>
  );
}

