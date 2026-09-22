import express from 'express';
import cors from 'cors';
import {
  NEIGHBORHOODS,
  YEARS,
  CHANGE_NARRATIVES,
  EVIDENCE,
  getNeighborhoodById,
} from './data/bengaluru.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// GET /api/neighborhoods — full prepared dataset used by City Explorer and Neighborhood pages.
app.get('/api/neighborhoods', (_req, res) => {
  res.json({ years: YEARS, neighborhoods: NEIGHBORHOODS, isDemoData: true });
});

// GET /api/neighborhoods/:id — single neighborhood.
app.get('/api/neighborhoods/:id', (req, res) => {
  const neighborhood = getNeighborhoodById(req.params.id);
  if (!neighborhood) {
    return res.status(404).json({ error: 'Neighborhood not found' });
  }
  res.json({ years: YEARS, neighborhood, isDemoData: true });
});

// POST /api/change-story — City Change Investigator.
// No live AI API is configured for this project. This returns a clearly-marked
// demo/mock response assembled from prepared per-neighborhood narrative data —
// see skills/ai-change-story/SKILL.md. The response shape is designed so a real
// AI API call could be substituted here later without changing the frontend.
app.post('/api/change-story', (req, res) => {
  const { neighborhoodId, fromYear, toYear } = req.body || {};

  const neighborhood = getNeighborhoodById(neighborhoodId);
  if (!neighborhood) {
    return res.status(404).json({ error: 'Unknown neighborhood' });
  }
  if (!YEARS.includes(fromYear) || !YEARS.includes(toYear) || fromYear >= toYear) {
    return res.status(400).json({ error: 'fromYear must be an earlier valid year than toYear' });
  }

  const narrative = CHANGE_NARRATIVES[neighborhoodId];
  const evidence = EVIDENCE[neighborhoodId] || [];

  if (!narrative) {
    return res.status(404).json({ error: 'No investigation available for this neighborhood' });
  }

  res.json({
    source: 'demo-mock',
    neighborhoodId,
    fromYear,
    toYear,
    whatChanged: narrative.whatChanged,
    whyItHappened: narrative.whyItHappened,
    interpretation: narrative.interpretation,
    evidence,
    disclaimer:
      'This explanation is generated from prepared demo data, not a live AI model, and may not reflect verified real-world causation.',
  });
});

app.listen(PORT, () => {
  console.log(`Memory of a City API listening on http://localhost:${PORT}`);
});
