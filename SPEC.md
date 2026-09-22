# SPEC — Memory of a City

## 1. Project Idea

**Memory of a City** is a website that shows how Bengaluru has changed over time.

Users can move through different years, explore the city map, select a neighborhood, and see how buildings, roads, green spaces, public transport, and commercial areas have changed.

The main idea is:

> See how Bengaluru changed, then understand the story behind the change.

## 2. Who is the Website For?

The website is for people who are curious about how Bengaluru is growing and changing.

It should be simple enough for a normal visitor to understand without knowing urban planning, GIS, or data science.

## 3. Main Scope

We are focusing on **Bengaluru** instead of the whole of India.

We will start with a small number of neighborhoods, such as:
- Indiranagar
- Koramangala
- Whitefield

The final neighborhoods can be changed based on the data we are able to use.

We can use a small prepared dataset for the first version. If data is not real or verified, it should be treated as demo data.

## 4. Main Pages

### Page 1 — Home

The home page introduces **Memory of a City**.

It should have:
- Project title
- Short explanation
- Bengaluru visual/map
- City selection
- **Explore City** button
- Small preview of the timeline

The first impression should feel modern, premium, and connected to Bengaluru.

### Page 2 — City Explorer

This is the main page of the website.

It should have:
- Bengaluru map
- Timeline with different years
- Current selected year
- Filters for:
  - Buildings
  - Green spaces
  - Roads
  - Public transport
  - Commercial areas
- Important statistics
- Neighborhood selection

The map should be the main focus of this page.

### Page 3 — Neighborhood / Change Story

This page shows how one Bengaluru neighborhood changed between two years.

Example:

**Indiranagar — 2015 → 2026**

It should show:
- Change in built-up area
- Change in green space
- Road changes
- Public transport changes
- Commercial area changes
- **What Changed?** button
- AI Change Story
- Evidence/sources used

The page should clearly show which information comes from the data and which part is the AI's explanation.

## 5. Main User Flow

Home
→ Explore City
→ Select year
→ Explore Bengaluru map
→ Select neighborhood
→ View changes
→ Select two years
→ Click **What Changed?**
→ Read AI Change Story
→ View evidence
→ Explore another neighborhood

## 6. Visual Style

We want the website to look like a **premium urban intelligence product**, not a normal college dashboard.

The visual style should be:
- modern
- clean
- cinematic
- slightly futuristic
- map-focused
- data-focused
- easy to read

We can use:
- dark backgrounds
- strong typography
- Bengaluru/city imagery
- subtle glass effects
- clean data cards
- small purposeful animations
- a limited number of accent colors
- good spacing

We should avoid:
- too many colors
- too much glow/neon
- too many cards
- unnecessary animations
- very small text
- making the website look like a generic admin dashboard

## 7. Technology

Frontend:
- React
- Vite
- Tailwind CSS

Map:
- Leaflet
- OpenStreetMap

Charts:
- Chart.js

Backend:
- Node.js
- Express

## 8. AI Part

The AI part is called the **City Change Investigator**.

It will look at:
- selected neighborhood
- two selected years
- available change data
- available evidence

It should explain:
1. What changed?
2. What could have caused the change?
3. What evidence supports the explanation?

The AI should not make up facts or say that something definitely caused a change when the available evidence does not support it.
