import { SymptomType } from './types';

export const APP_NAME = "Hoover Tracker & Narcissist Pattern Decoder";
export const TAGLINE = "Reclaim Your Power, Rewrite Your Reality.";

export const SYMPTOM_DECODER_MESSAGES: Record<SymptomType, string> = {
  [SymptomType.STOMACH_ISSUES]: "Message: \"I can't digest this reality\". Triggered by: Their lies, false narratives, gaslighting. Your body literally cannot process their version of reality.",
  [SymptomType.HEADACHES_MIGRAINES]: "Message: \"I can't think clearly around this person\". Triggered by: Cognitive dissonance, crazy-making, word salad. Your brain is literally inflaming to protect itself from their logic.",
  [SymptomType.SKIN_CONDITIONS]: "Message: \"I need a barrier between us\". Triggered by: Boundary violations, invasive behavior. Your largest organ is trying to create physical separation.",
  [SymptomType.SLEEP_DISRUPTION]: "Message: \"It's not safe to be unconscious\". Triggered by: Hypervigilance, waiting for the next attack. Your nervous system won't let you be vulnerable.",
  [SymptomType.CHRONIC_FATIGUE]: "Message: \"Why bother having energy?\". Triggered by: Futility, endless circular arguments. Your mitochondria literally stop producing energy for pointless battles.",
  [SymptomType.AUTOIMMUNE_FLARES]: "Message: \"I'm attacking myself like they attack me\". Triggered by: Self-blame, internalized abuse. Your immune system mirrors the external attack internally.",
  [SymptomType.OTHER]: "Listen closely to what your body is trying to tell you about this situation or person.",
};

export const HOOVER_CYCLE_DEFINITIONS = [
  { name: "First Contact Window", startDays: 45, endDays: 49, description: "Initial hoover attempt likely. They may test the waters." },
  { name: "Second Attempt Window", startDays: 90, endDays: 95, description: "If the first attempt failed or wasn't made, they might try a more sophisticated approach." },
  { name: "Extinction Burst Window", startDays: 140, endDays: 150, description: "A period of increased attempts, possibly more intense, as they feel their control slipping." },
  { name: "One Year Anniversary", startDays: 365, endDays: 365, description: "Anniversaries can be triggers for them to re-establish contact or test your boundaries." },
];

export const EMPOWERMENT_QUOTES: string[] = [
  "Understanding the pattern is the first step to breaking it.",
  "Your body is a truth detector. Listen to its signals.",
  "If you can change your signal, you change your reality.",
  "You are not broken. You are brilliantly adapted. Now it's time to adapt to peace.",
  "The moment you stop needing protection is the moment you become protected.",
  "Sovereignty is not a concept, it's a frequency.",
  "Your liberation has already begun.",
  "Every day of No Contact is a step deeper into your power.",
  "Healing isn't linear, but every conscious choice moves you forward.",
  "You are rewriting your story, one sovereign day at a time."
];

export const SOVEREIGN_MILESTONES: { days: number; message: string; }[] = [
  { days: 7, message: "One Week of Clarity! You're building momentum." },
  { days: 30, message: "30 Days Strong! A significant step in rewiring." },
  { days: 47, message: "Day 47: Beyond the Cycle! You've passed a critical marker." },
  { days: 90, message: "90 Days of Freedom! New neural pathways are forming." },
  { days: 100, message: "100 Days of Sovereignty! A true milestone!" },
  { days: 180, message: "Six Months of Growth! You're transforming." },
  { days: 365, message: "One Year of Liberation! Celebrate your incredible journey!" },
];
