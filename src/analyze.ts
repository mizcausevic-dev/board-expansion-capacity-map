import type {
  BoardExpansionCapacityExport,
  BoardExpansionCapacityItem,
  BoardExpansionCapacityReport,
  Finding
} from "./types.js";

function average(items: BoardExpansionCapacityItem[], pick: (item: BoardExpansionCapacityItem) => number) {
  return Math.round(items.reduce((sum, item) => sum + pick(item), 0) / items.length);
}

function evaluate(item: BoardExpansionCapacityItem): Finding[] {
  const findings: Finding[] = [];

  if (item.action === "UNLOCK" && item.capacityScore >= 74 && item.bottleneckScore <= 38 && item.sequencingConfidenceScore >= 78) {
    findings.push({
      code: "capacity-open",
      severity: "info",
      track: item.track,
      audience: item.audience,
      message: "This lane has enough open capacity to support the next board-approved growth motion."
    });
  }

  if (item.bottleneckScore >= 68) {
    findings.push({
      code: "delivery-bottleneck",
      severity: item.bottleneckScore >= 80 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "Delivery bottlenecks are still strong enough to cap expansion capacity in this lane."
    });
  }

  if (item.bandwidthConfidenceScore <= 64) {
    findings.push({
      code: "bandwidth-gap",
      severity: item.bandwidthConfidenceScore <= 54 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "Operator bandwidth confidence is still too weak to expand this lane safely."
    });
  }

  if (item.sequencingConfidenceScore < 70) {
    findings.push({
      code: "sequencing-gap",
      severity: item.sequencingConfidenceScore < 60 ? "high" : "medium",
      track: item.track,
      audience: item.audience,
      message: "Leadership still lacks enough sequencing confidence to open more capacity in this lane."
    });
  }

  if (item.action === "ESCALATE") {
    findings.push({
      code: "escalation-needed",
      severity: "high",
      track: item.track,
      audience: item.audience,
      message: "This lane should be escalated before another capacity expansion claim reaches the board."
    });
  }

  return findings;
}

export function analyze(items: BoardExpansionCapacityItem[], options: { now?: string } = {}): BoardExpansionCapacityReport {
  const generatedAt = options.now ?? new Date().toISOString();
  const findingsList = items.flatMap((item) => evaluate(item));
  const unlockReadyLanes = items.filter((item) => item.action === "UNLOCK").length;
  const escalationLanes = items.filter((item) => item.action === "ESCALATE").length;
  const unlockedCapacityValueMillions = Math.round(items.reduce((sum, item) => sum + item.unlockedCapacityValueMillions, 0));

  return {
    generatedAt,
    items: items.length,
    averageCapacityScore: average(items, (item) => item.capacityScore),
    averageBottleneckScore: average(items, (item) => item.bottleneckScore),
    averageBandwidthConfidenceScore: average(items, (item) => item.bandwidthConfidenceScore),
    averageSequencingConfidenceScore: average(items, (item) => item.sequencingConfidenceScore),
    averageUrgencyScore: average(items, (item) => item.urgencyScore),
    unlockReadyLanes,
    escalationLanes,
    unlockedCapacityValueMillions,
    findingsList,
    ok: findingsList.filter((item) => item.severity === "high").length <= items.length
  };
}

export function toExport(items: BoardExpansionCapacityItem[], now?: string): BoardExpansionCapacityExport {
  return {
    generatedAt: now ?? new Date().toISOString(),
    items
  };
}
