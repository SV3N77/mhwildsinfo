import { unstable_cache } from "next/cache";

const fetchAllCharms = unstable_cache(
  async (): Promise<any[]> => {
    const response = await fetch("https://wilds.mhdb.io/en/charms", {
      next: { revalidate: 3600, tags: ["charms"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch charms: ${response.statusText}`);
    }

    return response.json();
  },
  ["charms-all"],
  { revalidate: 3600, tags: ["charms"] }
);

export async function getAllTalismans(): Promise<any[]> {
  return fetchAllCharms();
}

const fetchCharmById = unstable_cache(
  async (id: string): Promise<any | null> => {
    const response = await fetch(`https://wilds.mhdb.io/en/charms/${id}`, {
      next: { revalidate: 3600, tags: [`charm-${id}`] },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  },
  ["charm-by-id"],
  { revalidate: 3600, tags: ["charms"] }
);

export async function getCharmById(id: string): Promise<any> {
  const charm = await fetchCharmById(id);
  if (!charm) {
    throw new Error(`Charm not found: ${id}`);
  }
  return charm;
}
