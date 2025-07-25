import { motion } from 'framer-motion';
import { useState } from 'react';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonVariants = {
    closed: {
      rotate: 0,
      scale: 1
    },
    open: {
      rotate: 45,
      scale: 1.1
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: 20
    },
    open: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu Items */}
      <motion.div
        className="absolute bottom-16 right-0 flex flex-col space-y-3"
        variants={menuVariants}
        animate={isOpen ? "open" : "closed"}
        initial="closed"
      >
        <motion.button
          variants={itemVariants}
          className="bg-white text-blue-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow border border-blue-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xl">💡</span>
        </motion.button>
        
        <motion.button
          variants={itemVariants}
          className="bg-white text-green-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow border border-green-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xl">🎨</span>
        </motion.button>
        
        <motion.button
          variants={itemVariants}
          className="bg-white text-purple-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow border border-purple-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xl">⚡</span>
        </motion.button>
      </motion.div>

      {/* Main FAB */}
      <motion.button
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        variants={buttonVariants}
        animate={isOpen ? "open" : "closed"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;
