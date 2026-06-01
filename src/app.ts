import express from "express";
import {
  renderDocs,
  renderCapacityMap,
  renderOverview,
  renderDeliveryBottlenecks,
  renderGrowthSequencing,
  renderVerification
} from "./services/render.js";
import {
  capacityMap,
  growthSequencing,
  payload,
  deliveryBottlenecks,
  riskMap,
  summary,
  verification
} from "./services/verticalBriefService.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderOverview()));
  app.get("/capacity-map", (_req, res) => res.type("html").send(renderCapacityMap()));
  app.get("/delivery-bottlenecks", (_req, res) => res.type("html").send(renderDeliveryBottlenecks()));
  app.get("/growth-sequencing", (_req, res) => res.type("html").send(renderGrowthSequencing()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/capacity-map", (_req, res) => res.json(capacityMap()));
  app.get("/api/delivery-bottlenecks", (_req, res) => res.json(deliveryBottlenecks()));
  app.get("/api/growth-sequencing", (_req, res) => res.json(growthSequencing()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

const port = Number(process.env.PORT || 4010);

if (process.env.NODE_ENV !== "test") {
  createApp().listen(port, () => {
    console.log(`board-expansion-capacity-map listening on http://127.0.0.1:${port}`);
  });
}
