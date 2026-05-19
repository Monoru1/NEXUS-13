export default function NexusGraphLoading() {
  return (
    <div
      className="relative w-full"
      style={{ height: 'calc(100vh - 3rem)', background: '#060607', fontFamily: 'var(--font-mono, monospace)' }}
    >
      {/* Top bar skeleton */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4">
        <div className="space-y-1.5">
          <div className="h-2.5 w-56 rounded-sm animate-pulse" style={{ background: '#2e2e35' }} />
          <div className="h-2 w-40 rounded-sm animate-pulse" style={{ background: '#1a1a1e' }} />
        </div>
        <div className="h-2.5 w-48 rounded-sm animate-pulse" style={{ background: '#2e2e35' }} />
      </div>

      {/* Center loading text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-xs tracking-widest uppercase" style={{ color: '#2e2e35' }}>
          INITIALISING GRAPH ENGINE
        </p>
      </div>

      {/* Inspector panel skeleton */}
      <div className="absolute right-6 top-24 w-80 border" style={{ borderColor: '#2e2e35' }}>
        <div className="px-4 py-2 border-b" style={{ borderColor: '#2e2e35' }}>
          <div className="h-2 w-24 rounded-sm animate-pulse" style={{ background: '#2e2e35' }} />
        </div>
        <div className="px-4 py-6 space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-2 rounded-sm animate-pulse" style={{ background: '#1a1a1e', width: `${70 + i * 7}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
