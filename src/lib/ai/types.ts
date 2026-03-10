import { ScenarioMode } from "@/types/domain";

export interface AIRequest {
  workspaceId: string;
  scenario: ScenarioMode;
  message: string;
  conversationId?: string;
}

export interface AIResponse {
  text: string;
  confidence: number;
  suggestedPrompts?: string[];
  shouldEscalate: boolean;
  guardrailTriggered?: string;
}

export interface AIProvider {
  generateResponse(input: AIRequest): Promise<AIResponse>;
}

