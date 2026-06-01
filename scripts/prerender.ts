import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  renderDocs,
  renderCapacityMap,
  renderOverview,
  renderDeliveryBottlenecks,
  renderGrowthSequencing,
  renderVerification
} from "../src/services/render.js";
import {
  capacityMap,
  deliveryBottlenecks,
  growthSequencing,
  payload,
  riskMap,
  summary,
  verification
} from "../src/services/verticalBriefService.js";

const root = path.resolve("site");
rmSync(root, { recursive: true, force: true });
mkdirSync(root, { recursive: true });

if (existsSync("CNAME")) {
  writeFileSync(path.join(root, "CNAME"), readFileSync("CNAME", "utf8").trim() + "\n");
}

const htmlRoutes = new Map<string, [string, string]>([
  ["/", ["index.html", renderOverview()]],
  ["/capacity-map", ["capacity-map/index.html", renderCapacityMap()]],
  ["/delivery-bottlenecks", ["delivery-bottlenecks/index.html", renderDeliveryBottlenecks()]],
  ["/growth-sequencing", ["growth-sequencing/index.html", renderGrowthSequencing()]],
  ["/verification", ["verification/index.html", renderVerification()]],
  ["/docs", ["docs/index.html", renderDocs()]]
]);

for (const [, [target, html]] of htmlRoutes) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
}

writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://expansion.kineticgain.com/sitemap.xml\n");
writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://expansion.kineticgain.com/</loc></url><url><loc>https://expansion.kineticgain.com/capacity-map/</loc></url><url><loc>https://expansion.kineticgain.com/delivery-bottlenecks/</loc></url><url><loc>https://expansion.kineticgain.com/growth-sequencing/</loc></url><url><loc>https://expansion.kineticgain.com/verification/</loc></url><url><loc>https://expansion.kineticgain.com/docs/</loc></url></urlset>`
);

const api = {
  "api/dashboard/summary.json": summary(),
  "api/capacity-map.json": capacityMap(),
  "api/delivery-bottlenecks.json": deliveryBottlenecks(),
  "api/growth-sequencing.json": growthSequencing(),
  "api/risk-map.json": riskMap(),
  "api/verification.json": verification(),
  "api/sample.json": payload().sample,
  "api/payload.json": payload()
};

for (const [target, data] of Object.entries(api)) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}
