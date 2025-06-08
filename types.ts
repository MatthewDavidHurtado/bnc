export enum SymptomType {
  STOMACH_ISSUES = "Stomach Issues (Nausea, cramping, IBS)",
  HEADACHES_MIGRAINES = "Headaches/Migraines",
  SKIN_CONDITIONS = "Skin Conditions (Breakouts, rashes, hives)",
  SLEEP_DISRUPTION = "Sleep Disruption (Insomnia, nightmares, 3 AM waking)",
  CHRONIC_FATIGUE = "Chronic Fatigue",
  AUTOIMMUNE_FLARES = "Autoimmune Flares",
  OTHER = "Other",
}

export interface SymptomLogEntry {
  id: string;
  date: string; // ISO date string
  symptom: SymptomType;
  intensity: number; // 1-5
  notes?: string;
  decodedMessage?: string;
}

export enum HooverAttemptType {
  TEXT = "Text Message",
  CALL = "Phone Call",
  EMAIL = "Email",
  SOCIAL_MEDIA = "Social Media",
  IN_PERSON = "In Person",
  FLYING_MONKEY = "Via Flying Monkey",
  OTHER = "Other",
}

export interface HooverAttempt {
  id:string;
  date: string; // ISO date string
  type: HooverAttemptType;
  description: string;
  emotionalImpact?: string;
}

export interface JournalEntry {
  id: string;
  date: string; // ISO date string
  title: string;
  content: string;
  tags?: string[];
}

export interface UserData {
  noContactStartDate?: string; // ISO date string
  symptomLogs: SymptomLogEntry[];
  hooverAttempts: HooverAttempt[];
  journalEntries: JournalEntry[];
}

export interface HooverPrediction {
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  isPast: boolean;
  isCurrent: boolean;
  isUpcoming: boolean;
}