'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import useGameStore from '../store/gameStore';

export default function Notifications() {
  const { notifications, removeNotification } = useGameStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 border-green-400';
      case 'error':
        return 'bg-red-500 border-red-400';
      case 'warning':
        return 'bg-yellow-500 border-yellow-400';
      default:
        return 'bg-blue-500 border-blue-400';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`p-4 rounded-lg shadow-lg border ${getColors(notification.type)} text-white`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-5">
                  {notification.message}
                </p>
              </div>
              
              <button
                onClick={() => removeNotification(notification.id)}
                className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Progress bar for auto-dismiss */}
            <motion.div
              className="mt-2 h-1 bg-black/20 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-white/30"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 4.5, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
} 