export type CapacityTrack =
  | "AI_PLATFORM"
  | "IDENTITY_SECURITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "BIOTECH_DIAGNOSTICS"
  | "PROCUREMENT_TRUST"
  | "PUBLIC_SECTOR";

export type CapacityAction = "UNLOCK" | "STABILIZE" | "HOLD" | "ESCALATE";

export interface BoardExpansionCapacityItem {
  id: string;
  owner: string;
  audience: string;
  track: CapacityTrack;
  action: CapacityAction;
  capacityTheme: string;
  boardQuestion: string;
  currentPosture: string;
  requiredProof: string;
  capacityScore: number;
  bottleneckScore: number;
  bandwidthConfidenceScore: number;
  sequencingConfidenceScore: number;
  urgencyScore: number;
  unlockedCapacityValueMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
  companyTags: string[];
  relatedSurfaces: string[];
  requiredEvidence: string[];
}

export interface BoardExpansionCapacityExport {
  generatedAt: string;
  items: BoardExpansionCapacityItem[];
}

export type FindingCode =
  | "capacity-open"
  | "delivery-bottleneck"
  | "bandwidth-gap"
  | "sequencing-gap"
  | "escalation-needed";

export interface Finding {
  code: FindingCode;
  severity: "high" | "medium" | "low" | "info";
  track: CapacityTrack;
  audience: string;
  message: string;
}

export interface BoardExpansionCapacityReport {
  generatedAt: string;
  items: number;
  averageCapacityScore: number;
  averageBottleneckScore: number;
  averageBandwidthConfidenceScore: number;
  averageSequencingConfidenceScore: number;
  averageUrgencyScore: number;
  unlockReadyLanes: number;
  escalationLanes: number;
  unlockedCapacityValueMillions: number;
  findingsList: Finding[];
  ok: boolean;
}
