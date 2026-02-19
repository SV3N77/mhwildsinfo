type Rank = "low" | "high" | "master";

export interface IconInfo {
  id: number;
  kind: string;
  colorId?: number;
  color?: string;
}

export interface MinimalIdRef {
  id: number;
}

// --- Interfaces for Armor Piece Crafting ---
export interface CraftingItemDetail {
  id: number;
  gameId: number;
  rarity: number;
  name: string;
  description: string;
  value: number;
  carryLimit: number;
  recipes: any[];
  icon?: IconInfo | null;
}

export interface CraftingMaterial {
  item: CraftingItemDetail;
  quantity: number;
  id: number; // ID of the material requirement entry
}

export interface ArmorPieceCraftingDetails {
  armor: MinimalIdRef; // Was your 'Armor' interface
  materials: CraftingMaterial[];
  zennyCost: number;
  id: number; // ID of the crafting recipe
}

// --- Interfaces for Skills and Ranks (General) ---
export interface SkillDefinitionRank {
  id: number;
  skill?: MinimalIdRef; // Was your 'Skill3'
  level?: number;
  name?: string | null; // Added based on JSON example (was null)
  description?: string;
}

export interface SkillDefinition {
  // Renamed from your 'Skill2'
  id: number;
  gameId: number;
  name: string;
  ranks: SkillDefinitionRank[];
  description: string;
  kind: string;
  icon?: IconInfo; // Added based on JSON example
}

// --- Interfaces for Armor Piece Specifics ---
export interface ArmorPieceAttachedSkill {
  skill: SkillDefinition;
  level: number;
  name: string | null; // Added based on JSON example (was null)
  description: string; // This is the level-specific description
  id: number; // ID of this skill instance on the armor piece
}

export interface Resistances {
  fire: number;
  water: number;
  ice: number;
  thunder: number;
  dragon: number;
}

export interface DefenseStats {
  base: number;
  max: number;
}

export interface ArmorPiece {
  id: number;
  gameId: number;
  kind: string;
  name: string;
  description: string;
  rank: Rank;
  rarity: number;
  resistances: Resistances;
  defense: DefenseStats;
  skills: ArmorPieceAttachedSkill[];
  slots: number[];
  armorSet: MinimalIdRef;
  crafting: ArmorPieceCraftingDetails;
}

// --- Interfaces for Armor Set Bonuses ---
export interface GroupBonusAppliedSkill {
  id: number;
  skill: { id: number; name: string };
  level: number;
  description: string;
}

export interface GroupBonusRank {
  id: number;
  bonus: MinimalIdRef;
  pieces: number;
  skill: { id: number; skill: MinimalIdRef; level: number; description: string };
}

export interface GroupBonusDefinition {
  id: number;
  skill: {
    id: number;
    name: string;
  };
  ranks: GroupBonusRank[];
}

export type ArmorSetBonus = GroupBonusDefinition;

export interface ArmorSetData {
  id: number;
  gameId: number;
  name: string;
  pieces: ArmorPiece[];
  bonus: ArmorSetBonus | null;
  groupBonus: GroupBonusDefinition | null;
}

export interface DisplayStat {
  label: string; // e.g., "Fire Resistance"
  value: number; // The calculated numeric value
}

export interface AggregatedMaterial {
  item: CraftingItemDetail;
  quantity: number;
}

export interface TotalArmorSetCost {
  totalZenny: number;
  totalMaterials: AggregatedMaterial[];
}
