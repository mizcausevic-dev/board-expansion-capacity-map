import { toExport } from "../src/analyze.js";
import { sampleBoardExpansionCapacityMap } from "../src/data/sampleVerticalBrief.js";
import { writeFileSync } from "node:fs";

const clean = sampleBoardExpansionCapacityMap.map((item) => ({
  ...item,
  relatedSurfaces: [...item.relatedSurfaces].sort(),
  requiredEvidence: [...item.requiredEvidence].sort(),
  companyTags: [...item.companyTags].sort()
}));

writeFileSync("fixtures/board-expansion-capacity-map.json", JSON.stringify(toExport(sampleBoardExpansionCapacityMap), null, 2));

writeFileSync("fixtures/board-expansion-capacity-map-clean.json", JSON.stringify(toExport(clean), null, 2));
