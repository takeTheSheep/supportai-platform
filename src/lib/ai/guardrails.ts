import { AIRequest } from "@/lib/ai/types";

const restrictedKeywords = [
  "legal advice",
  "medical diagnosis",
  "password leak",
  "exploit",
  "credit card"
];

export const runGuardrails = (input: AIRequest) => {
  const normalized = input.message.toLowerCase();

  const blocked = restrictedKeywords.find((keyword) => normalized.includes(keyword));
  if (blocked) {
    return {
      allowed: false,
      reason: `Topic blocked by policy: ${blocked}`
    };
  }

  if (normalized.length > 1000) {
    return {
      allowed: false,
      reason: "Input exceeds allowed length"
    };
  }

  return {
    allowed: true
  };
};

