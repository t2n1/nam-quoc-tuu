
import React, { useState, useEffect } from 'react';

const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Tổng thời gian animation khoảng 3.5s
    const duration = 3500;
    const intervalTime = 30; // Update mỗi 30ms
    const steps = duration / intervalTime;
    let currentStep = 0;

    // Timer để tăng số %
    const progressInterval = setInterval(() => {
      currentStep++;
      const percent = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(percent);
      
      if (currentStep >= steps) {
        clearInterval(progressInterval);
      }
    }, intervalTime);

    // Timer để tắt preloader
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(() => setLoading(false), 800);
    }, duration); 
    
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className={`fixed inset-0 z-[1000] bg-[#022c22] flex flex-col items-center justify-center transition-opacity duration-800 ease-in-out ${fade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Background: Solid Deep Green, very subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#064e3b_0%,_#022c22_70%)] opacity-50"></div>

      <style>{`
        @keyframes dropSimple {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 1; }
          80% { transform: translateY(220px); opacity: 1; }
          90% { transform: translateY(230px); opacity: 0; }
          100% { transform: translateY(230px); opacity: 0; }
        }
        @keyframes fillSimple {
          0% { transform: scaleY(0); }
          100% { transform: scaleY(1); }
        }
        .anim-drop { animation: dropSimple 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite; }
        .anim-fill { animation: fillSimple 3s ease-out forwards; animation-delay: 0.5s; }
      `}</style>

      <div className="relative z-10 flex flex-col items-center scale-110">
         
         {/* SVG Container - Tăng chiều cao lên 320px để chứa chai dài */}
         <div className="relative w-[160px] h-[320px]">
             <svg width="100%" height="100%" viewBox="0 0 160 320" fill="none">
                
                {/* 1. DISTILLATION PIPE (Ống dẫn tinh tế) */}
                <path 
                    d="M 130 0 V 35 Q 130 50 110 50 H 80" 
                    stroke="#f59e0b" 
                    strokeWidth="1.5" 
                    fill="none"
                    strokeLinecap="square"
                />

                {/* 2. BOTTLE OUTLINE (Tall & Slim) */}
                <defs>
                    <clipPath id="bottleMask">
                        <path d="M 69 60 H 91 V 110 Q 91 120 108 125 V 290 Q 108 300 98 300 H 62 Q 52 300 52 290 V 125 Q 69 120 69 110 V 60 Z" />
                    </clipPath>
                </defs>

                {/* Draw Outline - Màu trắng mờ, nét mảnh 1.2px */}
                <path 
                    d="M 69 60 H 91 V 110 Q 91 120 108 125 V 290 Q 108 300 98 300 H 62 Q 52 300 52 290 V 125 Q 69 120 69 110 V 60 Z" 
                    stroke="rgba(255,255,255,0.2)" 
                    strokeWidth="1.2"
                />

                {/* 3. LIQUID (Chất lỏng dâng lên) */}
                <g clipPath="url(#bottleMask)">
                    {/* Khối chất lỏng vàng */}
                    <rect 
                        x="0" y="140" width="160" height="180" 
                        className="anim-fill origin-bottom"
                        fill="#f59e0b" 
                        opacity="0.9"
                    />
                    {/* Đường mặt thoáng */}
                     <line 
                        x1="40" y1="140" x2="120" y2="140"
                        stroke="#fbbf24"
                        strokeWidth="1.5"
                        className="anim-fill origin-bottom"
                     />
                </g>

                {/* 4. PERCENTAGE TEXT (INSIDE BOTTLE) */}
                <text 
                    x="80" 
                    y="215" 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    fill="rgba(255,255,255,0.6)" 
                    style={{ fontSize: '12px', fontFamily: '"Manrope", sans-serif', letterSpacing: '0.2em', fontWeight: 'bold' }}
                >
                    {progress}%
                </text>

                {/* 5. THE DROP (Giọt rượu) */}
                <circle 
                    cx="80" cy="54" r="2.5" 
                    fill="#f59e0b"
                    className="anim-drop"
                />

             </svg>
         </div>

         {/* Typography */}
         <div className="mt-2 text-center">
            <h2 className="font-display text-xl text-amber-50 tracking-[0.2em] uppercase">
               Nam Quốc Tửu
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2 opacity-60">
               <div className="h-px w-4 bg-amber-500"></div>
               <p className="font-serif italic text-[9px] text-amber-500 tracking-widest">
                  Heritage Spirit
               </p>
               <div className="h-px w-4 bg-amber-500"></div>
            </div>
         </div>

      </div>
    </div>
  );
};

export default Preloader;
