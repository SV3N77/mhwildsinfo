import { unstable_cache } from "next/cache";

const fetchAllDecorations = unstable_cache(
  async (): Promise<any[]> => {
    const response = await fetch("https://wilds.mhdb.io/en/decorations", {
      next: { revalidate: 3600, tags: ["decorations"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch decorations: ${response.statusText}`);
    }

    return response.json();
  },
  ["decorations-all"],
  { revalidate: 3600, tags: ["decorations"] }
);

export async function getAllDecorations(): Promise<any[]> {
  return fetchAllDecorations();
}
