
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Lên đầu trang"
      className="fixed bottom-48 right-5 z-40 w-11 h-11 bg-emerald-950 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-amber-600 hover:scale-110 active:scale-95 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.9)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s ease, transform 0.3s ease, background-color 0.2s, scale 0.2s',
      }}
    >
      <ArrowUp size={18} strokeWidth={2.5} />
    </button>
  );
};

export default ScrollToTopButton;
