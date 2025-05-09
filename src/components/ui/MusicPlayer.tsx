import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useGame } from '../../contexts/GameContext';

const MusicPlayer: React.FC = () => {
  const { backgroundMusic, toggleBackgroundMusic } = useGame();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (backgroundMusic) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(e => console.log("Audio playback prevented:", e));
      } else {
        audioRef.current.pause();
      }
    }
    
  }, [backgroundMusic]);

  return (
    <motion.div 
      className="fixed bottom-4 right-4 z-10"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      <button 
        onClick={toggleBackgroundMusic} 
        className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white transition-colors"
        aria-label={backgroundMusic ? "Mute music" : "Play music"}
      >
        {backgroundMusic ? (
          <Volume2 className="w-5 h-5 text-primary-600" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-500" />
        )}
      </button>
      <audio 
        ref={audioRef} 
        src="/music.mp3" 
        loop 
      />
    </motion.div>
  );
};

export default MusicPlayer;