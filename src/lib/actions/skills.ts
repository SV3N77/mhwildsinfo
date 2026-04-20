import { unstable_cache } from "next/cache";
import { SkillData } from "@/lib/types/skills";

function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const fetchAllSkills = unstable_cache(
  async (): Promise<SkillData[]> => {
    const response = await fetch("https://wilds.mhdb.io/en/skills", {
      next: { revalidate: 3600, tags: ["skills"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch skills: ${response.statusText}`);
    }

    const skills = await response.json();
    return skills.map((skill: SkillData) => ({
      ...skill,
      slug: generateSlug(skill.name)
    }));
  },
  ["skills-all"],
  { revalidate: 3600, tags: ["skills"] }
);

export async function getAllSkills(): Promise<SkillData[]> {
  return fetchAllSkills();
}

const fetchSkillBySlug = unstable_cache(
  async (slug: string): Promise<SkillData | null> => {
    const skills = await fetchAllSkills();
    return skills.find(skill => skill.slug === slug) || null;
  },
  ["skill-by-slug"],
  { revalidate: 3600, tags: ["skills"] }
);

export async function getSkillBySlug(slug: string): Promise<SkillData | null> {
  return fetchSkillBySlug(slug);
}
