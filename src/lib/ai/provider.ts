import { AIProvider } from "@/lib/ai/types";
import { MockAIProvider } from "@/lib/ai/mock-provider";

// Future extension point for OpenAI / Anthropic / local models.
export const aiProvider: AIProvider = new MockAIProvider();

