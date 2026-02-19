// Define interfaces for nested objects first

// Represents the structure of the item icon
interface IconInfo {
  id: number;
  kind: string;
  colorId: number;
  color: string;
}

// Represents the structure of an item used in crafting/upgrading
// (Similar to the ItemData interface from previous examples, but includes icon)
interface MaterialItem {
  id: number;
  gameId: number;
  rarity: number;
  name: string;
  description: string;
  value: number;
  carryLimit: number;
  recipes: any[]; // Define more strictly if the recipe structure is known
  icon?: IconInfo | null; // Icon seems optional or sometimes null
}

// Represents a material needed for crafting/upgrading, including quantity
interface CraftingMaterial {
  item: MaterialItem;
  quantity: number;
  id: number; // This seems like an ID for the requirement itself
}

// Represents a weapon that can be branched into
interface UpgradePath {
  name: string;
  id: number;
}

// Represents the detailed crafting/upgrade information
interface CraftingInfo {
  weapon: { id: number }; // Reference to the weapon this crafting info is for
  craftable: boolean;
  previous: UpgradePath | null; // Previous weapon in the tree (can be null for base)
  branches: UpgradePath[]; // Weapons this one can upgrade into
  craftingMaterials: CraftingMaterial[]; // Materials needed to craft from scratch
  craftingZennyCost: number | null; // Cost to craft from scratch (could be null if not craftable)
  upgradeMaterials: CraftingMaterial[]; // Materials needed to upgrade from 'previous'
  upgradeZennyCost: number | null; // Cost to upgrade from 'previous' (could be null?)
  column?: number; // Optional tree position info
  row?: number; // Optional tree position info
  id: number; // ID possibly related to the crafting node/recipe
}

// Represents damage values
interface DamageInfo {
  raw: number;
  display: number;
}

// Represents elemental or status damage properties
interface SpecialDamageInfo {
  element: string; // e.g., "thunder", "poison", "blast"
  kind: string; // e.g., "element", "status"
  weapon: { id: number }; // Seems redundant, links back to the weapon
  damage: DamageInfo;
  hidden: boolean;
  id: number; // ID for this specific special property
}

// Represents the details of a skill
interface SkillDetail {
  id: number;
  name: string;
  description: string;
}

// Represents a skill granted by the weapon
interface WeaponSkillInfo {
  skill: SkillDetail;
  level: number;
  name: string | null; // Often null, redundant with skill.name
  description: string; // Often redundant with skill.description, maybe level-specific?
  id: number; // ID for this specific skill instance/level on the weapon?
}

// Represents the weapon tree/series information
interface WeaponSeriesInfo {
  id: number;
  gameId: number;
  name: string;
}

// --- Main Weapon Data Interface ---
export interface WeaponData {
  id: number;
  gameId: number;
  name: string;
  description: string;
  rarity: number;
  kind: string;
  damage: DamageInfo;
  affinity: number;
  defenseBonus: number;
  elderseal: string | null;
  slots: number[];
  specials: SpecialDamageInfo[];
  skills: WeaponSkillInfo[];
  crafting: CraftingInfo;
  series: WeaponSeriesInfo;
}

export interface Sharpness {
  red: number;
  orange: number;
  yellow: number;
  green: number;
  blue: number;
  white: number;
  purple: number;
}

export interface Handicraft {
  red: number;
  orange: number;
  yellow: number;
  green: number;
  blue: number;
  white: number;
  purple: number;
}

// Define the exact category names using 'as const' for strong typing
export const weaponCategories = [
  "great-sword",
  "sword-and-shield",
  "hammer",
  "long-sword",
  "lance",
  "gunlance",
  "dual-blades",
  "switch-axe",
  "charge-blade",
  "insect-glaive",
  "hunting-horn",
  "bow",
  "light-bowgun",
  "heavy-bowgun",
] as const;

export type WeaponCategory = (typeof weaponCategories)[number];

export type GroupedWeapons = Record<WeaponCategory, WeaponData[]>;
