import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audio';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, Sparkles, X, ChevronUp, ChevronDown } from 'lucide-react';

export const RomanticMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState(sound.playlist[sound.currentTrackIndex]);
  const [volume, setVolume] = useState<number>(0.5);

  useEffect(() => {
    setCurrentTrack(sound.playlist[sound.currentTrackIndex]);
  }, [sound.currentTrackIndex]);

  const handleTogglePlay = () => {
    sound.playTap();
    sound.toggleMusic((playing) => {
      setIsPlaying(playing);
      setCurrentTrack(sound.playlist[sound.currentTrackIndex]);
    });
  };

  const handleNext = () => {
    sound.playTap();
    sound.nextTrack();
    setCurrentTrack(sound.playlist[sound.currentTrackIndex]);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    sound.playTap();
    sound.prevTrack();
    setCurrentTrack(sound.playlist[sound.currentTrackIndex]);
    setIsPlaying(true);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    sound.setVolume(val);
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
      
      {/* Compact Mini Widget */}
      {!isExpanded ? (
        <div
          onClick={() => { sound.playTap(); setIsExpanded(true); }}
          className="group flex items-center gap-2.5 rounded-full border border-rose-500/50 bg-[#140b22]/90 px-3.5 py-2 shadow-2xl backdrop-blur-md transition-all hover:scale-105 hover:border-rose-400 cursor-pointer select-none"
        >
          <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-300 text-white shadow">
            <Music className={`h-3.5 w-3.5 ${isPlaying ? 'animate-bounce' : ''}`} />
          </div>

          <div className="text-left hidden sm:block">
            <div className="text-[11px] font-bold text-white truncate max-w-[130px]">
              {currentTrack.title}
            </div>
            <div className="text-[9px] text-rose-300/80">
              {currentTrack.artist} {isPlaying && '· Memutar'}
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleTogglePlay();
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-600/40 text-white hover:bg-rose-600 transition-colors"
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 fill-white ml-0.5" />}
          </button>
        </div>
      ) : (
        
        /* Expanded Player Window */
        <div className="w-72 rounded-3xl border border-rose-500/60 bg-[#160c28]/95 p-4 text-rose-50 shadow-2xl backdrop-blur-xl animate-fade-in space-y-3">
          
          <div className="flex items-center justify-between border-b border-rose-950 pb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <Sparkles className="h-3.5 w-3.5 text-rose-400" />
              <span>Musik Romantis Astrolovegy</span>
            </div>
            <button
              onClick={() => { sound.playTap(); setIsExpanded(false); }}
              className="p-1 rounded-full text-rose-300 hover:text-white"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Album artwork & Track info */}
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-600 to-purple-600 flex items-center justify-center shadow-lg overflow-hidden">
              <Music className={`h-6 w-6 text-white ${isPlaying ? 'animate-pulse' : ''}`} />
              {isPlaying && (
                <div className="absolute inset-0 bg-rose-500/20 backdrop-blur-[1px]" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="font-bold text-xs text-white truncate">
                {currentTrack.title}
              </div>
              <div className="text-[11px] text-rose-300 font-medium">
                {currentTrack.artist}
              </div>
              <div className="text-[10px] text-amber-300/80 mt-0.5 truncate">
                {currentTrack.mood}
              </div>
            </div>
          </div>

          {/* Audio Wavebar animation */}
          <div className="flex items-center justify-center gap-1 h-3">
            {[4, 8, 12, 6, 10, 5, 9, 3, 7].map((h, i) => (
              <span
                key={i}
                className={`w-1 rounded-full bg-gradient-to-t from-rose-500 to-pink-300 transition-all ${
                  isPlaying ? 'animate-pulse' : 'opacity-30'
                }`}
                style={{ height: isPlaying ? `${(i % 3 + 1) * 4}px` : '3px' }}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              className="p-1.5 text-rose-300 hover:text-white transition-colors"
              title="Lagu Sebelumnya"
            >
              <SkipBack className="h-4 w-4" />
            </button>

            <button
              onClick={handleTogglePlay}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-white ml-0.5" />}
            </button>

            <button
              onClick={handleNext}
              className="p-1.5 text-rose-300 hover:text-white transition-colors"
              title="Lagu Berikutnya"
            >
              <SkipForward className="h-4 w-4" />
            </button>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-2 pt-1">
            <Volume2 className="h-3.5 w-3.5 text-rose-300/80" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-rose-950 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>

        </div>
      )}

    </div>
  );
};
