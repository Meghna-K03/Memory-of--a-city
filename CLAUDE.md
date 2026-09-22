# CLAUDE.md — Memory of a City

## 1. Project

**Memory of a City** is a Bengaluru-focused Urban Intelligence website.

Users can explore Bengaluru through different years, select neighborhoods, see changes, and use AI to understand the possible reasons behind those changes.

Read `SPEC.md` before making major project decisions.

## 2. Main Pages

The first version has 3 main pages:
1. Home
2. City Explorer
3. Neighborhood / Change Story

Do not add extra pages unless they are needed or we ask for them.

## 3. Main User Flow

Home → City Explorer → Select year → Select neighborhood → View changes → What Changed? → AI Change Story → Evidence

Keep this flow simple and easy to understand.

## 4. Bengaluru Scope

The project focuses on **Bengaluru**, not the whole of India.

The first neighborhoods can include:
- Indiranagar
- Koramangala
- Whitefield

The final neighborhoods depend on the data available.

Do not add random neighborhoods or geographic information just to fill the UI.

## 5. Technology

Use:
- React
- Vite
- Tailwind CSS
- Leaflet + OpenStreetMap
- Chart.js
- Node.js
- Express

Do not change the main technology stack without asking.

## 6. Figma

The approved Figma design is the main visual reference.

Use Figma MCP to understand the design when needed.

Try to match:
- layout
- spacing
- typography
- colors
- cards
- map layout
- timeline
- interactions

Do not replace the approved design with a completely different design.

Do not directly change the Figma design unless we ask.

## 7. Website Style

The website should feel:
- premium
- modern
- clean
- cinematic
- urban
- data-focused

Prefer:
- dark and clean backgrounds
- strong typography
- good spacing
- clean data cards
- subtle animations
- map-focused layouts
- simple visual hierarchy

Avoid:
- too many colors
- excessive glow/neon effects
- too many cards
- unnecessary animations
- tiny text
- generic admin-dashboard designs

The website should look visually impressive but still be easy to use.

## 8. Map

The map is one of the most important parts of the website.

Use Leaflet and OpenStreetMap.

The map should clearly show:
- selected year
- active filters
- selected neighborhood
- useful map information

Do not create fake geographic information.

## 9. Data

We may use a small prepared dataset during the first version.

If data is demo data, do not present it as verified real-world data.

Do not invent statistics, historical facts, or sources.

## 10. AI Change Story

The AI will receive:
- neighborhood
- selected years
- change data
- available evidence

The AI should explain:
- what changed
- possible reasons
- evidence supporting those reasons

Do not present guesses as confirmed facts.

## 11. Components

Use reusable components for:
- Navbar
- buttons
- timeline
- filters
- statistic cards
- map controls
- comparison sections
- evidence cards

Use simple and clear names.

Do not create unnecessary complex architecture.

## 12. Responsive Design

Make the website usable on:
- desktop
- tablet
- mobile

The map, timeline, navigation, and cards should not break on smaller screens.

## 13. Testing

Every important feature must be tested.

For each test, record:
- what we did
- what we expected
- what actually happened
- PASS or FAIL

Do not say something is working only because it looks correct.

## 14. Error and Loading States

For features that need time to load, show a clear loading state.

If something fails, show a simple and understandable error message.

## 15. Accessibility

Keep:
- readable text
- good contrast
- clear buttons
- visible focus states
- meaningful labels

Do not use colour alone to communicate important information.

## 16. GitHub MCP

Use GitHub MCP for the project GitHub workflow.

The required Day 1 workflow includes:
- repository setup
- commit
- push
- pull request
- merge

Do not delete repositories, branches, or important history without asking.

## 17. Code Changes

Before changing code:
1. Look at the existing code.
2. Understand what it is doing.
3. Make the smallest useful change.
4. Keep existing working features working.
5. Test the change.

Do not rewrite working code without a reason.

Do not add unnecessary packages.

## 18. Ask Before Doing These

Ask before:
- changing the main project idea
- changing the technology stack
- changing the approved Figma design heavily
- adding major new pages
- deleting major features
- adding fake real-world data
- making destructive GitHub changes

## 19. Keep It Explainable

The team should be able to explain the code and features during the viva.

Keep important logic simple.

The team should understand:
- what each page does
- how the timeline works
- how the map works
- where the data comes from
- what the AI does
- how MCP was used
- how the features were tested

## 20. Working Rule

**Understand → plan → build → test → report.**

Never say a feature works unless it has actually been tested.
