import type { ReactNode } from 'react';

type Variant = 'default' | 'amber' | 'green';

const VARIANT_CLASSES: Record<Variant, string> = {
  default: 'bg-white/[0.07] text-text-secondary',
  amber: 'bg-amber-dim text-amber',
  green: 'bg-green-dim text-green',
};

export function Tag({ children, variant = 'default' }: { children: ReactNode; variant?: Variant }) {
  return (
    <span className={`inline-block rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] ${VARIANT_CLASSES[variant]}`}>
      {children}
    </span>
  );
}

export function SectionDivider({ label, variant = 'default' }: { label: string; variant?: Variant }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <Tag variant={variant}>{label}</Tag>
      <div className="h-px flex-1 bg-border-subtle" />
    </div>
  );
}
