import { useNavigate } from 'react-router-dom';
import { calcChange } from '@/lib/calcChange';
import type { Neighborhood, Year } from '@/types/city';

interface NeighborhoodPanelProps {
  neighborhood: Neighborhood;
  year: Year;
  onClose: () => void;
}

function DeltaBadge({ value, unit = '%' }: { value: number; unit?: string }) {
  const isPositive = value > 0;
  return (
    <span className={`font-mono text-xs font-medium ${isPositive ? 'text-amber' : 'text-red'}`}>
      {isPositive ? '+' : ''}
      {value}
      {unit}
    </span>
  );
}

export default function NeighborhoodPanel({ neighborhood, year, onClose }: NeighborhoodPanelProps) {
  const navigate = useNavigate();
  const baseYear = 2010 as Year;

  const rows = [
    { label: 'Built-up area', value: calcChange(neighborhood, baseYear, year, 'builtUp'), unit: '%' },
    { label: 'Green space', value: calcChange(neighborhood, baseYear, year, 'greenSpace'), unit: '%' },
    { label: 'Transit stations', value: calcChange(neighborhood, baseYear, year, 'transitStations'), unit: '' },
  ];

  return (
    <div className="w-60 rounded-xl border border-border-light bg-bg-base/95 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.2em] text-amber">
            {baseYear} → {year}
          </p>
          <h3 className="font-display text-lg font-extrabold text-text-primary">{neighborhood.name}</h3>
        </div>
        <button onClick={onClose} aria-label="Close neighbourhood panel" className="p-0.5 text-base leading-none text-text-muted">
          ✕
        </button>
      </div>

      <div className="mb-4.5 flex flex-col gap-2">
        {rows.map((s) => (
          <div key={s.label} className="flex items-center justify-between rounded-md bg-white/[0.03] px-3 py-2">
            <span className="font-body text-xs text-text-secondary">{s.label}</span>
            <DeltaBadge value={s.value} unit={s.unit} />
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate(`/neighborhood/${neighborhood.id}`)}
        className="w-full rounded-md bg-amber py-2.5 font-display text-[11px] font-bold uppercase tracking-[0.08em] text-bg-deep transition-opacity hover:opacity-90"
      >
        View Change Story →
      </button>
    </div>
  );
}
