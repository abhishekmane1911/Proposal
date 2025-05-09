import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What's my favorite color?",
    options: ["Blue", "Pink", "Purple", "Green"],
    answer: 2 // Purple
  },
  {
    id: 2,
    question: "What food can I never resist?",
    options: ["Pizza", "Sushi", "Chocolate", "Ice Cream"],
    answer: 2 // Chocolate
  },
  {
    id: 3,
    question: "What's my dream vacation spot?",
    options: ["Paris", "Beach Resort", "Mountain Cabin", "Tokyo"],
    answer: 0 // Paris
  },
  {
    id: 4,
    question: "What makes me laugh the most?",
    options: ["Dad jokes", "Funny cat videos", "Your silly faces", "Comedy movies"],
    answer: 2 // Your silly faces
  },
  {
    id: 5,
    question: "What do I always say when I'm excited?",
    options: ["Awesome!", "Oh my gosh!", "No way!", "Let's go!"],
    answer: 1 // Oh my gosh!
  }
];