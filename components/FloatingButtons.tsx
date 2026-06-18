
import React, { useState } from 'react';
import { Phone } from 'lucide-react';

const ZaloIcon = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
    {/* Speech bubble */}
    <path
      d="M24 4C12.95 4 4 12.4 4 22.8c0 6.1 3.1 11.5 7.9 14.9L10 44l7.3-3.1C19.4 41.6 21.6 42 24 42c11.05 0 20-8.4 20-18.8C44 12.4 35.05 4 24 4z"
      fill="white"
    />
    {/* Z letter */}
    <path
      d="M17 19h14v3L22.5 29H31v3H17v-3l8.5-7H17v-3z"
      fill="#0068FF"
    />
  </svg>
);

const FloatingButtons: React.FC = () => {
  const [showLabel, setShowLabel] = useState(false);

  return (
    <div className="fixed bottom-8 right-5 z-40 flex flex-col items-end gap-3">
      {/* Zalo */}
      <div className="flex items-center gap-3">
        {/* Hover label */}
        <div
          className="bg-cream-50 text-emerald-950 text-xs font-bold px-4 py-2 rounded-full shadow-lg whitespace-nowrap pointer-events-none"
          style={{
            opacity: showLabel ? 1 : 0,
            transform: showLabel ? 'translateX(0)' : 'translateX(8px)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          TƯ VẤN ZALO
        </div>

        <a
          href="https://zalo.me/0966383188"
          target="_blank"
          rel="noreferrer"
          aria-label="Tư vấn Zalo"
          onMouseEnter={() => setShowLabel(true)}
          onMouseLeave={() => setShowLabel(false)}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform duration-200"
          style={{ background: '#0068FF' }}
        >
          <ZaloIcon />
        </a>
      </div>

      {/* Phone */}
      <a
        href="tel:0966383188"
        aria-label="Gọi hotline"
        className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform duration-200 hover:bg-amber-600"
      >
        <Phone size={22} className="text-white" strokeWidth={2} />
      </a>
    </div>
  );
};

export default FloatingButtons;
