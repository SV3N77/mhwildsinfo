import { GroupedWeapons, weaponCategories, WeaponData } from "../types/weapon";

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
