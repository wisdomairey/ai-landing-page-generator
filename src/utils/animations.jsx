import { motion } from 'framer-motion';

// Export motion for use in components
export { motion };

// Animation variants for common patterns
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const fadeInLeft = {
  hidden: { 
    opacity: 0, 
    x: -30 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const fadeInRight = {
  hidden: { 
    opacity: 0, 
    x: 30 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const slideInFromTop = {
  hidden: { 
    opacity: 0, 
    y: -50 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const bounceIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.3 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      type: "spring",
      bounce: 0.4
    }
  }
};

export const rotateIn = {
  hidden: { 
    opacity: 0, 
    rotate: -180,
    scale: 0.8
  },
  visible: { 
    opacity: 1, 
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Hover animations
export const hoverScale = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

export const hoverFloat = {
  hover: {
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

export const hoverGlow = {
  hover: {
    boxShadow: "0 10px 40px rgba(59, 130, 246, 0.3)",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

// Loading animations
export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const spinAnimation = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Page transition animations
export const pageTransition = {
  hidden: { 
    opacity: 0, 
    x: 100 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    x: -100,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

// Animated wrapper component
export const AnimatedSection = ({ children, animation = fadeInUp, className = "", delay = 0 }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        ...animation,
        visible: {
          ...animation.visible,
          transition: {
            ...animation.visible.transition,
            delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// Animated button component
export const AnimatedButton = ({ children, className = "", ...props }) => {
  return (
    <motion.button
      className={className}
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
      variants={hoverScale}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Animated card component
export const AnimatedCard = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      variants={{
        ...fadeInUp,
        visible: {
          ...fadeInUp.visible,
          transition: {
            ...fadeInUp.visible.transition,
            delay
          }
        },
        hover: hoverFloat.hover
      }}
    >
      {children}
    </motion.div>
  );
};
