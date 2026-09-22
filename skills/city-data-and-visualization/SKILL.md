---
name: city-data-and-visualization
description: Handle the prepared Bengaluru neighborhood dataset and build Chart.js visualizations for before/after and trend comparisons, without misleading or fabricated data.
---

# City Data and Visualization

## Purpose

Own the data layer (prepared/demo neighborhood statistics) and the charts built on top of it (Chart.js), and keep both honest and synchronized with the rest of the UI.

## Data

- A small prepared/local dataset covers 3 neighborhoods (Indiranagar, Koramangala, Whitefield) across 5 years (2010, 2015, 2020, 2025, 2026), with metrics: built-up %, green space %, road density, transit stations, commercial area %.
- This is demo/prepared data. It must never be presented as verified real-world data anywhere in the UI or copy — keep a visible "demo data" label near the numbers (the approved Figma design already does this in its footer/side panels; preserve that pattern).
- Do not invent additional statistics, historical facts, population numbers, or sources beyond what's in the data module or explicitly supplied.
- Handle missing data explicitly (a "—" or "no data" label), never silently substituting 0 or an interpolated guess.

## Charts (Chart.js)

- Use `react-chartjs-2` + `chart.js` as the charting layer (per the technology decision for this project — the approved Figma design used Recharts, but this project uses Chart.js; match the same visual intent: dark theme, amber/green/purple accent colors, clean gridlines, readable tooltips).
- Two chart types are needed:
  1. A trend chart (line/area) across all 5 years per neighborhood, for built-up, green space, and commercial area.
  2. A comparison bar chart between the two selected years (from/to) for the same metrics.
- Always label axes and units clearly (%, count, km/km²). No unlabeled axes.
- No 3D charts, no unnecessary chart types. A line/area chart for trends and a bar chart for before/after comparisons cover every case here.
- Avoid visual choices that mislead: keep consistent scales when comparing the same metric across charts, don't truncate a percentage axis in a way that exaggerates a small change.

## Synchronization

- Charts must react to: selected neighborhood, selected comparison years (from/to). They should never show stale data for a previously selected neighborhood/year pair.
- The same computed change values feed both the numeric "key indicators" rows and the charts — compute once (e.g. via a shared `calcChange` helper) and reuse, don't recompute inconsistently in two places.

## Feeding the AI Change Story

- Pass the AI Change Story feature structured data: neighborhood, fromYear, toYear, and the computed metric deltas — not raw prose. Keep the AI's input auditable (see [[ai-change-story]]).

## Testing checklist

- Changing the neighborhood updates both charts and the numeric rows.
- Changing from/to year updates the comparison chart and rows, not the trend chart (which always shows all 5 years).
- Chart tooltips show correct labeled values with units.
- Missing/edge-case data (e.g. selecting the same from/to year, if the UI allows it) doesn't crash the chart.
