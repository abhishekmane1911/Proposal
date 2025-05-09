import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../contexts/GameContext';
import { quizQuestions } from '../../data/quizQuestions';
import FloatingElements from '../ui/FloatingElements';

const MiniQuiz: React.FC = () => {
  const { setCurrentLevel, updateProgress } = useGame();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    setIsCorrect(optionIndex === currentQuestion.answer);

    // Automatically advance to next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        // Quiz completed, proceed to next level
        updateProgress();
        setCurrentLevel('puzzle');
      }
    }, 1500);
  };

  const getOptionClasses = (index: number) => {
    if (!showFeedback || selectedOption !== index) {
      return 'quiz-option';
    }
    if (index === currentQuestion.answer) {
      return 'quiz-option bg-green-100 border-green-300';
    }
    if (selectedOption === index && isCorrect === false) {
      return 'quiz-option bg-red-100 border-red-300';
    }
    return 'quiz-option';
  };

  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  return (
    <motion.div 
      className="level-container bg-gradient-to-br from-rose via-cream to-lavender"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FloatingElements count={6} type="mixed" />
      
      <motion.h2
        className="text-3xl md:text-4xl font-script text-primary-600 mb-4 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        How Well Do You Know Me?
      </motion.h2>

      <motion.p
        className="text-gray-600 mb-8 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Let's see if you've been paying attention! Don't worry, there are no wrong answers... just less right ones 😉
      </motion.p>

      <div className="w-full max-w-2xl">
        <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
          <motion.div 
            className="h-full bg-primary-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQuestionIndex}
            className="quiz-card"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl md:text-2xl font-medium text-primary-700 mb-6">{currentQuestion.question}</h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  className={getOptionClasses(index)}
                  onClick={() => handleOptionSelect(index)}
                  disabled={showFeedback}
                  whileHover={!showFeedback ? { scale: 1.02 } : {}}
                  whileTap={!showFeedback ? { scale: 0.98 } : {}}
                >
                  {option}
                </motion.button>
              ))}
            </div>
            
            {showFeedback && (
              <motion.div 
                className="mt-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {isCorrect ? (
                  <p className="text-green-600 font-medium">That's right! ✨</p>
                ) : (
                  <p className="text-primary-600 font-medium">
                    Actually, it's {currentQuestion.options[currentQuestion.answer]} 💕
                  </p>
                )}
              </motion.div>
            )}
            
            <div className="text-sm text-gray-500 mt-6 text-center">
              Question {currentQuestionIndex + 1} of {quizQuestions.length}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MiniQuiz;