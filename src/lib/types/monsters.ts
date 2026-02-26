// Shared types
type Rank = "low" | "high" | "master";
type Element = "fire" | "water" | "ice" | "thunder" | "dragon";
type Status = "poison" | "sleep" | "paralysis" | "stun" | "blastblight";
type Effect = "noise" | "flash" | "stun" | "exhaust";
type DamageKind = "severing" | "blunt" | "projectile";
type MonsterKind = "small" | "large";
type Species =
  | "flying-wyvern"
  | "fish"
  | "herbivore"
  | "lynian"
  | "neopteron"
  | "carapaceon"
  | "fanged-beast"
  | "bird-wyvern"
  | "piscine-wyvern"
  | "leviathan"
  | "brute-wyvern"
  | "fanged-wyvern"
  | "amphibian"
  | "temnoceran"
  | "snake-wyvern"
  | "elder-dragon"
  | "cephalopod"
  | "construct"
  | "wingdrake"
  | "demi-elder";

// Discriminated union for resistance / weakness
interface BaseResistance {
  id: number;
  kind: "element" | "status" | "effect";
  condition: string | null;
}
interface ElementResistance extends BaseResistance {
  kind: "element";
  element: Element;
}
interface StatusResistance extends BaseResistance {
  kind: "status";
  status: Status;
}
interface EffectResistance extends BaseResistance {
  kind: "effect";
  effect: Effect;
}
type MonsterResistance = ElementResistance | StatusResistance | EffectResistance;

interface BaseWeakness {
  id: number;
  level: number;
  kind: "element" | "status" | "effect";
  condition: string | null;
}
interface ElementWeakness extends BaseWeakness {
  kind: "element";
  element: Element;
}
interface StatusWeakness extends BaseWeakness {
  kind: "status";
  status: Status;
}
interface EffectWeakness extends BaseWeakness {
  kind: "effect";
  effect: Effect;
}
type MonsterWeakness = ElementWeakness | StatusWeakness | EffectWeakness;

export interface MonsterSize {
  base: number;
  mini: number;
  silver: number;
  gold: number;
}







export interface Location {
  id: number;
  gameId: number;
  name: string;
  zoneCount: number;
  camps: Camp[];
}

export interface Camp {
  id: number;
  location: { id: number };
  name: string;
  zone: number;
  floor: number;
  risk: "safe" | "insecure" | "dangerous";
  position: { x: number; y: number; z: number };
  gameId: number;
}

export interface MonsterRewardCondition {
  id: number;
  kind: string;
  rank: Rank;
  quantity: number;
  chance: number;
  part?: number;
}

export interface MonsterReward {
  id: number;
  item: {
    id: number;
    gameId: number;
    name: string;
    description: string;
    rarity: number;
    carryLimit: number;
    value: number;
  };
  conditions: MonsterRewardCondition[];
}

export interface MonsterPart {
  id: number;
  kind: string;
  health: number;
  multipliers: {
    slash: number;
    blunt: number;
    pierce: number;
    fire: number;
    water: number;
    thunder: number;
    ice: number;
    dragon: number;
    stun: number;
  };
  kinsectEssence: string | null;
}

export interface Monster {
  id: number;
  gameId: number;
  slug: string;
  kind: MonsterKind;
  species: Species;
  name: string;
  size: MonsterSize;
  description: string;
  features: string | null;
  tips: string | null;
  baseHealth: number;
  locations: Location[];
  resistances: MonsterResistance[];
  weaknesses: MonsterWeakness[];
  rewards: MonsterReward[];
  parts: MonsterPart[];
}
