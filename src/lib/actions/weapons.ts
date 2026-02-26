import { unstable_cache } from "next/cache";
import { weaponCategories, type WeaponCategory, type WeaponData, type GroupedWeapons } from "@/lib/types/weapon";

const fetchWeaponsByType = unstable_cache(
  async (type: WeaponCategory): Promise<WeaponData[]> => {
    const response = await fetch("https://wilds.mhdb.io/en/weapons", {
      next: { revalidate: 3600, tags: ["weapons", `weapons-${type}`] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch weapons: ${response.statusText}`);
    }

    const allWeapons: WeaponData[] = await response.json();
    return allWeapons.filter((w) => w.kind === type);
  },
  ["weapons-by-type"],
  { revalidate: 3600, tags: ["weapons"] }
);

export async function getWeaponsByType(type: WeaponCategory): Promise<WeaponData[]> {
  return fetchWeaponsByType(type);
}

export async function getAllWeapons(): Promise<GroupedWeapons> {
  const weaponTypes = Object.values(weaponCategories);

  const results = await Promise.all(
    weaponTypes.map((type) => getWeaponsByType(type))
  );

  const grouped = weaponTypes.reduce((acc, type, index) => {
    acc[type] = results[index];
    return acc;
  }, {} as GroupedWeapons);

  return grouped;
}

export interface WeaponIndex {
  id: number;
  name: string;
  kind: WeaponCategory;
  rarity: number;
}

const fetchWeaponsIndex = unstable_cache(
  async (): Promise<WeaponIndex[]> => {
    const response = await fetch("https://wilds.mhdb.io/en/weapons", {
      next: { revalidate: 3600, tags: ["weapons-index"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch weapons index: ${response.statusText}`);
    }

    const allWeapons: WeaponData[] = await response.json();

    return allWeapons.map((w) => ({
      id: w.id,
      name: w.name,
      kind: w.kind as WeaponCategory,
      rarity: w.rarity,
    }));
  },
  ["weapons-index"],
  { revalidate: 3600, tags: ["weapons-index"] }
);

export async function getWeaponsIndex(): Promise<WeaponIndex[]> {
  return fetchWeaponsIndex();
}
