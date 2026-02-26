import { unstable_cache } from "next/cache";
import { Monster } from "@/lib/types/monsters";

function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const fetchAllMonsters = unstable_cache(
  async (): Promise<Monster[]> => {
    const response = await fetch("https://wilds.mhdb.io/en/monsters", {
      next: { revalidate: 3600, tags: ["monsters"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch monsters: ${response.statusText}`);
    }

    const monsters = await response.json();
    return monsters.map((monster: Monster) => ({
      ...monster,
      slug: generateSlug(monster.name)
    }));
  },
  ["monsters-all"],
  { revalidate: 3600, tags: ["monsters"] }
);

export async function getAllMonsters(): Promise<Monster[]> {
  return fetchAllMonsters();
}

const fetchMonsterBySlug = unstable_cache(
  async (slug: string): Promise<Monster | null> => {
    const monsters = await fetchAllMonsters();
    return monsters.find(monster => monster.slug === slug) || null;
  },
  ["monster-by-slug"],
  { revalidate: 3600, tags: ["monsters"] }
);

export async function getMonsterBySlug(slug: string): Promise<Monster> {
  const monster = await fetchMonsterBySlug(slug);
  if (!monster) {
    throw new Error(`Monster not found: ${slug}`);
  }
  return monster;
}
