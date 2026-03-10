export interface TopicSeed {
  id: string;
  topic: string;
  matchTerms: string[];
  answer: string;
  confidence: number;
  suggestedPrompts?: string[];
  shouldEscalate?: boolean;
}

export const topic = (
  id: string,
  topicLabel: string,
  matchTerms: string[],
  answer: string,
  confidence: number,
  suggestedPrompts?: string[],
  shouldEscalate?: boolean
): TopicSeed => ({
  id,
  topic: topicLabel,
  matchTerms,
  answer,
  confidence,
  suggestedPrompts,
  shouldEscalate
});
