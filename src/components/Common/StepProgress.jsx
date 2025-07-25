import { motion } from 'framer-motion';

const StepProgress = ({ currentStep, totalSteps = 5 }) => {
  const steps = [
    { id: 'business-info', label: 'Business Info', icon: '🏢' },
    { id: 'templates', label: 'Templates', icon: '🎨' },
    { id: 'content', label: 'AI Content', icon: '🤖' },
    { id: 'design', label: 'Design', icon: '🎯' },
    { id: 'preview', label: 'Preview', icon: '👀' }
  ];

  const getCurrentStepIndex = () => {
    const index = steps.findIndex(step => step.id === currentStep);
    return index >= 0 ? index : 0;
  };

  const currentIndex = getCurrentStepIndex();

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 w-full h-1 bg-gray-200 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentIndex / (totalSteps - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isActive = index === currentIndex;
            const isCompleted = index < currentIndex;
            const isPending = index > currentIndex;

            return (
              <motion.div
                key={step.id}
                className="flex flex-col items-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Step Circle */}
                <motion.div
                  className={`
                    relative w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold
                    ${isCompleted ? 'bg-green-500 text-white' : ''}
                    ${isActive ? 'bg-blue-600 text-white animate-pulse-glow' : ''}
                    ${isPending ? 'bg-gray-200 text-gray-400' : ''}
                  `}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isActive ? { 
                    scale: [1, 1.1, 1],
                    transition: { duration: 2, repeat: Infinity }
                  } : {}}
                >
                  {isCompleted ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      ✓
                    </motion.span>
                  ) : (
                    <span>{step.icon}</span>
                  )}
                  
                  {/* Active step glow */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-400 opacity-30"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Step Label */}
                <motion.span
                  className={`
                    mt-3 text-sm font-medium text-center
                    ${isActive ? 'text-blue-600' : ''}
                    ${isCompleted ? 'text-green-600' : ''}
                    ${isPending ? 'text-gray-400' : ''}
                  `}
                  animate={isActive ? {
                    color: ['#2563eb', '#7c3aed', '#2563eb'],
                    transition: { duration: 2, repeat: Infinity }
                  } : {}}
                >
                  {step.label}
                </motion.span>

                {/* Step number for pending steps */}
                {isPending && (
                  <motion.span
                    className="absolute top-3 left-3 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-600 border-2 border-gray-200"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {index + 1}
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Progress Text */}
      <motion.div
        className="text-center mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <span className="text-sm text-gray-600">
          Step {currentIndex + 1} of {totalSteps}
        </span>
        <div className="w-32 h-1 bg-gray-200 rounded-full mx-auto mt-2">
          <motion.div
            className="h-full bg-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default StepProgress;
