'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Loader2 } from 'lucide-react';
import useGameStore from '../store/gameStore';

export default function WalletConnect() {
  const { isConnected, isLoading, user, connectWallet, disconnectWallet } = useGameStore();
  const [isHovered, setIsHovered] = useState(false);

  if (isConnected && user) {
    return (
      <motion.div 
        className="flex items-center gap-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-blue-500/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex-1">
          <div className="text-sm text-gray-300">Connected to FuturePass</div>
          <div className="font-mono text-xs text-gray-400">
            {user.address.slice(0, 6)}...{user.address.slice(-4)}
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm font-semibold text-yellow-400">
            {user.rootBalance.toLocaleString()} ROOT
          </div>
          <div className="text-xs text-gray-400">
            {user.fighters.length} Fighter{user.fighters.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        <motion.button
          onClick={disconnectWallet}
          className="px-3 py-1 text-xs bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded text-red-300 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Disconnect
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.button
      onClick={connectWallet}
      disabled={isLoading}
      className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 rounded-lg font-semibold text-white shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.6 }}
      />
      
      <div className="relative flex items-center gap-3">
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Wallet className="w-5 h-5" />
        )}
        
        <span>
          {isLoading ? 'Connecting...' : 'Connect FuturePass Wallet'}
        </span>
      </div>
    </motion.button>
  );
} 