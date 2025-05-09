import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { puzzlePieces as initialPuzzlePieces } from '../../data/puzzlePieces';
import FloatingElements from '../ui/FloatingElements';

const PuzzleLevel: React.FC = () => {
  const { setCurrentLevel, updateProgress } = useGame();
  const [puzzlePieces, setPuzzlePieces] = useState([...initialPuzzlePieces]);
  const [allRevealed, setAllRevealed] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  
  const handlePieceClick = (id: number) => {
    const updatedPieces = puzzlePieces.map(piece => 
      piece.id === id ? { ...piece, isFlipped: true } : piece
    );
    setPuzzlePieces(updatedPieces);
  };
  
  useEffect(() => {
    // Check if all pieces are flipped
    const areAllFlipped = puzzlePieces.every(piece => piece.isFlipped);
    if (areAllFlipped && !allRevealed) {
      setAllRevealed(true);
      // Show the message after a short delay
      setTimeout(() => {
        setShowMessage(true);
      }, 1000);
    }
  }, [puzzlePieces, allRevealed]);
  
  const proceedToNextLevel = () => {
    updateProgress();
    setCurrentLevel('confession');
  };
  
  return (
    <motion.div 
      className="level-container bg-gradient-to-br from-lavender via-rose to-cream"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FloatingElements count={10} />
      
      <motion.h2
        className="text-3xl md:text-4xl font-script text-primary-600 mb-4 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Unlock My Secret Message
      </motion.h2>
      
      <motion.p
        className="text-gray-600 mb-8 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Click on each piece to reveal my special message for you
      </motion.p>
      
      <motion.div 
        className="grid grid-cols-3 gap-4 w-full max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {puzzlePieces.map((piece) => (
          <motion.div
            key={piece.id}
            className={`puzzle-piece h-24 flex items-center justify-center text-center ${
              piece.isFlipped ? 'active' : ''
            }`}
            whileHover={!piece.isFlipped ? { scale: 1.05 } : {}}
            whileTap={!piece.isFlipped ? { scale: 0.95 } : {}}
            onClick={() => !piece.isFlipped && handlePieceClick(piece.id)}
          >
            <AnimatePresence mode="wait">
              {piece.isFlipped ? (
                <motion.span
                  key="revealed"
                  className="text-lg font-medium text-primary-700"
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {piece.text}
                </motion.span>
              ) : (
                <motion.span
                  key="hidden"
                  className="text-2xl text-gray-400"
                  exit={{ opacity: 0, rotateY: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  ?
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xl md:text-2xl text-primary-600 font-script mb-6">
              Every moment with you is like a dream I never want to wake up from because you make my heart flutter like no one else ❤️
            </p>
            
            <motion.button
              className="btn-primary mt-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={proceedToNextLevel}
            >
              Continue to Final Level
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PuzzleLevel;