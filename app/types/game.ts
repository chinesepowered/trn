// Game Types for TRN Battle Arena

export interface Fighter {
  id: string;
  name: string;
  class: FighterClass;
  rarity: Rarity;
  level: number;
  experience: number;
  stats: FighterStats;
  equipment: Equipment;
  image: string;
  tokenId?: string;
  owner?: string;
}

export interface FighterStats {
  attack: number;
  defense: number;
  health: number;
  maxHealth: number;
  speed: number;
  criticalChance: number;
}

export enum FighterClass {
  WARRIOR = 'WARRIOR',
  MAGE = 'MAGE',
  ARCHER = 'ARCHER',
  ASSASSIN = 'ASSASSIN'
}

export enum Rarity {
  COMMON = 'COMMON',
  RARE = 'RARE',
  EPIC = 'EPIC',
  LEGENDARY = 'LEGENDARY'
}

export interface Equipment {
  weapon?: Weapon;
  armor?: Armor;
  accessory?: Accessory;
}

export interface Weapon {
  id: string;
  name: string;
  type: string;
  attackBonus: number;
  rarity: Rarity;
}

export interface Armor {
  id: string;
  name: string;
  defenseBonus: number;
  healthBonus: number;
  rarity: Rarity;
}

export interface Accessory {
  id: string;
  name: string;
  speedBonus: number;
  critBonus: number;
  rarity: Rarity;
}

export interface Battle {
  id: string;
  fighter1: Fighter;
  fighter2: Fighter;
  winner?: Fighter;
  loser?: Fighter;
  rounds: BattleRound[];
  rewards: Reward[];
  timestamp: number;
  status: BattleStatus;
}

export interface BattleRound {
  attacker: Fighter;
  defender: Fighter;
  damage: number;
  critical: boolean;
  timestamp: number;
}

export enum BattleStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export interface Reward {
  type: RewardType;
  amount: number;
  item?: string;
  rarity?: Rarity;
}

export enum RewardType {
  ROOT_TOKENS = 'ROOT_TOKENS',
  EXPERIENCE = 'EXPERIENCE',
  NFT_LOOT = 'NFT_LOOT',
  EQUIPMENT = 'EQUIPMENT'
}

export interface User {
  address: string;
  fighters: Fighter[];
  rootBalance: number;
  totalBattles: number;
  wins: number;
  losses: number;
  ranking: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: number;
  progress: number;
  maxProgress: number;
}

export interface GameState {
  user: User | null;
  currentBattle: Battle | null;
  activeFighter: Fighter | null;
  isConnected: boolean;
  isLoading: boolean;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  timestamp: number;
}

// Blockchain Integration Types
export interface WalletConnection {
  address: string;
  signer: any;
  api: any;
}

export interface TRNTransaction {
  hash: string;
  status: 'pending' | 'confirmed' | 'failed';
  type: 'mint' | 'battle' | 'claim' | 'upgrade';
  timestamp: number;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
} 