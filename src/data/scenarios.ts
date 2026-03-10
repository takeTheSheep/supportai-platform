import { ScenarioPreset } from "@/types/domain";

export const scenarioPresets: ScenarioPreset[] = [
  {
    id: "SAAS",
    name: "SaaS Company",
    summary: "Product onboarding, billing, and feature questions for a B2B software team.",
    prompts: [
      "What are your pricing plans?",
      "Do you offer support on weekends?",
      "How long does implementation take?",
      "Can I talk to a human?",
      "How do I request a quote?"
    ],
    knowledgeContext: [
      "Starter plan supports up to 5 team members.",
      "Implementation usually takes 7 to 14 business days.",
      "Weekend support is included in Pro and Enterprise plans."
    ]
  },
  {
    id: "CONSTRUCTION",
    name: "Construction Business",
    summary: "Quote timelines, project scheduling, permit guidance, and field coordination.",
    prompts: [
      "How quickly can you start a project?",
      "Do you handle permits?",
      "Can I get an itemized estimate?",
      "Who is my project contact?",
      "Can I request urgent support?"
    ],
    knowledgeContext: [
      "Most projects begin within 2 to 4 weeks after contract approval.",
      "Permit preparation is available as an add-on service.",
      "Customers receive weekly milestone updates by default."
    ]
  },
  {
    id: "DENTAL",
    name: "Dental Clinic",
    summary: "Appointment questions, insurance verification, and follow-up care information.",
    prompts: [
      "Do you accept walk-ins?",
      "Which insurance providers do you accept?",
      "Can I change my appointment online?",
      "What should I do after a cleaning?",
      "How can I reach front desk staff?"
    ],
    knowledgeContext: [
      "The clinic accepts PPO plans from major carriers.",
      "Appointment changes can be made through the patient portal.",
      "Urgent care requests are triaged by on-call staff within 30 minutes."
    ]
  },
  {
    id: "ECOMMERCE",
    name: "E-commerce Store",
    summary: "Order tracking, returns, shipping windows, and product support.",
    prompts: [
      "Where is my order?",
      "How does your return policy work?",
      "Do you offer expedited shipping?",
      "How can I speak with support?",
      "Can I edit my order after checkout?"
    ],
    knowledgeContext: [
      "Returns are accepted within 30 days for unused items.",
      "Expedited shipping is available in select regions.",
      "Order edits are possible within 45 minutes of purchase."
    ]
  },
  {
    id: "CONSULTING",
    name: "Consulting Agency",
    summary: "Discovery calls, engagement models, and proposal workflow support.",
    prompts: [
      "How do you scope a project?",
      "What engagement models do you offer?",
      "Can I book a discovery call?",
      "What is your onboarding process?",
      "How can I request a custom proposal?"
    ],
    knowledgeContext: [
      "Discovery calls are scheduled within 2 business days.",
      "Engagement models include fixed-scope and retained advisory.",
      "Custom proposals are delivered in 3 to 5 business days."
    ]
  }
];

