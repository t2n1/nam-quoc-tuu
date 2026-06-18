
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Wind, Droplets, Flame, Loader2, AlertCircle } from 'lucide-react';

const Soundscape: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [activeTrack, setActiveTrack] = useState<'forest' | 'stream' | 'fire'>('forest');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Updated to SoundJay MP3s which are generally more reliable for direct linking in demos
  // Removed crossOrigin to avoid CORS issues if headers aren't sent
  const tracks = {
    forest: "https://www.soundjay.com/nature/sounds/forest-01.mp3",
    stream: "https://www.soundjay.com/nature/sounds/stream-3.mp3",
    fire: "https://www.soundjay.com/nature/sounds/campfire-1.mp3"
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const managePlayback = async () => {
      // Clear any existing fade intervals
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }

      try {
        if (isPlaying) {
          // Reset error state on new play attempt
          setHasError(false);
          
          // Ensure audio is ready to play
          if (audio.readyState === 0) {
             audio.load();
          }

          // Set volume to 0 initially for fade-in
          audio.volume = 0;
          
          const playPromise = audio.play();
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                // Play started successfully, fade in volume
                let vol = 0;
                fadeIntervalRef.current = setInterval(() => {
                  if (vol < 0.3) {
                    vol += 0.02;
                    // Check if audio still exists/playing before setting volume
                    if (audioRef.current && !audioRef.current.paused) {
                        audioRef.current.volume = Math.min(vol, 0.3);
                    }
                  } else {
                    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
                  }
                }, 100);
              })
              .catch(error => {
                console.warn("Autoplay prevented or interrupted:", error);
                setIsPlaying(false);
              });
          }
        } else {
          audio.pause();
        }
      } catch (err) {
        console.error("Playback control error:", err);
        setIsPlaying(false);
      }
    };

    managePlayback();

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [isPlaying, activeTrack]);

  const changeTrack = (track: 'forest' | 'stream' | 'fire') => {
    if (activeTrack === track) return;
    setIsLoading(true);
    setHasError(false);
    setActiveTrack(track);
    // If playing, the useEffect will trigger replay with new source
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = (e: any) => {
    const audio = e.currentTarget;
    console.error("Audio source error for track:", activeTrack, audio.error);
    setIsLoading(false);
    setHasError(true);
    setIsPlaying(false); // Stop playing to prevent loop
  };

  return (
    <div className="fixed bottom-8 left-8 z-[110] flex items-center gap-3 font-sans">
      {/* Track Selector Panel */}
      <div className={`flex items-center gap-1 bg-emerald-950/80 backdrop-blur-xl border border-white/10 p-1.5 rounded-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isPlaying ? 'max-w-[200px] opacity-100 px-4 translate-x-0' : 'max-w-0 opacity-0 -translate-x-10 overflow-hidden px-0'}`}>
        <button 
          onClick={() => changeTrack('forest')}
          className={`p-2 rounded-full transition-all ${activeTrack === 'forest' ? 'text-amber-500 bg-white/10' : 'text-white/40 hover:text-white'}`}
          title="Rừng già"
        >
          <Wind size={14} />
        </button>
        <button 
          onClick={() => changeTrack('stream')}
          className={`p-2 rounded-full transition-all ${activeTrack === 'stream' ? 'text-amber-500 bg-white/10' : 'text-white/40 hover:text-white'}`}
          title="Suối Nặm Cắt"
        >
          <Droplets size={14} />
        </button>
        <button 
          onClick={() => changeTrack('fire')}
          className={`p-2 rounded-full transition-all ${activeTrack === 'fire' ? 'text-amber-500 bg-white/10' : 'text-white/40 hover:text-white'}`}
          title="Lửa hồng"
        >
          <Flame size={14} />
        </button>
      </div>

      {/* Main Toggle Button */}
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        disabled={hasError && !isPlaying} // Disable if error until user changes track or we retry logic
        className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-500 shadow-2xl relative group ${isPlaying ? 'bg-amber-600 border-amber-500 text-white' : 'bg-emerald-950 border-white/10 text-amber-500/50 hover:text-amber-500'} ${hasError ? 'border-red-500 text-red-500' : ''}`}
      >
        {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
        ) : hasError ? (
            <AlertCircle size={20} />
        ) : (
            isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />
        )}
        
        {/* Ripple effect when playing */}
        {isPlaying && (
            <span className="absolute inset-0 rounded-full border border-amber-500/50 animate-ping opacity-75"></span>
        )}
      </button>

      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        src={tracks[activeTrack]} 
        onCanPlay={handleCanPlay}
        onError={handleError}
        loop 
        preload="none" // Only load when needed to save bandwidth/prevent errors on load
      />
      
      {/* Label Overlay */}
      {isPlaying && !isLoading && !hasError && (
        <div className="absolute -top-12 left-0 pointer-events-none animate-fade-in-up">
           <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-amber-500 whitespace-nowrap bg-emerald-950/90 backdrop-blur px-4 py-2 rounded-full border border-white/5 shadow-xl">
             Âm hưởng {activeTrack === 'forest' ? 'Đại Ngàn' : activeTrack === 'stream' ? 'Nặm Cắt' : 'Lửa Hồng'}
           </span>
        </div>
      )}

      {/* Error Toast */}
      {hasError && (
         <div className="absolute -top-12 left-0 pointer-events-none animate-fade-in-up w-48">
           <span className="text-[9px] font-bold uppercase tracking-wider text-red-400 bg-emerald-950/90 backdrop-blur px-3 py-2 rounded-lg border border-red-500/30 shadow-xl block text-center">
             Không thể tải âm thanh. Vui lòng thử lại sau.
           </span>
        </div>
      )}
    </div>
  );
};

export default Soundscape;
