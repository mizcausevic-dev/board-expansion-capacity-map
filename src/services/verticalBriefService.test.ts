import { describe, expect, it } from "vitest";
import { capacityMap, deliveryBottlenecks, growthSequencing, payload, riskMap, summary, verification } from "./verticalBriefService.js";

describe("board expansion capacity service", () => {
  it("returns the summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the capacity map", () => {
    expect(capacityMap()[0]?.audience).toBeTruthy();
  });

  it("returns the delivery bottlenecks view", () => {
    expect(deliveryBottlenecks()[0]?.bottleneckScore).toBeGreaterThan(0);
  });

  it("returns the growth sequencing view", () => {
    expect(growthSequencing()[0]?.unlockedCapacityValueMillions).toBeGreaterThan(0);
  });

  it("returns the risk map", () => {
    expect(riskMap().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification()[0]).toContain("Synthetic");
  });

  it("keeps the headline in the payload sample", () => {
    expect(payload().sample[0]?.headline).toBeTruthy();
  });
});
