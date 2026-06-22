
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Music2, SkipForward } from 'lucide-react';

const TRACKS = [
  { src: '/Seven_Peaks_at_Daybreak.mp3', label: 'Bảy Đỉnh Bình Minh' },
  { src: '/Highland_Water_and_Wood.mp3',  label: 'Cao Nguyên Mộc Thuỷ' },
];

const FADE_DURATION = 1500; // ms

const Soundscape: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadingRef = useRef(false);

  const fadeTo = useCallback((targetVol: number, duration: number, onDone?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    fadingRef.current = true;
    const steps = 30;
    const interval = duration / steps;
    const startVol = audio.volume;
    const delta = (targetVol - startVol) / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      if (audioRef.current) {
        audioRef.current.volume = Math.max(0, Math.min(1, startVol + delta * step));
      }
      if (step >= steps) {
        clearInterval(timer);
        fadingRef.current = false;
        onDone?.();
      }
    }, interval);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.src = TRACKS[trackIndex].src;
      audio.volume = 0;
      audio.play().then(() => fadeTo(0.35, FADE_DURATION)).catch(() => setIsPlaying(false));
    } else {
      fadeTo(0, FADE_DURATION / 2, () => audio.pause());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, trackIndex]);

  const nextTrack = () => {
    const next = (trackIndex + 1) % TRACKS.length;
    if (isPlaying && audioRef.current) {
      fadeTo(0, 600, () => {
        setTrackIndex(next);
      });
    } else {
      setTrackIndex(next);
    }
  };

  const handleEnded = () => {
    setTrackIndex(i => (i + 1) % TRACKS.length);
  };

  return (
    <div className="fixed bottom-8 left-8 z-[110] flex items-center gap-2 font-sans">
      {/* Track label — desktop only */}
      {isPlaying && (
        <div className="hidden md:block pointer-events-none animate-fade-in-up">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-amber-500 whitespace-nowrap bg-emerald-950/90 backdrop-blur px-4 py-2 rounded-full border border-white/5 shadow-xl flex items-center gap-2">
            <Music2 size={9} className="shrink-0" />
            {TRACKS[trackIndex].label}
          </span>
        </div>
      )}

      {/* Skip button — only visible when playing */}
      {isPlaying && (
        <button
          onClick={nextTrack}
          className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-emerald-950/80 text-white/40 hover:text-amber-400 transition-all duration-300 backdrop-blur-xl"
          title="Bài tiếp theo"
        >
          <SkipForward size={14} />
        </button>
      )}

      {/* Play / Mute toggle */}
      <button
        onClick={() => setIsPlaying(p => !p)}
        className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-500 shadow-2xl relative ${
          isPlaying
            ? 'bg-amber-600 border-amber-500 text-white'
            : 'bg-emerald-950 border-white/10 text-amber-500/50 hover:text-amber-500'
        }`}
        title={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border border-amber-500/50 animate-ping opacity-75" />
        )}
      </button>

      <audio ref={audioRef} onEnded={handleEnded} preload="none" />
    </div>
  );
};

export default Soundscape;
