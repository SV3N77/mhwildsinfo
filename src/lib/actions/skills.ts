import { unstable_cache } from "next/cache";
import { SkillData } from "@/lib/types/skills";

const fetchAllSkills = unstable_cache(
  async (): Promise<SkillData[]> => {
    const response = await fetch("https://wilds.mhdb.io/en/skills", {
      next: { revalidate: 3600, tags: ["skills"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch skills: ${response.statusText}`);
    }

    return response.json();
  },
  ["skills-all"],
  { revalidate: 3600, tags: ["skills"] }
);

export async function getAllSkills(): Promise<SkillData[]> {
  return fetchAllSkills();
}
