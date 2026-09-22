// Prepared / demo dataset for Memory of a City.
// This is NOT verified real-world data — see SPEC.md section 3 and CLAUDE.md section 9.
// It exists so the app has something concrete to explore for the first version.

export const YEARS = [2010, 2015, 2020, 2025, 2026];

export const NEIGHBORHOODS = [
  {
    id: 'indiranagar',
    name: 'Indiranagar',
    lat: 12.9784,
    lng: 77.6408,
    tagline: 'A residential enclave that became a cosmopolitan hub.',
    data: {
      2010: { builtUp: 62, greenSpace: 22, roadDensity: 4.1, transitStations: 1, commercialArea: 18 },
      2015: { builtUp: 71, greenSpace: 18, roadDensity: 4.8, transitStations: 2, commercialArea: 26 },
      2020: { builtUp: 79, greenSpace: 14, roadDensity: 5.3, transitStations: 3, commercialArea: 34 },
      2025: { builtUp: 84, greenSpace: 11, roadDensity: 5.7, transitStations: 3, commercialArea: 41 },
      2026: { builtUp: 85, greenSpace: 10, roadDensity: 5.8, transitStations: 3, commercialArea: 43 },
    },
  },
  {
    id: 'koramangala',
    name: 'Koramangala',
    lat: 12.9352,
    lng: 77.6245,
    tagline: "Bengaluru's startup capital at the heart of tech culture.",
    data: {
      2010: { builtUp: 55, greenSpace: 28, roadDensity: 3.9, transitStations: 0, commercialArea: 22 },
      2015: { builtUp: 64, greenSpace: 22, roadDensity: 4.4, transitStations: 1, commercialArea: 33 },
      2020: { builtUp: 73, greenSpace: 17, roadDensity: 5.0, transitStations: 2, commercialArea: 44 },
      2025: { builtUp: 80, greenSpace: 13, roadDensity: 5.4, transitStations: 2, commercialArea: 54 },
      2026: { builtUp: 81, greenSpace: 12, roadDensity: 5.5, transitStations: 2, commercialArea: 56 },
    },
  },
  {
    id: 'whitefield',
    name: 'Whitefield',
    lat: 12.9698,
    lng: 77.7499,
    tagline: "From a colonial settlement to Bengaluru's IT corridor.",
    data: {
      2010: { builtUp: 38, greenSpace: 41, roadDensity: 2.8, transitStations: 0, commercialArea: 14 },
      2015: { builtUp: 52, greenSpace: 33, roadDensity: 3.5, transitStations: 0, commercialArea: 24 },
      2020: { builtUp: 66, greenSpace: 24, roadDensity: 4.2, transitStations: 2, commercialArea: 36 },
      2025: { builtUp: 78, greenSpace: 16, roadDensity: 4.9, transitStations: 5, commercialArea: 48 },
      2026: { builtUp: 80, greenSpace: 14, roadDensity: 5.1, transitStations: 6, commercialArea: 51 },
    },
  },
];

// Canned narrative used by the demo City Change Investigator (no live AI API configured).
// See skills/ai-change-story/SKILL.md — never present this as confirmed causation.
export const CHANGE_NARRATIVES = {
  indiranagar: {
    whatChanged:
      "Between 2010 and 2026, Indiranagar's built-up area grew by 37%, while green cover declined from 22% to 10% of the surveyed area. The neighbourhood transitioned from predominantly residential to a mixed-use commercial and entertainment hub, with 3 transit stations now serving the area.",
    whyItHappened: [
      'The metro corridor, completed in phases, made Indiranagar significantly more accessible from both the city centre and the airport corridor.',
      'Rising land values attracted commercial redevelopment of older residential properties along major roads.',
      'Growth of tech campuses in the wider East Bengaluru corridor increased demand for high-density retail, food, and hospitality in the area.',
    ],
    interpretation:
      'The data suggests transit-led urban densification as a primary driver, consistent with patterns seen elsewhere when transit infrastructure arrives in already-popular areas. This cannot be confirmed as causation without controlled analysis.',
  },
  koramangala: {
    whatChanged:
      "Koramangala's commercial footprint expanded by 155% between 2010 and 2026, the fastest growth among the three studied neighbourhoods. Built-up area rose from 55% to 81%, while green space fell from 28% to 12%.",
    whyItHappened: [
      "Koramangala's identity as a startup district attracted repeated waves of investment in co-working, retail, and hospitality infrastructure.",
      'Proximity to key tech corridors created sustained commercial pressure on residential land.',
      'Zoning changes permitting mixed-use development in previously residential blocks enabled rapid commercial conversion.',
    ],
    interpretation:
      "The scale of commercial growth is disproportionate relative to residential and transit growth — this could reflect the neighbourhood's role as an economic attractor for a wider catchment area beyond its own boundaries.",
  },
  whitefield: {
    whatChanged:
      'Whitefield saw the most dramatic transformation of the three neighbourhoods — built-up area more than doubled from 38% to 80%, while green cover fell from 41% to 14%. Six transit stations were added between 2015 and 2026.',
    whyItHappened: [
      'Large tech parks created an employment centre of national significance, driving residential demand.',
      'A metro line extension, completed in the low 2020s, catalysed a new wave of high-density development along the transit corridor.',
      'Loss of agricultural and peri-urban land at the periphery drove infill densification within the established area.',
    ],
    interpretation:
      'The transformation pattern is consistent with a transit-arrival effect amplified by an existing employment anchor — but the speed of green-space loss warrants further environmental review.',
  },
};

export const EVIDENCE = {
  indiranagar: [
    { type: 'Government Report', title: 'Metro Rail Phase 2 Project Report', year: 2020, desc: 'Transit authority documentation covering the corridor extension and projected ridership for Indiranagar stations.' },
    { type: 'Satellite Analysis', title: 'Land-use Change Analysis — East Bengaluru 2010–2026', year: 2026, desc: 'Land-use/land-cover classification derived from satellite imagery showing built-up expansion and green-space loss.' },
    { type: 'Urban Study', title: 'Bengaluru Masterplan — Zoning Amendments', year: 2022, desc: 'Municipal documentation of mixed-use zoning reclassifications in the Indiranagar ward.' },
  ],
  koramangala: [
    { type: 'Economic Report', title: 'Bengaluru Startup Ecosystem Report', year: 2025, desc: 'Annual analysis of startup density, co-working space growth, and investment flows into the Koramangala corridor.' },
    { type: 'Satellite Analysis', title: 'Land-use Change Analysis — South-East Bengaluru 2010–2026', year: 2026, desc: 'Satellite-derived change detection showing commercial land expansion and green-space fragmentation.' },
    { type: 'Census Data', title: 'Ward Data 2020', year: 2020, desc: 'Population density and commercial establishment density per ward for the Koramangala area.' },
  ],
  whitefield: [
    { type: 'Infrastructure Report', title: 'Metro Line — Whitefield Extension Completion Report', year: 2024, desc: 'Transit authority report on the Whitefield corridor, station locations, and ridership projections.' },
    { type: 'Satellite Analysis', title: 'Land-use Change Analysis — Whitefield 2010–2026', year: 2026, desc: 'Comprehensive land-use analysis showing agricultural land conversion and built-up densification.' },
    { type: 'Industry Data', title: 'Tech Park Employment Growth Report 2010–2025', year: 2025, desc: 'Employment figures for the tech park cluster and surrounding corridor.' },
  ],
};

export function getNeighborhoodById(id) {
  return NEIGHBORHOODS.find((n) => n.id === id);
}
