# Architecture

Board Expansion Capacity Map is a static-friendly TypeScript executive-intelligence surface for showing where leadership still has growth room, where delivery bottlenecks are tightening, and which owners can unlock more capacity safely.

## Core flow

- `src/data/sampleVerticalBrief.ts` models expansion-capacity lanes across AI, identity, revenue, FinTech, biotech, procurement, and public-sector operations.
- `src/analyze.ts` scores capacity, bottlenecks, bandwidth confidence, sequencing confidence, urgency, and unlocked capacity value while generating capacity findings.
- `src/services/verticalBriefService.ts` exposes the capacity-map, delivery-bottlenecks, growth-sequencing, and risk-map packets used by both the app and prerender step.
- `src/services/render.ts` turns those packets into board-readable HTML routes plus a sample export.
- `scripts/prerender.ts` produces the static site and JSON payloads for GitHub Pages.

## Output shape

Each lane is designed to answer the same executive questions:

- where can growth safely expand now
- where are bottlenecks still open
- which owners can actually absorb more demand
- which sequencing story can survive the next board or diligence room

## Guardrails

- synthetic data only
- read-only public surface
- no tenant credentials or private documents
- no compliance overclaim language
