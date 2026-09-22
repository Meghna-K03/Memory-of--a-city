import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { LoadingState, ErrorState } from '@/components/StateViews';
import { useCityData } from '@/context/CityDataContext';
import { calcChange } from '@/lib/calcChange';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1769337953149-f48f1083f0e1?w=1920&h=1080&fit=crop&auto=format';

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Choose a year',
    desc: 'Scrub the timeline to any year from 2010 to 2026. The city map updates to reflect that moment in time.',
    icon: '◷',
  },
  {
    step: '02',
    title: 'Select a neighbourhood',
    desc: 'Click Indiranagar, Koramangala, or Whitefield on the map to see a snapshot of how that area looked.',
    icon: '◎',
  },
  {
    step: '03',
    title: 'Read the Change Story',
    desc: 'Compare two years, view data charts, then ask the AI City Change Investigator to explain the forces behind the transformation.',
    icon: '◈',
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { neighborhoods, years, loading, error } = useCityData();
  const [, setShowHowItWorks] = useState(false);

  const fromYear = years[0];
  const toYear = years[years.length - 1];

  const avgBuiltUpChange = neighborhoods.length
    ? Math.round(
        neighborhoods.reduce((sum, n) => sum + calcChange(n, fromYear, toYear, 'builtUp'), 0) / neighborhoods.length,
      )
    : null;
  const avgGreenChange = neighborhoods.length
    ? Math.round(
        neighborhoods.reduce((sum, n) => sum + calcChange(n, fromYear, toYear, 'greenSpace'), 0) / neighborhoods.length,
      )
    : null;
  const totalTransitAdded = neighborhoods.length
    ? neighborhoods.reduce((sum, n) => sum + calcChange(n, fromYear, toYear, 'transitStations'), 0)
    : null;

  return (
    <div className="min-h-screen bg-bg-deep">
      <Navbar transparent />

      {/* Hero */}
      <section className="relative flex h-screen min-h-[640px] flex-col items-center justify-center overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Bengaluru city aerial view at night"
          className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.3] saturate-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-deep/55 via-bg-deep/[0.08] to-bg-deep" />

        <div className="relative max-w-[780px] px-6 text-center">
          <p className="mb-5 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-amber/90">
            Bengaluru · Urban Intelligence
          </p>
          <h1 className="mb-5 font-display text-[clamp(40px,6vw,82px)] font-extrabold leading-[1.04] tracking-[-0.025em] text-text-primary">
            Memory of a City
          </h1>
          <p className="mx-auto mb-12 max-w-[540px] font-body text-[clamp(16px,2vw,19px)] leading-[1.65] text-text-secondary">
            See how Bengaluru changed. Explore the city through time, understand the forces that shaped it, and read
            the story behind every transformation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate('/explore')}
              className="rounded-md bg-amber px-8 py-3.5 font-display text-xs font-bold uppercase tracking-[0.1em] text-bg-deep transition-all hover:-translate-y-px hover:opacity-90"
            >
              Explore Bengaluru
            </button>
            <button
              onClick={() => {
                setShowHowItWorks(true);
                setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }), 80);
              }}
              className="rounded-md border border-white/10 bg-white/5 px-7 py-3.5 font-display text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary backdrop-blur-sm transition-colors hover:border-white/20 hover:text-text-primary"
            >
              How it works
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 items-center rounded-full border border-border-subtle bg-bg-base/65 px-5 py-2.5 backdrop-blur-md">
          {years.map((year, i) => (
            <div key={year} className="flex items-center">
              <span
                className={`px-3.5 font-mono text-[11px] ${year === toYear ? 'font-medium text-amber' : 'text-text-muted'}`}
              >
                {year}
              </span>
              {i < years.length - 1 && <span className="text-[8px] text-surface-2">·</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-8 py-20 md:grid-cols-2 md:gap-20 md:py-24">
        <div>
          <p className="mb-4.5 font-mono text-[10px] uppercase tracking-[0.2em] text-amber">About the project</p>
          <h2 className="mb-5 font-display text-[clamp(28px,3vw,40px)] font-bold leading-[1.2] tracking-[-0.02em] text-text-primary">
            Cities leave traces.
          </h2>
          <p className="mb-4.5 font-body text-base leading-[1.75] text-text-secondary">
            Buildings rise. Roads expand. Green spaces disappear or grow. Transit reshapes movement. Every year,
            Bengaluru becomes a different city — yet most of those changes go unnoticed.
          </p>
          <p className="mb-7 font-body text-base leading-[1.75] text-text-secondary">
            Memory of a City lets you explore those changes through time — and uses an AI investigator to explain the
            forces behind each transformation.
          </p>
          <button
            onClick={() => navigate('/explore')}
            className="rounded-md border border-amber-border px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.08em] text-amber transition-colors hover:bg-amber-dim"
          >
            Open city explorer →
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-border-subtle">
          {loading ? (
            <LoadingState label="Loading city stats…" />
          ) : error ? (
            <ErrorState message={error} />
          ) : (
            <div className="grid grid-cols-2 gap-px">
              {[
                { value: `${avgBuiltUpChange! > 0 ? '+' : ''}${avgBuiltUpChange}%`, label: `Avg. built-up growth, ${fromYear}–${toYear}`, accent: 'amber' as const },
                { value: `${avgGreenChange}%`, label: `Avg. green cover change, ${fromYear}–${toYear}`, accent: 'red' as const },
                { value: `+${totalTransitAdded}`, label: 'Transit stations added (3 sample areas)', accent: 'green' as const },
                { value: `${neighborhoods.length}`, label: 'Neighbourhoods covered (demo data)', accent: 'default' as const },
              ].map((s) => (
                <div key={s.label} className="border-b border-r border-white/[0.04] bg-bg-base p-6">
                  <p
                    className={`mb-1.5 font-display text-[clamp(22px,2.5vw,30px)] font-extrabold tracking-[-0.02em] ${
                      s.accent === 'red' ? 'text-red' : s.accent === 'green' ? 'text-green' : s.accent === 'amber' ? 'text-amber' : 'text-text-primary'
                    }`}
                  >
                    {s.value}
                  </p>
                  <p className="font-body text-xs leading-[1.4] text-text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-border-subtle bg-bg-base px-8 py-20">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-amber">How it works</p>
          <h2 className="mb-14 text-center font-display text-[clamp(26px,3vw,38px)] font-bold tracking-[-0.02em] text-text-primary">
            Three steps to understand a city
          </h2>

          <div className="grid grid-cols-1 gap-px md:grid-cols-3">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="rounded-lg border border-border-subtle bg-bg-subtle p-7">
                <div className="mb-4 flex items-start gap-4">
                  <span className="mt-0.5 shrink-0 rounded bg-amber-dim px-2 py-1 font-mono text-[10px] text-amber">
                    {step.step}
                  </span>
                  <span className="text-xl leading-none text-text-muted">{step.icon}</span>
                </div>
                <h3 className="mb-2.5 font-display text-lg font-bold tracking-[-0.01em] text-text-primary">
                  {step.title}
                </h3>
                <p className="font-body text-sm leading-[1.65] text-text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => navigate('/explore')}
              className="rounded-md bg-amber px-8 py-3.5 font-display text-xs font-bold uppercase tracking-[0.1em] text-bg-deep transition-opacity hover:opacity-90"
            >
              Start exploring →
            </button>
          </div>
        </div>
      </section>

      {/* Neighbourhood previews */}
      <section className="border-t border-border-subtle bg-bg-deep px-8 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-amber">
                Neighbourhoods · {fromYear} → {toYear}
              </p>
              <h2 className="font-display text-[clamp(24px,3vw,36px)] font-bold tracking-[-0.02em] text-text-primary">
                Three stories of change
              </h2>
            </div>
            <button
              onClick={() => navigate('/explore')}
              className="rounded-md border border-amber-border px-4.5 py-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-amber transition-colors hover:bg-amber-dim"
            >
              Open city explorer →
            </button>
          </div>

          {loading ? (
            <LoadingState label="Loading neighbourhoods…" />
          ) : error ? (
            <ErrorState message={error} />
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {neighborhoods.map((n) => {
                const builtUpChange = calcChange(n, fromYear, toYear, 'builtUp');
                const commercialChange = calcChange(n, fromYear, toYear, 'commercialArea');
                const headline =
                  commercialChange > builtUpChange
                    ? `+${commercialChange}% commercial`
                    : `+${builtUpChange}% built-up`;
                return (
                  <button
                    key={n.id}
                    onClick={() => navigate(`/neighborhood/${n.id}`)}
                    className="w-full rounded-lg border border-border-subtle bg-bg-subtle p-7 text-left transition-colors hover:border-amber-border/60 hover:bg-surface-0"
                  >
                    <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
                      {fromYear} → {toYear}
                    </p>
                    <p className="mb-2.5 font-display text-[22px] font-bold tracking-[-0.01em] text-text-primary">
                      {n.name}
                    </p>
                    <p className="mb-5.5 font-body text-[13px] text-amber">{headline}</p>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber opacity-60" />
                      <p className="font-body text-[11px] uppercase tracking-[0.08em] text-text-muted">
                        View change story
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border-subtle bg-bg-base px-8 py-16 text-center">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">Ready to explore?</p>
        <h2 className="mb-7 font-display text-[clamp(24px,3vw,36px)] font-bold tracking-[-0.02em] text-text-primary">
          Open the Bengaluru City Explorer
        </h2>
        <button
          onClick={() => navigate('/explore')}
          className="rounded-md bg-amber px-10 py-4 font-display text-[13px] font-bold uppercase tracking-[0.1em] text-bg-deep transition-all hover:-translate-y-px hover:opacity-90"
        >
          Explore Bengaluru →
        </button>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle px-8 py-7">
        <p className="font-mono text-[10px] tracking-[0.06em] text-text-muted">
          MEMORY OF A CITY · BENGALURU URBAN INTELLIGENCE
        </p>
        <p className="font-body text-[11px] text-text-muted">Demo data — not verified real-world data</p>
      </footer>
    </div>
  );
}
