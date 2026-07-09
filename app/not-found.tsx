import Link from "next/link";
import { WindowFrame } from "@/components/window-frame";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg items-center justify-center px-4">
      <WindowFrame label="error — process not found" className="w-full">
        <div className="py-6 text-center">
          <p className="font-mono text-6xl text-signal-rose">404</p>
          <h1 className="mt-4 font-display text-xl text-ink">
            This window doesn&apos;t exist.
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            The page you tried to open isn&apos;t part of this dashboard.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center rounded-xl border border-border bg-base-raised px-4 py-2 text-sm text-ink transition-colors hover:border-signal-teal/40 hover:text-signal-teal"
          >
            Return to dashboard
          </Link>
        </div>
      </WindowFrame>
    </div>
  );
}
