import React from 'react';

const VietJapanMap: React.FC = () => {
  const route = "M 225 335 C 490 55 930 55 1188 228";

  return (
    <svg
      viewBox="0 0 1400 500"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <path id="shipRoute" d={route} />

        <filter id="blur20" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
        <filter id="blur12" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="12" />
        </filter>

        <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(180,83,9)"   stopOpacity="0.9" />
          <stop offset="100%" stopColor="rgb(245,158,11)" stopOpacity="0.9" />
        </linearGradient>

        <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(245,158,11)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="rgb(245,158,11)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── GRID ────────────────────────────────────── */}
      {[100, 200, 300, 400].map(y => (
        <line key={y} x1="0" y1={y} x2="1400" y2={y}
          stroke="rgba(2,44,34,0.05)" strokeWidth="1" strokeDasharray="4 14" />
      ))}
      {[140, 280, 420, 560, 700, 840, 980, 1120, 1260].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="500"
          stroke="rgba(2,44,34,0.05)" strokeWidth="1" strokeDasharray="4 14" />
      ))}

      {/* ── LAND MASS HINTS (soft blurred fills — no hard outlines) ─── */}
      {/* Southeast Asia coast */}
      <ellipse cx="80" cy="260" rx="100" ry="200"
        fill="rgba(2,44,34,0.06)" filter="url(#blur20)" />
      {/* Vietnam peninsula */}
      <ellipse cx="218" cy="360" rx="36" ry="112"
        fill="rgba(2,44,34,0.10)" filter="url(#blur20)"
        transform="rotate(-8,218,360)" />
      {/* Vietnam inner shade */}
      <ellipse cx="218" cy="360" rx="20" ry="80"
        fill="rgba(2,44,34,0.06)" filter="url(#blur12)"
        transform="rotate(-8,218,360)" />

      {/* Japan — Honshu */}
      <ellipse cx="1192" cy="232" rx="100" ry="32"
        fill="rgba(2,44,34,0.10)" filter="url(#blur20)"
        transform="rotate(-22,1192,232)" />
      {/* Japan — Hokkaido */}
      <ellipse cx="1234" cy="166" rx="55" ry="26"
        fill="rgba(2,44,34,0.09)" filter="url(#blur12)"
        transform="rotate(-12,1234,166)" />
      {/* Japan — Kyushu */}
      <ellipse cx="1130" cy="274" rx="32" ry="24"
        fill="rgba(2,44,34,0.08)" filter="url(#blur12)" />
      {/* Japan coast cluster */}
      <ellipse cx="1165" cy="248" rx="70" ry="55"
        fill="rgba(2,44,34,0.04)" filter="url(#blur20)" />

      {/* ── ROUTE — shadow glow ─────────────────────── */}
      <path d={route} fill="none"
        stroke="rgba(180,83,9,0.12)" strokeWidth="18" strokeLinecap="round" />

      {/* ── ROUTE — draw-in ─────────────────────────── */}
      <path
        d={route}
        fill="none"
        stroke="url(#routeGrad)"
        strokeWidth="2.2"
        strokeDasharray="700"
        strokeDashoffset="700"
        strokeLinecap="round"
        opacity="0.82"
      >
        <animate attributeName="stroke-dashoffset"
          from="700" to="0" dur="2.8s" fill="freeze" />
      </path>

      {/* ── ROUTE — moving dashes ───────────────────── */}
      <path
        d={route}
        fill="none"
        stroke="rgba(245,158,11,0.5)"
        strokeWidth="3"
        strokeDasharray="9 28"
        strokeLinecap="round"
        opacity="0"
      >
        <animate attributeName="opacity"
          from="0" to="0.5" begin="2.6s" dur="0.5s" fill="freeze" />
        <animate attributeName="stroke-dashoffset"
          from="0" to="-37" begin="2.6s" dur="1.2s" repeatCount="indefinite" />
      </path>

      {/* ── ORIGIN DOT — Bắc Kạn ───────────────────── */}
      <circle cx="225" cy="335" r="38" fill="url(#dotGlow)">
        <animate attributeName="r"       values="30;56;30" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0;0.7" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="225" cy="335" r="7" fill="rgb(180,83,9)" />
      <circle cx="225" cy="335" r="7" fill="none"
        stroke="rgba(245,158,11,0.65)" strokeWidth="1.5">
        <animate attributeName="r"       values="7;22;7"   dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.65;0;0.65" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="225" cy="335" r="3.5" fill="rgb(245,158,11)" />

      {/* ── DESTINATION DOT — Tokyo ─────────────────── */}
      <circle cx="1188" cy="228" r="38" fill="url(#dotGlow)">
        <animate attributeName="r"       values="30;56;30" dur="3s" begin="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0;0.7" dur="3s" begin="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="1188" cy="228" r="7" fill="rgb(180,83,9)" />
      <circle cx="1188" cy="228" r="7" fill="none"
        stroke="rgba(245,158,11,0.65)" strokeWidth="1.5">
        <animate attributeName="r"       values="7;22;7"      dur="3s" begin="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.65;0;0.65" dur="3s" begin="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="1188" cy="228" r="3.5" fill="rgb(245,158,11)" />

      {/* ── SHIP ────────────────────────────────────── */}
      <g opacity="0">
        {/* Wake */}
        <ellipse cx="-15" cy="5" rx="7" ry="2.2" fill="rgba(255,255,255,0.42)" />
        {/* Hull */}
        <path d="M -14 2 L 15 0 L 13 7 L -12 7 Z" fill="rgb(180,83,9)" />
        {/* Body */}
        <rect x="-10" y="-6" width="15" height="8" rx="1.5" fill="rgb(115,50,13)" />
        {/* Deck stripe */}
        <rect x="-9" y="-1" width="12" height="1.5" fill="rgba(180,83,9,0.4)" />
        {/* Smokestack */}
        <rect x="-2.5" y="-14" width="4.5" height="8" rx="1.2" fill="rgb(2,44,34)" />
        {/* Smoke */}
        <circle cx="-1" cy="-18" r="3.5" fill="rgba(50,35,10,0.28)">
          <animate attributeName="r"       values="3.5;9;3.5"   dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.28;0;0.28" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="cy"      values="-18;-28;-18" dur="2.2s" repeatCount="indefinite" />
        </circle>

        <animate attributeName="opacity"
          from="0" to="1" begin="2.9s" dur="0.8s" fill="freeze" />
        <animateMotion dur="14s" begin="2.9s" repeatCount="indefinite" rotate="auto">
          <mpath href="#shipRoute" />
        </animateMotion>
      </g>

      {/* ── LABELS ──────────────────────────────────── */}
      <text x="225" y="370" textAnchor="middle"
        fontFamily="Georgia, serif" fontSize="14" fontWeight="bold"
        fill="rgba(2,44,34,0.72)" letterSpacing="3">BẮC KẠN
      </text>
      <text x="225" y="387" textAnchor="middle"
        fontFamily="Arial, sans-serif" fontSize="9.5"
        fill="rgba(2,44,34,0.38)" letterSpacing="4.5">VIỆT NAM
      </text>

      <text x="1188" y="264" textAnchor="middle"
        fontFamily="Georgia, serif" fontSize="14" fontWeight="bold"
        fill="rgba(2,44,34,0.72)" letterSpacing="3">TOKYO
      </text>
      <text x="1188" y="281" textAnchor="middle"
        fontFamily="Arial, sans-serif" fontSize="9.5"
        fill="rgba(2,44,34,0.38)" letterSpacing="4.5">NHẬT BẢN
      </text>

      {/* Distance */}
      <text x="706" y="42" textAnchor="middle"
        fontFamily="Georgia, serif" fontSize="12" fontStyle="italic"
        fill="rgba(180,83,9,0.55)" letterSpacing="3">~ 3.800 km
      </text>

      {/* ── COMPASS ─────────────────────────────────── */}
      <g transform="translate(1348, 448)">
        <circle r="28" fill="rgba(249,245,237,0.80)" stroke="rgba(180,83,9,0.18)" strokeWidth="1" />
        <path d="M 0 -20 L 4.5 -5 L 0 0 L -4.5 -5 Z" fill="rgb(2,44,34)" opacity="0.62" />
        <path d="M 0 20 L 4.5 5 L 0 0 L -4.5 5 Z"   fill="rgba(2,44,34,0.2)" />
        <path d="M 20 0 L 5 -4.5 L 0 0 L 5 4.5 Z"   fill="rgba(2,44,34,0.2)" />
        <path d="M -20 0 L -5 -4.5 L 0 0 L -5 4.5 Z" fill="rgba(2,44,34,0.2)" />
        <text x="0" y="-24" textAnchor="middle"
          fontFamily="Georgia, serif" fontSize="9" fontWeight="bold"
          fill="rgba(2,44,34,0.62)">N
        </text>
      </g>

      {/* ── EXPORT BADGE ─────────────────────────────── */}
      <g transform="translate(1188, 228)">
        <rect x="-58" y="20" width="116" height="22" rx="4.5" fill="rgba(2,44,34,0.88)" />
        <text x="0" y="34.5" textAnchor="middle"
          fontFamily="Arial, sans-serif" fontSize="8.5" fontWeight="bold"
          fill="rgb(245,158,11)" letterSpacing="3">EXPORT TO JAPAN
        </text>
      </g>
    </svg>
  );
};

export default VietJapanMap;
