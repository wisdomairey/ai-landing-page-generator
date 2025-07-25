import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now();
    const notification = { id, message, type, duration };
    
    setNotifications(prev => [...prev, notification]);

    // Auto remove after duration
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  }, []);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const notificationVariants = {
    initial: { opacity: 0, x: 300, scale: 0.8 },
    animate: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      x: 300, 
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white border-green-600';
      case 'error':
        return 'bg-red-500 text-white border-red-600';
      case 'warning':
        return 'bg-yellow-500 text-white border-yellow-600';
      default:
        return 'bg-blue-500 text-white border-blue-600';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  // Example notifications for demo
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification('Welcome to Pagify!', 'success');
    }, 1000);

    return () => clearTimeout(timer);
  }, [addNotification]);

  return (
    <>
      {/* Notification Container */}
      <div className="fixed top-4 right-4 z-50 space-y-3">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              variants={notificationVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`
                px-4 py-3 rounded-lg shadow-lg border-l-4 max-w-sm cursor-pointer
                ${getNotificationStyles(notification.type)}
              `}
              onClick={() => removeNotification(notification.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                <span className="text-sm font-medium">{notification.message}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeNotification(notification.id);
                  }}
                  className="ml-auto text-lg opacity-70 hover:opacity-100"
                >
                  ×
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Global notification trigger function - you can call this from anywhere */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.showNotification = function(message, type, duration) {
              window.dispatchEvent(new CustomEvent('addNotification', {
                detail: { message, type, duration }
              }));
            };
          `
        }}
      />
    </>
  );
};

export default NotificationSystem;
