'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { 
  GameState, 
  User, 
  Fighter, 
  Battle, 
  Notification,
  WalletConnection,
  TRNTransaction
} from '../types/game';

interface GameStore extends GameState {
  // Wallet actions
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  
  // Fighter actions
  mintFighter: () => Promise<Fighter | null>;
  selectFighter: (fighter: Fighter) => void;
  upgradeFighter: (fighterId: string) => Promise<void>;
  
  // Battle actions
  startBattle: (opponentId?: string) => Promise<void>;
  claimRewards: () => Promise<void>;
  
  // UI actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  
  // Data management
  refreshUserData: () => Promise<void>;
  updateBalance: () => Promise<void>;
}

const useGameStore = create<GameStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      user: null,
      currentBattle: null,
      activeFighter: null,
      isConnected: false,
      isLoading: false,
      notifications: [],

      // Wallet Actions
      connectWallet: async () => {
        set({ isLoading: true });
        
        try {
          // In a real implementation, this would connect to FuturePass
          // For demo purposes, we'll simulate the connection
          const mockUser: User = {
            address: '0x' + Math.random().toString(16).substring(2, 42),
            fighters: [],
            rootBalance: 1000,
            totalBattles: 0,
            wins: 0,
            losses: 0,
            ranking: 1000,
            achievements: []
          };

          set({ 
            user: mockUser, 
            isConnected: true, 
            isLoading: false 
          });

          get().addNotification({
            type: 'success',
            message: 'FuturePass wallet connected successfully!'
          });

        } catch (error) {
          set({ isLoading: false });
          get().addNotification({
            type: 'error',
            message: 'Failed to connect wallet. Please try again.'
          });
        }
      },

      disconnectWallet: () => {
        set({ 
          user: null, 
          isConnected: false, 
          activeFighter: null,
          currentBattle: null 
        });
        
        get().addNotification({
          type: 'info',
          message: 'Wallet disconnected'
        });
      },

      // Fighter Actions
      mintFighter: async () => {
        const { user } = get();
        if (!user) return null;

        set({ isLoading: true });

        try {
          // Simulate minting process
          const newFighter = generateRandomFighter();
          
          const updatedUser = {
            ...user,
            fighters: [...user.fighters, newFighter]
          };

          set({ 
            user: updatedUser, 
            isLoading: false 
          });

          get().addNotification({
            type: 'success',
            message: `New ${newFighter.rarity} ${newFighter.class} minted!`
          });

          return newFighter;

        } catch (error) {
          set({ isLoading: false });
          get().addNotification({
            type: 'error',
            message: 'Failed to mint fighter. Please try again.'
          });
          return null;
        }
      },

      selectFighter: (fighter: Fighter) => {
        set({ activeFighter: fighter });
      },

      upgradeFighter: async (fighterId: string) => {
        const { user } = get();
        if (!user) return;

        set({ isLoading: true });

        try {
          const updatedFighters = user.fighters.map(fighter => {
            if (fighter.id === fighterId) {
              return {
                ...fighter,
                level: fighter.level + 1,
                stats: {
                  ...fighter.stats,
                  attack: fighter.stats.attack + 5,
                  defense: fighter.stats.defense + 3,
                  maxHealth: fighter.stats.maxHealth + 10,
                  health: fighter.stats.maxHealth + 10
                }
              };
            }
            return fighter;
          });

          const updatedUser = {
            ...user,
            fighters: updatedFighters,
            rootBalance: user.rootBalance - 100 // Upgrade cost
          };

          set({ 
            user: updatedUser, 
            isLoading: false 
          });

          get().addNotification({
            type: 'success',
            message: 'Fighter upgraded successfully!'
          });

        } catch (error) {
          set({ isLoading: false });
          get().addNotification({
            type: 'error',
            message: 'Upgrade failed. Please try again.'
          });
        }
      },

      // Battle Actions
      startBattle: async (opponentId?: string) => {
        const { activeFighter, user } = get();
        if (!activeFighter || !user) return;

        set({ isLoading: true });

        try {
          // Generate opponent or use selected one
          const opponent = generateRandomFighter();
          
          const battle = await simulateBattle(activeFighter, opponent);
          
          // Update user stats
          const isWin = battle.winner?.id === activeFighter.id;
          const updatedUser = {
            ...user,
            totalBattles: user.totalBattles + 1,
            wins: isWin ? user.wins + 1 : user.wins,
            losses: isWin ? user.losses : user.losses + 1,
            rootBalance: user.rootBalance + (isWin ? 50 : 10)
          };

          set({ 
            currentBattle: battle, 
            user: updatedUser,
            isLoading: false 
          });

          get().addNotification({
            type: isWin ? 'success' : 'info',
            message: isWin ? 'Victory! You earned 50 ROOT tokens!' : 'Defeat! You earned 10 ROOT tokens for participating.'
          });

        } catch (error) {
          set({ isLoading: false });
          get().addNotification({
            type: 'error',
            message: 'Battle failed to start. Please try again.'
          });
        }
      },

      claimRewards: async () => {
        const { currentBattle } = get();
        if (!currentBattle) return;

        set({ isLoading: true });
        
        // Simulate claiming rewards
        setTimeout(() => {
          set({ 
            currentBattle: null, 
            isLoading: false 
          });
          
          get().addNotification({
            type: 'success',
            message: 'Rewards claimed successfully!'
          });
        }, 1000);
      },

      // UI Actions
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: Date.now().toString(),
          timestamp: Date.now()
        };

        set(state => ({
          notifications: [...state.notifications, newNotification]
        }));

        // Auto-remove after 5 seconds
        setTimeout(() => {
          get().removeNotification(newNotification.id);
        }, 5000);
      },

      removeNotification: (id: string) => {
        set(state => ({
          notifications: state.notifications.filter(n => n.id !== id)
        }));
      },

      // Data Management
      refreshUserData: async () => {
        // In real implementation, fetch from blockchain
        get().updateBalance();
      },

      updateBalance: async () => {
        // In real implementation, query ROOT token balance
        const { user } = get();
        if (user) {
          // Simulate balance update
          const updatedUser = { ...user };
          set({ user: updatedUser });
        }
      }
    }),
    {
      name: 'trn-battle-arena-store'
    }
  )
);

// Helper functions for demo
function generateRandomFighter(): Fighter {
  const classes = ['WARRIOR', 'MAGE', 'ARCHER', 'ASSASSIN'];
  const rarities = ['COMMON', 'RARE', 'EPIC', 'LEGENDARY'];
  
  const fighterClass = classes[Math.floor(Math.random() * classes.length)];
  const rarity = rarities[Math.floor(Math.random() * rarities.length)];
  
  const baseStats = {
    WARRIOR: { attack: 80, defense: 90, health: 120, speed: 60 },
    MAGE: { attack: 100, defense: 60, health: 80, speed: 70 },
    ARCHER: { attack: 85, defense: 65, health: 90, speed: 95 },
    ASSASSIN: { attack: 95, defense: 55, health: 75, speed: 100 }
  }[fighterClass];

  const rarityMultiplier = {
    COMMON: 1,
    RARE: 1.2,
    EPIC: 1.5,
    LEGENDARY: 2
  }[rarity];

  const names = {
    WARRIOR: ['Thorin', 'Gareth', 'Magnus', 'Ragnar'],
    MAGE: ['Gandalf', 'Merlin', 'Azura', 'Mystral'],
    ARCHER: ['Legolas', 'Artemis', 'Robin', 'Hawkeye'],
    ASSASSIN: ['Shadow', 'Viper', 'Blade', 'Whisper']
  }[fighterClass];

  return {
    id: `fighter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: names[Math.floor(Math.random() * names.length)],
    class: fighterClass,
    rarity: rarity,
    level: 1,
    experience: 0,
    stats: {
      attack: Math.floor(baseStats.attack * rarityMultiplier),
      defense: Math.floor(baseStats.defense * rarityMultiplier),
      health: Math.floor(baseStats.health * rarityMultiplier),
      maxHealth: Math.floor(baseStats.health * rarityMultiplier),
      speed: Math.floor(baseStats.speed * rarityMultiplier),
      criticalChance: 0.1
    },
    equipment: {},
    image: `/fighters/${fighterClass.toLowerCase()}_${rarity.toLowerCase()}.png`
  };
}

async function simulateBattle(fighter1: Fighter, fighter2: Fighter): Promise<Battle> {
  // Simple battle simulation
  let f1Health = fighter1.stats.health;
  let f2Health = fighter2.stats.health;
  const rounds = [];
  
  while (f1Health > 0 && f2Health > 0) {
    // Fighter 1 attacks
    const damage1 = Math.max(1, fighter1.stats.attack - fighter2.stats.defense + Math.random() * 20 - 10);
    f2Health -= damage1;
    
    rounds.push({
      attacker: fighter1,
      defender: fighter2,
      damage: damage1,
      critical: Math.random() < fighter1.stats.criticalChance,
      timestamp: Date.now()
    });
    
    if (f2Health <= 0) break;
    
    // Fighter 2 attacks
    const damage2 = Math.max(1, fighter2.stats.attack - fighter1.stats.defense + Math.random() * 20 - 10);
    f1Health -= damage2;
    
    rounds.push({
      attacker: fighter2,
      defender: fighter1,
      damage: damage2,
      critical: Math.random() < fighter2.stats.criticalChance,
      timestamp: Date.now()
    });
  }
  
  const winner = f1Health > 0 ? fighter1 : fighter2;
  const loser = f1Health > 0 ? fighter2 : fighter1;
  
  return {
    id: `battle_${Date.now()}`,
    fighter1,
    fighter2,
    winner,
    loser,
    rounds,
    rewards: [
      { type: 'ROOT_TOKENS' as any, amount: winner === fighter1 ? 50 : 10 },
      { type: 'EXPERIENCE' as any, amount: 25 }
    ],
    timestamp: Date.now(),
    status: 'COMPLETED' as any
  };
}

export default useGameStore; 