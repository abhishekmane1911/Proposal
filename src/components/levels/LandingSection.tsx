import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import FloatingElements from '../ui/FloatingElements';

const LandingSection: React.FC = () => {
  const { setCurrentLevel } = useGame();

  const startJourney = () => {
    setCurrentLevel('memory');
  };

  return (
    <motion.div 
      className="level-container relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingElements count={15} type="mixed" />
      
      <motion.div 
        className="card max-w-lg w-full text-center z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-script text-primary-600 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Ready for a little adventure?
        </motion.h1>
        
        <motion.p 
          className="text-lg text-gray-600 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          I've prepared something special just for you.
          Are you ready to embark on this journey with me?
        </motion.p>
        
        <motion.button
          className="btn-primary mx-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startJourney}
        >
          Start Journey
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default LandingSection;