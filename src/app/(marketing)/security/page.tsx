import { SecurityInteractivePanel } from "@/components/marketing/security-interactive-panel";

export default function SecurityPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">Security</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-heading">Security-focused architecture by default</h1>
      <p className="mt-3 text-sm text-muted sm:text-base">
        SupportAI is built with production-minded controls for authentication, data separation, anti-abuse checks, and safe operational visibility.
      </p>
      <SecurityInteractivePanel />
    </div>
  );
}

