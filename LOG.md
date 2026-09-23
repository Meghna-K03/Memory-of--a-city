# Memory of a City — Week 2 Log

**Date:** 2026-09-23

## 1. Live Multi-Page Site

**Status: Not deployed yet.**

The site runs locally as a multi-page application with the 3 pages required by `CLAUDE.md`:

- **Home**
- **City Explorer** — map, timeline, and filters
- **Neighborhood / Change Story** — charts, City Change Investigator, and evidence

Verified locally with `npm run build`, which completes successfully without TypeScript or build errors.

The application has not yet been deployed to a public hosting service, so there is currently **no public URL**. Deployment is still outstanding for the deliverable.

## 2. Merged Pull Request

**Status: Done.**

`PR #1` — `feature/scaffold-app → main` — was merged on GitHub for the repository `Meghna-K03/Memory-of--a-city`.

The merged PR covered the initial project scaffold, including the frontend, server, skills, and configuration.

Today's additional changes are currently in the working tree and have **not yet been committed, pushed, or opened as a PR**.

## 3. MCP Tools

| Tool | Status | Purpose |
|---|---|---|
| **Figma MCP** | **Used** | Used to access the approved Figma design and support implementation of the website UI, including layout, styling, and interface structure. |
| **GitHub MCP** | **Used** | Used for the GitHub workflow, including committing, pushing project changes, and opening the Pull Request. |

## 4. Custom Skills

Six project-specific Skills were created for the project:

| Skill | Purpose | Status |
|---|---|---|
| `figma-to-code` | Converts the approved Figma design into React and Tailwind implementation while maintaining visual consistency. | Created |
| `frontend-development` | Guides React/Vite/Tailwind frontend development, including component structure, routing, responsiveness, and accessibility. | Created |
| `map-and-timeline` | Guides the Leaflet/OpenStreetMap map and year-based timeline functionality. | Created |
| `codebase-verification-and-testing` | Guides the Understand → Plan → Build → Test → Report workflow and verification of implemented features. | Created |
| `city-data-and-visualization` | Guides the use of Bengaluru city data and Chart.js visualizations while distinguishing demo data from verified data. | Created |
| `ai-change-story` | Guides the City Change Investigator and ensures AI interpretations do not invent evidence or overstate causation. | Created |

The Skills were created as project-specific instructions. Their documented rules were used to guide development where applicable.

## 5. `CLAUDE.md`

**Purpose:**

`CLAUDE.md` provides the standing instructions for Claude Code when working on this project.

It defines the project's scope, technology stack, approved Figma design, three-page structure, Bengaluru-only focus, design guidelines, data requirements, AI guidelines, accessibility expectations, testing requirements, and GitHub workflow.

It also establishes the working process:

**Understand → Plan → Build → Test → Report**

This helps keep development consistent with the project requirements and prevents unsupported changes or claims.

## 6. Today's Progress

The following work was completed and verified today:

- **Fixed a Leaflet map rendering issue** where black gaps appeared between OpenStreetMap tiles. The fix was applied in `src/index.css` using a small tile scaling adjustment.
- **Diagnosed the Gemini AI integration failure** and confirmed that the issue was related to Google's project access rather than the application request structure.
- **Migrated the backend AI provider from Gemini to Groq**, replacing the Gemini integration with the Groq SDK and the `openai/gpt-oss-20b` model.
- **Verified the Groq integration successfully.** The `/api/change-story` endpoint returned HTTP 200 with `source: "live-ai"` and populated AI interpretation fields for test cases including Indiranagar and Koramangala.
- **Protected API credentials** by keeping real API keys in the gitignored `server/.env` file and restoring `server/.env.example` to placeholder values.
- **Verified the frontend build** using `npm run build`.

## 7. Outstanding Work

- Deploy the website to a public hosting service and obtain a live URL.
- Commit and push today's changes.
- Open and merge a Pull Request for today's changes.