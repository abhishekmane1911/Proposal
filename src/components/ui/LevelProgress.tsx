import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { Heart } from 'lucide-react';

const LevelProgress: React.FC = () => {
  const { progress, currentLevel } = useGame();
  
  // Don't show on landing page
  if (currentLevel === 'landing') {
    return null;
  }

  return (
    <motion.div 
      className="fixed top-4 left-0 right-0 z-10 flex justify-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md flex items-center">
        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <Heart className="w-4 h-4 text-primary-500 fill-primary-500" />
      </div>
    </motion.div>
  );
};

export default LevelProgress;