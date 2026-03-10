import { ScenarioMode } from "@/types/domain";
import { AIResponse } from "@/lib/ai/types";
import { TopicSeed } from "@/lib/ai/knowledge-seeds/types";
import { saasTopicSeeds } from "@/lib/ai/knowledge-seeds/saas";
import { constructionTopicSeeds } from "@/lib/ai/knowledge-seeds/construction";
import { dentalTopicSeeds } from "@/lib/ai/knowledge-seeds/dental";
import { ecommerceTopicSeeds } from "@/lib/ai/knowledge-seeds/ecommerce";
import { consultingTopicSeeds } from "@/lib/ai/knowledge-seeds/consulting";

interface ScenarioKnowledgeEntry {
  id: string;
  matchPhrases: string[];
  keywords: string[];
  response: AIResponse;
}

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "be",
  "can",
  "do",
  "for",
  "how",
  "i",
  "in",
  "is",
  "it",
  "my",
  "of",
  "on",
  "or",
  "the",
  "to",
  "we",
  "what",
  "with",
  "you",
  "your"
]);

const variantPromptBuilders = [
  (focus: string) => `how does ${focus} work`,
  (focus: string) => `can you explain ${focus}`,
  (focus: string) => `i need help with ${focus}`,
  (focus: string) => `what is your process for ${focus}`,
  (focus: string) => `do you support ${focus}`
];

const responseSuffixes = [
  "I can also share a short checklist if useful.",
  "I can provide a quick summary or full detail depending on what you need.",
  "If this request is urgent, I can route it to a human specialist.",
  "I can give next steps tailored to your exact situation.",
  "If helpful, I can suggest the best follow-up question to ask next."
];

const fallbackByScenario: Record<ScenarioMode, AIResponse> = {
  SAAS: {
    text: "I can help with pricing, onboarding, integrations, billing, and escalation for SaaS support workflows.",
    confidence: 0.6,
    shouldEscalate: true,
    suggestedPrompts: ["Compare plan tiers", "Talk to support manager"]
  },
  CONSTRUCTION: {
    text: "I can help with quote flow, permits, scheduling, materials, and project escalation paths.",
    confidence: 0.6,
    shouldEscalate: true,
    suggestedPrompts: ["Request itemized estimate", "Escalate to project coordinator"]
  },
  DENTAL: {
    text: "I can help with appointment flow, insurance questions, aftercare guidance, and front desk escalation.",
    confidence: 0.6,
    shouldEscalate: true,
    suggestedPrompts: ["Verify insurance", "Talk to front desk"]
  },
  ECOMMERCE: {
    text: "I can help with order status, shipping, returns, refunds, and fulfillment escalation.",
    confidence: 0.6,
    shouldEscalate: true,
    suggestedPrompts: ["Track my order", "Escalate to fulfillment"]
  },
  CONSULTING: {
    text: "I can help with discovery calls, proposal timelines, engagement models, billing terms, and account escalation.",
    confidence: 0.6,
    shouldEscalate: true,
    suggestedPrompts: ["Book discovery call", "Talk to account manager"]
  }
};

const defaultPromptsByScenario: Record<ScenarioMode, string[]> = {
  SAAS: ["Compare plans", "Explain onboarding timeline"],
  CONSTRUCTION: ["Request estimate", "Check permit support"],
  DENTAL: ["Book appointment", "Verify insurance"],
  ECOMMERCE: ["Track order", "Check return policy"],
  CONSULTING: ["Book discovery call", "Request proposal timeline"]
};

const topicSeedsByScenario: Record<ScenarioMode, TopicSeed[]> = {
  SAAS: saasTopicSeeds,
  CONSTRUCTION: constructionTopicSeeds,
  DENTAL: dentalTopicSeeds,
  ECOMMERCE: ecommerceTopicSeeds,
  CONSULTING: consultingTopicSeeds
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (value: string) =>
  normalize(value)
    .split(" ")
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));

const unique = <T,>(values: T[]) => Array.from(new Set(values));

const buildScenarioIndex = (
  scenario: ScenarioMode,
  seeds: TopicSeed[]
): ScenarioKnowledgeEntry[] =>
  seeds.flatMap((seed) => {
    const normalizedTopic = normalize(seed.topic);
    const phrasePool = unique(
      [normalizedTopic, ...seed.matchTerms.map((term) => normalize(term))].filter(
        (item) => item.length > 0
      )
    );

    const keywordPool = unique(
      phrasePool.flatMap((phrase) => [phrase, ...tokenize(phrase)])
    );

    return variantPromptBuilders.map((promptBuilder, variant) => {
      const focus = phrasePool[variant % phrasePool.length] ?? normalizedTopic;
      const confidence = Math.max(0.58, seed.confidence - variant * 0.01);
      const shouldEscalate = seed.shouldEscalate ?? false;
      const suggestedPrompts =
        seed.suggestedPrompts?.length
          ? seed.suggestedPrompts
          : defaultPromptsByScenario[scenario];

      return {
        id: `${scenario}_${seed.id}_v${variant + 1}`,
        matchPhrases: unique([focus, promptBuilder(focus)]),
        keywords: keywordPool,
        response: {
          text: `${seed.answer} ${responseSuffixes[variant]}`,
          confidence,
          shouldEscalate,
          suggestedPrompts
        }
      };
    });
  });

const scenarioKnowledgeIndex: Record<ScenarioMode, ScenarioKnowledgeEntry[]> = {
  SAAS: buildScenarioIndex("SAAS", topicSeedsByScenario.SAAS),
  CONSTRUCTION: buildScenarioIndex("CONSTRUCTION", topicSeedsByScenario.CONSTRUCTION),
  DENTAL: buildScenarioIndex("DENTAL", topicSeedsByScenario.DENTAL),
  ECOMMERCE: buildScenarioIndex("ECOMMERCE", topicSeedsByScenario.ECOMMERCE),
  CONSULTING: buildScenarioIndex("CONSULTING", topicSeedsByScenario.CONSULTING)
};

const MIN_MATCH_SCORE = 2.6;

const scoreEntry = (
  entry: ScenarioKnowledgeEntry,
  normalizedMessage: string,
  tokenSet: Set<string>
) => {
  let score = 0;

  for (const phrase of entry.matchPhrases) {
    if (normalizedMessage.includes(phrase)) {
      score += phrase.includes(" ") ? 4.2 : 2.6;
    }
  }

  for (const keyword of entry.keywords) {
    if (keyword.includes(" ")) {
      if (normalizedMessage.includes(keyword)) {
        score += 2.2;
      }
      continue;
    }

    if (tokenSet.has(keyword)) {
      score += 1.25;
    }
  }

  return score;
};

export const findScenarioResponse = (
  scenario: ScenarioMode,
  message: string
): AIResponse | null => {
  const normalizedMessage = normalize(message);
  if (!normalizedMessage) {
    return null;
  }

  const tokenSet = new Set(tokenize(message));
  const entries = scenarioKnowledgeIndex[scenario] ?? scenarioKnowledgeIndex.SAAS;

  let topEntry: ScenarioKnowledgeEntry | null = null;
  let topScore = 0;

  for (const entry of entries) {
    const score = scoreEntry(entry, normalizedMessage, tokenSet);
    if (score > topScore) {
      topScore = score;
      topEntry = entry;
    }
  }

  if (!topEntry || topScore < MIN_MATCH_SCORE) {
    return null;
  }

  const confidenceBoost = Math.min(0.12, topScore * 0.01);

  return {
    ...topEntry.response,
    confidence: Math.min(0.96, topEntry.response.confidence + confidenceBoost)
  };
};

export const getScenarioFallbackResponse = (scenario: ScenarioMode): AIResponse => {
  const fallback = fallbackByScenario[scenario] ?? fallbackByScenario.SAAS;
  return {
    ...fallback,
    suggestedPrompts: fallback.suggestedPrompts
      ? [...fallback.suggestedPrompts]
      : undefined
  };
};

export const scenarioKnowledgeCounts = {
  SAAS: scenarioKnowledgeIndex.SAAS.length,
  CONSTRUCTION: scenarioKnowledgeIndex.CONSTRUCTION.length,
  DENTAL: scenarioKnowledgeIndex.DENTAL.length,
  ECOMMERCE: scenarioKnowledgeIndex.ECOMMERCE.length,
  CONSULTING: scenarioKnowledgeIndex.CONSULTING.length
} as const;
