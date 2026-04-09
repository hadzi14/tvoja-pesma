import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  subtitle: string;
  coverArt?: string;
  autoPlay?: boolean;
}

export default function AudioPlayer({ 
  audioUrl, 
  title, 
  subtitle,
  coverArt = '/images/default-cover.jpg',
  autoPlay = false 
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    if (autoPlay) {
      // Try autoplay but handle browser autoplay policy
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Autoplay prevented by browser policy:', err);
        setIsPlaying(false);
      });
    }

    return () => {
      audio.removeEventListener('loadedmetadata', () => {});
      audio.removeEventListener('timeupdate', () => {});
      audio.removeEventListener('ended', () => {});
    };
  }, [audioUrl, autoPlay]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progress = progressRef.current;
    if (!audio || !progress) return;

    const rect = progress.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = x / width;

    audio.currentTime = percentage * duration;
    setCurrentTime(percentage * duration);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
    setCurrentTime(audio.currentTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`
      bg-gradient-to-br from-rose-50 via-white to-amber-50 rounded-2xl shadow-xl overflow-hidden
      ${isFullscreen ? 'fixed inset-4 z-50' : 'w-full max-w-lg'}
      transition-all duration-300
    `}>
      <audio ref={audioRef} src={audioUrl} />
      
      {/* Cover Art & Info */}
      <div className="relative p-6 bg-gradient-to-br from-rose-100 to-amber-100">
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5 text-gray-600" /> : <Maximize2 className="w-5 h-5 text-gray-600" />}
        </button>

        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-xl overflow-hidden shadow-lg bg-white flex-shrink-0">
            <img
              src={coverArt}
              alt="Cover Art"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-800 truncate">{title}</h3>
            <p className="text-sm text-gray-600 truncate">{subtitle}</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-amber-600 font-medium">
              <span className="px-2 py-1 bg-amber-100 rounded-full">PESMA ZA TEBE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 pt-4">
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="h-2 bg-gray-200 rounded-full cursor-pointer overflow-hidden relative"
        >
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="p-6">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => skip(-10)}
            className="p-3 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
            title="Nazad 10s"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={togglePlay}
            className="p-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>

          <button
            onClick={() => skip(10)}
            className="p-3 text-gray-600 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
            title="Napred 10s"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={toggleMute}
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-rose-500 [&::-webkit-slider-thumb]:to-amber-500 [&::-webkit-slider-thumb]:rounded-full"
          />
        </div>
      </div>
    </div>
  );
}