export function DemoCursor({
  x,
  y,
}: {
  x: number;
  y: number;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute z-30"
      style={{ left: x, top: y }}
    >
      <div className="relative h-9 w-9 rounded-full bg-yellow-300/90 shadow-[0_10px_24px_rgba(15,23,42,0.18)]">
        <div className="absolute inset-1 rounded-full border-2 border-yellow-100/70" />
      </div>
    </div>
  );
}
