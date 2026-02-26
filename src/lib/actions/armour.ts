import { unstable_cache } from "next/cache";
import { slugify } from "@/lib/utils";
import { ArmorSetData } from "@/lib/types/armour";

export interface ArmourIndex {
  id: number;
  name: string;
  slug: string;
  rarity: number;
}

const fetchArmourIndex = unstable_cache(
  async (): Promise<ArmourIndex[]> => {
    const response = await fetch("https://wilds.mhdb.io/en/armor/sets", {
      next: { revalidate: 3600, tags: ["armour-index"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch armour index: ${response.statusText}`);
    }

    const allSets: ArmorSetData[] = await response.json();

    return allSets.map((set) => ({
      id: set.id,
      name: set.name,
      slug: slugify(set.name),
      rarity: Math.max(...set.pieces.map((p) => p.rarity || 0)),
    }));
  },
  ["armour-index"],
  { revalidate: 3600, tags: ["armour-index"] }
);

export async function getArmourIndex(): Promise<ArmourIndex[]> {
  return fetchArmourIndex();
}

const fetchArmourSetById = unstable_cache(
  async (id: number): Promise<ArmorSetData | null> => {
    const response = await fetch("https://wilds.mhdb.io/en/armor/sets", {
      next: { revalidate: 3600, tags: ["armour-sets"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch armour set: ${response.statusText}`);
    }

    const allSets: ArmorSetData[] = await response.json();
    return allSets.find((set) => set.id === id) || null;
  },
  ["armour-set-by-id"],
  { revalidate: 3600, tags: ["armour-sets"] }
);

export async function getArmourSetBySlug(slug: string): Promise<ArmorSetData | null> {
  const index = await getArmourIndex();
  const setIndex = index.find((set) => set.slug === slug);

  if (!setIndex) {
    return null;
  }

  return fetchArmourSetById(setIndex.id);
}

export async function getArmourSetById(id: number): Promise<ArmorSetData | null> {
  return fetchArmourSetById(id);
}

const fetchAllArmourSets = unstable_cache(
  async (): Promise<ArmorSetData[]> => {
    const response = await fetch("https://wilds.mhdb.io/en/armor/sets", {
      next: { revalidate: 3600, tags: ["armour-sets"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch all armour sets: ${response.statusText}`);
    }

    return response.json();
  },
  ["armour-sets-full"],
  { revalidate: 3600, tags: ["armour-sets"] }
);

export async function getAllArmourSets(): Promise<ArmorSetData[]> {
  return fetchAllArmourSets();
}
