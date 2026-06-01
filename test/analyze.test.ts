import { describe, expect, it } from "vitest";
import { analyze } from "../src/analyze.js";
import { sampleBoardExpansionCapacityMap } from "../src/data/sampleVerticalBrief.js";

describe("analyze", () => {
  it("returns the expected item count", () => {
    const report = analyze(sampleBoardExpansionCapacityMap, { now: "2026-06-01T00:00:00Z" });
    expect(report.items).toBe(sampleBoardExpansionCapacityMap.length);
  });

  it("computes positive capacity metrics", () => {
    const report = analyze(sampleBoardExpansionCapacityMap, { now: "2026-06-01T00:00:00Z" });
    expect(report.averageCapacityScore).toBeGreaterThan(0);
    expect(report.averageSequencingConfidenceScore).toBeGreaterThan(0);
  });

  it("counts unlock-ready and escalation lanes", () => {
    const report = analyze(sampleBoardExpansionCapacityMap, { now: "2026-06-01T00:00:00Z" });
    expect(report.unlockReadyLanes).toBeGreaterThan(0);
    expect(report.escalationLanes).toBeGreaterThanOrEqual(0);
  });

  it("emits findings", () => {
    const report = analyze(sampleBoardExpansionCapacityMap, { now: "2026-06-01T00:00:00Z" });
    expect(report.findingsList.length).toBeGreaterThan(0);
  });

  it("rolls up unlocked capacity value", () => {
    const report = analyze(sampleBoardExpansionCapacityMap, { now: "2026-06-01T00:00:00Z" });
    expect(report.unlockedCapacityValueMillions).toBeGreaterThan(0);
  });
});
