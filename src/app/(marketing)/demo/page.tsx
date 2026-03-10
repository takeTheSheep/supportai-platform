import { DemoChatSandbox } from "@/components/chat/demo-chat-sandbox";

export default function DemoPage() {
  return (
    <div className="mx-auto w-full max-w-7xl animate-fade-up px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Interactive demo</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-heading">Test SupportAI in realistic business scenarios</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted sm:text-base">
          Switch industry presets, trigger guided prompts, submit custom questions, and test escalation behaviors in a live simulation sandbox.
        </p>
      </div>
      <DemoChatSandbox />
    </div>
  );
}

