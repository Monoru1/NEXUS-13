export default function DossierLoading() {
  return (
    <div className="py-10 max-w-7xl" aria-label="Loading dossier" aria-busy="true">
      {/* Breadcrumb skeleton */}
      <div className="mb-6 h-2 w-48 bg-void-3 pulse-signal" />

      {/* DossierHeader skeleton */}
      <div className="border border-void-4 bg-void-1 mb-0">
        {/* Title row */}
        <div className="px-6 py-4 border-b border-void-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-2.5 w-12 bg-void-3 pulse-signal" />
            <div className="h-7 w-40 bg-void-3 pulse-signal" />
            <div className="h-4 w-14 bg-void-3 pulse-signal" />
            <div className="h-4 w-10 bg-void-3 pulse-signal" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-16 bg-void-3 pulse-signal" />
            <div className="h-6 w-8 bg-void-3 pulse-signal" />
          </div>
        </div>
        {/* Metadata rows */}
        <div className="grid grid-cols-2 divide-x divide-void-4">
          {[0, 1].map((col) => (
            <div key={col} className="px-6 py-4 space-y-3">
              <div className="h-2 w-24 bg-void-3 pulse-signal mb-3" />
              {[0, 1, 2, 3, 4].map((row) => (
                <div key={row} className="flex justify-between py-1.5 border-b border-void-4">
                  <div className="h-2 w-20 bg-void-3 pulse-signal" />
                  <div className="h-2 w-24 bg-void-3 pulse-signal" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main grid skeleton */}
      <div className="grid grid-cols-12 gap-0 border border-t-0 border-void-4">
        {/* Left column */}
        <div className="col-span-8 border-r border-void-4 px-8 py-8 space-y-10">
          {/* Summary */}
          <div className="space-y-2">
            <div className="h-2 w-20 bg-void-3 pulse-signal mb-4" />
            <div className="h-3 w-full bg-void-3 pulse-signal" />
            <div className="h-3 w-11/12 bg-void-3 pulse-signal" />
            <div className="h-3 w-4/5 bg-void-3 pulse-signal" />
            <div className="mt-3 h-3 w-full bg-void-3 pulse-signal" />
            <div className="h-3 w-3/4 bg-void-3 pulse-signal" />
          </div>

          {/* Timeline */}
          <div>
            <div className="h-2 w-32 bg-void-3 pulse-signal mb-5" />
            <div className="relative pl-8 space-y-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="pb-6 border-b border-void-4 space-y-2" style={{ opacity: 1 - i * 0.2 }}>
                  <div className="h-2 w-36 bg-void-3 pulse-signal" />
                  <div className="h-4 w-64 bg-void-3 pulse-signal" />
                  <div className="h-2.5 w-full bg-void-3 pulse-signal" />
                  <div className="h-2.5 w-5/6 bg-void-3 pulse-signal" />
                </div>
              ))}
            </div>
          </div>

          {/* Evidence grid */}
          <div>
            <div className="h-2 w-28 bg-void-3 pulse-signal mb-5" />
            <div className="space-y-px">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="border border-void-4 bg-void-1 px-4 py-3"
                  style={{ opacity: 1 - i * 0.2 }}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-2">
                        <div className="h-3.5 w-10 bg-void-3 pulse-signal" />
                      </div>
                      <div className="h-3 w-72 bg-void-3 pulse-signal" />
                      <div className="h-2.5 w-full bg-void-3 pulse-signal" />
                      <div className="h-2.5 w-4/5 bg-void-3 pulse-signal" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 w-20 bg-void-3 pulse-signal" />
                      <div className="h-2 w-28 bg-void-3 pulse-signal" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-4 px-6 py-8 space-y-6">
          {/* Clearance meter */}
          <div className="border border-void-4 bg-void-1 p-4 space-y-2">
            <div className="h-2 w-28 bg-void-3 pulse-signal mb-3" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-2 w-4 bg-void-3 pulse-signal" />
                <div className="flex-1 h-1.5 bg-void-3" />
              </div>
            ))}
          </div>

          {/* Subject card */}
          <div className="border border-void-4 bg-void-1">
            <div className="px-4 py-3 border-b border-void-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-void-3 pulse-signal" />
              <div className="space-y-1">
                <div className="h-3 w-20 bg-void-3 pulse-signal" />
                <div className="h-2 w-24 bg-void-3 pulse-signal" />
              </div>
            </div>
            <div className="px-4 py-3 space-y-2">
              <div className="h-2.5 w-full bg-void-3 pulse-signal" />
              <div className="h-2.5 w-4/5 bg-void-3 pulse-signal" />
              <div className="h-2.5 w-3/4 bg-void-3 pulse-signal" />
            </div>
          </div>

          {/* Audit log */}
          <div className="border border-void-4 bg-void-1 p-4 space-y-2">
            <div className="h-2 w-36 bg-void-3 pulse-signal mb-3" />
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between py-1.5 border-b border-void-4">
                <div className="h-2 w-20 bg-void-3 pulse-signal" />
                <div className="h-2 w-24 bg-void-3 pulse-signal" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
