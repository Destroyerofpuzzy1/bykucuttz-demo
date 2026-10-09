/** SVG geometry shared by suspended fittings. Alternating links turn through 90 degrees. */
export function SteelChain({ id, x, y, length }: { id: string; x: number; y: number; length: number }) {
  const count = Math.max(2, Math.round(length / 15));
  const step = (length - 22) / (count - 1);

  return (
    <g transform={`translate(${x} ${y})`}>
      <defs>
        <linearGradient id={`${id}-steel`} x1="0" x2="1" y1="0" y2="0.35">
          <stop stopColor="#1b2024" />
          <stop offset="0.22" stopColor="#677178" />
          <stop offset="0.38" stopColor="#c2cbd0" />
          <stop offset="0.52" stopColor="#434b52" />
          <stop offset="0.8" stopColor="#252c32" />
          <stop offset="1" stopColor="#919ca4" />
        </linearGradient>
      </defs>
      {Array.from({ length: count }, (_, i) => {
        const edge = i % 2 === 1;
        const width = edge ? 4.5 : 12;
        return (
          <g key={i} transform={`translate(0 ${+(i * step).toFixed(2)})`}>
            <rect x={-width / 2 + 1.3} y="1.4" width={width} height="22" rx={width / 2} fill="none" stroke="#030405" strokeWidth="5.5" />
            <rect x={-width / 2} y="0" width={width} height="22" rx={width / 2} fill="none" stroke={`url(#${id}-steel)`} strokeWidth={edge ? 3.5 : 3.1} />
            <path d={edge ? "M-1 5V13" : "M-5 9V6Q-5 1 0 1"} fill="none" stroke="#d9e3e8" strokeOpacity={i % 3 === 0 ? 0.65 : 0.3} strokeWidth="0.7" strokeLinecap="round" />
          </g>
        );
      })}
    </g>
  );
}
