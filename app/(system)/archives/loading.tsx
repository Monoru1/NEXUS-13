export default function ArchivesLoading() {
  return (
    <div className="py-10 max-w-7xl" aria-label="Loading archives" aria-busy="true">
      {/* Header skeleton */}
      <div className="mb-10 flex items-baseline justify-between">
        <div className="space-y-3">
          <div className="h-2.5 w-32 bg-void-3 pulse-signal" />
          <div className="h-9 w-56 bg-void-3 pulse-signal" />
          <div className="h-3 w-96 bg-void-3 pulse-signal mt-4" />
        </div>
        <div className="text-right space-y-1">
          <div className="h-2.5 w-24 bg-void-3 pulse-signal" />
          <div className="h-8 w-10 bg-void-3 pulse-signal" />
        </div>
      </div>

      {/* Column headers */}
      <div className="mb-4 h-2 w-full bg-void-3 opacity-40" />

      {/* Dossier row skeletons */}
      <div className="space-y-px">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="border border-void-4 bg-void-1 px-6 py-5 grid grid-cols-12 gap-4 items-start"
            style={{ opacity: 1 - i * 0.12 }}
          >
            <div className="col-span-2">
              <div className="h-2.5 w-14 bg-void-3 pulse-signal" />
            </div>
            <div className="col-span-5 space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-4 w-28 bg-void-3 pulse-signal" />
                <div className="h-3.5 w-12 bg-void-3 pulse-signal" />
                <div className="h-3.5 w-10 bg-void-3 pulse-signal" />
              </div>
              <div className="h-2.5 w-full bg-void-3 pulse-signal" />
              <div className="h-2.5 w-4/5 bg-void-3 pulse-signal" />
            </div>
            <div className="col-span-2">
              <div className="h-2.5 w-16 bg-void-3 pulse-signal" />
            </div>
            <div className="col-span-3 flex flex-col items-end gap-1">
              <div className="h-2.5 w-14 bg-void-3 pulse-signal" />
              <div className="h-2.5 w-20 bg-void-3 pulse-signal" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
