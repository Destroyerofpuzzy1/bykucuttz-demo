import { useId } from "react";
import { HexLampSvg } from "@/components/brand/HexLamps";
import { SteelChain } from "@/components/brand/SteelChain";

/**
 * A steel-backed LED sign suspended from two eye bolts. The supplied logo is unchanged.
 * All dimensions are reserved before paint; the entire fitting is decorative and static.
 */
export function NeonSign() {
  const id = `sign-${useId().replace(/:/g, "")}`;
  return (
    <div aria-hidden="true" className="neon-sign">
      <HexLampSvg variant="ring" className="neon-sign__ring" />
      <svg className="neon-sign__fitting" viewBox="0 0 640 460" focusable="false">
        <defs>
          <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="0.75" y2="1">
            <stop stopColor="#8b969d" /><stop offset="0.1" stopColor="#30383e" />
            <stop offset="0.5" stopColor="#12171b" /><stop offset="0.88" stopColor="#404a52" />
            <stop offset="1" stopColor="#727f87" />
          </linearGradient>
          <linearGradient id={`${id}-face`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#20262b" /><stop offset="0.45" stopColor="#0d1013" /><stop offset="1" stopColor="#1a2025" />
          </linearGradient>
          <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#414e56" /><stop offset="0.28" stopColor="#adb9c1" />
            <stop offset="0.7" stopColor="#53616a" /><stop offset="1" stopColor="#273038" />
          </linearGradient>
          <filter id={`${id}-light`} x="-12%" y="-30%" width="124%" height="160%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        {/* Ceiling rail, mounting screws, and two linked steel hangers. */}
        <rect x="111" y="17" width="418" height="18" rx="2" fill={`url(#${id}-metal)`} stroke="#57636b" strokeWidth="0.7" />
        {[125, 515].map((x) => <g key={x}><circle cx={x} cy="25" r="3.5" fill="#090c0e" stroke="#7b878e" /><path d={`M${x - 2} 25h4`} stroke="#9ea8af" strokeWidth="0.7" /></g>)}
        <SteelChain id={`${id}-left`} x={148} y={32} length={156} />
        <SteelChain id={`${id}-right`} x={492} y={32} length={156} />
        {/* Back, side and front faces make the sign a physical enclosure. */}
        <path d="M62 194H575L586 205V385H74L62 373Z" fill="#07090b" stroke="#242d34" strokeWidth="2" />
        <path d="M575 194L586 205V385L575 374Z" fill={`url(#${id}-metal)`} />
        <path d="M62 374H575L586 385H74Z" fill="#303940" />
        <rect x="62" y="194" width="513" height="180" rx="3" fill={`url(#${id}-metal)`} stroke={`url(#${id}-edge)`} strokeWidth="1.8" />
        <rect x="70" y="202" width="497" height="164" rx="1" fill={`url(#${id}-face)`} stroke="#030405" strokeWidth="3" />
        <path d="M72 204H564M74 363H563" stroke="#a0b1bd" strokeOpacity="0.2" strokeWidth="0.7" />
        {[148, 492].map((x) => <g key={x}><rect x={x - 7} y="190" width="14" height="12" rx="2" fill={`url(#${id}-metal)`} stroke="#6d7b85" /><ellipse cx={x} cy="189" rx="5.5" ry="8" fill="none" stroke={`url(#${id}-edge)`} strokeWidth="3" /></g>)}
        {[82, 555].flatMap((x) => [215, 353].map((y) => <g key={`${x}-${y}`}><circle cx={x} cy={y} r="3" fill="#11171b" stroke="#66757f" strokeWidth="0.8" /><path d={`M${x - 1.5} ${y}h3`} stroke="#a6b0b6" strokeWidth="0.6" /></g>))}
        <image href="/images/brand/logo-fill.svg" x="102" y="216" width="435" height="140" opacity="0.4" filter={`url(#${id}-light)`} />
        <image href="/images/brand/logo-fill.svg" x="102" y="216" width="435" height="140" />
      </svg>
    </div>
  );
}
