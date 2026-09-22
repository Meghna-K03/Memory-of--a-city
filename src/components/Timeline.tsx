import type { Year } from '@/types/city';

interface TimelineProps {
  years: Year[];
  selected: Year;
  onChange: (year: Year) => void;
}

export default function Timeline({ years, selected, onChange }: TimelineProps) {
  const selectedIdx = years.indexOf(selected);

  return (
    <div className="rounded-xl border border-border-light bg-bg-base/95 px-7 py-4.5 shadow-[0_-4px_32px_rgba(0,0,0,0.4)]">
      <div className="mb-3.5 flex items-center justify-between">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">Year</p>
        <p className="font-display text-[13px] font-bold text-amber">{selected}</p>
      </div>

      <div className="relative py-2">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/10" />
        <div
          className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-amber transition-[width]"
          style={{ width: `${(selectedIdx / (years.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {years.map((year, i) => {
            const isSelected = year === selected;
            const isPast = i <= selectedIdx;
            return (
              <button
                key={year}
                onClick={() => onChange(year)}
                className="flex flex-col items-center gap-2 border-none bg-transparent p-0 outline-none"
              >
                <span
                  className={`rounded-full border transition-all ${isSelected ? 'h-3.5 w-3.5 shadow-[0_0_12px_rgba(232,160,32,0.4)]' : 'h-2 w-2'}`}
                  style={{
                    background: isSelected ? '#E8A020' : isPast ? 'rgba(232,160,32,0.4)' : '#222831',
                    borderColor: isSelected ? 'rgba(232,160,32,0.4)' : isPast ? 'rgba(232,160,32,0.3)' : '#4B5360',
                    borderWidth: isSelected ? '2px' : '1px',
                  }}
                />
                <span
                  className={`font-mono text-[11px] tracking-[0.05em] transition-colors ${
                    isSelected ? 'font-medium text-amber' : isPast ? 'text-text-secondary' : 'text-text-muted'
                  }`}
                >
                  {year}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
