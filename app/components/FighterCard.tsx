'use client';

import { motion } from 'framer-motion';
import { Sword, Shield, Heart, Zap, Star } from 'lucide-react';
import useGameStore from '../store/gameStore';

interface Fighter {
  id: string;
  name: string;
  class: string;
  rarity: string;
  level: number;
  stats: {
    attack: number;
    defense: number;
    health: number;
    maxHealth: number;
    speed: number;
    criticalChance: number;
  };
  image: string;
}

interface FighterCardProps {
  fighter: Fighter;
  isSelected?: boolean;
  onClick?: () => void;
  showUpgrade?: boolean;
}

export default function FighterCard({ fighter, isSelected, onClick, showUpgrade }: FighterCardProps) {
  const { upgradeFighter, user } = useGameStore();

  const rarityColors = {
    COMMON: 'from-gray-500 to-gray-600',
    RARE: 'from-blue-500 to-blue-600',
    EPIC: 'from-purple-500 to-purple-600',
    LEGENDARY: 'from-yellow-500 to-orange-600'
  };

  const classIcons = {
    WARRIOR: '⚔️',
    MAGE: '🔮',
    ARCHER: '🏹',
    ASSASSIN: '🗡️'
  };

  const rarityGlow = {
    COMMON: 'shadow-gray-500/20',
    RARE: 'shadow-blue-500/30',
    EPIC: 'shadow-purple-500/40',
    LEGENDARY: 'shadow-yellow-500/50'
  };

  const canUpgrade = user && user.rootBalance >= 100;

  return (
    <motion.div
      className={`relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border-2 cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'border-blue-400 shadow-lg shadow-blue-400/30' 
          : 'border-gray-600 hover:border-gray-500'
      } ${rarityGlow[fighter.rarity as keyof typeof rarityGlow]}`}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Rarity Indicator */}
      <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${rarityColors[fighter.rarity as keyof typeof rarityColors]} text-white`}>
        {fighter.rarity}
      </div>

      {/* Fighter Image Placeholder */}
      <div className="w-full h-32 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg mb-3 flex items-center justify-center text-4xl">
        {classIcons[fighter.class as keyof typeof classIcons]}
      </div>

      {/* Fighter Info */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white text-lg">{fighter.name}</h3>
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold">{fighter.level}</span>
          </div>
        </div>

        <div className="text-sm text-gray-400 mb-3">{fighter.class}</div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1 text-red-400">
            <Sword className="w-3 h-3" />
            <span>{fighter.stats.attack}</span>
          </div>
          <div className="flex items-center gap-1 text-blue-400">
            <Shield className="w-3 h-3" />
            <span>{fighter.stats.defense}</span>
          </div>
          <div className="flex items-center gap-1 text-green-400">
            <Heart className="w-3 h-3" />
            <span>{fighter.stats.health}</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            <Zap className="w-3 h-3" />
            <span>{fighter.stats.speed}</span>
          </div>
        </div>

        {/* Health Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(fighter.stats.health / fighter.stats.maxHealth) * 100}%` }}
          />
        </div>

        {/* Upgrade Button */}
        {showUpgrade && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              upgradeFighter(fighter.id);
            }}
            disabled={!canUpgrade}
            className={`w-full mt-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              canUpgrade
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={canUpgrade ? { scale: 1.02 } : {}}
            whileTap={canUpgrade ? { scale: 0.98 } : {}}
          >
            {canUpgrade ? 'Upgrade (100 ROOT)' : 'Need 100 ROOT'}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
} 