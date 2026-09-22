import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';
import Navbar from '@/components/Navbar';
import { Tag, SectionDivider } from '@/components/Tag';
import { LoadingState, ErrorState } from '@/components/StateViews';
import { useCityData, useNeighborhoodById } from '@/context/CityDataContext';
import { fetchChangeStory } from '@/lib/api';
import type { ChangeStoryResponse, MetricKey, Year } from '@/types/city';

const C = {
  amber: '#E8A020',
  green: '#3DAD6E',
  purple: '#C084FC',
  blue: '#60A5FA',
  red: '#E05252',
  textMuted: '#4B5360',
  textSecondary: '#8A9099',
};

const AXIS_FONT = { family: 'JetBrains Mono, monospace', size: 9 };

function LandUseBlock({
  year,
  builtUp,
  greenSpace,
  commercialArea,
  transitStations,
  isTo,
}: {
  year: Year;
  builtUp: number;
  greenSpace: number;
  commercialArea: number;
  transitStations: number;
  isTo: boolean;
}) {
  const other = Math.max(0, 100 - builtUp - greenSpace - commercialArea);
  const segments = [
    { label: 'Built-up', pct: builtUp, color: C.amber },
    { label: 'Green space', pct: greenSpace, color: C.green },
    { label: 'Commercial', pct: commercialArea, color: C.purple },
    { label: 'Other / Roads', pct: other, color: C.textMuted },
  ];

  return (
    <div className={`flex-1 rounded-xl border bg-bg-base p-6 ${isTo ? 'border-amber-border' : 'border-border-subtle'}`}>
      <div className="mb-5 flex items-baseline justify-between">
        <p className={`font-display text-[26px] font-extrabold tracking-[-0.02em] ${isTo ? 'text-amber' : 'text-text-secondary'}`}>
          {year}
        </p>
        {isTo && <Tag variant="amber">Current</Tag>}
      </div>

      <div className="mb-5 flex h-2 gap-0.5 overflow-hidden rounded">
        {segments.map((s) => (
          <div
            key={s.label}
            className="rounded-sm transition-[width]"
            style={{ width: `${s.pct}%`, background: s.color, opacity: isTo ? 1 : 0.55 }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {segments.slice(0, 3).map((s) => (
          <div key={s.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-sm" style={{ background: s.color, opacity: isTo ? 1 : 0.55 }} />
              <span className="font-body text-xs text-text-secondary">{s.label}</span>
            </div>
            <span className="font-mono text-xs font-medium text-text-primary">{s.pct}%</span>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-border-subtle pt-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-sm" style={{ background: C.blue, opacity: isTo ? 1 : 0.55 }} />
            <span className="font-body text-xs text-text-secondary">Transit stations</span>
          </div>
          <span className="font-mono text-xs font-medium text-text-primary">{transitStations}</span>
        </div>
      </div>
    </div>
  );
}

function ChangeRow({
  index,
  label,
  fromVal,
  toVal,
  mode,
  displaySuffix,
  valueSuffix,
  color,
}: {
  index: number;
  label: string;
  fromVal: number;
  toVal: number;
  mode: 'percent' | 'raw';
  displaySuffix: string;
  valueSuffix: string;
  color: string;
}) {
  // Round to 2 decimals before display to avoid floating-point artifacts like 1.7000000000000002.
  const rawDiff = Math.round((toVal - fromVal) * 100) / 100;
  const diff = mode === 'percent' ? Math.round((rawDiff / fromVal) * 100) : rawDiff;
  const isPositive = diff > 0;
  const barMax = Math.max(fromVal, toVal) * 1.15 || 1;

  return (
    <div className="border-b border-border-subtle py-4.5">
      <div className="mb-3 flex items-baseline justify-between">
        <div className="flex items-center gap-3">
          <span className="rounded px-1.5 py-0.5 font-mono text-[10px]" style={{ color, background: `${color}18` }}>
            {String(index).padStart(2, '0')}
          </span>
          <span className="font-body text-sm font-medium text-text-primary">{label}</span>
        </div>
        <span className="font-mono text-[13px] font-semibold" style={{ color: isPositive ? color : C.red }}>
          {isPositive ? '+' : ''}
          {diff}
          {displaySuffix}
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        {[{ label: 'From', v: fromVal }, { label: 'To', v: toVal }].map((b) => (
          <div key={b.label} className="flex items-center gap-2.5">
            <span className="w-6 font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted">{b.label}</span>
            <div className="h-1 flex-1 overflow-hidden rounded bg-white/[0.06]">
              <div
                className="h-full rounded transition-[width]"
                style={{ width: `${(b.v / barMax) * 100}%`, background: b.label === 'To' ? color : 'rgba(255,255,255,0.18)' }}
              />
            </div>
            <span className="w-12 text-right font-mono text-[10px] text-text-secondary">
              {b.v}
              {valueSuffix}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvidenceCard({ type, title, year, desc }: { type: string; title: string; year: number; desc: string }) {
  return (
    <div className="rounded-lg border border-border-subtle bg-surface-0 p-5 transition-colors hover:border-amber-border hover:bg-surface-1">
      <div className="mb-2.5 flex items-start justify-between">
        <Tag variant="amber">{type}</Tag>
        <span className="font-mono text-[10px] text-text-muted">{year}</span>
      </div>
      <p className="mb-2 font-display text-sm font-semibold leading-[1.4] text-text-primary">{title}</p>
      <p className="mb-3.5 font-body text-[13px] leading-[1.65] text-text-secondary">{desc}</p>
      <button className="font-body text-[11px] uppercase tracking-[0.05em] text-text-muted transition-colors hover:text-text-secondary">
        View source →
      </button>
    </div>
  );
}

const chartFont = { family: 'Inter, sans-serif' };

const trendOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { ticks: { color: C.textMuted, font: AXIS_FONT }, grid: { display: false } },
    y: { ticks: { color: C.textMuted, font: AXIS_FONT, callback: (v) => `${v}%` }, grid: { color: 'rgba(255,255,255,0.05)' } },
  },
};

const snapshotOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { ticks: { color: C.textMuted, font: chartFont }, grid: { display: false } },
    y: { ticks: { color: C.textMuted, font: AXIS_FONT }, grid: { color: 'rgba(255,255,255,0.05)' } },
  },
};

export default function NeighborhoodPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { years, loading: dataLoading, error: dataError } = useCityData();
  const { neighborhood } = useNeighborhoodById(id);

  const [fromYear, setFromYear] = useState<Year>(2010);
  const [toYear, setToYear] = useState<Year>(2026);
  const [story, setStory] = useState<ChangeStoryResponse | null>(null);
  const [storyLoading, setStoryLoading] = useState(false);
  const [storyError, setStoryError] = useState<string | null>(null);
  const aiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStory(null);
    setStoryError(null);
  }, [neighborhood?.id, fromYear, toYear]);

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-bg-deep">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center pt-[60px]">
          <LoadingState label="Loading neighbourhood data…" />
        </div>
      </div>
    );
  }

  if (dataError) {
    return (
      <div className="min-h-screen bg-bg-deep">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center px-6 pt-[60px]">
          <ErrorState message={dataError} />
        </div>
      </div>
    );
  }

  if (!neighborhood) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-deep">
        <Navbar />
        <div className="text-center">
          <p className="mb-4 font-mono text-text-muted">Neighbourhood not found</p>
          <button
            onClick={() => navigate('/explore')}
            className="rounded-md border border-amber-border px-5 py-2.5 font-display text-xs font-semibold text-amber"
          >
            ← Back to Explorer
          </button>
        </div>
      </div>
    );
  }

  const fromData = neighborhood.data[fromYear];
  const toData = neighborhood.data[toYear];

  const trendData = {
    labels: years.map(String),
    datasets: [
      {
        label: 'Built-up',
        data: years.map((y) => neighborhood.data[y].builtUp),
        borderColor: C.amber,
        backgroundColor: `${C.amber}30`,
        fill: true,
        tension: 0.35,
      },
      {
        label: 'Green Space',
        data: years.map((y) => neighborhood.data[y].greenSpace),
        borderColor: C.green,
        backgroundColor: `${C.green}30`,
        fill: true,
        tension: 0.35,
      },
      {
        label: 'Commercial',
        data: years.map((y) => neighborhood.data[y].commercialArea),
        borderColor: C.purple,
        backgroundColor: `${C.purple}25`,
        fill: true,
        tension: 0.35,
      },
    ],
  };

  const snapshotData = {
    labels: ['Built-up', 'Green', 'Commercial'],
    datasets: [
      {
        label: String(fromYear),
        data: [fromData.builtUp, fromData.greenSpace, fromData.commercialArea],
        backgroundColor: 'rgba(255,255,255,0.14)',
        borderRadius: 3,
      },
      {
        label: String(toYear),
        data: [toData.builtUp, toData.greenSpace, toData.commercialArea],
        backgroundColor: C.amber,
        borderRadius: 3,
      },
    ],
  };

  const metricRows: Array<{
    key: MetricKey;
    label: string;
    mode: 'percent' | 'raw';
    displaySuffix: string;
    valueSuffix: string;
    color: string;
  }> = [
    { key: 'builtUp', label: 'Built-up area', mode: 'percent', displaySuffix: '%', valueSuffix: '%', color: C.amber },
    { key: 'greenSpace', label: 'Green space', mode: 'percent', displaySuffix: '%', valueSuffix: '%', color: C.green },
    { key: 'commercialArea', label: 'Commercial area', mode: 'percent', displaySuffix: '%', valueSuffix: '%', color: C.purple },
    { key: 'roadDensity', label: 'Road density (km/km²)', mode: 'raw', displaySuffix: ' km/km²', valueSuffix: '', color: C.textSecondary },
    { key: 'transitStations', label: 'Transit stations', mode: 'raw', displaySuffix: ' stations', valueSuffix: '', color: C.blue },
  ];

  async function handleWhatChanged() {
    setStoryLoading(true);
    setStoryError(null);
    try {
      const result = await fetchChangeStory({ neighborhoodId: neighborhood!.id, fromYear, toYear });
      setStory(result);
      setTimeout(() => aiRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    } catch (err) {
      setStoryError(err instanceof Error ? err.message : 'Failed to generate the change story.');
    } finally {
      setStoryLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg-deep">
      <Navbar />

      <div className="border-b border-border-subtle bg-gradient-to-b from-bg-base to-bg-deep pb-14 pt-[90px]">
        <div className="mx-auto max-w-[1100px] px-8">
          <button
            onClick={() => navigate('/explore')}
            className="mb-7 flex items-center gap-1.5 font-body text-[11px] uppercase tracking-[0.1em] text-text-muted transition-colors hover:text-text-secondary"
          >
            ← City Explorer
          </button>

          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-amber">Bengaluru · Change Story</p>
              <h1 className="mb-2 font-display text-[clamp(36px,5vw,64px)] font-extrabold tracking-[-0.03em] text-text-primary">
                {neighborhood.name}
              </h1>
              <p className="font-body text-[14px] leading-[1.6] text-text-muted">{neighborhood.tagline}</p>
            </div>

            <div className="flex shrink-0 items-center gap-3 rounded-lg border border-border-subtle bg-bg-subtle px-5 py-3.5">
              <div>
                <p className="mb-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-text-muted">From</p>
                <select
                  value={fromYear}
                  onChange={(e) => {
                    const y = Number(e.target.value) as Year;
                    setFromYear(y);
                    if (y >= toYear) setToYear(years[years.indexOf(y) + 1] ?? toYear);
                  }}
                  className="min-w-[60px] cursor-pointer appearance-none bg-transparent font-display text-lg font-bold text-text-primary outline-none"
                >
                  {years.slice(0, -1).map((y) => (
                    <option key={y} value={y} className="bg-bg-base">
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-base text-amber">→</span>
              <div>
                <p className="mb-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-text-muted">To</p>
                <select
                  value={toYear}
                  onChange={(e) => setToYear(Number(e.target.value) as Year)}
                  className="min-w-[60px] cursor-pointer appearance-none bg-transparent font-display text-lg font-bold text-amber outline-none"
                >
                  {years.filter((y) => y > fromYear).map((y) => (
                    <option key={y} value={y} className="bg-bg-base">
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] px-8 py-16">
        {/* Before / After */}
        <section className="mb-18">
          <SectionDivider label="Before / After" />
          <h2 className="mb-2 font-display text-[22px] font-bold tracking-[-0.01em] text-text-primary">
            Land use composition — {fromYear} vs {toYear}
          </h2>
          <p className="mb-7 font-body text-sm leading-[1.6] text-text-muted">
            The coloured bar represents the proportional breakdown of land use in the surveyed area.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <LandUseBlock year={fromYear} {...fromData} isTo={false} />
            <div className="flex shrink-0 items-center justify-center px-1 text-xl text-text-muted">→</div>
            <LandUseBlock year={toYear} {...toData} isTo />
          </div>

          <div className="mt-4 flex flex-wrap gap-5">
            {[
              { color: C.amber, label: 'Built-up' },
              { color: C.green, label: 'Green space' },
              { color: C.purple, label: 'Commercial' },
              { color: C.textMuted, label: 'Other / Roads' },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm" style={{ background: l.color }} />
                <span className="font-mono text-[10px] text-text-muted">{l.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* What changed */}
        <section className="mb-18">
          <SectionDivider label="What Changed" />
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-1 font-display text-[22px] font-bold tracking-[-0.01em] text-text-primary">Key indicators</h2>
              <p className="mb-5 font-body text-sm text-text-muted">
                {fromYear} → {toYear}
              </p>
              {metricRows.map((m, i) => (
                <ChangeRow
                  key={m.key}
                  index={i + 1}
                  label={m.label}
                  fromVal={fromData[m.key]}
                  toVal={toData[m.key]}
                  mode={m.mode}
                  displaySuffix={m.displaySuffix}
                  valueSuffix={m.valueSuffix}
                  color={m.color}
                />
              ))}
            </div>

            <div className="rounded-xl border border-border-subtle bg-bg-base p-6">
              <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">Snapshot Comparison</p>
              <p className="mb-5 font-body text-[13px] text-text-secondary">
                {fromYear} vs {toYear} — key metrics (%)
              </p>
              <div style={{ height: 220 }}>
                <Bar data={snapshotData} options={snapshotOptions} />
              </div>
              <div className="mt-2 flex gap-4">
                {[{ color: 'rgba(255,255,255,0.14)', label: String(fromYear) }, { color: C.amber, label: String(toYear) }].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-sm" style={{ background: l.color }} />
                    <span className="font-mono text-[10px] text-text-muted">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trend */}
        <section className="mb-18">
          <SectionDivider label="Trend Over Time" />
          <h2 className="mb-2 font-display text-[22px] font-bold tracking-[-0.01em] text-text-primary">
            All five years — {neighborhood.name}
          </h2>
          <p className="mb-7 font-body text-sm text-text-muted">How land use shifted across the full {years[0]}–{years[years.length - 1]} period.</p>

          <div className="rounded-xl border border-border-subtle bg-bg-base p-6 pb-5">
            <div style={{ height: 260 }}>
              <Line data={trendData} options={trendOptions} />
            </div>
            <div className="mt-2 flex gap-5">
              {[{ color: C.amber, label: 'Built-up' }, { color: C.green, label: 'Green Space' }, { color: C.purple, label: 'Commercial' }].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className="h-0.5 w-2.5 rounded-sm" style={{ background: l.color }} />
                  <span className="font-mono text-[10px] text-text-muted">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* City Change Investigator */}
        <section ref={aiRef} className="mb-16">
          <SectionDivider label="AI · City Change Investigator" variant="amber" />

          <div className="overflow-hidden rounded-xl border border-border-subtle bg-bg-base">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle px-7 py-6">
              <div>
                <h2 className="mb-1 font-display text-lg font-bold tracking-[-0.01em] text-text-primary">
                  What changed — and why?
                </h2>
                <p className="font-body text-[13px] text-text-muted">
                  {neighborhood.name} · {fromYear} → {toYear}
                </p>
              </div>
              {!story && !storyLoading && (
                <button
                  onClick={handleWhatChanged}
                  className="rounded-md bg-amber px-6 py-3 font-display text-xs font-bold uppercase tracking-[0.08em] text-bg-deep transition-opacity hover:opacity-90"
                >
                  What Changed? →
                </button>
              )}
            </div>

            {storyLoading && <LoadingState label="Investigating change…" />}

            {storyError && (
              <div className="p-7">
                <ErrorState message={storyError} />
                <div className="mt-4 text-center">
                  <button
                    onClick={handleWhatChanged}
                    className="rounded-md border border-amber-border px-5 py-2 font-display text-xs font-semibold text-amber"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}

            {!story && !storyLoading && !storyError && (
              <div className="flex flex-col items-center gap-3.5 px-7 py-12 text-center">
                <div className="flex h-13 w-13 items-center justify-center rounded-full border border-amber-border bg-amber-dim text-xl text-amber">
                  🔍
                </div>
                <p className="max-w-[380px] font-body text-sm leading-[1.65] text-text-muted">
                  Click <strong className="text-text-secondary">What Changed?</strong> to generate an AI-powered
                  investigation for {neighborhood.name} between {fromYear} and {toYear}.
                </p>
              </div>
            )}

            {story && !storyLoading && (
              <div>
                <div className="border-b border-border-subtle px-7 py-6">
                  <SectionDivider label="Data Observation" />
                  <h3 className="mb-2.5 font-display text-base font-bold text-text-primary">What changed?</h3>
                  <p className="font-body text-sm leading-[1.75] text-text-secondary">{story.whatChanged}</p>
                </div>

                <div className="border-b border-border-subtle px-7 py-6">
                  <SectionDivider label="AI Interpretation" variant="amber" />
                  <h3 className="mb-4 font-display text-base font-bold text-text-primary">Why might it have happened?</h3>
                  <div className="mb-4.5 flex flex-col gap-2.5">
                    {story.whyItHappened.map((point, i) => (
                      <div key={i} className="flex gap-3.5 rounded-md border border-amber-border bg-amber-dim px-4 py-3.5">
                        <span className="mt-0.5 shrink-0 font-mono text-[10px] text-amber">{String(i + 1).padStart(2, '0')}</span>
                        <p className="font-body text-[13px] leading-[1.65] text-text-secondary">{point}</p>
                      </div>
                    ))}
                  </div>
                  <p className="rounded-md border-l-2 border-border-subtle bg-white/[0.02] px-4 py-3.5 font-body text-[13px] italic leading-[1.65] text-text-muted">
                    {story.interpretation}
                  </p>
                </div>

                <div className="px-7 py-3.5">
                  <p className="font-body text-[11px] leading-[1.5] text-text-muted">{story.disclaimer}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Evidence */}
        {story && (
          <section className="animate-[fade-in-up_0.4s_ease]">
            <SectionDivider label="Evidence" />
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-[22px] font-bold tracking-[-0.01em] text-text-primary">Supporting sources</h2>
              <span className="font-mono text-[10px] text-text-muted">{story.evidence.length} sources</span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {story.evidence.map((e, i) => (
                <EvidenceCard key={i} {...e} />
              ))}
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle pt-7">
              <p className="font-body text-xs text-text-muted">
                Demo data — not verified real-world data · Evidence cards are illustrative
              </p>
              <button
                onClick={() => navigate('/explore')}
                className="rounded-md border border-amber-border px-4.5 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-amber transition-colors hover:bg-amber-dim"
              >
                Explore another neighbourhood →
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
