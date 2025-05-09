import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GameProvider, useGame } from './contexts/GameContext';
import LandingSection from './components/levels/LandingSection';
import MemoryLane from './components/levels/MemoryLane';
import MiniQuiz from './components/levels/MiniQuiz';
import PuzzleLevel from './components/levels/PuzzleLevel';
import Confession from './components/levels/Confession';
import LevelProgress from './components/ui/LevelProgress';
import MusicPlayer from './components/ui/MusicPlayer';
import TransitionScreen from './components/ui/TransitionScreen';

const GameContent: React.FC = () => {
  const { currentLevel } = useGame();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionText, setTransitionText] = useState('');
  const [prevLevel, setPrevLevel] = useState(currentLevel);

  useEffect(() => {
    if (currentLevel !== prevLevel) {
      // Determine transition text based on the level
      const transitionTexts: Record<string, string> = {
        landing: '',
        memory: 'Walking down memory lane...',
        quiz: 'Time to test your knowledge...',
        puzzle: 'Unlocking a special message...',
        confession: 'One last surprise...',
      };
      
      setTransitionText(transitionTexts[currentLevel]);
      setIsTransitioning(true);
      
      // Ensure proper timing for transitions
      const showTransition = setTimeout(() => {
        setIsTransitioning(false);
        setPrevLevel(currentLevel);
      }, 1500);
      
      return () => {
        clearTimeout(showTransition);
      };
    }
  }, [currentLevel, prevLevel]);

  return (
    <div className="app-container relative overflow-hidden">
      <TransitionScreen 
        isVisible={isTransitioning} 
        text={transitionText}
      />
      
      <LevelProgress />
      <MusicPlayer />
      
      <AnimatePresence mode="wait">
        <>
          {currentLevel === 'landing' && <LandingSection />}
          {currentLevel === 'memory' && <MemoryLane />}
          {currentLevel === 'quiz' && <MiniQuiz />}
          {currentLevel === 'puzzle' && <PuzzleLevel />}
          {currentLevel === 'confession' && <Confession />}
        </>
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App;