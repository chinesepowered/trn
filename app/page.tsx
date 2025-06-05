'use client';

import { motion } from 'framer-motion';
import { Plus, Crown, Star, Target } from 'lucide-react';
import useGameStore from './store/gameStore';
import WalletConnect from './components/WalletConnect';
import FighterCard from './components/FighterCard';
import BattleArena from './components/BattleArena';
import Notifications from './components/Notifications';

export default function Home() {
  const { 
    isConnected, 
    user, 
    activeFighter, 
    selectFighter, 
    mintFighter, 
    isLoading,
    notifications 
  } = useGameStore();

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center p-4">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hero Section */}
          <motion.div
            className="mb-12"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-6">
              TRN BATTLE ARENA
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              The ultimate onchain idle battler on The Root Network
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 rounded-lg border border-blue-500/30">
              <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">NFT Fighters</h3>
              <p className="text-gray-300">Collect unique blockchain-based warriors with true ownership</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 p-6 rounded-lg border border-green-500/30">
              <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Auto-Battle</h3>
              <p className="text-gray-300">Fighters battle automatically, earning you rewards 24/7</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-lg border border-purple-500/30">
              <Star className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">ROOT Rewards</h3>
              <p className="text-gray-300">Earn $ROOT tokens with every battle and achievement</p>
            </div>
          </motion.div>

          {/* TRN Features */}
          <motion.div 
            className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-6 rounded-lg border border-gray-600 mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Powered by The Root Network</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-green-400">Gas-in-Any-Token</div>
                  <div className="text-sm text-gray-300">Pay fees with any token for seamless gameplay</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-blue-400">FuturePass Integration</div>
                  <div className="text-sm text-gray-300">One-click wallet connection and transactions</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-purple-400">NFT & Collectibles</div>
                  <div className="text-sm text-gray-300">True ownership of all in-game assets</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-yellow-400">Cross-Chain Assets</div>
                  <div className="text-sm text-gray-300">XRPL and TRN asset integration</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <WalletConnect />
            <p className="text-sm text-gray-400 mt-4">
              Get started with a free starter fighter NFT!
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            TRN Battle Arena
          </h1>
          <WalletConnect />
        </div>
      </header>

      {/* Notifications */}
      <Notifications />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Fighter Collection */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Your Fighters</h2>
                <motion.button
                  onClick={mintFighter}
                  disabled={isLoading || !user || user.rootBalance < 50}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    (!user || user.rootBalance < 50) 
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white'
                  }`}
                  whileHover={(!user || user.rootBalance < 50) ? {} : { scale: 1.05 }}
                  whileTap={(!user || user.rootBalance < 50) ? {} : { scale: 0.95 }}
                >
                  <Plus className="w-4 h-4" />
                  {isLoading ? 'Minting...' : 'Mint Fighter (Free)'}
                </motion.button>
              </div>

              {user?.fighters.length === 0 ? (
                <div className="text-center p-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-600">
                  <div className="text-6xl mb-4">🎮</div>
                  <h3 className="text-xl font-bold text-white mb-2">No Fighters Yet</h3>
                  <p className="text-gray-400 mb-6">Mint your first fighter to start battling!</p>
                  <motion.button
                    onClick={mintFighter}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-6 py-3 rounded-lg font-semibold text-white transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLoading ? 'Minting...' : 'Get Your First Fighter (Free)'}
                  </motion.button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {user?.fighters.map((fighter) => (
                    <FighterCard
                      key={fighter.id}
                      fighter={fighter}
                      isSelected={activeFighter?.id === fighter.id}
                      onClick={() => selectFighter(fighter)}
                      showUpgrade={true}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Battle Arena */}
          <div className="lg:col-span-1">
            <BattleArena />
          </div>
        </div>

        {/* Stats Dashboard */}
        {user && (
          <motion.div 
            className="mt-8 grid md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-600">
              <div className="text-sm text-gray-400">Total Battles</div>
              <div className="text-2xl font-bold text-white">{user.totalBattles}</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-600">
              <div className="text-sm text-gray-400">Win Rate</div>
              <div className="text-2xl font-bold text-green-400">
                {user.totalBattles > 0 ? Math.round((user.wins / user.totalBattles) * 100) : 0}%
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-600">
              <div className="text-sm text-gray-400">Ranking</div>
              <div className="text-2xl font-bold text-yellow-400">#{user.ranking}</div>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-600">
              <div className="text-sm text-gray-400">ROOT Balance</div>
              <div className="text-2xl font-bold text-yellow-400">{user.rootBalance.toLocaleString()}</div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
