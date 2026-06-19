import React from 'react';

const VietJapanMap: React.FC = () => {
  // Route: từ bờ đông miền nam Việt Nam → Kyushu (Nhật Bản)
  const route = "M 188 422 C 560 48 900 68 1058 388";

  return (
    <svg
      viewBox="0 0 1400 600"
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

      {/* ────────────────────────────────────────────
          VIỆT NAM — góc trái bên dưới
          Bờ biển phía đông (Biển Đông): bên phải
          Biên giới Lào/Campuchia: bên trái
      ──────────────────────────────────────────── */}
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

      {/* ────────────────────────────────────────────
          NHẬT BẢN — bên phải
          4 đảo chính: Honshu, Hokkaido, Kyushu, Shikoku
      ──────────────────────────────────────────── */}
      <g filter="url(#landShadow)">

        {/* Honshu — đảo lớn nhất, chạy chéo SW→NE */}
        <path
          d="
            M 1058 392
            L 1062 370 L 1064 348 L 1065 325
            L 1066 302 L 1068 279 L 1072 256
            L 1077 234 L 1083 213 L 1090 193
            L 1097 175 L 1105 158 L 1114 143
            L 1124 130 L 1136 120 L 1148 114
            L 1160 113 L 1170 118 L 1177 128
            L 1179 142 L 1175 156 L 1166 170
            L 1154 183 L 1141 196 L 1128 210
            L 1114 225 L 1100 241 L 1088 258
            L 1077 277 L 1068 297 L 1062 320
            L 1058 345 L 1056 368 L 1056 388
            Z
          "
          fill="rgba(2,44,34,0.11)"
          stroke="rgba(2,44,34,0.26)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Hokkaido — cực bắc */}
        <path
          d="
            M 1152 108
            L 1168 95 L 1186 86 L 1206 82
            L 1228 82 L 1248 88 L 1264 100
            L 1272 115 L 1268 130 L 1252 140
            L 1230 145 L 1208 142 L 1186 132
            L 1168 118 Z
          "
          fill="rgba(2,44,34,0.09)"
          stroke="rgba(2,44,34,0.22)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Kyushu — tây nam */}
        <path
          d="
            M 1018 408
            L 1032 392 L 1048 384 L 1062 386
            L 1070 398 L 1070 416 L 1060 430
            L 1044 436 L 1028 430 L 1018 418
            Z
          "
          fill="rgba(2,44,34,0.09)"
          stroke="rgba(2,44,34,0.22)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Shikoku — nhỏ, nằm giữa */}
        <path
          d="
            M 1070 364
            L 1084 352 L 1102 354 L 1115 364
            L 1110 377 L 1092 380 L 1076 374
            Z
          "
          fill="rgba(2,44,34,0.08)"
          stroke="rgba(2,44,34,0.18)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </g>
      <text x="1160" y="168" textAnchor="middle"
        fontFamily="Georgia, serif" fontSize="11" fontWeight="bold"
        fill="rgba(2,44,34,0.55)" letterSpacing="3.5">NHẬT BẢN
      </text>

      {/* ── ROUTE shadow glow ── */}
      <path d={route} fill="none"
        stroke="rgba(180,83,9,0.10)" strokeWidth="18" strokeLinecap="round" />

      {/* ── ROUTE draw-in ── */}
      <path d={route} fill="none"
        stroke="url(#routeGrad)" strokeWidth="2.2"
        strokeDasharray="820" strokeDashoffset="820"
        strokeLinecap="round" opacity="0.82"
      >
        <animate attributeName="stroke-dashoffset"
          from="820" to="0" dur="2.8s" fill="freeze" />
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

      {/* ── DESTINATION dot — Kyushu, Japan ── */}
      <circle cx="1058" cy="388" r="38" fill="url(#dotGlow)">
        <animate attributeName="r" values="30;54;30" dur="3s" begin="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0;0.7" dur="3s" begin="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="1058" cy="388" r="7" fill="rgb(180,83,9)" />
      <circle cx="1058" cy="388" r="7" fill="none"
        stroke="rgba(245,158,11,0.65)" strokeWidth="1.5">
        <animate attributeName="r" values="7;22;7" dur="3s" begin="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.65;0;0.65" dur="3s" begin="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="1058" cy="388" r="3.5" fill="rgb(245,158,11)" />

      {/* ── SHIP ── */}
      <g opacity="0">
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
        <animate attributeName="opacity"
          from="0" to="1" begin="2.9s" dur="0.8s" fill="freeze" />
        <animateMotion dur="14s" begin="2.9s" repeatCount="indefinite" rotate="auto">
          <mpath href="#shipRoute" />
        </animateMotion>
      </g>

      {/* ── Khoảng cách ── */}
      <text x="700" y="44" textAnchor="middle"
        fontFamily="Georgia, serif" fontSize="11" fontStyle="italic"
        fill="rgba(180,83,9,0.48)" letterSpacing="3">~ 3.800 km
      </text>

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

      {/* ── EXPORT badge ── */}
      <g transform="translate(1058, 388)">
        <rect x="-55" y="22" width="110" height="21" rx="4" fill="rgba(2,44,34,0.88)" />
        <text x="0" y="36.5" textAnchor="middle"
          fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold"
          fill="rgb(245,158,11)" letterSpacing="3">EXPORT TO JAPAN
        </text>
      </g>
    </svg>
  );
};

export default VietJapanMap;
