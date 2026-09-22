# Memory of a City

Bengaluru-focused urban intelligence website — explore how three neighbourhoods
(Indiranagar, Koramangala, Whitefield) changed between 2010 and 2026, and ask the
AI **City Change Investigator** what might explain the change.

See `SPEC.md` for the full product spec and `CLAUDE.md` for project-level working rules.

## Project structure

```
src/            React + Vite + Tailwind frontend (Home, City Explorer, Neighborhood pages)
server/         Node.js + Express API (prepared dataset + demo City Change Investigator)
skills/         Project-specific Claude Code skills used to build this app
```

## Running locally

Two servers run side by side: the Express API (port 4000) and the Vite dev server (port 5173,
which proxies `/api/*` to the Express API).

```bash
# Terminal 1 — backend
cd server
npm install
cp .env.example .env   # then fill in your real GEMINI_API_KEY — see "AI setup" below
npm run dev

# Terminal 2 — frontend
npm install
npm run dev
```

Then open http://localhost:5173.

### AI setup (City Change Investigator)

The "What Changed?" feature calls the real Gemini API. Get a key from
[Google AI Studio](https://aistudio.google.com/), put it in `server/.env` as
`GEMINI_API_KEY=...` (never in a `VITE_`-prefixed variable, and `server/.env` must never
be committed — it's gitignored), and restart the backend.

Gemini access depends on the Google project/account behind the key (model availability,
billing, and API access can vary independently of whether the key itself is valid) — this
is outside the app's control. Whenever the key is missing, invalid, or Gemini is otherwise
unavailable, `POST /api/change-story` returns a clear error and the frontend shows its
existing error state ("Something went wrong" + Try again) instead of crashing or silently
falling back — the rest of the app keeps working normally.

## Data

The neighbourhood dataset (`server/data/bengaluru.js`) is small prepared/demo data, not
verified real-world statistics — every place it's shown in the UI is labelled as demo data.
The AI Change Story endpoint (`POST /api/change-story`) sends Gemini only the selected
neighbourhood, the exact selected year range, the computed observed changes for that range,
and our own evidence list — it's instructed never to invent facts, statistics, evidence, or
a different year range, and to say so explicitly when the evidence can't establish a cause.
The response is returned with `source: "live-ai"`.

## Build

```bash
npm run build   # type-checks then builds the frontend to dist/
```
