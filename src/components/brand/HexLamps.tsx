import { useId } from "react";

const DEG = Math.PI / 180;
const S3 = Math.sqrt(3);
/** Projection scale and the room left around the drawing for the glow, in viewBox units. */
const FOCAL = 1000;
const BLOOM = 70;

type Pt = { x: number; y: number };
type Seg = [Pt, Pt];
/** Tubes in their own plane (hexagon edge = 1), the point the fitting is placed by, and an optional lit surface. */
type Shape = { segs: Seg[]; center: Pt; fill?: Pt[] };
type Lamp = Shape & {
  /** what the tubes are mounted on: flat on the ceiling, or upright on a wall */
  plane: "ceiling" | "wall";
  /** turn of the fitting around the vertical axis, and how far the eye looks up, in degrees */
  yaw: number;
  pitch: number;
  /** the fitting's centre above the eye, ahead and sideways, in hexagon edges */
  height: number;
  distance: number;
  offset: number;
  /** tube thickness and the dark connector at each tube end, in edges */
  tube: number;
  gap: number;
};

const lerp = (a: Pt, b: Pt, t: number): Pt => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
const size = ([a, b]: Seg) => Math.hypot(b.x - a.x, b.y - a.y);

/** Edges of flat-top hexagons (edge 1) around the given centres; every shared edge once. */
function hexEdges(centres: Pt[]): Seg[] {
  const edges = new Map<string, Seg>();
  const key = (p: Pt) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`;
  for (const c of centres) {
    const v = Array.from({ length: 6 }, (_, k) => ({ x: c.x + Math.cos(k * 60 * DEG), y: c.y + Math.sin(k * 60 * DEG) }));
    v.forEach((a, k) => {
      const b = v[(k + 1) % 6];
      const id = [key(a), key(b)].sort().join("|");
      if (!edges.has(id)) edges.set(id, [a, b]);
    });
  }
  return [...edges.values()];
}

/** The part of a tube inside the frame (Liang-Barsky), or null. */
function clip([a, b]: Seg, length: number, depth: number): Seg | null {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  let t0 = 0;
  let t1 = 1;
  for (const [p, q] of [[-dx, a.x], [dx, length - a.x], [-dy, a.y], [dy, depth - a.y]]) {
    if (Math.abs(p) < 1e-9) {
      if (q < 0) return null;
      continue;
    }
    const r = q / p;
    if (p < 0) {
      if (r > t1) return null;
      t0 = Math.max(t0, r);
    } else {
      if (r < t0) return null;
      t1 = Math.min(t1, r);
    }
  }
  return [lerp(a, b, t0), lerp(a, b, t1)];
}

/** The rectangular frame, split wherever an inner tube meets it (a T-connector there). */
function frame(length: number, depth: number, inner: Seg[]): Seg[] {
  const corners = [{ x: 0, y: 0 }, { x: length, y: 0 }, { x: length, y: depth }, { x: 0, y: depth }];
  return corners.flatMap((a, k) => {
    const b = corners[(k + 1) % 4];
    const side = size([a, b]);
    const ts = [0, 1];
    for (const p of inner.flat()) {
      const off = Math.abs((p.x - a.x) * (b.y - a.y) - (p.y - a.y) * (b.x - a.x)) / side;
      const t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / side ** 2;
      if (off < 1e-6 && t > 1e-6 && t < 1 - 1e-6) ts.push(t);
    }
    ts.sort((m, n) => m - n);
    return ts.slice(1).flatMap((t, i): Seg[] => (t - ts[i] > 1e-6 ? [[lerp(a, b, ts[i]), lerp(a, b, t)]] : []));
  });
}

/** A rectangular frame of tubes holding a honeycomb: the panels over the chairs. */
function panel(length: number, depth: number): Shape {
  const centres: Pt[] = [];
  for (let i = -Math.ceil(length / 1.5) - 2; i <= Math.ceil(length / 1.5) + 2; i++) {
    for (let j = -Math.ceil(depth / S3) - 2; j <= Math.ceil(depth / S3) + 2; j++) {
      const c = { x: length / 2 + 1.5 * i, y: depth / 2 + S3 * (j + (Math.abs(i) % 2) / 2) };
      if (c.x >= -1.5 && c.x <= length + 1.5 && c.y >= -1.8 && c.y <= depth + 1.8) centres.push(c);
    }
  }
  const inner = hexEdges(centres)
    .map((s) => clip(s, length, depth))
    .filter((s): s is Seg => s !== null && size(s) > 0.3);
  return {
    segs: [...inner, ...frame(length, depth, inner)],
    center: { x: length / 2, y: depth / 2 },
    fill: [{ x: 0, y: 0 }, { x: length, y: 0 }, { x: length, y: depth }, { x: 0, y: depth }],
  };
}

/** A few cells of a giant honeycomb, by column and row (odd columns sit half a cell lower). */
function cells(list: [number, number][]): Shape {
  const centres = list.map(([i, j]) => ({ x: 1.5 * i, y: S3 * (j + (Math.abs(i) % 2) / 2) }));
  const mid = (vs: number[]) => (Math.min(...vs) + Math.max(...vs)) / 2;
  return { segs: hexEdges(centres), center: { x: mid(centres.map((c) => c.x)), y: mid(centres.map((c) => c.y)) } };
}

/**
 * The fittings. `overhead` is a ceiling panel seen from below (Finale),
 * `cluster` is a few giant cells on a side wall running away from the eye (SocialProof),
 * `ring` is one big hexagon on the back wall, the frame behind the neon sign (Crew).
 */
const LAMPS = {
  overhead: { plane: "ceiling", ...panel(14.3, 7.4), yaw: -8, pitch: 16, height: 3.6, distance: 14, offset: 0, tube: 0.045, gap: 0.06 },
  cluster: { plane: "wall", ...cells([[0, 0], [0, 1], [1, 0], [1, 1], [2, 0], [2, 1]]), yaw: 115, pitch: 0, height: 0, distance: 7, offset: 3, tube: 0.03, gap: 0.035 },
  ring: { plane: "wall", ...cells([[0, 0]]), yaw: 18, pitch: 5, height: 0, distance: 4, offset: 0, tube: 0.03, gap: 0.04 },
} satisfies Record<string, Lamp>;

export type HexLampVariant = keyof typeof LAMPS;

/**
 * Lays the fitting in 3D (turned on the ceiling or standing on a wall, eye looking up) and projects
 * it once, on the server. Every tube becomes a quad whose width follows the distance (perspective
 * thickness), with a dark gap at each connector.
 */
function build(l: Lamp) {
  const [sa, ca, sg, cg] = [Math.sin(l.pitch * DEG), Math.cos(l.pitch * DEG), Math.sin(l.yaw * DEG), Math.cos(l.yaw * DEG)];
  const wall = l.plane === "wall";
  const project = (p: Pt) => {
    const u = p.x - l.center.x;
    const v = p.y - l.center.y;
    const x = l.offset + u * cg - (wall ? 0 : v * sg);
    const ahead = l.distance + u * sg + (wall ? 0 : v * cg);
    // on a wall the plane's v runs down, like the screen
    const up = l.height - (wall ? v : 0);
    const z = up * sa + ahead * ca;
    return { x: (FOCAL * x) / z, y: (-FOCAL * (up * ca - ahead * sa)) / z, z };
  };

  const quads = l.segs
    .filter((s) => size(s) > 2 * l.gap + 0.12)
    .map(([a, b]) => {
      const k = l.gap / size([a, b]);
      const [p, q] = [project(lerp(a, b, k)), project(lerp(a, b, 1 - k))];
      const len = Math.hypot(q.x - p.x, q.y - p.y);
      const [nx, ny] = [(p.y - q.y) / len, (q.x - p.x) / len];
      const [wp, wq] = [(FOCAL * l.tube) / 2 / p.z, (FOCAL * l.tube) / 2 / q.z];
      return [
        { x: p.x + nx * wp, y: p.y + ny * wp },
        { x: q.x + nx * wq, y: q.y + ny * wq },
        { x: q.x - nx * wq, y: q.y - ny * wq },
        { x: p.x - nx * wp, y: p.y - ny * wp },
      ];
    });

  const all = quads.flat();
  const left = Math.min(...all.map((p) => p.x)) - BLOOM;
  const top = Math.min(...all.map((p) => p.y)) - BLOOM;
  const at = (p: Pt) => ({ x: +(p.x - left).toFixed(1), y: +(p.y - top).toFixed(1) });
  const path = (pts: Pt[]) => `M${pts.map((p) => `${at(p).x} ${at(p).y}`).join("L")}Z`;
  // the nearest and the farthest point light the depth gradient
  const byDepth = (l.fill ?? l.segs.flat()).map(project).sort((m, n) => m.z - n.z);

  return {
    width: Math.ceil(Math.max(...all.map((p) => p.x)) + BLOOM - left),
    height: Math.ceil(Math.max(...all.map((p) => p.y)) + BLOOM - top),
    tubes: quads.map(path).join(""),
    surface: l.fill && path(l.fill.map(project)),
    near: at(byDepth[0]),
    far: at(byDepth[byDepth.length - 1]),
  };
}

const FITTINGS = Object.fromEntries(Object.entries(LAMPS).map(([k, l]) => [k, build(l)])) as Record<HexLampVariant, ReturnType<typeof build>>;

/** Projected tubes sit in dark metal channels; the offset back face exposes their depth. */
export function HexLampSvg({ variant, className }: { variant: HexLampVariant; className?: string }) {
  const p = FITTINGS[variant];
  const id = `hex-lamps-${variant}-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox={`0 0 ${p.width} ${p.height}`} className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-depth`} gradientUnits="userSpaceOnUse" x1={p.near.x} y1={p.near.y} x2={p.far.x} y2={p.far.y}>
          <stop offset="0" stopColor="#f4faff" />
          <stop offset="1" stopColor="#f4faff" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id={`${id}-halo`} gradientUnits="userSpaceOnUse" x1={p.near.x} y1={p.near.y} x2={p.far.x} y2={p.far.y}>
          <stop offset="0" stopColor="#cfe6ff" />
          <stop offset="1" stopColor="#cfe6ff" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`${id}-steel`} gradientUnits="userSpaceOnUse" x1={p.near.x} y1={p.near.y} x2={p.far.x} y2={p.far.y}>
          <stop stopColor="#65737d" /><stop offset="0.3" stopColor="#2a343c" /><stop offset="1" stopColor="#10161b" />
        </linearGradient>
        <filter id={`${id}-glow`} filterUnits="userSpaceOnUse" x="0" y="0" width={p.width} height={p.height} colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="wide" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="near" />
          <feMerge>
            <feMergeNode in="wide" />
            <feMergeNode in="near" />
          </feMerge>
        </filter>
        {/* the tubes once; the glow and the crisp layer both reuse them */}
        <path id={`${id}-tubes`} d={p.tubes} />
      </defs>
      {p.surface && <path d={p.surface} fill={`url(#${id}-depth)`} className="hex-lamps__ceiling" />}
      <use href={`#${id}-tubes`} transform="translate(1.5 5)" fill="#080b0e" stroke="#202930" strokeWidth="3.4" strokeLinejoin="round" />
      <use href={`#${id}-tubes`} fill={`url(#${id}-steel)`} stroke={`url(#${id}-steel)`} strokeWidth="2.8" strokeLinejoin="round" />
      <use href={`#${id}-tubes`} fill={`url(#${id}-halo)`} filter={`url(#${id}-glow)`} className="hex-lamps__glow" />
      <use href={`#${id}-tubes`} fill={`url(#${id}-depth)`} />
    </svg>
  );
}

/**
 * Decorative hexagon lamps behind a section, modelled on the fittings in the salons: not a flat
 * pattern but tubes placed in space and projected in perspective, so they taper and dim with
 * distance. Static SVG rendered on the server, with no parallax or animation. Place it as the first child of a `relative` section
 * whose content follows in a positioned container.
 */
export function HexLamps({ variant }: { variant: Exclude<HexLampVariant, "ring"> }) {
  return (
    <div aria-hidden="true" className={`hex-lamps hex-lamps--${variant}`}>
      <div className="hex-lamps__panel">
        <HexLampSvg variant={variant} />
      </div>
    </div>
  );
}
