export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex items-center gap-3 font-mono text-sm text-ink-muted">
        <span className="h-2 w-2 animate-pulse-ring rounded-full bg-signal-teal" />
        Loading…
      </div>
    </div>
  );
}
