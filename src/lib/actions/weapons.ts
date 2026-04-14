import { unstable_cache } from "next/cache";
import { weaponCategories, type WeaponCategory, type WeaponData, type GroupedWeapons } from "@/lib/types/weapon";
import { createWeaponSlug } from "@/lib/utils/weaponUtils";

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

async function getWeaponsByType(type: WeaponCategory): Promise<WeaponData[]> {
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

export async function getWeaponBySlug(slug: string): Promise<WeaponData | null> {
  const allWeapons = await getAllWeapons();
  for (const category of weaponCategories) {
    const weapons = allWeapons[category];
    if (!weapons) continue;

    const weapon = weapons.find((w) => createWeaponSlug(w.name) === slug);
    if (weapon) {
      const response = await fetch(`https://wilds.mhdb.io/en/weapons/${weapon.id}`, {
        next: { revalidate: 3600, tags: ["weapons", `weapon-${weapon.id}`] },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch weapon details: ${response.statusText}`);
      }

      const weaponDetails: WeaponData = await response.json();
      return weaponDetails;
    }
  }

  return null;
}
