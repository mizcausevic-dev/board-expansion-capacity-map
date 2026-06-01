import { analyze } from "../analyze.js";
import { sampleBoardExpansionCapacityMap } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardExpansionCapacityMap, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    items: report.items,
    averageCapacityScore: report.averageCapacityScore,
    averageBottleneckScore: report.averageBottleneckScore,
    averageBandwidthConfidenceScore: report.averageBandwidthConfidenceScore,
    averageSequencingConfidenceScore: report.averageSequencingConfidenceScore,
    averageUrgencyScore: report.averageUrgencyScore,
    unlockReadyLanes: report.unlockReadyLanes,
    escalationLanes: report.escalationLanes,
    unlockedCapacityValueMillions: report.unlockedCapacityValueMillions,
    highFindings,
    recommendation:
      "Unlock procurement and AI capacity, hold revenue until reporting friction falls, stabilize identity and biotech team bandwidth, and escalate FinTech fragmentation before another growth ask."
  };
}

export function capacityMap() {
  return sampleBoardExpansionCapacityMap.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    action: item.action,
    capacityTheme: item.capacityTheme,
    capacityScore: item.capacityScore,
    nextMove: item.nextMove
  }));
}

export function deliveryBottlenecks() {
  return sampleBoardExpansionCapacityMap.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    bottleneckScore: item.bottleneckScore,
    bandwidthConfidenceScore: item.bandwidthConfidenceScore,
    sequencingConfidenceScore: item.sequencingConfidenceScore,
    requiredEvidence: item.requiredEvidence
  }));
}

export function growthSequencing() {
  return sampleBoardExpansionCapacityMap.map((item) => ({
    owner: item.owner,
    audience: item.audience,
    action: item.action,
    unlockedCapacityValueMillions: item.unlockedCapacityValueMillions,
    capacityScore: item.capacityScore,
    companyTags: item.companyTags
  }));
}

export function riskMap() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return [...report.findingsList].sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function verification() {
  return [
    "Synthetic expansion-capacity data only - no live board packets, budgets, or actual staffing plans are included.",
    "Capacity, bottleneck, bandwidth-confidence, sequencing-confidence, urgency, and unlocked capacity value metrics are modeled from the sample executive-intelligence estate in this repo.",
    "This surface is read-only and shows how Kinetic Gain can package board-readable expansion capacity into one decision layer.",
    "Company tags and track labels are synthetic design aids rather than audited market or financial signals.",
    "Every route and packet is reproducible from the included sample export."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    capacityMap: capacityMap(),
    deliveryBottlenecks: deliveryBottlenecks(),
    growthSequencing: growthSequencing(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardExpansionCapacityMap
  };
}
