import { unstable_cache } from "next/cache";
import { Monster } from "@/lib/types/monsters";

const fetchAllMonsters = unstable_cache(
  async (): Promise<Monster[]> => {
    const response = await fetch("https://wilds.mhdb.io/en/monsters", {
      next: { revalidate: 3600, tags: ["monsters"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch monsters: ${response.statusText}`);
    }

    return response.json();
  },
  ["monsters-all"],
  { revalidate: 3600, tags: ["monsters"] }
);

export async function getAllMonsters(): Promise<Monster[]> {
  return fetchAllMonsters();
}

const fetchMonsterById = unstable_cache(
  async (id: string): Promise<Monster> => {
    const response = await fetch(`https://wilds.mhdb.io/en/monsters/${id}`, {
      next: { revalidate: 3600, tags: ["monsters", `monster-${id}`] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch monster: ${response.statusText}`);
    }

    return response.json();
  },
  ["monster-by-id"],
  { revalidate: 3600, tags: ["monsters"] }
);

export async function getMonsterById(id: string): Promise<Monster> {
  return fetchMonsterById(id);
}
