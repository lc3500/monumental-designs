import Image from "next/image";

export const dynamic = "force-static";

export default function ContentUnavailablePage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-16">
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
              Content temporarily unavailable
            </h1>
          </div>
        </div>

        <p className="mt-4 text-base text-muted-foreground">
          We’re having trouble reaching our content service right now. Please try
          again in a moment.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/content-unavailable/"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow"
          >
            Try again
          </a>
          <a
            href="/"
            className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground"
          >
            Back to home
          </a>
        </div>
      </div>
    </main>
  );
}
