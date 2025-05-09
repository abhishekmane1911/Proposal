import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';

const getRandomPosition = () => {
  return {
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 3,
  };
};

interface FloatingElementsProps {
  count?: number;
  type?: 'hearts' | 'stars' | 'mixed';
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ 
  count = 12, 
  type = 'hearts'
}) => {
  const elements = Array.from({ length: count }, (_, i) => {
    const { x, y, delay, duration } = getRandomPosition();
    const size = 16 + Math.random() * 16;
    const opacity = 0.3 + Math.random() * 0.4;
    
    const isHeart = type === 'hearts' || (type === 'mixed' && Math.random() > 0.5);
    const Icon = isHeart ? Heart : Star;
    const colorClass = isHeart ? 'text-primary-400' : 'text-accent-300';
    
    return (
      <motion.div
        key={i}
        className="absolute"
        initial={{ 
          x: `${x}vw`, 
          y: `${y}vh`, 
          opacity: 0,
          scale: 0.5,
        }}
        animate={{ 
          y: [`${y}vh`, `${y - 15}vh`, `${y}vh`],
          opacity: [0, opacity, 0],
          scale: [0.5, 1, 0.5]
        }}
        transition={{ 
          repeat: Infinity,
          repeatType: "loop",
          duration: duration,
          delay: delay,
          ease: "easeInOut" 
        }}
      >
        <Icon className={`${colorClass} fill-current`} size={size} />
      </motion.div>
    );
  });

  return <div className="fixed inset-0 pointer-events-none overflow-hidden">{elements}</div>;
};

export default FloatingElements;