import traces from "./led-traces.json";

type TraceName = keyof typeof traces;

type Props = {
  name: TraceName;
  className?: string;
  /** scroll-triggered stroke draw (see MotionController) */
  draw?: boolean;
};

/**
 * LED ceiling geometry traced from the real photo. Uses the same cover box as an
 * object-fit: cover / object-position: center image, so lines land on the real tubes.
 */
export function LedTrace({ name, className = "", draw = false }: Props) {
  const t = traces[name];
  return (
    <svg
      viewBox={t.viewBox}
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
      focusable="false"
      {...(draw ? { "data-led-draw": "" } : {})}
    >
      {t.segments.map((d, i) => (
        <path key={i} d={d} className="led-path" pathLength={1} />
      ))}
    </svg>
  );
}
