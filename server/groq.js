import Groq from 'groq-sdk';

// City Change Investigator — real Groq call. See skills/ai-change-story/SKILL.md
// for the rules this must follow (no invented facts/stats/evidence, observed data
// kept separate from interpretation, exact selected year range respected).

const MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';
const TIMEOUT_MS = 20000;

const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    whatChanged: {
      type: 'string',
      description: 'Factual summary of the observed change, drawn only from the supplied data. No causal claims.',
    },
    possibleReasons: {
      type: 'array',
      items: { type: 'string' },
      description: 'Hedged possible explanations, each grounded in the supplied evidence. Empty array if none are supportable.',
    },
    causationAssessment: {
      type: 'string',
      description:
        'A brief, hedged synthesis of how confidently the evidence supports the possible reasons. Must explicitly say the cause cannot be established if the evidence is insufficient.',
    },
  },
  required: ['whatChanged', 'possibleReasons', 'causationAssessment'],
  additionalProperties: false,
};

function buildPrompt({ neighborhood, fromYear, toYear, changes, evidence }) {
  const changeLines = changes
    .map((c) => `- ${c.label}: ${c.fromValue}${c.unit} in ${fromYear} -> ${c.toValue}${c.unit} in ${toYear} (change: ${c.change})`)
    .join('\n');

  const evidenceLines = evidence.length
    ? evidence.map((e, i) => `${i + 1}. [${e.type}, ${e.year}] "${e.title}" — ${e.desc}`).join('\n')
    : '(no evidence sources are available for this neighbourhood)';

  return `You are the "City Change Investigator" feature of a Bengaluru urban-change explorer built as a student project. All data below is small prepared/demo data, not verified real-world statistics.

Neighbourhood: ${neighborhood.name} — ${neighborhood.tagline}
Comparison period: exactly ${fromYear} to ${toYear}. Do not use any other year range anywhere in your answer.

Observed data changes for this exact period (this is the only data you may cite as fact):
${changeLines}

Available evidence sources for this neighbourhood (may or may not fully explain this exact period):
${evidenceLines}

Rules you MUST follow:
1. Do NOT invent facts, statistics, evidence, or sources beyond what is given above.
2. Do NOT substitute or imply any year range other than ${fromYear} to ${toYear}.
3. "whatChanged" must be a strictly factual summary of the observed data above — no causal language.
4. "possibleReasons" must be hedged ("may have", "is consistent with", "could reflect") and each one must be plausibly connected to an evidence source listed above. Return an empty array if none are supportable.
5. "causationAssessment" must honestly state how well the evidence supports the possible reasons — if the evidence is not sufficient to explain the observed change, say so explicitly rather than guessing.
6. Respond only with JSON matching the required schema.`;
}

class ChangeStoryError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

export async function generateChangeStory({ neighborhood, fromYear, toYear, changes, evidence }) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new ChangeStoryError('GROQ_API_KEY is not configured on the server.', 'MISSING_API_KEY');
  }

  const groq = new Groq({ apiKey });
  const prompt = buildPrompt({ neighborhood, fromYear, toYear, changes, evidence });

  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new ChangeStoryError('Groq API request timed out.', 'TIMEOUT')), TIMEOUT_MS),
  );

  let response;
  try {
    response = await Promise.race([
      groq.chat.completions.create({
        model: MODEL,
        messages: [{ role: 'user', content: prompt }],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'change_story',
            strict: true,
            schema: RESPONSE_SCHEMA,
          },
        },
      }),
      timeout,
    ]);
  } catch (cause) {
    if (cause instanceof ChangeStoryError) throw cause;
    throw new ChangeStoryError(`Groq API request failed: ${cause.message}`, 'PROVIDER_ERROR');
  }

  const text = response.choices?.[0]?.message?.content;
  if (!text) {
    throw new ChangeStoryError('Groq returned an empty response.', 'INVALID_RESPONSE');
  }

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new ChangeStoryError('Groq response was not valid JSON.', 'INVALID_RESPONSE');
  }

  if (
    typeof parsed.whatChanged !== 'string' ||
    !Array.isArray(parsed.possibleReasons) ||
    typeof parsed.causationAssessment !== 'string'
  ) {
    throw new ChangeStoryError('Groq response did not match the expected shape.', 'INVALID_RESPONSE');
  }

  return parsed;
}

export { ChangeStoryError };
