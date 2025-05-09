import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ReactCanvasConfetti from 'react-canvas-confetti';
import FloatingElements from '../ui/FloatingElements';

interface ConfettiProps {
  startConfetti: () => void;
}

const CanvasConfetti = React.memo<ConfettiProps>(({ startConfetti }) => {
  const refAnimationInstance = React.useRef<any>(null);

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio: number, opts: any) => {
    refAnimationInstance.current && 
    refAnimationInstance.current({
      ...opts,
      origin: { y: 0.7 },
      particleCount: Math.floor(200 * particleRatio),
    });
  }, []);

  React.useEffect(() => {
    startConfetti();
  }, [startConfetti]);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    
    makeShot(0.2, {
      spread: 60,
    });
    
    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    
    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    
    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  return (
    <ReactCanvasConfetti
      refConfetti={getInstance}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 999
      }}
    />
  );
});

const Confession: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [fireConfetti, setFireConfetti] = useState(false);
  
  const handleYesClick = () => {
    setAnswered(true);
    setFireConfetti(true);
  };

  React.useEffect(() => {
    // Show the modal after a delay for dramatic effect
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, delay: 0.3 }
    }
  };

  const fireConfettiEffect = useCallback(() => {
    // This is a placeholder that will be called by CanvasConfetti
    // The actual implementation is in the CanvasConfetti component
  }, []);

  return (
    <motion.div 
      className="level-container bg-gradient-to-br from-primary-100 via-lavender to-rose min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <FloatingElements count={20} type="hearts" />
      
      {fireConfetti && <CanvasConfetti startConfetti={fireConfettiEffect} />}
      
      {showModal && (
        <motion.div 
          className="fullscreen-modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="modal-content">
            {!answered ? (
              <>
                <h2 className="text-3xl md:text-4xl font-script text-primary-600 mb-6">
                  Will you be mine?
                </h2>
                <p className="text-gray-600 mb-8">
                  Every moment with you has been magical. I'd be the luckiest person if you'd say yes.
                </p>
                <div className="flex justify-center space-x-4">
                  <motion.button
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleYesClick}
                  >
                    Yes 💖
                  </motion.button>
                  <motion.button
                    className="btn-accent"
                    whileHover={{ 
                      scale: 1.05,
                      y: [0, -10, 0, -10, 0], 
                      transition: { duration: 0.5 } 
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ x: 0 }}
                    animate={{ 
                      x: [0, 20, -20, 20, 0],
                      transition: { duration: 0.4, repeat: Infinity, repeatType: "reverse" }
                    }}
                    onClick={handleYesClick}
                  >
                    Also Yes 😉
                  </motion.button>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-script text-primary-600 mb-6">
                  You've made me the happiest person! ❤️
                </h2>
                <p className="text-xl text-gray-700 mb-4">
                  Thank you for completing this little journey with me.
                </p>
                <p className="text-lg text-primary-500">
                  I can't wait to start our next adventure together!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Confession;