import { useId } from "react";
import { SteelChain } from "@/components/brand/SteelChain";

/** A cordless clipper and cutting shears on a wall rail. Static, decorative SVG, no icon library. */
export function BarberTools() {
  const id = `tools-${useId().replace(/:/g, "")}`;
  return (
    <div className="barber-tools" aria-hidden="true">
      <svg viewBox="0 0 300 370" focusable="false">
        <defs>
          <linearGradient id={`${id}-steel`} x1="0" y1="0" x2="1" y2="0.15">
            <stop stopColor="#151b20" /><stop offset="0.18" stopColor="#73818a" />
            <stop offset="0.3" stopColor="#c6d0d6" /><stop offset="0.44" stopColor="#52616c" />
            <stop offset="0.72" stopColor="#242d35" /><stop offset="0.92" stopColor="#9ba8b0" /><stop offset="1" stopColor="#343f48" />
          </linearGradient>
          <linearGradient id={`${id}-grip`} x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#080b0d" /><stop offset="0.35" stopColor="#30383e" /><stop offset="0.7" stopColor="#151b20" /><stop offset="1" stopColor="#060809" />
          </linearGradient>
          <linearGradient id={`${id}-blade`} x1="0" y1="0" x2="1" y2="0.4">
            <stop stopColor="#c6d1d8" /><stop offset="0.2" stopColor="#5f717e" /><stop offset="0.55" stopColor="#222e38" /><stop offset="1" stopColor="#9daeb9" />
          </linearGradient>
        </defs>
        <rect x="76" y="12" width="166" height="12" rx="1" fill={`url(#${id}-steel)`} />
        {[83, 235].map((x) => <circle key={x} cx={x} cy="18" r="2" fill="#080b0e" stroke="#647681" strokeWidth="0.7" />)}
        <SteelChain id={`${id}-clipper-chain`} x={105} y={22} length={91} />
        <SteelChain id={`${id}-shears-chain`} x={212} y={22} length={56} />

        {/* The clipper hangs from its handle loop, with the cutting blade pointing down. */}
        <g transform="rotate(8 105 119)">
          <ellipse cx="105" cy="118" rx="7" ry="10" fill="none" stroke={`url(#${id}-steel)`} strokeWidth="4" />
          <path d="M88 130Q105 121 122 130L134 210L146 285Q147 298 137 302H73Q63 297 64 285L76 208Z" fill="#070a0c" stroke="#55636c" strokeWidth="1.5" />
          <path d="M89 133Q105 125 121 133L127 190Q105 201 82 190Z" fill={`url(#${id}-steel)`} />
          <path d="M82 190Q105 197 128 190L139 272Q141 285 131 291H79Q69 284 71 273Z" fill={`url(#${id}-grip)`} stroke="#0d1216" strokeWidth="2" />
          {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${79 - i * 0.3} ${205 + i * 6}Q105 ${211 + i * 6} ${132 + i * 0.3} ${205 + i * 6}`} fill="none" stroke={i % 3 === 0 ? "#424e57" : "#28333c"} strokeWidth="1.2" />)}
          <path d="M88 144L79 184M121 199L133 270" stroke="#d4e2ea" strokeOpacity="0.38" strokeWidth="1" fill="none" />
          <rect x="97" y="145" width="16" height="29" rx="4" fill="#10171c" stroke="#52616c" />
          <rect x="100" y="153" width="10" height="13" rx="2" fill={`url(#${id}-steel)`} />
          <path d="M68 254L57 258V274L65 271" fill={`url(#${id}-steel)`} stroke="#19252e" strokeWidth="2" />
          <rect x="63" y="294" width="85" height="17" rx="2" fill={`url(#${id}-steel)`} stroke="#18222a" />
          <path d="M65 311H146V323H65Z" fill={`url(#${id}-blade)`} />
          {Array.from({ length: 17 }, (_, i) => <path key={i} d={`M${67 + i * 4.7} 311V323`} stroke="#071017" strokeWidth="1.8" />)}
          {[79, 132].map((x) => <circle key={x} cx={x} cy="302" r="2.6" fill="#202d37" stroke="#acbbc4" strokeWidth="0.7" />)}
        </g>

        {/* Two separate blades, tangs, finger rings, pivot and finger rest. */}
        <g transform="rotate(-10 212 93)">
          <ellipse cx="212" cy="93" rx="13" ry="18" fill="none" stroke="#0a1015" strokeWidth="8" />
          <ellipse cx="212" cy="93" rx="13" ry="18" fill="none" stroke={`url(#${id}-steel)`} strokeWidth="5" />
          <path d="M212 111L224 162L257 294Q259 271 253 242L236 165L218 108Z" fill={`url(#${id}-blade)`} stroke="#697e8c" strokeWidth="0.7" />
          <ellipse cx="250" cy="110" rx="13" ry="18" transform="rotate(24 250 110)" fill="none" stroke="#080d11" strokeWidth="8" />
          <ellipse cx="250" cy="110" rx="13" ry="18" transform="rotate(24 250 110)" fill="none" stroke={`url(#${id}-steel)`} strokeWidth="5" />
          <path d="M244 125L224 162L196 297Q193 267 201 239L217 159L238 121Z" fill={`url(#${id}-blade)`} stroke="#8a9daa" strokeWidth="0.7" />
          <path d="M227 172L256 289M219 176L198 290" fill="none" stroke="#d3dfe7" strokeWidth="0.8" strokeOpacity="0.65" />
          <circle cx="224" cy="164" r="7" fill={`url(#${id}-steel)`} stroke="#0b131a" strokeWidth="1.5" />
          <path d="M220 164H228" stroke="#0e1820" strokeWidth="1.8" />
          <path d="M260 99Q275 98 271 84" fill="none" stroke={`url(#${id}-steel)`} strokeWidth="4" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
