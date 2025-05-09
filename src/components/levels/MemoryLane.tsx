import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { memories } from '../../data/memories';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import FloatingElements from '../ui/FloatingElements';

const MemoryLane: React.FC = () => {
  const { setCurrentLevel, updateProgress } = useGame();
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNextMemory = () => {
    if (activeIndex < memories.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const goToPrevMemory = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const proceedToNextLevel = () => {
    updateProgress();
    setCurrentLevel('quiz');
  };

  const memoryVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    }),
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    })
  };

  const memory = memories[activeIndex];
  const [slideDirection, setSlideDirection] = useState(0);

  const handleNext = () => {
    if (activeIndex < memories.length - 1) {
      setSlideDirection(1);
      goToNextMemory();
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setSlideDirection(-1);
      goToPrevMemory();
    }
  };

  return (
    <motion.div 
      className="level-container bg-gradient-to-br from-primary-50 via-lavender to-rose"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FloatingElements count={8} type="hearts" />
      
      <motion.h2
        className="text-3xl md:text-4xl font-script text-primary-600 mb-8 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Memory Lane
      </motion.h2>

      <div className="relative w-full max-w-2xl">
        <motion.div 
          className="memory-card overflow-hidden"
          custom={slideDirection}
          variants={memoryVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          key={memory.id}
        >
          <div className="w-full h-60 md:h-80 overflow-hidden rounded-lg mb-4">
            <img 
              src={memory.imageUrl} 
              alt={memory.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-primary-600">{memory.title}</h3>
          <span className="text-sm text-gray-500 mb-2">{memory.date}</span>
          <p className="text-gray-700 text-center">{memory.description}</p>
        </motion.div>

        <div className="absolute inset-y-0 left-0 flex items-center">
          <button 
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className={`p-2 rounded-full bg-white/80 shadow-md ${
              activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'
            }`}
            aria-label="Previous memory"
          >
            <ChevronLeft className="w-5 h-5 text-primary-600" />
          </button>
        </div>
        
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button 
            onClick={handleNext}
            disabled={activeIndex === memories.length - 1}
            className={`p-2 rounded-full bg-white/80 shadow-md ${
              activeIndex === memories.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'
            }`}
            aria-label="Next memory"
          >
            <ChevronRight className="w-5 h-5 text-primary-600" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center mt-8">
        {memories.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${
              index === activeIndex ? 'bg-primary-500' : 'bg-gray-300'
            }`}
            onClick={() => {
              setSlideDirection(index > activeIndex ? 1 : -1);
              setActiveIndex(index);
            }}
            aria-label={`Go to memory ${index + 1}`}
          />
        ))}
      </div>

      <motion.button
        className="btn-primary mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={proceedToNextLevel}
      >
        Continue to Next Level
      </motion.button>
    </motion.div>
  );
};

export default MemoryLane;