import { unstable_cache } from "next/cache";

export interface CacheOptions {
  revalidate?: number;
  tags?: string[];
}

export async function fetchWithCache<T>(
  url: string,
  cacheKey: string[],
  options: CacheOptions = {}
): Promise<T> {
  const { revalidate = 3600, tags = [] } = options;

  return unstable_cache(
    async () => {
      const response = await fetch(url, {
        next: { revalidate, tags },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      }
      return response.json();
    },
    cacheKey,
    { revalidate, tags }
  )();
}
