export interface IconInfo {
  id: number;
  kind: string;
  colorId?: number; // Optional as seen in material item icons
  color?: string; // Optional as seen in material item icons
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
  kind: string;
  name: string;
  description: string;
  rank: string;
  rarity: number;
  resistances: Resistances;
  defense: DefenseStats;
  skills: ArmorPieceAttachedSkill[];
  slots: (number | null)[];
  armorSet: MinimalIdRef;
  crafting: ArmorPieceCraftingDetails;
  id: number;
}

// --- Interfaces for Armor Set Bonuses ---
export interface GroupBonusAppliedSkill {
  id: number;
  skill: MinimalIdRef; // Was your 'Skill6'
  level: number;
  name: string | null; // Added based on JSON example (was "Fortify")
  description: string;
}

export interface GroupBonusRank {
  bonus: MinimalIdRef;
  pieces: number;
  skill: GroupBonusAppliedSkill;
  id: number;
}

export interface GroupBonusDefinition {
  id: number;
  skill: {
    id: number;
    name: string;
  };
  ranks: GroupBonusRank[];
}

// Assuming 'bonus' (if not null) would have a similar structure to GroupBonusDefinition
// You might want to create a more generic 'ArmorSetBonusDefinition' if they are very similar
// For now, specific to what was provided for groupBonus:
export type ArmorSetBonus = GroupBonusDefinition; // Alias or define separately if different

// --- Main Armor Set Data Interface ---
export interface ArmorSetData {
  // Renamed from your 'ArmourSetData' for consistency
  name: string;
  pieces: ArmorPiece[];
  bonus: ArmorSetBonus | null; // Example showed null, allow defined structure or null
  groupBonus: GroupBonusDefinition | null; // Allow null if it can be missing
  id: number;
  // gameId: number; // The top-level armor set object in the example did NOT have a gameId.
  // If your structure can have it, add 'gameId?: number;'
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
