import { unstable_cache } from "next/cache";

function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const fetchAllCharms = unstable_cache(
  async (): Promise<any[]> => {
    const response = await fetch("https://wilds.mhdb.io/en/charms", {
      next: { revalidate: 3600, tags: ["charms"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch charms: ${response.statusText}`);
    }

    const charms = await response.json();
    return charms.map((charm: any) => {
      const baseName = charm.ranks[0]?.name.replace(/ I$| II$| III$| IV$| V$/, "") || "Charm";
      return {
        ...charm,
        slug: generateSlug(baseName),
      };
    });
  },
  ["charms-all"],
  { revalidate: 3600, tags: ["charms"] }
);

export async function getAllTalismans(): Promise<any[]> {
  return fetchAllCharms();
}

export async function getCharmBySlug(slug: string): Promise<any> {
  const charms = await fetchAllCharms();
  const charm = charms.find((charm: any) => charm.slug === slug);
  if (!charm) {
    throw new Error(`Charm not found: ${slug}`);
  }
  return charm;
}
