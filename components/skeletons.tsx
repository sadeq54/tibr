export function Skel({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function HeroSpotSkeleton() {
  return (
    <div
      className="hero-spot-bg relative overflow-hidden rounded-2xl border border-[var(--color-border)] p-6"
      role="status"
      aria-busy="true"
      aria-label="Loading spot price"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 space-y-3">
          <Skel className="h-3 w-44" />
          <Skel className="h-12 w-56" />
          <Skel className="h-7 w-72" />
        </div>
        <div className="hidden space-y-2 md:block">
          <Skel className="h-3 w-16 ml-auto" />
          <Skel className="h-5 w-32 ml-auto" />
          <Skel className="h-3 w-20 ml-auto" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card-hover)] p-3 space-y-2"
          >
            <Skel className="h-3 w-12" />
            <Skel className="h-5 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function MetalsStripSkeleton() {
  return (
    <div className="space-y-3" role="status" aria-busy="true" aria-label="Loading metals">
      <Skel className="h-3 w-56" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 space-y-3"
          >
            <div className="flex items-center gap-2">
              <Skel className="h-6 w-6 rounded-full" />
              <Skel className="h-4 w-20" />
            </div>
            <Skel className="h-7 w-28" />
            <Skel className="h-4 w-14" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PriceChartSkeleton() {
  return (
    <div
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 space-y-4"
      role="status"
      aria-busy="true"
      aria-label="Loading chart"
    >
      <div className="flex items-center justify-between">
        <Skel className="h-5 w-48" />
        <Skel className="h-7 w-32" />
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skel key={i} className="h-10" />
        ))}
      </div>
      <Skel className="h-72 w-full" />
    </div>
  );
}

export function BidAskGaugeSkeleton() {
  return (
    <div
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 space-y-4"
      role="status"
      aria-busy="true"
      aria-label="Loading range"
    >
      <Skel className="h-4 w-40" />
      <Skel className="h-2 w-full rounded-full" />
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skel key={i} className="h-10" />
        ))}
      </div>
    </div>
  );
}

export function KaratGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4" role="status" aria-busy="true" aria-label="Loading karat prices">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 space-y-4"
        >
          <div className="flex items-center gap-3">
            <Skel className="h-11 w-11 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skel className="h-4 w-24" />
              <Skel className="h-3 w-16" />
            </div>
          </div>
          <Skel className="h-8 w-32" />
          <Skel className="h-3 w-28" />
          <div className="grid grid-cols-2 gap-2 border-t border-[var(--color-border)] pt-3">
            {Array.from({ length: 4 }).map((__, j) => (
              <Skel key={j} className="h-3" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function CalculatorSkeleton() {
  return (
    <div
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 space-y-4"
      role="status"
      aria-busy="true"
      aria-label="Loading calculator"
    >
      <Skel className="h-6 w-44" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skel className="h-3 w-16" />
            <Skel className="h-10" />
          </div>
        ))}
      </div>
      <Skel className="h-20 rounded-lg" />
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="space-y-4" role="status" aria-busy="true" aria-label="Loading sidebar">
      <Skel className="h-44 rounded-xl" />
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 space-y-3">
        <Skel className="h-3 w-24" />
        {Array.from({ length: 7 }).map((_, i) => (
          <Skel key={i} className="h-4" />
        ))}
      </div>
      <Skel className="h-44 rounded-xl" />
    </div>
  );
}
