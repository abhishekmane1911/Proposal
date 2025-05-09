import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransitionScreenProps {
  isVisible: boolean;
  onAnimationComplete?: () => void;
  text?: string;
}

const TransitionScreen: React.FC<TransitionScreenProps> = ({ 
  isVisible, 
  onAnimationComplete,
  text 
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={onAnimationComplete}
        >
          {text && (
            <motion.div
              className="text-white text-4xl font-script"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {text}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransitionScreen;