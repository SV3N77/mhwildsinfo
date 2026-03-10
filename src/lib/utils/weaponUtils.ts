import { GroupedWeapons, weaponCategories, WeaponData, Sharpness } from "../types/weapon";

export function groupWeaponsByType(weapons: WeaponData[]): GroupedWeapons {
  const grouped: GroupedWeapons = {} as GroupedWeapons;
  for (const category of weaponCategories) {
    grouped[category] = [];
  }

  for (const weapon of weapons) {
    const category = weapon.kind as keyof GroupedWeapons;
    if (category && grouped[category]) {
      grouped[category].push(weapon);
    } else {
      console.warn(`Unknown weapon kind encountered in data: ${weapon.kind}`);
    }
  }

  return grouped;
}

export function createWeaponSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "");
}

export const SHARPNESS_COLORS = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500", "bg-blue-500", "bg-white", "bg-purple-500"] as const;

const SHARPNESS_KEYS: (keyof Sharpness)[] = ["red", "orange", "yellow", "green", "blue", "white", "purple"];

export function getSharpnessSegments(sharpness: Sharpness) {
  return SHARPNESS_KEYS.map((key, idx) => ({
    value: sharpness[key],
    color: SHARPNESS_COLORS[idx],
  }));
}

export function getTotalHits(sharpness: Sharpness) {
  return SHARPNESS_KEYS.reduce((sum, key) => sum + (sharpness[key] || 0), 0);
}
