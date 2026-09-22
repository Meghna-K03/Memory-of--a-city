export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-amber-border border-t-amber" />
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">{label}</p>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center gap-2 rounded-lg border border-red/30 bg-red-dim px-6 py-10 text-center">
      <p className="font-display text-sm font-bold text-red">Something went wrong</p>
      <p className="max-w-sm font-body text-sm text-text-secondary">{message}</p>
    </div>
  );
}
