'use client';

import { motion } from 'framer-motion';
import { Swords, Trophy, Coins } from 'lucide-react';
import useGameStore from '../store/gameStore';

export default function BattleArena() {
  const { 
    activeFighter, 
    currentBattle, 
    startBattle, 
    claimRewards, 
    isLoading 
  } = useGameStore();

  if (!activeFighter) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Battle Arena</h2>
        <p className="text-gray-400 mb-4">Select a fighter to enter the arena!</p>
        <div className="text-6xl mb-4">⚔️</div>
      </div>
    );
  }

  if (currentBattle) {
    const isWin = currentBattle.winner?.id === activeFighter.id;
    
    return (
      <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Battle Results</h2>
        
        <div className="flex items-center justify-between mb-6">
          {/* Your Fighter */}
          <div className="text-center">
            <div className="text-4xl mb-2">⚔️</div>
            <div className="font-semibold text-white">{currentBattle.fighter1.name}</div>
            <div className="text-sm text-gray-400">{currentBattle.fighter1.class}</div>
          </div>
          
          {/* VS */}
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-400 mb-2">VS</div>
            <div className={`text-lg font-bold ${isWin ? 'text-green-400' : 'text-red-400'}`}>
              {isWin ? 'VICTORY!' : 'DEFEAT!'}
            </div>
          </div>
          
          {/* Opponent */}
          <div className="text-center">
            <div className="text-4xl mb-2">🏹</div>
            <div className="font-semibold text-white">{currentBattle.fighter2.name}</div>
            <div className="text-sm text-gray-400">{currentBattle.fighter2.class}</div>
          </div>
        </div>
        
        {/* Rewards */}
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Rewards Earned
          </h3>
          
          <div className="space-y-2">
            {currentBattle.rewards.map((reward, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-300">
                  {reward.type === 'ROOT_TOKENS' ? 'ROOT Tokens' : 'Experience'}
                </span>
                <span className="font-semibold text-yellow-400">
                  +{reward.amount} {reward.type === 'ROOT_TOKENS' ? 'ROOT' : 'XP'}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Battle Log */}
        <div className="bg-gray-700 rounded-lg p-4 mb-6 max-h-48 overflow-y-auto">
          <h3 className="font-semibold text-white mb-3">Battle Log</h3>
          <div className="space-y-1 text-sm">
            {currentBattle.rounds.map((round, index) => (
              <div key={index} className="text-gray-300">
                <span className="text-blue-400">{round.attacker.name}</span> deals{' '}
                <span className={round.critical ? 'text-yellow-400 font-bold' : 'text-red-400'}>
                  {Math.floor(round.damage)} {round.critical ? 'CRITICAL' : ''} damage
                </span>{' '}
                to <span className="text-purple-400">{round.defender.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <motion.button
          onClick={claimRewards}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 py-3 rounded-lg font-semibold text-white transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? 'Claiming...' : 'Claim Rewards'}
        </motion.button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Battle Arena</h2>
      
      {/* Active Fighter Display */}
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">⚔️</div>
        <h3 className="text-xl font-bold text-white">{activeFighter.name}</h3>
        <p className="text-gray-400">{activeFighter.class} • Level {activeFighter.level}</p>
        
        <div className="grid grid-cols-4 gap-4 mt-4 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-sm text-gray-400">ATK</div>
            <div className="font-bold text-red-400">{activeFighter.stats.attack}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400">DEF</div>
            <div className="font-bold text-blue-400">{activeFighter.stats.defense}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400">HP</div>
            <div className="font-bold text-green-400">{activeFighter.stats.health}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400">SPD</div>
            <div className="font-bold text-yellow-400">{activeFighter.stats.speed}</div>
          </div>
        </div>
      </div>
      
      {/* Battle Button */}
      <motion.button
        onClick={() => startBattle()}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 py-4 rounded-lg font-bold text-white text-lg transition-all shadow-lg"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-center gap-3">
          <Swords className="w-6 h-6" />
          {isLoading ? 'Finding Opponent...' : 'START BATTLE'}
        </div>
      </motion.button>
      
      <div className="text-center mt-4 text-sm text-gray-400">
        Win: +50 ROOT | Participate: +10 ROOT
      </div>
    </div>
  );
} 