import React, { useRef, useEffect } from 'react';

type MapPin = {
  cx: number;
  cy: number;
  label: string;
  sublabel: string;
  photo: string;
};
import japanSvgRaw from '../assets/japan.svg?raw';

// Strip XML declaration and <svg> wrapper — keep only the <path> elements
const japanInner = japanSvgRaw
  .replace(/<\?xml[^>]*\?>/g, '')
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/<svg[^>]*>/g, '')
  .replace(/<\/svg>/g, '');

const VietJapanMap: React.FC<{ pins?: MapPin[] }> = ({ pins = [] }) => {
  const route = "M 188 422 C 620 460 1130 460 1155 299";
  const japanGroupRef = useRef<SVGGElement>(null);

  // Card positions: each pin gets a photo card connected by a leader line
  const cardCfgs = [
    { cardX: 1253, cardY: 152, lineEndX: 1253, lineEndY: 197 }, // MAKUHARI — upper right ocean
    { cardX: 1245, cardY: 358, lineEndX: 1245, lineEndY: 402 }, // TOKYO BIG SIGHT — lower right ocean
  ];
  const cardW = 115;
  const cardH = 88;
  const imgH = 62;

  useEffect(() => {
    if (japanGroupRef.current) {
      japanGroupRef.current.innerHTML = japanInner;
    }
  }, []);

  return (
    <svg
      viewBox="595 0 780 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <path id="shipRoute" d={route} />

        <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(180,83,9)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="rgb(245,158,11)" stopOpacity="0.9" />
        </linearGradient>

        <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(245,158,11)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="rgb(245,158,11)" stopOpacity="0" />
        </radialGradient>

        <filter id="landShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="2" dy="3" stdDeviation="5" floodColor="rgba(2,44,34,0.18)" />
        </filter>
      </defs>

      {/* ── GRID ── */}
      {[120, 240, 360, 480].map(y => (
        <line key={y} x1="0" y1={y} x2="1400" y2={y}
          stroke="rgba(2,44,34,0.035)" strokeWidth="1" strokeDasharray="4 18" />
      ))}
      {[280, 560, 840, 1120].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="600"
          stroke="rgba(2,44,34,0.035)" strokeWidth="1" strokeDasharray="4 18" />
      ))}

      {/* ── VIỆT NAM ── */}
      <g filter="url(#landShadow)">
        <path
          d="
            M 112 292
            L 135 285 L 155 285 L 172 292 L 185 305
            L 190 322 L 190 342 L 188 364
            L 184 388 L 178 412
            L 172 435 L 168 458
            L 164 480 L 158 500
            L 145 518 L 128 535
            L 108 550 L 90 562
            L 78 568 L 68 560
            L 70 542 L 78 522
            L 88 504 L 98 485
            L 105 462 L 108 438
            L 108 412 L 108 385
            L 108 358 L 108 330
            L 108 305 L 112 292
            Z
          "
          fill="rgba(2,44,34,0.10)"
          stroke="rgba(2,44,34,0.28)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
      <text x="130" y="586" textAnchor="middle"
        fontFamily="Georgia, serif" fontSize="11" fontWeight="bold"
        fill="rgba(2,44,34,0.55)" letterSpacing="3.5">VIỆT NAM
      </text>

      {/* ── NHẬT BẢN — 47 prefectures từ japan.svg ── */}
      <g
        ref={japanGroupRef}
        transform="translate(840, 50) scale(1.0)"
        filter="url(#landShadow)"
        fill="rgba(2,44,34,0.09)"
        stroke="rgba(2,44,34,0.20)"
        strokeWidth="1.19"
        strokeLinejoin="round"
      />
      <text x="1155" y="42" textAnchor="middle"
        fontFamily="Georgia, serif" fontSize="11" fontWeight="bold"
        fill="rgba(2,44,34,0.55)" letterSpacing="3.5">NHẬT BẢN
      </text>

      {/* ── ROUTE shadow glow ── */}
      <path d={route} fill="none"
        stroke="rgba(180,83,9,0.10)" strokeWidth="18" strokeLinecap="round" />

      {/* ── ROUTE draw-in ── */}
      <path d={route} fill="none"
        stroke="url(#routeGrad)" strokeWidth="2.2"
        strokeDasharray="1200" strokeDashoffset="1200"
        strokeLinecap="round" opacity="0.82"
      >
        <animate attributeName="stroke-dashoffset"
          from="1200" to="0" dur="2.8s" fill="freeze" />
      </path>

      {/* ── Moving dashes ── */}
      <path d={route} fill="none"
        stroke="rgba(245,158,11,0.5)" strokeWidth="3"
        strokeDasharray="9 28" strokeLinecap="round" opacity="0"
      >
        <animate attributeName="opacity"
          from="0" to="0.5" begin="2.6s" dur="0.5s" fill="freeze" />
        <animate attributeName="stroke-dashoffset"
          from="0" to="-37" begin="2.6s" dur="1.2s" repeatCount="indefinite" />
      </path>

      {/* ── ORIGIN dot — cảng xuất phát miền nam VN ── */}
      <circle cx="188" cy="422" r="38" fill="url(#dotGlow)">
        <animate attributeName="r" values="30;54;30" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0;0.7" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="188" cy="422" r="7" fill="rgb(180,83,9)" />
      <circle cx="188" cy="422" r="7" fill="none"
        stroke="rgba(245,158,11,0.65)" strokeWidth="1.5">
        <animate attributeName="r" values="7;22;7" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.65;0;0.65" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="188" cy="422" r="3.5" fill="rgb(245,158,11)" />

      {/* ── DESTINATION dot — Cảng Yokohama (Kanagawa) ── */}
      <circle cx="1155" cy="299" r="38" fill="url(#dotGlow)">
        <animate attributeName="r" values="30;54;30" dur="3s" begin="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0;0.7" dur="3s" begin="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="1155" cy="299" r="7" fill="rgb(180,83,9)" />
      <circle cx="1155" cy="299" r="7" fill="none"
        stroke="rgba(245,158,11,0.65)" strokeWidth="1.5">
        <animate attributeName="r" values="7;22;7" dur="3s" begin="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.65;0;0.65" dur="3s" begin="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="1155" cy="299" r="3.5" fill="rgb(245,158,11)" />

      {/* ── SHIP ── */}
      <g opacity="0">
        <animate attributeName="opacity"
          from="0" to="1" begin="2.9s" dur="0.8s" fill="freeze" />
        <animateMotion dur="14s" begin="2.9s" repeatCount="indefinite" rotate="auto">
          <mpath href="#shipRoute" />
        </animateMotion>
        {/* inner group: thu nhỏ khi gần tới Nhật */}
        <g>
          <animateTransform attributeName="transform" type="scale"
            values="1;1;1;0.75;0.5;0.5"
            keyTimes="0;0.60;0.72;0.85;0.95;1"
            dur="14s" begin="2.9s" repeatCount="indefinite" />
          <ellipse cx="-15" cy="5" rx="7" ry="2.2" fill="rgba(255,255,255,0.42)" />
          <path d="M -14 2 L 15 0 L 13 7 L -12 7 Z" fill="rgb(180,83,9)" />
          <rect x="-10" y="-6" width="15" height="8" rx="1.5" fill="rgb(115,50,13)" />
          <rect x="-9" y="-1" width="12" height="1.5" fill="rgba(180,83,9,0.4)" />
          <rect x="-2.5" y="-14" width="4.5" height="8" rx="1.2" fill="rgb(2,44,34)" />
          <circle cx="-1" cy="-18" r="3.5" fill="rgba(50,35,10,0.28)">
            <animate attributeName="r"       values="3.5;9;3.5"   dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.28;0;0.28" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="cy"      values="-18;-28;-18" dur="2.2s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>

      {/* ── Khoảng cách ── */}
      <text x="660" y="428" textAnchor="middle"
        fontFamily="Georgia, serif" fontSize="11" fontStyle="italic"
        fill="rgba(180,83,9,0.48)" letterSpacing="3">~ 3.800 km
      </text>

      {/* ── SÓNG NƯỚC — xung quanh phía nam và đông Nhật Bản ── */}
      {[
        { cx: 1080, cy: 430, rx: 38, ry: 14, delay: 0 },
        { cx: 1080, cy: 430, rx: 38, ry: 14, delay: 1.2 },
        { cx: 1080, cy: 430, rx: 38, ry: 14, delay: 2.4 },
        { cx: 1190, cy: 360, rx: 28, ry: 18, delay: 0.6 },
        { cx: 1190, cy: 360, rx: 28, ry: 18, delay: 1.8 },
        { cx: 1240, cy: 240, rx: 22, ry: 14, delay: 0.3 },
        { cx: 1240, cy: 240, rx: 22, ry: 14, delay: 1.8 },
      ].map(({ cx, cy, rx, ry, delay }, i) => (
        <ellipse key={`wave-${i}`} cx={cx} cy={cy} rx={rx} ry={ry}
          fill="none" stroke="rgba(2,44,34,0.13)" strokeWidth="1">
          <animate attributeName="rx" values={`${rx};${rx * 2.8};${rx}`}
            dur="3.6s" begin={`${delay}s`} repeatCount="indefinite" />
          <animate attributeName="ry" values={`${ry};${ry * 2.8};${ry}`}
            dur="3.6s" begin={`${delay}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0;0.7"
            dur="3.6s" begin={`${delay}s`} repeatCount="indefinite" />
        </ellipse>
      ))}

      {/* ── CHIM — bay quanh vùng đông bắc Nhật Bản ── */}
      {[
        { x: 1195, y: 155, dx: 55, dy: -18, dur: 7,   delay: 1.5 },
        { x: 1230, y: 180, dx: 40, dy: -25, dur: 9,   delay: 3.2 },
        { x: 1160, y: 132, dx: 70, dy: -10, dur: 8.5, delay: 0.8 },
        { x: 1255, y: 210, dx: 35, dy: -30, dur: 10,  delay: 5   },
        { x: 1178, y: 168, dx: 60, dy: -22, dur: 7.5, delay: 6.5 },
      ].map(({ x, y, dx, dy, dur, delay }, i) => (
        <g key={`bird-${i}`} fill="none" stroke="rgba(2,44,34,0.42)"
          strokeWidth="1.3" strokeLinecap="round">
          {/* cánh trái và cánh phải */}
          <path d={`M 0,0 Q -5,-3 -9,0`} />
          <path d={`M 0,0 Q 5,-3 9,0`} />
          <animateMotion
            path={`M ${x},${y} C ${x + dx * 0.3},${y + dy * 0.4} ${x + dx * 0.7},${y + dy * 0.8} ${x + dx},${y + dy}`}
            dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.9;0.9;0"
            keyTimes="0;0.08;0.88;1"
            dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
        </g>
      ))}

      {/* ── COMPASS ── */}
      <g transform="translate(1348, 548)">
        <circle r="26" fill="rgba(249,245,237,0.82)" stroke="rgba(180,83,9,0.18)" strokeWidth="1" />
        <path d="M 0 -18 L 4.5 -4 L 0 0 L -4.5 -4 Z" fill="rgb(2,44,34)" opacity="0.62" />
        <path d="M 0 18 L 4.5 4 L 0 0 L -4.5 4 Z"   fill="rgba(2,44,34,0.2)" />
        <path d="M 18 0 L 4 -4.5 L 0 0 L 4 4.5 Z"   fill="rgba(2,44,34,0.2)" />
        <path d="M -18 0 L -4 -4.5 L 0 0 L -4 4.5 Z" fill="rgba(2,44,34,0.2)" />
        <text x="0" y="-22" textAnchor="middle"
          fontFamily="Georgia, serif" fontSize="8" fontWeight="bold"
          fill="rgba(2,44,34,0.62)">N
        </text>
      </g>

      {/* ── EXPORT label ── */}
      <g transform="translate(1155, 299)">
        <line x1="-2" y1="-12" x2="-2" y2="-44"
          stroke="rgba(180,83,9,0.32)" strokeWidth="0.8" />
        <text x="-8" y="-49" textAnchor="end"
          fontFamily="Arial, sans-serif" fontSize="7.5" fontWeight="bold"
          fill="rgba(180,83,9,0.72)" letterSpacing="3.5">EXPORT TO JAPAN
        </text>
        <text x="-8" y="-61" textAnchor="end"
          fontFamily="Georgia, serif" fontSize="8.5" fontStyle="italic"
          fill="rgba(2,44,34,0.52)" letterSpacing="1">Cảng Yokohama
        </text>
      </g>

      {/* ── CLIP PATHS for photo cards ── */}
      {pins.length > 0 && (
        <defs>
          {pins.map((_, i) => {
            const cfg = cardCfgs[i];
            if (!cfg) return null;
            return (
              <clipPath key={`clip-${i}`} id={`pin-card-${i}`}>
                <rect x={cfg.cardX} y={cfg.cardY} width={cardW} height={imgH} rx="5" />
              </clipPath>
            );
          })}
        </defs>
      )}

      {/* ── EVENT PINS with always-visible leader cards ── */}
      {pins.map((pin, i) => {
        const cfg = cardCfgs[i];
        return (
          <g key={i}>
            {/* Animated glow ring */}
            <circle cx={pin.cx} cy={pin.cy} r="28" fill="url(#dotGlow)">
              <animate attributeName="r" values="18;38;18" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.65;0;0.65" dur="2.4s" repeatCount="indefinite" />
            </circle>
            {/* Pin dot */}
            <circle cx={pin.cx} cy={pin.cy} r="6" fill="rgb(180,83,9)" />
            <circle cx={pin.cx} cy={pin.cy} r="3" fill="white" />

            {cfg && (
              <>
                {/* Dashed leader line from pin to card */}
                <line
                  x1={pin.cx} y1={pin.cy}
                  x2={cfg.lineEndX} y2={cfg.lineEndY}
                  stroke="rgba(180,83,9,0.50)" strokeWidth="0.85"
                  strokeDasharray="5 3.5"
                />
                {/* Dot at line end */}
                <circle cx={cfg.lineEndX} cy={cfg.lineEndY} r="2.5" fill="rgba(180,83,9,0.55)" />

                {/* Card shadow + white background */}
                <rect
                  x={cfg.cardX} y={cfg.cardY}
                  width={cardW} height={cardH} rx="6"
                  fill="rgba(249,245,237,0.97)"
                  stroke="rgba(180,83,9,0.16)" strokeWidth="0.8"
                  filter="url(#landShadow)"
                />
                {/* Photo clipped to top of card */}
                <image
                  href={pin.photo}
                  x={cfg.cardX} y={cfg.cardY}
                  width={cardW} height={imgH}
                  preserveAspectRatio="xMidYMid slice"
                  clipPath={`url(#pin-card-${i})`}
                />
                {/* Divider line */}
                <line
                  x1={cfg.cardX} y1={cfg.cardY + imgH}
                  x2={cfg.cardX + cardW} y2={cfg.cardY + imgH}
                  stroke="rgba(180,83,9,0.12)" strokeWidth="0.6"
                />
                {/* Event label */}
                <text
                  x={cfg.cardX + cardW / 2}
                  y={cfg.cardY + imgH + 17}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif" fontSize="6.5" fontWeight="bold"
                  fill="rgba(2,44,34,0.75)" letterSpacing="0.7">
                  {pin.label}
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default VietJapanMap;
