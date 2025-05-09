import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Level } from '../types';

interface GameContextType {
  currentLevel: Level;
  setCurrentLevel: (level: Level) => void;
  progress: number;
  updateProgress: () => void;
  backgroundMusic: boolean;
  toggleBackgroundMusic: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [currentLevel, setCurrentLevel] = useState<Level>('landing');
  const [progress, setProgress] = useState(0);
  const [backgroundMusic, setBackgroundMusic] = useState(false);

  const updateProgress = () => {
    setProgress((prev) => {
      const newProgress = prev + 25; // 4 levels, each worth 25%
      return Math.min(newProgress, 100);
    });
  };

  const toggleBackgroundMusic = () => {
    setBackgroundMusic((prev) => !prev);
  };

  return (
    <GameContext.Provider
      value={{
        currentLevel,
        setCurrentLevel,
        progress,
        updateProgress,
        backgroundMusic,
        toggleBackgroundMusic,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};