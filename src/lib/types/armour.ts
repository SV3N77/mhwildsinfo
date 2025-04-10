export interface ArmourSetData {
  name: string;
  pieces: Piece[];
  bonus: any;
  groupBonus: GroupBonus;
  id: number;
  gameId: number;
}

export interface Piece {
  kind: string;
  name: string;
  description: string;
  rank: string;
  rarity: number;
  resistances: Resistances;
  defense: Defense;
  skills: Skill[];
  slots: any[];
  armorSet: ArmorSet;
  crafting: Crafting;
  id: number;
}

export interface Resistances {
  fire: number;
  water: number;
  ice: number;
  thunder: number;
  dragon: number;
}

export interface Defense {
  base: number;
  max: number;
}

export interface Skill {
  skill: Skill2;
  level: number;
  description: string;
  id: number;
}

export interface Skill2 {
  id: number;
  gameId: number;
  name: string;
  ranks: Rank[];
  description: string;
  kind: string;
}

export interface Rank {
  id: number;
  skill?: Skill3;
  level?: number;
  description?: string;
}

export interface Skill3 {
  id: number;
}

export interface ArmorSet {
  id: number;
}

export interface Crafting {
  armor: Armor;
  materials: Material[];
  zennyCost: number;
  id: number;
}

export interface Armor {
  id: number;
}

export interface Material {
  item: Item;
  quantity: number;
  id: number;
}

export interface Item {
  id: number;
  gameId: number;
  rarity: number;
  name: string;
  description: string;
  value: number;
  carryLimit: number;
  recipes: any[];
}

export interface GroupBonus {
  id: number;
  skill: Skill4;
  ranks: Rank2[];
}

export interface Skill4 {
  id: number;
  name: string;
}

export interface Rank2 {
  bonus: Bonus;
  pieces: number;
  skill: Skill5;
  id: number;
}

export interface Bonus {
  id: number;
}

export interface Skill5 {
  id: number;
  skill: Skill6;
  level: number;
  description: string;
}

export interface Skill6 {
  id: number;
}

export interface DisplayStat {
  label: string; // e.g., "Fire Resistance"
  value: number; // The calculated numeric value
}
