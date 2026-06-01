import type { BoardExpansionCapacityReport } from "./types.js";

export function toSummary(report: BoardExpansionCapacityReport) {
  return [
    `Capacity lanes: ${report.items}`,
    `Average capacity score: ${report.averageCapacityScore}`,
    `Average bottleneck score: ${report.averageBottleneckScore}`,
    `Average bandwidth confidence: ${report.averageBandwidthConfidenceScore}`,
    `Average sequencing confidence: ${report.averageSequencingConfidenceScore}`,
    `Average urgency: ${report.averageUrgencyScore}`,
    `Unlock-ready lanes: ${report.unlockReadyLanes}`,
    `Escalation lanes: ${report.escalationLanes}`,
    `Unlocked capacity value ($M): ${report.unlockedCapacityValueMillions}`,
    `High findings: ${report.findingsList.filter((item) => item.severity === "high").length}`
  ].join("\n");
}
