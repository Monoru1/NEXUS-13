export default function TerminalLoading() {
  return (
    <div
      className="flex flex-col bg-void-1 border border-void-4"
      style={{ height: 'calc(100vh - 3rem)' }}
      aria-label="Loading terminal"
      aria-busy="true"
    >
      <div className="shrink-0 px-4 py-2 border-b border-void-4 bg-void-0 flex items-center justify-between">
        <div className="h-2 w-32 bg-void-3 pulse-signal" />
        <div className="h-2 w-12 bg-void-3 pulse-signal" />
      </div>
      <div className="flex-1 px-4 py-4 space-y-2">
        <div className="h-2.5 w-40 bg-void-3 pulse-signal" />
        <div className="h-2.5 w-64 bg-void-3 pulse-signal" />
        <div className="h-2.5 w-56 bg-void-3 pulse-signal opacity-70" />
      </div>
      <div className="shrink-0 flex items-center gap-2 px-4 py-3 border-t border-void-4">
        <div className="h-3 w-20 bg-void-3 pulse-signal" />
        <div className="h-3 w-3 bg-signal pulse-signal" />
      </div>
    </div>
  );
}
