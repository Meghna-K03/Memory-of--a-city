---
name: ai-change-story
description: Implement the City Change Investigator feature that explains neighborhood change, clearly separating observed data from AI-generated explanation and never overstating causation.
---

# AI Change Story (City Change Investigator)

## Purpose

Implement the "City Change Investigator": given a neighborhood and two years, explain what changed and what might have contributed to it, without fabricating facts or claiming certainty the evidence doesn't support.

## Input

- neighborhood
- first comparison year, second comparison year
- observed change data (the computed deltas from [[city-data-and-visualization]])
- available evidence (the prepared evidence/source entries for that neighborhood)

## Output structure (always these three parts, in this order)

1. **What changed?** — a factual summary drawn directly from the observed data. No causal language here.
2. **What could have contributed to the change?** — possible explanations, explicitly hedged ("possible contributing factors include...", "the data is consistent with...").
3. **What evidence supports this?** — link back to the specific evidence entries used.

## Language rules

- Never write "this happened because X" as a bare assertion.
- Use hedged phrasing: "The data shows...", "Possible contributing factors include...", "Available evidence suggests...".
- Every explanatory claim should be traceable to either the observed data or a listed evidence source — if neither supports a claim, don't include it.

## UI separation

- The UI must visually distinguish **observed data** (measured/computed) from **AI-generated explanation** (interpretation) — e.g. separate sections/labels, not blended into one paragraph.
- Keep a visible disclaimer near the AI output stating it's based on demo/prepared data and may not reflect verified real-world causation.

## No real AI API configured

- If no real AI/LLM API key is configured for this project, build the complete UI plus a clearly-labeled demo/mock response generator (e.g. a local function that assembles the three-part structure from the prepared per-neighborhood narrative data) — do not silently fabricate an API integration or invent credentials.
- Structure the feature (a single function/module that takes the input shape above and returns the three-part output shape) so a real AI API call can later be substituted in without changing the calling UI code.
- Never purchase, expose, or hardcode a paid API key.

## Loading & error states

- Show a clear loading/"thinking" state while the story is being generated (even the mock path should have a brief, intentional loading state so the UI pattern is exercised and testable).
- If generation fails (or would fail, for the real-API case), show an understandable error state, not a blank panel.

## Testing checklist

- "What Changed?" button triggers the loading state, then the three-part result.
- Switching neighborhood or years resets the AI panel back to idle (stale explanations must not persist for a different selection).
- Output for each of the 3 approved neighborhoods renders without missing fields.
- Disclaimer text is visible whenever AI output is shown.
