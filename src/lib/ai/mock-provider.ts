import { AIProvider, AIRequest, AIResponse } from "@/lib/ai/types";
import {
  findScenarioResponse,
  getScenarioFallbackResponse,
  scenarioKnowledgeCounts
} from "@/lib/ai/knowledge-bank";

// 20 topic seeds x 5 variants = 100 answer variants per scenario.
const MIN_EXPECTED_VARIANTS = 100;

const allScenarioVariantCounts = Object.values(scenarioKnowledgeCounts);
if (allScenarioVariantCounts.some((count) => count < MIN_EXPECTED_VARIANTS)) {
  throw new Error("Knowledge bank does not meet minimum answer variants per scenario.");
}

export class MockAIProvider implements AIProvider {
  async generateResponse(input: AIRequest): Promise<AIResponse> {
    await new Promise((resolve) => setTimeout(resolve, 700));

    const match = findScenarioResponse(input.scenario, input.message);
    if (match) {
      return match;
    }

    return getScenarioFallbackResponse(input.scenario);
  }
}
