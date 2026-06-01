import { readFileSync } from "node:fs";
import { analyze } from "./analyze.js";
import { toSummary } from "./format.js";
import type { BoardExpansionCapacityItem } from "./types.js";

const defaultPath = "fixtures/board-expansion-capacity-map.json";

if (process.argv.includes("--help")) {
  console.error("Usage: board-expansion-capacity-map <file> --format <summary|json>");
  process.exit(0);
}

const file = process.argv[2] || defaultPath;
const formatFlag = process.argv.indexOf("--format");
const format = formatFlag >= 0 ? process.argv[formatFlag + 1] : "summary";

try {
  const items = JSON.parse(readFileSync(file, "utf8")) as { items: BoardExpansionCapacityItem[] };
  const report = analyze(items.items, { now: "2026-06-01T00:00:00Z" });

  if (format === "json") {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(toSummary(report));
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
