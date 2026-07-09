"use client";

import { useEffect } from "react";
import { WindowFrame } from "@/components/window-frame";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg items-center justify-center px-4">
      <WindowFrame label="error — unhandled exception" className="w-full">
        <div className="py-6 text-center">
          <h1 className="font-display text-xl text-ink">Something broke.</h1>
          <p className="mt-2 text-sm text-ink-muted">
            The dashboard hit an unexpected error. It has been logged.
          </p>
          <button
            onClick={reset}
            className="mt-6 inline-flex items-center rounded-xl border border-border bg-base-raised px-4 py-2 text-sm text-ink transition-colors hover:border-signal-teal/40 hover:text-signal-teal"
          >
            Try again
          </button>
        </div>
      </WindowFrame>
    </div>
  );
}
