"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4 text-center font-sans">
        <div className="flex size-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          !
        </div>
        <div>
          <h2 className="text-xl font-semibold text-neutral-900">Something went wrong</h2>
          <p className="mt-1 text-sm text-neutral-500">Please refresh the page and try again.</p>
        </div>
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
