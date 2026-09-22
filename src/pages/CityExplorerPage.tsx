import { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import type L from 'leaflet';
import Navbar from '@/components/Navbar';
import FilterPanel, { type MapFilter } from '@/components/FilterPanel';
import Timeline from '@/components/Timeline';
import NeighborhoodPanel from '@/components/NeighborhoodPanel';
import { LoadingState, ErrorState } from '@/components/StateViews';
import { useCityData } from '@/context/CityDataContext';
import type { Neighborhood, Year } from '@/types/city';

const BENGALURU_CENTER: [number, number] = [12.9716, 77.5946];
const INITIAL_ZOOM = 12;

const INITIAL_FILTERS: MapFilter[] = [
  { id: 'buildings', label: 'Buildings', color: '#E8A020', active: true },
  { id: 'green', label: 'Green Spaces', color: '#3DAD6E', active: true },
  { id: 'roads', label: 'Roads', color: '#8A9099', active: false },
  { id: 'transit', label: 'Public Transit', color: '#60A5FA', active: true },
  { id: 'commercial', label: 'Commercial', color: '#C084FC', active: false },
];

function getMarkerColor(filters: MapFilter[]): string {
  if (filters.find((f) => f.id === 'buildings' && f.active)) return '#E8A020';
  if (filters.find((f) => f.id === 'green' && f.active)) return '#3DAD6E';
  return '#8A9099';
}

function getMarkerRadius(n: Neighborhood, year: Year): number {
  return 10 + (n.data[year].builtUp / 100) * 14;
}

function StatCard({ label, value, sub, accentClass }: { label: string; value: string; sub?: string; accentClass?: string }) {
  return (
    <div className="border-b border-border-subtle px-3.5 py-3">
      <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.15em] text-text-muted">{label}</p>
      <p className={`mb-0.5 font-display text-[22px] font-extrabold tracking-[-0.02em] ${accentClass || 'text-text-primary'}`}>
        {value}
      </p>
      {sub && <p className="font-body text-[11px] text-text-muted">{sub}</p>}
    </div>
  );
}

export default function CityExplorerPage() {
  const { neighborhoods, years, loading, error } = useCityData();
  const [selectedYear, setSelectedYear] = useState<Year>(2026);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | null>(null);
  const [mapRef, setMapRef] = useState<L.Map | null>(null);

  function toggleFilter(id: string) {
    setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, active: !f.active } : f)));
  }

  function recenter() {
    mapRef?.setView(BENGALURU_CENTER, INITIAL_ZOOM);
  }

  function flyToNeighborhood(n: Neighborhood) {
    mapRef?.flyTo([n.lat, n.lng], 14, { duration: 1 });
  }

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col bg-bg-deep">
        <Navbar />
        <div className="flex flex-1 items-center justify-center pt-[60px]">
          <LoadingState label="Loading Bengaluru data…" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex flex-col bg-bg-deep">
        <Navbar />
        <div className="flex flex-1 items-center justify-center pt-[60px] px-6">
          <ErrorState message={error} />
        </div>
      </div>
    );
  }

  const avgBuiltUp = Math.round(neighborhoods.reduce((s, n) => s + n.data[selectedYear].builtUp, 0) / neighborhoods.length);
  const avgGreen = Math.round(neighborhoods.reduce((s, n) => s + n.data[selectedYear].greenSpace, 0) / neighborhoods.length);
  const totalTransit = neighborhoods.reduce((s, n) => s + n.data[selectedYear].transitStations, 0);
  const markerColor = getMarkerColor(filters);

  return (
    <div className="fixed inset-0 flex flex-col bg-bg-deep">
      <Navbar />

      <div className="relative mt-[60px] flex-1">
        <MapContainer
          center={BENGALURU_CENTER}
          zoom={INITIAL_ZOOM}
          style={{ width: '100%', height: '100%' }}
          zoomControl={false}
          ref={(map) => {
            if (map) setMapRef(map);
          }}
        >
          {/* Standard OpenStreetMap tiles, inverted via CSS to a dark theme (see .leaflet-tile-pane
              in index.css) — CARTO's free dark tile endpoint now requires an API key, and SPEC.md
              rules out a paid map provider. */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            subdomains="abc"
            maxZoom={19}
          />

          {neighborhoods.map((n) => {
            const isSelected = selectedNeighborhood?.id === n.id;
            const radius = getMarkerRadius(n, selectedYear);
            return (
              <CircleMarker
                key={n.id}
                center={[n.lat, n.lng]}
                radius={radius}
                pathOptions={{
                  color: isSelected ? '#E8A020' : markerColor,
                  fillColor: isSelected ? '#E8A020' : markerColor,
                  fillOpacity: isSelected ? 0.55 : 0.2,
                  weight: isSelected ? 2.5 : 1,
                  opacity: 0.9,
                }}
                eventHandlers={{
                  click: () => {
                    const next = isSelected ? null : n;
                    setSelectedNeighborhood(next);
                    if (next) flyToNeighborhood(next);
                  },
                }}
              >
                <Tooltip direction="top" offset={[0, -radius]} opacity={1}>
                  <div className="whitespace-nowrap px-1 py-0.5 font-display font-bold text-text-primary">{n.name}</div>
                </Tooltip>
              </CircleMarker>
            );
          })}
        </MapContainer>

        {/* Year badge */}
        <div className="pointer-events-none absolute left-1/2 top-4 z-[500] flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-border-light bg-bg-base/90 px-5.5 py-1.5 backdrop-blur-md">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_8px_rgba(232,160,32,0.5)]" />
          <span className="font-mono text-[13px] font-medium tracking-[0.06em] text-text-primary">
            Bengaluru · {selectedYear}
          </span>
        </div>

        {/* Neighbourhood pills */}
        <div className="absolute left-1/2 top-[60px] z-[500] flex -translate-x-1/2 flex-wrap justify-center gap-1.5">
          {neighborhoods.map((n) => {
            const active = selectedNeighborhood?.id === n.id;
            return (
              <button
                key={n.id}
                onClick={() => {
                  const next = active ? null : n;
                  setSelectedNeighborhood(next);
                  if (next) flyToNeighborhood(next);
                  else mapRef?.setView(BENGALURU_CENTER, INITIAL_ZOOM);
                }}
                className={`rounded-full border px-3.5 py-1.5 font-body text-[11px] backdrop-blur-sm transition-all ${
                  active
                    ? 'border-amber bg-amber font-semibold text-bg-deep'
                    : 'border-border-light bg-bg-base/85 text-text-secondary'
                }`}
              >
                {n.name}
              </button>
            );
          })}
        </div>

        {/* Filter panel */}
        <div className="absolute left-4 top-4 z-[500]">
          <FilterPanel filters={filters} onToggle={toggleFilter} />
        </div>

        {/* Stats + zoom controls */}
        <div className="absolute right-4 top-4 z-[500] flex flex-col gap-2">
          <div className="w-[min(46vw,186px)] overflow-hidden rounded-xl border border-border-light bg-bg-base/90 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-lg">
            <div className="border-b border-border-subtle px-3.5 pb-2 pt-2.5">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">City Overview</p>
            </div>
            <StatCard label="Avg. Built-up" value={`${avgBuiltUp}%`} sub="of surveyed area" accentClass="text-amber" />
            <StatCard label="Avg. Green Space" value={`${avgGreen}%`} sub="of surveyed area" accentClass="text-green" />
            <StatCard label="Transit Stations" value={`${totalTransit}`} sub={`across ${neighborhoods.length} neighbourhoods`} />
            <div className="px-3.5 py-2.5">
              <p className="font-body text-[10px] leading-[1.5] text-text-muted">
                Demo data · <span className="text-amber">{neighborhoods.length} areas</span> loaded
              </p>
            </div>
          </div>

          <div className="flex w-9 flex-col self-end overflow-hidden rounded-lg border border-border-light bg-bg-base/90 backdrop-blur-md">
            {[
              { label: '+', title: 'Zoom in', onClick: () => mapRef?.zoomIn() },
              { label: '−', title: 'Zoom out', onClick: () => mapRef?.zoomOut() },
              { label: '⌖', title: 'Recenter', onClick: recenter },
            ].map(({ label, title, onClick }) => (
              <button
                key={label}
                title={title}
                aria-label={title}
                onClick={onClick}
                className="flex h-9 w-9 items-center justify-center border-b border-border-subtle font-body text-lg font-light text-text-secondary transition-colors last:border-b-0 hover:bg-white/5 hover:text-text-primary"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {selectedNeighborhood && (
          <div className="absolute bottom-[130px] left-4 z-[600] animate-[fade-slide-up_0.2s_ease]">
            <NeighborhoodPanel
              neighborhood={selectedNeighborhood}
              year={selectedYear}
              onClose={() => setSelectedNeighborhood(null)}
            />
          </div>
        )}

        <div className="absolute bottom-4 left-1/2 z-[500] w-[min(620px,calc(100vw-32px))] -translate-x-1/2">
          <Timeline years={years} selected={selectedYear} onChange={setSelectedYear} />
        </div>
      </div>
    </div>
  );
}
