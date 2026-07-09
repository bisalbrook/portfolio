import { cn } from "@/lib/utils";

/**
 * Signature "OS window" chrome used to frame most panels across the site —
 * traffic-light dots + a mono label, echoing the desktop-dashboard theme.
 */
export function WindowFrame({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("glass rounded-2xl overflow-hidden", className)}>
      <div className="window-titlebar">
        <span className="traffic-light bg-signal-rose/70" />
        <span className="traffic-light bg-signal-amber/70" />
        <span className="traffic-light bg-signal-teal/70" />
        <span className="mono-tag ml-2">{label}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
