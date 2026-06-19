
import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';

const AgeGate: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { siteContent } = useData();
  const { ageGate } = siteContent;

  useEffect(() => {
    // Check session storage
    const isVerified = sessionStorage.getItem('ageVerified');
    if (!isVerified) {
      setIsVisible(true);
      // Disable scroll
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleConfirm = () => {
    sessionStorage.setItem('ageVerified', 'true');
    setIsVisible(false);
    document.body.style.overflow = 'auto';
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-emerald-950">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-emerald-950/60"></div>
         {/* Texture */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      </div>

      <div className="relative z-10 p-8 max-w-lg w-full text-center mx-4">
         {/* Border Frame */}
         <div className="absolute inset-0 border border-amber-500/20 rounded-2xl pointer-events-none">
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-amber-500"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-amber-500"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-amber-500"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-amber-500"></div>
         </div>

         <div className="py-8">
           <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">{ageGate.heading}</h2>
           <p className="text-emerald-100/70 text-lg font-light mb-8">
             {ageGate.subHeading}
           </p>

           <div className="flex flex-col gap-4">
              <button 
                onClick={handleConfirm}
                className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold uppercase tracking-widest text-sm rounded transition-all shadow-lg hover:shadow-amber-500/20"
              >
                {ageGate.confirmBtn}
              </button>
              <button 
                onClick={handleReject}
                className="w-full py-4 bg-transparent border border-emerald-800 text-emerald-400 hover:text-white hover:border-white font-bold uppercase tracking-widest text-sm rounded transition-all"
              >
                {ageGate.rejectBtn}
              </button>
           </div>
           
           <p className="mt-8 text-[10px] text-emerald-100/30 uppercase tracking-widest">
             {ageGate.warning}
           </p>
         </div>
      </div>
    </div>
  );
};

export default AgeGate;
