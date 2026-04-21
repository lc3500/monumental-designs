"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showToast, setShowToast] = useState(false);

  const isStrapiError = useMemo(() => {
    const message = error?.message || "";
    return (
      message.toLowerCase().includes("strapi") ||
      message.toLowerCase().includes("fetch failed") ||
      message.toLowerCase().includes("ecconnrefused") ||
      message.toLowerCase().includes("enotfound")
    );
  }, [error]);

  useEffect(() => {
    setShowToast(true);
    const timeout = setTimeout(() => setShowToast(false), 6000);
    return () => clearTimeout(timeout);
  }, [error]);

  const title = isStrapiError
    ? "We’re refreshing the gallery"
    : "Something went wrong";
  const message = isStrapiError
    ? "Our content service is taking a quick breather. Please try again in a moment."
    : "An unexpected error occurred. Please try again.";

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-16">
      {showToast ? (
        <div
          className="fixed right-6 top-6 z-50 max-w-sm rounded-xl border border-border bg-card px-4 py-3 shadow-lg"
          role="status"
          aria-live="polite"
        >
          <div className="text-sm font-semibold">{title}</div>
          <div className="text-sm text-muted-foreground">{message}</div>
        </div>
      ) : null}

      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-xl">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.svg"
            alt="Monumental Designs"
            width={56}
            height={56}
            priority
          />
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Monumental Designs
            </div>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">
              {title}
            </h1>
          </div>
        </div>
        <p className="mt-4 text-base text-muted-foreground">{message}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground"
          >
            Back to home
          </a>
        </div>

        <details className="mt-6 text-sm text-muted-foreground">
          <summary className="cursor-pointer">Technical details</summary>
          <pre className="mt-3 overflow-auto rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground">
            {error?.message}
          </pre>
        </details>
      </div>
    </div>
  );
}
