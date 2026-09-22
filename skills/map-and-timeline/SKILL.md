---
name: map-and-timeline
description: Implement and maintain the Bengaluru Leaflet/OpenStreetMap map and the year timeline, including layer filters and neighborhood selection.
---

# Map and Timeline

## Purpose

The map is the centerpiece of the City Explorer page. This skill covers building and keeping correct the map, its filters, and the year timeline that drives it.

## Stack

- **Leaflet + OpenStreetMap** via `react-leaflet`. Do not introduce a paid map provider (Google Maps, Mapbox with a paid key) when Leaflet/OSM is sufficient — it is.
- Use standard OSM raster tiles with a CSS `invert()`/`hue-rotate()` filter (see `.leaflet-tile-pane` in `src/index.css`) to match the approved Figma design's dark map aesthetic. CARTO's free dark-tile endpoint now requires an API key, so it isn't usable here — don't reintroduce it.

## Timeline

- Years: **2010, 2015, 2020, 2025, 2026.**
- The timeline is a controlled component: it receives the selected year and an `onChange` handler, and does not own the year as local truth — the parent page (City Explorer) owns `selectedYear` state.
- Selecting a year must update: marker sizing/appearance on the map, the stats panel, and any dependent UI on the same page. Nothing should silently go stale when the year changes.

## Neighborhood selection

- Initial neighborhoods: **Indiranagar, Koramangala, Whitefield** — sourced from the shared data module, not hardcoded again in map components.
- Clicking a marker or a neighborhood pill selects/deselects it, flies the map to it, and opens the neighborhood detail panel.
- Only one neighborhood is selected at a time in City Explorer.

## Map layers / filters

- Buildings, Green Spaces, Roads, Public Transport, Commercial Areas.
- Filters are independent toggles; reflect active filters visibly in both the filter panel and (where feasible) the map rendering (e.g. marker color/behavior tied to which layer is active).
- If a filter has no real geometry data behind it yet, do not fake map geometry to make it look implemented — it's fine for a filter to only affect what's visually emphasized, as long as this isn't presented as more sophisticated than it is.

## Data integrity

- Never invent geographic coordinates, boundaries, or place names. Use the coordinates already defined in the data module for the three approved neighborhoods.
- If a data point is missing for a given year/neighborhood, show a clear "no data" state rather than defaulting to 0 or a guessed number.

## Loading & error states

- Show a loading state while the map/tiles initialize.
- If tiles fail to load, show a visible error rather than a blank dark rectangle.

## Testing checklist

- Year change updates marker sizes/appearance and the stats panel.
- Each filter toggles independently and visibly.
- Clicking a neighborhood marker and clicking its pill produce the same selection state.
- Map remains usable (pan/zoom, controls reachable) at mobile width.
