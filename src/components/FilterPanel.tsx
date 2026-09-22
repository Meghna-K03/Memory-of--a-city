export interface MapFilter {
  id: string;
  label: string;
  color: string;
  active: boolean;
}

interface FilterPanelProps {
  filters: MapFilter[];
  onToggle: (id: string) => void;
}

export default function FilterPanel({ filters, onToggle }: FilterPanelProps) {
  return (
    <div className="w-[min(46vw,200px)] rounded-xl border border-border-light bg-bg-base/90 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-lg">
      <p className="mb-3.5 font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">Map Layers</p>
      <div className="flex flex-col gap-1">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => onToggle(f.id)}
            aria-pressed={f.active}
            className={`flex w-full items-center gap-2.5 rounded-md border px-2.5 py-2 text-left transition-colors ${
              f.active ? 'bg-white/5' : 'border-transparent hover:bg-white/[0.03]'
            }`}
            style={f.active ? { borderColor: `${f.color}4d` } : undefined}
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full border"
              style={{
                background: f.active ? f.color : 'transparent',
                borderColor: f.active ? f.color : '#4B5360',
              }}
            />
            <span className={`flex-1 font-body text-xs font-medium ${f.active ? 'text-text-primary' : 'text-text-secondary'}`}>
              {f.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
