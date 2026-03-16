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
