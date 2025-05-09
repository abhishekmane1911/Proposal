export interface MemoryItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
}

export type Level = 'landing' | 'memory' | 'quiz' | 'puzzle' | 'confession';

export interface PuzzlePiece {
  id: number;
  text: string;
  isFlipped: boolean;
}