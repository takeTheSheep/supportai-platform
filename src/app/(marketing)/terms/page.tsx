import { PolicyInteractiveExplorer } from "@/components/marketing/policy-interactive-explorer";

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">Terms</p>
      <h1 className="mt-2 text-3xl font-semibold text-heading">Usage terms and deployment responsibilities</h1>
      <div className="mt-4 space-y-3 text-sm text-body">
        <p>This repository is a portfolio demonstration of a production-minded AI support SaaS architecture.</p>
        <p>The included data is synthetic and does not represent real customer records.</p>
        <p>Any real-world deployment should complete legal review, compliance review, and security hardening before handling live traffic.</p>
      </div>
      <PolicyInteractiveExplorer mode="terms" />
    </div>
  );
}

