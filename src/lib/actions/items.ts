import { unstable_cache } from "next/cache";
import { ItemData } from "@/lib/types/items";

const fetchAllItems = unstable_cache(
  async (): Promise<ItemData[]> => {
    const response = await fetch("https://wilds.mhdb.io/en/items", {
      next: { revalidate: 3600, tags: ["items"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch items: ${response.statusText}`);
    }

    return response.json();
  },
  ["items-all"],
  { revalidate: 3600, tags: ["items"] }
);

export async function getAllItems(): Promise<ItemData[]> {
  return fetchAllItems();
}
